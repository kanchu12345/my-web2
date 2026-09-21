"""
scripts/verify_phase4_performance.py
Comprehensive Phase 4 (Performance 20 pts) Automated Verification Suite
"""

import os
import re
import sys
from bs4 import BeautifulSoup

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
EXCLUDE_DIRS = {'.git', 'node_modules', 'infinite-laravel', 'backups'}

passed_tests = 0
failed_tests = 0

def assert_test(condition, desc):
    global passed_tests, failed_tests
    if condition:
        passed_tests += 1
        print(f"  PASS: {desc}")
    else:
        failed_tests += 1
        print(f"  FAIL: {desc}")

def get_all_html_files():
    files = []
    for root, dirs, filenames in os.walk(ROOT_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in filenames:
            if f.endswith('.html') and not f.startswith('google'):
                files.append(os.path.join(root, f))
    return sorted(files)

def run_performance_verification():
    print("==========================================================")
    print("BESTWEB.LK PHASE 4 PERFORMANCE VERIFICATION SUITE")
    print("==========================================================")

    # 1. Responsive WebP Image Assets
    print("\n--- [1. Modern WebP Format & Responsive Image Assets] ---")
    required_webp_assets = [
        "images/logo-100w.webp",
        "images/logo-200w.webp",
        "images/logo.webp",
        "images/blog_1-480w.webp",
        "images/blog_1-800w.webp",
        "images/blog_1.webp",
        "images/blog_2-480w.webp",
        "images/blog_2-800w.webp",
        "images/blog_2.webp",
        "images/blog_3-480w.webp",
        "images/blog_3-800w.webp",
        "images/blog_3.webp"
    ]
    for rel_path in required_webp_assets:
        full_p = os.path.join(ROOT_DIR, rel_path)
        exists = os.path.isfile(full_p)
        size_kb = (os.path.getsize(full_p) / 1024) if exists else 0
        assert_test(exists and size_kb > 0, f"Optimized WebP asset exists: {rel_path} ({size_kb:.1f} KB)")

    # 2. Audit All HTML Files for Zero Legacy PNG/JPG <img> tags
    print("\n--- [2. Zero Legacy PNG/JPG in <img> Tags Across All Pages] ---")
    html_files = get_all_html_files()
    total_imgs = 0
    legacy_imgs = []
    missing_dims = []
    missing_decoding = []
    missing_loading = []
    sync_scripts = []

    for fpath in html_files:
        rel = os.path.relpath(fpath, ROOT_DIR).replace('\\', '/')
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')

        for img in soup.find_all('img'):
            total_imgs += 1
            src = img.get('src', '')
            if src.lower().endswith(('.png', '.jpg', '.jpeg')):
                legacy_imgs.append((rel, str(img)))
            if not img.get('width') or not img.get('height'):
                missing_dims.append((rel, str(img)))
            if not img.get('decoding'):
                missing_decoding.append((rel, str(img)))
            if not img.get('loading'):
                missing_loading.append((rel, str(img)))

        for s in soup.find_all('script'):
            src = s.get('src')
            if src and not s.has_attr('defer') and not s.has_attr('async') and s.get('type') != 'module':
                sync_scripts.append((rel, src))

    assert_test(len(legacy_imgs) == 0, f"Zero legacy PNG/JPG in <img> tags (found {len(legacy_imgs)}) across {total_imgs} total images")
    assert_test(len(missing_dims) == 0, f"100% of <img> tags have explicit width & height to kill CLS (found {len(missing_dims)} missing)")
    assert_test(len(missing_decoding) == 0, f"100% of <img> tags have decoding='async' (found {len(missing_decoding)} missing)")
    assert_test(len(missing_loading) == 0, f"100% of <img> tags have loading='lazy' or 'eager' (found {len(missing_loading)} missing)")
    assert_test(len(sync_scripts) == 0, f"Zero render-blocking sync scripts (found {len(sync_scripts)} un-deferred scripts)")

    # 3. Critical CSS & Deferred Stylesheet Delivery
    print("\n--- [3. Critical CSS Inlining & Non-blocking Stylesheet Loading] ---")
    with open(os.path.join(ROOT_DIR, 'index.html'), 'r', encoding='utf-8') as f:
        index_content = f.read()

    assert_test('<style id="critical-css">' in index_content, "index.html has inlined critical CSS block")
    assert_test('rel="preload" href="css/main.css' in index_content or 'rel="preload" as="style" href="css/main.css' in index_content or 'as="style"' in index_content, "index.html asynchronously preloads main.css")
    assert_test('<noscript><link rel="stylesheet" href="css/main.css' in index_content, "index.html provides noscript fallback for main.css")
    assert_test('rel="preload" href="css/additions.css' in index_content or 'as="style"' in index_content, "index.html asynchronously preloads additions.css")

    # 4. Google Fonts Preconnect & Display Swap
    print("\n--- [4. Google Fonts Preconnect & font-display: swap] ---")
    missing_preconnect = []
    missing_swap = []
    for fpath in html_files:
        rel = os.path.relpath(fpath, ROOT_DIR).replace('\\', '/')
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')

        has_gfonts = any('fonts.googleapis.com' in (l.get('href') or '') for l in soup.find_all('link'))
        if has_gfonts:
            preconns = [l.get('href') for l in soup.find_all('link', rel=lambda r: r and 'preconnect' in r)]
            if not any('fonts.gstatic.com' in (h or '') for h in preconns):
                missing_preconnect.append(rel)
            for l in soup.find_all('link', rel=lambda r: r and 'stylesheet' in r):
                href = l.get('href') or ''
                if 'fonts.googleapis.com' in href and 'display=swap' not in href:
                    missing_swap.append(rel)

    assert_test(len(missing_preconnect) == 0, f"All Google Font pages preconnect to fonts.gstatic.com (missing: {len(missing_preconnect)})")
    assert_test(len(missing_swap) == 0, f"All Google Font requests specify display=swap (missing: {len(missing_swap)})")

    # 5. Responsive srcset on Multilingual Articles
    print("\n--- [5. Responsive srcset on Multilingual Technical Guides] ---")
    multilingual_articles = [
        "article/si-web-design-sri-lanka-2026.html",
        "article/si-payhere-online-payment-gateway-guide.html",
        "article/si-pagespeed-optimization-mobile-sri-lanka.html",
        "article/si-ai-tools-web-development-efficiency.html",
        "article/si-lk-domain-registration-guide.html",
        "article/ta-web-design-sri-lanka-guide.html",
        "article/ta-payhere-online-payment-guide.html"
    ]
    for rel_art in multilingual_articles:
        art_path = os.path.join(ROOT_DIR, rel_art)
        with open(art_path, 'r', encoding='utf-8') as f:
            art_text = f.read()
        has_srcset = 'srcset=' in art_text and '-480w.webp' in art_text and '-800w.webp' in art_text
        has_priority = 'fetchpriority="high"' in art_text
        assert_test(has_srcset, f"{rel_art} hero image contains responsive srcset (480w, 800w, 1024w)")
        assert_test(has_priority, f"{rel_art} hero image contains fetchpriority='high' for instant LCP")

    # 6. Components and Dynamic JavaScript Renders
    print("\n--- [6. Components & Dynamic JavaScript Renders] ---")
    with open(os.path.join(ROOT_DIR, 'js', 'components.js'), 'r', encoding='utf-8') as f:
        comp_text = f.read()
    assert_test('logo-100w.webp' in comp_text, "components.js renders WebP logo in header and footer")
    assert_test('srcset="' in comp_text, "components.js provides responsive srcset for logos")

    with open(os.path.join(ROOT_DIR, 'js', 'main.js'), 'r', encoding='utf-8') as f:
        main_text = f.read()
    assert_test('width="800" height="500"' in main_text, "main.js project mockups have explicit width and height")
    assert_test('width="400" height="200"' in main_text, "main.js blog cards have explicit width and height")
    assert_test('width="1024" height="512"' in main_text, "main.js native reader has explicit width and height")

    # Summary
    total_tests = passed_tests + failed_tests
    print("\n==========================================================")
    pct = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
    print(f"PHASE 4 RESULTS: {passed_tests}/{total_tests} tests passed ({pct:.1f}%)")
    print("==========================================================")

    if failed_tests > 0:
        sys.exit(1)

if __name__ == '__main__':
    run_performance_verification()
