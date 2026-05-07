#!/usr/bin/env python3
"""
Infinite Design — AI Blog Agent
================================
Fetches articles from famous tech sources, validates them,
strips external links, and saves clean data to data/blogs.json.

Sources:
  - Dev.to API         (webdev, programming, ict)
  - Hacker News API    (top stories)
  - TechCrunch RSS     (tech news)

Quality Checks:
  - Must be published within the last 30 days
  - Must have a minimum description length
  - No duplicate titles
  - Must be relevant to tech / web dev / coding / ICT
"""

import requests
import json
import os
import re
import feedparser
from datetime import datetime, timezone, timedelta
from bs4 import BeautifulSoup

# ── Config ────────────────────────────────────────────────────────────────────
OUTPUT_FILE   = os.path.join(os.path.dirname(__file__), '../../data/blogs.json')
MAX_AGE_DAYS  = 30
MAX_ARTICLES  = 30       # Maximum articles to store in blogs.json
MIN_DESC_LEN  = 60       # Minimum characters for a valid description
FALLBACK_IMG  = "images/blog_1.png"

RELEVANT_TAGS = {
    'webdev', 'javascript', 'programming', 'typescript', 'python',
    'react', 'vue', 'nextjs', 'css', 'html', 'technology', 'ict',
    'coding', 'software', 'ai', 'machinelearning', 'cloud', 'devops',
    'laravel', 'php', 'node', 'backend', 'frontend', 'fullstack',
    'web', 'security', 'database', 'api', 'mobile', 'startup'
}

# ── Helpers ───────────────────────────────────────────────────────────────────
def is_within_30_days(date_str):
    """Return True if the date_str is within MAX_AGE_DAYS."""
    try:
        # Try ISO format first
        dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
    except Exception:
        try:
            import email.utils
            dt = datetime(*email.utils.parsedate(date_str)[:6], tzinfo=timezone.utc)
        except Exception:
            return False
    now = datetime.now(timezone.utc)
    return (now - dt).days <= MAX_AGE_DAYS

def format_date(date_str):
    """Return a pretty date string like 'May 6, 2026'."""
    try:
        dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        return dt.strftime('%b %-d, %Y')
    except Exception:
        try:
            import email.utils
            dt = datetime(*email.utils.parsedate(date_str)[:6])
            return dt.strftime('%b %-d, %Y')
        except Exception:
            return 'Recent'

def strip_external_links(html_content):
    """
    Remove all <a href="..."> tags pointing to external domains.
    Keep the link text but remove the hyperlink.
    Also removes external images (keeps relative ones).
    """
    if not html_content:
        return ""
    try:
        soup = BeautifulSoup(html_content, 'lxml')

        # Strip external anchor tags (keep text)
        for a_tag in soup.find_all('a', href=True):
            href = a_tag.get('href', '')
            if href.startswith('http') or href.startswith('//'):
                # Replace with a span to keep the text
                span = soup.new_tag('span', style='color:#04AA6D; font-weight:600;')
                span.string = a_tag.get_text()
                a_tag.replace_with(span)

        # Remove external images (src starts with http)
        for img_tag in soup.find_all('img', src=True):
            src = img_tag.get('src', '')
            if src.startswith('http') or src.startswith('//'):
                img_tag.decompose()

        # Remove script and iframe tags for security
        for tag in soup.find_all(['script', 'iframe', 'embed', 'object']):
            tag.decompose()

        return str(soup.body or soup) if soup.body else str(soup)
    except Exception as e:
        print(f"  Warning: Could not strip links: {e}")
        # Fallback: regex-strip all href attributes
        cleaned = re.sub(r'href=["\']https?://[^"\']*["\']', 'href="#"', html_content)
        return cleaned

def is_relevant(tags_list):
    """Return True if the article has at least one relevant tech tag."""
    if not tags_list:
        return True  # Accept if no tags
    normalized = {t.lower().replace(' ', '') for t in tags_list}
    return bool(normalized & RELEVANT_TAGS)

def extract_image_from_entry(entry):
    """Attempt to extract an image URL from an RSS entry."""
    media_content = entry.get('media_content', [])
    for media in media_content:
        if media.get('medium') == 'image' or 'url' in media:
            return media.get('url')
            
    media_thumbnail = entry.get('media_thumbnail', [])
    if media_thumbnail:
        return media_thumbnail[0].get('url')
        
    enclosures = entry.get('enclosures', [])
    for enc in enclosures:
        if enc.get('type', '').startswith('image/'):
            return enc.get('href')
            
    html_content = ""
    content_list = entry.get('content', [])
    if content_list:
        html_content += content_list[0].get('value', '')
    html_content += entry.get('summary', '')
        
    if html_content:
        match = re.search(r'<img[^>]+src=["\'](https?://[^"\']+)["\']', html_content, re.IGNORECASE)
        if match:
            return match.group(1)
            
    return FALLBACK_IMG

# ── Source 1: Dev.to API ──────────────────────────────────────────────────────
def fetch_devto(tags=None, per_page=15):
    """Fetch articles from Dev.to public API."""
    articles = []
    if tags is None:
        tags = ['webdev', 'programming', 'javascript', 'ict']

    for tag in tags:
        try:
            url = f'https://dev.to/api/articles?tag={tag}&per_page={per_page}&top=1'
            resp = requests.get(url, timeout=10)
            resp.raise_for_status()
            data = resp.json()

            for item in data:
                if not is_within_30_days(item.get('published_at', '')):
                    continue
                desc = item.get('description', '').strip()
                if len(desc) < MIN_DESC_LEN:
                    continue

                tag_list = item.get('tag_list', [])
                if not is_relevant(tag_list):
                    continue

                # Fetch full article body
                body_html = ""
                try:
                    detail_resp = requests.get(f"https://dev.to/api/articles/{item['id']}", timeout=10)
                    if detail_resp.ok:
                        detail = detail_resp.json()
                        body_html = strip_external_links(detail.get('body_html', ''))
                except Exception:
                    pass

                articles.append({
                    'id': f"devto_{item['id']}",
                    'title': item.get('title', '').strip(),
                    'category': tag_list[0].capitalize() if tag_list else 'Technology',
                    'date': format_date(item.get('published_at', '')),
                    'description': desc,
                    'image': item.get('cover_image') or item.get('social_image') or FALLBACK_IMG,
                    'body_html': body_html,
                    'source': 'Dev.to',
                    'fetched_at': datetime.now(timezone.utc).isoformat()
                })
        except Exception as e:
            print(f"  Dev.to fetch error for tag '{tag}': {e}")

    return articles

# ── Source 2: Hacker News ─────────────────────────────────────────────────────
def fetch_hackernews(limit=10):
    """Fetch top stories from Hacker News and get their content."""
    articles = []
    try:
        resp = requests.get('https://hacker-news.firebaseio.com/v0/topstories.json', timeout=10)
        resp.raise_for_status()
        story_ids = resp.json()[:50]  # Check top 50 to find enough valid ones

        count = 0
        for story_id in story_ids:
            if count >= limit:
                break
            try:
                item_resp = requests.get(f'https://hacker-news.firebaseio.com/v0/item/{story_id}.json', timeout=8)
                if not item_resp.ok:
                    continue
                item = item_resp.json()

                if item.get('type') != 'story':
                    continue
                if not item.get('url'):
                    continue

                title = item.get('title', '').strip()
                desc = item.get('text', '') or f"Top trending story: {title}"
                desc = re.sub(r'<[^>]+>', '', desc).strip()
                if len(desc) < 20:
                    desc = f"A trending story on Hacker News: {title}"

                # HN doesn't have per-article timestamps as ISO, use Unix epoch
                ts = item.get('time', 0)
                from datetime import datetime, timezone
                dt = datetime.fromtimestamp(ts, tz=timezone.utc)
                if (datetime.now(timezone.utc) - dt).days > MAX_AGE_DAYS:
                    continue

                date_str = dt.strftime('%b %-d, %Y')

                articles.append({
                    'id': f"hn_{story_id}",
                    'title': title,
                    'category': 'Technology',
                    'date': date_str,
                    'description': desc[:250],
                    'image': FALLBACK_IMG,
                    'body_html': f'<p style="font-size:18px; line-height:1.8; color:rgba(255,255,255,0.8);">{desc}</p><p style="margin-top:20px; color:rgba(255,255,255,0.5); font-style:italic;">This is a top-trending Hacker News story with {item.get("score", 0)} upvotes and {item.get("descendants", 0)} comments.</p>',
                    'source': 'Hacker News',
                    'fetched_at': datetime.now(timezone.utc).isoformat()
                })
                count += 1
            except Exception as e:
                print(f"  HN item error {story_id}: {e}")
                continue

    except Exception as e:
        print(f"  Hacker News fetch error: {e}")

    return articles

# ── Source 3: TechCrunch RSS ──────────────────────────────────────────────────
def fetch_techcrunch(limit=8):
    """Fetch articles from TechCrunch RSS feed."""
    articles = []
    try:
        feed = feedparser.parse('https://techcrunch.com/feed/')
        for entry in feed.entries[:limit * 2]:  # Fetch extra for filtering
            if len(articles) >= limit:
                break

            pub_date = entry.get('published', '')
            if not is_within_30_days(pub_date):
                continue

            summary = entry.get('summary', '')
            # Strip HTML from summary
            clean_summary = re.sub(r'<[^>]+>', '', summary).strip()
            if len(clean_summary) < MIN_DESC_LEN:
                clean_summary = entry.get('title', '')

            # Build a native body from summary
            body_html = f'''
<p style="font-size:18px; line-height:1.8; color:rgba(255,255,255,0.8);">{clean_summary}</p>
<p style="margin-top:30px; color:rgba(255,255,255,0.5); font-style:italic;">
  Originally published by TechCrunch. Curated and validated by Infinite Design's automated blog agent.
</p>
'''
            articles.append({
                'id': f"tc_{abs(hash(entry.get('link', entry.get('title', ''))))}",
                'title': entry.get('title', '').strip(),
                'category': 'Tech News',
                'date': format_date(pub_date),
                'description': clean_summary[:250],
                'image': extract_image_from_entry(entry),
                'body_html': body_html,
                'source': 'TechCrunch',
                'fetched_at': datetime.now(timezone.utc).isoformat()
            })

    except Exception as e:
        print(f"  TechCrunch fetch error: {e}")

    return articles

# ── Source 4: FreeCodeCamp RSS ────────────────────────────────────────────────
def fetch_freecodecamp(limit=6):
    """Fetch articles from FreeCodeCamp RSS feed."""
    articles = []
    try:
        feed = feedparser.parse('https://www.freecodecamp.org/news/rss/')
        for entry in feed.entries[:limit * 2]:
            if len(articles) >= limit:
                break

            pub_date = entry.get('published', '')
            if not is_within_30_days(pub_date):
                continue

            summary = entry.get('summary', '')
            clean_summary = re.sub(r'<[^>]+>', '', summary).strip()
            if len(clean_summary) < MIN_DESC_LEN:
                clean_summary = entry.get('title', '')

            body_html = f'''
<p style="font-size:18px; line-height:1.8; color:rgba(255,255,255,0.8);">{clean_summary}</p>
<p style="margin-top:30px; color:rgba(255,255,255,0.5); font-style:italic;">
  Originally published by FreeCodeCamp. Curated and validated by Infinite Design's automated blog agent.
</p>
'''
            articles.append({
                'id': f"fcc_{abs(hash(entry.get('link', entry.get('title', ''))))}",
                'title': entry.get('title', '').strip(),
                'category': 'Programming',
                'date': format_date(pub_date),
                'description': clean_summary[:250],
                'image': extract_image_from_entry(entry),
                'body_html': body_html,
                'source': 'FreeCodeCamp',
                'fetched_at': datetime.now(timezone.utc).isoformat()
            })

    except Exception as e:
        print(f"  FreeCodeCamp fetch error: {e}")

    return articles

# ── Source 5: Smashing Magazine RSS ───────────────────────────────────────────
def fetch_smashingmagazine(limit=6):
    """Fetch articles from Smashing Magazine RSS feed."""
    articles = []
    try:
        feed = feedparser.parse('https://www.smashingmagazine.com/feed/')
        for entry in feed.entries[:limit * 2]:
            if len(articles) >= limit:
                break

            pub_date = entry.get('published', '')
            if not is_within_30_days(pub_date):
                continue

            summary = entry.get('summary', '')
            clean_summary = re.sub(r'<[^>]+>', '', summary).strip()
            if len(clean_summary) < MIN_DESC_LEN:
                clean_summary = entry.get('title', '')

            body_html = f'''
<p style="font-size:18px; line-height:1.8; color:rgba(255,255,255,0.8);">{clean_summary}</p>
<p style="margin-top:30px; color:rgba(255,255,255,0.5); font-style:italic;">
  Originally published by Smashing Magazine. Curated and validated by Infinite Design's automated blog agent.
</p>
'''
            articles.append({
                'id': f"sm_{abs(hash(entry.get('link', entry.get('title', ''))))}",
                'title': entry.get('title', '').strip(),
                'category': 'Web Design',
                'date': format_date(pub_date),
                'description': clean_summary[:250],
                'image': extract_image_from_entry(entry),
                'body_html': body_html,
                'source': 'Smashing Magazine',
                'fetched_at': datetime.now(timezone.utc).isoformat()
            })

    except Exception as e:
        print(f"  Smashing Magazine fetch error: {e}")

    return articles

# ── Deduplicate & Sort ────────────────────────────────────────────────────────
def deduplicate(articles):
    """Remove articles with duplicate titles (case-insensitive)."""
    seen_titles = set()
    unique = []
    for a in articles:
        key = a['title'].lower().strip()
        if key not in seen_titles:
            seen_titles.add(key)
            unique.append(a)
    return unique

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    print("🤖 Infinite Design Blog Agent starting...")
    all_articles = []

    print("📡 Fetching from Dev.to...")
    devto = fetch_devto(tags=['webdev', 'programming', 'javascript', 'ict'], per_page=10)
    print(f"  ✅ Got {len(devto)} articles from Dev.to")
    all_articles.extend(devto)

    print("📡 Fetching from Hacker News...")
    hn = fetch_hackernews(limit=6)
    print(f"  ✅ Got {len(hn)} articles from Hacker News")
    all_articles.extend(hn)

    print("📡 Fetching from TechCrunch RSS...")
    tc = fetch_techcrunch(limit=6)
    print(f"  ✅ Got {len(tc)} articles from TechCrunch")
    all_articles.extend(tc)

    print("📡 Fetching from FreeCodeCamp RSS...")
    fcc = fetch_freecodecamp(limit=6)
    print(f"  ✅ Got {len(fcc)} articles from FreeCodeCamp")
    all_articles.extend(fcc)

    print("📡 Fetching from Smashing Magazine RSS...")
    sm = fetch_smashingmagazine(limit=6)
    print(f"  ✅ Got {len(sm)} articles from Smashing Magazine")
    all_articles.extend(sm)

    # Deduplicate
    all_articles = deduplicate(all_articles)
    print(f"✨ Total unique articles after deduplication: {len(all_articles)}")

    # Trim to max
    all_articles = all_articles[:MAX_ARTICLES]

    # Build output
    output = {
        'updated_at': datetime.now(timezone.utc).isoformat(),
        'count': len(all_articles),
        'articles': all_articles
    }

    # Save
    output_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../../data/blogs.json'))
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"💾 Saved {len(all_articles)} articles to {output_path}")
    print("✅ Blog Agent complete!")

if __name__ == '__main__':
    main()
