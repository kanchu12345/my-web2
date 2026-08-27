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
    id: "pkg-starter",
    name: "Starter",
    price: "Rs. 5,000/-",
    tag: "Essential",
    featured: false,
    description: "Essential package perfect for personal websites & simple business presence.",
    features: [
      "3 Pages Included",
      "Mobile Friendly Design",
      "WhatsApp & Social Media Integration",
      "Clean & Modern Layout",
      "Fast Loading Speed"
    ],
    addon: "📄 Need more pages? Add extra pages for just Rs. 1,500/- per page!",
    cta: "Choose Starter",
    order: 1
  },
  {
    id: "pkg-standard",
    name: "Standard",
    price: "Rs. 10,000/-",
    tag: "Standard",
    featured: false,
    description: "Solid multi-page website with self-manageable admin panel.",
    features: [
      "5 Pages Included",
      "Admin Panel Access",
      "Contact Form Integration",
      "Basic SEO Setup",
      "1 Month Free Support",
      "Social Media & Chat Integration"
    ],
    addon: "Add extra pages for Rs. 1,500/- per page",
    cta: "Choose Standard",
    order: 2
  },
  {
    id: "pkg-advanced",
    name: "Advanced",
    price: "Rs. 15,000/-",
    tag: "Growth",
    featured: false,
    description: "Custom UI design built for high conversions and marketing campaigns.",
    features: [
      "Custom UI Design",
      "Full Control Admin Panel",
      "Speed Optimization",
      "Meta Pixel Tracking Setup",
      "Advanced Contact & Lead Forms",
      "Standard SEO & Analytics"
    ],
    addon: "Priority 2-Month Support included",
    cta: "Choose Advanced",
    order: 3
  },
  {
    id: "pkg-professional",
    name: "Professional",
    price: "Rs. 20,000/-",
    tag: "Most Popular",
    featured: true,
    description: "Corporate-level web presence with advanced security and analytics.",
    features: [
      "Premium Corporate Design",
      "Google Analytics Setup",
      "Advanced Security Layer",
      "Full SEO Optimization",
      "Full Control Admin Panel",
      "High Speed Performance Optimization",
      "3 Months Priority Support"
    ],
    addon: "Complete Brand & Digital Asset Alignment",
    cta: "Choose Professional",
    order: 4
  },
  {
    id: "pkg-business-pro",
    name: "Business Pro",
    price: "Rs. 40,000/-",
    tag: "Enterprise",
    featured: false,
    description: "Top-tier custom engineering tailored specifically for market leaders.",
    features: [
      "Bespoke Custom UI/UX Engineering",
      "Core Web Vitals Optimization",
      "6 Months Extended Support",
      "Custom Micro-Interactions & Animations",
      "Full SEO & Conversion Suite",
      "Advanced Role-Based Admin Panel",
      "Automated Daily Cloud Backups"
    ],
    addon: "Free Minor Updates for 6 Months",
    cta: "Choose Business Pro",
    order: 5
  },
  {
    id: "pkg-ecommerce",
    name: "E-Commerce Online Stores",
    price: "Start from Rs. 60,000/-",
    tag: "Full Store",
    featured: false,
    description: "Full-featured online store ready to sell products and receive payments.",
    features: [
      "Complete E-Commerce Online Store",
      "Payment Gateway Integration (Card, Bank, COD)",
      "Product Catalog & Category Filtering",
      "Shopping Cart & Multi-Step Checkout",
      "Customer Accounts & Order Tracking",
      "Admin Inventory & Sales Dashboard",
      "Full SEO + Speed Optimization"
    ],
    addon: "Includes product upload training & store setup guide",
    cta: "Start E-Commerce Store",
    order: 6
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

function renderPackages(list, container) {
  container.innerHTML = '';
  list.forEach((pkg, index) => {
    const card = document.createElement('div');
    card.className = `pkg-card ${pkg.featured ? 'featured' : ''} reveal reveal-delay-${(index % 4) + 1}`;

    const featuresHtml = (pkg.features || []).map(feat => `
      <li class="pkg-feature-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${feat}</span>
      </li>
    `).join('');

    const addonHtml = pkg.addon ? `
      <div class="pkg-addon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        <span>${pkg.addon}</span>
      </div>
    ` : '';

    const waText = encodeURIComponent(`Hi Infinite Creative Web Design! I'm interested in the "${pkg.name}" (${pkg.price}) Web Design Package. Please provide more information.`);
    const waUrl = `https://wa.me/94771234567?text=${waText}`;

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
        <div class="pkg-price">${pkg.price}</div>
      </div>
      <ul class="pkg-features">
        ${featuresHtml}
      </ul>
      ${addonHtml}
      <a href="${waUrl}" target="_blank" rel="noopener" class="pkg-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
        ${pkg.cta || 'Get Started'}
      </a>
    `;

    container.appendChild(card);
  });

  // Trigger reveal observer for newly created elements
  if (typeof IntersectionObserver !== 'undefined') {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    container.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
}

/* ── Init ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded',function(){
  loadProjects();
  loadPackages();
  loadBlogs();
  loadAllBlogs();
  loadArticle();
  loadSettings();
  // link CSS additions
  const lnk=document.createElement('link');
  lnk.rel='stylesheet';lnk.href=rootPath()+'css/additions.css';
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
