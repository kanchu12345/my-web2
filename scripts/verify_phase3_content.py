"""
scripts/verify_phase3_content.py
Comprehensive Phase 3 Verification Test Suite for BestWeb.lk Rubric.

Tests:
1. Multilingual Articles UTF-8 & SEO integrity (7 articles in /article/)
2. data/blogs.json UTF-8 clean encoding & bilingual coverage (zero ????)
3. AI Pipeline default draft workflow & editorial disclaimers
4. Public website draft gating in js/main.js
5. Admin review UI & approve-and-publish workflow in admin/blogs.html
6. Interactive LKR/USD currency switcher integration across pages
7. Transparent Free Cloud Hosting policy wording across all pricing touchpoints
"""

import os
import sys
import re
import json

# Ensure console doesn't crash on Windows
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

def run_tests():
    passed = 0
    total = 0

    def assert_test(condition, test_name):
        nonlocal passed, total
        total += 1
        if condition:
            passed += 1
            print(f"  PASS: {test_name}")
        else:
            print(f"  FAIL: {test_name}")

    print("==========================================================")
    print("🧪 BESTWEB.LK PHASE 3 VERIFICATION TEST SUITE")
    print("==========================================================")

    # ─────────────────────────────────────────────────────────────
    # TEST GROUP 1: Multilingual Articles in /article/
    # ─────────────────────────────────────────────────────────────
    print("\n--- [1. Multilingual Articles Integrity in /article/] ---")
    article_files = [
        "si-web-design-sri-lanka-2026.html",
        "si-payhere-online-payment-gateway-guide.html",
        "si-pagespeed-optimization-mobile-sri-lanka.html",
        "si-ai-tools-web-development-efficiency.html",
        "si-lk-domain-registration-guide.html",
        "ta-web-design-sri-lanka-guide.html",
        "ta-payhere-online-payment-guide.html"
    ]

    for fname in article_files:
        fpath = os.path.join(ROOT_DIR, 'article', fname)
        exists = os.path.exists(fpath)
        assert_test(exists, f"Article {fname} exists on disk")
        if not exists:
            continue

        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check zero ???? corruption
        has_corrupt = '????' in content
        assert_test(not has_corrupt, f"Article {fname} has zero '????' corruption")

        # Check contains native Sinhala or Tamil unicode
        if fname.startswith('si-'):
            has_unicode = bool(re.search(r'[\u0D80-\u0DFF]', content))
            assert_test(has_unicode, f"Article {fname} contains authentic Sinhala Unicode")
        else:
            has_unicode = bool(re.search(r'[\u0B80-\u0BFF]', content))
            assert_test(has_unicode, f"Article {fname} contains authentic Tamil Unicode")

        # Check single <h1>
        h1_count = len(re.findall(r'<h1[\s>]', content, re.IGNORECASE))
        assert_test(h1_count == 1, f"Article {fname} has exactly one <h1> tag (found {h1_count})")

        # Check image alt attributes
        img_tags = re.findall(r'<img[^>]*>', content, re.IGNORECASE)
        imgs_valid = all('alt=' in tag and not re.search(r'alt=["\']\s*["\']', tag) for tag in img_tags)
        assert_test(imgs_valid, f"Article {fname} has non-empty descriptive alt on all {len(img_tags)} <img> tags")

        # Check human review badge
        has_review = 'Human Reviewed' in content or 'සංස්කාරක තාක්ෂණික සමාලෝචනය' in content or 'தொழில்நுட்ப மதிப்பாய்வு' in content
        assert_test(has_review, f"Article {fname} contains Human Editorial Review badge")

        # Check components.js inclusion
        has_components = 'components.js' in content
        assert_test(has_components, f"Article {fname} includes components.js")

    # ─────────────────────────────────────────────────────────────
    # TEST GROUP 2: data/blogs.json UTF-8 Clean Encoding
    # ─────────────────────────────────────────────────────────────
    print("\n--- [2. data/blogs.json Data Sanitization & Bilingual Coverage] ---")
    blogs_path = os.path.join(ROOT_DIR, 'data', 'blogs.json')
    assert_test(os.path.exists(blogs_path), "data/blogs.json exists")

    with open(blogs_path, 'r', encoding='utf-8') as f:
        blogs_data = json.load(f)

    articles = blogs_data.get('articles', [])
    assert_test(len(articles) >= 30, f"data/blogs.json contains rich article library ({len(articles)} articles)")

    corrupt_blogs = [a['id'] for a in articles if '????' in a.get('title', '') or '????' in a.get('description', '')]
    assert_test(len(corrupt_blogs) == 0, f"Zero '????' corrupted entries in blogs.json (found {len(corrupt_blogs)})")

    sinhala_articles = [a for a in articles if a.get('lang') == 'si' or re.search(r'[\u0D80-\u0DFF]', a.get('title', ''))]
    tamil_articles = [a for a in articles if a.get('lang') == 'ta' or re.search(r'[\u0B80-\u0BFF]', a.get('title', ''))]
    assert_test(len(sinhala_articles) >= 5, f"Contains >= 5 verified Sinhala blog entries (found {len(sinhala_articles)})")
    assert_test(len(tamil_articles) >= 2, f"Contains >= 2 verified Tamil blog entries (found {len(tamil_articles)})")

    # ─────────────────────────────────────────────────────────────
    # TEST GROUP 3: AI Pipeline Draft Workflow & Metadata
    # ─────────────────────────────────────────────────────────────
    print("\n--- [3. AI Pipeline Draft Workflow & Disclaimers] ---")
    pipeline_path = os.path.join(ROOT_DIR, 'scripts', 'ai_content_pipeline.py')
    assert_test(os.path.exists(pipeline_path), "scripts/ai_content_pipeline.py exists")

    with open(pipeline_path, 'r', encoding='utf-8') as f:
        pipeline_code = f.read()

    assert_test("default='draft'" in pipeline_code, "AI pipeline CLI argument --status defaults to 'draft'")
    assert_test("status='draft'" in pipeline_code, "AI pipeline run_pipeline function defaults to status='draft'")
    assert_test("'ai_generated': True" in pipeline_code, "AI pipeline adds 'ai_generated: True' metadata")
    assert_test("'editorial_disclaimer'" in pipeline_code, "AI pipeline adds editorial disclaimer metadata")
    assert_test("'human_reviewed'" in pipeline_code, "AI pipeline adds 'human_reviewed' metadata tracking")

    # ─────────────────────────────────────────────────────────────
    # TEST GROUP 4: Public Gating in js/main.js
    # ─────────────────────────────────────────────────────────────
    print("\n--- [4. Public Gating of AI Drafts in js/main.js] ---")
    main_js_path = os.path.join(ROOT_DIR, 'js', 'main.js')
    with open(main_js_path, 'r', encoding='utf-8') as f:
        main_js = f.read()

    assert_test("status !== 'draft'" in main_js, "js/main.js getBlogsData strictly filters out status === 'draft'")

    # ─────────────────────────────────────────────────────────────
    # TEST GROUP 5: Admin Review UI in admin/blogs.html
    # ─────────────────────────────────────────────────────────────
    print("\n--- [5. Admin Review UI in admin/blogs.html] ---")
    admin_blogs_path = os.path.join(ROOT_DIR, 'admin', 'blogs.html')
    with open(admin_blogs_path, 'r', encoding='utf-8') as f:
        admin_blogs = f.read()

    assert_test("DRAFT — REVIEW REQUIRED" in admin_blogs, "admin/blogs.html renders 'DRAFT — REVIEW REQUIRED' badge")
    assert_test("btn-approve" in admin_blogs and "approveBlog" in admin_blogs, "admin/blogs.html has 'Approve & Publish' button and approval handler")
    assert_test("pStatus" in admin_blogs, "admin/blogs.html form contains publication status dropdown (pStatus)")
    assert_test("logContentChange('publish'" in admin_blogs, "admin/blogs.html logs draft approval events to audit_logs")

    # ─────────────────────────────────────────────────────────────
    # TEST GROUP 6: Interactive LKR / USD Currency Switcher
    # ─────────────────────────────────────────────────────────────
    print("\n--- [6. Interactive LKR / USD Currency Switcher] ---")
    assert_test("switchGlobalCurrency" in main_js, "js/main.js implements window.switchGlobalCurrency")
    assert_test("formatCurrency" in main_js, "js/main.js implements window.formatCurrency")
    assert_test("USD_EXCHANGE_RATE = 300" in main_js, "js/main.js uses realistic 300 LKR = 1 USD conversion rate")

    index_path = os.path.join(ROOT_DIR, 'index.html')
    packages_path = os.path.join(ROOT_DIR, 'packages.html')
    packages_sub_path = os.path.join(ROOT_DIR, 'packages', 'index.html')

    with open(index_path, 'r', encoding='utf-8') as f:
        index_html = f.read()
    with open(packages_path, 'r', encoding='utf-8') as f:
        packages_html = f.read()
    with open(packages_sub_path, 'r', encoding='utf-8') as f:
        packages_sub_html = f.read()

    assert_test("currency-switch-btn" in index_html, "index.html includes currency switcher toggle buttons")
    assert_test("data-lkr-price=" in index_html, "index.html pricing cards contain data-lkr-price attributes")
    assert_test("currency-switch-btn" in packages_html, "packages.html includes currency switcher toggle buttons")
    assert_test("currency-switch-btn" in packages_sub_html, "packages/index.html includes currency switcher toggle buttons")

    # ─────────────────────────────────────────────────────────────
    # TEST GROUP 7: Transparent Cloud Hosting Policy Wording
    # ─────────────────────────────────────────────────────────────
    print("\n--- [7. Transparent 'Free Cloud Hosting' Clarification Wording] ---")
    policy_str = "Free high-speed cloud edge hosting on GitHub Pages & Cloudflare with SSL for Starter & Standard tiers. Zero monthly server maintenance fees."

    services_path = os.path.join(ROOT_DIR, 'services.html')
    services_sub_path = os.path.join(ROOT_DIR, 'services', 'index.html')

    with open(services_path, 'r', encoding='utf-8') as f:
        services_html = f.read()
    with open(services_sub_path, 'r', encoding='utf-8') as f:
        services_sub_html = f.read()

    assert_test(policy_str in index_html, "index.html contains exact clarified hosting policy wording")
    assert_test(policy_str in packages_html, "packages.html contains exact clarified hosting policy wording")
    assert_test(policy_str in packages_sub_html, "packages/index.html contains exact clarified hosting policy wording")
    assert_test(policy_str in services_html, "services.html contains exact clarified hosting policy wording")
    assert_test(policy_str in services_sub_html, "services/index.html contains exact clarified hosting policy wording")
    assert_test(policy_str in main_js, "js/main.js dynamic calculator contains exact clarified hosting policy wording")

    print("\n==========================================================")
    print(f"RESULTS: {passed}/{total} tests passed ({passed/total*100:.1f}%)")
    print("==========================================================")
    return passed == total

if __name__ == '__main__':
    all_passed = run_tests()
    sys.exit(0 if all_passed else 1)
