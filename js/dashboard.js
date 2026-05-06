/* ═══════════════════════════════════════════════════
   dashboard.js — Analytics dashboard logic + Chart.js
═══════════════════════════════════════════════════ */
import { auth, db, onAuthStateChanged, signOut, collection, getDocs, onSnapshot }
  from '../js/firebase-config.js';

/* ── Auth guard ─────────────────────────────────── */
onAuthStateChanged(auth, function(user){
  if(!user){ window.location.href='login.html'; return; }
  const email = user.email||'admin';
  const el = document.getElementById('sbEmail');
  if(el) el.textContent = email;
  const av = document.getElementById('sbAvatar');
  if(av) av.textContent = email[0].toUpperCase();
  init();
});

document.getElementById('logoutBtn')?.addEventListener('click', async function(){
  await signOut(auth);
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

/* ── Generate demo data ─────────────────────────── */
function genDays(n, base, spread){
  return Array.from({length:n}, (_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-(n-1-i));
    return {
      label: d.toLocaleDateString('en',{month:'short',day:'numeric'}),
      v: Math.round(base + (Math.random()-0.4)*spread + i*(spread/n*0.3))
    };
  });
}

/* ── Traffic line chart ─────────────────────────── */
function initTrafficChart(days){
  const ctx = document.getElementById('trafficChart');
  if(!ctx) return;
  const visitors = genDays(days,180,120);
  const views    = visitors.map(d=>({label:d.label, v: Math.round(d.v*1.6+Math.random()*40)}));
  new Chart(ctx,{
    type:'line',
    data:{
      labels: visitors.map(d=>d.label),
      datasets:[{
        label:'Visitors', data:visitors.map(d=>d.v),
        borderColor:BLUE, backgroundColor:rgba(BLUE,0.1),
        fill:true, tension:0.4, pointRadius:3, pointHoverRadius:6,
        borderWidth:2
      },{
        label:'Page Views', data:views.map(d=>d.v),
        borderColor:GREEN, backgroundColor:rgba(GREEN,0.08),
        fill:true, tension:0.4, pointRadius:3, pointHoverRadius:6,
        borderWidth:2
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}, tooltip:{mode:'index',intersect:false}},
      scales:{
        x:{grid:{color:'rgba(255,255,255,0.04)'}, ticks:{maxTicksLimit:8}},
        y:{grid:{color:'rgba(255,255,255,0.04)'}, beginAtZero:true}
      },
      interaction:{mode:'nearest',axis:'x',intersect:false}
    }
  });
}

/* ── Sources bar chart ──────────────────────────── */
function initSourcesChart(){
  const ctx = document.getElementById('sourcesChart');
  if(!ctx) return;
  new Chart(ctx,{
    type:'bar',
    data:{
      labels:['Direct','Google','Social','Referral','Email','Other'],
      datasets:[{
        label:'Sessions',
        data:[320,480,210,140,90,60],
        backgroundColor:[rgba(BLUE,0.7),rgba(GREEN,0.7),rgba(PURPLE,0.7),rgba(YELLOW,0.7),rgba(RED,0.7),rgba('#a0a0a0',0.5)],
        borderRadius:8, borderSkipped:false,
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{
        x:{grid:{display:false}},
        y:{grid:{color:'rgba(255,255,255,0.04)'}, beginAtZero:true}
      }
    }
  });
}

/* ── Devices doughnut ───────────────────────────── */
function initDevicesChart(){
  const ctx = document.getElementById('devicesChart');
  if(!ctx) return;
  new Chart(ctx,{
    type:'doughnut',
    data:{
      labels:['Mobile','Desktop','Tablet'],
      datasets:[{
        data:[62,30,8],
        backgroundColor:[BLUE, GREEN, PURPLE],
        borderColor:'#141414',
        borderWidth:3, hoverOffset:6
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{position:'bottom', labels:{padding:16,usePointStyle:true}},
        tooltip:{callbacks:{label:c=>`${c.label}: ${c.parsed}%`}}
      },
      cutout:'68%'
    }
  });
}

/* ── Geographic bar chart ───────────────────────── */
function initGeoChart(){
  const ctx = document.getElementById('geoChart');
  if(!ctx) return;
  new Chart(ctx,{
    type:'bar',
    data:{
      labels:['🇱🇰 Sri Lanka','🇮🇳 India','🇦🇺 Australia','🇬🇧 UK','🇺🇸 USA','🇩🇪 Germany','🇦🇪 UAE'],
      datasets:[{
        label:'Visitors',
        data:[520,180,95,80,70,45,30],
        backgroundColor:rgba(BLUE,0.7),
        borderRadius:6, borderSkipped:false,
      }]
    },
    options:{
      indexAxis:'y',
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{
        x:{grid:{color:'rgba(255,255,255,0.04)'}, beginAtZero:true},
        y:{grid:{display:false}}
      }
    }
  });
}

/* ── KPI cards ──────────────────────────────────── */
function setKPI(id, val, trend, trendClass){
  const el=document.getElementById(id); if(el) el.textContent=val;
  const tr=document.getElementById(id+'Trend');
  if(tr){tr.textContent=trend; tr.className='kpi-trend '+(trendClass||'');}
}

function loadKPIs(days){
  const mult = days/30;
  setKPI('kpiVisitors', numFmt(Math.round(1380*mult)), '↑ 12.4% vs prev period', 'positive');
  setKPI('kpiViews',    numFmt(Math.round(3240*mult)), '↑ 18.2% vs prev period', 'positive');
  setKPI('kpiSessions', numFmt(Math.round(1520*mult)), '↑ 9.7% vs prev period',  'positive');
  setKPI('kpiBounce',   '38.5%',                       '↓ 3.2% improved',        'positive');
  setKPI('kpiWA',       '47',                           'Conversion events',       'positive');
  setKPI('kpiCTA',      '124',                          'Conversion events',       'positive');
}
function numFmt(n){return n>=1000?(n/1000).toFixed(1)+'k':n;}

/* ── Top pages table ────────────────────────────── */
function loadTopPages(){
  const tbody=document.getElementById('pagesBody');
  if(!tbody) return;
  const pages=[
    {p:'/',views:1840,time:'2m 14s',bounce:'34%'},
    {p:'/index.html',views:620,time:'1m 48s',bounce:'41%'},
    {p:'/#portfolio',views:410,time:'3m 02s',bounce:'28%'},
    {p:'/#contact',views:280,time:'1m 22s',bounce:'52%'},
    {p:'/admin/login.html',views:95,time:'0m 48s',bounce:'62%'},
  ];
  tbody.innerHTML=pages.map(pg=>`
    <tr>
      <td>${pg.p}</td>
      <td>${numFmt(pg.views)}</td>
      <td>${pg.time}</td>
      <td>${pg.bounce}</td>
    </tr>`).join('');
}

/* ── Real-time live users (simulated) ───────────── */
const livePages=['/','/#portfolio','/#contact','/#about'];
function updateLiveUsers(){
  const count = Math.floor(Math.random()*4)+1;
  const el=document.getElementById('rtCount'); if(el) el.textContent=count;
  const list=document.getElementById('liveList'); if(!list) return;
  list.innerHTML='';
  const countries=['Sri Lanka','India','Australia','UK'];
  for(let i=0;i<count;i++){
    const div=document.createElement('div');
    div.className='live-row';
    div.innerHTML=`
      <span class="live-dot"></span>
      <span class="live-page">${livePages[i%livePages.length]}</span>
      <span class="live-loc">${countries[i%countries.length]}</span>`;
    list.appendChild(div);
  }
}

/* ── Security log ───────────────────────────────── */
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

/* ── Timestamp ──────────────────────────────────── */
function updateTimestamp(){
  const el=document.getElementById('lastUpdated');
  if(el) el.textContent='Updated '+new Date().toLocaleTimeString();
}

/* ── Period change ──────────────────────────────── */
let charts=[];
document.getElementById('periodSelect')?.addEventListener('change',function(){
  charts.forEach(c=>c.destroy&&c.destroy());
  charts=[];
  const days=parseInt(this.value);
  loadKPIs(days);
  initTrafficChart(days);
  updateTimestamp();
});

/* ── Master init ────────────────────────────────── */
function init(){
  loadKPIs(30);
  initTrafficChart(30);
  initSourcesChart();
  initDevicesChart();
  initGeoChart();
  loadTopPages();
  updateLiveUsers();
  loadSecurityLog();
  updateTimestamp();
  // Refresh live users every 8s
  setInterval(updateLiveUsers, 8000);
  // Refresh timestamp every 30s
  setInterval(updateTimestamp, 30000);
}
