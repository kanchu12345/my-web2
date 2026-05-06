/* ═══════════════════════════════════════════════════
   main.js — Portfolio animations, nav, Firebase data
═══════════════════════════════════════════════════ */
'use strict';

/* ── Kinetic text animation ─────────────────────── */
(function initKinetic(){
  const el=document.getElementById('kineticText');
  if(!el)return;
  // reveal on load
  setTimeout(()=>el.classList.add('animate'),300);
  // scroll stretch effect
  let lastY=0;
  window.addEventListener('scroll',function(){
    const y=window.scrollY;
    const diff=y-lastY;lastY=y;
    el.querySelectorAll('.l').forEach(function(l,i){
      const skew=Math.min(Math.max(diff*-0.3,-8),8);
      const scaleY=1+Math.abs(diff)*0.002;
      l.style.transform=`skewX(${skew}deg) scaleY(${Math.min(scaleY,1.08)})`;
      l.style.transitionDuration='.6s';
    });
  },{passive:true});
})();

/* ── Navigation scroll state ────────────────────── */
(function initNav(){
  const nav=document.getElementById('mainNav');
  if(!nav)return;
  const onScroll=function(){
    nav.classList.toggle('scrolled',window.scrollY>40);
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  // Mobile toggle
  const toggle=document.getElementById('navToggle');
  const menu=document.getElementById('mobileMenu');
  if(toggle&&menu){
    toggle.addEventListener('click',function(){
      const open=menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded',open);
      menu.setAttribute('aria-hidden',!open);
    });
    menu.querySelectorAll('.mm-link').forEach(function(a){
      a.addEventListener('click',function(){
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
        menu.setAttribute('aria-hidden','true');
      });
    });
    document.addEventListener('click',function(e){
      if(!toggle.contains(e.target)&&!menu.contains(e.target)){
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
        menu.setAttribute('aria-hidden','true');
      }
    });
  }
})();

/* ── Scroll reveal ──────────────────────────────── */
(function initReveal(){
  const io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add('visible');io.unobserve(en.target);}
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
})();

/* ── Modal ──────────────────────────────────────── */
const modal=document.getElementById('projModal');
const modalClose=document.getElementById('modalClose');
function openModal(data){
  document.getElementById('modalImg').src=data.image||'';
  document.getElementById('modalImg').alt=data.title||'';
  document.getElementById('modalTag').textContent=data.category||'';
  document.getElementById('modalTitle').textContent=data.title||'';
  document.getElementById('modalDesc').textContent=data.description||'';
  modal.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  modal.classList.remove('open');
  document.body.style.overflow='';
}
if(modalClose) modalClose.addEventListener('click',closeModal);
if(modal) modal.addEventListener('click',function(e){if(e.target===modal)closeModal();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});

/* ── Toast notification ─────────────────────────── */
function showToast(msg){
  let t=document.querySelector('.toast');
  if(!t){
    t=document.createElement('div');t.className='toast';
    t.innerHTML='<div class="toast-dot"></div><span></span>';
    document.body.appendChild(t);
  }
  t.querySelector('span').textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3500);
}

/* ── Load projects from Firebase ───────────────── */
async function loadProjects(){
  const grid=document.getElementById('projGrid');
  if(!grid)return;
  try{
    const {db,collection,getDocs}=await import('./firebase-config.js');
    const snap=await getDocs(collection(db,'projects'));
    if(snap.empty){renderFallbackProjects(grid);return;}
    grid.innerHTML='';
    snap.forEach(function(d){
      const p={id:d.id,...d.data()};
      grid.appendChild(makeCard(p));
    });
  }catch(e){
    renderFallbackProjects(grid);
  }
}

function makeCard(p){
  const card=document.createElement('div');
  card.className='proj-card';
  card.innerHTML=`
    <img class="proj-img" src="${p.image||''}" alt="${p.title||'Project'}" loading="lazy">
    <div class="proj-overlay">
      <div class="proj-title">${p.title||''}</div>
      <div class="proj-tag">${p.category||''}</div>
    </div>`;
  card.addEventListener('click',function(){openModal(p);});
  return card;
}

function renderFallbackProjects(grid){
  const demos=[
    { title: 'Versells Lanka', category: 'Corporate', url: 'https://versellslanka.com' },
    { title: 'Centennial Leo Club', category: 'Non-Profit', url: 'https://richmondleos.org' },
    { title: 'Lanka Sunrays', category: 'E-commerce', url: 'https://lankasunrays.lk' },
    { title: 'Shanthi Weda Madhura', category: 'Healthcare', url: 'https://shanthiwedamadura.com' },
    { title: 'Nations Trust Holdings', category: 'Finance', url: 'https://nationstrustholdingslondon.com' },
    { title: 'Enlyt Partners', category: 'Consulting', url: 'https://enlytpartners.com' },
    { title: 'GPS Lanka Travels', category: 'Travel', url: 'https://gpslankatravels.com' },
    { title: 'Tropica Flavours', category: 'FMCG', url: 'https://tropicaflavours.com' },
    { title: 'VITES Secure Auth', category: 'Web App', url: 'https://kanchu12345.github.io/VITES/vites-secure-auth-2026.html' },
    { title: 'DD Lanka Tours', category: 'Travel', url: 'https://ddlankatours.lk/' },
    { title: 'VITES Platform', category: 'Web App', url: 'https://kanchu12345.github.io/VITES/' }
  ];
  grid.innerHTML='';
  // Show only 3 on home page, all on portfolio page
  var isHome = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
  var list = isHome ? demos.slice(0, 3) : demos;
  list.forEach(function(p){
    const card=document.createElement('a');
    card.href=p.url;
    card.target='_blank';
    card.className='proj-card proj-placeholder';
    card.style.textDecoration='none';
    card.innerHTML=`
      <div style="width:100%; height:100%; position:relative; overflow:hidden;">
        <img src="https://s0.wp.com/mshots/v1/${encodeURIComponent(p.url)}?w=600&h=450" alt="${p.title}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" onerror="this.style.display='none'">
        <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 60%); padding:20px; display:flex; flex-direction:column; justify-content:flex-end;">
          <span style="font-weight:700; color:var(--white); font-size:16px; margin-bottom:4px;">${p.title}</span>
          <span style="font-size:10px; color:var(--blue); letter-spacing:0.1em; text-transform:uppercase; font-weight:600;">${p.category}</span>
        </div>
        <div style="position:absolute; top:16px; right:16px; background:var(--bg); border:1px solid var(--glass-b); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; color:var(--blue); box-shadow:var(--shadow);">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ── Load Blogs (Automated Native Aggregation) ──── */
function isUnder30Days(dateStr) {
  const published = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - published) / (1000 * 60 * 60 * 24));
  return diffDays <= 30;
}

const fallbackBlogs = [
  {
    id: "fallback_1",
    title: "The Future of Corporate Web Design in 2026",
    category: "Web Design",
    image: "images/blog_1.png",
    date: "May 2026",
    description: "Explore the latest trends in enterprise web development, focusing on performance, glassmorphism, and user experience...",
    url: "article.html?id=fallback_1"
  },
  {
    id: "fallback_2",
    title: "How to Rebrand Without Losing Your Audience",
    category: "Brand Strategy",
    image: "images/blog_2.png",
    date: "Apr 2026",
    description: "A step-by-step guide to successfully launching a new brand identity while maintaining customer loyalty...",
    url: "article.html?id=fallback_2"
  },
  {
    id: "fallback_3",
    title: "Why We Choose Laravel for Enterprise Apps",
    category: "Technology",
    image: "images/blog_3.png",
    date: "Mar 2026",
    description: "Discover the security, scalability, and performance benefits of using the Laravel ecosystem for large-scale projects...",
    url: "article.html?id=fallback_3"
  }
];

async function loadBlogs() {
  const grid = document.getElementById('blogGrid');
  if(!grid) return;
  try {
    const res = await fetch('https://dev.to/api/articles?tag=webdev&top=1&per_page=10');
    if(!res.ok) throw new Error('API error');
    const data = await res.json();
    
    // Filter articles under 30 days and take top 3
    const filtered = data.filter(a => isUnder30Days(a.published_at)).slice(0, 3);
    
    if(filtered.length === 0) throw new Error('No recent articles');
    
    const blogs = filtered.map(article => {
      const image = article.cover_image || article.social_image || "images/blog_1.png";
      const date = new Date(article.published_at).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
      const category = article.tag_list && article.tag_list.length > 0 ? article.tag_list[0] : 'Technology';
      return {
        id: article.id,
        title: article.title,
        category: category,
        image: image,
        date: date,
        description: article.description || "Read more about this latest technology update...",
        url: 'article.html?id=' + article.id
      };
    });
    
    renderBlogs(blogs, grid);
  } catch(e) {
    renderBlogs(fallbackBlogs.slice(0, 3), grid);
  }
}

async function loadAllBlogs() {
  const grid = document.getElementById('blogGridAll');
  if(!grid) return;
  try {
    const res = await fetch('https://dev.to/api/articles?tag=programming&top=1&per_page=30');
    if(!res.ok) throw new Error('API error');
    const data = await res.json();
    
    const filtered = data.filter(a => isUnder30Days(a.published_at));
    if(filtered.length === 0) throw new Error('No recent articles');
    
    const blogs = filtered.map(article => {
      const image = article.cover_image || article.social_image || "images/blog_2.png";
      const date = new Date(article.published_at).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
      const category = article.tag_list && article.tag_list.length > 0 ? article.tag_list[0] : 'Technology';
      return {
        id: article.id,
        title: article.title,
        category: category,
        image: image,
        date: date,
        description: article.description || "Read more about this...",
        url: 'article.html?id=' + article.id
      };
    });
    
    renderBlogs(blogs, grid);
  } catch(e) {
    renderBlogs(fallbackBlogs, grid);
  }
}

function renderBlogs(blogs, grid) {
  grid.innerHTML = '';
  blogs.forEach(b => {
    grid.innerHTML += `
      <a href="${b.url}" class="blog-card glass-hover" style="display:flex; flex-direction:column; background:#282A35; border-radius:16px; overflow:hidden; text-decoration:none; border:1px solid rgba(255,255,255,0.05);">
        <div style="height:200px; background:#1e1f26; position:relative; overflow:hidden;">
          <img src="${b.image}" alt="" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div style="padding:24px; flex: 1; display:flex; flex-direction:column;">
          <div style="font-size:10px; color:#04AA6D; letter-spacing:0.15em; text-transform:uppercase; font-weight:700; margin-bottom:10px;">${b.category} • ${b.date}</div>
          <h3 style="font-family:var(--font-disp); font-size:18px; font-weight:700; color:#fff; margin-bottom:12px; line-height:1.4;">${b.title}</h3>
          <p style="font-size:13px; color:rgba(255,255,255,0.6); line-height:1.6; margin-bottom:0;">${b.description}</p>
        </div>
      </a>
    `;
  });
}

/* ── Render Native Article ──────────────────────── */
async function loadArticle() {
  const container = document.getElementById('articleContent');
  if(!container) return;
  
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if(!id) {
    container.innerHTML = '<div style="color:#fff;">Article not found.</div>';
    return;
  }
  
  if(id.startsWith('fallback_')) {
    const fallback = fallbackBlogs.find(b => b.id === id);
    if(fallback) {
      document.title = fallback.title + ' | Infinite Web Design';
      container.innerHTML = `
        <div style="margin-bottom:30px;">
          <h1 style="font-family:var(--font-disp); font-size:36px; font-weight:700; color:#fff; margin-bottom:15px;">${fallback.title}</h1>
          <div style="color:#04AA6D; font-size:14px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em;">${fallback.category} • ${fallback.date}</div>
        </div>
        <img src="${fallback.image}" style="width:100%; max-height:400px; object-fit:cover; border-radius:16px; margin-bottom:30px;">
        <div style="color:rgba(255,255,255,0.8); line-height:1.8; font-size:18px;">
          <p>${fallback.description}</p>
          <p>This is a generated premium article. Please configure the Developer API or add real articles to view full content.</p>
        </div>
      `;
    }
    return;
  }
  
  try {
    const res = await fetch('https://dev.to/api/articles/' + id);
    if(!res.ok) throw new Error('API error');
    const article = await res.json();
    
    document.title = article.title + ' | Infinite Web Design';
    
    const image = article.cover_image || article.social_image || "";
    const date = new Date(article.published_at).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
    const category = article.tags && article.tags.length > 0 ? article.tags[0] : 'Technology';
    
    container.innerHTML = `
      <div style="margin-bottom:30px;">
        <h1 style="font-family:var(--font-disp); font-size:36px; font-weight:700; color:#fff; margin-bottom:15px; line-height: 1.3;">${article.title}</h1>
        <div style="color:#04AA6D; font-size:14px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em;">${category} • ${date} • <span style="color:var(--grey)">${article.user.name}</span></div>
      </div>
      ${image ? `<img src="${image}" style="width:100%; max-height:400px; object-fit:cover; border-radius:16px; margin-bottom:40px;">` : ''}
      <div class="article-body" style="color:rgba(255,255,255,0.8); line-height:1.8; font-size:18px; overflow-wrap: break-word;">
        ${article.body_html}
      </div>
    `;
  } catch(e) {
    container.innerHTML = '<div style="color:#fff;">Error loading the article. Please try again later.</div>';
  }
}

/* ── Load About/Contact from Firebase settings ──── */
async function loadSettings(){
  try{
    const {db,doc,getDocs,collection}=await import('./firebase-config.js');
    const snap=await getDocs(collection(db,'settings'));
    snap.forEach(function(d){
      const s=d.data();
      if(s.aboutText){const el=document.getElementById('aboutText');if(el)el.innerHTML=s.aboutText;}
      if(s.address){const el=document.getElementById('contactAddress');if(el)el.innerHTML=s.address;}
      if(s.phone){const el=document.getElementById('contactPhone');if(el)el.textContent=s.phone;}
    });
  }catch(e){}
}

/* ── Init ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded',function(){
  loadProjects();
  loadBlogs();
  loadAllBlogs();
  loadArticle();
  loadSettings();
  // link CSS additions
  const lnk=document.createElement('link');
  lnk.rel='stylesheet';lnk.href='css/additions.css';
  document.head.appendChild(lnk);
});

/* ── Footer Background Typing ───────────────────── */
(function initFooterBgTyping(){
  const footer = document.querySelector('.footer');
  if(!footer) return;

  footer.style.position = 'relative';
  footer.style.overflow = 'hidden';

  const footerMain = footer.querySelector('.footer-main');
  if(footerMain) {
    footerMain.style.position = 'relative';
    footerMain.style.zIndex = '1';
  }
  const footerBottom = footer.querySelector('.footer-bottom');
  if(footerBottom) {
    footerBottom.style.position = 'relative';
    footerBottom.style.zIndex = '1';
  }

  let bgContainer = document.getElementById('footerCodeBgContainer');
  if(!bgContainer) {
    bgContainer = document.createElement('div');
    bgContainer.id = 'footerCodeBgContainer';
    bgContainer.style.position = 'absolute';
    bgContainer.style.inset = '0';
    bgContainer.style.opacity = '0.12';
    bgContainer.style.fontFamily = "'Courier New', monospace";
    bgContainer.style.fontSize = '13px';
    bgContainer.style.lineHeight = '1.6';
    bgContainer.style.color = '#04AA6D';
    bgContainer.style.overflow = 'hidden';
    bgContainer.style.pointerEvents = 'none';
    bgContainer.style.zIndex = '0';
    bgContainer.style.padding = '30px';
    bgContainer.style.display = 'flex';
    bgContainer.style.gap = '40px';
    
    for(let i=1; i<=3; i++) {
      let col = document.createElement('div');
      col.id = 'footerCodeBg' + i;
      col.style.flex = '1';
      col.style.whiteSpace = 'pre-wrap';
      col.style.wordBreak = 'break-word';
      bgContainer.appendChild(col);
    }
    footer.insertBefore(bgContainer, footer.firstChild);
  }

  const bgs = [
    document.getElementById('footerCodeBg1'),
    document.getElementById('footerCodeBg2'),
    document.getElementById('footerCodeBg3')
  ];
  if(!bgs[0]) return;
  
  const snippets = [
    "function initSys() {\n  console.log('Booting Infinity Engine...');\n  return loadModules();\n}",
    "const db = connect(process.env.DB_URL);\nawait db.sync();",
    "class InfiniteDesign extends CreativeAgency {\n  constructor() {\n    super({ premium: true, talent: 'top-3%' });\n  }\n}",
    "SELECT id, project_name FROM portfolio WHERE status = 'published' ORDER BY date DESC;",
    "import { useState, useEffect } from 'react';\nexport default function App() {\n  return <MainLayout />;\n}",
    "Route::get('/api/v1/projects', [ProjectController::class, 'index'])->middleware('api');",
    "if (quality >= 100) {\n  deployToProduction();\n} else {\n  refactor();\n}",
    "body {\n  margin: 0;\n  padding: 0;\n  background: #282A35;\n  font-family: var(--font-sans);\n}"
  ];
  
  function createTyper(bgEl) {
    let fullText = '';
    let idx = 0;
    let timer = null;
    
    function typeWriter() {
      // Always keep generating new code — never run out
      if (idx >= fullText.length - 100) {
        fullText += snippets[Math.floor(Math.random() * snippets.length)] + "\n\n";
      }
      
      bgEl.textContent = fullText.substring(0, idx+1) + "_";
      idx += Math.floor(Math.random() * 8) + 2; 
      
      // Scroll old lines out so text doesn't grow forever
      if (fullText.length > 2500 && idx > 2000) {
        let cutIndex = fullText.indexOf('\n\n', 250);
        if (cutIndex !== -1) {
          fullText = fullText.substring(cutIndex + 2);
          idx -= (cutIndex + 2);
        }
      }
      timer = setTimeout(typeWriter, Math.random() * 50 + 10);
    }
    
    function start() { if(!timer) typeWriter(); }
    function stop()  { clearTimeout(timer); timer = null; }
    
    // Start when footer scrolls into view, stop when it leaves, restart when it comes back
    const io = new IntersectionObserver(function(entries){
      entries[0].isIntersecting ? start() : stop();
    }, { threshold: 0.05 });
    io.observe(bgEl);
  }
  
  bgs.forEach(bg => { if(bg) createTyper(bg); });
})();

/* ── Terminal Mission Typing ────────────────────── */
(function initMissionTerminal(){
  const el = document.getElementById('missionTextEl');
  if(!el) return;
  
  const text = "> INITIALIZING CORE VISION...\n\n> Our eyes are fixed on the future, where we aim to stand as the #1 digital partner on the planet.\n> We understand that the road to being a world-first company is paved with challenges and hard work.\n> That is why we fight for excellence in every detail, ensuring our clients receive nothing but the best.\n> We combine a warrior's work ethic with a designer's soul to create truly world-class experiences.\n\n> Partner with us now, and let's ascend to the global stage together through sheer determination.";
  
  let idx = 0;
  let started = false;
  
  function typeMission() {
    if(idx < text.length) {
      el.textContent = text.substring(0, idx+1) + "█";
      idx += Math.floor(Math.random() * 3) + 1; // Type 1-3 chars for varied organic speed
      setTimeout(typeMission, Math.random() * 30 + 10);
    } else {
      el.textContent = text;
      // Blinking cursor at the end
      setInterval(() => {
        el.textContent = el.textContent.endsWith("█") ? text : text + "█";
      }, 500);
    }
  }
  
  const io = new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting && !started){
      started = true;
      setTimeout(typeMission, 500); // 500ms delay before starting
      io.disconnect();
    }
  }, { threshold: 0.5 });
  io.observe(el);
})();
