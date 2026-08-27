#!/usr/bin/env python3
"""
Autonomous Tutorial & Lesson Publisher Bot
Author: Infinite Creative Web Design
Purpose: Automatically expands and enriches the Infinite Academy tutorials database with structured lessons, live code playgrounds, and interactive quizzes.
"""

import os
import json
import sys

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

def build_curriculum():
    return {
        "html": [
            {
                "id": "html_intro",
                "title": "HTML5 Architecture & Boilerplate",
                "readTime": "4 min read",
                "summary": "Learn how the modern web is structured using semantic HTML5 markup.",
                "content": "<p class='lead'>HTML5 is the universal foundation of every website on the planet. It organizes content into a logical, accessible Document Object Model (DOM) that browsers and search engines can interpret.</p><div class='pro-tip-card'><div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Mobile-First Viewport & SEO Readiness</strong></div><p>Always declare <code>&lt;!DOCTYPE html&gt;</code> and include <code>&lt;meta name='viewport' content='width=device-width, initial-scale=1.0'&gt;</code> to ensure responsive scaling on mobile screens.</p></div>",
                "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Modern Web App</title>\n  <style>\n    body { font-family: sans-serif; background: #0b0f19; color: #fff; padding: 20px; }\n    .btn { background: #04AA6D; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }\n  </style>\n</head>\n<body>\n  <h2>🚀 Infinite Academy HTML5</h2>\n  <button class=\"btn\" onclick=\"alert('HTML5 Loaded!')\">Click Me</button>\n</body>\n</html>",
                "keyTakeaways": [
                    "<!DOCTYPE html> tells the browser to use modern HTML5 rendering.",
                    "<html lang='en'> declares page language for accessibility.",
                    "The <head> stores metadata, while <body> renders visible interface."
                ],
                "challenge": {
                    "question": "Why is the viewport meta tag critical in modern web design?",
                    "options": [
                        "It changes the website background color automatically",
                        "It instructs mobile devices how to scale and fit the website to the screen width",
                        "It is required for JavaScript to run",
                        "It increases internet connection speed"
                    ],
                    "answer": 1,
                    "explanation": "The viewport tag ensures mobile browsers render websites at 1:1 pixel scale without desktop zooming."
                }
            },
            {
                "id": "html_semantics",
                "title": "Semantic Elements & Accessibility",
                "readTime": "5 min read",
                "summary": "Structure your pages with semantic tags that search engines and screen readers love.",
                "content": "<p class='lead'>Semantic HTML conveys meaning to humans, web crawlers, and assistive technologies rather than generic division boxes.</p>",
                "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { font-family: sans-serif; background: #0f172a; color: #fff; padding: 20px; }\n  header, nav, main, footer { background: #1e293b; padding: 12px; margin-bottom: 10px; border-radius: 6px; }\n  a { color: #04AA6D; text-decoration: none; margin-right: 15px; }\n</style>\n</head>\n<body>\n  <header><h3>Infinite Design Studio</h3></header>\n  <nav><a href=\"#\">Home</a><a href=\"#\">Packages</a><a href=\"#\">Contact</a></nav>\n  <main><p>Semantic landmarks improve Google ranking and screen-reader accessibility.</p></main>\n  <footer><small>&copy; 2026 Infinite Creative</small></footer>\n</body>\n</html>",
                "keyTakeaways": [
                    "Semantic tags give meaning to content for superior SEO and accessibility.",
                    "Use exactly one <main> element per page.",
                    "Wrap independent reusable content in <article>."
                ],
                "challenge": {
                    "question": "How many <main> tags should exist on a single HTML webpage?",
                    "options": ["Unlimited", "As many as sections", "Exactly one", "None"],
                    "answer": 2,
                    "explanation": "The <main> tag represents the unique dominant content and must appear only once."
                }
            },
            {
                "id": "html_forms",
                "title": "Modern Interactive Forms & Validation",
                "readTime": "6 min read",
                "summary": "Build high-converting, mobile-friendly forms with native HTML5 input validation.",
                "content": "<p class='lead'>Forms turn visitors into paying clients. HTML5 provides built-in client-side validation attributes like required and specialized input types.</p>",
                "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { font-family: sans-serif; background: #0b0f19; color: #fff; padding: 20px; }\n  .form-box { max-width: 400px; background: #1e293b; padding: 20px; border-radius: 8px; }\n  input, select { width: 100%; padding: 8px; margin: 8px 0 16px; background: #0f172a; border: 1px solid #475569; color: #fff; border-radius: 4px; box-sizing: border-box; }\n  .btn { width: 100%; background: #04AA6D; color: white; padding: 10px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }\n</style>\n</head>\n<body>\n  <div class=\"form-box\">\n    <h3>Get a Quote</h3>\n    <form onsubmit=\"event.preventDefault(); alert('Inquiry Sent!');\">\n      <label>Name:</label><input type=\"text\" required placeholder=\"Your Name\">\n      <label>Email:</label><input type=\"email\" required placeholder=\"name@company.com\">\n      <button type=\"submit\" class=\"btn\">Submit Inquiry</button>\n    </form>\n  </div>\n</body>\n</html>",
                "keyTakeaways": [
                    "type='email' and type='tel' trigger optimized mobile keyboards.",
                    "required prevents empty form submissions natively."
                ],
                "challenge": {
                    "question": "Which input type triggers the dedicated email keyboard on mobile devices?",
                    "options": ["type='text'", "type='email'", "type='mail'", "type='input'"],
                    "answer": 1,
                    "explanation": "type='email' provides mobile keyboards with @ and .com buttons."
                }
            }
        ],
        "css": [
            {
                "id": "css_flexbox",
                "title": "Mastering CSS Flexbox",
                "readTime": "5 min read",
                "summary": "Build flexible, responsive 1-dimensional layouts with intuitive alignment.",
                "content": "<p class='lead'>Flexbox is the modern industry standard for aligning navigation bars, hero layouts, button groups, and cards along a single axis.</p>",
                "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { background: #0b0f19; font-family: sans-serif; padding: 20px; color: #fff; }\n  .flex-row { display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 15px; border-radius: 8px; gap: 10px; }\n  .badge { background: #04AA6D; padding: 6px 12px; border-radius: 4px; font-weight: bold; }\n</style>\n</head>\n<body>\n  <div class=\"flex-row\">\n    <span>Brand Logo</span>\n    <span class=\"badge\">Flexbox Active</span>\n    <span>Contact Us</span>\n  </div>\n</body>\n</html>",
                "keyTakeaways": [
                    "justify-content controls main-axis spacing.",
                    "align-items controls vertical cross-axis alignment.",
                    "gap provides clean spacing between children."
                ],
                "challenge": {
                    "question": "Which CSS property adds clean uniform space between flex children?",
                    "options": ["margin-between", "gap", "spacing", "flex-margin"],
                    "answer": 1,
                    "explanation": "The 'gap' property sets spacing between items in both Flexbox and Grid."
                }
            },
            {
                "id": "css_grid",
                "title": "CSS Grid & Auto-Fit Responsive Cards",
                "readTime": "6 min read",
                "summary": "Create 2-dimensional layouts that automatically adapt to any screen size without media queries.",
                "content": "<p class='lead'>CSS Grid gives you full two-dimensional layout power across rows and columns simultaneously.</p>",
                "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { background: #0b0f19; font-family: sans-serif; padding: 20px; color: #fff; }\n  .grid-box { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }\n  .card { background: #1e293b; border: 1px solid #334155; padding: 20px; border-radius: 8px; text-align: center; }\n</style>\n</head>\n<body>\n  <div class=\"grid-box\">\n    <div class=\"card\">Starter (5k)</div>\n    <div class=\"card\">Standard (10k)</div>\n    <div class=\"card\">Pro (20k)</div>\n  </div>\n</body>\n</html>",
                "keyTakeaways": [
                    "repeat(auto-fit, minmax(180px, 1fr)) makes grids self-responsive.",
                    "Grid coordinates rows and columns simultaneously."
                ],
                "challenge": {
                    "question": "What CSS Grid formula creates automatic wrapping columns without media queries?",
                    "options": [
                        "grid-columns: auto-wrap",
                        "repeat(auto-fit, minmax(200px, 1fr))",
                        "display: responsive-grid",
                        "columns: 100%"
                    ],
                    "answer": 1,
                    "explanation": "repeat(auto-fit, minmax(...)) dynamically fills available width with equal columns."
                }
            }
        ],
        "js": [
            {
                "id": "js_async_fetch",
                "title": "Async / Await & Fetch API",
                "readTime": "5 min read",
                "summary": "Learn how modern web applications load live data in the background without refreshing.",
                "content": "<p class='lead'>Modern web applications communicate with cloud databases and REST APIs using async / await and the native fetch() method.</p>",
                "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }\n  .btn { background: #04AA6D; color: white; padding: 10px 18px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }\n  .box { margin-top: 15px; padding: 15px; background: #1e293b; border-left: 4px solid #04AA6D; border-radius: 6px; }\n</style>\n</head>\n<body>\n  <h3>Async Fetch Demonstration</h3>\n  <button class=\"btn\" onclick=\"loadData()\">Fetch Data</button>\n  <div class=\"box\" id=\"out\">Click button to fetch...</div>\n  <script>\n    async function loadData() {\n      const el = document.getElementById('out');\n      el.textContent = 'Fetching from server...';\n      await new Promise(r => setTimeout(r, 500));\n      el.innerHTML = '<strong>Data loaded successfully:</strong> Status 200 OK';\n    }\n  </script>\n</body>\n</html>",
                "keyTakeaways": [
                    "async / await makes asynchronous code readable and easy to debug.",
                    "Always wrap network calls in try...catch."
                ],
                "challenge": {
                    "question": "What keyword pauses function execution until a Promise resolves inside an async function?",
                    "options": ["pause", "wait", "await", "defer"],
                    "answer": 2,
                    "explanation": "The 'await' keyword waits for the Promise to complete and returns its resolved value."
                }
            }
        ],
        "python": [
            {
                "id": "py_basics",
                "title": "Python Data Structures & Automation",
                "readTime": "4 min read",
                "summary": "Discover lists, dictionaries, and list comprehensions for rapid automation.",
                "content": "<p class='lead'>Python is loved worldwide for its expressive, clean syntax and powerful standard library.</p>",
                "code": "# Python 3 Agency Automation Script\nprojects = [\n    {'client': 'Versells Lanka', 'budget': 60000, 'status': 'Completed'},\n    {'client': 'Centennial Leos', 'budget': 20000, 'status': 'Completed'}\n]\n\ntotal = sum(p['budget'] for p in projects)\nprint('=== Infinite Agency Performance ===')\nfor p in projects:\n    print(p['client'] + ': Rs. ' + str(p['budget']) + '/-')\nprint('Total: Rs. ' + str(total) + '/-')",
                "keyTakeaways": [
                    "List comprehensions provide clean 1-line filtering and aggregation.",
                    "Dictionaries store key-value associations efficiently."
                ],
                "challenge": {
                    "question": "What symbol starts a single-line comment in Python?",
                    "options": ["//", "#", "--", "/*"],
                    "answer": 1,
                    "explanation": "# marks the start of a comment in Python."
                }
            }
        ],
        "sql": [
            {
                "id": "sql_queries",
                "title": "Advanced SELECT & Filtering Queries",
                "readTime": "4 min read",
                "summary": "Query relational databases with high-performance SQL filters and joins.",
                "content": "<p class='lead'>Structured Query Language (SQL) is the universal tool for managing data across MySQL, PostgreSQL, and SQLite.</p>",
                "code": "-- SQL Query: High-Value Projects Filter\nSELECT id, client_name, package_name, amount_lkr, created_at\nFROM client_orders\nWHERE status = 'Completed' AND amount_lkr >= 20000\nORDER BY amount_lkr DESC;",
                "keyTakeaways": [
                    "SELECT specifies which columns to retrieve.",
                    "WHERE filters rows based on criteria.",
                    "ORDER BY col DESC sorts descending."
                ],
                "challenge": {
                    "question": "Which clause sorts the result set in SQL?",
                    "options": ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE BY"],
                    "answer": 1,
                    "explanation": "ORDER BY is used to sort the result set."
                }
            }
        ],
        "php": [
            {
                "id": "php_backend",
                "title": "Dynamic Templates & Match Expressions",
                "readTime": "4 min read",
                "summary": "Harness PHP to render dynamic web pages and handle backend business logic.",
                "content": "<p class='lead'>PHP powers dynamic websites, WordPress, and enterprise Laravel applications.</p>",
                "code": "<?php\n$brand = 'Infinite Creative Web Design';\n$budget = 20000;\n\n$tier = match (true) {\n    $budget >= 60000 => 'E-Commerce Online Store',\n    $budget >= 20000 => 'Corporate Professional',\n    default => 'Starter'\n};\n\necho \"<h1>$brand</h1>\";\necho \"<p>Budget: Rs. \" . number_format($budget) . \"/-</p>\";\necho \"<p>Recommended Tier: <strong>$tier</strong></p>\";\n?>",
                "keyTakeaways": [
                    "PHP 8 match expressions provide clean, type-safe condition branching.",
                    "Variables start with $."
                ],
                "challenge": {
                    "question": "How do variables begin in PHP?",
                    "options": ["@", "&", "$", "#"],
                    "answer": 2,
                    "explanation": "All PHP variables begin with a dollar sign ($)."
                }
            }
        ],
        "react": [
            {
                "id": "react_hooks",
                "title": "State Management with useState & Props",
                "readTime": "5 min read",
                "summary": "Build reactive components with declarative JSX and React Hooks.",
                "content": "<p class='lead'>React empowers developers to build modular, component-driven User Interfaces with fast Virtual DOM updates.</p>",
                "code": "import React, { useState } from 'react';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div style={{ padding: '20px', background: '#0b0f19', color: '#fff', borderRadius: '8px' }}>\n      <h3 style={{ color: '#04AA6D' }}>Infinite React Hook</h3>\n      <p>Clicked: <strong>{count}</strong> times</p>\n      <button onClick={() => setCount(count + 1)} style={{ padding: '8px 16px', background: '#04AA6D', color: '#fff', border: 'none', borderRadius: '4px' }}>\n        Increment\n      </button>\n    </div>\n  );\n}\nexport default App;",
                "keyTakeaways": [
                    "useState manages reactive state in functional components.",
                    "JSX combines HTML-like markup directly inside JavaScript."
                ],
                "challenge": {
                    "question": "Which React Hook initializes and updates component state?",
                    "options": ["useEffect", "useState", "useRef", "useMemo"],
                    "answer": 1,
                    "explanation": "useState is the core hook for managing component state."
                }
            }
        ],
        "git": [
            {
                "id": "git_workflow",
                "title": "Branching, Committing & GitHub Deployment",
                "readTime": "4 min read",
                "summary": "Master team collaboration, branching, and automated deployments with Git.",
                "content": "<p class='lead'>Git is the industry standard for tracking code changes, collaborating across teams, and triggering automated CI/CD deployments.</p>",
                "code": "# The Professional Git Workflow\n\n# 1. Create feature branch\ngit checkout -b feature/interactive-tutorials\n\n# 2. Stage changes\ngit add .\n\n# 3. Create descriptive commit\ngit commit -m \"feat(academy): add automated lessons publisher\"\n\n# 4. Push to remote\ngit push origin feature/interactive-tutorials",
                "keyTakeaways": [
                    "Use feature branches to keep main clean and stable.",
                    "Write clear conventional commit messages."
                ],
                "challenge": {
                    "question": "Which command creates and switches to a new Git branch simultaneously?",
                    "options": ["git branch new", "git checkout -b branch-name", "git switch create", "git make branch"],
                    "answer": 1,
                    "explanation": "git checkout -b <name> creates and immediately checks out the new branch."
                }
            }
        ]
    }

def sync_tutorials():
    js_path = os.path.join(os.getcwd(), 'data', 'w3-tutorials.js')
    curriculum = build_curriculum()
    
    courses_meta = {
        "html": {"name": "HTML5", "icon": "🌐", "tagline": "Modern Web Structure & Semantics", "badge": "Frontend Core", "color": "#04AA6D"},
        "css": {"name": "CSS3", "icon": "🎨", "tagline": "Modern UI Engineering & Responsive Layouts", "badge": "Styling & Motion", "color": "#264DE4"},
        "js": {"name": "JavaScript", "icon": "⚡", "tagline": "Dynamic Frontend Engineering & Async APIs", "badge": "Programming", "color": "#F7DF1E"},
        "python": {"name": "Python", "icon": "🐍", "tagline": "Clean Scripting, AI & Data Science", "badge": "Backend & AI", "color": "#3776AB"},
        "sql": {"name": "SQL", "icon": "🗄️", "tagline": "Database Querying & Relational Architecture", "badge": "Database", "color": "#00758F"},
        "php": {"name": "PHP", "icon": "🐘", "tagline": "Modern Server-Side Architecture & APIs", "badge": "Backend", "color": "#777BB4"},
        "react": {"name": "React", "icon": "⚛️", "tagline": "Component Architecture & Reactive State", "badge": "Frontend UI", "color": "#61DAFB"},
        "git": {"name": "Git", "icon": "🌿", "tagline": "Distributed Version Control & GitHub Workflows", "badge": "DevOps", "color": "#F05032"}
    }

    full_academy_data = {}
    for track_key, meta in courses_meta.items():
        lessons = curriculum.get(track_key, [])
        full_academy_data[track_key] = {
            "name": meta["name"],
            "icon": meta["icon"],
            "tagline": meta["tagline"],
            "badge": meta["badge"],
            "color": meta["color"],
            "sections": [
                {
                    "title": f"1. {meta['name']} Master Curriculum",
                    "lessons": lessons
                }
            ]
        }

    js_content = f"""// Infinite Academy — Bespoke Developer Hub & Tutorials Engine
// Original Creative Curriculum by Infinite Creative Web Design
// Auto-generated and synchronized by Autonomous AI Lesson Bot

window.ACADEMY_COURSES = {json.dumps(full_academy_data, indent=2)};
window.W3_TUTORIALS = window.ACADEMY_COURSES;
"""
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"SUCCESS: Synchronized {len(full_academy_data)} programming tracks and full lessons database!")

if __name__ == '__main__':
    sync_tutorials()
