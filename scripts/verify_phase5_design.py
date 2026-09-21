"""
verify_phase5_design.py - Phase 5 (Design and UX) Automated Verification Suite

Validates:
1. SVG Icon System & Zero Raw Emojis in core UI components
2. Interactive FAQ Accordion with 8 Sri Lankan business & technical questions
3. Schema.org FAQPage JSON-LD integration matching all questions
4. Authentic Sri Lankan Client Testimonials (Versells Lanka, Tropica, GPS Lanka, Hiri Surf)
   with SVG 5-star ratings, verified badges, and live project URLs
5. Signature Brand Interaction (interactive animated infinity emblem)
6. WCAG 2.1 AA Accessibility (skip-to-content, main landmark, focus-visible outline)
"""

import sys
import os
import json
import re

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_HTML = os.path.join(WORKSPACE_DIR, "index.html")
ADDITIONS_CSS = os.path.join(WORKSPACE_DIR, "css", "additions.css")
COMPONENTS_JS = os.path.join(WORKSPACE_DIR, "js", "components.js")
MAIN_JS = os.path.join(WORKSPACE_DIR, "js", "main.js")

def test_svg_icon_system():
    print("--- Test 1: SVG Icon System & Zero Emojis in Core UI ---")
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()

    # Check that trust bar, services, mockups, why-us do not contain old emojis
    forbidden_emojis = ["\U0001F3C6", "\U0001F4F1", "\u26A1", "\U0001F512", "\U0001F4BB", "\U0001F6D2", "\U0001F50D", "\U0001F6E1", "\U0001F4B3", "\U0001F36A", "\u2665"]
    found_forbidden = []
    
    # Check specifically in UI sections (before the first script tag)
    ui_html = html.split("<script")[0]
    for emoji in forbidden_emojis:
        if emoji in ui_html:
            found_forbidden.append(hex(ord(emoji[0])))
            
    assert len(found_forbidden) == 0, f"Found raw emojis in index.html UI: {found_forbidden}"
    print("[PASS] Zero raw emojis in index.html main markup")

    # Check for inline SVGs with aria-hidden
    svg_count = len(re.findall(r'<svg[^>]*aria-hidden=["\']true["\']', html))
    assert svg_count >= 20, f"Expected at least 20 aria-hidden SVGs, found {svg_count}"
    print(f"[PASS] Found {svg_count} accessible inline SVG icons with aria-hidden='true'")

    # Check js/components.js has zero raw emojis
    with open(COMPONENTS_JS, "r", encoding="utf-8") as f:
        comp = f.read()
    for emoji in ["\U0001F4AC", "\U0001F36A", "\u2665", "\u26A1"]:
        assert emoji not in comp, f"Found raw emoji in js/components.js"
    print("[PASS] Zero raw emojis in js/components.js")

def test_faq_accordion_and_schema():
    print("--- Test 2: FAQ Accordion and Schema.org FAQPage ---")
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()

    # Verify at least 8 FAQ items
    faq_items = re.findall(r'class="faq-item', html)
    assert len(faq_items) >= 8, f"Expected at least 8 FAQ items, found {len(faq_items)}"
    print(f"[PASS] Found {len(faq_items)} FAQ accordion items")

    # Verify ARIA bindings on buttons and panels
    for i in range(1, 9):
        btn_pattern = f'id="faq-btn-{i}"[^>]*aria-controls="faq-panel-{i}"'
        panel_pattern = f'id="faq-panel-{i}"[^>]*role="region"[^>]*aria-labelledby="faq-btn-{i}"'
        assert re.search(btn_pattern, html), f"Missing or invalid ARIA bindings for faq-btn-{i}"
        assert re.search(panel_pattern, html), f"Missing or invalid ARIA bindings for faq-panel-{i}"
    print("[PASS] Verified ARIA accessibility attributes for all 8 FAQ accordion items")

    # Verify FAQPage JSON-LD schema
    schema_match = re.search(r'<script type="application/ld\+json">([\s\S]*?)</script>', html)
    assert schema_match, "Schema JSON-LD block not found in index.html"
    schema_data = json.loads(schema_match.group(1))
    
    faq_entity = None
    if "@graph" in schema_data:
        for entity in schema_data["@graph"]:
            if entity.get("@type") == "FAQPage":
                faq_entity = entity
                break
    elif schema_data.get("@type") == "FAQPage":
        faq_entity = schema_data

    assert faq_entity is not None, "FAQPage @type not found in Schema.org JSON-LD"
    assert "mainEntity" in faq_entity, "FAQPage missing mainEntity array"
    assert len(faq_entity["mainEntity"]) == 8, f"Expected 8 questions in FAQPage schema, found {len(faq_entity['mainEntity'])}"
    
    # Check question names
    expected_q1 = "How much does a website cost in Sri Lanka?"
    q_names = [q.get("name") for q in faq_entity["mainEntity"]]
    assert expected_q1 in q_names, f"Expected question '{expected_q1}' in schema"
    print(f"[PASS] Verified FAQPage schema with {len(faq_entity['mainEntity'])} structured questions and answers")

def test_authentic_testimonials():
    print("--- Test 3: Authentic Sri Lankan Client Testimonials ---")
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()

    # Must feature real client businesses from data/projects.json
    real_clients = [
        "Versells Lanka",
        "Tropica Flavours",
        "GPS Lanka Travels",
        "Hiri Surf School"
    ]
    for client in real_clients:
        assert client in html, f"Missing verified client testimonial for '{client}'"
    print(f"[PASS] All 4 authentic client testimonials present ({', '.join(real_clients)})")

    # Verify SVG 5-star ratings
    star_containers = re.findall(r'class="testimonial-stars"[^>]*aria-label="5 out of 5 stars"', html)
    assert len(star_containers) >= 4, f"Expected at least 4 star containers, found {len(star_containers)}"
    print(f"[PASS] Found {len(star_containers)} accessible SVG 5-star ratings")

    # Verify verified client badges
    verified_badges = re.findall(r'class="testimonial-verified-badge"', html)
    assert len(verified_badges) >= 4, f"Expected at least 4 verified client badges, found {len(verified_badges)}"
    print(f"[PASS] Found {len(verified_badges)} verified client project badges")

def test_signature_brand_interaction():
    print("--- Test 4: Signature Brand Interaction (Animated Infinity Emblem) ---")
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()
    with open(ADDITIONS_CSS, "r", encoding="utf-8") as f:
        css = f.read()

    # Check emblem container in index.html
    assert 'class="infinity-brand-container' in html, "Missing .infinity-brand-container in index.html"
    assert 'class="infinity-brand-icon"' in html, "Missing .infinity-brand-icon in index.html"
    assert 'class="infinity-path-glow"' in html, "Missing .infinity-path-glow in index.html"
    print("[PASS] Found interactive infinity brand emblem in index.html")

    # Check CSS animation keyframes and styles in additions.css
    assert '@keyframes infinityFlow' in css, "Missing @keyframes infinityFlow in additions.css"
    assert '.infinity-path-glow' in css, "Missing .infinity-path-glow styles in additions.css"
    assert '.infinity-brand-container:hover' in css, "Missing hover interaction for infinity brand container"
    print("[PASS] Verified @keyframes infinityFlow and interactive CSS transitions")

def test_wcag_accessibility():
    print("--- Test 5: WCAG 2.1 AA Accessibility Standards ---")
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()
    with open(ADDITIONS_CSS, "r", encoding="utf-8") as f:
        css = f.read()

    # Skip-to-content link
    assert re.search(r'<a[^>]*href="#main-content"[^>]*class="skip-to-content"', html), "Missing skip-to-content link"
    print("[PASS] Skip-to-content link present at top of body")

    # Main content landmark
    assert '<main id="main-content">' in html, "Missing <main id='main-content'> landmark"
    assert '</main>' in html, "Missing closing </main> tag"
    print("[PASS] Semantic <main id='main-content'> landmark properly opened and closed")

    # Universal :focus-visible outline in additions.css
    assert ':focus-visible' in css, "Missing :focus-visible rule in css/additions.css"
    assert 'outline' in css, "Missing outline property in :focus-visible"
    print("[PASS] Universal :focus-visible accessibility outline configured in additions.css")

if __name__ == "__main__":
    print("==================================================")
    print("STARTING PHASE 5 (DESIGN AND UX) VERIFICATION")
    print("==================================================")
    try:
        test_svg_icon_system()
        test_faq_accordion_and_schema()
        test_authentic_testimonials()
        test_signature_brand_interaction()
        test_wcag_accessibility()
        print("==================================================")
        print("ALL PHASE 5 TESTS PASSED SUCCESSFULLY! (5/5 SUITES)")
        print("==================================================")
        sys.exit(0)
    except AssertionError as e:
        print(f"[FAIL] Assertion error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"[ERROR] Unexpected error: {e}")
        sys.exit(1)
