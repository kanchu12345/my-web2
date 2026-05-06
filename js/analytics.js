/* ═══════════════════════════════════════════════════
   analytics.js — GA4 event tracking + conversion tracking
═══════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* ── GA4 helper ───────────────────────────── */
  function track(event, params){
    if(typeof gtag==='function') gtag('event', event, params||{});
  }

  /* ── Page view ───────────────────────────── */
  track('page_view',{
    page_title: document.title,
    page_location: location.href,
    page_path: location.pathname
  });

  /* ── Session start time ──────────────────── */
  const sessionStart = Date.now();
  window.addEventListener('beforeunload',function(){
    const dur = Math.round((Date.now()-sessionStart)/1000);
    track('session_duration',{value:dur,metric_id:'time_on_page'});
  });

  /* ── WhatsApp CTA ─────────────────────────── */
  document.addEventListener('click',function(e){
    const el = e.target.closest('#waBtn');
    if(el){
      track('conversion',{event_category:'contact',event_label:'whatsapp_click',value:1});
      // Facebook Pixel (optional)
      if(typeof fbq==='function') fbq('track','Contact');
    }
  });

  /* ── Hero CTA ─────────────────────────────── */
  document.addEventListener('click',function(e){
    if(e.target.closest('#heroViewWork'))  track('cta_click',{label:'hero_view_work'});
    if(e.target.closest('#heroContact'))   track('cta_click',{label:'hero_contact'});
    if(e.target.closest('#viewAllProjects')) track('cta_click',{label:'view_all_projects'});
  });

  /* ── Scroll depth ────────────────────────── */
  const depths=[25,50,75,90];const fired={};
  window.addEventListener('scroll',function(){
    const pct=Math.round((window.scrollY/(document.body.scrollHeight-window.innerHeight))*100);
    depths.forEach(function(d){
      if(pct>=d&&!fired[d]){fired[d]=true;track('scroll',{percent_scrolled:d});}
    });
  },{passive:true});

  /* ── Store visit in localStorage for admin quick view ── */
  try{
    const visits = JSON.parse(localStorage.getItem('id_visits')||'{"count":0,"pages":[]}');
    visits.count++;
    visits.pages.push({path:location.pathname,ts:Date.now()});
    if(visits.pages.length>20) visits.pages=visits.pages.slice(-20);
    localStorage.setItem('id_visits',JSON.stringify(visits));
  }catch(e){}

})();
