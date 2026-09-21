/* ══════════════════════════════════════════════════════════════
   Infinite Creative Web Design — Bilingual AI Assistant / Chatbot
   Version: 1.0.0 (BestWeb.lk Certified Bonus Feature)
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const KNOWLEDGE_BASE = [
    {
      keywords: ['price', 'pricing', 'cost', 'fee', 'package', 'rate', 'how much', 'budget', 'charges', 'mila', 'ganan', 'keeyada', 'මිල', 'ගණන්', 'පැකේජ'],
      replyEn: 'Our website packages start from Rs. 5,000/- ($17) for Starter Business, Rs. 10,000/- ($33) for Standard Business (5 pages), and Rs. 25,000 - 35,000/- for full dynamic E-Commerce with PayHere integration. All packages include Free Lifetime Cloud Hosting on Starter & Standard with zero monthly fees!',
      replySi: 'අපගේ පැකේජ ආරම්භ වන්නේ Rs. 5,000/- සිටය. Standard Business (පිටු 5) Rs. 10,000/- වන අතර PayHere සහිත E-Commerce වෙබ් අඩවි Rs. 25,000 - 35,000/- වේ. මාසික සර්වර් ගාස්තු නැත (Free Cloud Hosting)!'
    },
    {
      keywords: ['delivery', 'time', 'how long', 'duration', 'days', 'fast', 'timeline', 'kalaya', 'dawas', 'ගතවන කාලය', 'කාලය', 'දින'],
      replyEn: 'Most standard business websites are completed and launched within 3 to 5 business days once you provide your business details, logo, and photos.',
      replySi: 'ඔබගේ තොරතුරු සහ ඡායාරූප ලැබුණු පසු දින 3 ත් 5 ත් අතර කාලයකදී සම්පූර්ණ වෙබ් අඩවිය සාදා Live කර දෙනු ලැබේ.'
    },
    {
      keywords: ['hosting', 'free hosting', 'server', 'cloud', 'github', 'cloudflare', 'හෝස්ටින්', 'සර්වර්', 'නොමිලේ'],
      replyEn: 'We provide 100% Free Lifetime Fast Cloud Hosting on GitHub Pages & Cloudflare Edge CDN with free SSL encryption for Starter & Standard tiers. That means Rs. 0 monthly server maintenance fees for your business!',
      replySi: 'Starter සහ Standard පැකේජ සඳහා GitHub Pages සහ Cloudflare හරහා 100% නොමිලේ Lifetime Fast Cloud Hosting සහ නොමිලේ SSL ආරක්ෂාව ලැබේ. මාසික නඩත්තු ගාස්තු රු. 0 කි!'
    },
    {
      keywords: ['payhere', 'payment', 'gateway', 'visa', 'mastercard', 'ipg', 'online payment', 'webxpay', 'frimi', 'genie', 'ගෙවීම්', 'කාඩ්පත්'],
      replyEn: 'Yes! We seamlessly integrate PayHere, WebXPay, Commercial Bank IPG, Sampath IPG, and mobile wallets (Genie, Frimi, eZ Cash) so your customers can pay via Visa & Mastercard directly into your Sri Lankan corporate bank account.',
      replySi: 'ඔව්! PayHere, WebXPay, Commercial Bank IPG සහ Genie/Frimi මගින් Visa, Mastercard ඔන්ලයින් ගෙවීම් කෙලින්ම ඔබගේ ලංකාවේ බැංකු ගිණුමට ලබාගැනීමට අපි සකස් කර දෙන්නෙමු.'
    },
    {
      keywords: ['domain', '.lk', '.com', '.org', 'domain name', 'ඩොමේන්', 'ලියාපදිංචි'],
      replyEn: 'You can connect any custom domain (.lk, .com, .org, .net). We handle the complete DNS setup with Cloudflare free of charge, and can assist you in registering your .LK domain through the LK Domain Registry.',
      replySi: 'ඔබට කැමති .lk, .com හෝ වෙනත් ඕනෑම domain එකක් සම්බන්ධ කළ හැක. LK Domain Registry ලියාපදිංචිය සහ DNS සැකසුම් අප විසින් නොමිලේ කර දෙනු ලැබේ.'
    },
    {
      keywords: ['contact', 'phone', 'whatsapp', 'address', 'location', 'tangalle', 'colombo', 'where', 'call', 'දුරකථන', 'ලිපිනය', 'ස්ථානය'],
      replyEn: 'We are Infinite Creative Web Design, located in Tangalle, Southern Province, Sri Lanka. You can call or WhatsApp us at +94 78 971 4912 or email infinitedesign768@gmail.com.',
      replySi: 'අපගේ ප්‍රධාන කාර්යාලය තංගල්ල, දකුණු පළාත, ශ්‍රී ලංකාවේ පිහිටා ඇත. දුරකථන / WhatsApp: +94 78 971 4912 | විද්‍යුත් තැපෑල: infinitedesign768@gmail.com.'
    },
    {
      keywords: ['seo', 'google', 'rank', 'ranking', 'search', 'ගූගල්', 'සර්ච්'],
      replyEn: 'Every website is 100% SEO Ready with semantic HTML5, Core Web Vitals optimization, mobile responsiveness, and automatic XML sitemap submission to Google Search Console for fast Sri Lankan indexing.',
      replySi: 'සියලුම වෙබ් අඩවි Google Search Console සමඟ සම්බන්ධ කර Core Web Vitals හා SEO Ready ලෙස සකසන බැවින් Google සෙවුම් වල පහසුවෙන් ඉදිරියට පැමිණේ.'
    }
  ];

  function detectLanguage(text) {
    // Sinhala unicode range: \u0D80-\u0DFF
    const sinhalaRegex = /[\u0D80-\u0DFF]/;
    return sinhalaRegex.test(text) ? 'si' : 'en';
  }

  function findAnswer(query) {
    const qLower = query.toLowerCase();
    const isSi = detectLanguage(query) === 'si';

    for (const item of KNOWLEDGE_BASE) {
      for (const kw of item.keywords) {
        if (qLower.includes(kw.toLowerCase())) {
          return {
            text: isSi ? item.replySi : item.replyEn,
            lang: isSi ? 'si' : 'en'
          };
        }
      }
    }

    // Default fallback
    if (isSi) {
      return {
        text: 'ස්තූතියි ඔබගේ විමසීමට! වඩාත් නිවැරදි තොරතුරු සහ විශේෂ පැකේජ වට්ටම් සඳහා අපගේ නිර්මාණ ශිල්පියා සමඟ WhatsApp ඔස්සේ සම්බන්ධ වන්න.',
        lang: 'si'
      };
    }
    return {
      text: 'Thank you for your question! For custom requirements, exact quotes, and special promotional rates, you can connect directly with our senior web design lead on WhatsApp.',
      lang: 'en'
    };
  }

  function renderChatbotUI() {
    if (document.getElementById('infiniteChatbotTrigger')) return;

    // Trigger Button
    const triggerBtn = document.createElement('button');
    triggerBtn.id = 'infiniteChatbotTrigger';
    triggerBtn.type = 'button';
    triggerBtn.className = 'chatbot-trigger-btn';
    triggerBtn.setAttribute('aria-label', 'Open AI Website Assistant');
    triggerBtn.setAttribute('aria-expanded', 'false');
    triggerBtn.setAttribute('aria-controls', 'infiniteChatbotDrawer');
    triggerBtn.innerHTML = `
      <div class="chatbot-trigger-icon-wrap" aria-hidden="true">
        <svg class="chatbot-ai-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><rect x="4" y="8" width="16" height="12" rx="3"/><circle cx="9" cy="13" r="1.5"/><circle cx="15" cy="13" r="1.5"/><path d="M9 17h6"/></svg>
      </div>
      <span class="chatbot-trigger-label">Ask AI</span>
      <span class="chatbot-pulse-dot" aria-hidden="true"></span>
    `;

    // Drawer Container
    const drawer = document.createElement('div');
    drawer.id = 'infiniteChatbotDrawer';
    drawer.className = 'chatbot-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', 'Infinite AI Website Assistant');
    drawer.setAttribute('aria-hidden', 'true');

    drawer.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar-wrap" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><rect x="4" y="8" width="16" height="12" rx="3"/><circle cx="9" cy="13" r="1.5"/><circle cx="15" cy="13" r="1.5"/><path d="M9 17h6"/></svg>
            <span class="chatbot-online-indicator"></span>
          </div>
          <div>
            <h3 class="chatbot-title">Infinite AI Assistant</h3>
            <span class="chatbot-subtitle">Online • English &amp; සිංහල</span>
          </div>
        </div>
        <button type="button" class="chatbot-close-btn" id="btnCloseChatbot" aria-label="Close AI Assistant">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="chatbot-messages" id="chatbotMessages" role="log" aria-live="polite">
        <div class="chatbot-msg bot">
          <div class="chatbot-bubble">
            <p><strong>Hello! I am InfiniteBot 🤖</strong></p>
            <p>Ask me anything about website pricing in Sri Lanka, delivery time, PayHere payment setup, or Free Cloud Hosting.</p>
            <p style="font-size:12px;color:#38bdf8;margin-top:6px;">ශ්‍රී ලංකාවේ වෙබ් අඩවි මිල ගණන් සහ විස්තර පිළිබඳ ඕනෑම දෙයක් අසන්න.</p>
          </div>
        </div>

        <div class="chatbot-quick-chips">
          <button type="button" class="chat-chip" data-query="What are your website package prices?">💰 Prices (මිල ගණන්)</button>
          <button type="button" class="chat-chip" data-query="How long does it take to build a website?">⏱️ Delivery Time (කාලය)</button>
          <button type="button" class="chat-chip" data-query="Can I accept PayHere and Visa card payments?">💳 PayHere Payments</button>
          <button type="button" class="chat-chip" data-query="How does Free Cloud Hosting work?">☁️ Free Cloud Hosting</button>
          <button type="button" class="chat-chip" data-query="Where is Infinite Creative located?">📍 Studio Address</button>
        </div>
      </div>

      <form class="chatbot-input-bar" id="chatbotForm" autocomplete="off">
        <input type="text" id="chatbotInput" class="chatbot-input" placeholder="Ask in English or සිංහල..." aria-label="Type your question" required>
        <button type="submit" class="chatbot-send-btn" aria-label="Send Message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    `;

    document.body.appendChild(triggerBtn);
    document.body.appendChild(drawer);

    // Event Handlers
    function openChat() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      triggerBtn.setAttribute('aria-expanded', 'true');
      document.getElementById('chatbotInput').focus();
    }

    function closeChat() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      triggerBtn.setAttribute('aria-expanded', 'false');
      triggerBtn.focus();
    }

    triggerBtn.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        closeChat();
      } else {
        openChat();
      }
    });

    document.getElementById('btnCloseChatbot').addEventListener('click', closeChat);

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeChat();
      }
    });

    // Quick chip buttons
    drawer.querySelectorAll('.chat-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        handleUserQuery(query);
      });
    });

    // Form submission
    const form = document.getElementById('chatbotForm');
    const input = document.getElementById('chatbotInput');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      handleUserQuery(text);
    });

    function appendMessage(sender, htmlContent) {
      const messagesContainer = document.getElementById('chatbotMessages');
      const msgDiv = document.createElement('div');
      msgDiv.className = `chatbot-msg ${sender}`;
      msgDiv.innerHTML = `<div class="chatbot-bubble">${htmlContent}</div>`;
      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function handleUserQuery(text) {
      // Hide chips after first query
      const chips = drawer.querySelector('.chatbot-quick-chips');
      if (chips) chips.style.display = 'none';

      // 1. Render User Message
      appendMessage('user', `<p>${escapeHTML(text)}</p>`);

      // 2. Render Typing Indicator
      const messagesContainer = document.getElementById('chatbotMessages');
      const typingEl = document.createElement('div');
      typingEl.className = 'chatbot-msg bot typing-indicator-msg';
      typingEl.innerHTML = `<div class="chatbot-bubble typing-dots"><span class="t-dot"></span><span class="t-dot"></span><span class="t-dot"></span></div>`;
      messagesContainer.appendChild(typingEl);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // 3. Process Answer with short delay for realism
      setTimeout(() => {
        if (typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);

        const answer = findAnswer(text);
        const waText = encodeURIComponent(`Hello Infinite Creative! I was chatting with your AI assistant regarding: "${text}". Could you please provide more details?`);
        const waLink = `https://wa.me/94789714912?text=${waText}`;

        let replyHtml = `<p>${answer.text}</p>`;
        replyHtml += `
          <div class="chatbot-wa-action">
            <a href="${waLink}" target="_blank" rel="noopener" class="btn-chat-wa">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
              <span>Instant WhatsApp Quote</span> &rarr;
            </a>
          </div>
        `;

        appendMessage('bot', replyHtml);
      }, 450);
    }

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag));
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderChatbotUI);
  } else {
    renderChatbotUI();
  }

})();
