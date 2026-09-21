# -*- coding: utf-8 -*-
"""
scripts/enrich_tutorials_sinhala.py
Enriches all existing Academy lessons in data/w3-tutorials.js with authentic,
high-quality technical Sinhala content (content_si, summary_si, keyTakeaways_si),
while strictly preserving English code syntax, HTML tags, and programming keywords.
"""

import sys
import os
import json
import re

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
TUTORIALS_PATH = os.path.join(WORKSPACE, 'data', 'w3-tutorials.js')

SINHALA_LESSONS_DATA = {
    "html_intro": {
        "summary_si": "නූතන වෙබ් අඩවි semantic HTML5 මාර්ක්අප් භාවිතයෙන් ගොඩනගන ආකාරය ඉගෙන ගන්න.",
        "content_si": "<p class='lead'>HTML5 යනු ලොව සෑම වෙබ් අඩවියකම (Website) විශ්වීය පදනම වේ. එය වෙබ් බ්‍රව්සර් (Browsers) සහ සෙවුම් යන්ත්‍ර (Search Engines) වලට නිවැරදිව කියවිය හැකි තාර්කික Document Object Model (DOM) සැකැස්මකට අන්තර්ගතය ගොනු කරයි.</p><div class='pro-tip-card'><div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Mobile-First Viewport සහ SEO සූදානම</strong></div><p>ජංගම දුරකථන තිර වලට (Mobile Screens) නිවැරදිව ගැලපෙන අයුරින් දර්ශනය වීම සඳහා සැමවිටම <code>&lt;!DOCTYPE html&gt;</code> ප්‍රකාශ කර <code>&lt;meta name='viewport' content='width=device-width, initial-scale=1.0'&gt;</code> ඇතුළත් කරන්න.</p></div>",
        "keyTakeaways_si": [
            "<!DOCTYPE html> මඟින් modern HTML5 rendering භාවිතා කිරීමට බ්‍රවුසරයට උපදෙස් දෙයි.",
            "<html lang='en'> accessibility සඳහා පිටුවේ භාෂාව ප්‍රකාශ කරයි.",
            "<head> metadata ගබඩා කරන අතර, <body> දර්ශනය වන අතුරුමුහුණත render කරයි."
        ]
    },
    "html_semantics": {
        "summary_si": "සෙවුම් යන්ත්‍ර (Google) සහ Screen Readers සඳහා හිතකර semantic ටැග් භාවිතයෙන් පිටු සකසන්න.",
        "content_si": "<p class='lead'>හුදු සාමාන්‍ය <code>&lt;div&gt;</code> කොටු වෙනුවට Semantic HTML මඟින් වෙබ් අන්තර්ගතයේ සැබෑ අර්ථය පරිශීලකයින්ට, සෙවුම් යන්ත්‍ර වෙබ් බොට්ස් (Web Crawlers) වලට සහ Screen Readers සඳහා මැනවින් ලබා දෙයි.</p>",
        "keyTakeaways_si": [
            "Semantic tags උසස් SEO සහ accessibility සඳහා අන්තර්ගතයට ගැඹුරු අර්ථයක් ලබා දෙයි.",
            "එක් පිටුවකට හරියටම එක් <main> element එකක් භාවිතා කරන්න.",
            "නැවත භාවිතා කළ හැකි ස්වාධීන අන්තර්ගතයන් <article> තුළ අන්තර්ගත කරන්න."
        ]
    },
    "html_forms": {
        "summary_si": "HTML5 හි ස්වභාවික input validation භාවිතයෙන් ගනුදෙනුකරුවන් ආකර්ෂණය කර ගන්නා forms සකසන්න.",
        "content_si": "<p class='lead'>Forms මඟින් වෙබ් අඩවියට පිවිසෙන්නන් මිලදී ගන්නා සේවාදායකයින් බවට පත් කරයි. HTML5 හි <code>required</code> වැනි සෘජු client-side validation ගුණාංග සහ විශේෂිත <code>input</code> වර්ග (types) අන්තර්ගතව පවතී.</p>",
        "keyTakeaways_si": [
            "type='email' සහ type='tel' මඟින් ජංගම දුරකථන වල විශේෂිත යතුරුපුවරු සක්‍රීය කරයි.",
            "required මඟින් හිස් form submissions ස්වභාවිකවම වළක්වයි."
        ]
    },
    "css_flexbox": {
        "summary_si": "පහසු alignment නීති සමඟින් නම්‍යශීලී, ප්‍රතිචාරාත්මක 1-dimensional layouts සාදන්න.",
        "content_si": "<p class='lead'>Flexbox යනු Navigation Bars, Hero layouts, Button groups සහ Cards තනි අක්ෂයක් (Single Axis) ඔස්සේ නිවැරදිව පෙළගැස්වීම (alignment) සඳහා වන නූතන ක්ෂේත්‍ර ප්‍රමිතියයි.</p>",
        "keyTakeaways_si": [
            "justify-content මඟින් main-axis හි පරතරය පාලනය කරයි.",
            "align-items මඟින් සිරස් cross-axis alignment එක පාලනය කරයි.",
            "gap මඟින් items අතර පිරිසිදු පරතරයක් සපයයි."
        ]
    },
    "css_grid": {
        "summary_si": "Media queries රහිතව ඕනෑම තිර ප්‍රමාණයකට අනුව ස්වයංක්‍රීයව හැඩගැසෙන 2-dimensional layouts සාදන්න.",
        "content_si": "<p class='lead'>CSS Grid මඟින් පේළි (rows) සහ තීරු (columns) දෙකම ඔස්සේ එකවර පූර්ණ Two-Dimensional සැකසුම් හැකියාවක් ඔබට ලබා දෙයි.</p>",
        "keyTakeaways_si": [
            "repeat(auto-fit, minmax(180px, 1fr)) මඟින් grids ස්වයංක්‍රීයව responsive කරයි.",
            "Grid මඟින් පේළි සහ තීරු එකවර සම්බන්ධීකරණය කරයි."
        ]
    },
    "js_async_fetch": {
        "summary_si": "පිටුව reload කිරීමකින් තොරව පසුබිමෙන් සජීවී දත්ත ලබා ගැනීමට modern web applications ක්‍රියා කරන ආකාරය ඉගෙන ගන්න.",
        "content_si": "<p class='lead'>නූතන වෙබ් යෙදුම් (Modern Web Applications) Cloud Databases සහ REST APIs සමඟ සන්නිවේදනය කිරීම සඳහා <code>async / await</code> සහ ස්වභාවික <code>fetch()</code> ක්‍රමය භාවිතා කරයි.</p>",
        "keyTakeaways_si": [
            "async / await මඟින් asynchronous කේත කියවීමට සහ debug කිරීමට පහසු කරයි.",
            "සැමවිටම network calls try...catch තුළ අන්තර්ගත කරන්න."
        ]
    },
    "py_basics": {
        "summary_si": "ස්වයංක්‍රීයකරණය (Automation) සඳහා lists, dictionaries, සහ list comprehensions භාවිතය ප්‍රගුණ කරන්න.",
        "content_si": "<p class='lead'>Python හි ඇති පැහැදිලි සරල syntax රටාව සහ ප්‍රබල සම්මත පුස්තකාල (Standard Library) හේතුවෙන් ලොව පුරා සංවර්ධකයින්ගේ ඉහළ ප්‍රසාදය දිනා ඇත.</p>",
        "keyTakeaways_si": [
            "List comprehensions මඟින් පිරිසිදු 1-line filtering සහ aggregation ලබා දෙයි.",
            "Dictionaries මඟින් key-value සම්බන්ධතා කාර්යක්ෂමව ගබඩා කරයි."
        ]
    },
    "sql_queries": {
        "summary_si": "ඉහළ කාර්යක්ෂමතාවයකින් යුත් SQL filters සහ joins භාවිතයෙන් relational databases වලින් දත්ත ලබා ගන්න.",
        "content_si": "<p class='lead'>Structured Query Language (SQL) යනු MySQL, PostgreSQL, සහ SQLite වැනි Relational Databases වල දත්ත කළමනාකරණය කිරීම සඳහා වන විශ්වීය මෙවලමයි.</p>",
        "keyTakeaways_si": [
            "SELECT මඟින් ලබාගත යුතු columns සඳහන් කරයි.",
            "WHERE මඟින් කොන්දේසි මත පදනම්ව rows පෙරහන් කරයි.",
            "ORDER BY col DESC මඟින් අවරෝහණව පෙළගස්වයි."
        ]
    },
    "php_backend": {
        "summary_si": "ගතික වෙබ් පිටු render කිරීමට සහ backend business logic පාලනයට PHP භාවිතය ඉගෙන ගන්න.",
        "content_si": "<p class='lead'>PHP මඟින් ගතික වෙබ් අඩවි (Dynamic Websites), WordPress, සහ දැවැන්ත Laravel Backend Applications බලගන්වයි.</p>",
        "keyTakeaways_si": [
            "PHP 8 match expressions මඟින් පිරිසිදු, type-safe කොන්දේසි ලබා දෙයි.",
            "Variables සැමවිටම $ ලකුණෙන් ආරම්භ වේ."
        ]
    },
    "react_hooks": {
        "summary_si": "Declarative JSX සහ React Hooks භාවිතයෙන් dynamic, reactive components ගොඩනගන්න.",
        "content_si": "<p class='lead'>React මඟින් වේගවත් Virtual DOM යාවත්කාලීන කිරීම් සමඟ Modular, Component-පාදක පරිශීලක අතුරුමුහුණත් (User Interfaces) නිර්මාණය කිරීමට සංවර්ධකයින්ට හැකියාව ලබා දෙයි.</p>",
        "keyTakeaways_si": [
            "useState මඟින් functional components වල reactive state කළමනාකරණය කරයි.",
            "JSX මඟින් JavaScript තුළ කෙලින්ම HTML-වැනි markup ලිවීමට ඉඩ දෙයි."
        ]
    },
    "git_workflow": {
        "summary_si": "කණ්ඩායම් සහයෝගීතාවය, branching, සහ GitHub automated deployments පිළිබඳ ප්‍රවීණත්වය ලබා ගන්න.",
        "content_si": "<p class='lead'>Git යනු කේත වෙනස්කම් (Code Changes) නිරීක්ෂණය කිරීම, කණ්ඩායම් සහයෝගීතාවය සහ ස්වයංක්‍රීය CI/CD deployments මෙහෙයවීම සඳහා වන ප්‍රමුඛතම ක්ෂේත්‍ර ප්‍රමිතියයි.</p>",
        "keyTakeaways_si": [
            "main ශාඛාව පිරිසිදුව තබා ගැනීමට feature branches භාවිතා කරන්න.",
            "පැහැදිලි conventional commit පණිවිඩ ලියන්න."
        ]
    }
}

def enrich_tutorials():
    if not os.path.exists(TUTORIALS_PATH):
        print(f"File not found: {TUTORIALS_PATH}")
        return False

    with open(TUTORIALS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'window\.ACADEMY_COURSES\s*=\s*(\{.*\});', content, re.DOTALL)
    if not m:
        print("Could not find window.ACADEMY_COURSES in file.")
        return False

    courses = json.loads(m.group(1))
    enriched_count = 0

    for c_id, course in courses.items():
        for section in course.get('sections', []):
            for lesson in section.get('lessons', []):
                l_id = lesson.get('id')
                if l_id in SINHALA_LESSONS_DATA:
                    si_data = SINHALA_LESSONS_DATA[l_id]
                    lesson['content_si'] = si_data['content_si']
                    lesson['summary_si'] = si_data['summary_si']
                    lesson['keyTakeaways_si'] = si_data['keyTakeaways_si']
                    enriched_count += 1

    js_header = """// Infinite Academy — Bespoke Developer Hub & Tutorials Engine
// Original Creative Curriculum by Infinite Creative Web Design
// Auto-generated and synchronized by Autonomous AI Lesson Bot

window.ACADEMY_COURSES = """

    new_file_text = js_header + json.dumps(courses, ensure_ascii=False, indent=2) + ";\nwindow.W3_TUTORIALS = window.ACADEMY_COURSES;\n"

    with open(TUTORIALS_PATH, 'w', encoding='utf-8') as f:
        f.write(new_file_text)

    print(f"Successfully enriched {enriched_count} lessons with high-quality technical Sinhala content.")
    return True

if __name__ == '__main__':
    enrich_tutorials()
