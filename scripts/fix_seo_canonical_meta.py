"""
scripts/fix_seo_canonical_meta.py
Injects missing canonical URLs and meta descriptions across all public pages.
"""

import os
import re

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

PAGES_CONFIG = {
    '404.html': {
        'canonical': 'https://infiniteweb.dev/404.html',
        'desc': 'Page not found - Infinite Creative Web Design Sri Lanka. Explore our web design services, packages, and live projects.'
    },
    'cookie-policy.html': {
        'canonical': 'https://infiniteweb.dev/cookie-policy.html',
        'desc': 'Cookie Policy for Infinite Creative Web Design Sri Lanka. Learn about our essential cookies, analytics preferences, and privacy controls.'
    },
    'privacy.html': {
        'canonical': 'https://infiniteweb.dev/privacy.html',
        'desc': 'Privacy Policy of Infinite Creative Web Design Sri Lanka. Committed to transparency, data protection under Sri Lanka PDPA No. 9 of 2022, and GDPR.'
    },
    'privacy/index.html': {
        'canonical': 'https://infiniteweb.dev/privacy/',
        'desc': 'Privacy Policy of Infinite Creative Web Design Sri Lanka. Committed to transparency, data protection under Sri Lanka PDPA No. 9 of 2022, and GDPR.'
    },
    'sitemap.html': {
        'canonical': 'https://infiniteweb.dev/sitemap.html',
        'desc': 'HTML Sitemap for Infinite Creative Web Design. Browse all pages, services, pricing packages, blogs, tutorials, and legal policies.'
    },
    'services.html': {
        'canonical': 'https://infiniteweb.dev/services.html',
        'desc': None # keep existing
    },
    'services/index.html': {
        'canonical': 'https://infiniteweb.dev/services/',
        'desc': None # keep existing
    },
    'service-details.html': {
        'canonical': 'https://infiniteweb.dev/service-details.html',
        'desc': 'Detailed specifications for Infinite Creative Web Design services: custom business websites, fast cloud hosting, e-commerce, and admin management panels.'
    },
    'service-details/index.html': {
        'canonical': 'https://infiniteweb.dev/service-details/',
        'desc': 'Detailed specifications for Infinite Creative Web Design services: custom business websites, fast cloud hosting, e-commerce, and admin management panels.'
    },
    'tutorials.html': {
        'canonical': 'https://infiniteweb.dev/tutorials.html',
        'desc': 'Master modern web development, HTML5, CSS3, JavaScript, and cloud deployment with Infinite Developer Academy tutorials.'
    },
    'tutorials/index.html': {
        'canonical': 'https://infiniteweb.dev/tutorials/',
        'desc': 'Master modern web development, HTML5, CSS3, JavaScript, and cloud deployment with Infinite Developer Academy tutorials.'
    },
    'course-viewer.html': {
        'canonical': 'https://infiniteweb.dev/course-viewer.html',
        'desc': 'Interactive full-stack web development course and hands-on coding curriculum by Infinite Creative Web Design Academy Sri Lanka.'
    },
    'course/index.html': {
        'canonical': 'https://infiniteweb.dev/course/',
        'desc': 'Interactive full-stack web development course and hands-on coding curriculum by Infinite Creative Web Design Academy Sri Lanka.'
    }
}

def fix_page(rel_path, config):
    full_path = os.path.join(ROOT_DIR, rel_path)
    if not os.path.isfile(full_path):
        print(f"File not found: {full_path}")
        return False

    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # Check canonical
    if config.get('canonical'):
        if not re.search(r'<link[^>]*rel=[\'"]canonical[\'"]', content, re.IGNORECASE):
            canonical_tag = f'  <link rel="canonical" href="{config["canonical"]}">'
            if '</head>' in content:
                content = content.replace('</head>', f'{canonical_tag}\n</head>')
                modified = True
                print(f"  Added canonical to {rel_path}: {config['canonical']}")

    # Check description
    if config.get('desc'):
        if not re.search(r'<meta[^>]*name=[\'"]description[\'"][^>]*content=', content, re.IGNORECASE):
            desc_tag = f'  <meta name="description" content="{config["desc"]}">'
            if '<title>' in content:
                content = re.sub(r'(<title>.*?</title>)', r'\1\n' + desc_tag, content, count=1, flags=re.IGNORECASE)
                modified = True
                print(f"  Added meta description to {rel_path}")
            elif '</head>' in content:
                content = content.replace('</head>', f'{desc_tag}\n</head>')
                modified = True
                print(f"  Added meta description to {rel_path}")

    if modified:
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
    return modified

def main():
    print("Fixing missing canonical URLs and meta descriptions...\n")
    fixed = 0
    for rel_path, cfg in PAGES_CONFIG.items():
        if fix_page(rel_path, cfg):
            fixed += 1
    print(f"\nCompleted. Updated {fixed} files.")

if __name__ == '__main__':
    main()
