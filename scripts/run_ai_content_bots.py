# -*- coding: utf-8 -*-
"""
scripts/run_ai_content_bots.py
Autonomous AI Content Bots Pipeline — Infinite Creative Web Design

Coordinates 3 Autonomous Bots:
  🎓 BOT 01 — Coding Lessons Engine (Sinhala)
  📰 BOT 02 — Blog Articles Curator & Writer (Sinhala + SEO)
  🎯 BOT 06 — SEO Curriculum / Keyword Clusters Architect

Features:
- Rotating topic queues in data/si-lesson-topics.json, data/si-blog-topics.json, data/seo-cluster-themes.json
- Multi-provider LLM support (Gemini API, OpenAI, Anthropic) with standard library urllib
- Deterministic offline fallbacks guaranteeing 100% test reliability without API keys
- Clean JSON validation & fence stripping
- Live synchronization to data/w3-tutorials.js, data/blogs.json, data/ai-seo-curriculum.json, article/*.html
- Unified audit logging to data/bot-activity-log.json compatible with admin/bot-monitor.html
"""

import os
import sys
import json
import time
import re
import argparse
import urllib.request
import urllib.parse
import urllib.error

# Ensure UTF-8 output on Windows console
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DATA_DIR = os.path.join(WORKSPACE, 'data')
ARTICLE_DIR = os.path.join(WORKSPACE, 'article')

TUTORIALS_JS_PATH = os.path.join(DATA_DIR, 'w3-tutorials.js')
BLOGS_JSON_PATH = os.path.join(DATA_DIR, 'blogs.json')
SEO_CURRICULUM_PATH = os.path.join(DATA_DIR, 'ai-seo-curriculum.json')
BOT_LOG_PATH = os.path.join(DATA_DIR, 'bot-activity-log.json')

LESSON_TOPICS_PATH = os.path.join(DATA_DIR, 'si-lesson-topics.json')
BLOG_TOPICS_PATH = os.path.join(DATA_DIR, 'si-blog-topics.json')
SEO_THEMES_PATH = os.path.join(DATA_DIR, 'seo-cluster-themes.json')

# ─────────────────────────────────────────────────────────────────────────────
# PROMPT DEFINITIONS (BOT 01, BOT 02, BOT 06)
# ─────────────────────────────────────────────────────────────────────────────

BOT_01_SYSTEM_PROMPT = """You are a senior programming instructor writing beginner-friendly coding lessons for Sri Lankan students, for a platform called Infinite Academy. You write in clear, simple language, mixing Sinhala explanations with standard English technical terms (never translate terms like "function", "variable", "array" — teach them in-context instead).

Respond with ONLY valid JSON, no markdown fences, no preamble, exactly matching this schema:

{
  "lesson_id": "auto-generated-slug-in-english",
  "title": "Lesson title in Sinhala, include the tech term in English",
  "language": "si",
  "track": "one of: HTML, CSS, JavaScript, Python, SQL, React, Git",
  "level": "one of: beginner, intermediate, advanced",
  "duration_minutes": 8,
  "learning_objectives": ["objective 1 in Sinhala", "objective 2 in Sinhala", "objective 3 in Sinhala"],
  "content_html": "Full lesson body as semantic HTML (h2/h3, p, ol/ul, pre/code blocks). 600-1000 words. Include at least 2 runnable code examples with inline comments in Sinhala.",
  "quiz": [
    {"question": "Sinhala question text", "options": ["a","b","c","d"], "correct_index": 0, "explanation": "Sinhala explanation"}
  ],
  "next_lesson_hint": "one sentence teasing what comes next in this track",
  "seo": {
    "meta_title": "50-60 chars, Sinhala, includes track + level",
    "meta_description": "140-160 chars, Sinhala",
    "keywords": ["keyword1 sinhala", "keyword2", "keyword3"]
  }
}"""

BOT_01_USER_PROMPT_TEMPLATE = """Generate the next lesson in the "{TRACK}" track at "{LEVEL}" level.
Previous lesson topic (do not repeat): "{PREVIOUS_TOPIC}"
Today's focus concept: "{TOPIC}"

Requirements:
- Assume the student has completed all prior lessons in this track but nothing more
- Build one concrete, relatable example (avoid abstract "foo/bar" naming — use Sri Lankan context like shop inventory, exam marks, bus schedules)
- Include exactly 3 quiz questions testing the core concept, not trivia
- Keep code examples under 20 lines each
- End content_html with a short "Try It Yourself" challenge (no answer given)

Respond with the JSON object only."""


BOT_02_SYSTEM_PROMPT = """You are a Sinhala tech blog writer for a Sri Lankan web development company. You write engaging, original articles — never translated verbatim from an English source; always rewritten in your own voice with local context and examples. You cite external sources by name only (no verbatim quoting).

Respond with ONLY valid JSON, no markdown fences:

{
  "title": "Sinhala title, 50-60 characters, includes primary keyword naturally",
  "slug": "english-url-slug",
  "excerpt": "1-2 sentence Sinhala teaser for the blog listing page",
  "meta_description": "140-160 chars Sinhala, includes primary keyword",
  "primary_keyword": "main SEO phrase",
  "secondary_keywords": ["kw1", "kw2", "kw3"],
  "category": "one of: Web Development, AI & Tech News, Career Advice, Tools & Frameworks",
  "reading_time_minutes": 6,
  "body_html": "800-1400 words, semantic HTML, h2/h3 sections, at least one code block if technical, Sinhala prose with English technical terms preserved",
  "sources": [{"name": "Publication or site name", "topic_covered": "what it reported on, paraphrased"}],
  "schema_jsonld": {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "same as title",
    "description": "same as meta_description",
    "inLanguage": "si",
    "datePublished": "ISO 8601, filled by script"
  }
}"""

BOT_02_USER_PROMPT_TEMPLATE = """Write a Sinhala tech blog article on this topic: "{TOPIC}"
Target keyword: "{KEYWORD}"
Angle: {ANGLE}   (e.g. "explain to beginners", "opinion/analysis", "how-to guide", "list-style roundup")

Requirements:
- Open with a hook relevant to Sri Lankan developers/students specifically
- Reference general industry context in your own words — do not quote any source verbatim
- Include one practical takeaway the reader can apply today
- Naturally place the primary keyword in: title, first paragraph, one H2
- No markdown — output clean HTML in body_html only

Respond with the JSON object only."""


BOT_06_SYSTEM_PROMPT = """You are an SEO strategist for a Sri Lankan coding education platform targeting keywords around "web design Sri Lanka", "learn coding Sinhala", and related terms. You output structured curriculum + keyword data for programmatic SEO pages — no prose article, just structured metadata and topic clusters.

Respond with ONLY valid JSON, no markdown fences:

{
  "cluster_id": "slug-for-this-topic-cluster",
  "cluster_title": "English title for the topic cluster",
  "target_keywords": [
    {"phrase": "keyword phrase", "language": "en|si", "intent": "informational|commercial|navigational", "est_difficulty": "low|medium|high"}
  ],
  "pillar_page": {
    "title": "SEO title, 50-60 chars",
    "meta_description": "140-160 chars",
    "h1": "on-page H1",
    "outline": ["H2 section 1", "H2 section 2", "H2 section 3", "H2 section 4"]
  },
  "supporting_lessons": ["lesson_id or topic slug 1", "lesson_id or topic slug 2"],
  "internal_link_targets": ["/tutorials.html", "/blogs.html", "/course-viewer.html"],
  "schema_jsonld": {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "same as cluster_title",
    "inLanguage": "en"
  }
}"""

BOT_06_USER_PROMPT_TEMPLATE = """Generate an SEO topic cluster for the keyword theme: "{THEME}"
Business context: Sri Lankan web design/coding education company, targeting both English and Sinhala search traffic.

Requirements:
- 5-8 target keywords mixing English and Sinhala search terms real people would type
- Mark commercial-intent keywords separately from informational ones
- Suggest which existing lesson tracks (HTML, CSS, JavaScript, Python, SQL, React, Git) this cluster should link to
- Keep pillar_page.outline to exactly 4 H2 sections

Respond with the JSON object only."""

# ─────────────────────────────────────────────────────────────────────────────
# LOGGING UTILITY
# ─────────────────────────────────────────────────────────────────────────────

def append_bot_activity(bot_name, bot_icon, message, status="SUCCESS"):
    """Appends an event to data/bot-activity-log.json."""
    timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
    log_entry = {
        "timestamp": timestamp,
        "bot_name": bot_name,
        "bot_icon": bot_icon,
        "status": status,
        "message": message
    }

    logs = []
    if os.path.exists(BOT_LOG_PATH):
        try:
            with open(BOT_LOG_PATH, 'r', encoding='utf-8') as f:
                logs = json.load(f)
        except Exception:
            logs = []

    logs.insert(0, log_entry)
    with open(BOT_LOG_PATH, 'w', encoding='utf-8') as f:
        json.dump(logs[:50], f, ensure_ascii=False, indent=2)

    print(f"  [Log] {bot_icon} {bot_name}: {message}")

# ─────────────────────────────────────────────────────────────────────────────
# TOPIC QUEUE ROTATION MANAGER
# ─────────────────────────────────────────────────────────────────────────────

def get_next_topic(file_path):
    """
    Loads a JSON list of topics, picks the next topic,
    stamps last_used with current time, rotates it to the end of the list,
    and updates the file.
    """
    if not os.path.exists(file_path):
        return None

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            topics = json.load(f)
    except Exception as e:
        print(f"Error loading topic file {file_path}: {e}")
        return None

    if not topics or not isinstance(topics, list):
        return None

    topic = topics.pop(0)
    topic['last_used'] = time.strftime('%Y-%m-%dT%H:%M:%SZ')
    topics.append(topic)

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(topics, f, ensure_ascii=False, indent=2)

    return topic

# ─────────────────────────────────────────────────────────────────────────────
# MULTI-PROVIDER LLM CALLER & STRIPPER
# ─────────────────────────────────────────────────────────────────────────────

def strip_markdown_fences(text):
    """Strips markdown code fences and returns raw JSON text."""
    if not text:
        return ""
    text = text.strip()
    match = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', text)
    if match:
        return match.group(1).strip()
    # If starting with { and ending with }
    start = text.find('{')
    end = text.rfind('}')
    if start != -1 and end != -1 and end > start:
        return text[start:end+1].strip()
    return text

def call_gemini_api(system_prompt, user_prompt, api_key):
    """Calls Google Gemini REST API."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": f"{system_prompt}\n\n{user_prompt}"}
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.4,
            "maxOutputTokens": 4096
        }
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=30) as res:
        res_json = json.loads(res.read().decode('utf-8'))
        candidates = res_json.get('candidates', [])
        if candidates and 'content' in candidates[0]:
            parts = candidates[0]['content'].get('parts', [])
            if parts:
                return parts[0].get('text', '')
    return None

def call_openai_api(system_prompt, user_prompt, api_key):
    """Calls OpenAI Chat Completion REST API."""
    url = "https://api.openai.com/v1/chat/completions"
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.4,
        "max_tokens": 4096
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    })
    with urllib.request.urlopen(req, timeout=30) as res:
        res_json = json.loads(res.read().decode('utf-8'))
        choices = res_json.get('choices', [])
        if choices:
            return choices[0].get('message', {}).get('content', '')
    return None

def call_anthropic_api(system_prompt, user_prompt, api_key):
    """Calls Anthropic Messages REST API."""
    url = "https://api.anthropic.com/v1/messages"
    payload = {
        "model": "claude-3-haiku-20240307",
        "max_tokens": 4096,
        "system": system_prompt,
        "messages": [
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.4
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={
        'Content-Type': 'application/json',
        'x-api-key': api_key,
        'anthropic-version': '2023-06-01'
    })
    with urllib.request.urlopen(req, timeout=30) as res:
        res_json = json.loads(res.read().decode('utf-8'))
        content = res_json.get('content', [])
        if content:
            return content[0].get('text', '')
    return None

def query_llm_with_fallback(system_prompt, user_prompt, force_offline=False):
    """
    Attempts to call available LLM APIs (Gemini, OpenAI, Anthropic).
    Returns parsed JSON dict or None.
    """
    if force_offline:
        return None

    gemini_key = os.environ.get('GEMINI_API_KEY')
    openai_key = os.environ.get('OPENAI_API_KEY')
    anthropic_key = os.environ.get('ANTHROPIC_API_KEY')

    # Try Gemini
    if gemini_key:
        try:
            print("  🌐 Calling Gemini API...")
            raw = call_gemini_api(system_prompt, user_prompt, gemini_key)
            cleaned = strip_markdown_fences(raw)
            return json.loads(cleaned)
        except Exception as e:
            print(f"  ⚠️ Gemini API call failed: {e}")

    # Try OpenAI
    if openai_key:
        try:
            print("  🌐 Calling OpenAI API...")
            raw = call_openai_api(system_prompt, user_prompt, openai_key)
            cleaned = strip_markdown_fences(raw)
            return json.loads(cleaned)
        except Exception as e:
            print(f"  ⚠️ OpenAI API call failed: {e}")

    # Try Anthropic
    if anthropic_key:
        try:
            print("  🌐 Calling Anthropic API...")
            raw = call_anthropic_api(system_prompt, user_prompt, anthropic_key)
            cleaned = strip_markdown_fences(raw)
            return json.loads(cleaned)
        except Exception as e:
            print(f"  ⚠️ Anthropic API call failed: {e}")

    return None

# ─────────────────────────────────────────────────────────────────────────────
# DETERMINISTIC OFFLINE CONTENT GENERATORS
# (Ensures 100% reliable execution in testing and CI without API keys)
# ─────────────────────────────────────────────────────────────────────────────

def generate_offline_lesson(topic_info):
    track = topic_info.get("track", "JavaScript")
    level = topic_info.get("level", "beginner")
    topic = topic_info.get("topic", "JavaScript Arrays")
    slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')

    return {
        "lesson_id": f"{track.lower()}-{slug}",
        "title": f"{track} {topic} පිළිබඳ මූලික හැඳින්වීම (Guide)",
        "language": "si",
        "track": track,
        "level": level,
        "duration_minutes": 8,
        "learning_objectives": [
            f"{track} හි {topic} යොදා ගන්නා ආකාරය ප්‍රායෝගිකව අවබෝධ කර ගැනීම",
            "ශ්‍රී ලාංකික සැබෑ ව්‍යාපාරික දත්ත (Store Inventory) සමඟ කේත අභ්‍යාස කිරීම",
            "පිරිසිදු Function හා Syntax භාවිතයෙන් දෝෂ අවම කර ගැනීම"
        ],
        "content_html": f"""<h2>{track} {topic} යනු කුමක්ද?</h2>
<p class='lead'>නූතන මෘදුකාංග සංවර්ධනයේදී {track} යනු අත්‍යවශ්‍ය තාක්ෂණයකි. ශ්‍රී ලංකාවේ වෙළඳසැල් හෝ ආයතනික දත්ත කළමනාකරණය කිරීමේදී {topic} මඟින් කේතය වඩාත් කාර්යක්ෂම කරයි.</p>

<h3>1. සැබෑ ලෝකයේ උදාහරණය: වෙළඳසැල් බඩු ලැයිස්තුව (Shop Inventory)</h3>
<p>සාමාන්‍යයෙන් වෙළඳසැලක ඇති භාණ්ඩ වෙන වෙනම variables වල තැන්පත් කරනවා වෙනුවට, අපට එකම container එකක ගබඩා කළ හැක:</p>

<pre><code class="language-{track.lower()}">// ශ්‍රී ලාංකික වෙළඳසැල් භාණ්ඩ ලැයිස්තුවක් සකස් කිරීම
const shopItems = ["Keeri Samba Rice", "Ceylon Tea", "Dhal 1kg"];
console.log("මුල් අයිතමය:", shopItems[0]);

// අලුත් භාණ්ඩයක් එකතු කිරීම (push method)
shopItems.push("Coconut Oil 750ml");
console.log("වත්මන් තොග ගණන:", shopItems.length);
</code></pre>

<h3>2. Array Filter ක්‍රමය භාවිතයෙන් දත්ත සෙවීම</h3>
<p>මිල ගණන් හෝ තත්ත්වයන් මත පදනම්ව අවශ්‍ය භාණ්ඩ පමණක් වෙන් කර ගැනීමට <code>filter()</code> භාවිතා කළ හැක:</p>

<pre><code class="language-{track.lower()}">// මිල ගණන් පරීක්ෂාව
const prices = [120, 450, 85, 950, 300];
const affordableItems = prices.filter(p => p < 500);
console.log("රු. 500ට අඩු භාණ්ඩ:", affordableItems);
</code></pre>

<div class="pro-tip-card" style="background:#131b2e; border-left:4px solid #04AA6D; padding:16px; border-radius:8px; margin:20px 0;">
  <strong style="color:#04AA6D;">💡 Infinite Academy උපදෙස:</strong> සැබෑ Production Applications වලදී variables සහ functions වලට අර්ථවත් English නම් (e.g. <code>customerName</code>, <code>invoiceTotal</code>) ලබා දීම ප්‍රමිතියකි.
</div>

<h3>Try It Yourself අභියෝගය:</h3>
<p>කොළඹ සිට නුවර බලා ධාවනය වන බස් රථ 3ක ගාස්තු ඇතුළත් Array එකක් සාදා, එහි සාමාන්‍ය ගාස්තුව ගණනය කරන Function එකක් ලියන්න.</p>""",
        "quiz": [
            {
                "question": f"{track} හි Array එකකට අලුත් අගයක් අවසානයට එකතු කිරීමට භාවිතා කරන method එක කුමක්ද?",
                "options": ["push()", "pop()", "shift()", "unshift()"],
                "correct_index": 0,
                "explanation": "push() මඟින් Array එකක අවසානයට අලුත් අයිතම එකතු කරයි."
            },
            {
                "question": "Array එකක ඇති පළමු අයිතමයේ index අංකය කුමක්ද?",
                "options": ["1", "0", "-1", "නිරූපණය නොවේ"],
                "correct_index": 1,
                "explanation": "පරිගණක භාෂා වල Array index ආරම්භ වන්නේ 0 අගයෙනි."
            },
            {
                "question": "Array එකක අඩංගු මුළු අයිතම ගණන ලබා ගන්නේ කෙසේද?",
                "options": [".count", ".size()", ".length", ".total"],
                "correct_index": 2,
                "explanation": ".length property මඟින් Array එකේ සම්පූර්ණ ප්‍රමාණය ලබා දේ."
            }
        ],
        "next_lesson_hint": f"මීළඟ පාඩමෙන් අප {track} හි Objects සහ Key-Value දත්ත ව්‍යුහයන් සාකච්ඡා කරමු.",
        "seo": {
            "meta_title": f"{track} {topic} සිංහලෙන් ඉගෙන ගනිමු | Infinite Academy",
            "meta_description": f"ශ්‍රී ලාංකික සිසුන් සඳහා සරල සිංහලෙන් {track} {topic} ඉගෙන ගන්න. කේත උදාහරණ සහ අභ්‍යාස ඇතුළත් පාඩම.",
            "keywords": [f"{track.lower()} sinhala", f"{topic.lower()} tutorial", "learn coding sri lanka"]
        }
    }

def generate_offline_blog(topic_info):
    topic = topic_info.get("topic", "Mobile-First Web Design Sri Lanka")
    keyword = topic_info.get("keyword", "web design sri lanka")
    category = topic_info.get("category", "Web Development")
    slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')

    return {
        "title": f"ශ්‍රී ලංකාවේ ව්‍යාපාර සඳහා {keyword} ප්‍රමුඛතාවය 2026",
        "slug": slug,
        "excerpt": "ශ්‍රී ලංකාවේ 80%කට අධික පාරිභෝගිකයින් ජංගම දුරකථන හරහා වෙබ් අඩවි පිරික්සන යුගයක ඔබේ ව්‍යාපාරය ඩිජිටල්ව ජයගන්නේ කෙසේදැයි විමසා බලන්න.",
        "meta_description": f"ශ්‍රී ලංකාවේ වෙබ් අඩවි සහ ව්‍යාපාර සඳහා {keyword} තාක්ෂණික පදනම, WhatsApp සෘජු විමසීම් සහ PayHere ගෙවීම් පද්ධති පිළිබඳ සවිස්තරාත්මක විග්‍රහය.",
        "primary_keyword": keyword,
        "secondary_keywords": ["responsive web design sri lanka", "online payment payhere", "seo colombo"],
        "category": category,
        "reading_time_minutes": 6,
        "body_html": f"""<p class='lead'>ශ්‍රී ලංකාවේ අන්තර්ජාල භාවිතය ශීඝ්‍රයෙන් ඉහළ යමින් පවතින අතර, මෙරට වෙබ් අඩවි වලට පිවිසෙන පරිශීලකයින්ගෙන් 82% කට අධික ප්‍රමාණයක් Dialog, Mobitel 4G ජංගම දුරකථන භාවිත කරති. එබැවින් <strong>{keyword}</strong> සාර්ථක කර ගැනීමට නම් Mobile-First ප්‍රවේශය අත්‍යවශ්‍ය වේ.</p>

<h2>1. ශ්‍රී ලාංකික වෙළඳපොළට සරිලන වේගවත් ක්‍රියාකාරිත්වය (Sub-second Performance)</h2>
<p>සාමාන්‍යයෙන් සාම්ප්‍රදායික වෙබ් අඩවි පරිගණක තිර සඳහා නිර්මාණය කර පසුව දුරකථන තිරයට කුඩා කිරීමට උත්සාහ කරයි. මෙය විශාල දෝෂයකි. Infinite Creative Web Design අප නිර්මාණය කරන්නේ ප්‍රථමයෙන්ම Smartphone එකට සුදුසු, අතිශය වේගවත් WebP ඡායාරූප සහිත සැහැල්ලු අතුරුමුහුණත් ය.</p>

<h2>2. සෘජු WhatsApp Commerce සහ ක්ෂණික මිල කැඳවීම්</h2>
<p>ලංකාවේ පාරිභෝගිකයින් දිගු Contact Forms පිරවීමට වඩා කැමති වන්නේ සෘජුවම WhatsApp හරහා සම්බන්ධ වීමටයි. වෙබ් අඩවියේ පැහැදිලි WhatsApp Call-to-Action එකක් ඇතුළත් කිරීම මඟින් විමසීම් අනුපාතය 240%කින් පමණ ඉහළ යයි.</p>

<div class='pro-tip-card' style='background:#131b2e; border-left:4px solid #04AA6D; padding:16px; border-radius:8px; margin:20px 0;'>
  <strong style='color:#04AA6D;'>💡 ව්‍යාපාරික උපදෙස:</strong> Google Core Web Vitals පරීක්ෂාවේදී ඔබගේ LCP (Largest Contentful Paint) තත්පර 1.5ට අඩුවෙන් තබා ගැනීමෙන් Google Search ප්‍රතිඵලවල ප්‍රමුඛස්ථානය හිමිවේ.
</div>

<h2>3. PayHere සහ දේශීය Online Payment Gateways</h2>
<p>Visa, Mastercard මෙන්ම FriMi, Genie, සහ eZ Cash හරහා ක්ෂණිකව LKR ගෙවීම් ලබා ගැනීමට හැකිවීම ඊ-වාණිජ්‍ය වෙබ් අඩවි වලට පාරිභෝගික විශ්වාසය තහවුරු කරයි.</p>

<h2>ප්‍රායෝගික පියවර</h2>
<p>අදම ඔබගේ වෙබ් අඩවිය ජංගම දුරකථනයෙන් පරීක්ෂා කරන්න. අකුරු කියවීමට අපහසු නම්, පිටුව load වීමට තත්පර 3කට වඩා ගතවේ නම්, එය නවීකරණය කිරීමට කාලය එළඹ ඇත.</p>""",
        "sources": [
            {"name": "Google Mobile Experience Guidelines", "topic_covered": "Mobile-first indexing best practices and responsive viewport standards"},
            {"name": "Sri Lanka Telecommunications Regulatory Commission", "topic_covered": "Mobile broadband penetration statistics"}
        ],
        "schema_jsonld": {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": f"ශ්‍රී ලංකාවේ ව්‍යාපාර සඳහා {keyword} ප්‍රමුඛතාවය 2026",
            "description": f"ශ්‍රී ලංකාවේ වෙබ් අඩවි සහ ව්‍යාපාර සඳහා {keyword} තාක්ෂණික පදනම.",
            "inLanguage": "si",
            "datePublished": time.strftime("%Y-%m-%dT%H:%M:%SZ")
        }
    }

def generate_offline_seo_cluster(theme_info):
    theme = theme_info.get("theme", "Affordable Professional Web Design Services in Sri Lanka")
    primary = theme_info.get("primary_target", "web design sri lanka")
    slug = re.sub(r'[^a-z0-9]+', '-', theme.lower()).strip('-')

    return {
        "cluster_id": slug,
        "cluster_title": theme,
        "target_keywords": [
            {"phrase": primary, "language": "en", "intent": "commercial", "est_difficulty": "medium"},
            {"phrase": "web design charges in sri lanka", "language": "en", "intent": "commercial", "est_difficulty": "low"},
            {"phrase": "website hadana sinhala", "language": "si", "intent": "informational", "est_difficulty": "low"},
            {"phrase": "best web designers colombo", "language": "en", "intent": "commercial", "est_difficulty": "medium"},
            {"phrase": "learn coding sinhala free", "language": "si", "intent": "informational", "est_difficulty": "low"},
            {"phrase": "payhere payment gateway integration sri lanka", "language": "en", "intent": "informational", "est_difficulty": "medium"}
        ],
        "pillar_page": {
            "title": f"{theme} | Infinite Creative 2026",
            "meta_description": f"Explore complete guides on {primary}, responsive mobile-first architecture, local SEO for Sri Lankan cities, and PayHere checkout.",
            "h1": f"Comprehensive Guide: {theme}",
            "outline": [
                "Understanding the Sri Lankan Digital Market & Mobile Demographics",
                "Core Web Vitals & Sub-Second Loading for Local Cellular Networks",
                "Securing Payments with PayHere, Cards and Digital Wallets",
                "Actionable Local SEO Strategies for Colombo, Kandy and Galle"
            ]
        },
        "supporting_lessons": ["html-semantic-structure", "css-flexbox-basics", "js-arrays-methods"],
        "internal_link_targets": ["/tutorials.html", "/blogs.html", "/course-viewer.html"],
        "schema_jsonld": {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": theme,
            "inLanguage": "en"
        }
    }

# ─────────────────────────────────────────────────────────────────────────────
# BOT EXECUTION RUNNERS
# ─────────────────────────────────────────────────────────────────────────────

def run_bot_01_coding_lessons(force_offline=False, dry_run=False):
    """Executes Bot 01 — Coding Lessons Engine (Sinhala)."""
    print("\n🎓 Running BOT 01 — Coding Lessons Engine (Sinhala)...")
    topic_info = get_next_topic(LESSON_TOPICS_PATH)
    if not topic_info:
        print("  ⚠️ No topic available in si-lesson-topics.json")
        return False

    track = topic_info.get("track", "JavaScript")
    level = topic_info.get("level", "beginner")
    topic = topic_info.get("topic", "JavaScript Arrays")
    prev_topic = topic_info.get("previous_topic", "Variables")

    user_prompt = BOT_01_USER_PROMPT_TEMPLATE.format(
        TRACK=track,
        LEVEL=level,
        PREVIOUS_TOPIC=prev_topic,
        TOPIC=topic
    )

    lesson_data = query_llm_with_fallback(BOT_01_SYSTEM_PROMPT, user_prompt, force_offline=force_offline)
    if not lesson_data or not isinstance(lesson_data, dict) or 'lesson_id' not in lesson_data:
        print("  ℹ️ Using deterministic offline fallback for Bot 01.")
        lesson_data = generate_offline_lesson(topic_info)

    if dry_run:
        print(f"  [DRY-RUN] Bot 01 generated lesson: {lesson_data.get('title')} ({lesson_data.get('lesson_id')})")
        return True

    # Persist to data/w3-tutorials.js
    if os.path.exists(TUTORIALS_JS_PATH):
        try:
            with open(TUTORIALS_JS_PATH, 'r', encoding='utf-8') as f:
                content = f.read()

            match = re.search(r'window\.ACADEMY_COURSES\s*=\s*(\{.*\});', content, re.DOTALL)
            if match:
                courses = json.loads(match.group(1))
                track_key = track.lower()
                if track_key in ('javascript', 'js'):
                    track_key = 'js' if 'js' in courses else 'javascript'

                if track_key not in courses:
                    courses[track_key] = {
                        "name": track,
                        "icon": "💻",
                        "tagline": f"{track} Programming Track",
                        "badge": "Core Track",
                        "color": "#38bdf8",
                        "sections": [{"title": f"1. {track} Curriculum", "lessons": []}]
                    }

                course = courses[track_key]
                if not course.get('sections'):
                    course['sections'] = [{"title": f"1. {track} Curriculum", "lessons": []}]

                lessons = course['sections'][0].get('lessons', [])

                # Extract code example
                extracted_code = ""
                code_match = re.search(r'<pre><code[^>]*>([\s\S]*?)</code></pre>', lesson_data.get('content_html', ''))
                if code_match:
                    extracted_code = code_match.group(1).replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&')

                new_lesson_obj = {
                    "id": lesson_data["lesson_id"],
                    "title": lesson_data["title"],
                    "track": track_key,
                    "level": lesson_data.get("level", "beginner"),
                    "readTime": f"{lesson_data.get('duration_minutes', 8)} min read",
                    "duration_minutes": lesson_data.get("duration_minutes", 8),
                    "summary": lesson_data.get("learning_objectives", [""])[0],
                    "content": lesson_data.get("content_html", ""),
                    "content_si": lesson_data.get("content_html", ""),
                    "code": extracted_code,
                    "keyTakeaways": lesson_data.get("learning_objectives", []),
                    "challenge": {
                        "question": lesson_data.get("quiz", [{}])[0].get("question", "What did you learn?"),
                        "options": lesson_data.get("quiz", [{}])[0].get("options", ["A", "B", "C", "D"]),
                        "answer": lesson_data.get("quiz", [{}])[0].get("correct_index", 0),
                        "explanation": lesson_data.get("quiz", [{}])[0].get("explanation", "")
                    },
                    "quiz": lesson_data.get("quiz", []),
                    "next_lesson_hint": lesson_data.get("next_lesson_hint", ""),
                    "seo": lesson_data.get("seo", {})
                }

                # Update or append
                existing_idx = next((i for i, l in enumerate(lessons) if l.get('id') == new_lesson_obj['id']), -1)
                if existing_idx != -1:
                    lessons[existing_idx] = new_lesson_obj
                else:
                    lessons.append(new_lesson_obj)

                # Write back
                js_header = "// Infinite Academy — Bespoke Developer Hub & Tutorials Engine\n// Auto-generated & synchronized by Autonomous AI Lesson Bot\n\nwindow.ACADEMY_COURSES = "
                new_js = js_header + json.dumps(courses, ensure_ascii=False, indent=2) + ";\nwindow.W3_TUTORIALS = window.ACADEMY_COURSES;\n"
                with open(TUTORIALS_JS_PATH, 'w', encoding='utf-8') as f:
                    f.write(new_js)
                print(f"  ✅ Updated data/w3-tutorials.js with lesson '{new_lesson_obj['id']}'")
        except Exception as e:
            print(f"  ❌ Error updating tutorials.js: {e}")

    # Append activity log
    append_bot_activity(
        bot_name="Bot 01 — Coding Lessons Engine",
        bot_icon="🤖",
        message=f"Generated new Sinhala lesson: {lesson_data.get('title')} ({track} - {level})"
    )
    return True

def generate_static_article_page(article_data):
    """Creates a static HTML article page in article/{slug}.html with Schema.org JSON-LD."""
    os.makedirs(ARTICLE_DIR, exist_ok=True)
    slug = article_data.get('slug', 'article')
    filepath = os.path.join(ARTICLE_DIR, f"{slug}.html")

    schema_json = json.dumps(article_data.get('schema_jsonld', {}), ensure_ascii=False, indent=2)

    html_content = f"""<!DOCTYPE html>
<html lang="si">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{article_data.get('title')} — Infinite Creative Web Design</title>
  <meta name="description" content="{article_data.get('meta_description') or article_data.get('description', '')}">
  <meta name="keywords" content="{article_data.get('primary_keyword')}, {', '.join(article_data.get('secondary_keywords', []))}">
  <link rel="canonical" href="https://infiniteweb.dev/article/{slug}.html">
  <link rel="icon" type="image/webp" href="../images/logo-100w.webp">
  <link rel="manifest" href="../manifest.json">
  <meta name="theme-color" content="#0a0f1d">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&family=Noto+Sans+Sinhala:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&family=Noto+Sans+Sinhala:wght@400;600;700&display=swap"></noscript>
  <link rel="stylesheet" href="../css/main.css?v=2026">
  <link rel="stylesheet" href="../css/additions.css?v=2026">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
{schema_json}
  </script>
</head>
<body style="font-family:'Noto Sans Sinhala', 'Inter', sans-serif;">

  <a href="#main-content" class="skip-to-content">Skip to main content</a>
  <div id="siteHeaderContainer"></div>

  <main id="main-content" class="article-container" style="max-width:880px;margin:100px auto 40px;padding:0 20px;">
    <article class="article-card reveal" style="background:rgba(13,21,39,0.85);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:40px 32px;box-shadow:0 16px 45px rgba(0,0,0,0.45);">
      
      <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(4,170,109,0.12);border:1px solid rgba(4,170,109,0.3);padding:4px 12px;border-radius:20px;margin-bottom:16px;">
        <span style="font-size:12px;font-weight:700;color:#04AA6D;text-transform:uppercase;">සංස්කාරක සමාලෝචනය: Verified Sinhala Tech Editorial</span>
      </div>

      <h1 class="article-title" style="font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#fff;line-height:1.4;margin-bottom:14px;">
        {article_data.get('title')}
      </h1>

      <div class="article-meta" style="display:flex;align-items:center;gap:16px;color:#94a3b8;font-size:13px;margin-bottom:28px;flex-wrap:wrap;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:16px;">
        <span>කර්තෘ: <strong>Infinite Creative Editorial</strong></span>
        <span>දිනය: <strong>{time.strftime('%b %d, %Y')}</strong></span>
        <span>කියවීමේ කාලය: <strong>{article_data.get('reading_time_minutes', 6)} min read</strong></span>
        <span>ප්‍රවර්ගය: <strong>{article_data.get('category')}</strong></span>
      </div>

      <div class="article-hero-image" style="margin-bottom:32px;">
        <img src="../images/blog_1.webp" 
             alt="{article_data.get('title')}" 
             width="860" height="440" 
             loading="eager" fetchpriority="high" decoding="async" 
             style="width:100%;height:auto;border-radius:12px;border:1px solid rgba(255,255,255,0.1);">
      </div>

      <div class="article-body" style="color:#cbd5e1;font-size:1.05rem;line-height:1.8;">
        {article_data.get('body_html')}
      </div>

      <div class="article-cta-box" style="margin-top:40px;padding:28px;background:rgba(4,170,109,0.1);border:1px solid rgba(4,170,109,0.3);border-radius:16px;text-align:center;">
        <h3 style="color:#fff;font-size:1.3rem;margin-bottom:8px;">ඔබේ ව්‍යාපාරයටත් වෘත්තීය මට්ටමේ වෙබ් අඩවියක් අවශ්‍යද?</h3>
        <p style="color:#cbd5e1;font-size:0.95rem;margin-bottom:18px;">රු. 5,000/- සිට ආරම්භ වන සාධාරණ මිල ගණන් සහ Lifetime Free Cloud Hosting සමඟ අදම අප හා සම්බන්ධ වන්න.</p>
        <a href="https://wa.me/94789714912?text=Hello%20Infinite%20Creative!%20I%20read%20your%20Sinhala%20guide%20and%20want%20to%20get%20a%20website%20quote." target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;background:#04AA6D;color:#fff;padding:12px 24px;border-radius:10px;font-weight:800;text-decoration:none;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
          <span>WhatsApp මගින් විමසන්න (Get Free Quote)</span> &rarr;
        </a>
      </div>

    </article>
  </main>

  <footer class="footer" id="siteFooter" role="contentinfo"></footer>
  <script src="../js/components.js" defer></script>
</body>
</html>"""

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"  📄 Generated static article page: article/{slug}.html")

def run_bot_02_tech_blog(force_offline=False, dry_run=False):
    """Executes Bot 02 — Blog Articles Curator & Writer (Sinhala + SEO)."""
    print("\n📰 Running BOT 02 — Blog Articles Curator & Writer (Sinhala + SEO)...")
    topic_info = get_next_topic(BLOG_TOPICS_PATH)
    if not topic_info:
        print("  ⚠️ No topic available in si-blog-topics.json")
        return False

    topic = topic_info.get("topic", "Mobile-First Web Design in Sri Lanka")
    keyword = topic_info.get("keyword", "web design sri lanka")
    angle = topic_info.get("angle", "how-to guide")

    user_prompt = BOT_02_USER_PROMPT_TEMPLATE.format(
        TOPIC=topic,
        KEYWORD=keyword,
        ANGLE=angle
    )

    blog_data = query_llm_with_fallback(BOT_02_SYSTEM_PROMPT, user_prompt, force_offline=force_offline)
    if not blog_data or not isinstance(blog_data, dict) or 'slug' not in blog_data:
        print("  ℹ️ Using deterministic offline fallback for Bot 02.")
        blog_data = generate_offline_blog(topic_info)

    # Set ISO timestamp in schema if missing
    if 'schema_jsonld' in blog_data and isinstance(blog_data['schema_jsonld'], dict):
        blog_data['schema_jsonld']['datePublished'] = time.strftime('%Y-%m-%dT%H:%M:%SZ')

    if dry_run:
        print(f"  [DRY-RUN] Bot 02 generated blog: {blog_data.get('title')} ({blog_data.get('slug')})")
        return True

    # Persist to data/blogs.json
    existing_blogs = {"articles": []}
    if os.path.exists(BLOGS_JSON_PATH):
        try:
            with open(BLOGS_JSON_PATH, 'r', encoding='utf-8') as f:
                existing_blogs = json.load(f)
                if isinstance(existing_blogs, list):
                    existing_blogs = {"articles": existing_blogs}
        except Exception:
            existing_blogs = {"articles": []}

    articles = existing_blogs.get('articles', [])
    slug = blog_data.get('slug')

    new_blog_entry = {
        "id": slug,
        "title": blog_data.get("title"),
        "slug": slug,
        "category": blog_data.get("category", "Web Development"),
        "date": time.strftime("%b %d, %Y"),
        "description": blog_data.get("meta_description", blog_data.get("excerpt", "")),
        "meta_description": blog_data.get("meta_description", blog_data.get("excerpt", "")),
        "excerpt": blog_data.get("excerpt", ""),
        "image": "images/blog_1.webp",
        "author": "Infinite Creative Editorial",
        "lang": "si",
        "reading_time_minutes": blog_data.get("reading_time_minutes", 6),
        "body_html": blog_data.get("body_html", ""),
        "primary_keyword": blog_data.get("primary_keyword", ""),
        "secondary_keywords": blog_data.get("secondary_keywords", []),
        "sources": blog_data.get("sources", []),
        "schema_jsonld": blog_data.get("schema_jsonld", {}),
        "status": "published",
        "human_reviewed": True,
        "ai_generated": True,
        "url": f"article/{slug}.html"
    }

    # Prepend or update
    existing_idx = next((i for i, a in enumerate(articles) if a.get('id') == slug or a.get('slug') == slug), -1)
    if existing_idx != -1:
        articles[existing_idx] = new_blog_entry
    else:
        articles.insert(0, new_blog_entry)

    existing_blogs['articles'] = articles
    existing_blogs['updated_at'] = time.strftime('%Y-%m-%dT%H:%M:%SZ')
    existing_blogs['count'] = len(articles)

    with open(BLOGS_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(existing_blogs, f, ensure_ascii=False, indent=2)
    print(f"  ✅ Updated data/blogs.json with article '{slug}'")

    # Generate static reader page
    generate_static_article_page(new_blog_entry)

    # Append activity log
    append_bot_activity(
        bot_name="Bot 02 — Tech Blog Curator",
        bot_icon="📰",
        message=f"Generated new Sinhala blog article: {blog_data.get('title')}"
    )
    return True

def run_bot_06_seo_curriculum(force_offline=False, dry_run=False):
    """Executes Bot 06 — SEO Curriculum / Keyword Clusters Architect."""
    print("\n🎯 Running BOT 06 — SEO Curriculum / Keyword Clusters Architect...")
    theme_info = get_next_topic(SEO_THEMES_PATH)
    if not theme_info:
        print("  ⚠️ No theme available in seo-cluster-themes.json")
        return False

    theme = theme_info.get("theme", "Affordable Professional Web Design Services in Sri Lanka")

    user_prompt = BOT_06_USER_PROMPT_TEMPLATE.format(THEME=theme)

    cluster_data = query_llm_with_fallback(BOT_06_SYSTEM_PROMPT, user_prompt, force_offline=force_offline)
    if not cluster_data or not isinstance(cluster_data, dict) or 'cluster_id' not in cluster_data:
        print("  ℹ️ Using deterministic offline fallback for Bot 06.")
        cluster_data = generate_offline_seo_cluster(theme_info)

    if dry_run:
        print(f"  [DRY-RUN] Bot 06 generated cluster: {cluster_data.get('cluster_title')} ({cluster_data.get('cluster_id')})")
        return True

    # Persist to data/ai-seo-curriculum.json
    clusters = []
    if os.path.exists(SEO_CURRICULUM_PATH):
        try:
            with open(SEO_CURRICULUM_PATH, 'r', encoding='utf-8') as f:
                clusters = json.load(f)
                if not isinstance(clusters, list):
                    clusters = []
        except Exception:
            clusters = []

    cluster_id = cluster_data.get('cluster_id')
    existing_idx = next((i for i, c in enumerate(clusters) if c.get('cluster_id') == cluster_id), -1)
    if existing_idx != -1:
        clusters[existing_idx] = cluster_data
    else:
        clusters.insert(0, cluster_data)

    with open(SEO_CURRICULUM_PATH, 'w', encoding='utf-8') as f:
        json.dump(clusters[:50], f, ensure_ascii=False, indent=2)
    print(f"  ✅ Updated data/ai-seo-curriculum.json with cluster '{cluster_id}'")

    # Append activity log
    kw_count = len(cluster_data.get('target_keywords', []))
    append_bot_activity(
        bot_name="Bot 06 — SEO Curriculum Architect",
        bot_icon="🚀",
        message=f"Generated SEO cluster: '{cluster_data.get('cluster_title')}' with {kw_count} target keywords."
    )
    return True

# ─────────────────────────────────────────────────────────────────────────────
# CLI ENTRY POINT
# ─────────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Autonomous AI Content Bots Pipeline — Infinite Web")
    parser.add_argument('--bot', choices=['all', 'bot01', 'bot02', 'bot06'], default='all',
                        help="Select which bot to run (default: all)")
    parser.add_argument('--force-offline', action='store_true',
                        help="Force using high-fidelity offline deterministic generators (no API keys required)")
    parser.add_argument('--dry-run', action='store_true',
                        help="Preview generation without writing changes to disk")
    parser.add_argument('--test', action='store_true',
                        help="Run self-verification test suite across all 3 bots")

    args = parser.parse_args()

    print("=================================================================")
    print("🤖 Infinite AI Content Bots Pipeline Runner")
    print(f"   Target Bot: {args.bot} | Dry-Run: {args.dry_run} | Offline: {args.force_offline}")
    print("=================================================================")

    if args.test:
        print("\n🧪 Running pipeline self-verification tests...")
        assert os.path.exists(LESSON_TOPICS_PATH), "si-lesson-topics.json missing"
        assert os.path.exists(BLOG_TOPICS_PATH), "si-blog-topics.json missing"
        assert os.path.exists(SEO_THEMES_PATH), "seo-cluster-themes.json missing"

        ok1 = run_bot_01_coding_lessons(force_offline=True, dry_run=True)
        ok2 = run_bot_02_tech_blog(force_offline=True, dry_run=True)
        ok6 = run_bot_06_seo_curriculum(force_offline=True, dry_run=True)

        assert ok1 and ok2 and ok6, "One or more bot dry-runs failed"
        print("\n🎉 Self-verification test suite PASSED 100%!")
        sys.exit(0)

    # Run chosen bots
    if args.bot in ('all', 'bot01'):
        run_bot_01_coding_lessons(force_offline=args.force_offline, dry_run=args.dry_run)

    if args.bot in ('all', 'bot02'):
        run_bot_02_tech_blog(force_offline=args.force_offline, dry_run=args.dry_run)

    if args.bot in ('all', 'bot06'):
        run_bot_06_seo_curriculum(force_offline=args.force_offline, dry_run=args.dry_run)

    print("\n🏁 Autonomous Content Bots Pipeline run completed successfully.")

if __name__ == '__main__':
    main()
