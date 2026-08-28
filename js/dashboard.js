// Master Admin Auth bypass
if (sessionStorage.getItem('infinite_admin_auth') === 'true') {
  const userEl = document.getElementById('sbEmail');
  if (userEl) userEl.textContent = 'infinitedesign768@gmail.com';
}
/* ═══════════════════════════════════════════════════
   dashboard.js — Real-Time Firestore Analytics Dashboard
   ═══════════════════════════════════════════════════ */
import { auth, db, onAuthStateChanged, signOut, collection, getDocs, onSnapshot }
  from '../js/firebase-config.js';

/* ── Auth guard with Permanent Master Admin Support ────────── */
const isMasterAdmin = (localStorage.getItem('infinite_admin_auth') === 'true' || sessionStorage.getItem('infinite_admin_auth') === 'true');
const storedAdmin = JSON.parse(localStorage.getItem('infinite_admin_user') || '{"email":"infinitedesign768@gmail.com"}');

if (isMasterAdmin) {
  const el = document.getElementById('sbEmail');
  if (el) el.textContent = storedAdmin.email || 'infinitedesign768@gmail.com';
  const av = document.getElementById('sbAvatar');
  if (av) av.textContent = (storedAdmin.email || 'A')[0].toUpperCase();
  init();
}

onAuthStateChanged(auth, function(user){
  if (user) {
    window.__firebaseUser = user;
    const email = user.email || 'admin';
    const el = document.getElementById('sbEmail');
    if (el) el.textContent = email;
    const av = document.getElementById('sbAvatar');
    if (av) av.textContent = email[0].toUpperCase();
    if (!isMasterAdmin) init();
  } else if (!isMasterAdmin && (localStorage.getItem('infinite_admin_auth') !== 'true' && sessionStorage.getItem('infinite_admin_auth') !== 'true')) {
    window.location.href = 'login.html';
  }
});

document.getElementById('logoutBtn')?.addEventListener('click', async function(){
  localStorage.removeItem('infinite_admin_auth');
  sessionStorage.removeItem('infinite_admin_auth');
  try { await signOut(auth); } catch(e){}
  window.location.href='login.html';
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

/* ── Master init ────────────────────────────────── */
function init(){
  fetchRealtimeLogs();
  loadSecurityLog();
  updateTimestamp();
  
  // Refresh live display elements every 8s
  setInterval(updateLiveUsers, 8000);
  // Refresh timestamp every 30s
  setInterval(updateTimestamp, 30000);
}
