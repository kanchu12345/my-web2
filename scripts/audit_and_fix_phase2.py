"""
scripts/audit_and_fix_phase2.py
Comprehensive Phase 2 Auditor & Automator for Infinite Creative Web Design (infiniteweb.dev)
Audits & fixes:
1. Universal inclusion of js/components.js with correct relative prefix (./ vs ../)
2. Exactly ONE <h1> per page for strict semantic SEO
3. Descriptive alt text for all <img> tags (no missing or empty alts)
4. Removal of any lingering unconditional GA4 scripts
"""

import os
import re

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

EXCLUDE_DIRS = {
    'admin', 'backups', 'infinite-laravel', 'infinite-next',
    'node_modules', '.git', '.system_generated', 'tests', '__pycache__'
}

def get_public_html_files():
    html_files = []
    for root, dirs, files in os.walk(ROOT_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in files:
            if f.endswith('.html') and not f.startswith('google'):
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, ROOT_DIR).replace('\\', '/')
                html_files.append((full_path, rel_path))
    return sorted(html_files, key=lambda x: x[1])

def audit_and_fix_file(full_path, rel_path):
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False
    notes = []

    # 1. Determine prefix based on directory depth
    depth = rel_path.count('/')
    prefix = '../' if depth > 0 else './'
    script_rel_src = '../js/components.js' if depth > 0 else 'js/components.js'

    # 2. Check components.js inclusion & path
    comp_regex = r'<script[^>]*src=[\'"]([^\'"]*components\.js)[\'"][^>]*>\s*</script>'
    comp_match = re.search(comp_regex, content, re.IGNORECASE)

    if not comp_match:
        # Inject components.js before </body>
        script_tag = f'  <script src="{script_rel_src}" defer></script>\n'
        if '</body>' in content:
            content = content.replace('</body>', f'{script_tag}</body>')
            modified = True
            notes.append(f'Injected <script src="{script_rel_src}">')
        else:
            content += f'\n{script_tag}'
            modified = True
            notes.append(f'Appended <script src="{script_rel_src}">')
    else:
        existing_src = comp_match.group(1)
        expected_src = script_rel_src
        if existing_src != expected_src:
            new_tag = f'<script src="{expected_src}" defer></script>'
            content = content[:comp_match.start()] + new_tag + content[comp_match.end():]
            modified = True
            notes.append(f'Fixed script src from {existing_src} to {expected_src}')

    # 3. Check for lingering unconditional GA4 scripts
    ga4_block = re.search(r'<!-- Google Analytics.*?googletagmanager\.com/gtag/js\?id=G-.*?gtag\(\'config\', \'G-.*?\);?\s*</script>', content, re.DOTALL | re.IGNORECASE)
    if ga4_block:
        replacement = '<!-- Google Analytics (GA4) dynamically loaded via js/components.js upon user cookie consent -->'
        content = content[:ga4_block.start()] + replacement + content[ga4_block.end():]
        modified = True
        notes.append('Removed unconditional GA4 tag (gated via components.js)')

    # 4. Audit H1 tags
    h1_matches = list(re.finditer(r'<h1([^>]*)>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL))
    h1_count = len(h1_matches)

    if h1_count == 0:
        notes.append('WARNING: 0 <h1> tags found')
    elif h1_count > 1:
        # Keep the first H1, convert subsequent H1s to H2s
        notes.append(f'Multiple <h1> tags found ({h1_count}). Converting secondary <h1> to <h2>.')
        for match in reversed(h1_matches[1:]):
            orig_h1 = match.group(0)
            attrs = match.group(1)
            inner = match.group(2)
            new_h2 = f'<h2{attrs}>{inner}</h2>'
            content = content[:match.start()] + new_h2 + content[match.end():]
            modified = True

    # 5. Audit <img> tags for missing or empty alt text
    def fix_img_alt(match):
        nonlocal modified
        tag = match.group(0)
        # Check if alt is missing
        if not re.search(r'\balt\s*=', tag, re.IGNORECASE):
            src_match = re.search(r'src=[\'"]([^\'"]+)[\'"]', tag, re.IGNORECASE)
            src_name = src_match.group(1).split('/')[-1].split('.')[0].replace('-', ' ').replace('_', ' ').title() if src_match else 'Infinite Creative Web Design'
            alt_text = f'Infinite Creative Web Design - {src_name}'
            new_tag = tag[:-1] + f' alt="{alt_text}">'
            modified = True
            notes.append(f'Added missing alt="{alt_text}" to img {src_match.group(1) if src_match else ""}')
            return new_tag
        
        # Check if alt is empty
        empty_alt_match = re.search(r'alt=[\'"]\s*[\'"]', tag, re.IGNORECASE)
        if empty_alt_match:
            src_match = re.search(r'src=[\'"]([^\'"]+)[\'"]', tag, re.IGNORECASE)
            src_name = src_match.group(1).split('/')[-1].split('.')[0].replace('-', ' ').replace('_', ' ').title() if src_match else 'Visual Illustration'
            alt_text = f'Infinite Creative Web Design - {src_name}'
            new_tag = tag[:empty_alt_match.start()] + f'alt="{alt_text}"' + tag[empty_alt_match.end():]
            modified = True
            notes.append(f'Populated empty alt with "{alt_text}"')
            return new_tag

        return tag

    content = re.sub(r'<img\s+[^>]*>', fix_img_alt, content, flags=re.IGNORECASE)

    if modified:
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)

    return modified, notes, h1_count

def main():
    files = get_public_html_files()
    print(f'Starting Phase 2 Audit across {len(files)} public HTML files...\n')
    
    modified_count = 0
    pages_report = []

    for full_path, rel_path in files:
        mod, notes, h1_cnt = audit_and_fix_file(full_path, rel_path)
        if mod:
            modified_count += 1
        status = 'MODIFIED' if mod else 'VERIFIED'
        pages_report.append({
            'page': rel_path,
            'status': status,
            'h1_count': h1_cnt,
            'notes': notes
        })
        print(f'[{status}] {rel_path}')
        for note in notes:
            print(f'    - {note}')

    print(f'\nFinished Phase 2 Audit. Total files modified: {modified_count}/{len(files)}')

if __name__ == '__main__':
    main()
