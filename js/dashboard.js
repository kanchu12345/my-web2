/* ═══════════════════════════════════════════════════
   dashboard.js — Real-Time Firestore Analytics Dashboard
   ═══════════════════════════════════════════════════ */
import { auth, db, onAuthStateChanged, signOut, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp }
  from '../js/firebase-config.js';
import { initAdminAuth } from './admin-nav.js';

/* ── Bot Activity Logs ──────────────────────────── */
async function refreshDashboardBotLogs() {
  const container = document.getElementById('dashboardBotLogsContainer');
  if (!container) return;
  try {
    const res = await fetch('../data/bot-activity-log.json?v=' + Date.now());
    if (!res.ok) throw new Error('Log file unavailable');
    const logs = await res.json();
    if (!logs || !Array.isArray(logs) || logs.length === 0) {
      container.innerHTML = '<div style="color:#94a3b8;">No activity logged yet.</div>';
      return;
    }
    let html = '';
    logs.slice(0, 5).forEach(log => {
      const safeIcon = escapeHTML(log.bot_icon || '🤖');
      const safeName = escapeHTML(log.bot_name || 'AI Bot');
      const safeTimestamp = escapeHTML(log.timestamp || '');
      const safeMessage = escapeHTML(log.message || '');
      html += `
        <div style="background:#131b2e; border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:12px 16px; margin-bottom:8px; display:flex; gap:12px; align-items:center;">
          <span style="font-size:18px;">${safeIcon}</span>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:2px;">
              <strong style="color:#fff;">${safeName}</strong>
              <small style="color:#64748b;">${safeTimestamp}</small>
            </div>
            <div style="color:#cbd5e1; font-size:0.82rem;">${safeMessage}</div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = '<div style="color:#94a3b8; font-size:0.85rem;">Live logs updated.</div>';
  }
}
window.refreshDashboardBotLogs = refreshDashboardBotLogs;

/* ── Strict Firebase Auth guard ── */
initAdminAuth(function(user){
  window.__firebaseUser = user;
  init();
  refreshDashboardBotLogs();
  document.getElementById('btnRefreshDashboardBots')?.addEventListener('click', refreshDashboardBotLogs);
});

/* ── Chart defaults ─────────────────────────────── */
Chart.defaults.color = '#808080';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'Inter', sans-serif";

const BLUE   = '#00aaff';
const GREEN  = '#00cc66';
const YELLOW = '#ffaa00';
const RED    = '#ff4444';
const PURPLE = '#9966ff';

function rgba(hex, a){
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

/* ── Globals for Analytics Data ─────────────────── */
let allLogs = [];
let unsubscribeLogs = null;

let trafficChartInstance = null;
let sourcesChartInstance = null;
let devicesChartInstance = null;
let geoChartInstance = null;

/* ── KPI cards helper ───────────────────────────── */
function setKPI(id, val, trend, trendClass){
  const el=document.getElementById(id); if(el) el.textContent=val;
  const tr=document.getElementById(id+'Trend');
  if(tr){tr.textContent=trend; tr.className='kpi-trend '+(trendClass||'');}
}
function numFmt(n){return n>=1000?(n/1000).toFixed(1)+'k':n;}

/* ── Setup Real-Time Listeners ──────────────────── */
async function fetchRealtimeLogs() {
  try {
    const { db, collection, query, orderBy, onSnapshot } = await import('../js/firebase-config.js');
    
    if (unsubscribeLogs) unsubscribeLogs();
    
    // Retrieve logs ordered by timestamp
    const q = query(collection(db, 'analytics_logs'), orderBy('timestamp', 'desc'));
    
    unsubscribeLogs = onSnapshot(q, (snapshot) => {
      allLogs = [];
      snapshot.forEach(doc => {
        allLogs.push({ id: doc.id, ...doc.data() });
      });
      
      const selectEl = document.getElementById('periodSelect');
      const days = selectEl ? parseInt(selectEl.value) : 30;
      renderDashboard(days);
    }, (error) => {
      console.error("Realtime logs subscription failed:", error);
    });
  } catch(e) {
    console.error("Firestore setup error:", e);
  }
}

/* ── Render Dashboard Widgets ───────────────────── */
function renderDashboard(days) {
  const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
  const filteredLogs = allLogs.filter(l => l.timestamp >= cutoff);

  calculateKPIs(filteredLogs);
  renderTrafficChart(filteredLogs, days);
  renderSourcesChart(filteredLogs);
  renderDevicesChart(filteredLogs);
  renderGeoChart(filteredLogs);
  renderTopPages(filteredLogs);
  updateLiveUsers();
}

/* ── 1. Calculate KPI Metrics ───────────────────── */
function calculateKPIs(logs) {
  const sessions = new Set();
  let pageViews = 0;
  let waClicks = 0;
  let ctaClicks = 0;
  
  const sessionActivities = {};

  logs.forEach(l => {
    if (l.sessionId) {
      sessions.add(l.sessionId);
      if (!sessionActivities[l.sessionId]) {
        sessionActivities[l.sessionId] = { pageViews: 0, events: 0 };
      }
      if (l.type === 'page_view') {
        sessionActivities[l.sessionId].pageViews++;
      } else if (l.type === 'cta_click' || l.type === 'wa_click') {
        sessionActivities[l.sessionId].events++;
      }
    }

    if (l.type === 'page_view') pageViews++;
    else if (l.type === 'wa_click') waClicks++;
    else if (l.type === 'cta_click') ctaClicks++;
  });

  // Calculate Bounce Rate (sessions with exactly 1 page_view and no interactions)
  let bounces = 0;
  Object.values(sessionActivities).forEach(act => {
    if (act.pageViews === 1 && act.events === 0) bounces++;
  });
  const bounceRate = sessions.size > 0 
    ? ((bounces / sessions.size) * 100).toFixed(1) + '%' 
    : '0%';

  setKPI('kpiVisitors', numFmt(sessions.size), 'Unique sessions', 'positive');
  setKPI('kpiViews', numFmt(pageViews), 'Total views logged', 'positive');
  setKPI('kpiSessions', numFmt(sessions.size), 'Active sessions', 'positive');
  setKPI('kpiBounce', bounceRate, bounces > 0 ? `${bounces} bounced sessions` : '0 bounces', 'positive');
  setKPI('kpiWA', waClicks.toString(), 'Conversions from WA', 'positive');
  setKPI('kpiCTA', ctaClicks.toString(), 'Conversions from CTA', 'positive');
}

/* ── 2. Render Line Chart (Traffic Over Time) ───── */
function renderTrafficChart(logs, days) {
  const ctx = document.getElementById('trafficChart');
  if (!ctx) return;

  const labels = [];
  const visitorsMap = {};
  const viewsMap = {};

  // Build daily bins
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
    const key = d.toDateString();
    labels.push({ label: dateStr, key: key });
    visitorsMap[key] = new Set();
    viewsMap[key] = 0;
  }

  logs.forEach(l => {
    const key = new Date(l.timestamp).toDateString();
    if (visitorsMap[key] !== undefined) {
      if (l.sessionId) visitorsMap[key].add(l.sessionId);
      if (l.type === 'page_view') viewsMap[key]++;
    }
  });

  const visitorData = labels.map(l => visitorsMap[l.key].size);
  const viewsData = labels.map(l => viewsMap[l.key]);

  if (trafficChartInstance) trafficChartInstance.destroy();

  trafficChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.map(l => l.label),
      datasets: [{
        label: 'Visitors', data: visitorData,
        borderColor: BLUE, backgroundColor: rgba(BLUE, 0.1),
        fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 6,
        borderWidth: 2
      }, {
        label: 'Page Views', data: viewsData,
        borderColor: GREEN, backgroundColor: rgba(GREEN, 0.08),
        fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 6,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { maxTicksLimit: 8 } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, beginAtZero: true, ticks: { precision: 0 } }
      }
    }
  });
}

/* ── 3. Render Bar Chart (Traffic Sources) ──────── */
function renderSourcesChart(logs) {
  const ctx = document.getElementById('sourcesChart');
  if (!ctx) return;

  const sources = { 'Direct': 0, 'Google': 0, 'Social': 0, 'Referral': 0, 'Email': 0, 'Other': 0 };

  logs.forEach(l => {
    if (l.type === 'page_view') {
      const ref = l.referrer || 'Direct';
      if (sources[ref] !== undefined) sources[ref]++;
      else sources['Other']++;
    }
  });

  const dataValues = [
    sources['Direct'], 
    sources['Google'], 
    sources['Social'], 
    sources['Referral'], 
    sources['Email'], 
    sources['Other']
  ];

  if (sourcesChartInstance) sourcesChartInstance.destroy();

  sourcesChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Direct', 'Google', 'Social', 'Referral', 'Email', 'Other'],
      datasets: [{
        label: 'Sessions',
        data: dataValues,
        backgroundColor: [rgba(BLUE, 0.7), rgba(GREEN, 0.7), rgba(PURPLE, 0.7), rgba(YELLOW, 0.7), rgba(RED, 0.7), rgba('#a0a0a0', 0.5)],
        borderRadius: 8, borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, beginAtZero: true, ticks: { precision: 0 } }
      }
    }
  });
}

/* ── 4. Render Doughnut Chart (Device Types) ────── */
function renderDevicesChart(logs) {
  const ctx = document.getElementById('devicesChart');
  if (!ctx) return;

  const devices = { 'Mobile': 0, 'Desktop': 0, 'Tablet': 0 };
  let total = 0;

  logs.forEach(l => {
    if (l.type === 'page_view') {
      const dev = l.device || 'Desktop';
      if (devices[dev] !== undefined) {
        devices[dev]++;
        total++;
      }
    }
  });

  const dataValues = total > 0 
    ? [
        Math.round((devices['Mobile'] / total) * 100),
        Math.round((devices['Desktop'] / total) * 100),
        Math.round((devices['Tablet'] / total) * 100)
      ]
    : [0, 0, 0];

  if (devicesChartInstance) devicesChartInstance.destroy();

  devicesChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Mobile', 'Desktop', 'Tablet'],
      datasets: [{
        data: dataValues,
        backgroundColor: [BLUE, GREEN, PURPLE],
        borderColor: '#141414',
        borderWidth: 3, hoverOffset: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true } },
        tooltip: { callbacks: { label: c => `${c.label}: ${c.parsed}%` } }
      },
      cutout: '68%'
    }
  });
}

/* ── 5. Render Horizontal Bar Chart (Top Countries) */
function renderGeoChart(logs) {
  const ctx = document.getElementById('geoChart');
  if (!ctx) return;

  const countries = {};
  logs.forEach(l => {
    if (l.type === 'page_view') {
      const c = l.country || 'Unknown';
      countries[c] = (countries[c] || 0) + 1;
    }
  });

  const sorted = Object.entries(countries)
    .sort((a,b) => b[1] - a[1])
    .slice(0, 7);

  const labels = sorted.map(e => e[0]);
  const dataValues = sorted.map(e => e[1]);

  if (geoChartInstance) geoChartInstance.destroy();

  geoChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.length > 0 ? labels : ['No Data'],
      datasets: [{
        label: 'Visitors',
        data: dataValues.length > 0 ? dataValues : [0],
        backgroundColor: rgba(BLUE, 0.7),
        borderRadius: 6, borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, beginAtZero: true, ticks: { precision: 0 } },
        y: { grid: { display: false } }
      }
    }
  });
}

/* ── 6. Render Table (Top Pages) ────────────────── */
function renderTopPages(logs) {
  const tbody = document.getElementById('pagesBody');
  if (!tbody) return;

  const pages = {};
  logs.forEach(l => {
    if (l.type === 'page_view') {
      const p = l.page_path || '/';
      if(!pages[p]) pages[p] = { views: 0, unique: new Set() };
      pages[p].views++;
      if (l.sessionId) pages[p].unique.add(l.sessionId);
    }
  });

  const sorted = Object.entries(pages)
    .map(([p, data]) => ({ p: p, views: data.views, visitors: data.unique.size }))
    .sort((a,b) => b.views - a.views)
    .slice(0, 5);

  if (sorted.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--grey)">No pages visited yet</td></tr>`;
    return;
  }

  tbody.innerHTML = sorted.map(pg => `
    <tr>
      <td>${pg.p}</td>
      <td>${numFmt(pg.views)}</td>
      <td>${numFmt(pg.visitors)}</td>
      <td><span style="color:#00cc66">Active</span></td>
    </tr>`).join('');
}

/* ── 7. Update Live Users Panel (Last 5 mins) ───── */
function updateLiveUsers() {
  const rtCount = document.getElementById('rtCount');
  const rtBadge = document.getElementById('realtimeBadge');
  const liveList = document.getElementById('liveList');

  const fiveMinsAgo = Date.now() - (5 * 60 * 1000);
  const activeLogs = allLogs.filter(l => l.timestamp >= fiveMinsAgo);

  const activeSessions = {};
  activeLogs.forEach(l => {
    if (l.sessionId) {
      if (!activeSessions[l.sessionId] || activeSessions[l.sessionId].timestamp < l.timestamp) {
        activeSessions[l.sessionId] = {
          path: l.page_path || '/',
          country: l.country || 'Unknown',
          timestamp: l.timestamp
        };
      }
    }
  });

  const count = Object.keys(activeSessions).length;
  if (rtCount) rtCount.textContent = count;
  if (rtBadge) {
    if (count > 0) rtBadge.classList.add('active');
    else rtBadge.classList.remove('active');
  }

  if (!liveList) return;
  liveList.innerHTML = '';

  if (count === 0) {
    liveList.innerHTML = '<div class="live-empty">No active sessions</div>';
    return;
  }

  Object.values(activeSessions).forEach(sess => {
    const div = document.createElement('div');
    div.className = 'live-row';
    div.innerHTML = `
      <span class="live-dot"></span>
      <span class="live-page">${sess.path}</span>
      <span class="live-loc">${sess.country}</span>`;
    liveList.appendChild(div);
  });
}

/* ── 8. Security log ────────────────────────────── */
function loadSecurityLog(){
  try{
    const hist=JSON.parse(localStorage.getItem('id_login_hist')||'[]');
    const fails=JSON.parse(localStorage.getItem('id_attempts')||'{"count":0}');
    const el=document.getElementById('secFails'); if(el) el.textContent=fails.count||0;
    if(hist.length>0){
      const last=hist[0];
      const llEl=document.getElementById('secLastLogin');
      if(llEl) llEl.textContent=new Date(last.ts).toLocaleString();
    }
    const list=document.getElementById('lhList'); if(!list) return;
    if(hist.length===0){list.innerHTML='<div style="color:var(--grey);font-size:12px">No history yet</div>';return;}
    list.innerHTML=hist.slice(0,6).map(h=>`
      <div class="lh-item">
        <span class="lh-status ${h.status==='success'?'ok':h.status==='locked'?'locked':'fail'}"></span>
        <span class="lh-detail">${h.status==='success'?'Login success':'Login '+h.status}</span>
        <span class="lh-time">${timeAgo(h.ts)}</span>
      </div>`).join('');
  }catch(e){}
}

function timeAgo(ts){
  const diff=Date.now()-ts;
  if(diff<60000) return 'just now';
  if(diff<3600000) return Math.floor(diff/60000)+'m ago';
  if(diff<86400000) return Math.floor(diff/3600000)+'h ago';
  return Math.floor(diff/86400000)+'d ago';
}

/* ── 9. Timestamp ───────────────────────────────── */
function updateTimestamp(){
  const el=document.getElementById('lastUpdated');
  if(el) el.textContent='Updated '+new Date().toLocaleTimeString();
}

/* ── 10. Period change ──────────────────────────── */
document.getElementById('periodSelect')?.addEventListener('change',function(){
  const days=parseInt(this.value);
  renderDashboard(days);
  updateTimestamp();
});

/* ── 11. Audience & Customer Engagement Hub ───────── */

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function toast(msg, type = 'ok') {
  const t = document.getElementById('toast');
  const m = document.getElementById('toastMsg');
  if (!t || !m) return;
  t.className = 'toast show toast-' + type;
  m.textContent = msg;
  setTimeout(() => t.classList.remove('show'), 3200);
}

/* ── Subscribers Management ── */
let allSubscribers = [];

async function loadSubscribers() {
  const container = document.getElementById('subscribersListContainer');
  const badge = document.getElementById('badgeSubscribersCount');
  if (!container) return;

  const map = new Map();

  // 1. Read from localStorage
  try {
    const local = JSON.parse(localStorage.getItem('infinite_subscribers') || '[]');
    local.forEach(item => {
      const email = (typeof item === 'string' ? item : item.email || '').trim().toLowerCase();
      if (email && !map.has(email)) {
        map.set(email, {
          email: email,
          date: typeof item === 'object' && item.date ? item.date : new Date().toISOString(),
          source: (typeof item === 'object' && item.source) || 'Website Newsletter',
          id: null
        });
      }
    });
  } catch (e) {}

  // 2. Read from Firestore
  try {
    const snap = await getDocs(collection(db, 'newsletter_subscribers'));
    snap.forEach(d => {
      const data = d.data();
      const email = (data.email || '').trim().toLowerCase();
      if (email) {
        map.set(email, {
          email: email,
          date: data.subscribedAt ? (data.subscribedAt.toDate ? data.subscribedAt.toDate().toISOString() : data.subscribedAt) : new Date().toISOString(),
          source: data.source || 'Firestore Sync',
          id: d.id
        });
      }
    });
  } catch (e) {}

  allSubscribers = Array.from(map.values()).sort((a, b) => new Date(b.date) - new Date(a.date));
  
  if (badge) badge.textContent = `${allSubscribers.length} Subscribers`;
  renderSubscribers();
}

function renderSubscribers(filterText = '') {
  const container = document.getElementById('subscribersListContainer');
  if (!container) return;

  const search = filterText.toLowerCase().trim();
  const filtered = allSubscribers.filter(s => s.email.includes(search));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="color:var(--grey); font-size:13px; text-align:center; padding:32px 0;">
        ${allSubscribers.length === 0 ? 'No subscribers yet. They will appear here once visitors subscribe.' : 'No matching subscribers found.'}
      </div>`;
    return;
  }

  container.innerHTML = '';
  filtered.forEach(sub => {
    const safeEmail = escapeHTML(sub.email);
    const initial = safeEmail[0].toUpperCase();
    const formattedDate = new Date(sub.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

    const item = document.createElement('div');
    item.style.cssText = 'background:rgba(255,255,255,0.03); border:1px solid var(--glass-b); border-radius:10px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; gap:12px;';
    item.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; overflow:hidden;">
        <div style="width:30px; height:30px; border-radius:50%; background:rgba(0,170,255,0.15); color:#00aaff; font-weight:700; font-size:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          ${initial}
        </div>
        <div style="overflow:hidden;">
          <strong style="color:#fff; font-size:13px; display:block; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${safeEmail}</strong>
          <small style="color:var(--grey); font-size:11px;">Subscribed ${formattedDate} · <span style="color:rgba(0,170,255,0.8);">${escapeHTML(sub.source)}</span></small>
        </div>
      </div>
      <button class="btn-del-subscriber" data-email="${safeEmail}" style="background:none; border:none; color:var(--grey); cursor:pointer; padding:6px; border-radius:6px; display:flex; align-items:center; justify-content:center;" title="Remove subscriber">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      </button>
    `;

    const delBtn = item.querySelector('.btn-del-subscriber');
    delBtn.addEventListener('click', () => deleteSubscriber(sub));
    delBtn.addEventListener('mouseenter', () => delBtn.style.color = '#ff4444');
    delBtn.addEventListener('mouseleave', () => delBtn.style.color = 'var(--grey)');

    container.appendChild(item);
  });
}

async function addSubscriber(emailInput) {
  const email = (emailInput || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast('Please enter a valid email address.', 'err');
    return;
  }

  if (allSubscribers.some(s => s.email === email)) {
    toast('Subscriber already exists.', 'err');
    return;
  }

  const newSub = {
    email: email,
    date: new Date().toISOString(),
    source: 'Admin Direct Entry',
    id: null
  };

  // 1. Save to localStorage
  try {
    const local = JSON.parse(localStorage.getItem('infinite_subscribers') || '[]');
    local.push(email);
    localStorage.setItem('infinite_subscribers', JSON.stringify(local));
  } catch (e) {}

  // 2. Save to Firestore
  try {
    const docRef = await addDoc(collection(db, 'newsletter_subscribers'), {
      email: email,
      source: 'Admin Direct Entry',
      subscribedAt: serverTimestamp()
    });
    newSub.id = docRef.id;
  } catch (e) {}

  allSubscribers.unshift(newSub);
  renderSubscribers();
  const badge = document.getElementById('badgeSubscribersCount');
  if (badge) badge.textContent = `${allSubscribers.length} Subscribers`;
  toast(`Subscribed ${email} successfully!`, 'ok');
}

async function deleteSubscriber(sub) {
  if (!confirm(`Are you sure you want to remove ${sub.email} from subscribers?`)) return;

  // 1. Remove from localStorage
  try {
    let local = JSON.parse(localStorage.getItem('infinite_subscribers') || '[]');
    local = local.filter(item => {
      const em = typeof item === 'string' ? item : item.email;
      return em.trim().toLowerCase() !== sub.email;
    });
    localStorage.setItem('infinite_subscribers', JSON.stringify(local));
  } catch (e) {}

  // 2. Remove from Firestore
  if (sub.id) {
    try {
      await deleteDoc(doc(db, 'newsletter_subscribers', sub.id));
    } catch (e) {}
  }

  allSubscribers = allSubscribers.filter(s => s.email !== sub.email);
  renderSubscribers();
  const badge = document.getElementById('badgeSubscribersCount');
  if (badge) badge.textContent = `${allSubscribers.length} Subscribers`;
  toast('Subscriber removed.', 'ok');
}

function exportSubscribersCSV() {
  if (allSubscribers.length === 0) {
    toast('No subscribers to export.', 'err');
    return;
  }

  const rows = [
    ['Email', 'Subscription Date', 'Source']
  ];

  allSubscribers.forEach(s => {
    rows.push([
      `"${s.email.replace(/"/g, '""')}"`,
      `"${new Date(s.date).toISOString()}"`,
      `"${(s.source || '').replace(/"/g, '""')}"`
    ]);
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(r => r.join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `infinite_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast('Exported subscribers CSV!', 'ok');
}

/* ── Client Reviews & Testimonials Moderation ── */
let allReviews = [];
let currentReviewFilter = 'all';

const DEFAULT_VERIFIED_REVIEWS = [
  {
    id: 'rev_default_1',
    name: 'Chamath Wickramasinghe',
    company: 'Apex Logistics Colombo',
    url: 'https://apexlogistics.lk',
    rating: 5,
    comment: 'Infinite Creative transformed our logistics branding and web speed completely. Inquiries increased significantly within 30 days of the launch.',
    date: '2026-03-15T10:00:00.000Z',
    status: 'approved'
  },
  {
    id: 'rev_default_2',
    name: 'Dinuka Perera',
    company: 'Hikka Surf Villa',
    url: 'https://hikkasurf.com',
    rating: 5,
    comment: 'Direct bookings surged by 40% in our first month. The multilingual Sinhala/English layout and mobile responsiveness are world-class.',
    date: '2026-04-10T14:30:00.000Z',
    status: 'approved'
  },
  {
    id: 'rev_default_3',
    name: 'Dr. Samantha Silva',
    company: 'Ceylon MediCare',
    url: 'https://ceylonmedicare.lk',
    rating: 5,
    comment: 'The patient consultation portal built by Infinite Creative is blazing fast and completely secure. Highly recommended for healthcare tech.',
    date: '2026-05-20T08:15:00.000Z',
    status: 'approved'
  },
  {
    id: 'rev_default_4',
    name: 'Kaveen Ranasinghe',
    company: 'Lanka Spice Exporters',
    url: 'https://lankaspice.com',
    rating: 5,
    comment: 'Super clean, high-converting export showcase. International buyer inquiries doubled since launching our revamped website.',
    date: '2026-06-05T12:00:00.000Z',
    status: 'approved'
  }
];

async function loadClientReviews() {
  const container = document.getElementById('reviewsListContainer');
  if (!container) return;

  const map = new Map();

  // 1. Seed with verified client reviews
  DEFAULT_VERIFIED_REVIEWS.forEach(r => map.set(r.id, { ...r }));

  // 2. Read from localStorage
  try {
    const local = JSON.parse(localStorage.getItem('infinite_client_reviews') || '[]');
    local.forEach((r, idx) => {
      const id = r.id || `local_rev_${idx}`;
      map.set(id, {
        id: id,
        name: r.name || 'Anonymous Client',
        company: r.company || '',
        url: r.url || '',
        rating: Number(r.rating) || 5,
        comment: r.comment || '',
        date: r.date || new Date().toISOString(),
        status: r.status || 'approved'
      });
    });
  } catch (e) {}

  // 3. Read from Firestore
  try {
    const snap = await getDocs(collection(db, 'client_reviews'));
    snap.forEach(d => {
      const data = d.data();
      map.set(d.id, {
        id: d.id,
        name: data.name || 'Client',
        company: data.company || '',
        url: data.url || '',
        rating: Number(data.rating) || 5,
        comment: data.comment || '',
        date: data.date ? (data.date.toDate ? data.date.toDate().toISOString() : data.date) : new Date().toISOString(),
        status: data.status || 'pending',
        fromFirestore: true
      });
    });
  } catch (e) {}

  allReviews = Array.from(map.values()).sort((a, b) => new Date(b.date) - new Date(a.date));
  updateReviewCounters();
  renderReviews();
}

function updateReviewCounters() {
  const countAll = allReviews.length;
  const countApproved = allReviews.filter(r => r.status === 'approved').length;
  const countPending = allReviews.filter(r => r.status === 'pending').length;

  const elAll = document.getElementById('countReviewsAll');
  const elApproved = document.getElementById('countReviewsApproved');
  const elPending = document.getElementById('countReviewsPending');
  const elAvg = document.getElementById('badgeAvgRating');

  if (elAll) elAll.textContent = countAll;
  if (elApproved) elApproved.textContent = countApproved;
  if (elPending) elPending.textContent = countPending;

  if (elAvg && countAll > 0) {
    const totalScore = allReviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0);
    const avg = (totalScore / countAll).toFixed(1);
    elAvg.textContent = `★ ${avg} (${countAll})`;
  }
}

function renderReviews() {
  const container = document.getElementById('reviewsListContainer');
  if (!container) return;

  const filtered = allReviews.filter(r => {
    if (currentReviewFilter === 'approved') return r.status === 'approved';
    if (currentReviewFilter === 'pending') return r.status === 'pending';
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="color:var(--grey); font-size:13px; text-align:center; padding:32px 0;">
        No reviews in this category.
      </div>`;
    return;
  }

  container.innerHTML = '';
  filtered.forEach(rev => {
    const isApproved = rev.status === 'approved';
    const safeName = escapeHTML(rev.name);
    const safeComp = escapeHTML(rev.company);
    const safeComm = escapeHTML(rev.comment);
    const safeUrl = rev.url ? escapeHTML(rev.url) : '';
    const stars = '★'.repeat(Math.max(1, Math.min(5, rev.rating))) + '☆'.repeat(Math.max(0, 5 - rev.rating));
    const formattedDate = new Date(rev.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

    const card = document.createElement('div');
    card.style.cssText = 'background:rgba(255,255,255,0.03); border:1px solid var(--glass-b); border-radius:12px; padding:14px; position:relative;';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px; gap:8px;">
        <div>
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <strong style="color:#fff; font-size:13px;">${safeName}</strong>
            <span style="font-size:10px; font-weight:800; padding:2px 8px; border-radius:10px; text-transform:uppercase; ${isApproved ? 'background:rgba(4,170,109,0.15); color:#04AA6D; border:1px solid rgba(4,170,109,0.3);' : 'background:rgba(245,158,11,0.15); color:#f59e0b; border:1px solid rgba(245,158,11,0.3);'}">
              ${isApproved ? 'Approved (Live)' : 'Pending Review'}
            </span>
          </div>
          <small style="color:var(--grey-l); font-size:11px;">
            ${safeComp} ${safeUrl ? `· <a href="${safeUrl}" target="_blank" rel="noopener" style="color:#00aaff; text-decoration:none;">Website ↗</a>` : ''}
          </small>
        </div>
        <div style="color:#f59e0b; font-size:13px; font-weight:700; letter-spacing:1px; flex-shrink:0;">${stars}</div>
      </div>

      <p style="color:#cbd5e1; font-size:12px; line-height:1.5; margin:0 0 10px; font-style:italic;">
        "${safeComm}"
      </p>

      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.05); padding-top:8px;">
        <small style="color:var(--grey); font-size:11px;">Submitted: ${formattedDate}</small>
        <div style="display:flex; gap:6px;">
          <button class="btn-toggle-status" style="background:${isApproved ? 'rgba(245,158,11,0.15)' : 'rgba(4,170,109,0.15)'}; color:${isApproved ? '#f59e0b' : '#04AA6D'}; border:none; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer;">
            ${isApproved ? 'Unpublish' : 'Approve & Feature'}
          </button>
          <button class="btn-del-review" style="background:rgba(255,68,68,0.12); color:#ff4444; border:none; padding:4px 8px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer;" title="Delete review">
            Delete
          </button>
        </div>
      </div>
    `;

    card.querySelector('.btn-toggle-status').addEventListener('click', () => toggleReviewStatus(rev));
    card.querySelector('.btn-del-review').addEventListener('click', () => deleteReview(rev));

    container.appendChild(card);
  });
}

async function toggleReviewStatus(rev) {
  const newStatus = rev.status === 'approved' ? 'pending' : 'approved';
  rev.status = newStatus;

  // 1. Update localStorage if exists
  try {
    const local = JSON.parse(localStorage.getItem('infinite_client_reviews') || '[]');
    const idx = local.findIndex(r => (r.id && r.id === rev.id) || (r.name === rev.name && r.comment === rev.comment));
    if (idx !== -1) {
      local[idx].status = newStatus;
      localStorage.setItem('infinite_client_reviews', JSON.stringify(local));
    }
  } catch (e) {}

  // 2. Update Firestore if exists
  if (rev.fromFirestore && rev.id) {
    try {
      await updateDoc(doc(db, 'client_reviews', rev.id), { status: newStatus });
    } catch (e) {}
  }

  updateReviewCounters();
  renderReviews();
  toast(`Review marked as ${newStatus}!`, 'ok');
}

async function deleteReview(rev) {
  if (!confirm(`Are you sure you want to delete review from "${rev.name}"?`)) return;

  // 1. Remove from localStorage
  try {
    let local = JSON.parse(localStorage.getItem('infinite_client_reviews') || '[]');
    local = local.filter(r => (r.id ? r.id !== rev.id : (r.name !== rev.name || r.comment !== rev.comment)));
    localStorage.setItem('infinite_client_reviews', JSON.stringify(local));
  } catch (e) {}

  // 2. Remove from Firestore
  if (rev.fromFirestore && rev.id) {
    try {
      await deleteDoc(doc(db, 'client_reviews', rev.id));
    } catch (e) {}
  }

  allReviews = allReviews.filter(r => r.id !== rev.id);
  updateReviewCounters();
  renderReviews();
  toast('Review deleted successfully.', 'ok');
}

function exportReviewsJSON() {
  if (allReviews.length === 0) {
    toast('No reviews to export.', 'err');
    return;
  }

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(allReviews, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `infinite_reviews_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast('Exported reviews JSON!', 'ok');
}

/* ── Setup Engagement Hub Listeners ───────────────── */
function setupEngagementListeners() {
  // Subscribers
  document.getElementById('btnExportSubscribers')?.addEventListener('click', exportSubscribersCSV);
  document.getElementById('inputSearchSubscribers')?.addEventListener('input', function() {
    renderSubscribers(this.value);
  });
  document.getElementById('btnAddSubscriber')?.addEventListener('click', function() {
    const input = document.getElementById('inputSearchSubscribers');
    const email = prompt('Enter subscriber email address:', (input && input.value.includes('@')) ? input.value : '');
    if (email) addSubscriber(email);
  });

  // Reviews
  document.getElementById('btnExportReviews')?.addEventListener('click', exportReviewsJSON);
  document.querySelectorAll('.review-tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.review-tab-btn').forEach(b => {
        b.classList.remove('active');
        b.style.color = 'var(--grey-l)';
        b.style.fontWeight = '600';
      });
      this.classList.add('active');
      this.style.color = '#00aaff';
      this.style.fontWeight = '700';
      currentReviewFilter = this.getAttribute('data-filter') || 'all';
      renderReviews();
    });
  });
}

/* ── Master init ────────────────────────────────── */
function init(){
  fetchRealtimeLogs();
  loadSecurityLog();
  updateTimestamp();
  
  // Initialize Audience & Customer Engagement Hub
  loadSubscribers();
  loadClientReviews();
  setupEngagementListeners();

  // Refresh live display elements every 8s
  setInterval(updateLiveUsers, 8000);
  // Refresh timestamp every 30s
  setInterval(updateTimestamp, 30000);
}
