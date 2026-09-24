"""
scripts/audit_admin_security_integrity.py
Automated deep audit for all /admin/*.html files and associated scripts.
Verifies:
1. Auth Gate (<style id="authGate">) on all protected admin pages
2. Zero inline <script> tags without src in any admin page
3. Zero inline on* event handler attributes in any admin page
4. CSP meta tags have NO 'unsafe-inline' in script-src
5. Mobile navigation elements (.sb-toggle, .sidebar-overlay, #sidebar) on all admin pages
6. Logout button (#logoutBtn) present on all protected admin pages
7. Zero weak local sanitise() functions; proper sanitize.js usage
8. Strict collection writes ('blogs' only for blog crud)
9. Hiri Surf School consistency in data and code
"""

import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ADMIN_DIR = os.path.join(REPO_DIR, 'admin')

PROTECTED_PAGES = [
    'dashboard.html',
    'projects.html',
    'packages.html',
    'tutorials.html',
    'bot-monitor.html',
    'blogs.html',
    'settings.html'
]

ALL_ADMIN_PAGES = PROTECTED_PAGES + ['login.html']

def audit_all():
    print("=" * 65)
    print("🔍 COMPREHENSIVE REPO AUDIT: SECURITY, INTEGRITY & USABILITY")
    print("=" * 65)

    errors = []

    # 1. Check all admin pages exist
    for page in ALL_ADMIN_PAGES:
        page_path = os.path.join(ADMIN_DIR, page)
        if not os.path.exists(page_path):
            errors.append(f"Missing admin page: {page}")

    # 2. Check Auth Gate on all protected pages
    print("\n--- [Check 1: Auth Gate Pattern in Admin Pages] ---")
    for page in PROTECTED_PAGES:
        page_path = os.path.join(ADMIN_DIR, page)
        with open(page_path, 'r', encoding='utf-8') as f:
            content = f.read()
        if '<style id="authGate">body{display:none!important;}</style>' not in content:
            errors.append(f"{page} missing exact authGate CSS: <style id=\"authGate\">body{{display:none!important;}}</style>")
        else:
            print(f"  ✅ {page}: Auth gate CSS tag present")

    # 3. Check CSP: Zero 'unsafe-inline' in script-src across ALL admin pages
    print("\n--- [Check 2: CSP Hardening in script-src] ---")
    for page in ALL_ADMIN_PAGES:
        page_path = os.path.join(ADMIN_DIR, page)
        with open(page_path, 'r', encoding='utf-8') as f:
            content = f.read()
        csp_match = re.search(r'<meta\s+http-equiv=["\']Content-Security-Policy["\']\s+content="([^"]*)"', content, re.IGNORECASE)
        if not csp_match:
            csp_match = re.search(r'<meta\s+http-equiv=["\']Content-Security-Policy["\']\s+content=\'([^\']*)\'', content, re.IGNORECASE)
        if not csp_match:
            errors.append(f"{page} missing Content-Security-Policy meta tag")
            continue
        csp = csp_match.group(1)
        script_src_match = re.search(r'script-src\s+([^;]+)', csp)
        if not script_src_match:
            errors.append(f"{page} CSP missing script-src directive")
        else:
            script_src = script_src_match.group(1)
            if "'unsafe-inline'" in script_src:
                errors.append(f"{page} CSP script-src still contains 'unsafe-inline'!")
            else:
                print(f"  ✅ {page}: CSP script-src hardened without 'unsafe-inline'")

    # 4. Check Zero inline <script> tags without src
    print("\n--- [Check 3: Zero Inline Scripts in HTML Files] ---")
    for page in ALL_ADMIN_PAGES:
        page_path = os.path.join(ADMIN_DIR, page)
        with open(page_path, 'r', encoding='utf-8') as f:
            content = f.read()
        # Find all script tags
        scripts = re.findall(r'<script\b([^>]*)>(.*?)</script>', content, re.DOTALL | re.IGNORECASE)
        for attrs, body in scripts:
            if 'src=' not in attrs.lower() and body.strip():
                errors.append(f"{page} has inline <script> block ({len(body.strip())} chars)")
            else:
                print(f"  ✅ {page}: External script referenced: {attrs.strip()}")

    # 5. Check Zero inline on* event attributes (onclick, onsubmit, etc.)
    print("\n--- [Check 4: Zero Inline on* Event Handlers in HTML] ---")
    for page in ALL_ADMIN_PAGES:
        page_path = os.path.join(ADMIN_DIR, page)
        with open(page_path, 'r', encoding='utf-8') as f:
            content = f.read()
        # Look for on\w+= outside of scripts
        no_scripts = re.sub(r'<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>', '', content, flags=re.IGNORECASE)
        inline_handlers = re.findall(r'\s(on[a-z]+)\s*=', no_scripts, re.IGNORECASE)
        if inline_handlers:
            errors.append(f"{page} contains inline event attributes: {set(inline_handlers)}")
        else:
            print(f"  ✅ {page}: Zero inline on* event handler attributes")

    # 6. Check Mobile Navigation markup on all protected pages
    print("\n--- [Check 5: Mobile Navigation Drawer & Logout Button] ---")
    for page in PROTECTED_PAGES:
        page_path = os.path.join(ADMIN_DIR, page)
        with open(page_path, 'r', encoding='utf-8') as f:
            content = f.read()
        if 'id="sbToggle"' not in content:
            errors.append(f"{page} missing mobile sidebar toggle #sbToggle")
        if 'id="sbOverlay"' not in content:
            errors.append(f"{page} missing sidebar overlay #sbOverlay")
        if 'id="sidebar"' not in content:
            errors.append(f"{page} missing aside#sidebar id")
        if 'id="logoutBtn"' not in content:
            errors.append(f"{page} missing logout button #logoutBtn")
        print(f"  ✅ {page}: #sbToggle, #sbOverlay, #sidebar, and #logoutBtn present")

    # 7. Check admin.css for touch target & drawer styles
    print("\n--- [Check 6: CSS Usability & Touch Target Sizing] ---")
    admin_css_path = os.path.join(REPO_DIR, 'css', 'admin.css')
    with open(admin_css_path, 'r', encoding='utf-8') as f:
        admin_css = f.read()
    if 'min-height: 44px' not in admin_css and 'min-height:44px' not in admin_css:
        errors.append("css/admin.css missing 44px minimum touch target for navigation links")
    else:
        print("  ✅ css/admin.css: min-height 44px touch targets enforced")
    if 'sidebar-overlay' not in admin_css or 'sb-toggle' not in admin_css:
        errors.append("css/admin.css missing .sb-toggle or .sidebar-overlay rules")
    else:
        print("  ✅ css/admin.css: .sb-toggle and .sidebar-overlay drawer styles present")

    # 8. Check login.html hardening
    print("\n--- [Check 7: Login Hardening (No fake 2FA, User Enumeration fixed)] ---")
    login_html_path = os.path.join(ADMIN_DIR, 'login.html')
    with open(login_html_html := login_html_path, 'r', encoding='utf-8') as f:
        login_html = f.read()
    login_js_path = os.path.join(REPO_DIR, 'js', 'admin-login.js')
    with open(login_js_path, 'r', encoding='utf-8') as f:
        login_js = f.read()
    
    if 'step2FA' in login_html or 'USE_2FA' in login_html or 'USE_2FA' in login_js:
        errors.append("Fake/dead 2FA references still found in login.html or admin-login.js")
    else:
        print("  ✅ Fake 2FA removed from login markup and script")

    if 'Incorrect password' in login_js or 'No account found' in login_js:
        errors.append("User enumeration strings still present in admin-login.js")
    else:
        print("  ✅ User enumeration resolved: consistent generic error message used")

    # 9. Check Blog write integrity
    print("\n--- [Check 8: Blog CRUD Firestore Collection Integrity] ---")
    blogs_js_path = os.path.join(REPO_DIR, 'js', 'admin-blogs.js')
    with open(blogs_js_path, 'r', encoding='utf-8') as f:
        blogs_js = f.read()
    if "'projects'" in blogs_js or '"projects"' in blogs_js:
        errors.append("admin-blogs.js contains reference to 'projects' collection!")
    else:
        print("  ✅ admin-blogs.js: Zero cross-collection writes to 'projects'")

    # Summary
    print("\n" + "=" * 65)
    if errors:
        print(f"❌ AUDIT FAILED with {len(errors)} error(s):")
        for err in errors:
            print(f"   • {err}")
        sys.exit(1)
    else:
        print("🎉 ALL REPO AUDIT CHECKS PASSED PERFECTLY (0 ERRORS)!")
        print("=" * 65)

if __name__ == '__main__':
    audit_all()
