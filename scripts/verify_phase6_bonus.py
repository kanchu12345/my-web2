"""
verify_phase6_bonus.py - Phase 6 (Bonus Features) Automated Verification Suite

Validates:
1. Progressive Web App (PWA) Manifest, Service Worker & Offline Experience
2. Bilingual AI Assistant / Chatbot with English & Sinhala natural language responses
3. Interactive 3-Step Website Package Recommender Quiz with smart recommendation logic
"""

import sys
import os
import json
import re

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_HTML = os.path.join(WORKSPACE_DIR, "index.html")
MANIFEST_JSON = os.path.join(WORKSPACE_DIR, "manifest.json")
SW_JS = os.path.join(WORKSPACE_DIR, "sw.js")
OFFLINE_HTML = os.path.join(WORKSPACE_DIR, "offline.html")
CHATBOT_JS = os.path.join(WORKSPACE_DIR, "js", "chatbot.js")
QUIZ_JS = os.path.join(WORKSPACE_DIR, "js", "quiz.js")
COMPONENTS_JS = os.path.join(WORKSPACE_DIR, "js", "components.js")
ADDITIONS_CSS = os.path.join(WORKSPACE_DIR, "css", "additions.css")

def test_pwa_infrastructure():
    print("--- Test 1: Progressive Web App (PWA) Infrastructure ---")
    
    # 1. Manifest
    assert os.path.exists(MANIFEST_JSON), "manifest.json does not exist"
    with open(MANIFEST_JSON, "r", encoding="utf-8") as f:
        manifest = json.load(f)
    
    assert manifest.get("name") == "Infinite Creative Web Design", "manifest.json name invalid"
    assert manifest.get("short_name") == "InfiniteWeb", "manifest.json short_name invalid"
    assert manifest.get("display") == "standalone", "manifest.json display must be standalone"
    assert manifest.get("theme_color") == "#0a0f1d", "manifest.json theme_color missing or invalid"
    assert "icons" in manifest and len(manifest["icons"]) >= 2, "manifest.json missing icons"
    print("[PASS] manifest.json contains valid PWA configuration")

    # 2. Service Worker
    assert os.path.exists(SW_JS), "sw.js does not exist"
    with open(SW_JS, "r", encoding="utf-8") as f:
        sw = f.read()
    assert "install" in sw, "sw.js missing install event"
    assert "activate" in sw, "sw.js missing activate event"
    assert "fetch" in sw, "sw.js missing fetch event"
    assert "offline.html" in sw, "sw.js does not reference offline.html fallback"
    print("[PASS] sw.js contains install, activate, and offline fallback handlers")

    # 3. Offline HTML fallback page
    assert os.path.exists(OFFLINE_HTML), "offline.html does not exist"
    with open(OFFLINE_HTML, "r", encoding="utf-8") as f:
        offline = f.read()
    h1_count = len(re.findall(r'<h1[\s>]', offline))
    assert h1_count == 1, f"offline.html must have exactly 1 <h1> tag, found {h1_count}"
    assert "You Are Currently Offline" in offline, "offline.html missing English heading"
    assert "අන්තර්ජාලයට" in offline, "offline.html missing Sinhala explanation"
    assert "+94 78 971 4912" in offline, "offline.html missing contact phone"
    assert "Tangalle" in offline, "offline.html missing Tangalle address"
    print("[PASS] offline.html properly formatted with single <h1>, bilingual status, and contact info")

    # 4. Service Worker registration in components.js
    with open(COMPONENTS_JS, "r", encoding="utf-8") as f:
        comp = f.read()
    assert "serviceWorker" in comp, "components.js missing serviceWorker registration"
    assert "navigator.serviceWorker.register" in comp, "components.js missing navigator.serviceWorker.register"
    print("[PASS] Service Worker registration integrated in js/components.js")

    # 5. PWA links in index.html
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()
    assert 'rel="manifest"' in html, "index.html missing rel='manifest' link"
    assert 'name="theme-color"' in html, "index.html missing meta theme-color"
    print("[PASS] index.html links manifest.json and PWA meta tags")

def test_bilingual_ai_chatbot():
    print("--- Test 2: Bilingual AI Assistant / Chatbot ---")
    
    assert os.path.exists(CHATBOT_JS), "js/chatbot.js does not exist"
    with open(CHATBOT_JS, "r", encoding="utf-8") as f:
        bot = f.read()

    # Knowledge Base checks
    assert "KNOWLEDGE_BASE" in bot, "chatbot.js missing KNOWLEDGE_BASE"
    assert "5,000" in bot and "10,000" in bot, "chatbot.js missing package pricing knowledge"
    assert "PayHere" in bot, "chatbot.js missing PayHere knowledge"
    assert "GitHub Pages" in bot and "Cloudflare" in bot, "chatbot.js missing Free Cloud Hosting knowledge"
    assert "Tangalle" in bot and "94789714912" in bot, "chatbot.js missing studio location & WhatsApp knowledge"
    
    # Sinhala Unicode support
    assert "\\u0D80-\\u0DFF" in bot or "[\u0D80-\u0DFF]" in bot, "chatbot.js missing Sinhala unicode detection"
    assert "පැකේජ" in bot or "මිල" in bot, "chatbot.js missing Sinhala responses"
    print("[PASS] chatbot.js contains rich bilingual knowledge base (English & Sinhala)")

    # Accessible UI injection & WhatsApp handoff
    assert "infiniteChatbotTrigger" in bot, "chatbot.js missing trigger button ID"
    assert "aria-expanded" in bot, "chatbot.js missing aria-expanded accessibility"
    assert ("'role', 'dialog'" in bot) or ('role="dialog"' in bot), "chatbot.js missing role='dialog'"
    assert "wa.me/94789714912" in bot, "chatbot.js missing direct WhatsApp handoff"
    print("[PASS] chatbot.js implements accessible modal pattern and WhatsApp quote handoff")

    # Script tag in index.html
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()
    assert 'src="js/chatbot.js"' in html, "index.html missing js/chatbot.js script tag"
    assert 'src="js/chatbot.js" defer' in html or 'defer src="js/chatbot.js"' in html, "chatbot.js must have defer attribute"
    print("[PASS] js/chatbot.js included in index.html with defer")

    # CSS styles in additions.css
    with open(ADDITIONS_CSS, "r", encoding="utf-8") as f:
        css = f.read()
    assert ".chatbot-trigger-btn" in css, "additions.css missing .chatbot-trigger-btn"
    assert ".chatbot-drawer" in css, "additions.css missing .chatbot-drawer"
    print("[PASS] CSS additions include responsive styles for chatbot trigger and drawer")

def test_package_recommender_quiz():
    print("--- Test 3: Interactive Website Package Recommender Quiz ---")
    
    assert os.path.exists(QUIZ_JS), "js/quiz.js does not exist"
    with open(QUIZ_JS, "r", encoding="utf-8") as f:
        quiz = f.read()

    # Step questions and recommendation logic
    assert "QUIZ_QUESTIONS" in quiz, "quiz.js missing QUIZ_QUESTIONS"
    assert "step: 1" in quiz and "step: 2" in quiz and "step: 3" in quiz, "quiz.js missing 3-step questions"
    assert "Standard Business Package" in quiz, "quiz.js missing Standard Business recommendation"
    assert "E-Commerce" in quiz, "quiz.js missing E-Commerce recommendation"
    assert "wa.me/94789714912" in quiz, "quiz.js missing direct WhatsApp pre-filled quote action"
    print("[PASS] quiz.js implements 3-step recommendation flow with smart package matching")

    # Section in index.html
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()
    assert 'id="package-quiz"' in html, "index.html missing #package-quiz section"
    assert 'id="packageQuizContainer"' in html, "index.html missing #packageQuizContainer"
    assert 'src="js/quiz.js"' in html, "index.html missing js/quiz.js script tag"
    assert 'src="js/quiz.js" defer' in html or 'defer src="js/quiz.js"' in html, "quiz.js must have defer attribute"
    print("[PASS] index.html includes #package-quiz section and deferred js/quiz.js")

    # CSS styles in additions.css
    with open(ADDITIONS_CSS, "r", encoding="utf-8") as f:
        css = f.read()
    assert ".quiz-card" in css, "additions.css missing .quiz-card"
    assert ".quiz-opt-btn" in css, "additions.css missing .quiz-opt-btn"
    assert ".quiz-result-card" in css, "additions.css missing .quiz-result-card"
    print("[PASS] CSS additions include responsive styles for quiz cards, options, and results")

def test_multilingual_urls_and_hreflangs():
    print("--- Test 4: Dedicated Language URLs (/en/, /si/, /ta/) & Hreflang Tags ---")
    
    lang_pages = {
        "en": (os.path.join(WORKSPACE_DIR, "en", "index.html"), "https://infiniteweb.dev/en/"),
        "si": (os.path.join(WORKSPACE_DIR, "si", "index.html"), "https://infiniteweb.dev/si/"),
        "ta": (os.path.join(WORKSPACE_DIR, "ta", "index.html"), "https://infiniteweb.dev/ta/")
    }

    for lang, (path, canonical_url) in lang_pages.items():
        assert os.path.exists(path), f"Dedicated language page missing: {path}"
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Check html lang attribute
        assert f'lang="{lang}"' in content, f"{path} missing lang='{lang}'"
        
        # Check single h1
        h1_matches = re.findall(r'<h1[\s>]', content)
        assert len(h1_matches) == 1, f"{path} must contain exactly one <h1>, found {len(h1_matches)}"
        
        # Check canonical
        assert f'rel="canonical" href="{canonical_url}"' in content, f"{path} missing canonical {canonical_url}"
        
        # Check bidirectional hreflangs
        assert 'hreflang="en"' in content, f"{path} missing hreflang='en'"
        assert 'hreflang="si"' in content, f"{path} missing hreflang='si'"
        assert 'hreflang="ta"' in content, f"{path} missing hreflang='ta'"
        assert 'hreflang="x-default"' in content, f"{path} missing hreflang='x-default'"
        print(f"[PASS] {lang.upper()} page ({path}) verified: single <h1>, canonical, and 4 bidirectional hreflangs")

    # Check root index.html hreflang tags
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        root_content = f.read()
    assert 'hreflang="en" href="https://infiniteweb.dev/en/"' in root_content, "index.html missing en hreflang"
    assert 'hreflang="si" href="https://infiniteweb.dev/si/"' in root_content, "index.html missing si hreflang"
    assert 'hreflang="ta" href="https://infiniteweb.dev/ta/"' in root_content, "index.html missing ta hreflang"
    assert 'hreflang="x-default" href="https://infiniteweb.dev/"' in root_content, "index.html missing x-default hreflang"
    print("[PASS] Root index.html contains all 4 bidirectional hreflang links")

def test_newsletter_and_review_features():
    print("--- Test 5: Interactive Newsletter Subscription & Client Review Modal ---")
    
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Newsletter section
    assert 'id="newsletter"' in html, "index.html missing #newsletter section"
    assert 'id="newsletterForm"' in html, "index.html missing #newsletterForm"
    assert 'id="newsletterEmail"' in html, "index.html missing #newsletterEmail"
    assert 'id="btnNewsletterSubmit"' in html, "index.html missing #btnNewsletterSubmit"
    print("[PASS] Newsletter subscription section and form verified in index.html")

    # 2. Client Review elements
    assert 'id="btnOpenReviewModal"' in html, "index.html missing #btnOpenReviewModal button"
    assert 'id="clientReviewModal"' in html, "index.html missing #clientReviewModal dialog"
    assert 'id="clientReviewForm"' in html, "index.html missing #clientReviewForm"
    assert 'id="starRatingPicker"' in html, "index.html missing #starRatingPicker"
    print("[PASS] Client review modal dialog and star rating picker verified in index.html")

    # 3. Handlers in components.js
    with open(COMPONENTS_JS, "r", encoding="utf-8") as f:
        comp = f.read()
    assert "initNewsletterSubscription" in comp, "components.js missing initNewsletterSubscription"
    assert "initClientReviewModal" in comp, "components.js missing initClientReviewModal"
    assert "infinite_subscribers" in comp, "components.js missing newsletter local storage key"
    assert "infinite_client_reviews" in comp, "components.js missing review local storage key"
    print("[PASS] js/components.js implements newsletter subscription and client review modal handlers")

if __name__ == "__main__":
    print("==================================================")
    print("STARTING PHASE 6 (BONUS FEATURES) VERIFICATION")
    print("==================================================")
    try:
        test_pwa_infrastructure()
        test_bilingual_ai_chatbot()
        test_package_recommender_quiz()
        test_multilingual_urls_and_hreflangs()
        test_newsletter_and_review_features()
        print("==================================================")
        print("ALL PHASE 6 TESTS PASSED SUCCESSFULLY! (5/5 SUITES)")
        print("==================================================")
        sys.exit(0)
    except AssertionError as e:
        print(f"[FAIL] Assertion error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"[ERROR] Unexpected error: {e}")
        sys.exit(1)
