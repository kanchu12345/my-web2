import os
import glob
import re

WORKSPACE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html_files = [p for p in glob.glob(os.path.join(WORKSPACE, '**', '*.html'), recursive=True) 
              if not any(ex in p for ex in ['backups', 'infinite-', 'node_modules', '.git']) and not 'google' in p]

broken_map = {}

for hf in html_files:
    dir_path = os.path.dirname(hf)
    rel_page = os.path.relpath(hf, WORKSPACE)
    with open(hf, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    for line_idx, line in enumerate(lines):
        hrefs = re.findall(r'<a\s+[^>]*href=["\'](.*?)["\']', line, re.IGNORECASE)
        for hr in hrefs:
            hr = hr.strip()
            if not hr or hr.startswith('#') or hr.startswith('mailto:') or hr.startswith('tel:') or hr.startswith('javascript:'):
                continue
            if hr.startswith('http://') or hr.startswith('https://'):
                continue
            target = hr.split('#')[0].split('?')[0]
            if not target:
                continue
            if target.startswith('/'):
                resolved = os.path.normpath(os.path.join(WORKSPACE, target.lstrip('/\\')))
            else:
                resolved = os.path.normpath(os.path.join(dir_path, target))
            
            exists = (
                os.path.exists(resolved) or
                os.path.exists(resolved + '.html') or
                os.path.exists(os.path.join(resolved, 'index.html'))
            )
            if not exists:
                broken_map.setdefault(rel_page, []).append((line_idx + 1, hr, resolved))

for page, b_list in sorted(broken_map.items()):
    print(f"\n{page}: ({len(b_list)} broken links)")
    for lno, hr, res in b_list:
        print(f"   Line {lno}: href='{hr}' -> {res}")
