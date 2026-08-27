// W3Schools-Style Complete Tutorials Database
// Generated for Infinite Academy Platform

window.W3_TUTORIALS = {
  "html": {
    "name": "HTML",
    "fullName": "HTML5 Tutorial",
    "desc": "The standard markup language for building web pages",
    "color": "#E34F26",
    "sections": [
      {
        "title": "HTML Tutorial",
        "lessons": [
          {
            "id": "html_intro",
            "title": "HTML Introduction",
            "subtitle": "HTML is the standard markup language for creating Web pages.",
            "content": "\n              <p>HTML stands for <strong>Hyper Text Markup Language</strong>. It describes the structure of a Web page and tells the browser how to display text, images, and other media.</p>\n              <div class=\"w3-note\">\n                <h4>Core HTML Facts:</h4>\n                <ul>\n                  <li>HTML stands for Hyper Text Markup Language</li>\n                  <li>HTML elements are the building blocks of HTML pages</li>\n                  <li>HTML elements are represented by <code>&lt;tagname&gt;</code> tags</li>\n                  <li>Browsers do not display the HTML tags, but use them to render the content of the page</li>\n                </ul>\n              </div>\n              <h3>A Simple HTML Document</h3>\n            ",
            "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Page Title</title>\n</head>\n<body>\n\n  <h1>My First Heading</h1>\n  <p>My first paragraph.</p>\n\n</body>\n</html>",
            "explanation": "\n              <h3>HTML Document Breakdown</h3>\n              <table class=\"w3-table\">\n                <tr><th>Tag</th><th>Description</th></tr>\n                <tr><td><code>&lt;!DOCTYPE html&gt;</code></td><td>Declaration defining that this document is an HTML5 document</td></tr>\n                <tr><td><code>&lt;html&gt;</code></td><td>Root element of an HTML page</td></tr>\n                <tr><td><code>&lt;head&gt;</code></td><td>Contains meta information, title, scripts, and stylesheet links</td></tr>\n                <tr><td><code>&lt;title&gt;</code></td><td>Specifies a title shown in browser tab and search engines</td></tr>\n                <tr><td><code>&lt;body&gt;</code></td><td>Contains the visible page content (headings, paragraphs, images)</td></tr>\n                <tr><td><code>&lt;h1&gt;</code></td><td>Defines a primary header</td></tr>\n                <tr><td><code>&lt;p&gt;</code></td><td>Defines a paragraph of text</td></tr>\n              </table>\n            ",
            "exercise": {
              "question": "What does HTML stand for?",
              "options": [
                "Hyperlinks and Text Markup Language",
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "High Tech Modern Language"
              ],
              "answer": 1,
              "tip": "HTML = Hyper Text Markup Language."
            }
          },
          {
            "id": "html_basic",
            "title": "HTML Basic Examples",
            "subtitle": "Learn the most fundamental HTML building blocks.",
            "content": "\n              <p>In this lesson we look at basic HTML examples: Headings, Paragraphs, Links, Images, and Buttons.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n  <h1>Main Heading</h1>\n  <p>This is a paragraph.</p>\n  \n  <a href=\"https://kanchu12345.github.io/my-web2/\">Visit Infinite Design</a><br><br>\n  \n  <button onclick=\"alert('Hello from Infinite Academy!')\" style=\"background:#04AA6D; color:white; padding:8px 16px; border:none; border-radius:4px; cursor:pointer;\">\n    Click Me\n  </button>\n\n</body>\n</html>",
            "explanation": "\n              <p>HTML links are defined with the <code>&lt;a&gt;</code> tag, and button elements are defined with <code>&lt;button&gt;</code>.</p>\n            ",
            "exercise": {
              "question": "Which tag is used to create a clickable button in HTML?",
              "options": [
                "<click>",
                "<btn>",
                "<button>",
                "<input type='clickable'>"
              ],
              "answer": 2,
              "tip": "<button> creates a clickable button."
            }
          },
          {
            "id": "html_elements",
            "title": "HTML Elements",
            "subtitle": "An HTML element is defined by a start tag, some content, and an end tag.",
            "content": "\n              <p>The HTML <strong>element</strong> is everything from the start tag to the end tag:</p>\n              <div class=\"w3-code-syntax\"><code>&lt;tagname&gt; Content goes here... &lt;/tagname&gt;</code></div>\n              <p>Empty elements (like <code>&lt;br&gt;</code> and <code>&lt;img&gt;</code>) do not have content or end tags.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n  <h1>My First Heading</h1>\n  <p>My first paragraph with a line<br>break inside it.</p>\n\n</body>\n</html>",
            "explanation": "<p>HTML elements can be nested inside one another to construct complex UI structures.</p>",
            "exercise": {
              "question": "What is an empty HTML element?",
              "options": [
                "An element with no attributes",
                "An element with no content or closing tag (e.g. <br>, <img>)",
                "An element with zero opacity",
                "A deleted element"
              ],
              "answer": 1,
              "tip": "Empty elements have no closing tag."
            }
          },
          {
            "id": "html_attributes",
            "title": "HTML Attributes",
            "subtitle": "Attributes provide additional information about HTML elements.",
            "content": "\n              <p>All HTML elements can have attributes. Attributes provide additional information and are always specified in the start tag in <code>name=\"value\"</code> pairs.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n  <h2>The href and target Attributes</h2>\n  <p><a href=\"https://kanchu12345.github.io/my-web2/\" target=\"_blank\">Open Website in New Tab</a></p>\n\n  <h2>The src and alt Attributes</h2>\n  <img src=\"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400\" alt=\"Laptop Code\" width=\"300\" style=\"border-radius:8px;\">\n\n</body>\n</html>",
            "explanation": "\n              <p>Common attributes include <code>href</code>, <code>src</code>, <code>alt</code>, <code>style</code>, <code>id</code>, and <code>class</code>.</p>\n            ",
            "exercise": {
              "question": "Where are HTML attributes always specified?",
              "options": [
                "In the end tag",
                "In the start tag",
                "In the CSS file",
                "In the footer"
              ],
              "answer": 1,
              "tip": "Attributes belong in the opening/start tag."
            }
          },
          {
            "id": "html_headings",
            "title": "HTML Headings",
            "subtitle": "Headings define titles and section structure on a web page.",
            "content": "\n              <p>HTML headings are defined with <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> tags. <code>&lt;h1&gt;</code> defines the most important heading. <code>&lt;h6&gt;</code> defines the least important heading.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n  <h1>Heading 1 - Page Title</h1>\n  <h2>Heading 2 - Major Section</h2>\n  <h3>Heading 3 - Subsection</h3>\n  <h4>Heading 4 - Minor Subsection</h4>\n  <h5>Heading 5 - Detail</h5>\n  <h6>Heading 6 - Smallest</h6>\n\n</body>\n</html>",
            "explanation": "<p>Search engines use headings to index the structure and content of your web pages for SEO.</p>",
            "exercise": {
              "question": "How many levels of headings are available in HTML?",
              "options": [
                "3",
                "4",
                "6",
                "10"
              ],
              "answer": 2,
              "tip": "HTML supports 6 heading levels: <h1> through <h6>."
            }
          },
          {
            "id": "html_styles",
            "title": "HTML Styles & Inline CSS",
            "subtitle": "Use the style attribute to style elements directly.",
            "content": "\n              <p>The HTML <code>style</code> attribute has the syntax <code>style=\"property:value;\"</code>.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body style=\"background-color:#f0fdf4; font-family:sans-serif;\">\n\n  <h1 style=\"color:#04AA6D; text-align:center;\">Styled Heading</h1>\n  <p style=\"color:#333; font-size:18px; line-height:1.6;\">\n    This paragraph has custom font size, color, and line height.\n  </p>\n\n</body>\n</html>",
            "explanation": "<p>Properties include <code>color</code>, <code>background-color</code>, <code>font-family</code>, <code>font-size</code>, and <code>text-align</code>.</p>",
            "exercise": {
              "question": "Which style property defines the text alignment in HTML/CSS?",
              "options": [
                "align",
                "text-align",
                "text-position",
                "float"
              ],
              "answer": 1,
              "tip": "text-align: center | left | right | justify;"
            }
          },
          {
            "id": "html_formatting",
            "title": "HTML Formatting",
            "subtitle": "Special elements for formatting text.",
            "content": "\n              <p>Formatting elements include <code>&lt;b&gt;</code> (bold), <code>&lt;strong&gt;</code> (important), <code>&lt;i&gt;</code> (italic), <code>&lt;em&gt;</code> (emphasized), <code>&lt;mark&gt;</code> (highlighted), <code>&lt;small&gt;</code>, <code>&lt;del&gt;</code>, <code>&lt;ins&gt;</code>, <code>&lt;sub&gt;</code>, <code>&lt;sup&gt;</code>.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n  <p>Normal text</p>\n  <p><strong>Important bold text</strong></p>\n  <p><em>Emphasized italic text</em></p>\n  <p>Highlighted <mark>vital information</mark></p>\n  <p>Water: H<sub>2</sub>O | Math: 10<sup>2</sup> = 100</p>\n\n</body>\n</html>",
            "explanation": "<p>Use <code>&lt;strong&gt;</code> and <code>&lt;em&gt;</code> for accessible, semantic text markup.</p>",
            "exercise": {
              "question": "Which tag highlights text with a yellow background by default?",
              "options": [
                "<highlight>",
                "<mark>",
                "<yellow>",
                "<bg>"
              ],
              "answer": 1,
              "tip": "<mark> indicates marked or highlighted text."
            }
          },
          {
            "id": "html_links",
            "title": "HTML Links",
            "subtitle": "HTML links allow users to navigate between web pages.",
            "content": "\n              <p>The <code>&lt;a&gt;</code> tag defines hyperlinks with <code>href</code> destination.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n  <h2>Hyperlinks</h2>\n  <p><a href=\"https://kanchu12345.github.io/my-web2/\" target=\"_blank\">Visit Infinite Creative Web Design</a></p>\n  <p><a href=\"mailto:infinitedesign768@gmail.com\">Send us an Email</a></p>\n  <p><a href=\"tel:+94771234567\">Call +94 77 123 4567</a></p>\n\n</body>\n</html>",
            "explanation": "<p>Use <code>target=\"_blank\"</code> to open links in a new window or tab.</p>",
            "exercise": {
              "question": "Which prefix is used in the href attribute to create a direct phone call link?",
              "options": [
                "phone:",
                "call:",
                "tel:",
                "dial:"
              ],
              "answer": 2,
              "tip": "href='tel:+94771234567' triggers phone dialers."
            }
          },
          {
            "id": "html_images",
            "title": "HTML Images",
            "subtitle": "Embedding images with responsive properties.",
            "content": "\n              <p>Use <code>&lt;img src=\"image.jpg\" alt=\"Description\"&gt;</code> to render images.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n  <h2>Responsive Web Image</h2>\n  <img src=\"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600\" \n       alt=\"Coding Developer Setup\" \n       style=\"max-width:100%; height:auto; border-radius:10px; box-shadow:0 6px 18px rgba(0,0,0,0.1);\">\n\n</body>\n</html>",
            "explanation": "<p>The <code>alt</code> attribute is essential for SEO and screen-reader accessibility.</p>",
            "exercise": {
              "question": "Which attribute is used to provide an alternative text for images?",
              "options": [
                "title",
                "alt",
                "desc",
                "src"
              ],
              "answer": 1,
              "tip": "alt provides alternate text."
            }
          },
          {
            "id": "html_tables",
            "title": "HTML Tables",
            "subtitle": "Arranging structured data into rows and columns.",
            "content": "\n              <p>Use <code>&lt;table&gt;</code>, <code>&lt;tr&gt;</code> (row), <code>&lt;th&gt;</code> (header), and <code>&lt;td&gt;</code> (data cell).</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\ntable { width: 100%; border-collapse: collapse; font-family: sans-serif; }\nth, td { border: 1px solid #ddd; padding: 10px; text-align: left; }\nth { background-color: #04AA6D; color: white; }\ntr:nth-child(even) { background-color: #f9f9f9; }\n</style>\n</head>\n<body>\n\n<h2>Website Packages Table</h2>\n<table>\n  <tr>\n    <th>Plan</th>\n    <th>Pages</th>\n    <th>Price</th>\n  </tr>\n  <tr>\n    <td>Starter</td>\n    <td>3</td>\n    <td>Rs. 5,000/-</td>\n  </tr>\n  <tr>\n    <td>Standard</td>\n    <td>5</td>\n    <td>Rs. 10,000/-</td>\n  </tr>\n  <tr>\n    <td>Professional</td>\n    <td>Custom</td>\n    <td>Rs. 20,000/-</td>\n  </tr>\n</table>\n\n</body>\n</html>",
            "explanation": "<p><code>border-collapse: collapse;</code> prevents double-line borders.</p>",
            "exercise": {
              "question": "Which tag defines a standard data cell in an HTML table?",
              "options": [
                "<th>",
                "<td>",
                "<cell>",
                "<tr>"
              ],
              "answer": 1,
              "tip": "<td> stands for Table Data."
            }
          },
          {
            "id": "html_lists",
            "title": "HTML Lists",
            "subtitle": "Unordered, ordered, and description lists.",
            "content": "\n              <p>Use <code>&lt;ul&gt;</code> for bulleted lists and <code>&lt;ol&gt;</code> for numbered lists with <code>&lt;li&gt;</code> items.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n  <h2>Tech Stack (Unordered)</h2>\n  <ul>\n    <li>HTML5 / CSS3</li>\n    <li>JavaScript ES6+</li>\n    <li>Firebase / Cloud</li>\n  </ul>\n\n  <h2>Project Steps (Ordered)</h2>\n  <ol>\n    <li>Discovery & Planning</li>\n    <li>Design & Prototyping</li>\n    <li>Development & SEO</li>\n    <li>Deployment</li>\n  </ol>\n\n</body>\n</html>",
            "explanation": "<p>List items can contain nested lists for multi-level navigation trees.</p>",
            "exercise": {
              "question": "Which tag defines an unordered (bulleted) list?",
              "options": [
                "<ol>",
                "<list>",
                "<ul>",
                "<dl>"
              ],
              "answer": 2,
              "tip": "<ul> = Unordered List."
            }
          },
          {
            "id": "html_block_inline",
            "title": "HTML Block & Inline Elements",
            "subtitle": "Understand how elements occupy space on the screen.",
            "content": "\n              <p><strong>Block-level elements</strong> always start on a new line and take up the full width available (e.g., <code>&lt;div&gt;</code>, <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;form&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;section&gt;</code>).</p>\n              <p><strong>Inline elements</strong> do not start on a new line and only take up as much width as necessary (e.g., <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;img&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>).</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n  <!-- Block element -->\n  <div style=\"background:#04AA6D; color:white; padding:15px; border-radius:6px; margin-bottom:15px;\">\n    This is a &lt;div&gt; (block element). It spans 100% width.\n  </div>\n\n  <!-- Inline elements -->\n  <p>\n    This is a paragraph with <span style=\"background:yellow; font-weight:bold; padding:2px 6px;\">an inline &lt;span&gt;</span> inside it.\n  </p>\n\n</body>\n</html>",
            "explanation": "<p><code>&lt;div&gt;</code> is the standard block container; <code>&lt;span&gt;</code> is the standard inline text container.</p>",
            "exercise": {
              "question": "Which of the following is an inline element?",
              "options": [
                "<div>",
                "<p>",
                "<span>",
                "<section>"
              ],
              "answer": 2,
              "tip": "<span> is an inline container for styling parts of text."
            }
          },
          {
            "id": "html_forms",
            "title": "HTML Forms & Input Types",
            "subtitle": "Collecting data from users with forms.",
            "content": "\n              <p>HTML forms use <code>&lt;form&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code>, <code>&lt;textarea&gt;</code>, and <code>&lt;button&gt;</code>.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\ninput, select, textarea { width: 100%; padding: 8px; margin: 6px 0 12px; box-sizing: border-box; }\n</style>\n</head>\n<body>\n\n<h2>Inquiry Form</h2>\n<form action=\"#\">\n  <label for=\"name\">Name:</label>\n  <input type=\"text\" id=\"name\" required placeholder=\"Your full name\">\n\n  <label for=\"pkg\">Package:</label>\n  <select id=\"pkg\">\n    <option>Starter (Rs. 5,000/-)</option>\n    <option>Standard (Rs. 10,000/-)</option>\n    <option>Professional (Rs. 20,000/-)</option>\n    <option>E-Commerce (Rs. 60,000/-)</option>\n  </select>\n\n  <button type=\"submit\" style=\"background:#04AA6D; color:white; padding:10px 20px; border:none; border-radius:6px; cursor:pointer; font-weight:bold;\">\n    Submit Form\n  </button>\n</form>\n\n</body>\n</html>",
            "explanation": "<p>Input types include <code>text</code>, <code>password</code>, <code>email</code>, <code>number</code>, <code>checkbox</code>, <code>radio</code>, <code>date</code>, <code>file</code>, and <code>submit</code>.</p>",
            "exercise": {
              "question": "Which attribute ensures a form field cannot be submitted blank?",
              "options": [
                "validate",
                "required",
                "mandatory",
                "check"
              ],
              "answer": 1,
              "tip": "required triggers native browser validation."
            }
          },
          {
            "id": "html_media",
            "title": "HTML Audio & Video",
            "subtitle": "Embedding native multimedia without third-party plugins.",
            "content": "\n              <p>HTML5 introduced native <code>&lt;video&gt;</code> and <code>&lt;audio&gt;</code> tags with <code>controls</code>, <code>autoplay</code>, and <code>loop</code>.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n<h2>HTML Video Element</h2>\n\n<video width=\"320\" height=\"240\" controls poster=\"images/logo.png\" style=\"border-radius:8px;\">\n  <source src=\"https://www.w3schools.com/html/mov_bbb.mp4\" type=\"video/mp4\">\n  Your browser does not support the video tag.\n</video>\n\n</body>\n</html>",
            "explanation": "<p>Always specify <code>controls</code> so users can play, pause, and adjust volume.</p>",
            "exercise": {
              "question": "Which attribute provides play, pause, and volume controls on an HTML video?",
              "options": [
                "buttons",
                "controls",
                "media-bar",
                "player"
              ],
              "answer": 1,
              "tip": "controls enables browser-native playback buttons."
            }
          }
        ]
      }
    ]
  },
  "css": {
    "name": "CSS",
    "fullName": "CSS3 Tutorial",
    "desc": "The stylesheet language for designing modern web pages",
    "color": "#264DE4",
    "sections": [
      {
        "title": "CSS Tutorial",
        "lessons": [
          {
            "id": "css_intro",
            "title": "CSS Introduction",
            "subtitle": "CSS is the language we use to style an HTML document.",
            "content": "\n              <p><strong>CSS</strong> stands for <strong>Cascading Style Sheets</strong>. CSS describes how HTML elements are to be displayed on screen, tablet, mobile, and print.</p>\n              <div class=\"w3-note\">\n                <h4>CSS Benefits:</h4>\n                <ul>\n                  <li>Separates presentation from structure</li>\n                  <li>Saves massive time by sharing styles across whole websites</li>\n                  <li>Provides responsive layouts with media queries, Flexbox, and Grid</li>\n                </ul>\n              </div>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody { background: #f8fafc; font-family: Arial, sans-serif; }\nh1 { color: #04AA6D; text-align: center; }\np { font-size: 18px; color: #475569; line-height: 1.6; }\n.card {\n  background: white;\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.08);\n  border-left: 4px solid #04AA6D;\n}\n</style>\n</head>\n<body>\n\n<h1>Welcome to CSS3</h1>\n<div class=\"card\">\n  <h3>Modern Web Design</h3>\n  <p>Styled with CSS3 box shadows, border radius, and custom colors.</p>\n</div>\n\n</body>\n</html>",
            "explanation": "<p>A CSS rule consists of a selector and a declaration block <code>selector { property: value; }</code>.</p>",
            "exercise": {
              "question": "What does CSS stand for?",
              "options": [
                "Cascading Style Sheets",
                "Creative Style System",
                "Computer Styling Software",
                "Custom Sheet System"
              ],
              "answer": 0,
              "tip": "CSS = Cascading Style Sheets."
            }
          },
          {
            "id": "css_selectors",
            "title": "CSS Selectors",
            "subtitle": "Select and target HTML elements to style.",
            "content": "\n              <p>Target by tag name (<code>p</code>), class (<code>.btn</code>), ID (<code>#main</code>), or pseudo-classes (<code>:hover</code>).</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n#banner { background: #282A35; color: white; padding: 15px; border-radius: 6px; }\n.badge { background: #04AA6D; color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px; }\n.btn {\n  background: #04AA6D; color: white; padding: 10px 20px;\n  border: none; border-radius: 6px; cursor: pointer; transition: 0.3s;\n}\n.btn:hover { background: #038c59; transform: translateY(-2px); }\n</style>\n</head>\n<body>\n\n<div id=\"banner\">\n  <h2>Targeted by ID <span class=\"badge\">NEW</span></h2>\n</div>\n<br>\n<button class=\"btn\">Hover Me (Pseudo-class :hover)</button>\n\n</body>\n</html>",
            "explanation": "<p>Use classes (<code>.name</code>) for reusable styles and IDs (<code>#name</code>) for unique page sections.</p>",
            "exercise": {
              "question": "Which symbol denotes a class selector in CSS?",
              "options": [
                "#",
                ".",
                "@",
                "$"
              ],
              "answer": 1,
              "tip": "Class selectors start with a period (.) e.g. .btn"
            }
          },
          {
            "id": "css_boxmodel",
            "title": "CSS Box Model",
            "subtitle": "Content, Padding, Border, and Margin.",
            "content": "\n              <p>Every HTML element is a box consisting of: <strong>Content</strong> &gt; <strong>Padding</strong> &gt; <strong>Border</strong> &gt; <strong>Margin</strong>.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n.box {\n  background-color: #f1f5f9;\n  width: 300px;\n  border: 4px solid #04AA6D;\n  padding: 30px;\n  margin: 20px auto;\n  box-sizing: border-box;\n  text-align: center;\n  border-radius: 8px;\n}\n</style>\n</head>\n<body>\n\n<div class=\"box\">\n  <strong>Content Area</strong><br>\n  Surrounded by 30px padding, 4px green border, and 20px margin.\n</div>\n\n</body>\n</html>",
            "explanation": "<p><code>box-sizing: border-box;</code> ensures padding and borders do not expand total specified width.</p>",
            "exercise": {
              "question": "What is the outermost layer of the CSS box model?",
              "options": [
                "Border",
                "Padding",
                "Margin",
                "Outline"
              ],
              "answer": 2,
              "tip": "Margin is the space outside the border."
            }
          },
          {
            "id": "css_flexbox",
            "title": "CSS Flexbox",
            "subtitle": "One-dimensional flexible layout model.",
            "content": "\n              <p>Flexbox simplifies horizontal and vertical alignment with <code>display: flex;</code>, <code>justify-content</code>, and <code>align-items</code>.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n.flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  background: #f0fdf4;\n  padding: 20px;\n  border-radius: 10px;\n}\n.flex-item {\n  flex: 1;\n  background: #04AA6D;\n  color: white;\n  padding: 20px;\n  text-align: center;\n  font-weight: bold;\n  border-radius: 6px;\n}\n</style>\n</head>\n<body>\n\n<div class=\"flex-container\">\n  <div class=\"flex-item\">Design</div>\n  <div class=\"flex-item\">Develop</div>\n  <div class=\"flex-item\">Deploy</div>\n</div>\n\n</body>\n</html>",
            "explanation": "<p>To center anything: <code>display: flex; justify-content: center; align-items: center;</code></p>",
            "exercise": {
              "question": "Which flexbox property defines alignment along the cross axis (vertically)?",
              "options": [
                "justify-content",
                "align-items",
                "flex-direction",
                "flex-wrap"
              ],
              "answer": 1,
              "tip": "align-items aligns flex items along the cross axis."
            }
          },
          {
            "id": "css_grid",
            "title": "CSS Grid",
            "subtitle": "Two-dimensional layout grid for rows and columns.",
            "content": "\n              <p>CSS Grid lets you create powerful responsive layouts with <code>grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));</code>.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 16px;\n  padding: 20px;\n  background: #282A35;\n  border-radius: 12px;\n}\n.grid-item {\n  background: #04AA6D;\n  color: white;\n  padding: 30px 10px;\n  text-align: center;\n  font-weight: bold;\n  border-radius: 8px;\n}\n</style>\n</head>\n<body>\n\n<div class=\"grid-container\">\n  <div class=\"grid-item\">Starter (5k)</div>\n  <div class=\"grid-item\">Standard (10k)</div>\n  <div class=\"grid-item\">Advanced (15k)</div>\n  <div class=\"grid-item\">Pro (20k)</div>\n</div>\n\n</body>\n</html>",
            "explanation": "<p>Grid handles both rows and columns simultaneously with built-in responsiveness.</p>",
            "exercise": {
              "question": "What CSS property defines the column tracks in a CSS Grid?",
              "options": [
                "grid-columns",
                "grid-template-columns",
                "columns",
                "grid-track"
              ],
              "answer": 1,
              "tip": "grid-template-columns sets the sizing of columns."
            }
          }
        ]
      }
    ]
  },
  "js": {
    "name": "JavaScript",
    "fullName": "JavaScript Tutorial",
    "desc": "The programming language of the modern Web",
    "color": "#F7DF1E",
    "sections": [
      {
        "title": "JS Tutorial",
        "lessons": [
          {
            "id": "js_intro",
            "title": "JS Introduction",
            "subtitle": "JavaScript is the world's most popular programming language.",
            "content": "\n              <p>JavaScript powers client-side interactivity, DOM manipulation, asynchronous network calls (AJAX/Fetch), and server backend (Node.js).</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n<h2>JavaScript Interactive Demo</h2>\n<p id=\"demo\">Original text before click.</p>\n\n<button onclick=\"changeText()\" style=\"background:#04AA6D; color:white; padding:10px 20px; border:none; border-radius:6px; cursor:pointer; font-weight:bold;\">\n  Change Text & Color\n</button>\n\n<script>\nfunction changeText() {\n  const el = document.getElementById('demo');\n  el.innerHTML = '🎉 Text changed dynamically with JavaScript!';\n  el.style.color = '#04AA6D';\n  el.style.fontWeight = 'bold';\n}\n</script>\n\n</body>\n</html>",
            "explanation": "<p><code>document.getElementById('id')</code> is the fundamental DOM selector method.</p>",
            "exercise": {
              "question": "Which HTML tag is used to embed JavaScript code in a web page?",
              "options": [
                "<js>",
                "<script>",
                "<javascript>",
                "<code>"
              ],
              "answer": 1,
              "tip": "<script> is used for JavaScript code."
            }
          },
          {
            "id": "js_variables",
            "title": "JS Variables (let & const)",
            "subtitle": "Storing and managing data values in modern ES6+.",
            "content": "\n              <p>Use <code>const</code> by default for values that never get reassigned, and <code>let</code> for variables that change.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n<h2>Pricing Calculator</h2>\n<p id=\"out\"></p>\n\n<script>\nconst basePrice = 5000;\nlet extraPages = 3;\nconst extraRate = 1500;\n\nconst total = basePrice + (extraPages * extraRate);\n\ndocument.getElementById('out').innerHTML = \n  \"Base: Rs. \" + basePrice + \"<br>\" +\n  \"Extra Pages: \" + extraPages + \" (Rs. \" + (extraPages * extraRate) + \")<br>\" +\n  \"<strong>Total Price: Rs. \" + total.toLocaleString() + \"/-</strong>\";\n</script>\n\n</body>\n</html>",
            "explanation": "<p><code>const</code> prevents accidental variable re-assignment bugs.</p>",
            "exercise": {
              "question": "Can a variable declared with const be reassigned?",
              "options": [
                "Yes",
                "No",
                "Only inside a loop",
                "Only in strict mode"
              ],
              "answer": 1,
              "tip": "const creates an immutable binding."
            }
          },
          {
            "id": "js_functions",
            "title": "JS Functions & Arrow Syntax",
            "subtitle": "Writing reusable, modular JavaScript code.",
            "content": "\n              <p>Arrow functions offer concise syntax: <code>const multiply = (a, b) =&gt; a * b;</code>.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n<h2>Function Execution</h2>\n<p id=\"calcOut\"></p>\n\n<script>\n// Arrow Function\nconst calculateDiscount = (price, discountPercent) => price - (price * (discountPercent / 100));\n\nconst proPrice = 20000;\nconst promoPrice = calculateDiscount(proPrice, 15); // 15% discount\n\ndocument.getElementById('calcOut').innerHTML = \n  \"Pro Package: Rs. \" + proPrice + \"<br>\" +\n  \"With 15% Discount: <strong style='color:#04AA6D;'>Rs. \" + promoPrice.toLocaleString() + \"/-</strong>\";\n</script>\n\n</body>\n</html>",
            "explanation": "<p>Functions can return calculated values using the <code>return</code> keyword.</p>",
            "exercise": {
              "question": "What keyword is used to send a value back from a JavaScript function?",
              "options": [
                "send",
                "output",
                "return",
                "give"
              ],
              "answer": 2,
              "tip": "return halts execution and returns the value."
            }
          },
          {
            "id": "js_dom",
            "title": "JS DOM Manipulation",
            "subtitle": "Creating, styling, and deleting HTML elements on the fly.",
            "content": "\n              <p>Use <code>document.createElement()</code>, <code>appendChild()</code>, and <code>classList.toggle()</code>.</p>\n            ",
            "code": "<!DOCTYPE html>\n<html>\n<body>\n\n<h2>Interactive Task List</h2>\n<input type=\"text\" id=\"tInput\" placeholder=\"New task...\" style=\"padding:6px; border-radius:4px; border:1px solid #ccc;\">\n<button onclick=\"addItem()\" style=\"background:#04AA6D; color:white; padding:6px 14px; border:none; border-radius:4px; cursor:pointer; font-weight:bold;\">Add</button>\n\n<ul id=\"tList\" style=\"margin-top:15px; padding-left:20px;\"></ul>\n\n<script>\nfunction addItem() {\n  const input = document.getElementById('tInput');\n  if(!input.value.trim()) return;\n\n  const li = document.createElement('li');\n  li.textContent = input.value;\n  li.style.cursor = 'pointer';\n  li.onclick = function() { this.remove(); };\n  \n  document.getElementById('tList').appendChild(li);\n  input.value = '';\n}\n</script>\n\n</body>\n</html>",
            "explanation": "<p>Click any created task to delete it dynamically!</p>",
            "exercise": {
              "question": "Which method adds a new child node to an element in the DOM?",
              "options": [
                "appendNode()",
                "appendChild()",
                "insertChild()",
                "attach()"
              ],
              "answer": 1,
              "tip": "appendChild() attaches a child element."
            }
          }
        ]
      }
    ]
  },
  "python": {
    "name": "Python",
    "fullName": "Python Tutorial",
    "desc": "A versatile language for AI, data, and web backends",
    "color": "#3776AB",
    "sections": [
      {
        "title": "Python Tutorial",
        "lessons": [
          {
            "id": "py_intro",
            "title": "Python Introduction",
            "subtitle": "Clean, English-like syntax for fast development.",
            "content": "\n              <p>Python is popular for web applications (Django, Flask), Machine Learning, scripting, and data science.</p>\n            ",
            "code": "# Python 3 Basics\nprint(\"Hello from Infinite Python Academy!\")\n\n# Dictionary data structure\npackage = {\n    \"name\": \"Professional Web Design\",\n    \"price_lkr\": 20000,\n    \"pages\": \"Custom UI\",\n    \"seo_included\": True\n}\n\nprint(f\"Plan: {package['name']}\")\nprint(f\"Price: Rs. {package['price_lkr']:,}/-\")\nprint(f\"SEO Included: {package['seo_included']}\")\n",
            "explanation": "<p>Python uses clean indentation instead of curly brackets.</p>",
            "exercise": {
              "question": "How do you start a comment in Python?",
              "options": [
                "//",
                "/*",
                "#",
                "--"
              ],
              "answer": 2,
              "tip": "# is the comment prefix in Python."
            }
          }
        ]
      }
    ]
  },
  "sql": {
    "name": "SQL",
    "fullName": "SQL Database Tutorial",
    "desc": "Querying relational databases",
    "color": "#00758F",
    "sections": [
      {
        "title": "SQL Tutorial",
        "lessons": [
          {
            "id": "sql_intro",
            "title": "SQL Introduction",
            "subtitle": "Managing and querying relational databases.",
            "content": "\n              <p>SQL (Structured Query Language) is used to store, query, update, and delete database records.</p>\n            ",
            "code": "-- SQL Query Example\nSELECT id, client_name, package, amount, created_at\nFROM orders\nWHERE status = 'Completed'\nORDER BY amount DESC;\n",
            "explanation": "<p><code>SELECT * FROM table;</code> retrieves all records.</p>",
            "exercise": {
              "question": "Which SQL clause filters records based on a condition?",
              "options": [
                "FILTER BY",
                "WHERE",
                "HAVING ONLY",
                "MATCH"
              ],
              "answer": 1,
              "tip": "WHERE clause filters records in SQL."
            }
          }
        ]
      }
    ]
  },
  "php": {
    "name": "PHP",
    "fullName": "PHP Tutorial",
    "desc": "Server-side web scripting language",
    "color": "#777BB4",
    "sections": [
      {
        "title": "PHP Tutorial",
        "lessons": [
          {
            "id": "php_intro",
            "title": "PHP Introduction",
            "subtitle": "Powers dynamic websites, WordPress, and Laravel.",
            "content": "\n              <p>PHP executes on the web server and generates output HTML for the browser.</p>\n            ",
            "code": "<?php\n$company = \"Infinite Creative Web Design\";\n$packages = [\"Starter\" => 5000, \"Standard\" => 10000, \"Professional\" => 20000];\n\necho \"<h1>Welcome to $company</h1>\";\nforeach ($packages as $name => $price) {\n    echo \"<p>$name: Rs. \" . number_format($price) . \"/-</p>\";\n}\n?>",
            "explanation": "<p>PHP variables begin with the <code>$</code> character.</p>",
            "exercise": {
              "question": "Which statement outputs text to the screen in PHP?",
              "options": [
                "print_out",
                "echo",
                "console.log",
                "display"
              ],
              "answer": 1,
              "tip": "echo outputs strings in PHP."
            }
          }
        ]
      }
    ]
  },
  "react": {
    "name": "React",
    "fullName": "React.js Tutorial",
    "desc": "Modern JavaScript UI library",
    "color": "#61DAFB",
    "sections": [
      {
        "title": "React Tutorial",
        "lessons": [
          {
            "id": "react_intro",
            "title": "React Introduction",
            "subtitle": "Building component-based User Interfaces.",
            "content": "\n              <p>React creates fast, reactive web applications using a Virtual DOM and reusable components.</p>\n            ",
            "code": "import React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>\n      <h3>React Counter Component</h3>\n      <p>Clicked: <strong>{count}</strong> times</p>\n      <button onClick={() => setCount(count + 1)} style={{ padding: '8px 16px', background: '#04AA6D', color: '#fff', border: 'none', borderRadius: '4px' }}>\n        Increment (+1)\n      </button>\n    </div>\n  );\n}\n\nexport default Counter;",
            "explanation": "<p>The <code>useState</code> Hook adds reactive state to functional components.</p>",
            "exercise": {
              "question": "Which React Hook is used to add state to a functional component?",
              "options": [
                "useReducer",
                "useState",
                "useEffect",
                "useMemo"
              ],
              "answer": 1,
              "tip": "useState initializes and updates component state."
            }
          }
        ]
      }
    ]
  },
  "git": {
    "name": "Git",
    "fullName": "Git Tutorial",
    "desc": "Distributed version control system",
    "color": "#F05032",
    "sections": [
      {
        "title": "Git Tutorial",
        "lessons": [
          {
            "id": "git_intro",
            "title": "Git Introduction",
            "subtitle": "Track code changes and collaborate on GitHub.",
            "content": "\n              <p>Git allows developers to create branches, stage commits, and push repositories to remote hosts like GitHub.</p>\n            ",
            "code": "# Git Command Cheatsheet\n\n# 1. Initialize repository\ngit init\n\n# 2. Stage all modifications\ngit add .\n\n# 3. Create permanent snapshot commit\ngit commit -m \"feat: Add W3Schools tutorials platform\"\n\n# 4. Push to remote repository\ngit push origin main\n",
            "explanation": "<p><code>git status</code> reveals which files are modified or staged.</p>",
            "exercise": {
              "question": "Which command shows the working tree status in Git?",
              "options": [
                "git check",
                "git state",
                "git status",
                "git diff"
              ],
              "answer": 2,
              "tip": "git status displays branch and staging information."
            }
          }
        ]
      }
    ]
  }
};
