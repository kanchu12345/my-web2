// Infinite Academy — Bespoke Developer Hub & Tutorials Engine
// Original Creative Curriculum by Infinite Creative Web Design
// Auto-generated and synchronized by Autonomous AI Lesson Bot

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
        "title": "1. JavaScript Core & Modern Web Engineering",
        "lessons": [
          {
            "id": "js_variables",
            "title": "Variables, Constants & Scope (let, const, var)",
            "readTime": "4 min read",
            "summary": "Master modern variable declaration in JavaScript, block scoping, and value mutability.",
            "content": "<p class='lead'>Variables are containers for storing data values. In modern JavaScript (ES6+), we declare variables using <code>const</code> and <code>let</code>, leaving legacy <code>var</code> behind.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Always Default to const</strong></div>\n  <p>Use <code>const</code> for every variable unless you know its value will be reassigned later. When reassignment is strictly needed (like loop counters), use <code>let</code>. Never use <code>var</code> in modern web applications to prevent accidental global hoisting bugs.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>Scope Differences:</h4>\n<ul>\n  <li><code>const</code>: Block-scoped, cannot be reassigned or re-declared.</li>\n  <li><code>let</code>: Block-scoped, can be reassigned but not re-declared in the same scope.</li>\n  <li><code>var</code>: Function-scoped or global, susceptible to hoisting quirks.</li>\n</ul>",
            "content_si": "<p class='lead'>Variables යනු data values තැන්පත් කර තබා ගන්නා containers වේ. Modern JavaScript (ES6+) හිදී variables declare කිරීමට <code>const</code> සහ <code>let</code> භාවිතා කරන අතර, පැරණි <code>var</code> භාවිතය නවතා ඇත.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>සැමවිටම const භාවිතා කරන්න</strong></div>\n  <p>අගය නැවත වෙනස් කිරීමට (reassign) අවශ්‍ය නොවන සෑම අවස්ථාවකදීම <code>const</code> භාවිතා කරන්න. අගය වෙනස් කිරීමට අවශ්‍ය නම් පමණක් (උදාහරණයක් ලෙස loop counters) <code>let</code> භාවිතා කරන්න. Hoisting දෝෂ වැළැක්වීමට නවීන web development වලදී <code>var</code> භාවිතා කිරීමෙන් වළකින්න.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>Scope වල වෙනස්කම්:</h4>\n<ul>\n  <li><code>const</code>: Block-scoped වන අතර, reassign හෝ නැවත declare කළ නොහැක.</li>\n  <li><code>let</code>: Block-scoped වන අතර, reassign කළ හැක නමුත් එකම scope එක තුළ re-declare කළ නොහැක.</li>\n  <li><code>var</code>: Function-scoped හෝ global වන අතර, hoisting නිසා අනවශ්‍ය ගැටළු ඇති විය හැක.</li>\n</ul>",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }\n    .box { background: #1e293b; padding: 15px; border-radius: 8px; border-left: 4px solid #04AA6D; }\n    .val { color: #38bdf8; font-weight: bold; }\n  </style>\n</head>\n<body>\n  <h3>JavaScript Variables Demonstration</h3>\n  <div class=\"box\" id=\"output\">Calculating variables...</div>\n\n  <script>\n    const agencyName = 'Infinite Creative Web Design';\n    const basePrice = 5000; // in LKR\n    let projectCount = 3;\n    let totalRevenue = basePrice * projectCount;\n\n    document.getElementById('output').innerHTML = \n      'Agency: <span class=\"val\">' + agencyName + '</span><br>' +\n      'Projects: <span class=\"val\">' + projectCount + '</span><br>' +\n      'Total Estimated Revenue: <span class=\"val\">Rs. ' + totalRevenue.toLocaleString() + '/-</span>';\n  </script>\n</body>\n</html>",
            "keyTakeaways": [
              "Use const by default for immutable variables and object references.",
              "Use let only when variable values need to be reassigned later.",
              "Avoid var in modern JavaScript to eliminate scope leaks and hoisting bugs."
            ],
            "challenge": {
              "question": "Which JavaScript keyword should you default to for declaring variables that do not get reassigned?",
              "options": [
                "var",
                "let",
                "const",
                "def"
              ],
              "answer": 2,
              "explanation": "const declares block-scoped variables that cannot be reassigned, preventing accidental mutation."
            }
          },
          {
            "id": "js_datatypes",
            "title": "Primitive Data Types & Dynamic Typing",
            "readTime": "4 min read",
            "summary": "Understand JavaScript's primitive types: String, Number, Boolean, Null, Undefined, BigInt, and Symbol.",
            "content": "<p class='lead'>JavaScript is a dynamically typed language. This means you do not need to specify the data type of a variable upon creation—the JavaScript engine detects it automatically at runtime.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Strict Type Checking with typeof</strong></div>\n  <p>Use the <code>typeof</code> operator to verify user input and API responses before processing data in financial calculations or checkout forms.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>JavaScript Primitive Types:</h4>\n<ul>\n  <li><code>String</code>: Textual data wrapped in quotes (<code>'hello'</code>, <code>\"world\"</code>, <code>`template`</code>).</li>\n  <li><code>Number</code>: Integers and floating-point numbers (<code>42</code>, <code>19.99</code>).</li>\n  <li><code>Boolean</code>: Logical truth values (<code>true</code> or <code>false</code>).</li>\n  <li><code>Undefined</code>: A variable declared without an assigned value.</li>\n  <li><code>Null</code>: An intentional empty or non-existent value.</li>\n</ul>",
            "content_si": "<p class='lead'>JavaScript යනු dynamically typed භාෂාවකි. මෙහිදී variable එකක් declare කිරීමේදී එහි data type එක කලින් සඳහන් කිරීමට අවශ්‍ය නොවන අතර runtime එකේදී JavaScript engine එක මගින් එය තීරණය කරයි.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>typeof මගින් Type Check කිරීම</strong></div>\n  <p>Checkout forms හෝ billing ගණනය කිරීම් වලදී user input හෝ API responses නිවැරදිදැයි තහවුරු කර ගැනීමට සැමවිටම <code>typeof</code> operator එක භාවිතා කරන්න.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>JavaScript හි මූලික Data Types:</h4>\n<ul>\n  <li><code>String</code>: Quotes තුළ ලියන ලද අකුරු හෝ වාක්‍ය (<code>'hello'</code>, <code>\"world\"</code>).</li>\n  <li><code>Number</code>: පූර්ණ සංඛ්‍යා සහ දශම සංඛ්‍යා (<code>5000</code>, <code>99.5</code>).</li>\n  <li><code>Boolean</code>: සත්‍ය හෝ අසත්‍ය අගයන් (<code>true</code> හෝ <code>false</code>).</li>\n  <li><code>Undefined</code>: අගයක් assign නොකළ variable එකක්.</li>\n  <li><code>Null</code>: හිතාමතාම හිස් අගයක් දැක්වීමට යොදන value එක.</li>\n</ul>",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }\n    .card { background: #1e293b; padding: 15px; border-radius: 8px; margin-bottom: 10px; }\n    .type { color: #04AA6D; font-weight: bold; }\n  </style>\n</head>\n<body>\n  <h3>JavaScript Data Types Checker</h3>\n  <div id=\"types-container\"></div>\n\n  <script>\n    const title = 'Web Design Sri Lanka';\n    const price = 5000;\n    const isLive = true;\n    const clientNote = null;\n    let pendingReview;\n\n    const items = [\n      { name: 'title', val: title, type: typeof title },\n      { name: 'price', val: price, type: typeof price },\n      { name: 'isLive', val: isLive, type: typeof isLive },\n      { name: 'clientNote', val: 'null', type: typeof clientNote },\n      { name: 'pendingReview', val: 'undefined', type: typeof pendingReview }\n    ];\n\n    let html = '';\n    items.forEach(item => {\n      html += '<div class=\"card\">Variable: <code>' + item.name + '</code> | Type: <span class=\"type\">' + item.type + '</span></div>';\n    });\n    document.getElementById('types-container').innerHTML = html;\n  </script>\n</body>\n</html>",
            "keyTakeaways": [
              "JavaScript primitives include String, Number, Boolean, Null, Undefined, BigInt, and Symbol.",
              "Variables are dynamically typed and can hold any primitive value.",
              "typeof null evaluates to 'object' due to a historical JavaScript design artifact."
            ],
            "challenge": {
              "question": "What does typeof '5000' evaluate to in JavaScript?",
              "options": [
                "number",
                "string",
                "boolean",
                "undefined"
              ],
              "answer": 1,
              "explanation": "Any value enclosed in single or double quotes is recognized as a String."
            }
          },
          {
            "id": "js_operators",
            "title": "Operators, Expressions & Strict Equality (===)",
            "readTime": "4 min read",
            "summary": "Master arithmetic, logical, comparison, ternary operators and why strict equality is critical.",
            "content": "<p class='lead'>Operators allow you to perform calculations, compare values, and execute logical evaluations across your web applications.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Always Use Strict Equality (===)</strong></div>\n  <p>Never use loose equality (<code>==</code>) because it conducts implicit type coercion behind the scenes (e.g. <code>0 == ''</code> is true). Always use strict equality (<code>===</code>) and strict inequality (<code>!==</code>) for predictable logic.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>Key Operator Categories:</h4>\n<ul>\n  <li><strong>Arithmetic:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> (modulus)</li>\n  <li><strong>Comparison:</strong> <code>===</code>, <code>!==</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></li>\n  <li><strong>Logical:</strong> <code>&amp;&amp;</code> (AND), <code>||</code> (OR), <code>!</code> (NOT), <code>??</code> (nullish coalescing)</li>\n  <li><strong>Ternary Operator:</strong> <code>condition ? ifTrue : ifFalse</code></li>\n</ul>",
            "content_si": "<p class='lead'>Operators මගින් web application එකක ගණිතමය ගණනය කිරීම්, අගයන් සංසන්දනය කිරීම් සහ logical තීරණ ගැනීම් සිදු කළ හැක.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>සැමවිටම Strict Equality (===) භාවිතා කරන්න</strong></div>\n  <p>Loose equality (<code>==</code>) භාවිතා කිරීමෙන් වළකින්න. මන්ද එය background එකේදී implicit type conversion සිදු කරයි (උදාහරණයක් ලෙස <code>0 == ''</code> සත්‍ය වේ). වැරදි වැළැක්වීමට සැමවිටම strict equality (<code>===</code>) සහ strict inequality (<code>!==</code>) යොදා ගන්න.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>ප්‍රධාන Operator වර්ග:</h4>\n<ul>\n  <li><strong>ගණිතමය (Arithmetic):</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> (modulus)</li>\n  <li><strong>සංසන්දනාත්මක (Comparison):</strong> <code>===</code>, <code>!==</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></li>\n  <li><strong>Logical:</strong> <code>&amp;&amp;</code> (AND), <code>||</code> (OR), <code>!</code> (NOT), <code>??</code> (nullish coalescing)</li>\n  <li><strong>Ternary Operator:</strong> <code>condition ? ifTrue : ifFalse</code></li>\n</ul>",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }\n    .box { background: #1e293b; padding: 15px; border-radius: 8px; margin-top: 10px; }\n    .badge { background: #04AA6D; padding: 4px 8px; border-radius: 4px; font-weight: bold; }\n  </style>\n</head>\n<body>\n  <h3>Ternary & Comparison Demonstration</h3>\n  <div class=\"box\" id=\"res\"></div>\n\n  <script>\n    const packageBudget = 25000;\n    const isEcommerce = packageBudget >= 20000;\n    \n    // Ternary operator\n    const tierName = isEcommerce ? 'Corporate E-Commerce' : 'Standard Business';\n    \n    // Strict comparison check\n    const isExactBudget = (packageBudget === 25000);\n\n    document.getElementById('res').innerHTML = \n      'Selected Tier: <span class=\"badge\">' + tierName + '</span><br><br>' +\n      'Budget Match Verified (===): <strong>' + isExactBudget + '</strong>';\n  </script>\n</body>\n</html>",
            "keyTakeaways": [
              "Use strict equality (===) to compare both value and data type without implicit coercion.",
              "Ternary operator provides concise, readable 1-line inline conditional expressions.",
              "Logical operators (&& and ||) support short-circuit evaluation in JavaScript."
            ],
            "challenge": {
              "question": "What is the result of '10' === 10 in JavaScript?",
              "options": [
                "true",
                "false",
                "undefined",
                "NaN"
              ],
              "answer": 1,
              "explanation": "Strict equality (===) checks both value and type. A String ('10') does not equal a Number (10)."
            }
          },
          {
            "id": "js_conditionals",
            "title": "Conditional Branching (if, else if, else, switch)",
            "readTime": "5 min read",
            "summary": "Control application execution flow using robust if/else logic blocks and switch statements.",
            "content": "<p class='lead'>Conditional statements direct your code to execute specific blocks depending on whether defined conditions evaluate to <code>true</code> or <code>false</code>.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Guard Clauses & Early Returns</strong></div>\n  <p>Avoid nested if-else pyramids by using guard clauses that return early if validation fails. This makes agency codebase cleaner, flatter, and easier to test.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>Core Conditional Syntax:</h4>\n<pre><code>if (condition1) {\n  // Executes when condition1 is true\n} else if (condition2) {\n  // Executes when condition2 is true\n} else {\n  // Default fallback block\n}</code></pre>",
            "content_si": "<p class='lead'>Conditional statements මගින් යම් කොන්දේසියක් සත්‍ය (<code>true</code>) හෝ අසත්‍ය (<code>false</code>) වීම මත පදනම්ව විවිධ code blocks execute කිරීමට ඉඩ සලසයි.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Early Return සහ Guard Clauses භාවිතය</strong></div>\n  <p>අනවශ්‍ය nested if-else කේත ගොඩගැසීම වැළැක්වීමට guard clauses යොදා ගෙන validation අසමත් වූ විගස function එකෙන් early return වන්න. එමගින් code එක කියවීමට හා නඩත්තු කිරීමට පහසු වේ.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>මූලික Syntax ආකෘතිය:</h4>\n<pre><code>if (condition1) {\n  // condition1 සත්‍ය වූ විට ක්‍රියාත්මක වේ\n} else if (condition2) {\n  // condition2 සත්‍ය වූ විට ක්‍රියාත්මක වේ\n} else {\n  // ඉහත කිසිවක් සත්‍ය නොවූ විට fallback වේ\n}</code></pre>",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }\n    .btn { background: #04AA6D; color: #fff; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }\n    .out { margin-top: 15px; padding: 15px; background: #1e293b; border-radius: 6px; }\n  </style>\n</head>\n<body>\n  <h3>Website Tier Recommendation Engine</h3>\n  <input type=\"number\" id=\"budgetInput\" value=\"15000\" style=\"padding:8px; border-radius:4px; border:1px solid #475569; background:#0f172a; color:#fff;\">\n  <button class=\"btn\" onclick=\"checkTier()\">Evaluate Package</button>\n  <div class=\"out\" id=\"tierResult\">Enter budget and evaluate...</div>\n\n  <script>\n    function checkTier() {\n      const budget = Number(document.getElementById('budgetInput').value);\n      let tier = '';\n\n      if (budget >= 60000) {\n        tier = '🏆 Custom E-Commerce Platform (Payment Gateway + CMS)';\n      } else if (budget >= 20000) {\n        tier = '⭐ Corporate Professional Website (Multi-Page SEO)';\n      } else if (budget >= 5000) {\n        tier = '🚀 Starter Launchpad (1-Page High Converting)';\n      } else {\n        tier = '⚠️ Minimum budget required for professional web services is Rs. 5,000/-';\n      }\n\n      document.getElementById('tierResult').textContent = tier;\n    }\n  </script>\n</body>\n</html>",
            "keyTakeaways": [
              "Use if / else if / else to route business logic based on dynamic variables.",
              "Use switch statements when comparing a single variable against many discrete fixed values.",
              "Guard clauses keep functions clean by handling edge cases and errors first."
            ],
            "challenge": {
              "question": "Which statement terminates a case in a JavaScript switch block to prevent fall-through?",
              "options": [
                "stop",
                "break",
                "exit",
                "return"
              ],
              "answer": 1,
              "explanation": "The break keyword exits the switch statement, preventing execution from falling through to following cases."
            }
          },
          {
            "id": "js_loops",
            "title": "Loops & Iteration (for, while, for...of)",
            "readTime": "5 min read",
            "summary": "Automate repetitive tasks, traverse arrays, and control loop execution with break and continue.",
            "content": "<p class='lead'>Loops execute a code block repeatedly as long as a specified condition remains <code>true</code>. They are fundamental for rendering dynamic product lists and processing API items.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Use for...of for Clean Array Iteration</strong></div>\n  <p>For modern array traversals where you don't need manual index arithmetic, <code>for (const item of array)</code> is cleaner and less error-prone than traditional counting loops.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>Common Loop Formats:</h4>\n<ul>\n  <li><code>for (let i = 0; i &lt; n; i++)</code>: Standard counter-controlled iteration.</li>\n  <li><code>for (const item of items)</code>: Iterates over iterable values (arrays, strings, sets).</li>\n  <li><code>while (condition)</code>: Runs continuously while condition holds true.</li>\n</ul>",
            "content_si": "<p class='lead'>යම් කොන්දේසියක් සත්‍ය (<code>true</code>) වී පවතින තාක් කල් යම් code block එකක් නැවත නැවතත් ක්‍රියාත්මක කිරීමට loops භාවිතා කරයි. Product ලැයිස්තු render කිරීමට සහ data සැකසීමට මෙය අත්‍යවශ්‍ය වේ.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Arrays සඳහා for...of භාවිතය</strong></div>\n  <p>Index අංකය වෙනම අවශ්‍ය නොවන අවස්ථාවලදී arrays කියවීම සඳහා <code>for (const item of array)</code> භාවිතා කිරීම සම්ප්‍රදායික counting loops වලට වඩා පැහැදිලි වන අතර වැරදි අවම කරයි.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>ප්‍රධාන Loop වර්ග:</h4>\n<ul>\n  <li><code>for (let i = 0; i &lt; n; i++)</code>: සාමාන්‍ය counter එකක් සහිත loop ආකෘතිය.</li>\n  <li><code>for (const item of items)</code>: Array එකක ඇති එක් එක් item එක කෙලින්ම ලබා ගන්නා ආකෘතිය.</li>\n  <li><code>while (condition)</code>: කොන්දේසිය සත්‍යව පවතින තුරු ක්‍රියාත්මක වන loop එක.</li>\n</ul>",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }\n    .feature-tag { display: inline-block; background: #1e293b; border: 1px solid #334155; padding: 6px 12px; margin: 4px; border-radius: 20px; font-size: 13px; }\n  </style>\n</head>\n<body>\n  <h3>Agency Standard Deliverables</h3>\n  <div id=\"featureList\"></div>\n\n  <script>\n    const features = [\n      'Mobile-First Responsive Layout',\n      'PayHere Payment Gateway',\n      'Google Maps & SEO Schema',\n      'Firebase Admin Dashboard',\n      'Sub-Second Page Speed'\n    ];\n\n    let html = '';\n    // Modern for...of loop\n    for (const feat of features) {\n      html += '<span class=\"feature-tag\">✅ ' + feat + '</span>';\n    }\n\n    document.getElementById('featureList').innerHTML = html;\n  </script>\n</body>\n</html>",
            "keyTakeaways": [
              "Use for...of loops to iterate over array elements cleanly.",
              "Use break to terminate a loop early, and continue to skip to the next iteration.",
              "Always ensure a while loop's exit condition is eventually met to prevent infinite loops."
            ],
            "challenge": {
              "question": "Which loop is best suited for directly iterating over the values of an Array in modern JavaScript?",
              "options": [
                "for...in",
                "for...of",
                "do...repeat",
                "while...until"
              ],
              "answer": 1,
              "explanation": "for...of iterates directly over values in iterable collections like Arrays, whereas for...in iterates over object keys."
            }
          },
          {
            "id": "js_functions",
            "title": "Functions, Parameters & ES6 Arrow Functions",
            "readTime": "5 min read",
            "summary": "Write modular, reusable code blocks using standard function declarations and modern ES6 arrow syntax.",
            "content": "<p class='lead'>Functions are reusable blocks of code designed to perform a particular task. They prevent repetitive code, accept inputs via parameters, and return calculated results.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>ES6 Arrow Functions for Callbacks</strong></div>\n  <p>Arrow functions (<code>() =&gt; {}</code>) provide a concise syntax and lexically bind the <code>this</code> context, making them the standard choice for array callbacks and event handlers.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>Comparison of Syntaxes:</h4>\n<pre><code>// 1. Traditional Function Declaration\nfunction calculateTotal(price, taxRate = 0.05) {\n  return price + (price * taxRate);\n}\n\n// 2. Modern ES6 Arrow Function\nconst calculateTotalArrow = (price, taxRate = 0.05) => price + (price * taxRate);</code></pre>",
            "content_si": "<p class='lead'>Functions යනු නැවත නැවත භාවිතා කළ හැකි code කොටස් වේ. ඒවා මගින් code නැවත ලිවීම වළක්වා, parameters මගින් inputs ලබා ගෙන අවසාන ප්‍රතිඵලය return කරයි.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>ES6 Arrow Functions භාවිතය</strong></div>\n  <p>Arrow functions (<code>() =&gt; {}</code>) මගින් කේතය කෙටි කරගත හැකි අතර, <code>this</code> context එක lexically bind කරන බැවින් array callbacks සහ event handlers සඳහා එය නූතන standard එක වේ.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>Syntax සැසඳීම:</h4>\n<pre><code>// 1. සාමාන්‍ය Function Declaration\nfunction calculateTotal(price, taxRate = 0.05) {\n  return price + (price * taxRate);\n}\n\n// 2. Modern ES6 Arrow Function\nconst calculateTotalArrow = (price, taxRate = 0.05) => price + (price * taxRate);</code></pre>",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }\n    .box { background: #1e293b; padding: 15px; border-radius: 8px; border-left: 4px solid #04AA6D; }\n  </style>\n</head>\n<body>\n  <h3>Discount Calculator Engine</h3>\n  <div class=\"box\" id=\"calcBox\"></div>\n\n  <script>\n    // Pure arrow function with default parameters\n    const applyAgencyDiscount = (subtotal, discountPercent = 10) => {\n      const discount = subtotal * (discountPercent / 100);\n      return subtotal - discount;\n    };\n\n    const initial = 20000;\n    const finalAmount = applyAgencyDiscount(initial, 15);\n\n    document.getElementById('calcBox').innerHTML = \n      'Regular Price: Rs. ' + initial.toLocaleString() + '/-<br>' +\n      'Special 15% Client Promo: <strong>Rs. ' + finalAmount.toLocaleString() + '/-</strong>';\n  </script>\n</body>\n</html>",
            "keyTakeaways": [
              "Functions encapsulate business logic and enable clean DRY (Don't Repeat Yourself) code.",
              "Default parameters prevent undefined errors when arguments are omitted.",
              "Arrow functions provide concise one-liner return capabilities."
            ],
            "challenge": {
              "question": "What is the return value of an arrow function without braces: const f = (x) => x * 2; when called with f(5)?",
              "options": [
                "undefined",
                "5",
                "10",
                "NaN"
              ],
              "answer": 2,
              "explanation": "Single-expression arrow functions without curly braces have an implicit return, returning 5 * 2 = 10."
            }
          },
          {
            "id": "js_arrays",
            "title": "Arrays & High-Order Methods (map, filter, reduce)",
            "readTime": "6 min read",
            "summary": "Store ordered collections and transform data declaratively using map, filter, and reduce.",
            "content": "<p class='lead'>Arrays are ordered, index-based lists capable of holding multiple items. In modern software engineering, high-order array methods replace manual loops for data transformation.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Immutability in Array Transformations</strong></div>\n  <p>Methods like <code>.map()</code> and <code>.filter()</code> create a new array without mutating the original dataset. Keeping your data immutable makes UI updates fast and predictable.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>Essential Array Methods:</h4>\n<ul>\n  <li><code>.push(item)</code>: Appends an item to the end of the array.</li>\n  <li><code>.map(fn)</code>: Transforms every element and returns a new array.</li>\n  <li><code>.filter(fn)</code>: Keeps only items matching the boolean condition.</li>\n  <li><code>.reduce(fn, init)</code>: Accumulates array elements into a single computed value.</li>\n</ul>",
            "content_si": "<p class='lead'>Arrays යනු අගයන් කිහිපයක් පිළිවෙළකට තැන්පත් කර තබා ගන්නා index-based ලැයිස්තු වේ. නවීන මෘදුකාංග ඉංජිනේරු විද්‍යාවේදී සාම්ප්‍රදායික loops වෙනුවට high-order array methods බහුලව යොදා ගනී.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Immutability පවත්වා ගැනීම</strong></div>\n  <p><code>.map()</code> සහ <code>.filter()</code> වැනි methods මගින් මුල් array එක වෙනස් නොකර (mutate නොකර) අලුත් array එකක් ලබා දෙයි. එමගින් UI updates වේගවත් සහ නිවැරදි වේ.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>ප්‍රධාන Array Methods:</h4>\n<ul>\n  <li><code>.push(item)</code>: Array එකේ අගට අලුත් item එකක් එකතු කරයි.</li>\n  <li><code>.map(fn)</code>: එක් එක් element එක transform කර අලුත් array එකක් සාදයි.</li>\n  <li><code>.filter(fn)</code>: කොන්දේසිය සපුරාලන items පමණක් තෝරා ගනී.</li>\n  <li><code>.reduce(fn, init)</code>: Array එකේ සියලු අගයන් එකතු කර තනි ප්‍රතිඵලයක් ගණනය කරයි.</li>\n</ul>",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }\n    .item { background: #1e293b; padding: 10px; margin-bottom: 6px; border-radius: 6px; display: flex; justify-content: space-between; }\n    .sum { margin-top: 15px; font-weight: bold; color: #04AA6D; font-size: 1.1rem; }\n  </style>\n</head>\n<body>\n  <h3>Client Orders & Total Revenue Filter</h3>\n  <div id=\"ordersList\"></div>\n  <div class=\"sum\" id=\"totalBox\"></div>\n\n  <script>\n    const orders = [\n      { client: 'Hiri Surf School', package: 'Starter', price: 5000 },\n      { client: 'Versells Lanka', package: 'E-Commerce', price: 60000 },\n      { client: 'Centennial Leos', package: 'Standard', price: 20000 },\n      { client: 'Galle Villa Retreat', package: 'Corporate', price: 35000 }\n    ];\n\n    // Filter premium packages (>= 20000)\n    const premiumOrders = orders.filter(o => o.price >= 20000);\n\n    // Render using map\n    document.getElementById('ordersList').innerHTML = premiumOrders\n      .map(o => '<div class=\"item\"><span>' + o.client + ' (' + o.package + ')</span><strong>Rs. ' + o.price.toLocaleString() + '/-</strong></div>')\n      .join('');\n\n    // Compute total using reduce\n    const grandTotal = premiumOrders.reduce((acc, curr) => acc + curr.price, 0);\n    document.getElementById('totalBox').textContent = 'Premium Pipeline Total: Rs. ' + grandTotal.toLocaleString() + '/-';\n  </script>\n</body>\n</html>",
            "keyTakeaways": [
              "Use .map() when you want to convert an array of items into a new format (like HTML strings).",
              "Use .filter() to discard items that don't match specific criteria without mutating the original array.",
              "Use .reduce() to compute aggregate figures like sums and totals from array collections."
            ],
            "challenge": {
              "question": "Which array method creates a new array containing only elements that satisfy a condition?",
              "options": [
                "filter()",
                "map()",
                "push()",
                "forEach()"
              ],
              "answer": 0,
              "explanation": "filter() tests each element against a predicate function and returns a new array with matching items."
            }
          },
          {
            "id": "js_objects",
            "title": "Objects, Properties & Destructuring",
            "readTime": "5 min read",
            "summary": "Model real-world entities with key-value pairs, nested properties, and ES6 destructuring.",
            "content": "<p class='lead'>Objects are collections of key-value properties. They are the primary data structure used to represent complex records, API payloads, and database documents.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Clean Code with Object Destructuring</strong></div>\n  <p>Use ES6 object destructuring (e.g. <code>const { name, email } = client;</code>) to extract properties cleanly without repeating <code>client.</code> everywhere.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>Object Literal Syntax:</h4>\n<pre><code>const project = {\n  name: 'Hiri Surf School',\n  city: 'Hiriketiya',\n  featured: true,\n  calculateTax() {\n    return this.budget * 0.02;\n  }\n};</code></pre>",
            "content_si": "<p class='lead'>Objects යනු key-value pairs වලින් සමන්විත data collections වේ. Complex records, API payloads සහ database documents නිරූපණය කිරීමට ප්‍රධාන වශයෙන්ම objects භාවිතා වේ.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Object Destructuring භාවිතය</strong></div>\n  <p>Code එක පිරිසිදුව තබා ගැනීමට ES6 object destructuring (උදාහරණයක් ලෙස <code>const { name, email } = client;</code>) භාවිතා කරන්න. එමගින් නැවත නැවතත් <code>client.name</code> ලෙස ලිවීම අවශ්‍ය නොවේ.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>Object Literal ආකෘතිය:</h4>\n<pre><code>const project = {\n  name: 'Hiri Surf School',\n  city: 'Hiriketiya',\n  featured: true,\n  calculateTax() {\n    return this.budget * 0.02;\n  }\n};</code></pre>",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }\n    .client-card { background: #1e293b; border: 1px solid #334155; padding: 15px; border-radius: 8px; }\n    .badge { background: #04AA6D; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 11px; }\n  </style>\n</head>\n<body>\n  <h3>Client Project Profile</h3>\n  <div class=\"client-card\" id=\"profile\"></div>\n\n  <script>\n    const agencyProject = {\n      clientName: 'Hiri Surf School',\n      location: 'Hiriketiya, Sri Lanka',\n      rating: 5.0,\n      techStack: ['HTML5', 'CSS Grid', 'JavaScript', 'Google Maps API'],\n      isCompleted: true\n    };\n\n    // Object Destructuring\n    const { clientName, location, rating, techStack } = agencyProject;\n\n    document.getElementById('profile').innerHTML = \n      '<h4>' + clientName + ' <span class=\"badge\">⭐ ' + rating + '</span></h4>' +\n      '<p style=\"color:#94a3b8;\">Location: ' + location + '</p>' +\n      '<p>Tech Used: <strong>' + techStack.join(', ') + '</strong></p>';\n  </script>\n</body>\n</html>",
            "keyTakeaways": [
              "Objects represent real-world entities with keys and values.",
              "Access properties using dot notation (obj.name) or bracket notation (obj['name']).",
              "Destructuring allows extracting multiple properties in a single readable line."
            ],
            "challenge": {
              "question": "How do you extract the property 'title' from an object named 'article' using ES6 destructuring?",
              "options": [
                "const title = extract(article);",
                "const { title } = article;",
                "const [ title ] = article;",
                "const title <- article.title;"
              ],
              "answer": 1,
              "explanation": "Curly braces on the left side of the assignment declare object destructuring: const { title } = article;"
            }
          },
          {
            "id": "js_dom",
            "title": "DOM Selection & Event Listeners (querySelector, addEventListener)",
            "readTime": "6 min read",
            "summary": "Interact with HTML documents, handle button clicks and form inputs, and modify classes dynamically.",
            "content": "<p class='lead'>The Document Object Model (DOM) represents the webpage as a tree of objects. JavaScript uses the DOM API to modify styles, insert elements, and respond to user interactions in real time.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Use addEventListener Over Inline onclick</strong></div>\n  <p>Never write inline <code>onclick=\"...\"</code> attributes directly in HTML. Use <code>element.addEventListener('click', handler)</code> to separate HTML structure from JavaScript behavior and enable multiple listeners.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>Core DOM Methods:</h4>\n<ul>\n  <li><code>document.querySelector(selector)</code>: Selects the first matching CSS element.</li>\n  <li><code>document.querySelectorAll(selector)</code>: Selects all matching elements into a NodeList.</li>\n  <li><code>element.classList.toggle('active')</code>: Toggles a CSS class cleanly.</li>\n  <li><code>element.addEventListener('event', callback)</code>: Listens for user interactions.</li>\n</ul>",
            "content_si": "<p class='lead'>Document Object Model (DOM) මගින් webpage එක object tree එකක් ලෙස නිරූපණය කරයි. JavaScript මගින් styles වෙනස් කිරීමට, අලුත් elements එකතු කිරීමට සහ user interactions වලට respond කිරීමට DOM API භාවිතා කරයි.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>addEventListener භාවිතය</strong></div>\n  <p>HTML ඇතුළත inline <code>onclick=\"...\"</code> ලිවීමෙන් වළකින්න. ඒ වෙනුවට <code>element.addEventListener('click', handler)</code> භාවිතා කිරීමෙන් HTML structure එක සහ JavaScript logic එක වෙන් කර පිරිසිදුව තබා ගත හැක.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>ප්‍රධාන DOM Methods:</h4>\n<ul>\n  <li><code>document.querySelector(selector)</code>: CSS selector එකට ගැලපෙන පළමු element එක තෝරා ගනී.</li>\n  <li><code>document.querySelectorAll(selector)</code>: ගැලපෙන සියලු elements NodeList එකක් ලෙස ලබා දෙයි.</li>\n  <li><code>element.classList.toggle('active')</code>: CSS class එකක් පහසුවෙන් toggle කරයි.</li>\n  <li><code>element.addEventListener('event', callback)</code>: User interaction එකකට සවන් දී ක්‍රියා කරයි.</li>\n</ul>",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; text-align: center; }\n    .card { max-width: 320px; margin: 0 auto; background: #1e293b; padding: 24px; border-radius: 12px; transition: all 0.3s; }\n    .card.highlight { border: 2px solid #04AA6D; box-shadow: 0 0 20px rgba(4,170,109,0.4); }\n    .btn { background: #04AA6D; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 15px; }\n  </style>\n</head>\n<body>\n  <div class=\"card\" id=\"pricingCard\">\n    <h3>Starter Package</h3>\n    <p style=\"font-size:1.4rem; color:#38bdf8; font-weight:bold;\">Rs. 5,000/-</p>\n    <button class=\"btn\" id=\"toggleBtn\">Toggle Highlight</button>\n  </div>\n\n  <script>\n    const card = document.querySelector('#pricingCard');\n    const btn = document.querySelector('#toggleBtn');\n\n    btn.addEventListener('click', () => {\n      card.classList.toggle('highlight');\n      btn.textContent = card.classList.contains('highlight') ? 'Active Highlight' : 'Toggle Highlight';\n    });\n  </script>\n</body>\n</html>",
            "keyTakeaways": [
              "querySelector accepts standard CSS selectors like #id, .class, and tag.",
              "Use addEventListener to attach click, input, submit, and change event handlers.",
              "classList.add, remove, and toggle make dynamic styling clean and modular."
            ],
            "challenge": {
              "question": "Which method is the modern standard for listening to click events on an HTML element?",
              "options": [
                "element.attachClick()",
                "element.addEventListener('click', handler)",
                "element.onClickHandler()",
                "element.listenEvent('click')"
              ],
              "answer": 1,
              "explanation": "addEventListener is the standardized W3C method for attaching event handlers to DOM nodes."
            }
          },
          {
            "id": "js_async",
            "title": "Asynchronous JavaScript, Promises & Fetch API",
            "readTime": "6 min read",
            "summary": "Fetch remote data without page reloads using Promise chains and modern async/await syntax.",
            "content": "<p class='lead'>JavaScript is single-threaded. To prevent network requests from freezing the user interface, JavaScript handles long-running operations asynchronously using Promises and <code>async / await</code>.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Wrap Network Calls in try...catch Blocks</strong></div>\n  <p>Always enclose <code>await fetch()</code> calls inside a <code>try...catch</code> block with user-friendly error fallbacks. Never leave a network promise unhandled.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>How async/await Works:</h4>\n<pre><code>async function loadLiveFeed() {\n  try {\n    const response = await fetch('/api/data');\n    if (!response.ok) throw new Error('HTTP ' + response.status);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch error:', error.message);\n  }\n}</code></pre>",
            "content_si": "<p class='lead'>JavaScript යනු single-threaded භාෂාවකි. Network requests නිසා browser එක freeze වීම වැළැක්වීමට, Promises සහ <code>async / await</code> මගින් background එකේදී non-blocking ලෙස data ලබා ගනී.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>try...catch භාවිතය</strong></div>\n  <p>සැමවිටම <code>await fetch()</code> calls එකක් <code>try...catch</code> block එකක් තුළ ලියන්න. Network බිඳවැටීමකදී පවා user හට පැහැදිලි error message එකක් පෙන්වීමට මෙය උපකාරී වේ.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>async/await ක්‍රියා කරන ආකාරය:</h4>\n<pre><code>async function loadLiveFeed() {\n  try {\n    const response = await fetch('/api/data');\n    if (!response.ok) throw new Error('HTTP ' + response.status);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch error:', error.message);\n  }\n}</code></pre>",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }\n    .btn { background: #04AA6D; color: #fff; padding: 10px 18px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }\n    .box { margin-top: 15px; padding: 15px; background: #1e293b; border-left: 4px solid #04AA6D; border-radius: 6px; }\n  </style>\n</head>\n<body>\n  <h3>Async / Await Simulation</h3>\n  <button class=\"btn\" id=\"fetchBtn\">Fetch Real-Time Status</button>\n  <div class=\"box\" id=\"resultBox\">Click button to fetch...</div>\n\n  <script>\n    const btn = document.getElementById('fetchBtn');\n    const resultBox = document.getElementById('resultBox');\n\n    btn.addEventListener('click', async () => {\n      resultBox.textContent = 'Contacting server...';\n      try {\n        // Simulated network request delay\n        await new Promise(resolve => setTimeout(resolve, 600));\n        \n        const mockData = { serverStatus: 'Online', latencyMs: 24, cloudRegion: 'ap-south-1' };\n        resultBox.innerHTML = \n          'Status: <strong style=\"color:#04AA6D;\">' + mockData.serverStatus + '</strong><br>' +\n          'Ping: ' + mockData.latencyMs + 'ms | Region: ' + mockData.cloudRegion;\n      } catch (err) {\n        resultBox.innerHTML = '<span style=\"color:#ef4444;\">Network Error: ' + err.message + '</span>';\n      }\n    });\n  </script>\n</body>\n</html>",
            "keyTakeaways": [
              "The async keyword turns a standard function into one that returns a Promise.",
              "The await keyword pauses execution until the Promise settles without blocking the browser thread.",
              "Wrap async requests in try...catch to handle connection failures gracefully."
            ],
            "challenge": {
              "question": "Where can the 'await' keyword be placed in JavaScript?",
              "options": [
                "Inside any regular synchronous function",
                "Only inside functions marked with the 'async' keyword or top-level ES modules",
                "Inside HTML attribute tags",
                "Inside CSS stylesheets"
              ],
              "answer": 1,
              "explanation": "await pauses Promise resolution and is valid only within async functions or top-level ES modules."
            }
          },
          {
            "id": "js_error_handling",
            "title": "Error Handling & Debugging (try, catch, finally)",
            "readTime": "4 min read",
            "summary": "Prevent application crashes by gracefully catching runtime exceptions and debugging with the developer console.",
            "content": "<p class='lead'>Errors are an inevitable part of software engineering. Robust applications anticipate potential failures and manage them smoothly without interrupting the user's workflow.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Custom Error Messages for Users</strong></div>\n  <p>Never expose raw technical error stack traces to public visitors. Log the raw error to your monitoring system, but show clear, actionable Sinhala or English guidance on screen.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>try...catch Structure:</h4>\n<pre><code>try {\n  // Risky code that might throw\n} catch (error) {\n  // Fallback recovery code\n} finally {\n  // Always runs regardless of success or failure\n}</code></pre>",
            "content_si": "<p class='lead'>මෘදුකාංග නිර්මාණයේදී දෝෂ (errors) ඇති වීම සාමාන්‍ය දෙයකි. විශිෂ්ට web applications මගින් මෙවැනි දෝෂ කල්තියා හඳුනාගෙන, website එක crash වීම වළක්වා පරිශීලකයාට බාධාවක් නොවන සේ පාලනය කරයි.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>පැහැදිලි Error Messages පෙන්වීම</strong></div>\n  <p>System එකේ technical stack trace එක public visitors ලාට පෙන්වීමෙන් වළකින්න. Debugging සඳහා එය console එකට log කරන අතරතුර, screen එක මත සරල හා මිත්‍රශීලී පණිවිඩයක් දිස්වීමට සලස්වන්න.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>try...catch ආකෘතිය:</h4>\n<pre><code>try {\n  // දෝෂයක් ඇති විය හැකි code කොටස\n} catch (error) {\n  // දෝෂය හසු කරගෙන විසඳුම් ලබා දෙන කොටස\n} finally {\n  // සාර්ථක වුවත් නැතත් අනිවාර්යයෙන්ම ක්‍රියාත්මක වන කොටස\n}</code></pre>",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }\n    .box { background: #1e293b; padding: 15px; border-radius: 8px; margin-top: 10px; }\n  </style>\n</head>\n<body>\n  <h3>Safe JSON Parser with try...catch</h3>\n  <div class=\"box\" id=\"debugBox\">Testing JSON parser...</div>\n\n  <script>\n    const malformedJson = \"{ client: 'Infinite', invalidJson }\";\n    const box = document.getElementById('debugBox');\n\n    try {\n      const parsed = JSON.parse(malformedJson);\n      box.textContent = 'Success: ' + parsed.client;\n    } catch (err) {\n      box.innerHTML = '<span style=\"color:#f87171;\">Caught Exception Safely:</span> ' + err.message;\n    } finally {\n      box.innerHTML += '<br><small style=\"color:#94a3b8;\">(finally block executed: cleanup finished)</small>';\n    }\n  </script>\n</body>\n</html>",
            "keyTakeaways": [
              "Use try blocks to run statements that may trigger exceptions (like JSON parsing or network requests).",
              "The catch block receives the Error object with message and name properties.",
              "The finally block always runs, making it ideal for hiding loading spinners or closing connections."
            ],
            "challenge": {
              "question": "Which block in a try-catch-finally statement executes regardless of whether an exception was thrown?",
              "options": [
                "catch",
                "try",
                "finally",
                "default"
              ],
              "answer": 2,
              "explanation": "The finally block always executes after try and catch blocks, whether an error occurred or not."
            }
          },
          {
            "id": "js_localstorage",
            "title": "Client-Side Storage (localStorage & sessionStorage)",
            "readTime": "5 min read",
            "summary": "Persist user settings, theme preferences, and cart data in the browser with localStorage.",
            "content": "<p class='lead'>Modern browsers provide the Web Storage API, allowing websites to store key-value data persistently on the user's device without expiring on page reload.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Store Objects as JSON Strings</strong></div>\n  <p><code>localStorage</code> only stores strings. Always serialize objects using <code>JSON.stringify()</code> before saving, and parse them with <code>JSON.parse()</code> when retrieving.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>Storage API Methods:</h4>\n<ul>\n  <li><code>localStorage.setItem('key', 'value')</code>: Saves a persistent key-value pair.</li>\n  <li><code>localStorage.getItem('key')</code>: Retrieves a stored value.</li>\n  <li><code>localStorage.removeItem('key')</code>: Deletes a specific key.</li>\n  <li><code>localStorage.clear()</code>: Clears all stored keys for the current domain.</li>\n</ul>",
            "content_si": "<p class='lead'>නවීන browsers මගින් Web Storage API ලබා දෙන අතර, එමගින් website එක reload වූ පසුද නැති නොවන සේ user ගේ device එක තුළ persistent දත්ත තැන්පත් කර තබා ගත හැක.</p>\n<div class='pro-tip-card'>\n  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Objects සඳහා JSON භාවිතා කිරීම</strong></div>\n  <p><code>localStorage</code> තුළ තැන්පත් කළ හැක්කේ strings පමණි. එබැවින් objects සුරැකීමට පෙර <code>JSON.stringify()</code> භාවිතා කර string බවට පත් කරන්න, නැවත ලබා ගැනීමේදී <code>JSON.parse()</code> යොදා ගන්න.</p>\n</div>\n<h4 style='color:#38bdf8; margin-top:20px;'>ප්‍රධාන Storage Methods:</h4>\n<ul>\n  <li><code>localStorage.setItem('key', 'value')</code>: Key-value pair එකක් තැන්පත් කරයි.</li>\n  <li><code>localStorage.getItem('key')</code>: තැන්පත් කර ඇති අගය ලබා ගනී.</li>\n  <li><code>localStorage.removeItem('key')</code>: අදාළ key එක ඉවත් කරයි.</li>\n  <li><code>localStorage.clear()</code>: එම domain එකේ සියලු storage දත්ත මකා දමයි.</li>\n</ul>",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; text-align: center; }\n    .btn { background: #04AA6D; color: #fff; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin: 4px; }\n    .btn-red { background: #ef4444; }\n  </style>\n</head>\n<body>\n  <h3>Dark / Light Theme Persistence</h3>\n  <p id=\"themeStatus\">Current Theme: Dark</p>\n  <button class=\"btn\" onclick=\"saveTheme('Dark')\">Dark Mode</button>\n  <button class=\"btn\" onclick=\"saveTheme('Light')\">Light Mode</button>\n  <button class=\"btn btn-red\" onclick=\"resetTheme()\">Clear Preference</button>\n\n  <script>\n    function saveTheme(mode) {\n      localStorage.setItem('infinite_theme_pref', mode);\n      render();\n    }\n\n    function resetTheme() {\n      localStorage.removeItem('infinite_theme_pref');\n      render();\n    }\n\n    function render() {\n      const saved = localStorage.getItem('infinite_theme_pref') || 'Dark (Default)';\n      document.getElementById('themeStatus').textContent = 'Saved Storage Preference: ' + saved;\n    }\n    render();\n  </script>\n</body>\n</html>",
            "keyTakeaways": [
              "localStorage data persists even after browser restarts until explicitly cleared.",
              "sessionStorage persists only for the duration of the browser tab session.",
              "Always serialize complex objects with JSON.stringify before saving."
            ],
            "challenge": {
              "question": "What data type does localStorage natively support storing as values?",
              "options": [
                "Strings only",
                "Objects and functions",
                "Binary buffers",
                "Numbers and arrays natively"
              ],
              "answer": 0,
              "explanation": "localStorage keys and values are always stored as UTF-16 DOMStrings."
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
window.W3_TUTORIALS = window.ACADEMY_COURSES;
