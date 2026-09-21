# -*- coding: utf-8 -*-
"""
scripts/sinhala_translator.py
Automated Sinhala Technical Translation Engine for Infinite Academy.
Translates programming curriculum explanations, summaries, and quizzes into natural,
idiomatic Sinhala while strictly preserving English code syntax, keywords, and HTML/CSS tags.
"""

import sys
import re
import urllib.request
import urllib.parse
import json

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Technical terminology map (English -> Sinhala with English term in parentheses)
TECH_GLOSSARY = {
    "web development": "වෙබ් සංවර්ධනය (Web Development)",
    "website": "වෙබ් අඩවිය (Website)",
    "websites": "වෙබ් අඩවි (Websites)",
    "browser": "වෙබ් බ්‍රව්සරය (Browser)",
    "browsers": "වෙබ් බ්‍රව්සර් (Browsers)",
    "search engine": "සෙවුම් යන්ත්‍රය (Search Engine)",
    "search engines": "සෙවුම් යන්ත්‍ර (Search Engines)",
    "source code": "මූල කේතය (Source Code)",
    "programming language": "ක්‍රමලේඛන භාෂාව (Programming Language)",
    "frontend": "පෙරමුණ සංවර්ධනය (Frontend)",
    "backend": "පසුපස සංවර්ධනය (Backend)",
    "database": "දත්ත සමුදාය (Database)",
    "responsive design": "ප්‍රතිචාරාත්මක සැලසුම (Responsive Design)",
    "mobile-first": "ජංගම දුරකථන ප්‍රමුඛ (Mobile-First)",
    "performance": "කාර්යක්ෂමතාව (Performance)",
    "speed": "වේගය (Speed)",
    "accessibility": "ප්‍රවේශ්‍යතාව (Accessibility)",
    "syntax": "වාක්‍ය ඛණ්ඩ නීති (Syntax)",
    "element": "මූලද්‍රව්‍යය (Element)",
    "elements": "මූලද්‍රව්‍ය (Elements)",
    "attribute": "ගුණාංගය (Attribute)",
    "attributes": "ගුණාංග (Attributes)",
    "tag": "ටැගය (Tag)",
    "tags": "ටැග් (Tags)",
    "function": "ශ්‍රිතය (Function)",
    "functions": "ශ්‍රිත (Functions)",
    "variable": "විචල්‍යය (Variable)",
    "variables": "විචල්‍ය (Variables)",
    "array": "අරාව (Array)",
    "arrays": "අරා (Arrays)",
    "object": "වස්තුව (Object)",
    "objects": "වස්තු (Objects)",
    "class": "පන්තිය (Class)",
    "classes": "පන්ති (Classes)",
    "property": "ගුණාංගය (Property)",
    "properties": "ගුණාංග (Properties)",
    "value": "අගය (Value)",
    "values": "අගයන් (Values)",
    "layout": "සැකැස්ම (Layout)",
    "prerequisites": "මූලික දැනුම (Prerequisites)",
    "common pitfalls": "බහුලව සිදුවන වැරදි (Common Pitfalls)",
    "practice task": "ප්‍රායෝගික අභ්‍යාසය (Practice Task)",
    "key takeaways": "මූලික කරුණු (Key Takeaways)",
    "best practice": "හොඳම භාවිතයන් (Best Practice)"
}

def preserve_code_and_tags(text):
    """
    Replaces HTML tags, code blocks, and backticked terms with temporary tokens.
    Returns the tokenized text and a mapping of tokens to original fragments.
    """
    tokens = {}
    counter = 0

    # 1. Protect code blocks / inline code
    def replace_code(match):
        nonlocal counter
        token = f"___CODE_TOKEN_{counter}___"
        tokens[token] = match.group(0)
        counter += 1
        return token

    text = re.sub(r'<code>.*?</code>', replace_code, text, flags=re.DOTALL)
    text = re.sub(r'<pre>.*?</pre>', replace_code, text, flags=re.DOTALL)
    text = re.sub(r'`[^`]+`', replace_code, text)
    text = re.sub(r'<[^>]+>', replace_code, text)

    return text, tokens

def restore_code_and_tags(text, tokens):
    """Restores protected code tokens back to their original markup."""
    for token, original in tokens.items():
        text = text.replace(token, original)
        # Handle cases where translators might add spaces around underscores
        token_loose = token.replace('_', ' ')
        text = text.replace(token_loose, original)
    return text

def translate_sentence_rule_based(sentence):
    """
    Fallback translation rules for common programming educational patterns.
    """
    s = sentence.strip()
    if not s:
        return s

    # Common educational patterns
    patterns = [
        (r'Learn how the modern web is structured using semantic (.*?) markup\.',
         r'සෙමැන්ටික් \1 මාර්ක්අප් මඟින් නූතන වෙබ් අඩවි සැලසුම් කරන ආකාරය ඉගෙන ගන්න.'),
        (r'(.*?) is the universal foundation of every website on the planet\.',
         r'\1 යනු ලොව සෑම වෙබ් අඩවියකම විශ්වීය පදනම වේ.'),
        (r'It organizes content into a logical, accessible (.*?) that browsers and search engines can interpret\.',
         r'එය වෙබ් බ්‍රව්සර් සහ සෙවුම් යන්ත්‍ර වලට කියවිය හැකි පරිදි තාර්කික හා ප්‍රවේශ විය හැකි \1 ආකෘතියකට අන්තර්ගතය ගොනු කරයි.'),
        (r'Always declare (.*?) for (.*?)\.',
         r'සැමවිටම \2 සඳහා \1 ප්‍රකාශ කරන්න.'),
        (r'Always declare (.*?) to ensure responsive scaling on mobile screens\.',
         r'ජංගම දුරකථන තිර වල නිවැරදි ප්‍රමාණයෙන් දර්ශනය වීම සඳහා සැමවිටම \1 ප්‍රකාශ කරන්න.'),
        (r'Structure your pages with semantic tags that search engines and screen readers love\.',
         r'සෙවුම් යන්ත්‍ර (Search Engines) සහ Screen Readers සඳහා හිතකර සෙමැන්ටික් ටැග් භාවිතයෙන් පිටු සකසන්න.'),
        (r'Semantic HTML conveys meaning to humans, web crawlers, and assistive technologies rather than generic division boxes\.',
         r'හුදු සාමාන්‍ය ඩිවිෂන් කොටු වෙනුවට සෙමැන්ටික් HTML මඟින් මිනිසුන්ට මෙන්ම සෙවුම් බොට්ස් වලටද පැහැදිලි අර්ථයක් ලබා දෙයි.'),
        (r'Semantic tags give meaning to content for superior SEO and accessibility\.',
         r'උසස් SEO ශ්‍රේණිගත කිරීම් සහ ප්‍රවේශ්‍යතාව (Accessibility) සඳහා සෙමැන්ටික් ටැග් මඟින් අන්තර්ගතයට ගැඹුරු අර්ථයක් සපයයි.'),
        (r'Use exactly one (.*?) element per page\.',
         r'එක් වෙබ් පිටුවක් සඳහා හරියටම එක් \1 මූලද්‍රව්‍යයක් පමණක් භාවිතා කරන්න.'),
        (r'Wrap independent reusable content in (.*?)\.',
         r'නැවත භාවිතා කළ හැකි ස්වාධීන අන්තර්ගතයන් \1 තුළ අන්තර්ගත කරන්න.')
    ]

    for pat, repl in patterns:
        if re.search(pat, s, re.IGNORECASE):
            return re.sub(pat, repl, s, flags=re.IGNORECASE)

    # Keyword replacements
    translated = s
    for en, si in TECH_GLOSSARY.items():
        pattern = r'\b' + re.escape(en) + r'\b'
        translated = re.sub(pattern, si, translated, flags=re.IGNORECASE)

    return translated

def translate_to_sinhala(text, allow_api=True):
    """
    Translates technical text to Sinhala while safeguarding code syntax and tags.
    """
    if not text or not isinstance(text, str):
        return text

    tokenized, tokens = preserve_code_and_tags(text)

    translated_text = None

    # Try Google Translate API first if allowed
    if allow_api:
        try:
            url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=si&dt=t&q=' + urllib.parse.quote(tokenized[:1200])
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=3) as response:
                result = json.loads(response.read().decode('utf-8'))
                translated_text = ''.join([part[0] for part in result[0] if part[0]])
        except Exception:
            translated_text = None

    # Fallback to rule-based transformer if API fails or offline
    if not translated_text:
        sentences = re.split(r'(\. |\n)', tokenized)
        translated_parts = []
        for part in sentences:
            if part in ('. ', '\n'):
                translated_parts.append(part)
            else:
                translated_parts.append(translate_sentence_rule_based(part))
        translated_text = ''.join(translated_parts)

    restored = restore_code_and_tags(translated_text, tokens)
    return restored

def translate_lesson(lesson):
    """
    Enriches a single lesson dictionary with Sinhala content (content_si, summary_si, etc.)
    """
    enriched = dict(lesson)

    # 1. Translate Content
    orig_content = lesson.get('content', '')
    if orig_content:
        enriched['content_si'] = translate_to_sinhala(orig_content)

    # 2. Translate Summary
    orig_summary = lesson.get('summary', '')
    if orig_summary:
        enriched['summary_si'] = translate_to_sinhala(orig_summary)

    # 3. Translate Takeaways
    orig_takeaways = lesson.get('keyTakeaways', [])
    if orig_takeaways:
        enriched['keyTakeaways_si'] = [translate_to_sinhala(t) for t in orig_takeaways]

    return enriched

if __name__ == '__main__':
    # Self-test verification
    test_html = "<p class='lead'>HTML5 is the universal foundation of every website on the planet.</p><p>Always declare <code>&lt;!DOCTYPE html&gt;</code> for mobile-first performance.</p>"
    result = translate_to_sinhala(test_html, allow_api=False)
    print("Test Input:", test_html)
    print("\nSinhala Output:", result)
    assert "HTML5" in result, "Code keyword HTML5 must be preserved"
    assert "<code>&lt;!DOCTYPE html&gt;</code>" in result, "Code block must be preserved"
    print("\n✅ Verification Test Passed!")
