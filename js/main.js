
/* ── Safe Reveal & Instant Visibility ──────────────── */
function triggerSafeReveal() {
  document.querySelectorAll('.reveal').forEach(function(el) {
    el.classList.add('visible');
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}
document.addEventListener('DOMContentLoaded', triggerSafeReveal);
window.addEventListener('load', triggerSafeReveal);
setTimeout(triggerSafeReveal, 100);
setTimeout(triggerSafeReveal, 500);

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
  const demos = [
  {
    "title": "Zap Ceylon",
    "category": "Conglomerate & Global Trade",
    "url": "https://kanchu12345.github.io/ZAP-CEYLON-/",
    "description": "Premier diversified Sri Lankan conglomerate portal spanning global trade, Ceylon gems & spices, construction, finance, and digital innovation.",
    "bg": "#0f172a"
  },
  {
    "title": "Hiri Surf School",
    "category": "Tourism & Beach Academy",
    "url": "https://hirisurfschool.com/",
    "description": "Premier surf school and tropical resort booking platform in Hiriketiya, Sri Lanka with custom booking workflows.",
    "bg": "#0284c7"
  },
  {
    "title": "VeloCharts",
    "category": "FinTech & Market Analytics",
    "url": "https://velocharts.com/?v=2",
    "description": "Next-generation financial market charting platform, real-time crypto & stock analytics, and automated trading algorithms.",
    "bg": "#042f2e"
  },
  {
    "title": "Hela Invest",
    "category": "Finance & Investment Advisory",
    "url": "https://helainvest.com/",
    "description": "Premier Sri Lankan investment advisory portal, wealth growth management, and financial project funding platform.",
    "bg": "#1e1b4b"
  },
  {
    "title": "Tourio LK",
    "category": "Travel & Destination Booking",
    "url": "https://tourio.lk/",
    "description": "Comprehensive Sri Lanka travel booking platform, custom vacation packages, hotel stays, and curated adventure tours.",
    "bg": "#042f2e"
  },
  {
    "title": "Many To One AMS",
    "category": "Corporate Association Platform",
    "url": "https://manytooneams.com/",
    "description": "Enterprise Association Management Software (AMS) platform engineered for non-profit organizations and member institutions.",
    "bg": "#0f172a"
  },
  {
    "title": "Shanthi Weda Madhura",
    "category": "Ayurveda & Luxury Wellness",
    "url": "https://shanthiwedamadura.com",
    "description": "Traditional Sri Lankan Ayurvedic hospital, medicinal wellness retreats, and international patient booking.",
    "bg": "#064e3b"
  },
  {
    "title": "Versells Lanka",
    "category": "Corporate Web App",
    "url": "https://versellslanka.com",
    "description": "Enterprise agricultural technology & electric fencing engineering portal with interactive quote generator.",
    "bg": "#0b1329"
  },
  {
    "title": "Perx Lanka",
    "category": "Corporate & Engineering Solutions",
    "url": "http://perxlanka.com/",
    "description": "Specialized industrial engineering, equipment supply, and corporate enterprise solutions in Sri Lanka.",
    "bg": "#1e3a8a"
  },
  {
    "title": "Lanka Sunrays",
    "category": "E-commerce & Export",
    "url": "https://lankasunrays.lk",
    "description": "Solar water pumping solutions & solar engineering store with PayHere checkout and export catalog.",
    "bg": "#1c1917"
  },
  {
    "title": "Centennial Leo Club",
    "category": "Non-Profit Community",
    "url": "https://richmondleos.org",
    "description": "Official community platform for youth leadership, projects, and district news for Richmond College Leos.",
    "bg": "#172554"
  },
  {
    "title": "Nations Trust Holdings",
    "category": "Finance & UK Investment",
    "url": "https://nationstrustholdingslondon.com",
    "description": "Global migration consultancy, UK wealth management, and overseas education advisory portal.",
    "bg": "#1e1b4b"
  },
  {
    "title": "Enlyt Partners",
    "category": "Strategic Consulting",
    "url": "https://enlytpartners.com",
    "description": "Executive leadership consulting, organizational excellence, and business transformation architecture.",
    "bg": "#0f172a"
  },
  {
    "title": "GPS Lanka Travels",
    "category": "Travel & Tourism",
    "url": "https://gpslankatravels.com",
    "description": "Bespoke Sri Lanka island tours, wildlife safari itineraries, and instant private chauffeur booking.",
    "bg": "#042f2e"
  },
  {
    "title": "Tropica Flavours",
    "category": "FMCG & Brand",
    "url": "https://tropicaflavours.com",
    "description": "Pure Ceylon spice exports, certified organic vanilla, and worldwide wholesale distributor network.",
    "bg": "#312e81"
  },
  {
    "title": "DD Lanka Tours",
    "category": "Destination Travel",
    "url": "https://ddlankatours.lk/",
    "description": "Cultural heritage round-tours, luxury hotel reservations, and custom Sri Lanka vacation packages.",
    "bg": "#14532d"
  },
  {
    "title": "VITES Secure Auth 2026",
    "category": "Cybersecurity Web App",
    "url": "https://kanchu12345.github.io/VITES/vites-secure-auth-2026.html",
    "description": "Advanced cryptographic biometric and OTP authentication portal with 256-bit security.",
    "bg": "#1e293b"
  },
  {
    "title": "VITES Cloud Platform",
    "category": "Cloud Infrastructure",
    "url": "https://kanchu12345.github.io/VITES/",
    "description": "High-availability cloud computing and microservices management console.",
    "bg": "#0f172a"
  }
];
  grid.innerHTML = '';
  
  // Check if we are on projects/portfolio page vs homepage
  const pName = window.location.pathname.toLowerCase();
  const isPortfolioPage = pName.includes('portfolio') || pName.includes('projects');
  const list = isPortfolioPage ? demos : demos.slice(0, 6);

  list.forEach(function(p, index){
    const card = document.createElement('a');
    card.href = p.url;
    card.target = '_blank';
    card.rel = 'noopener';
    card.className = 'proj-card reveal';
    card.style.cssText = 'text-decoration:none; display:block; height:250px; border-radius:16px; overflow:hidden; position:relative; background:' + (p.bg || '#1e293b') + '; border:1px solid rgba(255,255,255,0.12); box-shadow:0 10px 30px rgba(0,0,0,0.4); transition:all 0.35s ease;';
    card.onmouseover = function() { this.style.transform='translateY(-8px) scale(1.02)'; this.style.borderColor='#04AA6D'; this.style.boxShadow='0 20px 40px rgba(4,170,109,0.3)'; };
    card.onmouseout = function() { this.style.transform='none'; this.style.borderColor='rgba(255,255,255,0.12)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.4)'; };

    card.innerHTML = `
      <div style="width:100%; height:100%; position:relative; overflow:hidden;">
        <img src="https://s0.wp.com/mshots/v1/${encodeURIComponent(p.url)}?w=650&h=480" alt="${p.title}" style="width:100%; height:100%; object-fit:cover; opacity:0.9; transition:transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'" onerror="this.style.display='none'">
        
        <!-- Top Status Badge -->
        <div style="position:absolute; top:14px; left:14px; background:rgba(4,170,109,0.95); backdrop-filter:blur(10px); color:#ffffff; padding:5px 12px; border-radius:50px; font-size:11px; font-weight:800; display:flex; align-items:center; gap:6px; box-shadow:0 4px 14px rgba(0,0,0,0.4); letter-spacing:0.02em;">
          <span style="width:7px; height:7px; background:#fff; border-radius:50%; display:inline-block; box-shadow:0 0 6px #fff;"></span>
          <span>Completed & Live</span>
        </div>

        <!-- Top Right External Link Icon -->
        <div style="position:absolute; top:14px; right:14px; background:rgba(11,15,25,0.85); border:1px solid rgba(255,255,255,0.2); border-radius:50%; width:34px; height:34px; display:flex; align-items:center; justify-content:center; color:#04AA6D; backdrop-filter:blur(10px); box-shadow:0 4px 12px rgba(0,0,0,0.3);">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </div>

        <!-- Bottom Details Overlay -->
        <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(8,12,22,0.98) 0%, rgba(8,12,22,0.65) 45%, transparent 100%); padding:20px; display:flex; flex-direction:column; justify-content:flex-end;">
          <span style="font-weight:900; color:#ffffff; font-size:18px; margin-bottom:4px; letter-spacing:-0.01em; text-shadow:0 2px 8px rgba(0,0,0,0.8);">${p.title}</span>
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <span style="font-size:11px; color:#04AA6D; letter-spacing:0.08em; text-transform:uppercase; font-weight:800;">${p.category}</span>
            <span style="font-size:12px; color:#38bdf8; font-weight:700; display:flex; align-items:center; gap:4px;">Visit Site ↗</span>
          </div>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ── Blog System: Reads from data/blogs.json (auto-updated by GitHub Actions) */

// Cache blogs.json for the session
let _blogsCache = null;

/* Helper: get relative path to root */
function rootPath() {
  return window.location.pathname.includes('/admin/') ? '../' : '';
}

async function getBlogsData() {
  if (_blogsCache) return _blogsCache;
  try {
    const prefix = rootPath();
    const res = await fetch(prefix + 'data/blogs.json?v=' + Date.now());
    if (!res.ok) throw new Error('blogs.json not available');
    _blogsCache = await res.json();
    return _blogsCache;
  } catch(e) {
    // If blogs.json not found, return hardcoded fallback
    return {
      articles: [
        { id:'fb1', title:'The Future of Corporate Web Design in 2026', category:'Web Design', date:'May 2026', description:'Explore the latest trends in enterprise web development, focusing on performance, glassmorphism, and user experience.', image:'images/blog_1.png', body_html:'<p style="font-size:18px;line-height:1.8;color:rgba(255,255,255,0.8);">In 2026, enterprise web design is all about performance-first glassmorphism, AI-driven personalization, and immersive motion design. Infinite Creative Web Design leads the way in delivering these cutting-edge experiences to clients across Sri Lanka and internationally.</p>' },
        { id:'fb2', title:'How to Rebrand Without Losing Your Audience', category:'Brand Strategy', date:'Apr 2026', description:'A step-by-step guide to launching a new brand identity while maintaining customer loyalty and trust.', image:'images/blog_2.png', body_html:'<p style="font-size:18px;line-height:1.8;color:rgba(255,255,255,0.8);">Rebranding is one of the most high-stakes moves a company can make. Our 5-step framework — audit, define values, test, communicate, and phase rollout — has helped over 40 international brands rebrand successfully without losing a single loyal client.</p>' },
        { id:'fb3', title:'Why We Choose Laravel for Enterprise Apps', category:'Technology', date:'Mar 2026', description:'Discover the security, scalability, and performance benefits of using Laravel for large-scale enterprise applications.', image:'images/blog_3.png', body_html:'<p style="font-size:18px;line-height:1.8;color:rgba(255,255,255,0.8);">Laravel stands out for enterprise projects due to its built-in security (CSRF, XSS, SQL injection protection), Eloquent ORM, robust queue system, and Sanctum API authentication. At Infinite Creative Web Design, it is our framework of choice for all enterprise-grade backends.</p>' }
      ]
    };
  }
}

/* Helper: get relative path to article.html */
function articlePath(id) {
  return rootPath() + 'article.html?id=' + id;
}

async function loadBlogs() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;
  grid.innerHTML = '<div style="color:rgba(255,255,255,0.4);text-align:center;padding:40px;grid-column:1/-1;">Loading articles...</div>';
  try {
    const data = await getBlogsData();
    const articles = (data.articles || []).slice(0, 3);
    if (articles.length === 0) throw new Error('empty');
    renderBlogs(articles.map(a => ({...a, url: articlePath(a.id)})), grid);
  } catch(e) {
    grid.innerHTML = '<div style="color:rgba(255,255,255,0.4);text-align:center;padding:40px;grid-column:1/-1;">Articles loading soon...</div>';
  }
}

async function loadAllBlogs() {
  const container = document.getElementById('blogGridAll');
  if (!container) return;
  container.innerHTML = '<div class="blog-loading-msg">Loading articles...</div>';
  
  try {
    const data = await getBlogsData();
    const articles = data.articles || [];
    if (articles.length === 0) throw new Error('empty');

    // Group articles by category
    const categorized = {};
    articles.forEach(a => {
      const cat = a.category || 'Uncategorized';
      if (!categorized[cat]) categorized[cat] = [];
      categorized[cat].push({...a, url: articlePath(a.id)});
    });

    const filterBar = document.getElementById('topicFilterBar');
    if (filterBar) {
      filterBar.innerHTML = '';
      
      const allBtn = document.createElement('button');
      allBtn.className = 'topic-filter-btn active';
      allBtn.textContent = 'All Topics';
      allBtn.onclick = () => filterTopics('All Topics');
      filterBar.appendChild(allBtn);

      for (const cat in categorized) {
        const btn = document.createElement('button');
        btn.className = 'topic-filter-btn';
        btn.textContent = cat;
        btn.onclick = () => filterTopics(cat);
        filterBar.appendChild(btn);
      }
    }

    function filterTopics(selectedCat) {
      if (filterBar) {
        Array.from(filterBar.children).forEach(btn => {
          if (btn.textContent === selectedCat) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
      Array.from(container.children).forEach(block => {
        if (selectedCat === 'All Topics' || block.dataset.category === selectedCat) {
          block.style.display = 'block';
        } else {
          block.style.display = 'none';
        }
      });
    }

    // Remove the global grid class from the main wrapper to stack categories vertically
    container.className = '';
    container.innerHTML = '';

    const themeColors = ['#04AA6D', '#f39c12', '#9b59b6', '#e74c3c', '#3498db', '#1abc9c', '#e67e22', '#FAD0C4'];
    let colorIndex = 0;

    for (const cat in categorized) {
      const catBlock = document.createElement('div');
      catBlock.className = 'blog-category-block';
      catBlock.dataset.category = cat;

      const catHeader = document.createElement('h2');
      catHeader.className = 'blog-category-header';
      catHeader.textContent = cat;
      
      const themeColor = themeColors[colorIndex % themeColors.length];
      catHeader.style.borderBottomColor = themeColor;
      colorIndex++;

      const catGrid = document.createElement('div');
      catGrid.className = 'blog-grid-all';

      catBlock.appendChild(catHeader);
      catBlock.appendChild(catGrid);

      renderBlogs(categorized[cat], catGrid);
      container.appendChild(catBlock);
    }
  } catch(e) {
    container.innerHTML = '<div class="blog-loading-msg">No articles available yet. Check back soon.</div>';
    container.className = 'blog-grid-all';
  }
}

function renderBlogs(blogs, grid) {
  grid.innerHTML = '';
  blogs.forEach(b => {
    const imgSrc = b.image && b.image.startsWith('http') ? b.image : (rootPath() + b.image);
    grid.innerHTML += `
      <a href="${b.url}" class="blog-card glass-hover" style="display:flex;flex-direction:column;background:#282A35;border-radius:16px;overflow:hidden;text-decoration:none;border:1px solid rgba(255,255,255,0.05);transition:transform 0.3s,box-shadow 0.3s;" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 20px 40px rgba(0,0,0,0.4)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
        <div style="height:200px;background:#1e1f26;position:relative;overflow:hidden;">
          <img src="${imgSrc}" alt="${b.title}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'">
          <div style="position:absolute;top:12px;right:12px;background:rgba(4,170,109,0.9);color:#fff;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:20px;">${b.source || 'Curated'}</div>
        </div>
        <div style="padding:24px;flex:1;display:flex;flex-direction:column;">
          <div style="font-size:10px;color:#04AA6D;letter-spacing:0.15em;text-transform:uppercase;font-weight:700;margin-bottom:10px;">${b.category} • ${b.date}</div>
          <h3 style="font-family:var(--font-disp);font-size:18px;font-weight:700;color:#fff;margin-bottom:12px;line-height:1.4;flex:1;">${b.title}</h3>
          <p style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;margin-bottom:16px;">${(b.description||'').slice(0,160)}...</p>
          <div style="font-size:11px;color:#04AA6D;font-weight:600;letter-spacing:0.05em;">Read Article →</div>
        </div>
      </a>
    `;
  });
}

/* ── Native Article Reader ───────────────────────── */
async function loadArticle() {
  const container = document.getElementById('articleContent');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    container.innerHTML = '<div style="color:rgba(255,255,255,0.5);text-align:center;padding:60px;">No article specified.</div>';
    return;
  }

  container.innerHTML = '<div style="color:rgba(255,255,255,0.4);text-align:center;padding:60px;">Loading article...</div>';

  try {
    const data = await getBlogsData();
    const article = (data.articles || []).find(a => String(a.id) === String(id));

    if (!article) {
      container.innerHTML = '<div style="color:rgba(255,255,255,0.5);text-align:center;padding:60px;">Article not found or has expired (articles are auto-removed after 30 days).</div>';
      return;
    }

    document.title = article.title + ' | Infinite Creative Web Design';

    const imgSrc = article.image && article.image.startsWith('http') ? article.image : (rootPath() + article.image);

    container.innerHTML = `
      <a href="blogs.html" style="display:inline-flex;align-items:center;gap:8px;color:#04AA6D;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:32px;letter-spacing:0.05em;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">
        ← Back to all articles
      </a>
      <div style="margin-bottom:40px;">
        <div style="font-size:12px;color:#04AA6D;letter-spacing:0.15em;text-transform:uppercase;font-weight:700;margin-bottom:16px;">${article.category} • ${article.date} ${article.source ? '• <span style="color:var(--grey);">via ' + article.source + '</span>' : ''}</div>
        <h1 style="font-family:var(--font-disp);font-size:clamp(32px,5vw,48px);font-weight:800;color:var(--white);line-height:1.2;margin-bottom:0;letter-spacing:-0.02em;">${article.title}</h1>
      </div>
      ${article.image ? `<img src="${imgSrc}" alt="${article.title}" style="width:100%;max-height:500px;object-fit:cover;border-radius:16px;margin-bottom:48px;box-shadow:0 12px 30px rgba(0,0,0,0.08);" onerror="this.style.display='none'">` : ''}
      <div class="article-body">
        ${article.body_html || '<p>' + (article.description || '') + '</p>'}
      </div>
      <div style="margin-top:56px;padding-top:40px;border-top:1px solid rgba(0,0,0,0.08);display:flex;justify-content:space-between;align-items:center;flex-wrap:gap;">
        <a href="blogs.html" style="display:inline-flex;align-items:center;gap:8px;color:#04AA6D;font-size:14px;font-weight:600;text-decoration:none;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">← More Articles</a>
        <a href="contact.html" style="display:inline-flex;align-items:center;gap:8px;background:#04AA6D;color:#fff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:30px;letter-spacing:0.05em;box-shadow:0 8px 20px rgba(4,170,109,0.2);" onmouseover="this.style.background='#038a57'" onmouseout="this.style.background='#04AA6D'">Work With Us →</a>
      </div>
    `;
  } catch(e) {
    container.innerHTML = '<div style="color:rgba(255,255,255,0.5);text-align:center;padding:60px;">Error loading article. Please try again.</div>';
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

/* ── Packages & Pricing System ─────────────────── */
const DEFAULT_PACKAGES = [
  {
    "id": "pkg-starter-5k",
    "name": "Starter Essential",
    "price": "Rs. 5,000/-",
    "priceNum": 5000,
    "tag": "Budget Hero",
    "tier": "Low-Cost Series",
    "featured": false,
    "popular": false,
    "description": "Essential package perfect for personal websites, small shops & simple business presence.",
    "features": [
      "3-4 Pages Included",
      "100% Mobile & Android Friendly Layout",
      "WhatsApp Instant Chat & Call Button",
      "Social Media Integration",
      "Lightning Fast Loading Speed",
      "🎁 100% Free Cloud Hosting (Zero Monthly Fees)"
    ],
    "addon": "📄 Add extra pages for just Rs. 1,500/- per page",
    "cta": "Choose Starter 5K",
    "order": 1
  },
  {
    "id": "pkg-standard-10k",
    "name": "Standard Business",
    "price": "Rs. 10,000/-",
    "priceNum": 10000,
    "tag": "Best Value",
    "tier": "Low-Cost Series",
    "featured": true,
    "popular": true,
    "description": "Solid multi-page business website with self-manageable admin panel.",
    "features": [
      "5 Pages Architecture",
      "Self-Manageable Admin Panel",
      "Google Maps & Local Contact Form",
      "Basic SEO Meta Optimization",
      "1 Month Free Dedicated Support",
      "🎁 100% Free Cloud Hosting (No Monthly Server Cost)"
    ],
    "addon": "Add extra pages for Rs. 1,500/- per page",
    "cta": "Choose Standard 10K",
    "order": 2
  },
  {
    "id": "pkg-advanced-15k",
    "name": "Advanced Growth",
    "price": "Rs. 15,000/-",
    "priceNum": 15000,
    "tag": "Growth",
    "tier": "Low-Cost Series",
    "featured": false,
    "popular": false,
    "description": "Custom UI design built for high conversions, lead generation and marketing campaigns.",
    "features": [
      "Custom UI Design System",
      "Full Control Admin Dashboard",
      "Speed Optimization (95+ Mobile Score)",
      "Meta Pixel & WhatsApp Lead Capture",
      "Interactive Contact & Quotation Forms",
      "Standard Google SEO Setup",
      "🚀 High-Speed Cloud Server Deployment"
    ],
    "addon": "Priority 2-Month Support included",
    "cta": "Choose Advanced 15K",
    "order": 3
  },
  {
    "id": "pkg-professional-20k",
    "name": "Corporate Professional",
    "price": "Rs. 20,000/-",
    "priceNum": 20000,
    "tag": "Most Popular",
    "tier": "Low-Cost Series",
    "featured": true,
    "popular": true,
    "description": "Corporate-level web presence with advanced security, Google Analytics and speed boost.",
    "features": [
      "Premium Corporate Layout",
      "Google Analytics 4 Setup",
      "Advanced Security & SSL Layer",
      "Full Google Local SEO Optimization",
      "Full Control Admin Panel",
      "3 Months Dedicated Priority Support",
      "🚀 High-Speed Cloud Server Deployment"
    ],
    "addon": "Complete Brand & Digital Asset Alignment",
    "cta": "Choose Professional 20K",
    "order": 4
  },
  {
    "id": "pkg-starter-30k",
    "name": "Starter 01 (Promo)",
    "price": "Rs. 30,000/-",
    "originalPrice": "Rs. 37,500/-",
    "priceNum": 30000,
    "tag": "Promotion",
    "tier": "Low-Cost Series",
    "featured": false,
    "popular": false,
    "description": "High-impact single-page conversion landing page with professional business email.",
    "features": [
      "1-Page High Converting Website",
      "1 Professional Business Email Account",
      "100% Android & iPhone Responsive UI",
      "Google Maps & Direct Inquiries Form",
      "WhatsApp & Social Links",
      "🎁 Free Cloud Hosting Included"
    ],
    "addon": "Fast delivery in 2-3 business days",
    "cta": "Choose Starter 30K",
    "order": 5
  },
  {
    "id": "pkg-starter-35k",
    "name": "Starter 02 (Promo)",
    "price": "Rs. 35,000/-",
    "originalPrice": "Rs. 45,000/-",
    "priceNum": 35000,
    "tag": "Promotion",
    "tier": "Low-Cost Series",
    "featured": false,
    "popular": false,
    "description": "Clean 2-page website for growing services and portfolio showcases with business email.",
    "features": [
      "2-Pages Website Architecture",
      "1 Professional Business Email Account",
      "Mobile & Tablet Touch Optimized",
      "Contact Form & WhatsApp Lead Capture",
      "Basic SEO Meta Configuration",
      "🎁 Free Cloud Hosting & SSL Certificate"
    ],
    "addon": "Priority 1-Month Support",
    "cta": "Choose Starter 35K",
    "order": 6
  },
  {
    "id": "pkg-starter-40k",
    "name": "Starter 03 (Promo)",
    "price": "Rs. 40,000/-",
    "originalPrice": "Rs. 50,000/-",
    "priceNum": 40000,
    "tag": "Promotion",
    "tier": "Low-Cost Series",
    "featured": false,
    "popular": false,
    "description": "Comprehensive 3-page business presentation with dedicated email and admin panel.",
    "features": [
      "3-Pages Full Website (Home, Services, Contact)",
      "1 Professional Business Email Account",
      "Self-Manageable Admin Panel",
      "Speed Optimization (90+ Mobile PageSpeed)",
      "Google Maps & Social Media Setup",
      "🎁 100% Free Cloud Hosting Included"
    ],
    "addon": "Free Logo & Favicon Styling included",
    "cta": "Choose Starter 40K",
    "order": 7
  },
  {
    "id": "pkg-starter-corp-45k",
    "name": "Starter Corporate",
    "price": "Rs. 45,000/-",
    "originalPrice": "Rs. 57,500/-",
    "priceNum": 45000,
    "tag": "Special Offer",
    "tier": "Corporate Series",
    "featured": false,
    "popular": false,
    "description": "4-page corporate presentation built for modern companies, consultants and agencies.",
    "features": [
      "4-Pages Custom Website",
      "1 Professional Business Email Account",
      "Full Control Admin Panel",
      "Contact & Quotation Request Forms",
      "Standard Google SEO Setup",
      "🚀 High-Speed Cloud Server Deployment"
    ],
    "addon": "Add extra pages for Rs. 1,500/- per page",
    "cta": "Choose Starter Corp",
    "order": 8
  },
  {
    "id": "pkg-silver-60k",
    "name": "Silver Corporate",
    "price": "Rs. 60,000/-",
    "originalPrice": "Rs. 75,000/-",
    "priceNum": 60000,
    "tag": "Most Popular",
    "tier": "Corporate Series",
    "featured": true,
    "popular": true,
    "description": "10-page complete business website with multiple business email accounts and full SEO.",
    "features": [
      "10-Pages Corporate Website",
      "3 Professional Business Email Accounts",
      "Custom UI/UX Design System",
      "Full SEO & Google Search Console Setup",
      "Self-Manageable Admin Panel",
      "Social Media & WhatsApp CRM Integration",
      "2 Months Free Priority Maintenance",
      "🚀 High-Performance Global Cloud Hosting"
    ],
    "addon": "Dual Language Support (Sinhala + English) available",
    "cta": "Choose Silver 60K",
    "order": 9
  },
  {
    "id": "pkg-gold-99k",
    "name": "Gold Enterprise Portal",
    "price": "Rs. 99,000/-",
    "originalPrice": "Rs. 125,000/-",
    "priceNum": 99000,
    "tag": "High Impact",
    "tier": "Corporate Series",
    "featured": false,
    "popular": false,
    "description": "20-page full corporate portal with multi-department email accounts and advanced SEO.",
    "features": [
      "20-Pages Extensive Corporate Architecture",
      "5 Professional Business Email Accounts",
      "Advanced Speed & Caching Layer",
      "Full Control Dynamic Admin Dashboard",
      "Meta Pixel & GA4 Analytics Setup",
      "Interactive Lead & Booking Systems",
      "3 Months Dedicated Priority Support",
      "🚀 Enterprise Cloud Server Deployment"
    ],
    "addon": "Includes PayHere / Online Card Gateway option",
    "cta": "Choose Gold 99K",
    "order": 10
  },
  {
    "id": "pkg-platinum-125k",
    "name": "Platinum Powerhouse",
    "price": "Rs. 125,000/-",
    "originalPrice": "Rs. 160,000/-",
    "priceNum": 125000,
    "tag": "Enterprise",
    "tier": "Corporate Series",
    "featured": false,
    "popular": false,
    "description": "30-page enterprise powerhouse with 10 business emails and maximum security.",
    "features": [
      "30-Pages Comprehensive Web Portal",
      "10 Professional Business Email Accounts",
      "DDoS Shield & Advanced Cyber Security",
      "Full SEO & Rich Snippets Optimization",
      "Blog / News Publishing System",
      "Custom Admin Panel for Team Multi-Users",
      "6 Months Comprehensive Support",
      "🚀 Global CDN & High-Capacity Cloud Infrastructure"
    ],
    "addon": "VIP Account Manager Support included",
    "cta": "Choose Platinum 125K",
    "order": 11
  },
  {
    "id": "pkg-platinum-nextgen-160k",
    "name": "Platinum Next-Gen 3D Elite",
    "price": "Rs. 160,000/-",
    "originalPrice": "Rs. 200,000/-",
    "priceNum": 160000,
    "tag": "Flagship 2026",
    "tier": "Corporate Series",
    "featured": true,
    "popular": false,
    "description": "All Platinum features + Next-Gen Ultra Modern 3D / Interactive Design & Animation.",
    "features": [
      "All Features in Platinum Included",
      "Next-Gen Modern UI/UX (Three.js / 3D Bento Grid)",
      "Custom Micro-Interactions & Fluid Animations",
      "10+ Business Email Accounts",
      "Advanced API & CRM Integrations",
      "Full AI Search Engine Optimization (AEO/GEO)",
      "1 Year Dedicated Maintenance & VIP Support",
      "🚀 Ultra-Fast Edge Cloud Infrastructure"
    ],
    "addon": "Free .COM Domain + Corporate Identity Suite",
    "cta": "Choose Next-Gen 160K",
    "order": 12
  },
  {
    "id": "pkg-product-catalogue-180k",
    "name": "Product Catalogue Solution",
    "price": "Rs. 180,000/-",
    "priceNum": 180000,
    "tag": "Wholesale & Trade",
    "tier": "E-Commerce Series",
    "featured": false,
    "popular": false,
    "description": "Showcase unlimited product categories and receive direct wholesale & retail inquiries.",
    "features": [
      "Unlimited Product Catalogue Display",
      "Direct WhatsApp / Email Quote Inquiries",
      "Category Filtering & Instant Search",
      "Admin Inventory & Product Management",
      "5 Business Email Accounts",
      "Google Merchant / Product Schema SEO",
      "🚀 High-Speed Cloud Server Deployment"
    ],
    "addon": "Conditions Apply",
    "cta": "Choose Product Catalogue",
    "order": 13
  },
  {
    "id": "pkg-ecommerce-full-200k",
    "name": "Full E-Commerce Platform",
    "price": "Rs. 200,000/-",
    "priceNum": 200000,
    "tag": "Online Store",
    "tier": "E-Commerce Series",
    "featured": true,
    "popular": false,
    "description": "Complete online store with shopping carts, PayHere card checkout, and order tracking.",
    "features": [
      "Complete Shopping Cart & Checkout System",
      "PayHere / Master / Visa / Koko Online Payments",
      "Order Management & Customer Invoicing",
      "Automated WhatsApp & Email Order Alerts",
      "Stock & Inventory Management Panel",
      "Coupon Codes, Discounts & Flash Sales",
      "6 Months Dedicated E-Commerce Support",
      "🚀 High-Security Cloud Server with SSL & DDoS Guard"
    ],
    "addon": "Conditions Apply",
    "cta": "Choose Full E-Commerce",
    "order": 14
  }
];

async function loadPackages() {
  const grid = document.getElementById('packagesGrid');
  if (!grid) return;

  let pkgs = [];
  try {
    const { db, collection, getDocs } = await import('./firebase-config.js');
    const snap = await getDocs(collection(db, 'packages'));
    if (!snap.empty) {
      snap.forEach(d => pkgs.push({ id: d.id, ...d.data() }));
      pkgs.sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99));
    }
  } catch (e) {
    console.log('Using local package data');
  }

  if (!pkgs || pkgs.length === 0) {
    const saved = localStorage.getItem('infinite_packages');
    if (saved) {
      try { pkgs = JSON.parse(saved); } catch(err) {}
    }
  }

  if (!pkgs || pkgs.length === 0) {
    try {
      const res = await fetch(rootPath() + 'data/packages.json?v=' + Date.now());
      if (res.ok) {
        pkgs = await res.json();
      }
    } catch(err) {}
  }

  if (!pkgs || pkgs.length === 0) {
    pkgs = DEFAULT_PACKAGES;
  }

  renderPackages(pkgs, grid);
}


function parseBasePrice(priceStr) {
  const digits = String(priceStr).replace(/[^0-9]/g, '');
  return parseInt(digits, 10) || 5000;
}

function renderPackages(list, container) {
  container.innerHTML = '';
  list.forEach((pkg, index) => {
    const basePrice = parseBasePrice(pkg.price);
    const card = document.createElement('div');
    card.className = `pkg-card ${pkg.featured ? 'featured' : ''} reveal reveal-delay-${(index % 4) + 1}`;
    card.id = `pkg_card_${pkg.id || index}`;

    const featuresHtml = (pkg.features || []).map(feat => `
      <li class="pkg-feature-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${feat}</span>
      </li>
    `).join('');

    const addonsHtml = `
      <div class="pkg-addons-box" style="margin: 16px 0; padding: 16px; background: #0d1527; border: 1px solid rgba(4,170,109,0.35); border-radius: 12px; text-align: left; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
        <div style="font-size: 11px; font-weight: 800; color: #04AA6D; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; display:flex; align-items:center; gap:6px;">
          <span>✨ Select Power Add-ons:</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #ffffff; font-weight: 600;">
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; color:#ffffff !important;">
            <input type="checkbox" class="pkg-addon-cb" data-pkg-id="${pkg.id || index}" data-name="+1 Extra Custom Page" data-price="1500" onchange="updatePkgTotal('${pkg.id || index}', ${basePrice}, '${pkg.name}')" accent-color="#04AA6D">
            <span style="color:#ffffff !important;">📄 +1 Extra Page (+Rs. 1,500)</span>
          </label>
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; color:#ffffff !important;">
            <input type="checkbox" class="pkg-addon-cb" data-pkg-id="${pkg.id || index}" data-name="PayHere Card Gateway" data-price="8000" onchange="updatePkgTotal('${pkg.id || index}', ${basePrice}, '${pkg.name}')" accent-color="#04AA6D">
            <span style="color:#ffffff !important;">💳 PayHere Card Gateway (+Rs. 8,000)</span>
          </label>
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; color:#ffffff !important;">
            <input type="checkbox" class="pkg-addon-cb" data-pkg-id="${pkg.id || index}" data-name="Google Maps & Local SEO Setup" data-price="2500" onchange="updatePkgTotal('${pkg.id || index}', ${basePrice}, '${pkg.name}')" accent-color="#04AA6D">
            <span style="color:#ffffff !important;">📍 Google Maps & Local SEO (+Rs. 2,500)</span>
          </label>
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; color:#ffffff !important;">
            <input type="checkbox" class="pkg-addon-cb" data-pkg-id="${pkg.id || index}" data-name="Sinhala + English Dual Language" data-price="5000" onchange="updatePkgTotal('${pkg.id || index}', ${basePrice}, '${pkg.name}')" accent-color="#04AA6D">
            <span style="color:#ffffff !important;">🗣️ Sinhala + English Dual (+Rs. 5,000)</span>
          </label>
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; color:#ffffff !important;">
            <input type="checkbox" class="pkg-addon-cb" data-pkg-id="${pkg.id || index}" data-name="Core Web Vitals 99+ Speed Boost" data-price="2000" onchange="updatePkgTotal('${pkg.id || index}', ${basePrice}, '${pkg.name}')" accent-color="#04AA6D">
            <span style="color:#ffffff !important;">⚡ 99+ PageSpeed Boost (+Rs. 2,000)</span>
          </label>
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; color:#ffffff !important;">
            <input type="checkbox" class="pkg-addon-cb" data-pkg-id="${pkg.id || index}" data-name="Custom Brand Logo & Favicon" data-price="3500" onchange="updatePkgTotal('${pkg.id || index}', ${basePrice}, '${pkg.name}')" accent-color="#04AA6D">
            <span style="color:#ffffff !important;">🎨 Custom Brand Logo (+Rs. 3,500)</span>
          </label>
        </div>
      </div>
    `;

    const hostingNote = basePrice <= 10000 
      ? '<div style="font-size:11px; color:#04AA6D; font-weight:700; margin-bottom:12px;">🎁 100% Free Cloud Hosting Included</div>' 
      : '<div style="font-size:11px; color:#38bdf8; font-weight:700; margin-bottom:12px;">🚀 High-Performance Cloud Deployment Included</div>';

    card.innerHTML = `
      <div class="pkg-badge-wrap">
        <span class="pkg-badge ${pkg.featured ? 'featured-badge' : ''}">${pkg.tag || 'Package'}</span>
        <div class="pkg-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${pkg.name.toLowerCase().includes('commerce') ? '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>' : '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'}
          </svg>
        </div>
      </div>
      <h3 class="pkg-name">${pkg.name}</h3>
      <p class="pkg-desc">${pkg.description || ''}</p>
      <div class="pkg-price-wrap">
        <div class="pkg-price" id="price_display_${pkg.id || index}">${pkg.price}</div>
      </div>
      ${hostingNote}
      <ul class="pkg-features">
        ${featuresHtml}
      </ul>
      ${addonsHtml}
      <button onclick="orderPackageWhatsApp('${pkg.id || index}', ${basePrice}, '${pkg.name}')" class="pkg-btn" style="width:100%; border:none; cursor:pointer; font-family:inherit; font-size:0.95rem; font-weight:800; display:inline-flex; align-items:center; justify-content:center; gap:8px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
        <span>${pkg.cta || 'Choose ' + pkg.name}</span> &rarr;
      </button>
    `;

    container.appendChild(card);
  });
}

function updatePkgTotal(pkgId, basePrice, pkgName) {
  const cbs = document.querySelectorAll(`.pkg-addon-cb[data-pkg-id="${pkgId}"]:checked`);
  let addonTotal = 0;
  cbs.forEach(cb => addonTotal += parseInt(cb.dataset.price, 10));
  const total = basePrice + addonTotal;
  const disp = document.getElementById(`price_display_${pkgId}`);
  if (disp) {
    disp.textContent = 'Rs. ' + total.toLocaleString() + '/-';
  }
}

function orderPackageWhatsApp(pkgId, basePrice, pkgName) {
  const cbs = document.querySelectorAll(`.pkg-addon-cb[data-pkg-id="${pkgId}"]:checked`);
  let addonTotal = 0;
  const selectedAddons = [];
  cbs.forEach(cb => {
    const p = parseInt(cb.dataset.price, 10);
    addonTotal += p;
    selectedAddons.push(`• ${cb.dataset.name} (+Rs. ${p.toLocaleString()})`);
  });

  const total = basePrice + addonTotal;
  
  let msg = `👋 Hello Infinite Creative Web Design!\n\n`;
  msg += `📦 *Selected Package:* ${pkgName} (Base: Rs. ${basePrice.toLocaleString()}/-)\n`;
  
  if (selectedAddons.length > 0) {
    msg += `\n✨ *Selected Add-ons:*\n${selectedAddons.join('\n')}\n`;
  } else {
    msg += `\n✨ *Add-ons:* Standard Included Features\n`;
  }

  msg += `\n💰 *Total Investment:* Rs. ${total.toLocaleString()}/-\n`;
  msg += `🚀 I would like to get started with this package. Please let me know how to proceed!`;

  const waUrl = `https://wa.me/94789714912?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

/* ── Init ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  loadProjects();
  loadPackages();
  loadBlogs();
  loadAllBlogs();
  loadArticle();
  loadSettings();
  const lnk = document.createElement('link');
  lnk.rel = 'stylesheet';
  lnk.href = rootPath() + 'css/additions.css';
  document.head.appendChild(lnk);
});

/* ── Footer Background Typing ───────────────────── */
(function initFooterBgTyping() {
  const footer = document.querySelector('.footer');
  if (!footer) return;
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

/* ── FAQ Accordion Toggle ───────────────────────── */
(function initFaq(){
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.faq-question');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    if (!item) return;
    const wasActive = item.classList.contains('active');
    
    // Close other FAQs in the same container if desired, or toggle
    const container = item.closest('.faq-wrap');
    if (container) {
      container.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
    }
    if (!wasActive) {
      item.classList.add('active');
    }
  });
})();

