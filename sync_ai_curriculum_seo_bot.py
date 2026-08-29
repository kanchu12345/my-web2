# -*- coding: utf-8 -*-
import os
import json
import time

WORKSPACE = os.path.dirname(os.path.abspath(__file__))

def run_ai_seo_curriculum_bot():
    print("Running AI Curriculum Architect & Technical SEO Bot...")

    sample_seo_module = {
      "seo": {
        "title": "Master CSS Flexbox Alignment | Web Design Sri Lanka",
        "meta_description": "Learn modern CSS Flexbox alignment rules with interactive code examples, common mistakes & production layouts.",
        "keywords": "css flexbox, flexbox alignment, web design tutorial, learn CSS sri lanka, flexbox tutorial",
        "slug": "master-css-flexbox-alignment",
        "reading_time_minutes": 6
      },
      "schema": {
        "headline": "Mastering CSS Flexbox Layouts and Alignment Rules",
        "description": "Comprehensive guide to flexbox container properties, alignment axes, and responsive card grids.",
        "difficulty": "Intermediate"
      },
      "content": {
        "badge_text": "Module 04 • CSS Layouts",
        "heading": "Mastering CSS Flexbox Layouts & Alignment Rules",
        "prerequisites": ["HTML Elements & DOM Basics", "CSS Box Model & Padding"],
        "learning_objectives": [
          "Understand main axis vs cross axis alignment in Flexbox",
          "Master justify-content, align-items, and flex-wrap properties",
          "Build a responsive multi-column layout without media queries"
        ],
        "body_html": "<article class='lesson-body'><section><h3>What is CSS Flexbox?</h3><p>Flexbox (Flexible Box Layout) is a 1D layout model designed to distribute space along a single axis (row or column). It resolves historic float hacks and provides sub-second layout alignment.</p></section></article>",
        "code_examples": [
          {
            "language": "css",
            "title": "Centering Content Perfectly with Flexbox",
            "code": "/* Flexbox Centering Pattern */\n.flex-center {\n  display: flex;\n  justify-content: center; /* Main axis alignment */\n  align-items: center;    /* Cross axis alignment */\n  min-height: 100vh;\n}"
          }
        ],
        "common_mistakes": [
          {
            "mistake": "Applying justify-content to flex items instead of flex container",
            "solution": "Apply justify-content and align-items to the parent container element (`display: flex;`)."
          }
        ],
        "practice_challenge": {
          "task": "Create a 3-card product pricing row using `display: flex` and `gap: 20px` that stacks vertically on mobile screens.",
          "hint": "Use `flex-wrap: wrap` on the container so cards wrap cleanly."
        },
        "internal_links": [
          {
            "title": "HTML5 Semantic Elements Tutorial",
            "url": "course-viewer.html?topic=html&lesson=html-intro"
          }
        ]
      }
    }

    # Save to data/ai-seo-curriculum.json
    out_path = os.path.join(WORKSPACE, "data", "ai-seo-curriculum.json")
    modules = []
    if os.path.exists(out_path):
        try:
            with open(out_path, "r", encoding="utf-8") as f:
                modules = json.load(f)
        except Exception:
            modules = []

    modules.insert(0, sample_seo_module)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(modules, f, ensure_ascii=False, indent=2)

    # Append to Bot Activity Log
    log_path = os.path.join(WORKSPACE, "data", "bot-activity-log.json")
    logs = []
    if os.path.exists(log_path):
        try:
            with open(log_path, "r", encoding="utf-8") as f:
                logs = json.load(f)
        except Exception:
            logs = []

    new_entry = {
      "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
      "bot_name": "Bot 06 — SEO Curriculum Architect",
      "bot_icon": "🚀",
      "status": "SUCCESS",
      "message": f"Generated SEO module '{sample_seo_module['seo']['title']}' with JSON-LD schema & internal links."
    }
    logs.insert(0, new_entry)
    with open(log_path, "w", encoding="utf-8") as f:
        json.dump(logs[:50], f, ensure_ascii=False, indent=2)

    print("SUCCESS: Generated SEO Curriculum Module & logged activity!")

if __name__ == "__main__":
    run_ai_seo_curriculum_bot()
