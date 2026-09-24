/**
 * js/admin-packages.js
 * Packages & Pricing Manager Controller for Infinite Creative Web Design.
 * Features:
 * - Real-time Firestore package sync with robust JSON/localStorage fallback
 * - Shared input sanitization and XSS defense
 * - Strict auth gate enforcement
 */

import { initAdminAuth } from './admin-nav.js';
import { 
  db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc 
} from './firebase-config.js';
import { escapeHTML, sanitizeInput } from './sanitize.js';

(function () {
  'use strict';

  let currentPackages = [];

  /* ── Toast Notification ── */
  function toast(msg, type = 'ok') {
    const t = document.getElementById('toast');
    const m = document.getElementById('toastMsg');
    if (!t || !m) return;
    t.className = 'toast show toast-' + type;
    m.textContent = msg;
    setTimeout(() => {
      t.classList.remove('show');
    }, 3200);
  }

  /* ── Render Package List ── */
  function renderPackageList() {
    const list = document.getElementById('pkgList');
    if (!list) return;

    list.innerHTML = '';
    if (currentPackages.length === 0) {
      list.innerHTML = '<div class="no-projects">No packages found. Click "Reset to Defaults" below.</div>';
      return;
    }

    currentPackages.forEach(p => {
      const div = document.createElement('div');
      div.className = 'proj-list-item';
      div.style.alignItems = 'flex-start';
      div.style.padding = '14px 16px';

      const featCount = Array.isArray(p.features) ? p.features.length : 0;
      const featSnippet = Array.isArray(p.features) ? p.features.slice(0, 2).join(' • ') : '';

      const safeName = escapeHTML(p.name || '');
      const safeTag = escapeHTML(p.tag || 'Standard');
      const safePrice = escapeHTML(p.price || '');
      const safeSnippet = escapeHTML(featSnippet);
      const safeAddon = escapeHTML(p.addon || '');
      const safeId = escapeHTML(p.id || '');

      div.innerHTML = `
        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
            <strong style="font-size:15px;color:var(--white);">${safeName}</strong>
            <span class="badge-tag ${p.featured ? 'featured' : ''}">${safeTag}</span>
            ${p.featured ? '<span style="font-size:10px;background:#04AA6D;color:#fff;padding:2px 6px;border-radius:4px;font-weight:700;">FEATURED</span>' : ''}
          </div>
          <div class="pkg-item-price">${safePrice}</div>
          <div class="pkg-item-features">${featCount} Features: ${safeSnippet}...</div>
          ${safeAddon ? '<div style="font-size:11px;color:#04AA6D;margin-top:4px;font-weight:500;">' + safeAddon + '</div>' : ''}
        </div>
        <div class="proj-actions" style="margin-left:12px;flex-shrink:0;">
          <button class="btn-edit" data-id="${safeId}">Edit</button>
          <button class="btn-del" data-id="${safeId}">Delete</button>
        </div>
      `;

      div.querySelector('.btn-edit').addEventListener('click', () => editPackage(p));
      div.querySelector('.btn-del').addEventListener('click', () => deletePackage(p.id));
      list.appendChild(div);
    });
  }

  /* ── Load Packages from Firestore / Local JSON / LocalStorage ── */
  async function loadPackages() {
    const list = document.getElementById('pkgList');
    const cnt = document.getElementById('pkgCount');
    if (!list) return;

    list.innerHTML = '<div class="no-projects">Loading packages&hellip;</div>';

    let loaded = false;

    // 1. Try Firestore
    try {
      const snap = await getDocs(collection(db, 'packages'));
      if (!snap.empty) {
        currentPackages = [];
        snap.forEach(d => {
          currentPackages.push({ id: d.id, ...d.data() });
        });
        loaded = true;
      }
    } catch (e) {
      console.warn('Firestore packages fetch notice:', e.message);
    }

    // 2. Try LocalStorage if Firestore empty
    if (!loaded) {
      try {
        const cached = JSON.parse(localStorage.getItem('infinite_packages') || '[]');
        if (Array.isArray(cached) && cached.length > 0) {
          currentPackages = cached;
          loaded = true;
        }
      } catch (e) {}
    }

    // 3. Try baseline JSON if still empty
    if (!loaded) {
      try {
        const res = await fetch('../data/packages.json');
        const items = await res.json();
        if (Array.isArray(items) && items.length > 0) {
          currentPackages = items;
          localStorage.setItem('infinite_packages', JSON.stringify(currentPackages));
          loaded = true;
        }
      } catch (e) {}
    }

    currentPackages.sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99));
    if (cnt) cnt.textContent = '(' + currentPackages.length + ')';
    renderPackageList();
  }

  /* ── Edit Package Form Population ── */
  function editPackage(p) {
    document.getElementById('editId').value = p.id || '';
    document.getElementById('pName').value = p.name || '';
    document.getElementById('pPrice').value = p.price || '';
    document.getElementById('pTag').value = p.tag || '';
    document.getElementById('pDesc').value = p.description || '';
    document.getElementById('pFeatures').value = Array.isArray(p.features) ? p.features.join('\n') : '';
    document.getElementById('pAddon').value = p.addon || '';
    document.getElementById('pCta').value = p.cta || '';
    document.getElementById('pOrder').value = p.order || 1;
    document.getElementById('pFeatured').checked = !!p.featured;

    document.getElementById('formTitle').textContent = 'Edit Package';
    document.getElementById('submitBtn').textContent = 'Update Package';
    document.getElementById('cancelEdit').style.display = 'inline-block';
    document.getElementById('pkgForm').scrollIntoView({ behavior: 'smooth' });
  }

  function resetForm() {
    const form = document.getElementById('pkgForm');
    if (form) form.reset();
    document.getElementById('editId').value = '';
    document.getElementById('formTitle').textContent = 'Add New Package';
    document.getElementById('submitBtn').textContent = 'Add Package';
    document.getElementById('cancelEdit').style.display = 'none';
  }

  /* ── Delete Package ── */
  async function deletePackage(id) {
    if (!confirm('Are you sure you want to delete this package?')) return;
    try {
      try {
        await deleteDoc(doc(db, 'packages', id));
      } catch (e) {}
      currentPackages = currentPackages.filter(p => p.id !== id);
      localStorage.setItem('infinite_packages', JSON.stringify(currentPackages));
      toast('Package deleted.', 'ok');
      const cnt = document.getElementById('pkgCount');
      if (cnt) cnt.textContent = '(' + currentPackages.length + ')';
      renderPackageList();
    } catch (e) {
      toast('Delete failed: ' + e.message, 'err');
    }
  }

  /* ── Reset to Defaults ── */
  async function resetDefaults() {
    if (!confirm('Reset all packages to the defaults from data/packages.json? Any custom edits will be replaced.')) return;
    try {
      const res = await fetch('../data/packages.json');
      const defaultPkgs = await res.json();
      if (!Array.isArray(defaultPkgs) || defaultPkgs.length === 0) {
        throw new Error('Default packages unavailable');
      }

      // Sync to Firestore if available
      try {
        const snap = await getDocs(collection(db, 'packages')).catch(() => ({ empty: true }));
        if (!snap.empty) {
          for (const d of snap.docs) {
            await deleteDoc(doc(db, 'packages', d.id)).catch(() => {});
          }
        }
        for (const pkg of defaultPkgs) {
          await setDoc(doc(db, 'packages', pkg.id), pkg).catch(() => {});
        }
      } catch (err) {
        console.warn('Firestore reset fallback:', err.message);
      }

      currentPackages = [...defaultPkgs];
      localStorage.setItem('infinite_packages', JSON.stringify(currentPackages));
      toast('Default packages restored & synced!', 'ok');
      loadPackages();
    } catch (e) {
      toast('Reset failed: ' + e.message, 'err');
    }
  }

  /* ── Initialize on Auth Confirmation ── */
  initAdminAuth(() => {
    loadPackages();
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Form Submit
    const pkgForm = document.getElementById('pkgForm');
    if (pkgForm) {
      pkgForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const name = sanitizeInput(document.getElementById('pName').value, 100);
        const price = sanitizeInput(document.getElementById('pPrice').value, 50);
        const tag = sanitizeInput(document.getElementById('pTag').value, 50);
        const desc = sanitizeInput(document.getElementById('pDesc').value, 500);
        const featuresRaw = document.getElementById('pFeatures').value;
        const addon = sanitizeInput(document.getElementById('pAddon').value, 200);
        const cta = sanitizeInput(document.getElementById('pCta').value, 50) || 'Get Started';
        const order = parseInt(document.getElementById('pOrder').value, 10) || 1;
        const featured = document.getElementById('pFeatured').checked;
        const editId = document.getElementById('editId').value;

        if (!name || !price || !featuresRaw.trim()) {
          toast('Please fill all required fields.', 'err');
          return;
        }

        const features = featuresRaw
          .split('\n')
          .map(f => sanitizeInput(f, 150))
          .filter(f => f.length > 0);

        const btn = document.getElementById('submitBtn');
        btn.disabled = true;
        btn.textContent = 'Saving…';

        const pkgData = {
          name,
          price,
          tag: tag || 'Package',
          description: desc,
          features,
          addon,
          cta,
          order,
          featured
        };

        try {
          if (editId) {
            try {
              await updateDoc(doc(db, 'packages', editId), pkgData);
            } catch (err) {
              console.log('Firebase update failed, updating local state', err);
            }
            const idx = currentPackages.findIndex(p => p.id === editId);
            if (idx !== -1) {
              currentPackages[idx] = { id: editId, ...pkgData };
            }
            toast('Package updated successfully!', 'ok');
          } else {
            let newId = 'pkg-' + Date.now();
            try {
              const docRef = await addDoc(collection(db, 'packages'), pkgData);
              newId = docRef.id;
            } catch (err) {
              console.log('Firebase add failed, adding to local state', err);
            }
            currentPackages.push({ id: newId, ...pkgData });
            toast('New package added!', 'ok');
          }

          localStorage.setItem('infinite_packages', JSON.stringify(currentPackages));
          resetForm();
          loadPackages();
        } catch (err) {
          toast('Error: ' + err.message, 'err');
        } finally {
          btn.disabled = false;
          btn.textContent = editId ? 'Update Package' : 'Add Package';
        }
      });
    }

    // Cancel edit
    const cancelEditBtn = document.getElementById('cancelEdit');
    if (cancelEditBtn) {
      cancelEditBtn.addEventListener('click', resetForm);
    }

    // Reset defaults button
    const resetBtn = document.getElementById('resetDefaultsBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetDefaults);
    }
  });
})();
