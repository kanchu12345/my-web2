/**
 * js/admin-settings.js
 * Global Settings Controller for Infinite Creative Web Design Admin Panel.
 * Hardened features:
 * - Shared auth gate via initAdminAuth
 * - Uses shared sanitize.js (sanitizeHTML, sanitizeInput)
 * - Zero inline scripts or inline event handlers (strict CSP compliant)
 * - Firestore 'settings' collection persistence
 */

import { initAdminAuth } from './admin-nav.js';
import { db, collection, getDocs, addDoc, updateDoc, doc } from './firebase-config.js';
import { sanitizeHTML, sanitizeInput } from './sanitize.js';

(function () {
  'use strict';

  let settingsDocId = null;

  /* ── Toast ── */
  function toast(msg, type = 'ok') {
    const t = document.getElementById('toast');
    const m = document.getElementById('toastMsg');
    if (!t || !m) {
      alert(msg);
      return;
    }
    t.className = 'toast show toast-' + type;
    m.textContent = msg;
    setTimeout(() => {
      t.classList.remove('show');
    }, 3200);
  }

  async function loadSettings() {
    try {
      const snap = await getDocs(collection(db, 'settings'));
      snap.forEach(d => {
        settingsDocId = d.id;
        const s = d.data();
        if (s.aboutText) document.getElementById('sAbout').value = s.aboutText;
        if (s.phone) document.getElementById('sPhone').value = s.phone;
        if (s.address) document.getElementById('sAddress').value = s.address;
        if (s.ga4Id) document.getElementById('sGA4').value = s.ga4Id;
        if (s.fbPixel) document.getElementById('sFBPixel').value = s.fbPixel;
      });
    } catch (e) {
      toast('Error loading settings', 'err');
    }
  }

  async function saveField(data) {
    try {
      if (settingsDocId) {
        await updateDoc(doc(db, 'settings', settingsDocId), data);
      } else {
        const d = await addDoc(collection(db, 'settings'), data);
        settingsDocId = d.id;
      }
      toast('Saved successfully!', 'ok');
    } catch (e) {
      toast('Save failed: ' + e.message, 'err');
    }
  }

  // Initialize auth gate
  initAdminAuth(() => {
    loadSettings();
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Save About Text
    const saveAboutBtn = document.getElementById('saveAbout');
    if (saveAboutBtn) {
      saveAboutBtn.addEventListener('click', () => {
        const raw = document.getElementById('sAbout').value;
        const v = sanitizeHTML(raw);
        if (!v || !v.trim()) {
          toast('About text cannot be empty.', 'err');
          return;
        }
        saveField({ aboutText: v });
      });
    }

    // Save Contact Info
    const saveContactBtn = document.getElementById('saveContact');
    if (saveContactBtn) {
      saveContactBtn.addEventListener('click', () => {
        const phone = sanitizeInput(document.getElementById('sPhone').value, 50);
        const address = sanitizeInput(document.getElementById('sAddress').value, 300);
        saveField({ phone, address });
      });
    }

    // Save Analytics Configuration
    const saveAnalyticsBtn = document.getElementById('saveAnalytics');
    if (saveAnalyticsBtn) {
      saveAnalyticsBtn.addEventListener('click', () => {
        const ga4 = sanitizeInput(document.getElementById('sGA4').value, 30).replace(/[^A-Za-z0-9\-]/g, '');
        const fb = sanitizeInput(document.getElementById('sFBPixel').value, 30).replace(/[^0-9]/g, '');
        saveField({ ga4Id: ga4, fbPixel: fb });
      });
    }
  });
})();
