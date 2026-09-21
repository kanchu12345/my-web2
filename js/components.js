/**
 * js/components.js
 * Universal Shared Components for Infinite Creative Web Design (infiniteweb.dev)
 * Injects canonical Header, Mobile Menu, Footer, Language Switcher, Cookie Consent Banner,
 * and Contact Form validation across every page.
 */

(function () {
  'use strict';

  // 1. Detect relative root prefix
  function getRootPrefix() {
    var scriptEl = document.querySelector('script[src*="components.js"]');
    if (scriptEl) {
      var src = scriptEl.getAttribute('src') || '';
      if (src.indexOf('../') === 0) {
        return '../';
      }
    }
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf('/about/') !== -1 || path.indexOf('/services/') !== -1 || path.indexOf('/service-details/') !== -1 ||
        path.indexOf('/portfolio/') !== -1 || path.indexOf('/projects/') !== -1 || path.indexOf('/blogs/') !== -1 ||
        path.indexOf('/tutorials/') !== -1 || path.indexOf('/course/') !== -1 || path.indexOf('/privacy/') !== -1 ||
        path.indexOf('/article/') !== -1 || path.indexOf('/en/') !== -1 || path.indexOf('/si/') !== -1 || path.indexOf('/ta/') !== -1) {
      return '../';
    }
    return './';
  }

  var PREFIX = getRootPrefix();

  // Helper for active navigation link
  function isPageActive(pageName) {
    var current = window.location.pathname.toLowerCase();
    if (pageName === 'home') {
      if (current === '/' || current.endsWith('/') || current.endsWith('/index.html') || current.endsWith('index.html')) {
        if (current.indexOf('/about') === -1 && current.indexOf('/services') === -1 && current.indexOf('/portfolio') === -1 &&
            current.indexOf('/projects') === -1 && current.indexOf('/packages') === -1 && current.indexOf('/blogs') === -1 &&
            current.indexOf('/tutorials') === -1 && current.indexOf('/course') === -1 && current.indexOf('/contact') === -1 &&
            current.indexOf('/privacy') === -1) {
          return true;
        }
      }
      return false;
    }
    return current.indexOf(pageName) !== -1;
  }

  // 2. Render Canonical Header
  function renderHeader() {
    var isHome = isPageActive('home');
    var isServices = isPageActive('service');
    var isPortfolio = isPageActive('portfolio') || isPageActive('project');
    var isPackages = isPageActive('package');
    var isBlogs = isPageActive('blog') || isPageActive('article');
    var isTutorials = isPageActive('tutorial') || isPageActive('course');
    var isAbout = isPageActive('about');
    var isContact = isPageActive('contact');

    var navHTML = '<nav class="nav" role="navigation" aria-label="Main Navigation">' +
      '<div class="nav-inner">' +
        '<a href="' + PREFIX + 'index.html" class="nav-brand" aria-label="Infinite Creative Web Design Home">' +
          '<img src="' + PREFIX + 'images/logo.png" alt="Infinite Creative Web Design Logo" width="38" height="38" class="nav-logo" fetchpriority="high">' +
          '<div class="nav-brand-text">' +
            '<strong>INFINITE</strong>' +
            '<small>Creative Web Design</small>' +
          '</div>' +
        '</a>' +
        '<div class="nav-links" role="menubar">' +
          '<a href="' + PREFIX + 'index.html" class="nav-link ' + (isHome ? 'active' : '') + '" role="menuitem">Home</a>' +
          '<a href="' + PREFIX + 'services.html" class="nav-link ' + (isServices ? 'active' : '') + '" role="menuitem">Services</a>' +
          '<a href="' + PREFIX + 'portfolio.html" class="nav-link ' + (isPortfolio ? 'active' : '') + '" role="menuitem">Projects</a>' +
          '<a href="' + PREFIX + 'packages.html" class="nav-link ' + (isPackages ? 'active' : '') + '" role="menuitem">Pricing</a>' +
          '<a href="' + PREFIX + 'blogs.html" class="nav-link ' + (isBlogs ? 'active' : '') + '" role="menuitem">AI Tech & Blog</a>' +
          '<a href="' + PREFIX + 'tutorials.html" class="nav-link ' + (isTutorials ? 'active' : '') + '" role="menuitem">Academy</a>' +
          '<a href="' + PREFIX + 'about.html" class="nav-link ' + (isAbout ? 'active' : '') + '" role="menuitem">About</a>' +
          '<a href="' + PREFIX + 'contact.html" class="nav-link ' + (isContact ? 'active' : '') + '" role="menuitem">Contact</a>' +
        '</div>' +
        '<div class="nav-actions">' +
          '<a href="https://wa.me/94789714912?text=Hello%20Infinite%20Creative!%20I%20would%20like%20to%20get%20a%20free%20quote%20for%20my%20business%20website." ' +
             'target="_blank" rel="noopener noreferrer" class="btn-nav-cta" aria-label="Get a Free Quote on WhatsApp">' +
            '<span>💬 Free Quote</span>' +
          '</a>' +
          '<button class="nav-toggle" id="navToggleBtn" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="siteMobileMenu">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</nav>' +
    '<div class="mobile-menu" id="siteMobileMenu" aria-hidden="true">' +
      '<a href="' + PREFIX + 'index.html" class="mm-link ' + (isHome ? 'active' : '') + '">Home</a>' +
      '<a href="' + PREFIX + 'services.html" class="mm-link ' + (isServices ? 'active' : '') + '">Services</a>' +
      '<a href="' + PREFIX + 'portfolio.html" class="mm-link ' + (isPortfolio ? 'active' : '') + '">Projects & Portfolio (18+ Live)</a>' +
      '<a href="' + PREFIX + 'packages.html" class="mm-link ' + (isPackages ? 'active' : '') + '">Packages & Pricing</a>' +
      '<a href="' + PREFIX + 'blogs.html" class="mm-link ' + (isBlogs ? 'active' : '') + '">AI Tech & Blogs</a>' +
      '<a href="' + PREFIX + 'tutorials.html" class="mm-link ' + (isTutorials ? 'active' : '') + '">Developer Academy</a>' +
      '<a href="' + PREFIX + 'about.html" class="mm-link ' + (isAbout ? 'active' : '') + '">About Us</a>' +
      '<a href="' + PREFIX + 'contact.html" class="mm-link ' + (isContact ? 'active' : '') + '">Contact Us</a>' +
      '<a href="https://wa.me/94789714912?text=Hello%20Infinite%20Creative!%20I%20would%20like%20to%20get%20a%20free%20quote%20for%20my%20business%20website." ' +
         'target="_blank" rel="noopener noreferrer" class="mm-link mm-cta" style="background:#04AA6D;color:#fff;font-weight:800;text-align:center;margin-top:12px;border-radius:8px;padding:12px;">' +
        '💬 Chat on WhatsApp' +
      '</a>' +
    '</div>';

    var container = document.getElementById('site-header-container');
    if (container) {
      container.innerHTML = navHTML;
    } else {
      var existingNav = document.querySelector('nav.nav');
      if (existingNav) {
        existingNav.outerHTML = navHTML;
        var oldMobile = document.querySelector('.mobile-menu');
        if (oldMobile && oldMobile.id !== 'siteMobileMenu') oldMobile.remove();
      } else {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
      }
    }

    var toggleBtn = document.getElementById('navToggleBtn');
    var mobileMenu = document.getElementById('siteMobileMenu');
    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      });
    }
  }

  // 3. Render Canonical Footer
  function renderFooter() {
    var footerHTML = '<footer class="footer" id="siteFooter" role="contentinfo">' +
      '<div class="footer-main">' +
        '<div class="footer-col footer-about">' +
          '<div class="footer-logo-wrap">' +
            '<img src="' + PREFIX + 'images/logo.png" alt="Infinite Creative Web Design Logo" width="46" height="46" loading="lazy" decoding="async">' +
            '<div>' +
              '<div style="font-family:var(--font-disp,Space Grotesk,sans-serif);font-size:16px;font-weight:700;letter-spacing:.15em;color:#fff;">INFINITE</div>' +
              '<div style="font-size:10px;letter-spacing:.3em;color:#04AA6D;text-transform:uppercase;font-weight:700;">Creative Web Design</div>' +
            '</div>' +
          '</div>' +
          '<p class="footer-desc">High-performance, mobile-first websites and custom software solutions designed for Sri Lankan businesses. 18+ verified live client projects with sub-second speeds.</p>' +
          '<div class="footer-socials">' +
            '<a href="https://web.facebook.com/profile.php?id=100082101311247" target="_blank" class="social-link" rel="noopener noreferrer" aria-label="Official Facebook Page">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>' +
            '</a>' +
            '<a href="https://wa.me/94789714912" target="_blank" class="social-link social-wa" rel="noopener noreferrer" aria-label="Official WhatsApp Support">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>' +
            '</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h3 class="footer-heading">Quick Links</h3>' +
          '<ul class="footer-list">' +
            '<li><a href="' + PREFIX + 'index.html">Home</a></li>' +
            '<li><a href="' + PREFIX + 'packages.html">Packages & Pricing</a></li>' +
            '<li><a href="' + PREFIX + 'portfolio.html">Portfolio (18+ Projects)</a></li>' +
            '<li><a href="' + PREFIX + 'services.html">Services Overview</a></li>' +
            '<li><a href="' + PREFIX + 'blogs.html">AI Tech & Blogs</a></li>' +
            '<li><a href="' + PREFIX + 'tutorials.html">Developer Academy</a></li>' +
            '<li><a href="' + PREFIX + 'about.html">About Agency</a></li>' +
            '<li><a href="' + PREFIX + 'contact.html">Contact Us</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h3 class="footer-heading">Services</h3>' +
          '<ul class="footer-list">' +
            '<li><a href="' + PREFIX + 'services.html#web-design">Starter Web (Rs. 5,000)</a></li>' +
            '<li><a href="' + PREFIX + 'services.html#standard-web">Standard Web (Rs. 10,000)</a></li>' +
            '<li><a href="' + PREFIX + 'services.html#ecommerce">E-Commerce & PayHere</a></li>' +
            '<li><a href="' + PREFIX + 'services.html#seo">SEO & Speed Tuning</a></li>' +
            '<li><a href="' + PREFIX + 'services.html#admin">Admin Management Systems</a></li>' +
            '<li><a href="' + PREFIX + 'services.html#cloud">Free Cloud Hosting Setup</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h3 class="footer-heading">Get in Touch</h3>' +
          '<ul class="footer-list footer-contact">' +
            '<li>' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#04AA6D" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
              '<a href="https://maps.google.com/?q=Tangalle,Sri+Lanka" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;"><strong>Tangalle</strong>, Southern Province, Sri Lanka</a>' +
            '</li>' +
            '<li>' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#04AA6D" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
              '<a href="mailto:infinitedesign768@gmail.com" style="color:inherit;text-decoration:none;">infinitedesign768@gmail.com</a>' +
            '</li>' +
            '<li>' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#04AA6D" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>' +
              '<a href="tel:+94789714912" style="color:inherit;text-decoration:none;">+94 78 971 4912</a>' +
            '</li>' +
            '<li>' +
              '<span style="color:#04AA6D;font-size:12px;font-weight:700;">Direct Support: Mon–Sun 8:00 AM – 10:00 PM</span>' +
            '</li>' +
          '</ul>' +
          '<div style="margin-top:18px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.08);">' +
            '<div style="font-size:12px;color:#94a3b8;margin-bottom:6px;font-weight:700;">Select Language / භාෂාව / மொழி:</div>' +
            '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
              '<a href="' + PREFIX + 'index.html" style="font-size:12px;color:#04AA6D;font-weight:700;text-decoration:none;background:rgba(4,170,109,0.12);padding:3px 8px;border-radius:4px;" hreflang="en">🇬🇧 English</a>' +
              '<a href="' + PREFIX + 'article/si-web-design-sri-lanka-2026.html" style="font-size:12px;color:#94a3b8;text-decoration:none;background:rgba(255,255,255,0.05);padding:3px 8px;border-radius:4px;" hreflang="si">🇱🇰 සිංහල</a>' +
              '<a href="' + PREFIX + 'contact.html" style="font-size:12px;color:#94a3b8;text-decoration:none;background:rgba(255,255,255,0.05);padding:3px 8px;border-radius:4px;" hreflang="ta">🇱🇰 தமிழ்</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<div>' +
          '<span>© 2026 Infinite Creative Web Design. All rights reserved.</span>' +
          '<div style="display:inline-flex;gap:14px;margin-left:16px;flex-wrap:wrap;">' +
            '<a href="' + PREFIX + 'privacy.html" style="color:#94a3b8;font-size:12px;text-decoration:none;">Privacy Policy</a>' +
            '<a href="' + PREFIX + 'cookie-policy.html" style="color:#94a3b8;font-size:12px;text-decoration:none;">Cookie Policy</a>' +
            '<a href="' + PREFIX + 'sitemap.html" style="color:#94a3b8;font-size:12px;text-decoration:none;">Sitemap</a>' +
            '<button id="btnCookieSettings" type="button" style="background:none;border:none;color:#38bdf8;font-size:12px;cursor:pointer;padding:0;text-decoration:underline;">Cookie Settings</button>' +
          '</div>' +
        '</div>' +
        '<span class="footer-bottom-right">Crafted with ♥ in Sri Lanka • BestWeb.lk Rubric Certified</span>' +
      '</div>' +
    '</footer>';

    var container = document.getElementById('site-footer-container');
    if (container) {
      container.innerHTML = footerHTML;
    } else {
      var existingFooter = document.querySelector('footer.footer');
      if (existingFooter) {
        existingFooter.outerHTML = footerHTML;
      } else {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
      }
    }

    var cookieSettingsBtn = document.getElementById('btnCookieSettings');
    if (cookieSettingsBtn) {
      cookieSettingsBtn.addEventListener('click', function (e) {
        e.preventDefault();
        resetCookieConsent();
      });
    }
  }

  // 4. Render & Manage Cookie Consent Banner
  function initCookieConsent() {
    var CONSENT_KEY = 'infinite_cookie_consent';
    var status = localStorage.getItem(CONSENT_KEY);

    // If accepted, dynamically activate GA4
    if (status === 'accepted') {
      enableGoogleAnalytics();
      return;
    } else if (status === 'declined') {
      // Essential only - do not load GA4
      return;
    }

    // Render banner if no choice has been saved
    if (document.getElementById('infiniteCookieBanner')) return;

    var bannerHTML = '<div id="infiniteCookieBanner" style="position:fixed;bottom:16px;left:16px;right:16px;max-width:960px;margin:0 auto;background:rgba(13,21,39,0.95);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(4,170,109,0.3);border-radius:16px;padding:20px 24px;box-shadow:0 12px 40px rgba(0,0,0,0.6);z-index:999999;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;">' +
      '<div style="flex:1;min-width:280px;">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">' +
          '<span style="font-size:18px;">🍪</span>' +
          '<strong style="color:#fff;font-size:15px;font-family:var(--font-disp,Space Grotesk,sans-serif);">Your Privacy & Cookie Choices</strong>' +
        '</div>' +
        '<p style="color:#cbd5e1;font-size:13px;line-height:1.5;margin:0;">' +
          'We use essential cookies to keep our website secure. We also request permission for privacy-preserving Google Analytics cookies to help us optimize page speeds. Non-essential scripts are blocked until you decide. Read our <a href="' + PREFIX + 'privacy.html" style="color:#04AA6D;text-decoration:underline;">Privacy Policy</a> & <a href="' + PREFIX + 'cookie-policy.html" style="color:#04AA6D;text-decoration:underline;">Cookie Policy</a>.' +
        '</p>' +
      '</div>' +
      '<div style="display:flex;gap:10px;align-items:center;">' +
        '<button id="btnDeclineCookies" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#cbd5e1;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;">' +
          'Essential Only' +
        '</button>' +
        '<button id="btnAcceptCookies" style="background:#04AA6D;border:none;color:#fff;padding:10px 22px;border-radius:8px;font-size:13px;font-weight:800;cursor:pointer;box-shadow:0 4px 14px rgba(4,170,109,0.4);">' +
          'Accept All' +
        '</button>' +
      '</div>' +
    '</div>';

    document.body.insertAdjacentHTML('beforeend', bannerHTML);

    var acceptBtn = document.getElementById('btnAcceptCookies');
    var declineBtn = document.getElementById('btnDeclineCookies');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        removeCookieBanner();
        enableGoogleAnalytics();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'declined');
        removeCookieBanner();
      });
    }
  }

  function removeCookieBanner() {
    var el = document.getElementById('infiniteCookieBanner');
    if (el) el.remove();
  }

  function enableGoogleAnalytics() {
    if (window._gaInitialized) return;
    window._gaInitialized = true;
    var GA_ID = 'G-D2XDMKN1LX';
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function resetCookieConsent() {
    localStorage.removeItem('infinite_cookie_consent');
    initCookieConsent();
    var banner = document.getElementById('infiniteCookieBanner');
    if (banner) banner.scrollIntoView({ behavior: 'smooth' });
  }

  // 5. Contact Form Validation with Honeypot Spam Defense
  function initContactFormValidation() {
    var form = document.getElementById('contactInquiryForm') || document.querySelector('form[action*="formspree.io"]');
    if (!form) return;

    // Inject honeypot field if not present
    if (!document.getElementById('hp_website_check')) {
      var hp = document.createElement('input');
      hp.type = 'text';
      hp.name = 'website_url_hp';
      hp.id = 'hp_website_check';
      hp.style.display = 'none';
      hp.tabIndex = -1;
      hp.autocomplete = 'off';
      form.appendChild(hp);
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // 1. Honeypot check (bot caught)
      var hpEl = document.getElementById('hp_website_check');
      var hpVal = hpEl ? hpEl.value : '';
      if (hpVal) {
        console.warn('Spam bot detected via honeypot.');
        form.innerHTML = '<div style="background:#04AA6D;color:#fff;padding:16px;border-radius:8px;font-weight:700;">Inquiry received. Thank you!</div>';
        return;
      }

      var nameInput = form.querySelector('input[name="name"]');
      var contactInput = form.querySelector('input[name="contact"]') || form.querySelector('input[name="email"]') || form.querySelector('input[type="email"]');
      var msgInput = form.querySelector('textarea[name="message"]');

      var name = (nameInput && nameInput.value ? nameInput.value : '').trim();
      var contact = (contactInput && contactInput.value ? contactInput.value : '').trim();
      var msg = (msgInput && msgInput.value ? msgInput.value : '').trim();

      if (name.length < 2) {
        alert('Please enter your valid name or business name.');
        if (nameInput) nameInput.focus();
        return;
      }

      // Check contact format: email or phone
      var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
      var isPhone = /^(\+?\d{1,4}[\s-]?)?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/.test(contact) && contact.replace(/\D/g, '').length >= 9;

      if (!isEmail && !isPhone) {
        alert('Please enter a valid phone number (e.g. +94 78 971 4912) or email address.');
        if (contactInput) contactInput.focus();
        return;
      }

      if (msg.length < 5) {
        alert('Please provide a brief description of the website or service you need.');
        if (msgInput) msgInput.focus();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting inquiry securely...';
      }

      try {
        var formData = new FormData(form);
        var res = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          form.innerHTML = '<div style="background:rgba(4,170,109,0.15);border:1px solid #04AA6D;border-radius:12px;padding:24px;text-align:center;">' +
            '<div style="font-size:36px;margin-bottom:8px;">✅</div>' +
            '<h4 style="color:#fff;font-size:1.2rem;margin:0 0 6px;">Thank You, ' + name + '!</h4>' +
            '<p style="color:#cbd5e1;font-size:0.95rem;margin:0 0 14px;line-height:1.5;">' +
              'Your inquiry has been securely delivered to Infinite Creative Web Design. Our senior designer will review your requirements and reach out within 2 business hours.' +
            '</p>' +
            '<a href="https://wa.me/94789714912?text=Hello%20Infinite%20Creative!%20I%20just%20submitted%20a%20project%20inquiry." ' +
               'target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;background:#04AA6D;color:#fff;padding:8px 16px;border-radius:6px;font-weight:700;text-decoration:none;font-size:13px;">' +
              '<span>💬 Instant Response on WhatsApp</span> &rarr;' +
            '</a>' +
          '</div>';
        } else {
          throw new Error('Server returned ' + res.status);
        }
      } catch (err) {
        alert('Notice: Submission error (' + err.message + '). You can contact us directly via WhatsApp at +94 78 971 4912.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = '🚀 Submit Project Inquiry';
        }
      }
    });
  }

  // Auto-initialize on DOM ready
  function init() {
    renderHeader();
    renderFooter();
    initCookieConsent();
    initContactFormValidation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.InfiniteComponents = {
    renderHeader: renderHeader,
    renderFooter: renderFooter,
    initCookieConsent: initCookieConsent,
    resetCookieConsent: resetCookieConsent,
    getRootPrefix: getRootPrefix
  };

})();
