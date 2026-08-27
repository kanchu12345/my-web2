@extends('layouts.app')

@section('content')
<!-- ══ HERO ═══════════════════════════════════ -->
<section class="hero" id="home" aria-label="Hero">
  <div class="hero-bento">

    <!-- Main kinetic cell -->
    <div class="hero-main glass glass-hover reveal">
      <div class="kinetic-wrap">
        <div class="kinetic" id="kineticText" aria-label="Infinite">
          <span class="l">I</span><span class="l">N</span><span class="l">F</span>
          <span class="l">I</span><span class="l">N</span><span class="l">I</span>
          <span class="l">T</span><span class="l">E</span>
        </div>
      </div>
      <p class="hero-sub">Top 3% Creative Talent</p>
      <p class="hero-tagline">"High-impact Creative Solutions Executed by World-class Talent."</p>
      <div class="hero-btns">
        <a href="{{ url('/portfolio') }}" class="btn btn-primary" id="heroViewWork">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          View Work
        </a>
        <a href="{{ url('/contact') }}" class="btn btn-ghost" id="heroContact">Get In Touch</a>
      </div>
    </div>

    <!-- Badge cell -->
    <div class="hero-badge glass glass-hover reveal reveal-delay-1">
      <img src="{{ asset('images/logo.png') }}" alt="" width="100" height="100" style="filter:invert(1);mix-blend-mode:multiply">
      <div class="hero-badge-num">12+</div>
      <div class="hero-badge-label">Years of Excellence</div>
    </div>

    <!-- Scroll indicator cell -->
    <div class="hero-scroll-cell glass reveal reveal-delay-2">
      <div class="scroll-line"></div>
      <span class="scroll-lbl">Scroll</span>
    </div>

  </div>
</section>

<!-- ══ LEVERAGE TALENT ═══════════════════════════ -->
<section class="section" id="leverage" aria-label="Leverage World-class Talent" style="padding-top:0">
  <div class="section-inner">
    <div class="section-eyebrow reveal">Our Expertise</div>
    <div class="bento">
      <div class="b-cell glass reveal" style="grid-column: 1 / -1;">
        <div class="cell-head" style="margin-bottom: 1rem;">
          <h2 class="cell-title" style="font-size: 2rem;">Leverage World-class Talent</h2>
        </div>
        <p style="font-size: 1.1rem; max-width: 800px; margin-bottom: 2rem; color: var(--text-muted);">
          We are an exclusive network of top business, design, and technology talent, ready to tackle your most important initiatives. From technology to marketing to management consulting, we offer everything you need to achieve your goals.
        </p>
        <div class="services-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
          <div class="svc-card reveal reveal-delay-1">
            <div class="svc-title" style="color: var(--blue);">Designers</div>
            <div class="svc-desc">Expert UI, UX, Visual, and Interaction designers as well as a wide range of illustrators, animators, and more.</div>
          </div>
          <div class="svc-card reveal reveal-delay-2">
            <div class="svc-title" style="color: var(--blue);">Developers</div>
            <div class="svc-desc">Seasoned software engineers, coders, and architects with expertise across hundreds of technologies.</div>
          </div>
          <div class="svc-card reveal reveal-delay-3">
            <div class="svc-title" style="color: var(--blue);">Marketing Experts</div>
            <div class="svc-desc">Experts in digital marketing, growth marketing, content creation, brand strategy execution, and more.</div>
          </div>
          <div class="svc-card reveal reveal-delay-4">
            <div class="svc-title" style="color: var(--blue);">Project Managers</div>
            <div class="svc-desc">Digital and technical project managers, scrum masters, and more with expertise in numerous PM tools.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ RELIABILITY ═══════════════════════════════ -->
<section class="section" id="reliable" aria-label="Most Reliable" style="padding-top:0">
  <div class="section-inner">
    <div class="bento">
      <div class="b-cell glass reveal" style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 4rem 2rem;">
        <h2 class="cell-title" style="font-size: 2rem; margin-bottom: 1rem;">Ranked #1 Most Reliable Professional Services</h2>
        <p style="font-size: 1.1rem; max-width: 800px; margin-bottom: 2rem; color: var(--text-muted);">
          Rankings based on independent surveys of more than 2,400 decision-makers at leading companies. Consistently meets or exceeds expectations in quality and timeliness of deliverables.
        </p>
        <div class="about-stats" style="width: 100%; max-width: 800px;">
          <div class="astat"><div class="astat-num">98%</div><div class="astat-lbl">Success Rate</div></div>
          <div class="astat"><div class="astat-num">#1</div><div class="astat-lbl">Reliability</div></div>
          <div class="astat"><div class="astat-num">48h</div><div class="astat-lbl">Hiring Speed</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ PORTFOLIO ═══════════════════════════════ -->
<section class="section" id="portfolio" aria-label="Portfolio" style="padding-top:0">
  <div class="section-inner">
    <div class="section-eyebrow reveal">Our Work</div>
    <div class="bento">

      <div class="b-cell b-portfolio glass reveal" style="grid-column: 1 / -1;">
        <div class="cell-head">
          <h2 class="cell-title">Completed Projects</h2>
          <a href="{{ url('/portfolio') }}" class="cell-link" id="viewAllProjects">
            View all completed projects
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div class="proj-grid" id="projGrid">
          <!-- Populated by JS -->
        </div>
      </div>

    </div>
  </div>
</section>
@endsection
