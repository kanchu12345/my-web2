/**
 * js/admin-projects.js
 * Project & Design Manager Controller for Infinite Creative Web Design Admin Panel.
 * Uses shared auth gating, sanitization, and data consistency reconciliation.
 */

import { initAdminAuth } from './admin-nav.js';
import { 
  db, collection, getDocs, addDoc, setDoc, deleteDoc, doc, serverTimestamp 
} from './firebase-config.js';
import { logContentChange } from './audit-logger.js';
import { escapeHTML, sanitizeInput, sanitizeURL } from './sanitize.js';

(function () {
  'use strict';

  let currentProjects = [];

  /* ── Toast Notification ── */
  function toast(msg, type) {
    const t = document.getElementById('toast');
    const m = document.getElementById('toastMsg');
    if (!t || !m) return;
    t.className = 'toast show toast-' + (type || 'ok');
    m.textContent = msg;
    setTimeout(() => {
      t.classList.remove('show');
    }, 3200);
  }

  /* ── Canonical Project Reconciliation (Task 3) ── */
  function reconcileProject(p) {
    if (!p) return p;
    const urlLower = (p.url || '').toLowerCase();
    const titleLower = (p.title || '').toLowerCase();
    if (urlLower.includes('hikkasurfschool.com') || titleLower.includes('hikka surf') || titleLower === 'hikkasurfschool') {
      return {
        ...p,
        title: 'Hiri Surf School',
        url: 'https://hirisurfschool.com/',
        category: 'Tourism & Beach Academy',
        description: 'Premier surf school and tropical resort booking platform in Hiriketiya, Sri Lanka with custom booking workflows and lesson schedules.',
        featured: true,
        featuredOrder: 2
      };
    }
    return p;
  }

  function normalizeProjectSlug(p) {
    if (!p) return '';
    p = reconcileProject(p);
    let urlStr = (p.url || '').trim().toLowerCase();
    if (urlStr) {
      urlStr = urlStr.replace(/^https?:\/\//, '').replace(/^www\./, '');
      urlStr = urlStr.split(/[?#]/)[0];
      urlStr = urlStr.replace(/\/+$/, '');
      if (urlStr.includes('hikkasurfschool.com')) return 'hirisurfschool.com';
      if (urlStr.length > 3) return urlStr;
    }
    const title = (p.title || '').toLowerCase()
      .replace(/\(.*?\)/g, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
    if (title.includes('hikkasurf')) return 'hirisurfschool';
    return title || (p.id || '');
  }

  /* ── Auto-Preview from URL ── */
  function generatePreview(url) {
    if (!url || typeof url !== 'string') return;
    url = url.trim();
    if (url.indexOf('http') !== 0) return;

    const mockupUrl = 'https://s0.wp.com/mshots/v1/' + encodeURIComponent(url) + '?w=650&h=480';
    const imgUrlInput = document.getElementById('pImgUrl');
    const imgPrev = document.getElementById('imgPreview');
    const noPrevText = document.getElementById('noPreviewText');
    const titleInput = document.getElementById('pTitle');

    if (imgUrlInput) imgUrlInput.value = mockupUrl;
    if (imgPrev) {
      imgPrev.src = sanitizeURL(mockupUrl);
      imgPrev.style.display = 'block';
    }
    if (noPrevText) noPrevText.style.display = 'none';

    if (titleInput && !titleInput.value.trim()) {
      try {
        const u = new URL(url);
        let name = u.hostname.replace('www.', '').split('.')[0];
        if (u.hostname.indexOf('github.io') !== -1) {
          const pathPart = u.pathname.replace(/\//g, '');
          if (pathPart) name = pathPart.replace(/[-_]/g, ' ');
        }
        titleInput.value = name.charAt(0).toUpperCase() + name.slice(1);
      } catch (e) {}
    }

    toast('Auto-generated live preview!', 'ok');
  }

  /* ── Load Projects: Firestore + Baseline JSON + LocalStorage ── */
  async function loadProjects() {
    const list = document.getElementById('projList');
    const cnt = document.getElementById('projCount');
    if (!list) return;

    list.innerHTML = '<div class="no-projects">Loading projects from Firestore&hellip;</div>';

    let fbProjects = [];
    let jsonProjects = [];
    let localProjects = [];

    // 1. Fetch from Firestore
    try {
      const snap = await getDocs(collection(db, 'projects'));
      if (!snap.empty) {
        snap.forEach(docSnap => {
          fbProjects.push({ id: docSnap.id, ...docSnap.data(), _source: 'firestore' });
        });
      }
    } catch (err) {
      console.warn('Firestore fetch notice:', err.message);
    }

    // 2. Fetch baseline data/projects.json
    try {
      const res = await fetch('../data/projects.json');
      const data = await res.json();
      if (Array.isArray(data)) {
        jsonProjects = data.map((p, i) => ({ id: 'json_' + i, ...p, _source: 'json' }));
      }
    } catch (e) {}

    // 3. Fetch custom projects from localStorage & sanitize any stale data
    try {
      let rawCustom = JSON.parse(localStorage.getItem('infinite_custom_projects') || '[]');
      if (Array.isArray(rawCustom)) {
        // Clean stale hikka entries into canonical Hiri Surf School
        localProjects = rawCustom.map(reconcileProject);
        localStorage.setItem('infinite_custom_projects', JSON.stringify(localProjects));
      }
    } catch (e) {}

    // Combine: Firestore docs first, then local, then baseline JSON
    const merged = [...fbProjects, ...localProjects, ...jsonProjects];
    const seen = new Set();
    const unique = [];

    merged.forEach(p => {
      const reconciled = reconcileProject(p);
      const slug = normalizeProjectSlug(reconciled);
      if (slug && !seen.has(slug)) {
        seen.add(slug);
        unique.push(reconciled);
      }
    });

    // Auto-Sort: Featured first by featuredOrder ascending, then newest by timestamp
    unique.sort((a, b) => {
      const aFeat = !!a.featured;
      const bFeat = !!b.featured;
      if (aFeat && !bFeat) return -1;
      if (!aFeat && bFeat) return 1;
      if (aFeat && bFeat) {
        const aOrd = Number(a.featuredOrder) || 99;
        const bOrd = Number(b.featuredOrder) || 99;
        if (aOrd !== bOrd) return aOrd - bOrd;
      }
      const aTime = a.createdAt?.seconds || (a._source === 'firestore' ? 9999999999 : 0);
      const bTime = b.createdAt?.seconds || (b._source === 'firestore' ? 9999999999 : 0);
      return bTime - aTime;
    });

    currentProjects = unique;
    if (cnt) cnt.textContent = '(' + unique.length + ')';

    list.innerHTML = '';
    if (unique.length === 0) {
      list.innerHTML = '<div class="no-projects">No projects found. Add your first project below.</div>';
      return;
    }

    unique.forEach(p => {
      list.appendChild(makeListItem(p));
    });
  }

  function makeListItem(p) {
    const div = document.createElement('div');
    div.className = 'proj-list-item';
    div.style.padding = '12px 14px';
    div.style.alignItems = 'center';

    const safeImage = sanitizeURL(p.image || (p.url ? 'https://s0.wp.com/mshots/v1/' + encodeURIComponent(p.url) + '?w=650&h=480' : ''));
    let shortUrl = (p.url || '').replace('https://', '').replace('http://', '');
    if (shortUrl.length > 35) shortUrl = shortUrl.substring(0, 35) + '...';

    const safeTitle = escapeHTML(p.title || '');
    const safeCategory = escapeHTML(p.category || 'Web Design');
    const safeShortUrl = escapeHTML(shortUrl);
    const safeUrl = sanitizeURL(p.url || '');

    const featuredBadge = p.featured
      ? `<span style="background:rgba(234,179,8,0.2);color:#eab308;border:1px solid rgba(234,179,8,0.4);padding:2px 8px;border-radius:12px;font-size:10px;font-weight:800;display:inline-flex;align-items:center;gap:4px;margin-left:6px;">⭐ FEATURED (#${p.featuredOrder || 1})</span>`
      : '';

    div.innerHTML =
      '<img class="proj-thumb" src="' + safeImage + '" alt="' + safeTitle + '" onerror="this.style.background=\'#1e293b\'" style="width:64px;height:48px;border-radius:6px;object-fit:cover;background:#1e293b;flex-shrink:0;">' +
      '<div class="proj-info" style="flex:1;margin-left:12px;min-width:0;">' +
        '<div class="proj-name" style="font-weight:700;color:#fff;font-size:14px;display:flex;align-items:center;flex-wrap:wrap;gap:4px;">' + 
          safeTitle + featuredBadge + 
        '</div>' +
        '<div class="proj-cat" style="font-size:12px;color:#04AA6D;font-weight:600;margin-top:2px;">' + safeCategory + '</div>' +
        (p.url ? '<a href="' + safeUrl + '" target="_blank" rel="noopener" style="font-size:11px;color:var(--grey);text-decoration:none;display:inline-block;margin-top:2px;">&#128279; ' + safeShortUrl + '</a>' : '') +
      '</div>' +
      '<div class="proj-actions" style="display:flex;gap:6px;flex-shrink:0;">' +
        '<button class="btn-edit" style="background:rgba(0,170,255,0.15);color:#00aaff;border:none;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;">Edit</button>' +
        '<button class="btn-del" style="background:rgba(255,68,68,0.15);color:#ff4444;border:none;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;">Delete</button>' +
      '</div>';

    div.querySelector('.btn-edit').addEventListener('click', () => editProject(p));
    div.querySelector('.btn-del').addEventListener('click', () => deleteProject(p));
    return div;
  }

  function resetForm() {
    const form = document.getElementById('projForm');
    if (form) form.reset();
    document.getElementById('editId').value = '';
    document.getElementById('pFeatured').checked = false;
    document.getElementById('pFeaturedOrder').value = 1;
    document.getElementById('featuredOrderWrap').style.display = 'none';
    document.getElementById('formTitle').textContent = 'Add New Design / Project';
    document.getElementById('submitBtn').textContent = 'Add Project to Portfolio';
    document.getElementById('cancelEdit').style.display = 'none';
    document.getElementById('imgPreview').style.display = 'none';
    document.getElementById('noPreviewText').style.display = 'block';
  }

  function editProject(p) {
    document.getElementById('editId').value = p.id || '';
    document.getElementById('pTitle').value = p.title || '';
    document.getElementById('pCategory').value = p.category || '';
    document.getElementById('pUrl').value = p.url || '';
    document.getElementById('pDesc').value = p.description || '';
    document.getElementById('pTags').value = p.tags || '';
    document.getElementById('pImgUrl').value = p.image || '';

    const isFeat = !!p.featured;
    document.getElementById('pFeatured').checked = isFeat;
    document.getElementById('pFeaturedOrder').value = p.featuredOrder || 1;
    document.getElementById('featuredOrderWrap').style.display = isFeat ? 'flex' : 'none';

    const prev = document.getElementById('imgPreview');
    const noPrev = document.getElementById('noPreviewText');
    const imgSrc = p.image || (p.url ? 'https://s0.wp.com/mshots/v1/' + encodeURIComponent(p.url) + '?w=650&h=480' : '');
    if (imgSrc) {
      prev.src = sanitizeURL(imgSrc);
      prev.style.display = 'block';
      if (noPrev) noPrev.style.display = 'none';
    }

    document.getElementById('formTitle').textContent = 'Edit Design / Project';
    document.getElementById('submitBtn').textContent = 'Update Project';
    document.getElementById('cancelEdit').style.display = 'block';
    document.getElementById('projForm').scrollIntoView({ behavior: 'smooth' });
  }

  async function deleteProject(p) {
    if (!confirm('Delete "' + (p.title || 'this project') + '"? This cannot be undone.')) return;
    try {
      if (p.id && !p.id.startsWith('json_') && !p.id.startsWith('proj_local_')) {
        await deleteDoc(doc(db, 'projects', p.id));
      }
      await logContentChange('delete', 'projects', p.id || p.title, 'Deleted project: ' + (p.title || p.id));
    } catch (err) {
      console.warn('Firestore delete error:', err.message);
    }

    // Clean up from localStorage cache
    try {
      let custom = JSON.parse(localStorage.getItem('infinite_custom_projects') || '[]');
      custom = custom.filter(item => item.url !== p.url && item.title !== p.title && item.id !== p.id);
      localStorage.setItem('infinite_custom_projects', JSON.stringify(custom));
    } catch (e) {}

    toast('Project removed.', 'ok');
    loadProjects();
  }

  /* ── Initialize on Auth Confirmation ── */
  initAdminAuth(() => {
    loadProjects();
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Featured Checkbox Toggle
    const featCheck = document.getElementById('pFeatured');
    const featOrderWrap = document.getElementById('featuredOrderWrap');
    if (featCheck && featOrderWrap) {
      featCheck.addEventListener('change', function () {
        featOrderWrap.style.display = this.checked ? 'flex' : 'none';
      });
    }

    // Auto-preview listeners
    const urlInput = document.getElementById('pUrl');
    if (urlInput) {
      urlInput.addEventListener('input', function () {
        if (this.value.indexOf('http') === 0) generatePreview(this.value);
      });
      urlInput.addEventListener('paste', function () {
        const self = this;
        setTimeout(() => {
          generatePreview(self.value);
        }, 80);
      });
    }
    const autoPrevBtn = document.getElementById('autoPreviewBtn');
    if (autoPrevBtn && urlInput) {
      autoPrevBtn.addEventListener('click', function () {
        const val = urlInput.value.trim();
        if (!val) {
          toast('Enter a website link first', 'err');
          return;
        }
        generatePreview(val);
      });
    }

    // Refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        loadProjects();
        toast('Project list refreshed!', 'ok');
      });
    }

    // Cancel edit
    const cancelEditBtn = document.getElementById('cancelEdit');
    if (cancelEditBtn) {
      cancelEditBtn.addEventListener('click', resetForm);
    }

    // Form Submit
    const projForm = document.getElementById('projForm');
    if (projForm) {
      projForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const title = sanitizeInput(document.getElementById('pTitle').value, 150);
        const cat = sanitizeInput(document.getElementById('pCategory').value, 50);
        const desc = sanitizeInput(document.getElementById('pDesc').value, 500);
        const tags = sanitizeInput(document.getElementById('pTags').value, 150);
        const url = sanitizeURL(document.getElementById('pUrl').value.trim());
        const imgUrl = sanitizeURL(document.getElementById('pImgUrl').value.trim());
        const editId = document.getElementById('editId').value;
        const isFeatured = document.getElementById('pFeatured').checked;
        const featuredOrder = parseInt(document.getElementById('pFeaturedOrder').value, 10) || 1;

        if (!title || !cat) {
          toast('Please fill Title and Category.', 'err');
          return;
        }

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving to Cloud…';

        const finalImg = (imgUrl && imgUrl !== '#') 
          ? imgUrl 
          : ((url && url !== '#') ? 'https://s0.wp.com/mshots/v1/' + encodeURIComponent(url) + '?w=650&h=480' : '');

        let projectData = {
          title: title,
          category: cat,
          description: desc,
          tags: tags,
          url: url === '#' ? '' : url,
          image: finalImg,
          bg: '#0f172a',
          featured: isFeatured,
          featuredOrder: isFeatured ? featuredOrder : 99,
          updatedAt: serverTimestamp()
        };

        projectData = reconcileProject(projectData);

        try {
          if (editId && !editId.startsWith('json_') && !editId.startsWith('proj_local_')) {
            await setDoc(doc(db, 'projects', editId), projectData, { merge: true });
            await logContentChange('update', 'projects', editId, title);
          } else {
            projectData.createdAt = serverTimestamp();
            const newDoc = await addDoc(collection(db, 'projects'), projectData);
            projectData.id = newDoc.id;
            await logContentChange('create', 'projects', newDoc.id, title);
          }
          toast(editId ? 'Project updated in Firestore!' : 'Project saved to Firestore & Portfolio!', 'ok');
        } catch (err) {
          console.warn('Firestore write fallback to local storage:', err.message);
          let custom = [];
          try {
            custom = JSON.parse(localStorage.getItem('infinite_custom_projects') || '[]');
          } catch (e) {}
          if (editId) {
            custom = custom.map(p => (p.id === editId || p.url === url) ? { ...projectData, id: editId } : p);
          } else {
            projectData.id = 'proj_local_' + Date.now();
            custom.unshift(projectData);
          }
          localStorage.setItem('infinite_custom_projects', JSON.stringify(custom.map(reconcileProject)));
          toast('Saved locally (Firestore offline/rules sync)', 'ok');
        } finally {
          submitBtn.disabled = false;
          resetForm();
          loadProjects();
        }
      });
    }
  });
})();
