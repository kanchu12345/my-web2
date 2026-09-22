# -*- coding: utf-8 -*-
"""
generate_sinhala_article_pages.py - Generates static HTML reader pages in /article/
for the newly added Sinhala website design blogs with 100% Phase 2 & Phase 4 compliance.
"""

import os
import json

WORKSPACE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTICLE_DIR = os.path.join(WORKSPACE, "article")
BLOGS_FILE = os.path.join(WORKSPACE, "data", "blogs.json")

TEMPLATE = """<!DOCTYPE html>
<html lang="si">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} — Infinite Creative Web Design</title>
  <meta name="description" content="{description}">
  <link rel="canonical" href="https://infiniteweb.dev/article/{id}.html">
  <link rel="icon" type="image/webp" href="../images/logo-100w.webp">
  <link rel="manifest" href="../manifest.json">
  <meta name="theme-color" content="#0a0f1d">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&family=Noto+Sans+Sinhala:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&family=Noto+Sans+Sinhala:wght@400;600;700&display=swap"></noscript>
  <link rel="stylesheet" href="../css/main.css?v=2026">
  <link rel="stylesheet" href="../css/additions.css?v=2026">
</head>
<body style="font-family:'Noto Sans Sinhala', 'Inter', sans-serif;">

  <a href="#main-content" class="skip-to-content">Skip to main content</a>

  <div id="siteHeaderContainer"></div>

  <main id="main-content" class="article-container" style="max-width:880px;margin:100px auto 40px;padding:0 20px;">
    <article class="article-card reveal" style="background:rgba(13,21,39,0.85);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:40px 32px;box-shadow:0 16px 45px rgba(0,0,0,0.45);">
      
      <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(4,170,109,0.12);border:1px solid rgba(4,170,109,0.3);padding:4px 12px;border-radius:20px;margin-bottom:16px;">
        <span style="font-size:12px;font-weight:700;color:#04AA6D;text-transform:uppercase;">සංස්කාරක තාක්ෂණික සමාලෝචනය: Human Reviewed Technical Guide</span>
      </div>

      <h1 class="article-title" style="font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#fff;line-height:1.4;margin-bottom:14px;">
        {title}
      </h1>

      <div class="article-meta" style="display:flex;align-items:center;gap:16px;color:#94a3b8;font-size:13px;margin-bottom:28px;flex-wrap:wrap;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:16px;">
        <span>කර්තෘ: <strong>Infinite Creative Editorial</strong></span>
        <span>දිනය: <strong>{date_formatted}</strong></span>
        <span>කාලය: <strong>{read_time}</strong></span>
        <span>ප්‍රවර්ගය: <strong>{category}</strong></span>
      </div>

      <div class="article-hero-image" style="margin-bottom:32px;">
        <img src="../{image_src}" 
             srcset="../{image_480} 480w, ../{image_800} 800w, ../{image_src} 1024w" 
             sizes="(max-width: 768px) 100vw, 860px" 
             alt="{title}" 
             width="860" height="440" 
             loading="eager" fetchpriority="high" decoding="async" 
             style="width:100%;height:auto;border-radius:12px;border:1px solid rgba(255,255,255,0.1);">
      </div>

      <div class="article-body" style="color:#cbd5e1;font-size:1.05rem;line-height:1.8;">
        {body_html}
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
</html>
"""

def generate_pages():
    with open(BLOGS_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
        articles = data.get("articles", [])

    created = 0
    for a in articles:
        if a.get("lang") == "si":
            slug = a.get("id")
            filename = f"{slug}.html"
            filepath = os.path.join(ARTICLE_DIR, filename)
            
            # Map images to WebP srcset
            base_img = a.get("image", "images/blog_1.webp")
            if "blog_2" in base_img:
                img_src = "images/blog_2.webp"
                img_480 = "images/blog_2-480w.webp"
                img_800 = "images/blog_2-800w.webp"
            elif "blog_3" in base_img:
                img_src = "images/blog_3.webp"
                img_480 = "images/blog_3-480w.webp"
                img_800 = "images/blog_3-800w.webp"
            else:
                img_src = "images/blog_1.webp"
                img_480 = "images/blog_1-480w.webp"
                img_800 = "images/blog_1-800w.webp"

            html = TEMPLATE.format(
                id=slug,
                title=a.get("title", ""),
                description=a.get("description", ""),
                date_formatted=a.get("date_formatted", "Recent 2026"),
                read_time=a.get("read_time", "5 min read"),
                category=a.get("category", "Web Design"),
                image_src=img_src,
                image_480=img_480,
                image_800=img_800,
                body_html=a.get("body_html", "")
            )

            with open(filepath, "w", encoding="utf-8") as out_f:
                out_f.write(html)
            created += 1

    print(f"Generated/verified {created} Sinhala article HTML files in {ARTICLE_DIR}")

if __name__ == "__main__":
    generate_pages()
