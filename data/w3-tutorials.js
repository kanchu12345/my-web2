window.ACADEMY_COURSES = {
  "html": {
    "name": "HTML5",
    "icon": "🌐",
    "tagline": "Modern Web Structure & Semantics",
    "badge": "Frontend Core",
    "color": "#04AA6D",
    "sections": [
      {
        "title": "1. HTML5 Master Curriculum",
        "lessons": [
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
              "options": [
                "Unlimited",
                "As many as sections",
                "Exactly one",
                "None"
              ],
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
              "options": [
                "type='text'",
                "type='email'",
                "type='mail'",
                "type='input'"
              ],
              "answer": 1,
              "explanation": "type='email' provides mobile keyboards with @ and .com buttons."
            }
          },
          {
            "id": "html_html_home",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/html/default.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<!DOCTYPE html>\n<html><head><title>Page Title</title>\n</head><body><h1>This is a Heading</h1><p>This is a paragraph.</p>\n</body></html>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "html_html_introduction",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/html/html_intro.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<!DOCTYPE html>\n<html><head><title>Page Title</title>\n </head>\n<body><h1>My First Heading</h1><p>My first paragraph.</p>\n    </body></html>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "html_html_editors",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/html/html_editors.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<!DOCTYPE html><html><body><h1>My First Heading</h1>\n<p>My first paragraph.</p></body></html>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "html_html_basic",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/html/html_basic.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "html_code_challenge",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/html/html_challenges_basic.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "/* W3Schools Tutorials Example */\nconsole.log('Learning Tutorials');",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "html_html_elements",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/html/html_elements.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<!DOCTYPE html>\n<html><body>\n <h1>My First Heading</h1><p>My first paragraph.</p>\n</body></html>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "html_html_attributes",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/html/html_attributes.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<a href=\"https://www.w3schools.com\">Visit W3Schools</a>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          }
        ]
      }
    ]
  },
  "css": {
    "name": "CSS3",
    "icon": "🎨",
    "tagline": "Modern UI Engineering & Responsive Layouts",
    "badge": "Styling & Motion",
    "color": "#264DE4",
    "sections": [
      {
        "title": "1. CSS3 Master Curriculum",
        "lessons": [
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
              "options": [
                "margin-between",
                "gap",
                "spacing",
                "flex-margin"
              ],
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
          },
          {
            "id": "css_css_home",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/css/default.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "body\n{  background-color: lightblue;}\nh1\n{\n  color: white;\n  text-align: center;\n}\np\n{\n   \nfont-family: verdana;\n  font-size: 20px;\n}",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "css_css_introduction",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/css/css_intro.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "/* W3Schools Tutorials Example */\nconsole.log('Learning Tutorials');",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "css_css_syntax",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/css/css_syntax.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "p\n{\n  color: red;\n  text-align: center;\n}",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "css_css_selectors",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/css/css_selectors.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "p\n{\n  text-align: center;\n  color: red;\n}",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "css_grouping_selectors",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/css/css_selectors_grouping.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "*\n{\n  text-align: center;\n  color: blue;\n}",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "css_code_challenge",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/css/css_challenges_selectors.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "/* W3Schools Tutorials Example */\nconsole.log('Learning Tutorials');",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "css_css_how_to",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/css/css_howto.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<!DOCTYPE html><html><head><link rel=\"stylesheet\" href=\"mystyle.css\"></head><body><h1>This is a heading</h1>\n  <p>This is a paragraph.</p></body></html>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "css_add_internal_css",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/css/css_howto_internal.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<!DOCTYPE html><html><head><style>body {  \n  background-color: linen;}h1 {  color: maroon;  \n  margin-left: 40px;} </style></head><body><h1>This is a \n  heading</h1><p>This is a paragraph.</p></body></html>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          }
        ]
      }
    ]
  },
  "js": {
    "name": "JavaScript",
    "icon": "⚡",
    "tagline": "Dynamic Frontend Engineering & Async APIs",
    "badge": "Programming",
    "color": "#F7DF1E",
    "sections": [
      {
        "title": "1. JavaScript Master Curriculum",
        "lessons": [
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
              "options": [
                "pause",
                "wait",
                "await",
                "defer"
              ],
              "answer": 2,
              "explanation": "The 'await' keyword waits for the Promise to complete and returns its resolved value."
            }
          },
          {
            "id": "js_js_home",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/js/default.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "/* W3Schools Tutorials Example */\nconsole.log('Learning Tutorials');",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "js_js_introduction",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/js/js_intro.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "document.getElementById(\"demo\").innerHTML = \"Hello JavaScript\";",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "js_js_where_to",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/js/js_whereto.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<script>\ndocument.getElementById(\"demo\").innerHTML = \"My First JavaScript\";\n</script>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "js_js_output",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/js/js_output.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<!DOCTYPE html><html>\n<body>\n\n<h1>My First Web Page</h1>\n <p>My First Paragraph</p>\n<p id=\"demo\"></p>\n\n<script>\n document.getElementById(\"demo\").innerHTML = \"<h2>Hello World</h2>\";\n    </script>\n\n</body>\n</html>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "js_js_syntax",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/js/js_syntax.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "10.50\n1001",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "js_js_statements",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/js/js_statements.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "let x, y, z;    // Statement 1\nx = 5;          // Statement 2\ny = 6;          // Statement 3\nz = x + y;      //  Statement 4",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "js_js_comments",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/js/js_comments.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "// Change heading:\ndocument.getElementById(\"myH\").innerHTML = \"My First Page\";\n// Change paragraph:\ndocument.getElementById(\"myP\").innerHTML = \"My first paragraph.\";",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "js_js_variables",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/js/js_variables.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "let x = 5;\nlet y = 6;\nlet z = x + y;",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          }
        ]
      }
    ]
  },
  "python": {
    "name": "Python",
    "icon": "🐍",
    "tagline": "Clean Scripting, AI & Data Science",
    "badge": "Backend & AI",
    "color": "#3776AB",
    "sections": [
      {
        "title": "1. Python Master Curriculum",
        "lessons": [
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
              "options": [
                "//",
                "#",
                "--",
                "/*"
              ],
              "answer": 1,
              "explanation": "# marks the start of a comment in Python."
            }
          },
          {
            "id": "python_python_home",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/python/default.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "print(\"Hello, World!\")",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "python_python_intro",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/python/python_intro.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "print(\"Hello, World!\")",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "python_python_get_started",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/python/python_getstarted.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "print(\"Hello, World!\")",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "python_python_syntax",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/python/python_syntax.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": ">>> print(\"Hello, World!\")\n    Hello, World!",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "python_statements",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/python/python_statements.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "print(\"Python is fun!\")",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "python_code_challenge",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/python/python_challenges_statements.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "/* W3Schools Tutorials Example */\nconsole.log('Learning Tutorials');",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "python_python_output",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/python/python_output.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "print(\"Hello World!\")",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "python_print_numbers",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/python/python_output_numbers.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "print(3)\n    print(358)\n    print(50000)",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          }
        ]
      }
    ]
  },
  "sql": {
    "name": "SQL",
    "icon": "🗄️",
    "tagline": "Database Querying & Relational Architecture",
    "badge": "Database",
    "color": "#00758F",
    "sections": [
      {
        "title": "1. SQL Master Curriculum",
        "lessons": [
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
              "options": [
                "SORT BY",
                "ORDER BY",
                "GROUP BY",
                "ARRANGE BY"
              ],
              "answer": 1,
              "explanation": "ORDER BY is used to sort the result set."
            }
          },
          {
            "id": "sql_sql_home",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/sql/default.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "SELECT * FROM Customers;",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "sql_sql_intro",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/sql/sql_intro.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "SELECT * FROM Customers;",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "sql_sql_syntax",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/sql/sql_syntax.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "SELECT * FROM Customers;",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "sql_sql_select",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/sql/sql_select.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "SELECT CustomerName, City FROM Customers;",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "sql_sql_select_distinct",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/sql/sql_distinct.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "SELECT DISTINCT Country FROM Customers;",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "sql_sql_where",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/sql/sql_where.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "SELECT * FROM Customers\nWHERE Country = 'Mexico';",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "sql_sql_order_by",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/sql/sql_orderby.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "SELECT * FROM Products\n ORDER BY Price;",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "sql_sql_and",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/sql/sql_and.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "SELECT *\n FROM Customers\n WHERE Country = 'Spain' AND CustomerName LIKE 'G%';",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          }
        ]
      }
    ]
  },
  "php": {
    "name": "PHP",
    "icon": "🐘",
    "tagline": "Modern Server-Side Architecture & APIs",
    "badge": "Backend",
    "color": "#777BB4",
    "sections": [
      {
        "title": "1. PHP Master Curriculum",
        "lessons": [
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
              "options": [
                "@",
                "&",
                "$",
                "#"
              ],
              "answer": 2,
              "explanation": "All PHP variables begin with a dollar sign ($)."
            }
          },
          {
            "id": "php_php_home",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/php/default.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n \n<?php\necho 'My first PHP script!';\n?>\n\n</body>\n</html>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "php_php_intro",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/php/php_intro.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "/* W3Schools Tutorials Example */\nconsole.log('Learning Tutorials');",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "php_php_install",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/php/php_install.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "echo phpversion();",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "php_php_syntax",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/php/php_syntax.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<?php\n// PHP code goes here\n?>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "php_php_comments",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/php/php_comments.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "// This is a single-line comment\n# This is also a single-line comment\n\n/* This is a\nmulti-line\ncomment */",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "php_php_multiline_comments",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/php/php_comments_multiline.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "/* The next statement will\nprint a welcome message */\necho 'Welcome Home!';",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "php_php_variables",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/php/php_variables.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "$x = 5;\n$y = \"John\";",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "php_variables_scope",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/php/php_variables_scope.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "$x = 5; // global scope\n\nfunction myTest() {\n  // using x inside this function will not work\n  echo \"Variable x inside function is: $x\";\n}\nmyTest();\n\necho \"Variable x outside function is: $x\";",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          }
        ]
      }
    ]
  },
  "react": {
    "name": "React",
    "icon": "⚛️",
    "tagline": "Component Architecture & Reactive State",
    "badge": "Frontend UI",
    "color": "#61DAFB",
    "sections": [
      {
        "title": "1. React Master Curriculum",
        "lessons": [
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
              "options": [
                "useEffect",
                "useState",
                "useRef",
                "useMemo"
              ],
              "answer": 1,
              "explanation": "useState is the core hook for managing component state."
            }
          },
          {
            "id": "react_react_home",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/react/default.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "import { createRoot } from 'react-dom/client';\n\nfunction Hello() {\n  return (\n    <h1>Hello World!</h1>\n  );\n}\n\ncreateRoot(document.getElementById('root')).render(\n  <Hello />\n);",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "react_react_intro",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/react/react_intro.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "/* W3Schools Tutorials Example */\nconsole.log('Learning Tutorials');",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "react_react_get_started",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/react/react_getstarted.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "node -v",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "react_react_first_app",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/react/react_first_app.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "import { useState } from 'react'\nimport reactLogo from './assets/react.svg'\nimport viteLogo from './assets/vite.svg'\nimport heroImg from './assets/hero.png'\nimport './App.css'\n\nfunction App() {\n  const [count, setCount] = useState(0)\n\n  return (\n    <>\n      <section id=\"center\">\n        <div className=\"hero\">\n          <img src={heroImg} className=\"base\" width=\"170\" height=\"179\" alt=\"\" />\n          <img src={reactLogo} className=\"framework\" alt=\"React logo\" />\n          <img src={viteLogo} className=\"vite\" alt=\"Vite logo\" />\n        </div>\n        <div>\n          <h1>Get started</h1>\n          <p>\n            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>\n          </p>\n        </div>\n        <button\n          type=\"button\"\n          className=\"counter\"\n          onClick={() => setCount((count) => count + 1)}\n        >\n          Count is {count}\n        </button>\n      </section>\n\n      <div className=\"ticks\"></div>\n\n      <section id=\"next-steps\">\n        <div id=\"docs\">\n          <svg className=\"icon\" role=\"presentation\" aria-hidden=\"true\">\n            <use href=\"/icons.svg#documentation-icon\"></use>\n          </svg>\n          <h2>Documentation</h2>\n          <p>Your questions, answered</p>\n          <ul>\n            <li>\n              <a href=\"https://vite.dev/\" target=\"_blank\">\n                <img className=\"logo\" src={viteLogo} alt=\"\" />\n                Explore Vite\n              </a>\n            </li>\n            <li>\n              <a href=\"https://react.dev/\" target=\"_blank\">\n                <img className=\"button-icon\" src={reactLogo} alt=\"\" />\n                Learn more\n              </a>\n            </li>\n          </ul>\n        </div>\n        <div id=\"social\">\n          <svg className=\"icon\" role=\"presentation\" aria-hidden=\"true\">\n            <use href=\"/icons.svg#social-icon\"></use>\n          </svg>\n          <h2>Connect with us</h2>\n          <p>Join the Vite community</p>\n          <ul>\n            <li>\n              <a href=\"https://github.com/vitejs/vite\" target=\"_blank\">\n                <svg\n                  className=\"button-icon\"\n                  role=\"presentation\"\n                  aria-hidden=\"true\"\n                >\n                  <use href=\"/icons.svg#github-icon\"></use>\n                </svg>\n                GitHub\n              </a>\n            </li>\n            <li>\n              <a href=\"https://chat.vite.dev/\" target=\"_blank\">\n                <svg\n                  className=\"button-icon\"\n                  role=\"presentation\"\n                  aria-hidden=\"true\"\n                >\n                  <use href=\"/icons.svg#discord-icon\"></use>\n                </svg>\n                Discord\n              </a>\n            </li>\n            <li>\n              <a href=\"https://x.com/vite_js\" target=\"_blank\">\n                <svg\n                  className=\"button-icon\"\n                  role=\"presentation\"\n                  aria-hidden=\"true\"\n                >\n                  <use href=\"/icons.svg#x-icon\"></use>\n                </svg>\n                X.com\n              </a>\n            </li>\n            <li>\n              <a href=\"https://bsky.app/profile/vite.dev\" target=\"_blank\">\n                <svg\n                  className=\"button-icon\"\n                  role=\"presentation\"\n                  aria-hidden=\"true\"\n                >\n                  <use href=\"/icons.svg#bluesky-icon\"></use>\n                </svg>\n                Bluesky\n              </a>\n            </li>\n          </ul>\n        </div>\n      </section>\n\n      <div className=\"ticks\"></div>\n      <section id=\"spacer\"></section>\n    </>\n  )\n}\n\nexport default App",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "react_react_render_html",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/react/react_render.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/favicon.svg\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>my-react-app</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "react_react_upgrade",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/react/react_upgrade.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "npm i react@latest react-dom@latest",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "react_react_es6",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/react/react_es6.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "/* W3Schools Tutorials Example */\nconsole.log('Learning Tutorials');",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          },
          {
            "id": "react_es6_classes",
            "title": "Tutorials",
            "summary": "Learn web development, programming, data science, and more....",
            "readTime": "5 min read",
            "content": "<div class=\"lesson-rich-body\">\n<p style=\"font-size:1.1rem; line-height:1.7; color:#f8fafc; font-weight:600;\">Learn web development, programming, data science, and more.</p>\n<p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Learn web development, programming, data science, and more.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Practice and test your skills with different exercises.</p><p style='font-size:1.05rem; line-height:1.7; color:#cbd5e1;'>Tip:Sign into track your progress.</p>\n<div style=\"margin:24px 0; padding:18px; background:rgba(4,170,109,0.08); border-left:4px solid #04AA6D; border-radius:8px;\">\n  <strong style=\"color:#04AA6D;\">📌 W3Schools Pro Tip:</strong>\n  <p style=\"margin-top:6px; color:#e2e8f0; font-size:0.95rem;\">Always practice code examples in the Live Playground below to build muscle memory.</p>\n</div>\n<p style=\"font-size:0.9rem; color:#94a3b8;\">\n  Official Reference: <a href=\"https://www.w3schools.com/react/react_es6_classes.asp\" target=\"_blank\" rel=\"noopener\" style=\"color:#04AA6D; font-weight:600;\">W3Schools Tutorials &rarr;</a>\n</p>\n</div>",
            "code": "class Car {\n  constructor(name) {\n    this.brand = name;\n  }\n}",
            "keyTakeaways": [
              "Understand core concepts of Tutorials.",
              "Practice typing the code in the live playground editor.",
              "Apply best practices for clean and readable code."
            ],
            "challenge": {
              "question": "What is the primary purpose of Tutorials in programming?",
              "options": [
                "To implement Tutorials effectively in modern software.",
                "To slow down browser rendering speed.",
                "To delete database backups automatically.",
                "None of the above"
              ],
              "answer": 0,
              "explanation": "Correct! Tutorials allows developers to build structured, high-performance applications."
            },
            "source": "W3Schools.com"
          }
        ]
      }
    ]
  },
  "git": {
    "name": "Git",
    "icon": "🌿",
    "tagline": "Distributed Version Control & GitHub Workflows",
    "badge": "DevOps",
    "color": "#F05032",
    "sections": [
      {
        "title": "1. Git Master Curriculum",
        "lessons": [
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
              "options": [
                "git branch new",
                "git checkout -b branch-name",
                "git switch create",
                "git make branch"
              ],
              "answer": 1,
              "explanation": "git checkout -b <name> creates and immediately checks out the new branch."
            }
          }
        ]
      }
    ]
  }
};
