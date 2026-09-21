"""
scripts/verify_phase2_completeness.py
Comprehensive Phase 2 Verification Test Suite
"""

import os
import re
import sys

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

EXCLUDE_DIRS = {
    'admin', 'backups', 'infinite-laravel', 'infinite-next',
    'node_modules', '.git', '.system_generated', 'tests', '__pycache__'
}

def get_public_pages():
    pages = []
    for root, dirs, files in os.walk(ROOT_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in files:
            if f.endswith('.html') and not f.startswith('google'):
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, ROOT_DIR).replace('\\', '/')
                pages.append((full_path, rel_path))
    return sorted(pages, key=lambda x: x[1])

def run_tests():
    pages = get_public_pages()
    print(f"=== Running Phase 2 Verification Suite Across {len(pages)} Public Pages ===\n")
    
    total_checks = 0
    passed_checks = 0
    failures = []

    for full_path, rel_path in pages:
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()

        is_sub = '/' in rel_path
        expected_script = '../js/components.js' if is_sub else 'js/components.js'

        # 1. Check title
        total_checks += 1
        if re.search(r'<title>[^<]+</title>', content, re.IGNORECASE):
            passed_checks += 1
        else:
            failures.append(f"{rel_path}: Missing or empty <title>")

        # 2. Check meta description
        total_checks += 1
        if re.search(r'<meta[^>]*name=[\'"]description[\'"][^>]*content=[\'"][^\'"]+[\'"]', content, re.IGNORECASE):
            passed_checks += 1
        else:
            failures.append(f"{rel_path}: Missing or empty meta description")

        # 3. Check components.js with correct prefix
        total_checks += 1
        if f'src="{expected_script}"' in content:
            passed_checks += 1
        else:
            failures.append(f"{rel_path}: Expected components script '{expected_script}' not found")

        # 4. Check exactly one <h1>
        total_checks += 1
        h1s = re.findall(r'<h1[^>]*>.*?</h1>', content, re.IGNORECASE | re.DOTALL)
        if len(h1s) == 1:
            passed_checks += 1
        else:
            failures.append(f"{rel_path}: Found {len(h1s)} <h1> tags (expected strictly 1)")

        # 5. Check all <img> tags have alt
        imgs = re.findall(r'<img\s+[^>]*>', content, re.IGNORECASE)
        img_missing_alt = [img for img in imgs if not re.search(r'\balt=[\'"][^\'"]+[\'"]', img, re.IGNORECASE)]
        total_checks += 1
        if len(img_missing_alt) == 0:
            passed_checks += 1
        else:
            failures.append(f"{rel_path}: {len(img_missing_alt)} <img> tags missing descriptive alt attribute")

        # 6. Check canonical link tag
        total_checks += 1
        if re.search(r'<link[^>]*rel=[\'"]canonical[\'"]', content, re.IGNORECASE):
            passed_checks += 1
        else:
            failures.append(f"{rel_path}: Missing canonical link tag")

    # 7. Check components.js itself
    components_path = os.path.join(ROOT_DIR, 'js', 'components.js')
    with open(components_path, 'r', encoding='utf-8') as f:
        comp_js = f.read()

    total_checks += 1
    if 'Tangalle' in comp_js and 'Southern Province' in comp_js and 'Sri Lanka' in comp_js:
        passed_checks += 1
    else:
        failures.append("js/components.js: Missing canonical address")

    total_checks += 1
    if '+94 78 971 4912' in comp_js:
        passed_checks += 1
    else:
        failures.append("js/components.js: Missing canonical phone number")

    total_checks += 1
    if 'infinitedesign768@gmail.com' in comp_js:
        passed_checks += 1
    else:
        failures.append("js/components.js: Missing canonical email")

    total_checks += 1
    if 'infinite_cookie_consent' in comp_js and 'resetCookieConsent' in comp_js:
        passed_checks += 1
    else:
        failures.append("js/components.js: Missing cookie consent banner logic")

    total_checks += 1
    if 'website_url_hp' in comp_js:
        passed_checks += 1
    else:
        failures.append("js/components.js: Missing honeypot spam protection")

    # 8. Check privacy.html, cookie-policy.html, sitemap.html, 404.html exist
    for required_file in ['privacy.html', 'cookie-policy.html', 'sitemap.html', '404.html']:
        total_checks += 1
        if os.path.isfile(os.path.join(ROOT_DIR, required_file)):
            passed_checks += 1
        else:
            failures.append(f"Missing required technical page: {required_file}")

    print(f"Results: {passed_checks}/{total_checks} checks passed.")
    if failures:
        print("\nFailures encountered:")
        for fail in failures:
            print(f"  [FAIL] {fail}")
        return False
    else:
        print("\n[SUCCESS] ALL PHASE 2 VERIFICATION CHECKS PASSED PERFECTLY (100%)!")
        return True

if __name__ == '__main__':
    success = run_tests()
    sys.exit(0 if success else 1)
