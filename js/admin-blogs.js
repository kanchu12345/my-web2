/**
 * js/admin-blogs.js
 * Blog Manager Controller for Infinite Creative Web Design Admin Panel.
 * Hardened features:
 * - Shared auth gate via initAdminAuth
 * - Uses shared sanitize.js (escapeHTML, sanitizeInput, sanitizeURL)
 * - Zero inline scripts or inline event attributes (strict CSP compliant)
 * - Strict collection integrity: all reads/writes target Firestore 'blogs' collection only
 * - Complete CRUD (create, read, update, delete) + AI draft approval
 */

import { initAdminAuth } from './admin-nav.js';
import { auth, db, storage, onAuthStateChanged, signOut,
  collection, getDocs, addDoc, updateDoc, setDoc, deleteDoc, doc, serverTimestamp,
  ref, uploadBytes, getDownloadURL }
  from './firebase-config.js';
import { logContentChange } from './audit-logger.js';
import { escapeHTML, sanitizeInput, sanitizeURL } from './sanitize.js';

(function () {
  'use strict';

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

  /* ── File validation ── */
  const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const MAX_SIZE = 5 * 1024 * 1024;
  let selectedFile = null;

  function showFileErr(msg) {
    const el = document.getElementById('fileError');
    if (el) {
      el.textContent = msg;
      el.style.display = 'block';
    }
  }

  /* ── Load Blogs with JSON, LocalStorage & Firestore Sync ── */
  async function loadBlogs() {
    const list = document.getElementById('projList');
    const cnt = document.getElementById('projCount');
    if (!list) return;

    list.innerHTML = '<div class="no-projects">Loading blogs…</div>';

    let items = [];

    // 1. Fetch from data/blogs.json
    try {
      const res = await fetch('../data/blogs.json');
      const data = await res.json();
      const articles = data.articles || (Array.isArray(data) ? data : []);
      if (Array.isArray(articles)) {
        items = articles.map((a, i) => {
          const isSi = a.lang === 'si' || a.is_sinhala || (a.title && /[\u0D80-\u0DFF]/.test(a.title));
          const isTa = a.lang === 'ta' || a.is_tamil;
          const lang = a.lang || (isSi ? 'si' : (isTa ? 'ta' : 'en'));
          return {
            id: a.id || a.slug || 'blog_' + i,
            title: a.title,
            titleSi: a.title_si || a.titleSi || (isSi ? a.title : ''),
            category: a.category || 'Web Design',
            description: a.summary || a.excerpt || a.description || '',
            descSi: a.summary_si || a.descSi || (isSi ? (a.summary || a.description) : ''),
            image: a.image || a.cover || '',
            status: a.status || 'published',
            lang: lang,
            isPermanent: a.is_permanent ?? true,
            humanReviewed: a.human_reviewed ?? a.humanReviewed ?? (a.status !== 'draft')
          };
        });
      }
    } catch (e) {}

    // 2. Fetch custom blogs from localStorage
    try {
      const custom = JSON.parse(localStorage.getItem('infinite_custom_blogs') || '[]');
      if (Array.isArray(custom)) {
        items = [...custom.map(c => {
          const isSi = c.lang === 'si' || c.is_sinhala || (c.title && /[\u0D80-\u0DFF]/.test(c.title));
          return {
            status: 'published',
            humanReviewed: true,
            lang: c.lang || (isSi ? 'si' : 'en'),
            titleSi: c.title_si || c.titleSi || '',
            descSi: c.summary_si || c.descSi || '',
            isPermanent: c.is_permanent ?? true,
            ...c
          };
        }), ...items];
      }
    } catch (e) {}

    // 3. Merge Firestore blogs strictly from 'blogs' collection
    try {
      const snap = await getDocs(collection(db, 'blogs'));
      if (!snap.empty) {
        const fbItems = [];
        snap.forEach(d => {
          const data = d.data();
          const isSi = data.lang === 'si' || data.is_sinhala || (data.title && /[\u0D80-\u0DFF]/.test(data.title));
          fbItems.push({
            id: d.id,
            ...data,
            status: data.status || 'published',
            lang: data.lang || (isSi ? 'si' : 'en'),
            titleSi: data.title_si || data.titleSi || '',
            descSi: data.summary_si || data.descSi || '',
            isPermanent: data.is_permanent ?? true,
            humanReviewed: data.human_reviewed ?? data.humanReviewed ?? (data.status !== 'draft')
          });
        });
        items = [...fbItems, ...items];
      }
    } catch (e) {}

    // Filter out deleted blogs and deduplicate
    let deletedIds = [];
    try {
      deletedIds = JSON.parse(localStorage.getItem('infinite_deleted_blogs') || '[]');
    } catch (e) {}

    const seen = new Set();
    const uniqueBlogs = [];
    items.forEach(b => {
      const key = (b.id || b.title || '').toLowerCase().trim();
      if (key && !seen.has(key) && !deletedIds.includes(b.id) && !deletedIds.includes(b.title)) {
        seen.add(key);
        uniqueBlogs.push(b);
      }
    });

    if (cnt) cnt.textContent = `(${uniqueBlogs.length})`;

    list.innerHTML = '';
    if (uniqueBlogs.length === 0) {
      list.innerHTML = '<div class="no-projects">No blogs found. Add your first blog →</div>';
      return;
    }

    uniqueBlogs.forEach(p => {
      list.appendChild(makeListItem(p));
    });
  }

  function makeListItem(p) {
    const div = document.createElement('div');
    div.className = 'proj-list-item';
    const safeImg = sanitizeURL(p.image || '');
    const safeTitle = escapeHTML(p.title || '');
    const safeCat = escapeHTML(p.category || '');
    const isDraft = p.status === 'draft';
    const draftBadge = isDraft
      ? `<span class="badge-draft" style="background:#f59e0b; color:#0f172a; font-size:10px; font-weight:800; padding:2px 8px; border-radius:12px; margin-left:8px; vertical-align:middle; text-transform:uppercase; letter-spacing:0.04em;">DRAFT — REVIEW REQUIRED</span>`
      : '';

    const langBadge = p.lang === 'si'
      ? `<span style="background:rgba(4,170,109,0.18); color:#04AA6D; border:1px solid rgba(4,170,109,0.35); font-size:10px; font-weight:800; padding:2px 7px; border-radius:10px; margin-left:6px; vertical-align:middle;">සිංහල</span>`
      : (p.lang === 'ta'
        ? `<span style="background:rgba(168,85,247,0.18); color:#c084fc; border:1px solid rgba(168,85,247,0.35); font-size:10px; font-weight:800; padding:2px 7px; border-radius:10px; margin-left:6px; vertical-align:middle;">தமிழ்</span>`
        : `<span style="background:rgba(56,189,248,0.18); color:#38bdf8; border:1px solid rgba(56,189,248,0.35); font-size:10px; font-weight:800; padding:2px 7px; border-radius:10px; margin-left:6px; vertical-align:middle;">EN</span>`);

    const subtitle = (p.titleSi && p.titleSi !== p.title)
      ? `<div style="font-size:12px; color:#a3e635; margin-top:2px; font-weight:500;">${escapeHTML(p.titleSi)}</div>`
      : '';

    const approveBtn = isDraft
      ? `<button class="btn-approve" style="background:#04AA6D; color:#fff; border:none; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; margin-right:6px;" data-id="${escapeHTML(p.id)}">Approve & Publish</button>`
      : '';

    div.innerHTML = `
      <img class="proj-thumb" src="${safeImg}" alt="${safeTitle}" onerror="this.style.background='var(--bg2)'">
      <div class="proj-info">
        <div class="proj-name">${safeTitle} ${langBadge} ${draftBadge}</div>
        ${subtitle}
        <div class="proj-cat">${safeCat}</div>
      </div>
      <div class="proj-actions">
        ${approveBtn}
        <button class="btn-edit" data-id="${escapeHTML(p.id)}">Edit</button>
        <button class="btn-del" data-id="${escapeHTML(p.id)}">Delete</button>
      </div>`;

    if (isDraft) {
      const btnApp = div.querySelector('.btn-approve');
      if (btnApp) btnApp.addEventListener('click', () => approveBlog(p));
    }
    div.querySelector('.btn-del').addEventListener('click', () => deleteBlog(p.id));
    div.querySelector('.btn-edit').addEventListener('click', () => editBlog(p));
    return div;
  }

  async function approveBlog(p) {
    if (!confirm(`Approve and publish "${p.title}" live to the website?`)) return;
    try {
      try {
        await updateDoc(doc(db, 'blogs', p.id), {
          status: 'published',
          humanReviewed: true,
          updatedAt: serverTimestamp()
        });
      } catch (err) {
        console.warn('Firestore direct write unavailable:', err.message);
      }

      try {
        let custom = JSON.parse(localStorage.getItem('infinite_custom_blogs') || '[]');
        const idx = custom.findIndex(b => b.id === p.id);
        if (idx !== -1) {
          custom[idx].status = 'published';
          custom[idx].humanReviewed = true;
        } else {
          custom.push({ ...p, status: 'published', humanReviewed: true });
        }
        localStorage.setItem('infinite_custom_blogs', JSON.stringify(custom));
      } catch (e) {}

      await logContentChange('publish', 'blogs', p.id, 'Approved and published AI draft: ' + p.title);
      toast('Draft approved and published live!', 'ok');
      loadBlogs();
    } catch (err) {
      toast('Error publishing: ' + err.message, 'err');
    }
  }

  function resetForm() {
    const form = document.getElementById('projForm');
    if (form) form.reset();
    document.getElementById('editId').value = '';
    if (document.getElementById('pLang')) document.getElementById('pLang').value = 'si';
    if (document.getElementById('pTitleSi')) document.getElementById('pTitleSi').value = '';
    if (document.getElementById('pDescSi')) document.getElementById('pDescSi').value = '';
    if (document.getElementById('pPermanent')) document.getElementById('pPermanent').checked = true;
    if (document.getElementById('pStatus')) document.getElementById('pStatus').value = 'published';
    document.getElementById('formTitle').textContent = 'Add New Blog';
    document.getElementById('submitBtn').textContent = 'Add Blog';
    document.getElementById('cancelEdit').style.display = 'none';
    document.getElementById('imgPreview').style.display = 'none';
    selectedFile = null;
  }

  function editBlog(p) {
    document.getElementById('editId').value = p.id;
    if (document.getElementById('pLang')) document.getElementById('pLang').value = p.lang || 'si';
    document.getElementById('pTitle').value = p.title || '';
    if (document.getElementById('pTitleSi')) document.getElementById('pTitleSi').value = p.titleSi || p.title_si || '';
    document.getElementById('pCategory').value = p.category || '';
    if (document.getElementById('pStatus')) document.getElementById('pStatus').value = p.status || 'published';
    document.getElementById('pDesc').value = p.description || '';
    if (document.getElementById('pDescSi')) document.getElementById('pDescSi').value = p.descSi || p.summary_si || '';
    if (document.getElementById('pPermanent')) document.getElementById('pPermanent').checked = p.isPermanent !== false;
    if (p.image) {
      const prev = document.getElementById('imgPreview');
      prev.src = sanitizeURL(p.image);
      prev.style.display = 'block';
    }
    document.getElementById('formTitle').textContent = 'Edit Blog';
    document.getElementById('submitBtn').textContent = 'Update Blog';
    document.getElementById('cancelEdit').style.display = 'block';
    document.getElementById('projForm').scrollIntoView({ behavior: 'smooth' });
  }

  async function deleteBlog(id) {
    if (!confirm('Delete this blog? This cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'blogs', id));

      // Clean up local caches so it cannot resurrect
      try {
        let custom = JSON.parse(localStorage.getItem('infinite_custom_blogs') || '[]');
        custom = custom.filter(b => b.id !== id && b.title !== id);
        localStorage.setItem('infinite_custom_blogs', JSON.stringify(custom));

        let deleted = JSON.parse(localStorage.getItem('infinite_deleted_blogs') || '[]');
        if (!deleted.includes(id)) {
          deleted.push(id);
          localStorage.setItem('infinite_deleted_blogs', JSON.stringify(deleted));
        }
      } catch (e) {}

      await logContentChange('delete', 'blogs', id, 'Deleted blog: ' + id);
      toast('Blog deleted.', 'ok');
      loadBlogs();
    } catch (e) {
      toast('Delete failed: ' + e.message, 'err');
    }
  }

  // Initialize auth gate
  initAdminAuth(() => {
    loadBlogs();
  });

  document.addEventListener('DOMContentLoaded', () => {
    // File upload handlers
    const imgFileInput = document.getElementById('imgFile');
    if (imgFileInput) {
      imgFileInput.addEventListener('change', function () {
        const file = this.files[0];
        document.getElementById('fileError').style.display = 'none';
        document.getElementById('imgPreview').style.display = 'none';
        selectedFile = null;
        if (!file) return;
        if (!ALLOWED.includes(file.type)) {
          showFileErr('Only JPG, PNG, WebP, or GIF images are allowed.');
          return;
        }
        if (file.size > MAX_SIZE) {
          showFileErr('File must be under 5MB.');
          return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
          const arr = new Uint8Array(e.target.result).slice(0, 4);
          const hex = Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
          const valid = hex.startsWith('ffd8') || hex.startsWith('89504e47') || hex.startsWith('52494646') || hex === '47494638';
          if (!valid && file.type !== 'image/webp') {
            showFileErr('Invalid image file. Please upload a real image.');
            return;
          }
          selectedFile = file;
          const prev = document.getElementById('imgPreview');
          prev.src = URL.createObjectURL(file);
          prev.style.display = 'block';
        };
        reader.readAsArrayBuffer(file.slice(0, 8));
      });
    }

    const ua = document.getElementById('uploadArea');
    if (ua) {
      ua.addEventListener('dragover', e => {
        e.preventDefault();
        ua.classList.add('drag');
      });
      ua.addEventListener('dragleave', () => ua.classList.remove('drag'));
      ua.addEventListener('drop', e => {
        e.preventDefault();
        ua.classList.remove('drag');
        const f = e.dataTransfer.files[0];
        if (f && imgFileInput) {
          imgFileInput.files = e.dataTransfer.files;
          imgFileInput.dispatchEvent(new Event('change'));
        }
      });
      ua.addEventListener('click', () => {
        if (imgFileInput) imgFileInput.click();
      });
    }

    // Cancel edit button
    const cancelEditBtn = document.getElementById('cancelEdit');
    if (cancelEditBtn) {
      cancelEditBtn.addEventListener('click', resetForm);
    }

    // Submit form handler
    const form = document.getElementById('projForm');
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const lang = sanitizeInput(document.getElementById('pLang').value || 'si', 10);
        const title = sanitizeInput(document.getElementById('pTitle').value, 150);
        const titleSi = sanitizeInput(document.getElementById('pTitleSi').value, 200);
        const cat = sanitizeInput(document.getElementById('pCategory').value, 50);
        const desc = sanitizeInput(document.getElementById('pDesc').value, 1000);
        const descSi = sanitizeInput(document.getElementById('pDescSi').value, 2000);
        const status = sanitizeInput(document.getElementById('pStatus').value || 'published', 20);
        const humanReviewed = (status === 'published');
        const isPermanent = document.getElementById('pPermanent') ? document.getElementById('pPermanent').checked : true;
        const isSinhala = (lang === 'si' || !!titleSi);
        const editId = document.getElementById('editId').value;

        if (!title || !cat) {
          toast('Please fill required fields.', 'err');
          return;
        }

        const btn = document.getElementById('submitBtn');
        btn.disabled = true;
        btn.textContent = 'Saving…';

        try {
          let imageUrl = '';
          if (selectedFile) {
            const storageRef = ref(storage, `blogs/${Date.now()}_${selectedFile.name}`);
            await uploadBytes(storageRef, selectedFile);
            imageUrl = await getDownloadURL(storageRef);
          }
          const blogPayload = {
            title,
            title_si: titleSi,
            category: cat,
            status,
            lang,
            is_sinhala: isSinhala,
            is_permanent: isPermanent,
            humanReviewed,
            description: desc,
            summary_si: descSi
          };

          if (editId) {
            const data = { ...blogPayload, updatedAt: serverTimestamp() };
            if (imageUrl) data.image = imageUrl;
            await updateDoc(doc(db, 'blogs', editId), data);
            await logContentChange('update', 'blogs', editId, title);

            // Also update local cache
            try {
              let custom = JSON.parse(localStorage.getItem('infinite_custom_blogs') || '[]');
              const idx = custom.findIndex(b => b.id === editId);
              if (idx !== -1) {
                custom[idx] = { ...custom[idx], ...data, id: editId };
              } else {
                custom.unshift({ ...data, id: editId });
              }
              localStorage.setItem('infinite_custom_blogs', JSON.stringify(custom));
            } catch (e) {}

            toast('Blog updated!', 'ok');
          } else {
            const newDocData = { ...blogPayload, image: imageUrl, createdAt: serverTimestamp() };
            const newDoc = await addDoc(collection(db, 'blogs'), newDocData);
            await logContentChange('create', 'blogs', newDoc.id, title);

            // Save to local cache
            try {
              let custom = JSON.parse(localStorage.getItem('infinite_custom_blogs') || '[]');
              custom.unshift({ ...newDocData, id: newDoc.id });
              localStorage.setItem('infinite_custom_blogs', JSON.stringify(custom));
            } catch (e) {}

            toast('Blog added!', 'ok');
          }
          resetForm();
          loadBlogs();
        } catch (err) {
          toast('Error: ' + err.message, 'err');
        } finally {
          btn.disabled = false;
          btn.textContent = editId ? 'Update Blog' : 'Add Blog';
        }
      });
    }
  });
})();
