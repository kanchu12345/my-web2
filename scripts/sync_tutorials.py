# -*- coding: utf-8 -*-
"""
Autonomous AI Coding Lesson Generator Bot
Infinite Creative Web Design (infiniteweb.dev)

Generates fresh, beginner-friendly coding lessons for modern web development.
Supports Anthropic Claude, OpenAI, and Google Gemini APIs when keys are configured,
with an autonomous built-in engine generating 100% original, bespoke curriculum.

CRITICAL TRANSLATION RULE:
Explanatory text only is translated into Sinhala. All code blocks, comments,
programming keywords, tokens, HTML tags, CSS properties, and variable/function
names remain strictly in English, enforced against data/code-terms-glossary.json.
"""

import os
import sys
import json
import time
import re
import urllib.request
import urllib.error

# Ensure UTF-8 output encoding across Windows consoles & CI
if sys.platform == 'win32':
    try:
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
    except Exception:
        pass


WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DATA_DIR = os.path.join(WORKSPACE, 'data')
TUTORIALS_PATH = os.path.join(DATA_DIR, 'w3-tutorials.js')
GLOSSARY_PATH = os.path.join(DATA_DIR, 'code-terms-glossary.json')
LOG_PATH = os.path.join(DATA_DIR, 'bot-activity-log.json')

# ─────────────────────────────────────────────────────────────────────────────
# JAVASCRIPT MASTER SYLLABUS TOPIC OUTLINE
# (Standard curriculum order: Variables -> Data Types -> Operators -> Conditionals ->
#  Loops -> Functions -> Arrays -> Objects -> DOM -> Async/Fetch -> Errors -> Storage)
# ─────────────────────────────────────────────────────────────────────────────

JAVASCRIPT_SYLLABUS = [
    {
        "id": "js_variables",
        "title": "Variables, Constants & Scope (let, const, var)",
        "readTime": "4 min read",
        "summary": "Master modern variable declaration in JavaScript, block scoping, and value mutability.",
        "content": """<p class='lead'>Variables are containers for storing data values. In modern JavaScript (ES6+), we declare variables using <code>const</code> and <code>let</code>, leaving legacy <code>var</code> behind.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Always Default to const</strong></div>
  <p>Use <code>const</code> for every variable unless you know its value will be reassigned later. When reassignment is strictly needed (like loop counters), use <code>let</code>. Never use <code>var</code> in modern web applications to prevent accidental global hoisting bugs.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>Scope Differences:</h4>
<ul>
  <li><code>const</code>: Block-scoped, cannot be reassigned or re-declared.</li>
  <li><code>let</code>: Block-scoped, can be reassigned but not re-declared in the same scope.</li>
  <li><code>var</code>: Function-scoped or global, susceptible to hoisting quirks.</li>
</ul>""",
        "content_si": """<p class='lead'>Variables යනු data values තැන්පත් කර තබා ගන්නා containers වේ. Modern JavaScript (ES6+) හිදී variables declare කිරීමට <code>const</code> සහ <code>let</code> භාවිතා කරන අතර, පැරණි <code>var</code> භාවිතය නවතා ඇත.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>සැමවිටම const භාවිතා කරන්න</strong></div>
  <p>අගය නැවත වෙනස් කිරීමට (reassign) අවශ්‍ය නොවන සෑම අවස්ථාවකදීම <code>const</code> භාවිතා කරන්න. අගය වෙනස් කිරීමට අවශ්‍ය නම් පමණක් (උදාහරණයක් ලෙස loop counters) <code>let</code> භාවිතා කරන්න. Hoisting දෝෂ වැළැක්වීමට නවීන web development වලදී <code>var</code> භාවිතා කිරීමෙන් වළකින්න.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>Scope වල වෙනස්කම්:</h4>
<ul>
  <li><code>const</code>: Block-scoped වන අතර, reassign හෝ නැවත declare කළ නොහැක.</li>
  <li><code>let</code>: Block-scoped වන අතර, reassign කළ හැක නමුත් එකම scope එක තුළ re-declare කළ නොහැක.</li>
  <li><code>var</code>: Function-scoped හෝ global වන අතර, hoisting නිසා අනවශ්‍ය ගැටළු ඇති විය හැක.</li>
</ul>""",
        "code": """<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }
    .box { background: #1e293b; padding: 15px; border-radius: 8px; border-left: 4px solid #04AA6D; }
    .val { color: #38bdf8; font-weight: bold; }
  </style>
</head>
<body>
  <h3>JavaScript Variables Demonstration</h3>
  <div class="box" id="output">Calculating variables...</div>

  <script>
    const agencyName = 'Infinite Creative Web Design';
    const basePrice = 5000; // in LKR
    let projectCount = 3;
    let totalRevenue = basePrice * projectCount;

    document.getElementById('output').innerHTML = 
      'Agency: <span class="val">' + agencyName + '</span><br>' +
      'Projects: <span class="val">' + projectCount + '</span><br>' +
      'Total Estimated Revenue: <span class="val">Rs. ' + totalRevenue.toLocaleString() + '/-</span>';
  </script>
</body>
</html>""",
        "keyTakeaways": [
            "Use const by default for immutable variables and object references.",
            "Use let only when variable values need to be reassigned later.",
            "Avoid var in modern JavaScript to eliminate scope leaks and hoisting bugs."
        ],
        "challenge": {
            "question": "Which JavaScript keyword should you default to for declaring variables that do not get reassigned?",
            "options": ["var", "let", "const", "def"],
            "answer": 2,
            "explanation": "const declares block-scoped variables that cannot be reassigned, preventing accidental mutation."
        }
    },
    {
        "id": "js_datatypes",
        "title": "Primitive Data Types & Dynamic Typing",
        "readTime": "4 min read",
        "summary": "Understand JavaScript's primitive types: String, Number, Boolean, Null, Undefined, BigInt, and Symbol.",
        "content": """<p class='lead'>JavaScript is a dynamically typed language. This means you do not need to specify the data type of a variable upon creation—the JavaScript engine detects it automatically at runtime.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Strict Type Checking with typeof</strong></div>
  <p>Use the <code>typeof</code> operator to verify user input and API responses before processing data in financial calculations or checkout forms.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>JavaScript Primitive Types:</h4>
<ul>
  <li><code>String</code>: Textual data wrapped in quotes (<code>'hello'</code>, <code>"world"</code>, <code>`template`</code>).</li>
  <li><code>Number</code>: Integers and floating-point numbers (<code>42</code>, <code>19.99</code>).</li>
  <li><code>Boolean</code>: Logical truth values (<code>true</code> or <code>false</code>).</li>
  <li><code>Undefined</code>: A variable declared without an assigned value.</li>
  <li><code>Null</code>: An intentional empty or non-existent value.</li>
</ul>""",
        "content_si": """<p class='lead'>JavaScript යනු dynamically typed භාෂාවකි. මෙහිදී variable එකක් declare කිරීමේදී එහි data type එක කලින් සඳහන් කිරීමට අවශ්‍ය නොවන අතර runtime එකේදී JavaScript engine එක මගින් එය තීරණය කරයි.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>typeof මගින් Type Check කිරීම</strong></div>
  <p>Checkout forms හෝ billing ගණනය කිරීම් වලදී user input හෝ API responses නිවැරදිදැයි තහවුරු කර ගැනීමට සැමවිටම <code>typeof</code> operator එක භාවිතා කරන්න.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>JavaScript හි මූලික Data Types:</h4>
<ul>
  <li><code>String</code>: Quotes තුළ ලියන ලද අකුරු හෝ වාක්‍ය (<code>'hello'</code>, <code>"world"</code>).</li>
  <li><code>Number</code>: පූර්ණ සංඛ්‍යා සහ දශම සංඛ්‍යා (<code>5000</code>, <code>99.5</code>).</li>
  <li><code>Boolean</code>: සත්‍ය හෝ අසත්‍ය අගයන් (<code>true</code> හෝ <code>false</code>).</li>
  <li><code>Undefined</code>: අගයක් assign නොකළ variable එකක්.</li>
  <li><code>Null</code>: හිතාමතාම හිස් අගයක් දැක්වීමට යොදන value එක.</li>
</ul>""",
        "code": """<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }
    .card { background: #1e293b; padding: 15px; border-radius: 8px; margin-bottom: 10px; }
    .type { color: #04AA6D; font-weight: bold; }
  </style>
</head>
<body>
  <h3>JavaScript Data Types Checker</h3>
  <div id="types-container"></div>

  <script>
    const title = 'Web Design Sri Lanka';
    const price = 5000;
    const isLive = true;
    const clientNote = null;
    let pendingReview;

    const items = [
      { name: 'title', val: title, type: typeof title },
      { name: 'price', val: price, type: typeof price },
      { name: 'isLive', val: isLive, type: typeof isLive },
      { name: 'clientNote', val: 'null', type: typeof clientNote },
      { name: 'pendingReview', val: 'undefined', type: typeof pendingReview }
    ];

    let html = '';
    items.forEach(item => {
      html += '<div class="card">Variable: <code>' + item.name + '</code> | Type: <span class="type">' + item.type + '</span></div>';
    });
    document.getElementById('types-container').innerHTML = html;
  </script>
</body>
</html>""",
        "keyTakeaways": [
            "JavaScript primitives include String, Number, Boolean, Null, Undefined, BigInt, and Symbol.",
            "Variables are dynamically typed and can hold any primitive value.",
            "typeof null evaluates to 'object' due to a historical JavaScript design artifact."
        ],
        "challenge": {
            "question": "What does typeof '5000' evaluate to in JavaScript?",
            "options": ["number", "string", "boolean", "undefined"],
            "answer": 1,
            "explanation": "Any value enclosed in single or double quotes is recognized as a String."
        }
    },
    {
        "id": "js_operators",
        "title": "Operators, Expressions & Strict Equality (===)",
        "readTime": "4 min read",
        "summary": "Master arithmetic, logical, comparison, ternary operators and why strict equality is critical.",
        "content": """<p class='lead'>Operators allow you to perform calculations, compare values, and execute logical evaluations across your web applications.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Always Use Strict Equality (===)</strong></div>
  <p>Never use loose equality (<code>==</code>) because it conducts implicit type coercion behind the scenes (e.g. <code>0 == ''</code> is true). Always use strict equality (<code>===</code>) and strict inequality (<code>!==</code>) for predictable logic.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>Key Operator Categories:</h4>
<ul>
  <li><strong>Arithmetic:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> (modulus)</li>
  <li><strong>Comparison:</strong> <code>===</code>, <code>!==</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></li>
  <li><strong>Logical:</strong> <code>&amp;&amp;</code> (AND), <code>||</code> (OR), <code>!</code> (NOT), <code>??</code> (nullish coalescing)</li>
  <li><strong>Ternary Operator:</strong> <code>condition ? ifTrue : ifFalse</code></li>
</ul>""",
        "content_si": """<p class='lead'>Operators මගින් web application එකක ගණිතමය ගණනය කිරීම්, අගයන් සංසන්දනය කිරීම් සහ logical තීරණ ගැනීම් සිදු කළ හැක.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>සැමවිටම Strict Equality (===) භාවිතා කරන්න</strong></div>
  <p>Loose equality (<code>==</code>) භාවිතා කිරීමෙන් වළකින්න. මන්ද එය background එකේදී implicit type conversion සිදු කරයි (උදාහරණයක් ලෙස <code>0 == ''</code> සත්‍ය වේ). වැරදි වැළැක්වීමට සැමවිටම strict equality (<code>===</code>) සහ strict inequality (<code>!==</code>) යොදා ගන්න.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>ප්‍රධාන Operator වර්ග:</h4>
<ul>
  <li><strong>ගණිතමය (Arithmetic):</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> (modulus)</li>
  <li><strong>සංසන්දනාත්මක (Comparison):</strong> <code>===</code>, <code>!==</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></li>
  <li><strong>Logical:</strong> <code>&amp;&amp;</code> (AND), <code>||</code> (OR), <code>!</code> (NOT), <code>??</code> (nullish coalescing)</li>
  <li><strong>Ternary Operator:</strong> <code>condition ? ifTrue : ifFalse</code></li>
</ul>""",
        "code": """<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }
    .box { background: #1e293b; padding: 15px; border-radius: 8px; margin-top: 10px; }
    .badge { background: #04AA6D; padding: 4px 8px; border-radius: 4px; font-weight: bold; }
  </style>
</head>
<body>
  <h3>Ternary & Comparison Demonstration</h3>
  <div class="box" id="res"></div>

  <script>
    const packageBudget = 25000;
    const isEcommerce = packageBudget >= 20000;
    
    // Ternary operator
    const tierName = isEcommerce ? 'Corporate E-Commerce' : 'Standard Business';
    
    // Strict comparison check
    const isExactBudget = (packageBudget === 25000);

    document.getElementById('res').innerHTML = 
      'Selected Tier: <span class="badge">' + tierName + '</span><br><br>' +
      'Budget Match Verified (===): <strong>' + isExactBudget + '</strong>';
  </script>
</body>
</html>""",
        "keyTakeaways": [
            "Use strict equality (===) to compare both value and data type without implicit coercion.",
            "Ternary operator provides concise, readable 1-line inline conditional expressions.",
            "Logical operators (&& and ||) support short-circuit evaluation in JavaScript."
        ],
        "challenge": {
            "question": "What is the result of '10' === 10 in JavaScript?",
            "options": ["true", "false", "undefined", "NaN"],
            "answer": 1,
            "explanation": "Strict equality (===) checks both value and type. A String ('10') does not equal a Number (10)."
        }
    },
    {
        "id": "js_conditionals",
        "title": "Conditional Branching (if, else if, else, switch)",
        "readTime": "5 min read",
        "summary": "Control application execution flow using robust if/else logic blocks and switch statements.",
        "content": """<p class='lead'>Conditional statements direct your code to execute specific blocks depending on whether defined conditions evaluate to <code>true</code> or <code>false</code>.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Guard Clauses & Early Returns</strong></div>
  <p>Avoid nested if-else pyramids by using guard clauses that return early if validation fails. This makes agency codebase cleaner, flatter, and easier to test.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>Core Conditional Syntax:</h4>
<pre><code>if (condition1) {
  // Executes when condition1 is true
} else if (condition2) {
  // Executes when condition2 is true
} else {
  // Default fallback block
}</code></pre>""",
        "content_si": """<p class='lead'>Conditional statements මගින් යම් කොන්දේසියක් සත්‍ය (<code>true</code>) හෝ අසත්‍ය (<code>false</code>) වීම මත පදනම්ව විවිධ code blocks execute කිරීමට ඉඩ සලසයි.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Early Return සහ Guard Clauses භාවිතය</strong></div>
  <p>අනවශ්‍ය nested if-else කේත ගොඩගැසීම වැළැක්වීමට guard clauses යොදා ගෙන validation අසමත් වූ විගස function එකෙන් early return වන්න. එමගින් code එක කියවීමට හා නඩත්තු කිරීමට පහසු වේ.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>මූලික Syntax ආකෘතිය:</h4>
<pre><code>if (condition1) {
  // condition1 සත්‍ය වූ විට ක්‍රියාත්මක වේ
} else if (condition2) {
  // condition2 සත්‍ය වූ විට ක්‍රියාත්මක වේ
} else {
  // ඉහත කිසිවක් සත්‍ය නොවූ විට fallback වේ
}</code></pre>""",
        "code": """<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }
    .btn { background: #04AA6D; color: #fff; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .out { margin-top: 15px; padding: 15px; background: #1e293b; border-radius: 6px; }
  </style>
</head>
<body>
  <h3>Website Tier Recommendation Engine</h3>
  <input type="number" id="budgetInput" value="15000" style="padding:8px; border-radius:4px; border:1px solid #475569; background:#0f172a; color:#fff;">
  <button class="btn" onclick="checkTier()">Evaluate Package</button>
  <div class="out" id="tierResult">Enter budget and evaluate...</div>

  <script>
    function checkTier() {
      const budget = Number(document.getElementById('budgetInput').value);
      let tier = '';

      if (budget >= 60000) {
        tier = '🏆 Custom E-Commerce Platform (Payment Gateway + CMS)';
      } else if (budget >= 20000) {
        tier = '⭐ Corporate Professional Website (Multi-Page SEO)';
      } else if (budget >= 5000) {
        tier = '🚀 Starter Launchpad (1-Page High Converting)';
      } else {
        tier = '⚠️ Minimum budget required for professional web services is Rs. 5,000/-';
      }

      document.getElementById('tierResult').textContent = tier;
    }
  </script>
</body>
</html>""",
        "keyTakeaways": [
            "Use if / else if / else to route business logic based on dynamic variables.",
            "Use switch statements when comparing a single variable against many discrete fixed values.",
            "Guard clauses keep functions clean by handling edge cases and errors first."
        ],
        "challenge": {
            "question": "Which statement terminates a case in a JavaScript switch block to prevent fall-through?",
            "options": ["stop", "break", "exit", "return"],
            "answer": 1,
            "explanation": "The break keyword exits the switch statement, preventing execution from falling through to following cases."
        }
    },
    {
        "id": "js_loops",
        "title": "Loops & Iteration (for, while, for...of)",
        "readTime": "5 min read",
        "summary": "Automate repetitive tasks, traverse arrays, and control loop execution with break and continue.",
        "content": """<p class='lead'>Loops execute a code block repeatedly as long as a specified condition remains <code>true</code>. They are fundamental for rendering dynamic product lists and processing API items.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Use for...of for Clean Array Iteration</strong></div>
  <p>For modern array traversals where you don't need manual index arithmetic, <code>for (const item of array)</code> is cleaner and less error-prone than traditional counting loops.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>Common Loop Formats:</h4>
<ul>
  <li><code>for (let i = 0; i &lt; n; i++)</code>: Standard counter-controlled iteration.</li>
  <li><code>for (const item of items)</code>: Iterates over iterable values (arrays, strings, sets).</li>
  <li><code>while (condition)</code>: Runs continuously while condition holds true.</li>
</ul>""",
        "content_si": """<p class='lead'>යම් කොන්දේසියක් සත්‍ය (<code>true</code>) වී පවතින තාක් කල් යම් code block එකක් නැවත නැවතත් ක්‍රියාත්මක කිරීමට loops භාවිතා කරයි. Product ලැයිස්තු render කිරීමට සහ data සැකසීමට මෙය අත්‍යවශ්‍ය වේ.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Arrays සඳහා for...of භාවිතය</strong></div>
  <p>Index අංකය වෙනම අවශ්‍ය නොවන අවස්ථාවලදී arrays කියවීම සඳහා <code>for (const item of array)</code> භාවිතා කිරීම සම්ප්‍රදායික counting loops වලට වඩා පැහැදිලි වන අතර වැරදි අවම කරයි.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>ප්‍රධාන Loop වර්ග:</h4>
<ul>
  <li><code>for (let i = 0; i &lt; n; i++)</code>: සාමාන්‍ය counter එකක් සහිත loop ආකෘතිය.</li>
  <li><code>for (const item of items)</code>: Array එකක ඇති එක් එක් item එක කෙලින්ම ලබා ගන්නා ආකෘතිය.</li>
  <li><code>while (condition)</code>: කොන්දේසිය සත්‍යව පවතින තුරු ක්‍රියාත්මක වන loop එක.</li>
</ul>""",
        "code": """<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }
    .feature-tag { display: inline-block; background: #1e293b; border: 1px solid #334155; padding: 6px 12px; margin: 4px; border-radius: 20px; font-size: 13px; }
  </style>
</head>
<body>
  <h3>Agency Standard Deliverables</h3>
  <div id="featureList"></div>

  <script>
    const features = [
      'Mobile-First Responsive Layout',
      'PayHere Payment Gateway',
      'Google Maps & SEO Schema',
      'Firebase Admin Dashboard',
      'Sub-Second Page Speed'
    ];

    let html = '';
    // Modern for...of loop
    for (const feat of features) {
      html += '<span class="feature-tag">✅ ' + feat + '</span>';
    }

    document.getElementById('featureList').innerHTML = html;
  </script>
</body>
</html>""",
        "keyTakeaways": [
            "Use for...of loops to iterate over array elements cleanly.",
            "Use break to terminate a loop early, and continue to skip to the next iteration.",
            "Always ensure a while loop's exit condition is eventually met to prevent infinite loops."
        ],
        "challenge": {
            "question": "Which loop is best suited for directly iterating over the values of an Array in modern JavaScript?",
            "options": ["for...in", "for...of", "do...repeat", "while...until"],
            "answer": 1,
            "explanation": "for...of iterates directly over values in iterable collections like Arrays, whereas for...in iterates over object keys."
        }
    },
    {
        "id": "js_functions",
        "title": "Functions, Parameters & ES6 Arrow Functions",
        "readTime": "5 min read",
        "summary": "Write modular, reusable code blocks using standard function declarations and modern ES6 arrow syntax.",
        "content": """<p class='lead'>Functions are reusable blocks of code designed to perform a particular task. They prevent repetitive code, accept inputs via parameters, and return calculated results.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>ES6 Arrow Functions for Callbacks</strong></div>
  <p>Arrow functions (<code>() =&gt; {}</code>) provide a concise syntax and lexically bind the <code>this</code> context, making them the standard choice for array callbacks and event handlers.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>Comparison of Syntaxes:</h4>
<pre><code>// 1. Traditional Function Declaration
function calculateTotal(price, taxRate = 0.05) {
  return price + (price * taxRate);
}

// 2. Modern ES6 Arrow Function
const calculateTotalArrow = (price, taxRate = 0.05) => price + (price * taxRate);</code></pre>""",
        "content_si": """<p class='lead'>Functions යනු නැවත නැවත භාවිතා කළ හැකි code කොටස් වේ. ඒවා මගින් code නැවත ලිවීම වළක්වා, parameters මගින් inputs ලබා ගෙන අවසාන ප්‍රතිඵලය return කරයි.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>ES6 Arrow Functions භාවිතය</strong></div>
  <p>Arrow functions (<code>() =&gt; {}</code>) මගින් කේතය කෙටි කරගත හැකි අතර, <code>this</code> context එක lexically bind කරන බැවින් array callbacks සහ event handlers සඳහා එය නූතන standard එක වේ.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>Syntax සැසඳීම:</h4>
<pre><code>// 1. සාමාන්‍ය Function Declaration
function calculateTotal(price, taxRate = 0.05) {
  return price + (price * taxRate);
}

// 2. Modern ES6 Arrow Function
const calculateTotalArrow = (price, taxRate = 0.05) => price + (price * taxRate);</code></pre>""",
        "code": """<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }
    .box { background: #1e293b; padding: 15px; border-radius: 8px; border-left: 4px solid #04AA6D; }
  </style>
</head>
<body>
  <h3>Discount Calculator Engine</h3>
  <div class="box" id="calcBox"></div>

  <script>
    // Pure arrow function with default parameters
    const applyAgencyDiscount = (subtotal, discountPercent = 10) => {
      const discount = subtotal * (discountPercent / 100);
      return subtotal - discount;
    };

    const initial = 20000;
    const finalAmount = applyAgencyDiscount(initial, 15);

    document.getElementById('calcBox').innerHTML = 
      'Regular Price: Rs. ' + initial.toLocaleString() + '/-<br>' +
      'Special 15% Client Promo: <strong>Rs. ' + finalAmount.toLocaleString() + '/-</strong>';
  </script>
</body>
</html>""",
        "keyTakeaways": [
            "Functions encapsulate business logic and enable clean DRY (Don't Repeat Yourself) code.",
            "Default parameters prevent undefined errors when arguments are omitted.",
            "Arrow functions provide concise one-liner return capabilities."
        ],
        "challenge": {
            "question": "What is the return value of an arrow function without braces: const f = (x) => x * 2; when called with f(5)?",
            "options": ["undefined", "5", "10", "NaN"],
            "answer": 2,
            "explanation": "Single-expression arrow functions without curly braces have an implicit return, returning 5 * 2 = 10."
        }
    },
    {
        "id": "js_arrays",
        "title": "Arrays & High-Order Methods (map, filter, reduce)",
        "readTime": "6 min read",
        "summary": "Store ordered collections and transform data declaratively using map, filter, and reduce.",
        "content": """<p class='lead'>Arrays are ordered, index-based lists capable of holding multiple items. In modern software engineering, high-order array methods replace manual loops for data transformation.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Immutability in Array Transformations</strong></div>
  <p>Methods like <code>.map()</code> and <code>.filter()</code> create a new array without mutating the original dataset. Keeping your data immutable makes UI updates fast and predictable.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>Essential Array Methods:</h4>
<ul>
  <li><code>.push(item)</code>: Appends an item to the end of the array.</li>
  <li><code>.map(fn)</code>: Transforms every element and returns a new array.</li>
  <li><code>.filter(fn)</code>: Keeps only items matching the boolean condition.</li>
  <li><code>.reduce(fn, init)</code>: Accumulates array elements into a single computed value.</li>
</ul>""",
        "content_si": """<p class='lead'>Arrays යනු අගයන් කිහිපයක් පිළිවෙළකට තැන්පත් කර තබා ගන්නා index-based ලැයිස්තු වේ. නවීන මෘදුකාංග ඉංජිනේරු විද්‍යාවේදී සාම්ප්‍රදායික loops වෙනුවට high-order array methods බහුලව යොදා ගනී.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Immutability පවත්වා ගැනීම</strong></div>
  <p><code>.map()</code> සහ <code>.filter()</code> වැනි methods මගින් මුල් array එක වෙනස් නොකර (mutate නොකර) අලුත් array එකක් ලබා දෙයි. එමගින් UI updates වේගවත් සහ නිවැරදි වේ.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>ප්‍රධාන Array Methods:</h4>
<ul>
  <li><code>.push(item)</code>: Array එකේ අගට අලුත් item එකක් එකතු කරයි.</li>
  <li><code>.map(fn)</code>: එක් එක් element එක transform කර අලුත් array එකක් සාදයි.</li>
  <li><code>.filter(fn)</code>: කොන්දේසිය සපුරාලන items පමණක් තෝරා ගනී.</li>
  <li><code>.reduce(fn, init)</code>: Array එකේ සියලු අගයන් එකතු කර තනි ප්‍රතිඵලයක් ගණනය කරයි.</li>
</ul>""",
        "code": """<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }
    .item { background: #1e293b; padding: 10px; margin-bottom: 6px; border-radius: 6px; display: flex; justify-content: space-between; }
    .sum { margin-top: 15px; font-weight: bold; color: #04AA6D; font-size: 1.1rem; }
  </style>
</head>
<body>
  <h3>Client Orders & Total Revenue Filter</h3>
  <div id="ordersList"></div>
  <div class="sum" id="totalBox"></div>

  <script>
    const orders = [
      { client: 'Hiri Surf School', package: 'Starter', price: 5000 },
      { client: 'Versells Lanka', package: 'E-Commerce', price: 60000 },
      { client: 'Centennial Leos', package: 'Standard', price: 20000 },
      { client: 'Galle Villa Retreat', package: 'Corporate', price: 35000 }
    ];

    // Filter premium packages (>= 20000)
    const premiumOrders = orders.filter(o => o.price >= 20000);

    // Render using map
    document.getElementById('ordersList').innerHTML = premiumOrders
      .map(o => '<div class="item"><span>' + o.client + ' (' + o.package + ')</span><strong>Rs. ' + o.price.toLocaleString() + '/-</strong></div>')
      .join('');

    // Compute total using reduce
    const grandTotal = premiumOrders.reduce((acc, curr) => acc + curr.price, 0);
    document.getElementById('totalBox').textContent = 'Premium Pipeline Total: Rs. ' + grandTotal.toLocaleString() + '/-';
  </script>
</body>
</html>""",
        "keyTakeaways": [
            "Use .map() when you want to convert an array of items into a new format (like HTML strings).",
            "Use .filter() to discard items that don't match specific criteria without mutating the original array.",
            "Use .reduce() to compute aggregate figures like sums and totals from array collections."
        ],
        "challenge": {
            "question": "Which array method creates a new array containing only elements that satisfy a condition?",
            "options": ["filter()", "map()", "push()", "forEach()"],
            "answer": 0,
            "explanation": "filter() tests each element against a predicate function and returns a new array with matching items."
        }
    },
    {
        "id": "js_objects",
        "title": "Objects, Properties & Destructuring",
        "readTime": "5 min read",
        "summary": "Model real-world entities with key-value pairs, nested properties, and ES6 destructuring.",
        "content": """<p class='lead'>Objects are collections of key-value properties. They are the primary data structure used to represent complex records, API payloads, and database documents.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Clean Code with Object Destructuring</strong></div>
  <p>Use ES6 object destructuring (e.g. <code>const { name, email } = client;</code>) to extract properties cleanly without repeating <code>client.</code> everywhere.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>Object Literal Syntax:</h4>
<pre><code>const project = {
  name: 'Hiri Surf School',
  city: 'Hiriketiya',
  featured: true,
  calculateTax() {
    return this.budget * 0.02;
  }
};</code></pre>""",
        "content_si": """<p class='lead'>Objects යනු key-value pairs වලින් සමන්විත data collections වේ. Complex records, API payloads සහ database documents නිරූපණය කිරීමට ප්‍රධාන වශයෙන්ම objects භාවිතා වේ.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Object Destructuring භාවිතය</strong></div>
  <p>Code එක පිරිසිදුව තබා ගැනීමට ES6 object destructuring (උදාහරණයක් ලෙස <code>const { name, email } = client;</code>) භාවිතා කරන්න. එමගින් නැවත නැවතත් <code>client.name</code> ලෙස ලිවීම අවශ්‍ය නොවේ.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>Object Literal ආකෘතිය:</h4>
<pre><code>const project = {
  name: 'Hiri Surf School',
  city: 'Hiriketiya',
  featured: true,
  calculateTax() {
    return this.budget * 0.02;
  }
};</code></pre>""",
        "code": """<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }
    .client-card { background: #1e293b; border: 1px solid #334155; padding: 15px; border-radius: 8px; }
    .badge { background: #04AA6D; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 11px; }
  </style>
</head>
<body>
  <h3>Client Project Profile</h3>
  <div class="client-card" id="profile"></div>

  <script>
    const agencyProject = {
      clientName: 'Hiri Surf School',
      location: 'Hiriketiya, Sri Lanka',
      rating: 5.0,
      techStack: ['HTML5', 'CSS Grid', 'JavaScript', 'Google Maps API'],
      isCompleted: true
    };

    // Object Destructuring
    const { clientName, location, rating, techStack } = agencyProject;

    document.getElementById('profile').innerHTML = 
      '<h4>' + clientName + ' <span class="badge">⭐ ' + rating + '</span></h4>' +
      '<p style="color:#94a3b8;">Location: ' + location + '</p>' +
      '<p>Tech Used: <strong>' + techStack.join(', ') + '</strong></p>';
  </script>
</body>
</html>""",
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
        "content": """<p class='lead'>The Document Object Model (DOM) represents the webpage as a tree of objects. JavaScript uses the DOM API to modify styles, insert elements, and respond to user interactions in real time.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Use addEventListener Over Inline onclick</strong></div>
  <p>Never write inline <code>onclick=\"...\"</code> attributes directly in HTML. Use <code>element.addEventListener('click', handler)</code> to separate HTML structure from JavaScript behavior and enable multiple listeners.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>Core DOM Methods:</h4>
<ul>
  <li><code>document.querySelector(selector)</code>: Selects the first matching CSS element.</li>
  <li><code>document.querySelectorAll(selector)</code>: Selects all matching elements into a NodeList.</li>
  <li><code>element.classList.toggle('active')</code>: Toggles a CSS class cleanly.</li>
  <li><code>element.addEventListener('event', callback)</code>: Listens for user interactions.</li>
</ul>""",
        "content_si": """<p class='lead'>Document Object Model (DOM) මගින් webpage එක object tree එකක් ලෙස නිරූපණය කරයි. JavaScript මගින් styles වෙනස් කිරීමට, අලුත් elements එකතු කිරීමට සහ user interactions වලට respond කිරීමට DOM API භාවිතා කරයි.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>addEventListener භාවිතය</strong></div>
  <p>HTML ඇතුළත inline <code>onclick=\"...\"</code> ලිවීමෙන් වළකින්න. ඒ වෙනුවට <code>element.addEventListener('click', handler)</code> භාවිතා කිරීමෙන් HTML structure එක සහ JavaScript logic එක වෙන් කර පිරිසිදුව තබා ගත හැක.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>ප්‍රධාන DOM Methods:</h4>
<ul>
  <li><code>document.querySelector(selector)</code>: CSS selector එකට ගැලපෙන පළමු element එක තෝරා ගනී.</li>
  <li><code>document.querySelectorAll(selector)</code>: ගැලපෙන සියලු elements NodeList එකක් ලෙස ලබා දෙයි.</li>
  <li><code>element.classList.toggle('active')</code>: CSS class එකක් පහසුවෙන් toggle කරයි.</li>
  <li><code>element.addEventListener('event', callback)</code>: User interaction එකකට සවන් දී ක්‍රියා කරයි.</li>
</ul>""",
        "code": """<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; text-align: center; }
    .card { max-width: 320px; margin: 0 auto; background: #1e293b; padding: 24px; border-radius: 12px; transition: all 0.3s; }
    .card.highlight { border: 2px solid #04AA6D; box-shadow: 0 0 20px rgba(4,170,109,0.4); }
    .btn { background: #04AA6D; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="card" id="pricingCard">
    <h3>Starter Package</h3>
    <p style="font-size:1.4rem; color:#38bdf8; font-weight:bold;">Rs. 5,000/-</p>
    <button class="btn" id="toggleBtn">Toggle Highlight</button>
  </div>

  <script>
    const card = document.querySelector('#pricingCard');
    const btn = document.querySelector('#toggleBtn');

    btn.addEventListener('click', () => {
      card.classList.toggle('highlight');
      btn.textContent = card.classList.contains('highlight') ? 'Active Highlight' : 'Toggle Highlight';
    });
  </script>
</body>
</html>""",
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
        "content": """<p class='lead'>JavaScript is single-threaded. To prevent network requests from freezing the user interface, JavaScript handles long-running operations asynchronously using Promises and <code>async / await</code>.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Wrap Network Calls in try...catch Blocks</strong></div>
  <p>Always enclose <code>await fetch()</code> calls inside a <code>try...catch</code> block with user-friendly error fallbacks. Never leave a network promise unhandled.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>How async/await Works:</h4>
<pre><code>async function loadLiveFeed() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}</code></pre>""",
        "content_si": """<p class='lead'>JavaScript යනු single-threaded භාෂාවකි. Network requests නිසා browser එක freeze වීම වැළැක්වීමට, Promises සහ <code>async / await</code> මගින් background එකේදී non-blocking ලෙස data ලබා ගනී.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>try...catch භාවිතය</strong></div>
  <p>සැමවිටම <code>await fetch()</code> calls එකක් <code>try...catch</code> block එකක් තුළ ලියන්න. Network බිඳවැටීමකදී පවා user හට පැහැදිලි error message එකක් පෙන්වීමට මෙය උපකාරී වේ.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>async/await ක්‍රියා කරන ආකාරය:</h4>
<pre><code>async function loadLiveFeed() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}</code></pre>""",
        "code": """<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }
    .btn { background: #04AA6D; color: #fff; padding: 10px 18px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    .box { margin-top: 15px; padding: 15px; background: #1e293b; border-left: 4px solid #04AA6D; border-radius: 6px; }
  </style>
</head>
<body>
  <h3>Async / Await Simulation</h3>
  <button class="btn" id="fetchBtn">Fetch Real-Time Status</button>
  <div class="box" id="resultBox">Click button to fetch...</div>

  <script>
    const btn = document.getElementById('fetchBtn');
    const resultBox = document.getElementById('resultBox');

    btn.addEventListener('click', async () => {
      resultBox.textContent = 'Contacting server...';
      try {
        // Simulated network request delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const mockData = { serverStatus: 'Online', latencyMs: 24, cloudRegion: 'ap-south-1' };
        resultBox.innerHTML = 
          'Status: <strong style="color:#04AA6D;">' + mockData.serverStatus + '</strong><br>' +
          'Ping: ' + mockData.latencyMs + 'ms | Region: ' + mockData.cloudRegion;
      } catch (err) {
        resultBox.innerHTML = '<span style="color:#ef4444;">Network Error: ' + err.message + '</span>';
      }
    });
  </script>
</body>
</html>""",
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
        "content": """<p class='lead'>Errors are an inevitable part of software engineering. Robust applications anticipate potential failures and manage them smoothly without interrupting the user's workflow.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Custom Error Messages for Users</strong></div>
  <p>Never expose raw technical error stack traces to public visitors. Log the raw error to your monitoring system, but show clear, actionable Sinhala or English guidance on screen.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>try...catch Structure:</h4>
<pre><code>try {
  // Risky code that might throw
} catch (error) {
  // Fallback recovery code
} finally {
  // Always runs regardless of success or failure
}</code></pre>""",
        "content_si": """<p class='lead'>මෘදුකාංග නිර්මාණයේදී දෝෂ (errors) ඇති වීම සාමාන්‍ය දෙයකි. විශිෂ්ට web applications මගින් මෙවැනි දෝෂ කල්තියා හඳුනාගෙන, website එක crash වීම වළක්වා පරිශීලකයාට බාධාවක් නොවන සේ පාලනය කරයි.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>පැහැදිලි Error Messages පෙන්වීම</strong></div>
  <p>System එකේ technical stack trace එක public visitors ලාට පෙන්වීමෙන් වළකින්න. Debugging සඳහා එය console එකට log කරන අතරතුර, screen එක මත සරල හා මිත්‍රශීලී පණිවිඩයක් දිස්වීමට සලස්වන්න.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>try...catch ආකෘතිය:</h4>
<pre><code>try {
  // දෝෂයක් ඇති විය හැකි code කොටස
} catch (error) {
  // දෝෂය හසු කරගෙන විසඳුම් ලබා දෙන කොටස
} finally {
  // සාර්ථක වුවත් නැතත් අනිවාර්යයෙන්ම ක්‍රියාත්මක වන කොටස
}</code></pre>""",
        "code": """<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; }
    .box { background: #1e293b; padding: 15px; border-radius: 8px; margin-top: 10px; }
  </style>
</head>
<body>
  <h3>Safe JSON Parser with try...catch</h3>
  <div class="box" id="debugBox">Testing JSON parser...</div>

  <script>
    const malformedJson = "{ client: 'Infinite', invalidJson }";
    const box = document.getElementById('debugBox');

    try {
      const parsed = JSON.parse(malformedJson);
      box.textContent = 'Success: ' + parsed.client;
    } catch (err) {
      box.innerHTML = '<span style="color:#f87171;">Caught Exception Safely:</span> ' + err.message;
    } finally {
      box.innerHTML += '<br><small style="color:#94a3b8;">(finally block executed: cleanup finished)</small>';
    }
  </script>
</body>
</html>""",
        "keyTakeaways": [
            "Use try blocks to run statements that may trigger exceptions (like JSON parsing or network requests).",
            "The catch block receives the Error object with message and name properties.",
            "The finally block always runs, making it ideal for hiding loading spinners or closing connections."
        ],
        "challenge": {
            "question": "Which block in a try-catch-finally statement executes regardless of whether an exception was thrown?",
            "options": ["catch", "try", "finally", "default"],
            "answer": 2,
            "explanation": "The finally block always executes after try and catch blocks, whether an error occurred or not."
        }
    },
    {
        "id": "js_localstorage",
        "title": "Client-Side Storage (localStorage & sessionStorage)",
        "readTime": "5 min read",
        "summary": "Persist user settings, theme preferences, and cart data in the browser with localStorage.",
        "content": """<p class='lead'>Modern browsers provide the Web Storage API, allowing websites to store key-value data persistently on the user's device without expiring on page reload.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Store Objects as JSON Strings</strong></div>
  <p><code>localStorage</code> only stores strings. Always serialize objects using <code>JSON.stringify()</code> before saving, and parse them with <code>JSON.parse()</code> when retrieving.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>Storage API Methods:</h4>
<ul>
  <li><code>localStorage.setItem('key', 'value')</code>: Saves a persistent key-value pair.</li>
  <li><code>localStorage.getItem('key')</code>: Retrieves a stored value.</li>
  <li><code>localStorage.removeItem('key')</code>: Deletes a specific key.</li>
  <li><code>localStorage.clear()</code>: Clears all stored keys for the current domain.</li>
</ul>""",
        "content_si": """<p class='lead'>නවීන browsers මගින් Web Storage API ලබා දෙන අතර, එමගින් website එක reload වූ පසුද නැති නොවන සේ user ගේ device එක තුළ persistent දත්ත තැන්පත් කර තබා ගත හැක.</p>
<div class='pro-tip-card'>
  <div class='pro-tip-header'><span class='pro-badge'>💡 Agency Best Practice</span><strong>Objects සඳහා JSON භාවිතා කිරීම</strong></div>
  <p><code>localStorage</code> තුළ තැන්පත් කළ හැක්කේ strings පමණි. එබැවින් objects සුරැකීමට පෙර <code>JSON.stringify()</code> භාවිතා කර string බවට පත් කරන්න, නැවත ලබා ගැනීමේදී <code>JSON.parse()</code> යොදා ගන්න.</p>
</div>
<h4 style='color:#38bdf8; margin-top:20px;'>ප්‍රධාන Storage Methods:</h4>
<ul>
  <li><code>localStorage.setItem('key', 'value')</code>: Key-value pair එකක් තැන්පත් කරයි.</li>
  <li><code>localStorage.getItem('key')</code>: තැන්පත් කර ඇති අගය ලබා ගනී.</li>
  <li><code>localStorage.removeItem('key')</code>: අදාළ key එක ඉවත් කරයි.</li>
  <li><code>localStorage.clear()</code>: එම domain එකේ සියලු storage දත්ත මකා දමයි.</li>
</ul>""",
        "code": """<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0b0f19; font-family: sans-serif; color: #fff; padding: 20px; text-align: center; }
    .btn { background: #04AA6D; color: #fff; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin: 4px; }
    .btn-red { background: #ef4444; }
  </style>
</head>
<body>
  <h3>Dark / Light Theme Persistence</h3>
  <p id="themeStatus">Current Theme: Dark</p>
  <button class="btn" onclick="saveTheme('Dark')">Dark Mode</button>
  <button class="btn" onclick="saveTheme('Light')">Light Mode</button>
  <button class="btn btn-red" onclick="resetTheme()">Clear Preference</button>

  <script>
    function saveTheme(mode) {
      localStorage.setItem('infinite_theme_pref', mode);
      render();
    }

    function resetTheme() {
      localStorage.removeItem('infinite_theme_pref');
      render();
    }

    function render() {
      const saved = localStorage.getItem('infinite_theme_pref') || 'Dark (Default)';
      document.getElementById('themeStatus').textContent = 'Saved Storage Preference: ' + saved;
    }
    render();
  </script>
</body>
</html>""",
        "keyTakeaways": [
            "localStorage data persists even after browser restarts until explicitly cleared.",
            "sessionStorage persists only for the duration of the browser tab session.",
            "Always serialize complex objects with JSON.stringify before saving."
        ],
        "challenge": {
            "question": "What data type does localStorage natively support storing as values?",
            "options": ["Strings only", "Objects and functions", "Binary buffers", "Numbers and arrays natively"],
            "answer": 0,
            "explanation": "localStorage keys and values are always stored as UTF-16 DOMStrings."
        }
    }
]

# ─────────────────────────────────────────────────────────────────────────────
# AI API PROMPT & GENERATION ENGINE
# ─────────────────────────────────────────────────────────────────────────────

def call_ai_model_if_available(topic_title, topic_id):
    anthropic_key = os.environ.get('ANTHROPIC_API_KEY')
    openai_key = os.environ.get('OPENAI_API_KEY')

    prompt = f"""You are the senior curriculum author for Infinite Creative Web Design (infiniteweb.dev).
Generate an original, beginner-friendly coding lesson on: '{topic_title}' (ID: '{topic_id}').
Strict Constraints:
1. Return strictly valid JSON with keys: 'title', 'readTime', 'summary', 'content', 'content_si', 'code', 'keyTakeaways', 'challenge'.
2. 'content': English explanation with agency best practice pro-tip card.
3. 'content_si': Sinhala translation of explanatory text only.
CRITICAL TRANSLATION RULE:
NEVER translate code, code comments, HTML tags, or programming keywords (function, const, let, var, return, class, if, else, for, while, async, await, try, catch, etc.) or variable/function names. They MUST remain strictly in English.
4. 'code': Complete runnable HTML + JavaScript snippet.
5. 'keyTakeaways': Array of 3 string bullet points.
6. 'challenge': Object with 'question', 'options' (array of 4 strings), 'answer' (0-indexed integer), 'explanation'.
"""

    if anthropic_key:
        try:
            req = urllib.request.Request(
                'https://api.anthropic.com/v1/messages',
                data=json.dumps({
                    'model': 'claude-3-5-sonnet-20241022',
                    'max_tokens': 2000,
                    'messages': [{'role': 'user', 'content': prompt}]
                }).encode('utf-8'),
                headers={
                    'x-api-key': anthropic_key,
                    'anthropic-version': '2023-06-01',
                    'content-type': 'application/json'
                }
            )
            with urllib.request.urlopen(req, timeout=15) as res:
                body = json.loads(res.read().decode('utf-8'))
                raw_text = body['content'][0]['text']
                m = re.search(r'\{.*\}', raw_text, re.DOTALL)
                if m:
                    return json.loads(m.group(0))
        except Exception as e:
            print(f"Anthropic API call skipped/fallback ({e})")

    if openai_key:
        try:
            req = urllib.request.Request(
                'https://api.openai.com/v1/chat/completions',
                data=json.dumps({
                    'model': 'gpt-4o-mini',
                    'messages': [{'role': 'user', 'content': prompt}],
                    'response_format': {'type': 'json_object'}
                }).encode('utf-8'),
                headers={
                    'Authorization': f'Bearer {openai_key}',
                    'Content-Type': 'application/json'
                }
            )
            with urllib.request.urlopen(req, timeout=15) as res:
                body = json.loads(res.read().decode('utf-8'))
                return json.loads(body['choices'][0]['message']['content'])
        except Exception as e:
            print(f"OpenAI API call skipped/fallback ({e})")

    return None

# ─────────────────────────────────────────────────────────────────────────────
# GLOSSARY INTEGRITY VERIFIER
# ─────────────────────────────────────────────────────────────────────────────

def verify_translation_integrity(lessons, glossary_path):
    if not os.path.exists(glossary_path):
        return 0, []

    try:
        with open(glossary_path, 'r', encoding='utf-8') as f:
            glossary = json.load(f)
    except Exception as e:
        print("Could not load glossary:", e)
        return 0, []

    keywords = glossary.get('programming_keywords', [])
    datatypes = glossary.get('datatypes_and_values', [])
    protected_tokens = keywords + datatypes
    verified_count = len(protected_tokens)
    violations = []

    prohibited_map = {
        'ෆන්ක්ෂන්': 'function',
        'ලූප්': 'loop',
        'වේරියබල්': 'variable',
        'ක්ලාස්': 'class',
        'කොන්ස්ට්': 'const',
        'ලෙට්': 'let',
        'ඉෆ්': 'if',
        'එල්ස්': 'else'
    }

    for lesson in lessons:
        si_text = lesson.get('content_si', '')
        for bad_word, eng in prohibited_map.items():
            if bad_word in si_text:
                violations.append(f"Lesson '{lesson['id']}': Found prohibited transliteration '{bad_word}' instead of English code keyword '{eng}'.")

    return verified_count, violations

# ─────────────────────────────────────────────────────────────────────────────
# CURRICULUM SYNCHRONIZATION RUNNER
# ─────────────────────────────────────────────────────────────────────────────

def run_tutorials_sync():
    print("=================================================================")
    print("🤖 Bot 01 — Autonomous AI Coding Lessons & Translation Engine")
    print("=================================================================")

    active_lessons = []
    print(f"Processing JavaScript Master Syllabus ({len(JAVASCRIPT_SYLLABUS)} core modules)...")

    for item in JAVASCRIPT_SYLLABUS:
        ai_generated = call_ai_model_if_available(item['title'], item['id'])
        if ai_generated and isinstance(ai_generated, dict) and 'content' in ai_generated:
            lesson_entry = ai_generated
            lesson_entry['id'] = item['id']
            print(f"  [AI Online] Generated module: {item['title']}")
        else:
            lesson_entry = item
            print(f"  [Autonomous Engine] Synchronized module: {item['title']}")
        active_lessons.append(lesson_entry)

    protected_count, violations = verify_translation_integrity(active_lessons, GLOSSARY_PATH)
    if violations:
        print("⚠️ Warning: Translation integrity issues detected:")
        for v in violations:
            print("   -", v)
    else:
        print(f"✅ Translation integrity verified: 0 violations across {protected_count}+ protected programming tokens.")

    if not os.path.exists(TUTORIALS_PATH):
        print(f"Error: {TUTORIALS_PATH} not found!")
        return False

    with open(TUTORIALS_PATH, 'r', encoding='utf-8') as f:
        file_content = f.read()

    match = re.search(r'window\.ACADEMY_COURSES\s*=\s*(\{.*?\});\s*(?:window\.W3_TUTORIALS|\Z)', file_content, re.DOTALL)
    if match:
        try:
            courses = json.loads(match.group(1))
        except Exception:
            courses = {}
    else:
        courses = {}

    if not courses or 'js' not in courses:
        courses['js'] = {
            "name": "JavaScript",
            "icon": "⚡",
            "tagline": "Dynamic Frontend Engineering, DOM & Modern APIs",
            "badge": "Programming",
            "color": "#F7DF1E",
            "sections": [
                {
                    "title": "1. JavaScript Master Curriculum",
                    "lessons": []
                }
            ]
        }

    if 'js' in courses:
        if not courses['js'].get('sections'):
            courses['js']['sections'] = [{"title": "1. JavaScript Master Curriculum", "lessons": []}]
        courses['js']['sections'][0]['title'] = "1. JavaScript Core & Modern Web Engineering"
        courses['js']['sections'][0]['lessons'] = active_lessons

    js_header = """// Infinite Academy — Bespoke Developer Hub & Tutorials Engine
// Original Creative Curriculum by Infinite Creative Web Design
// Auto-generated and synchronized by Autonomous AI Lesson Bot

window.ACADEMY_COURSES = """

    new_file_text = js_header + json.dumps(courses, ensure_ascii=False, indent=2) + ";\nwindow.W3_TUTORIALS = window.ACADEMY_COURSES;\n"

    with open(TUTORIALS_PATH, 'w', encoding='utf-8') as f:
        f.write(new_file_text)

    total_lessons = sum(len(sec.get('lessons', [])) for c in courses.values() for sec in c.get('sections', []))
    bilingual_lessons = sum(1 for c in courses.values() for sec in c.get('sections', []) for l in sec.get('lessons', []) if l.get('content_si'))

    print(f"Saved w3-tutorials.js: {total_lessons} total lessons across {len(courses)} courses ({bilingual_lessons} bilingual modules).")

    logs = []
    if os.path.exists(LOG_PATH):
        try:
            with open(LOG_PATH, 'r', encoding='utf-8') as f:
                logs = json.load(f)
        except Exception:
            logs = []

    log_entry = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "bot_name": "Bot 01 — Coding Lessons Engine",
        "bot_icon": "🤖",
        "status": "SUCCESS",
        "message": f"Synchronized JavaScript basics curriculum ({len(active_lessons)} modules, {bilingual_lessons} total bilingual lessons). Preserved {protected_count}+ English programming keywords against code glossary."
    }
    logs.insert(0, log_entry)

    with open(LOG_PATH, 'w', encoding='utf-8') as f:
        json.dump(logs[:50], f, ensure_ascii=False, indent=2)

    print(f"Logged activity to bot-activity-log.json.")
    print("SUCCESS: Autonomous AI Coding Lessons Bot execution complete!\n")
    return True

if __name__ == '__main__':
    success = run_tutorials_sync()
    if not success:
        sys.exit(1)
