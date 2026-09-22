"""
Verification script for Admin Panel Audience & Customer Engagement Hub
(Newsletter Subscribers & Client Reviews Moderation)
"""
import os
import re

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def test_admin_dashboard_markup():
    dashboard_path = os.path.join(REPO_DIR, 'admin', 'dashboard.html')
    assert os.path.exists(dashboard_path), "admin/dashboard.html missing"
    with open(dashboard_path, 'r', encoding='utf-8') as f:
        html = f.read()

    required_ids = [
        'audienceHub',
        'badgeSubscribersCount',
        'inputSearchSubscribers',
        'btnAddSubscriber',
        'btnExportSubscribers',
        'subscribersListContainer',
        'badgeAvgRating',
        'countReviewsAll',
        'countReviewsApproved',
        'countReviewsPending',
        'btnExportReviews',
        'reviewsListContainer',
        'toast'
    ]

    for req_id in required_ids:
        assert f'id="{req_id}"' in html, f"admin/dashboard.html missing element with id='{req_id}'"

    print(f"[PASS] admin/dashboard.html contains all {len(required_ids)} required Engagement Hub elements")

def test_dashboard_js_functions():
    js_path = os.path.join(REPO_DIR, 'js', 'dashboard.js')
    assert os.path.exists(js_path), "js/dashboard.js missing"
    with open(js_path, 'r', encoding='utf-8') as f:
        js = f.read()

    required_symbols = [
        'loadSubscribers',
        'renderSubscribers',
        'exportSubscribersCSV',
        'deleteSubscriber',
        'addSubscriber',
        'loadClientReviews',
        'renderReviews',
        'toggleReviewStatus',
        'deleteReview',
        'exportReviewsJSON',
        'setupEngagementListeners',
        'toast',
        'escapeHTML'
    ]

    for sym in required_symbols:
        assert sym in js, f"js/dashboard.js missing function or symbol '{sym}'"

    print(f"[PASS] js/dashboard.js implements all {len(required_symbols)} subscriber and review moderation functions")

def test_firestore_rules_security():
    rules_path = os.path.join(REPO_DIR, 'firestore.rules')
    assert os.path.exists(rules_path), "firestore.rules missing"
    with open(rules_path, 'r', encoding='utf-8') as f:
        rules = f.read()

    assert 'match /newsletter_subscribers/{doc}' in rules, "Missing rule for newsletter_subscribers"
    assert 'match /client_reviews/{doc}' in rules, "Missing rule for client_reviews"
    assert 'isValidString(request.resource.data.email' in rules, "Missing email validation in newsletter_subscribers rule"
    assert 'request.resource.data.rating is number' in rules, "Missing numeric rating validation in client_reviews rule"

    print("[PASS] firestore.rules strictly guards newsletter_subscribers and client_reviews")

if __name__ == '__main__':
    print("=" * 60)
    print("RUNNING AUDIENCE ENGAGEMENT HUB VERIFICATION TESTS")
    print("=" * 60)
    test_admin_dashboard_markup()
    test_dashboard_js_functions()
    test_firestore_rules_security()
    print("=" * 60)
    print("ALL AUDIENCE ENGAGEMENT HUB TESTS PASSED (3/3)")
    print("=" * 60)
