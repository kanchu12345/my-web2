<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>@yield('title', 'Infinite Creative Design | Web Design')</title>
<meta name="description" content="Infinite Creative Design — 12+ years of premium branding and creative web solutions.">
<link rel="stylesheet" href="{{ asset('css/main.css') }}">
<link rel="icon" type="image/png" href="{{ asset('images/logo.png') }}">
<style>
  body { padding-top: 100px; }
  @if(request()->is('/'))
    body { padding-top: 0; }
  @endif
</style>
</head>
<body>

<!-- ══ NAVIGATION ══════════════════════════════ -->
<nav class="nav glass" id="mainNav" role="navigation">
  <a href="{{ url('/') }}" class="nav-logo">
    <img src="{{ asset('images/logo.png') }}" alt="Infinite Design Logo" width="34" height="34">
    <div class="nav-brand">
      <strong>INFINITE</strong>
      <small>Creative Design</small>
    </div>
  </a>
  <ul class="nav-links">
    <li><a href="{{ url('/') }}" class="{{ request()->is('/') ? 'active' : '' }}" {{ request()->is('/') ? 'style=color:var(--accent)' : '' }}>Home</a></li>
    <li><a href="{{ url('/portfolio') }}" class="{{ request()->is('portfolio') ? 'active' : '' }}" {{ request()->is('portfolio') ? 'style=color:var(--accent)' : '' }}>Portfolio</a></li>
    <li><a href="{{ url('/about') }}" class="{{ request()->is('about') ? 'active' : '' }}" {{ request()->is('about') ? 'style=color:var(--accent)' : '' }}>About</a></li>
    <li><a href="{{ url('/services') }}" class="{{ request()->is('services') ? 'active' : '' }}" {{ request()->is('services') ? 'style=color:var(--accent)' : '' }}>Services</a></li>
    <li><a href="{{ url('/contact') }}" class="{{ request()->is('contact') ? 'active' : '' }}" {{ request()->is('contact') ? 'style=color:var(--accent)' : '' }}>Contact</a></li>
  </ul>
  <button class="nav-toggle glass" id="navToggle">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  </button>
</nav>

<div class="mobile-menu glass" id="mobileMenu">
  <a href="{{ url('/') }}" class="mm-link">Home</a>
  <a href="{{ url('/portfolio') }}" class="mm-link">Portfolio</a>
  <a href="{{ url('/about') }}" class="mm-link">About</a>
  <a href="{{ url('/services') }}" class="mm-link">Services</a>
  <a href="{{ url('/contact') }}" class="mm-link">Contact</a>
</div>

<!-- ══ CONTENT ═════════════════════════════════ -->
@yield('content')

<!-- ══ FOOTER ══════════════════════════════════ -->
<footer class="footer" role="contentinfo">
  <div class="footer-inner">
    <div class="footer-brand">
      <img src="{{ asset('images/logo.png') }}" alt="Infinite Design" width="30" height="30">
      <span style="font-family:var(--font-disp);font-size:13px;font-weight:600;letter-spacing:.15em">INFINITE</span>
    </div>
    <span class="footer-copy">© {{ date('Y') }} Infinite Creative Design. All rights reserved.</span>
    <div class="footer-links">
      <a href="{{ url('/portfolio') }}">Work</a>
      <a href="{{ url('/about') }}">About</a>
      <a href="{{ url('/admin') }}">Admin</a>
    </div>
  </div>
</footer>

<script src="{{ asset('js/main.js') }}"></script>
</body>
</html>
