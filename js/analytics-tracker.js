/* ═══════════════════════════════════════════
   analytics-tracker.js — Lightweight Page View Logger
   Logs visits to Firestore analytics_logs collection
   ═══════════════════════════════════════════ */
(function(){
  'use strict';
  
  // Don't track admin pages or localhost
  var loc = window.location;
  if (loc.pathname.indexOf('/admin') !== -1) return;
  
  // Collect basic info
  var data = {
    page: loc.pathname + loc.search,
    referrer: document.referrer || 'direct',
    timestamp: Date.now(),
    userAgent: navigator.userAgent.slice(0, 120),
    screenW: screen.width,
    screenH: screen.height,
    language: navigator.language || 'en',
    sessionId: sessionStorage.getItem('_sid') || (function(){
      var id = 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      sessionStorage.setItem('_sid', id);
      return id;
    })(),
    isNewSession: !sessionStorage.getItem('_visited'),
    source: 'organic'
  };
  
  // Detect source
  var ref = data.referrer.toLowerCase();
  if (ref.indexOf('google') !== -1) data.source = 'google';
  else if (ref.indexOf('facebook') !== -1 || ref.indexOf('fb.com') !== -1) data.source = 'facebook';
  else if (ref.indexOf('whatsapp') !== -1 || ref.indexOf('wa.me') !== -1) data.source = 'whatsapp';
  else if (ref.indexOf('instagram') !== -1) data.source = 'instagram';
  else if (ref && ref.indexOf(loc.hostname) === -1) data.source = 'referral';
  else if (!ref) data.source = 'direct';
  
  // Detect device
  var ua = navigator.userAgent;
  if (/Mobi|Android|iPhone|iPad/i.test(ua)) data.device = 'mobile';
  else if (/Tablet|iPad/i.test(ua)) data.device = 'tablet';
  else data.device = 'desktop';
  
  // Detect country (rough, from timezone)
  try {
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.indexOf('Colombo') !== -1) data.country = 'Sri Lanka';
    else if (tz.indexOf('London') !== -1) data.country = 'United Kingdom';
    else if (tz.indexOf('New_York') !== -1 || tz.indexOf('Los_Angeles') !== -1 || tz.indexOf('Chicago') !== -1) data.country = 'United States';
    else if (tz.indexOf('Sydney') !== -1 || tz.indexOf('Melbourne') !== -1) data.country = 'Australia';
    else if (tz.indexOf('Dubai') !== -1) data.country = 'UAE';
    else if (tz.indexOf('Toronto') !== -1) data.country = 'Canada';
    else if (tz.indexOf('Singapore') !== -1) data.country = 'Singapore';
    else if (tz.indexOf('Kolkata') !== -1 || tz.indexOf('Calcutta') !== -1) data.country = 'India';
    else data.country = tz.split('/')[0] || 'Unknown';
  } catch(e) { data.country = 'Unknown'; }
  
  sessionStorage.setItem('_visited', '1');
  
  // Track bounce (if user leaves within 10 seconds)
  data.bounced = true;
  setTimeout(function(){ data.bounced = false; }, 10000);
  
  // Send to Firestore via dynamic import (non-blocking)
  import('./firebase-config.js').then(function(fb){
    fb.addDoc(fb.collection(fb.db, 'analytics_logs'), data).catch(function(){});
  }).catch(function(){
    // Firebase not available — store locally
    try {
      var logs = JSON.parse(localStorage.getItem('_pending_logs') || '[]');
      logs.push(data);
      if (logs.length > 50) logs = logs.slice(-50);
      localStorage.setItem('_pending_logs', JSON.stringify(logs));
    } catch(e){}
  });
  
  // Track WhatsApp clicks
  document.addEventListener('click', function(e){
    var el = e.target.closest('a[href*="wa.me"], a[href*="whatsapp"]');
    if (el) {
      import('./firebase-config.js').then(function(fb){
        fb.addDoc(fb.collection(fb.db, 'analytics_logs'), {
          page: loc.pathname,
          type: 'whatsapp_click',
          timestamp: Date.now(),
          sessionId: data.sessionId
        }).catch(function(){});
      }).catch(function(){});
    }
  });
  
  // Track CTA clicks
  document.addEventListener('click', function(e){
    var el = e.target.closest('.btn-form, .cta-btn, [data-cta], a[href*="packages"], a[href*="contact"]');
    if (el) {
      import('./firebase-config.js').then(function(fb){
        fb.addDoc(fb.collection(fb.db, 'analytics_logs'), {
          page: loc.pathname,
          type: 'cta_click',
          timestamp: Date.now(),
          sessionId: data.sessionId,
          ctaText: (el.textContent || '').trim().slice(0, 50)
        }).catch(function(){});
      }).catch(function(){});
    }
  });
  
})();
