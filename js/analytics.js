/* ═══════════════════════════════════════════════════
   analytics.js — Firestore real-time visitor tracking
   ═══════════════════════════════════════════════════ */
(function(){
  'use strict';

  // ── Helper to resolve root path dynamically ──
  function rootPath() {
    return window.location.pathname.includes('/admin/') ? '../' : '';
  }

  // ── Device Detection ──
  const ua = navigator.userAgent;
  let device = 'Desktop';
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
    device = /iPad|tablet/i.test(ua) ? 'Tablet' : 'Mobile';
  }

  // ── Referrer Detection ──
  let referrer = 'Direct';
  if (document.referrer) {
    try {
      const refUrl = new URL(document.referrer);
      if (refUrl.hostname.includes('google')) referrer = 'Google';
      else if (refUrl.hostname.includes('facebook') || refUrl.hostname.includes('instagram') || refUrl.hostname.includes('linkedin') || refUrl.hostname.includes('t.co') || refUrl.hostname.includes('wa.me')) referrer = 'Social';
      else if (refUrl.hostname === window.location.hostname) referrer = 'Direct'; // Internal nav as direct or don't trigger new referrers
      else referrer = 'Referral';
    } catch(e) {}
  }

  // ── Unique Session ID ──
  let sessionId = sessionStorage.getItem('id_analytics_sess');
  let isNewSession = false;
  if (!sessionId) {
    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem('id_analytics_sess', sessionId);
    isNewSession = true;
  }

  // ── Country Detection (IP Geo with Timezone fallback) ──
  let country = 'Unknown';
  
  // We can guess country based on Timezone offset as a fallback
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  if (tz.includes('Colombo') || tz.includes('Asia/Colombo')) country = 'Sri Lanka';
  else if (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('Asia/Kolkata')) country = 'India';
  else if (tz.includes('Australia') || tz.includes('Sydney') || tz.includes('Melbourne')) country = 'Australia';
  else if (tz.includes('London') || tz.includes('Europe/London')) country = 'UK';
  else if (tz.includes('New_York') || tz.includes('Chicago') || tz.includes('Los_Angeles') || tz.includes('America/')) country = 'USA';
  else if (tz.includes('Europe/Berlin') || tz.includes('Berlin')) country = 'Germany';
  else if (tz.includes('Dubai') || tz.includes('Asia/Dubai')) country = 'UAE';

  // ── Core logger to Firestore ──
  async function logToFirestore(logData) {
    try {
      const prefix = rootPath();
      const { db, collection, addDoc } = await import(prefix + 'js/firebase-config.js');
      await addDoc(collection(db, 'analytics_logs'), {
        timestamp: Date.now(),
        sessionId: sessionId,
        device: device,
        referrer: referrer,
        country: country,
        ...logData
      });
    } catch(e) {
      console.warn('Analytics Firestore error:', e);
    }
  }

  // Fetch true country from API, then log the page view
  fetch('https://ipapi.co/json/')
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data && data.country_name) {
        country = data.country_name;
      }
    })
    .catch(() => {})
    .finally(() => {
      // Log Page View
      logToFirestore({
        type: 'page_view',
        page_path: location.pathname || '/',
        page_title: document.title || 'Page',
        is_new_session: isNewSession
      });
    });

  // ── Event Tracking helper ──
  function trackEvent(eventType, details) {
    logToFirestore({
      type: eventType,
      page_path: location.pathname || '/',
      ...details
    });
    // Fallback to legacy GA4 if configured
    if (typeof gtag === 'function') {
      gtag('event', eventType, details || {});
    }
  }

  // ── WhatsApp CTA Click ──
  document.addEventListener('click', function(e) {
    const el = e.target.closest('#waBtn') || e.target.closest('.social-wa') || e.target.closest('[href*="wa.me"]');
    if (el) {
      trackEvent('wa_click', { label: 'whatsapp_click' });
      if (typeof fbq === 'function') fbq('track', 'Contact');
    }
  });

  // ── Hero & Other CTAs ──
  document.addEventListener('click', function(e) {
    if (e.target.closest('#heroViewWork'))    trackEvent('cta_click', { label: 'hero_view_work' });
    if (e.target.closest('#heroContact'))     trackEvent('cta_click', { label: 'hero_contact' });
    if (e.target.closest('#viewAllProjects'))  trackEvent('cta_click', { label: 'view_all_projects' });
  });

  // ── Scroll depth tracking (limit to once per page scroll) ──
  const depths = [25, 50, 75, 90];
  const fired = {};
  window.addEventListener('scroll', function() {
    const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    depths.forEach(function(d) {
      if (pct >= d && !fired[d]) {
        fired[d] = true;
        trackEvent('scroll', { percent_scrolled: d });
      }
    });
  }, { passive: true });

  // ── Legacy Local Storage backup (just in case, keep it intact) ──
  try {
    const visits = JSON.parse(localStorage.getItem('id_visits') || '{"count":0,"pages":[]}');
    visits.count++;
    visits.pages.push({ path: location.pathname, ts: Date.now() });
    if (visits.pages.length > 20) visits.pages = visits.pages.slice(-20);
    localStorage.setItem('id_visits', JSON.stringify(visits));
  } catch(e) {}

})();
