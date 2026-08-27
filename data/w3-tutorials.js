// Infinite Academy — Bespoke Developer Hub & Tutorials Engine
// Original Creative Curriculum by Infinite Creative Web Design

window.ACADEMY_COURSES = {
  "html": {
    "name": "HTML5",
    "icon": "🌐",
    "tagline": "Modern Web Structure & Semantics",
    "badge": "Frontend Core",
    "color": "#04AA6D",
    "sections": [
      {
        "title": "1. Foundations of HTML5",
        "lessons": [
          {
            "id": "html_intro",
            "title": "HTML5 Architecture & Boilerplate",
            "readTime": "4 min read",
            "summary": "Learn how the modern web is structured using semantic HTML5 markup.",
            "content": "\n              <p class=\"lead\">HTML5 is the universal foundation of every website on the planet. It organizes content into a logical, accessible Document Object Model (DOM) that browsers and search engines can interpret.</p>\n\n              <div class=\"pro-tip-card\">\n                <div class=\"pro-tip-header\">\n                  <span class=\"pro-badge\">💡 Agency Best Practice</span>\n                  <strong>Mobile-First Viewport & SEO Readiness</strong>\n                </div>\n                <p>Always declare <code>&lt;!DOCTYPE html&gt;</code> and include <code>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</code>. Without the viewport meta tag, mobile devices will render your website zoomed out as a desktop layout.</p>\n              </div>\n\n              <h3>Modern HTML5 Boilerplate</h3>\n              <p>Every production-ready web application starts with this clean semantic layout:</p>\n            ",
            "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Modern Web Application</title>\n  <style>\n    body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; }\n    .hero-card { background: #1e293b; border: 1px solid #334155; padding: 30px; border-radius: 12px; }\n    h1 { color: #04AA6D; margin-top: 0; }\n    .btn { background: #04AA6D; color: white; padding: 10px 20px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }\n  </style>\n</head>\n<body>\n\n  <div class=\"hero-card\">\n    <h1>🚀 Welcome to Infinite Academy</h1>\n    <p>Built with clean HTML5 semantics, responsive CSS, and modern web architecture.</p>\n    <button class=\"btn\" onclick=\"alert('Welcome to Modern Web Engineering!')\">Explore Interactive Courses</button>\n  </div>\n\n</body>\n</html>",
            "keyTakeaways": [
              "<code>&lt;!DOCTYPE html&gt;</code> tells the browser to use the modern HTML5 standard rendering mode.",
              "<code>&lt;html lang='en'&gt;</code> declares the page language for screen readers and search engines.",
              "The <code>&lt;head&gt;</code> contains metadata, while <code>&lt;body&gt;</code> contains all visible interface elements."
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
              "explanation": "The viewport tag is the cornerstone of responsive design. It ensures pixels scale 1:1 on smartphones."
            }
          },
          {
            "id": "html_semantics",
            "title": "Semantic Elements & Accessibility",
            "readTime": "5 min read",
            "summary": "Structure your pages with semantic tags that search engines and screen readers love.",
            "content": "\n              <p class=\"lead\">Semantic HTML conveys meaning to humans, web crawlers, and assistive technologies rather than just acting as generic division boxes.</p>\n\n              <div class=\"comparison-grid\">\n                <div class=\"comp-col old\">\n                  <div class=\"comp-title\">❌ Non-Semantic (Old Way)</div>\n                  <pre><code>&lt;div class=\"header\"&gt;...&lt;/div&gt;\n&lt;div class=\"nav\"&gt;...&lt;/div&gt;\n&lt;div class=\"main-content\"&gt;...&lt;/div&gt;\n&lt;div class=\"footer\"&gt;...&lt;/div&gt;</code></pre>\n                </div>\n                <div class=\"comp-col modern\">\n                  <div class=\"comp-title\">✅ Modern Semantic HTML5</div>\n                  <pre><code>&lt;header&gt;...&lt;/header&gt;\n&lt;nav&gt;...&lt;/nav&gt;\n&lt;main&gt;...&lt;/main&gt;\n&lt;footer&gt;...&lt;/footer&gt;</code></pre>\n                </div>\n              </div>\n\n              <h3>Key Semantic Landmarks:</h3>\n              <table class=\"modern-table\">\n                <tr><th>Tag</th><th>Semantic Meaning</th><th>SEO & Accessibility Value</th></tr>\n                <tr><td><code>&lt;header&gt;</code></td><td>Introductory branding or navigation container</td><td>High visual anchor</td></tr>\n                <tr><td><code>&lt;nav&gt;</code></td><td>Primary navigation links</td><td>Screen reader jump point</td></tr>\n                <tr><td><code>&lt;main&gt;</code></td><td>The dominant central content of the document</td><td>Only 1 allowed per page</td></tr>\n                <tr><td><code>&lt;section&gt;</code></td><td>Standalone thematic group of content with heading</td><td>Google snippet indexing</td></tr>\n                <tr><td><code>&lt;article&gt;</code></td><td>Self-contained, independently shareable content</td><td>Blog/News indexing</td></tr>\n                <tr><td><code>&lt;aside&gt;</code></td><td>Indirectly related sidebar or callout content</td><td>Secondary relevance</td></tr>\n                <tr><td><code>&lt;footer&gt;</code></td><td>Legal, copyright, and secondary links</td><td>Site-wide footer context</td></tr>\n              </table>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody { font-family: sans-serif; background: #0f172a; color: #fff; margin:0; padding:20px; }\nheader, nav, main, footer { background: #1e293b; border: 1px solid #334155; padding: 15px; margin-bottom: 12px; border-radius: 8px; }\nnav a { color: #04AA6D; margin-right: 15px; text-decoration: none; font-weight: bold; }\n</style>\n</head>\n<body>\n\n<header>\n  <h2>Infinite Design Studio</h2>\n</header>\n\n<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">Packages</a>\n  <a href=\"#\">Portfolio</a>\n  <a href=\"#\">Contact</a>\n</nav>\n\n<main>\n  <h3>Crafting World-Class Digital Experiences</h3>\n  <p>Semantic layouts allow search engines to rank your pages faster and screen readers to parse your interface effortlessly.</p>\n</main>\n\n<footer>\n  <small>&copy; 2026 Infinite Creative Web Design. All rights reserved.</small>\n</footer>\n\n</body>\n</html>",
            "keyTakeaways": [
              "Semantic tags give meaning to content for superior SEO and accessibility.",
              "Use exactly one <code>&lt;main&gt;</code> element per page.",
              "Wrap independent reusable content (e.g. blog posts, cards) in <code>&lt;article&gt;</code>."
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
              "explanation": "The <main> tag represents the unique primary content of the document and must appear only once."
            }
          },
          {
            "id": "html_forms",
            "title": "Modern Interactive Forms & Validation",
            "readTime": "6 min read",
            "summary": "Build high-converting, mobile-friendly forms with native HTML5 input validation.",
            "content": "\n              <p class=\"lead\">Forms are how websites turn visitors into paying clients. HTML5 provides built-in client-side validation attributes like <code>required</code>, <code>pattern</code>, <code>min</code>, <code>max</code>, and specialized input types.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody { font-family: 'Segoe UI', sans-serif; background: #0b0f19; color: #f8fafc; padding: 24px; }\n.form-box { max-width: 450px; background: #1e293b; border: 1px solid #334155; padding: 24px; border-radius: 12px; }\nlabel { display: block; margin-top: 12px; font-weight: 600; font-size: 14px; color: #94a3b8; }\ninput, select, textarea { width: 100%; padding: 10px; margin-top: 6px; background: #0f172a; border: 1px solid #475569; border-radius: 6px; color: #fff; box-sizing: border-box; }\ninput:focus, select:focus, textarea:focus { border-color: #04AA6D; outline: none; }\n.submit-btn { width: 100%; margin-top: 18px; padding: 12px; background: #04AA6D; color: white; font-weight: bold; border: none; border-radius: 6px; cursor: pointer; }\n.submit-btn:hover { background: #038c59; }\n</style>\n</head>\n<body>\n\n<div class=\"form-box\">\n  <h3 style=\"margin-top:0; color:#04AA6D;\">Get Project Quote</h3>\n  <form onsubmit=\"event.preventDefault(); alert('Inquiry sent successfully!');\">\n    <label for=\"name\">Your Name *</label>\n    <input type=\"text\" id=\"name\" required placeholder=\"e.g. Kasun Fernando\">\n\n    <label for=\"email\">Email Address *</label>\n    <input type=\"email\" id=\"email\" required placeholder=\"name@company.com\">\n\n    <label for=\"pkg\">Select Website Package</label>\n    <select id=\"pkg\">\n      <option>Starter Package (Rs. 5,000/-)</option>\n      <option>Standard Package (Rs. 10,000/-)</option>\n      <option selected>Professional Package (Rs. 20,000/-)</option>\n      <option>E-Commerce Store (Rs. 60,000/-)</option>\n    </select>\n\n    <button type=\"submit\" class=\"submit-btn\">Send Inquiry</button>\n  </form>\n</div>\n\n</body>\n</html>",
            "keyTakeaways": [
              "<code>type='email'</code> and <code>type='tel'</code> trigger optimized mobile keyboards on iPhones and Android.",
              "<code>required</code> provides immediate native browser validation before submission."
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
              "explanation": "type='email' triggers the mobile keyboard with @ and .com keys."
            }
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
        "title": "1. Modern CSS Layouts",
        "lessons": [
          {
            "id": "css_flexbox",
            "title": "Mastering CSS Flexbox",
            "readTime": "5 min read",
            "summary": "Build flexible, responsive 1-dimensional layouts with intuitive alignment.",
            "content": "\n              <p class=\"lead\">Flexbox is the modern industry standard for aligning navigation bars, hero layouts, button groups, and cards along a single direction.</p>\n\n              <div class=\"pro-tip-card\">\n                <div class=\"pro-tip-header\">\n                  <span class=\"pro-badge\">⚡ Instant Centering</span>\n                  <strong>The Ultimate 3-Line Center</strong>\n                </div>\n                <pre><code>display: flex;\njustify-content: center; /* Horizontal */\nalign-items: center;     /* Vertical */</code></pre>\n              </div>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody { background: #0b0f19; font-family: sans-serif; padding: 20px; color: #fff; }\n.nav-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #1e293b;\n  padding: 14px 24px;\n  border-radius: 12px;\n  border: 1px solid #334155;\n}\n.nav-links { display: flex; gap: 20px; }\n.nav-links a { color: #94a3b8; text-decoration: none; font-weight: 600; }\n.nav-links a:hover { color: #04AA6D; }\n.cta { background: #04AA6D; color: #fff; padding: 8px 18px; border-radius: 50px; font-weight: bold; text-decoration: none; }\n</style>\n</head>\n<body>\n\n<div class=\"nav-bar\">\n  <div style=\"font-weight:bold; font-size:18px; color:#04AA6D;\">INFINITE</div>\n  <div class=\"nav-links\">\n    <a href=\"#\">Home</a>\n    <a href=\"#\">Packages</a>\n    <a href=\"#\">Work</a>\n  </div>\n  <a href=\"#\" class=\"cta\">Let's Talk</a>\n</div>\n\n</body>\n</html>",
            "keyTakeaways": [
              "<code>justify-content</code> controls main-axis spacing (e.g. space-between).",
              "<code>align-items</code> controls cross-axis vertical alignment.",
              "<code>gap: 16px;</code> effortlessly spaces children without ugly margin overrides."
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
            "content": "\n              <p class=\"lead\">CSS Grid gives you full two-dimensional layout power across rows and columns simultaneously.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody { background: #0b0f19; font-family: sans-serif; padding: 24px; color: #fff; }\n.grid-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 16px;\n}\n.card {\n  background: #1e293b;\n  border: 1px solid #334155;\n  border-radius: 12px;\n  padding: 24px;\n  transition: transform 0.3s, border-color 0.3s;\n}\n.card:hover {\n  transform: translateY(-4px);\n  border-color: #04AA6D;\n  box-shadow: 0 10px 25px rgba(4,170,109,0.2);\n}\n.price { font-size: 24px; font-weight: bold; color: #04AA6D; margin: 10px 0; }\n</style>\n</head>\n<body>\n\n<h2>Responsive Pricing Grid</h2>\n<div class=\"grid-cards\">\n  <div class=\"card\">\n    <h3>Starter</h3>\n    <div class=\"price\">Rs. 5,000/-</div>\n    <p>3 Pages • Mobile Ready</p>\n  </div>\n  <div class=\"card\">\n    <h3>Standard</h3>\n    <div class=\"price\">Rs. 10,000/-</div>\n    <p>5 Pages • Admin Panel</p>\n  </div>\n  <div class=\"card\">\n    <h3>Professional</h3>\n    <div class=\"price\">Rs. 20,000/-</div>\n    <p>Custom UI • Full SEO</p>\n  </div>\n  <div class=\"card\">\n    <h3>E-Commerce</h3>\n    <div class=\"price\">Rs. 60,000/-</div>\n    <p>Payment Gateway • Store</p>\n  </div>\n</div>\n\n</body>\n</html>",
            "keyTakeaways": [
              "<code>repeat(auto-fit, minmax(220px, 1fr))</code> makes grids self-responsive without single media queries.",
              "Hover transforms and transitions elevate user engagement."
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
        "title": "1. Core Modern JavaScript (ES6+)",
        "lessons": [
          {
            "id": "js_async_fetch",
            "title": "Async / Await & Fetch API",
            "readTime": "5 min read",
            "summary": "Learn how modern web applications load live data in the background without refreshing.",
            "content": "\n              <p class=\"lead\">Modern web applications communicate with cloud databases and REST APIs using <code>async / await</code> and the native <code>fetch()</code> method.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }\n.btn { background: #04AA6D; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }\n.quote-box { margin-top: 15px; padding: 16px; background: #1e293b; border-left: 4px solid #04AA6D; border-radius: 6px; min-height: 40px; }\n</style>\n</head>\n<body>\n\n<h2>Live Async API Fetcher</h2>\n<button class=\"btn\" onclick=\"fetchLiveQuote()\">⚡ Fetch Tech Quote</button>\n\n<div class=\"quote-box\" id=\"quoteText\">Click button to fetch from API asynchronously...</div>\n\n<script>\nasync function fetchLiveQuote() {\n  const box = document.getElementById('quoteText');\n  box.textContent = \"Fetching from remote server...\";\n\n  try {\n    // Simulated realistic API latency\n    await new Promise(r => setTimeout(r, 600));\n    \n    const quotes = [\n      \"Simplicity is prerequisite for reliability. — Edsger W. Dijkstra\",\n      \"Make it work, make it right, make it fast. — Kent Beck\",\n      \"Design is intelligence made visible. — Infinite Creative\",\n      \"Code is like humor. When you have to explain it, it’s bad.\"\n    ];\n    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];\n    box.innerHTML = \"<strong>Result:</strong> \" + randomQuote;\n  } catch (err) {\n    box.textContent = \"Failed to load data: \" + err.message;\n  }\n}\n</script>\n\n</body>\n</html>",
            "keyTakeaways": [
              "<code>async / await</code> enables synchronous-looking code for asynchronous operations.",
              "Always wrap async network calls in <code>try { ... } catch(err) { ... }</code> for bulletproof error handling."
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
        "title": "1. Python Fundamentals",
        "lessons": [
          {
            "id": "py_basics",
            "title": "Python Data Structures & Automation",
            "readTime": "4 min read",
            "summary": "Discover lists, dictionaries, and list comprehensions for rapid automation.",
            "content": "\n              <p class=\"lead\">Python is loved worldwide for its expressive, clean syntax and powerful standard library.</p>\n            ",
            "code": "# Python 3 Agency Automation Script\n\nprojects = [\n    {\"client\": \"Lanka Logistics\", \"budget\": 60000, \"status\": \"Completed\"},\n    {\"client\": \"Southern Tours\", \"budget\": 20000, \"status\": \"In Progress\"},\n    {\"client\": \"Colombo Cafe\", \"budget\": 15000, \"status\": \"Completed\"}\n]\n\n# Calculate total completed revenue\ncompleted_revenue = sum(p[\"budget\"] for p in projects if p[\"status\"] == \"Completed\")\n\nprint(\"=== Infinite Agency Performance ===\")\nfor p in projects:\n    print(f\"• {p['client']}: Rs. {p['budget']:,}/- [{p['status']}]\")\n\nprint(f\"\nTotal Completed Revenue: Rs. {completed_revenue:,}/-\")\n",
            "keyTakeaways": [
              "List comprehensions and generator expressions allow clean 1-line filtering and aggregation.",
              "f-strings (<code>f'{value:,}'</code>) provide clean number and text formatting."
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
        "title": "1. Relational Database Queries",
        "lessons": [
          {
            "id": "sql_queries",
            "title": "Advanced SELECT & Filtering Queries",
            "readTime": "4 min read",
            "summary": "Query relational databases with high-performance SQL filters and joins.",
            "content": "\n              <p class=\"lead\">Structured Query Language (SQL) is the universal tool for reading, writing, and organizing data in MySQL, PostgreSQL, and SQLite.</p>\n            ",
            "code": "-- SQL Query: Get High-Value Clients in Sri Lanka\nSELECT \n    client_id,\n    company_name,\n    package_type,\n    amount_paid,\n    created_at\nFROM clients\nWHERE country = 'Sri Lanka' \n  AND amount_paid >= 20000\nORDER BY amount_paid DESC;\n",
            "keyTakeaways": [
              "<code>SELECT</code> defines the columns to return.",
              "<code>WHERE</code> filters rows based on criteria.",
              "<code>ORDER BY col DESC</code> sorts records in descending order."
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
              "explanation": "ORDER BY is used to sort the result set in ascending or descending order."
            }
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
        "title": "1. Server-Side PHP Engineering",
        "lessons": [
          {
            "id": "php_backend",
            "title": "Dynamic Templates & Data Processing",
            "readTime": "4 min read",
            "summary": "Harness PHP to render dynamic web pages and handle backend business logic.",
            "content": "\n              <p class=\"lead\">PHP powers over 75% of the web, including WordPress, Laravel, and enterprise portals.</p>\n            ",
            "code": "<?php\n// PHP 8+ Modern Associative Arrays & Rendering\n$site_config = [\n    \"brand\" => \"Infinite Creative Web Design\",\n    \"location\" => \"Tangalle, Sri Lanka\",\n    \"experience\" => 12\n];\n\nfunction getPackageTier(int $budget): string {\n    return match (true) {\n        $budget >= 60000 => \"E-Commerce Online Store\",\n        $budget >= 20000 => \"Corporate Professional\",\n        $budget >= 10000 => \"Standard Business\",\n        default => \"Starter Package\"\n    };\n}\n\n$client_budget = 20000;\n$recommended_tier = getPackageTier($client_budget);\n\necho \"<h1>Welcome to {$site_config['brand']}</h1>\";\necho \"<p>Based in {$site_config['location']} ({$site_config['experience']}+ years exp).</p>\";\necho \"<p>For Rs. \" . number_format($client_budget) . \"/-, recommended tier: <strong>$recommended_tier</strong></p>\";\n?>",
            "keyTakeaways": [
              "PHP 8 <code>match</code> expressions provide clean, type-safe condition matching.",
              "Variables are prefixed with <code>$</code> and embedded directly into double-quoted strings."
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
              "explanation": "All PHP variables must start with a dollar sign ($)."
            }
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
        "title": "1. Modern React & Hooks",
        "lessons": [
          {
            "id": "react_hooks",
            "title": "State Management with useState & Props",
            "readTime": "5 min read",
            "summary": "Build reactive components with declarative JSX and React Hooks.",
            "content": "\n              <p class=\"lead\">React empowers developers to build modular, component-driven User Interfaces with lightning fast Virtual DOM updates.</p>\n            ",
            "code": "import React, { useState } from 'react';\n\nfunction PricingApp() {\n  const [selectedPlan, setSelectedPlan] = useState('Professional');\n  const plans = [\n    { name: 'Starter', price: 5000 },\n    { name: 'Professional', price: 20000 },\n    { name: 'E-Commerce', price: 60000 }\n  ];\n\n  return (\n    <div style={{ padding: '24px', background: '#0b0f19', color: '#fff', borderRadius: '12px' }}>\n      <h2 style={{ color: '#04AA6D' }}>Infinite React Configurator</h2>\n      <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>\n        {plans.map(p => (\n          <button\n            key={p.name}\n            onClick={() => setSelectedPlan(p.name)}\n            style={{\n              padding: '10px 16px',\n              background: selectedPlan === p.name ? '#04AA6D' : '#1e293b',\n              color: '#fff',\n              border: '1px solid #334155',\n              borderRadius: '6px',\n              cursor: 'pointer'\n            }}\n          >\n            {p.name}\n          </button>\n        ))}\n      </div>\n      <p>Active Choice: <strong>{selectedPlan}</strong></p>\n    </div>\n  );\n}\n\nexport default PricingApp;",
            "keyTakeaways": [
              "<code>useState</code> manages dynamic reactive values in functional components.",
              "Array <code>.map()</code> generates dynamic lists of elements with unique <code>key</code> props."
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
              "explanation": "useState is the core hook for managing reactive component state."
            }
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
        "title": "1. Essential Git Workflows",
        "lessons": [
          {
            "id": "git_workflow",
            "title": "Branching, Committing & GitHub Deployment",
            "readTime": "4 min read",
            "summary": "Master team collaboration, branching, and automated deployments with Git.",
            "content": "\n              <p class=\"lead\">Git is the industry standard for tracking code changes, collaborating across teams, and triggering automated CI/CD deployments.</p>\n            ",
            "code": "# The Professional 4-Step Git Workflow\n\n# 1. Create and switch to a feature branch\ngit checkout -b feature/pricing-engine\n\n# 2. Stage modified files\ngit add .\n\n# 3. Create descriptive conventional commit\ngit commit -m \"feat(pricing): add dedicated packages page and seo schema\"\n\n# 4. Push branch and open Pull Request\ngit push origin feature/pricing-engine\n",
            "keyTakeaways": [
              "Use feature branches to keep the <code>main</code> branch clean and production-ready.",
              "Write clear, conventional commit messages (<code>feat:</code>, <code>fix:</code>, <code>docs:</code>)."
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
window.W3_TUTORIALS = window.ACADEMY_COURSES;
