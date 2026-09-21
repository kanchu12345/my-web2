/* ══════════════════════════════════════════════════════════════
   Infinite Creative Web Design — Package Recommender Quiz
   Version: 1.0.0 (BestWeb.lk Certified Bonus Feature)
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const QUIZ_QUESTIONS = [
    {
      step: 1,
      title: 'What type of business are you launching or growing?',
      subtitle: 'Select the option that best describes your venture in Sri Lanka',
      options: [
        { id: 'solo', label: 'Solo Professional / Consultant / Service', desc: 'Doctors, lawyers, accountants, tutors, freelance specialists' },
        { id: 'retail', label: 'Retail Store, Shop or Product Brand', desc: 'Clothing, spices, jewellery, handicrafts, electronics' },
        { id: 'tourism', label: 'Tourism, Villa, Hotel or Travel Chauffeur', desc: 'Guesthouses, surf camps, tour drivers, cab services' },
        { id: 'corporate', label: 'Corporate Company, Industry or Exporter', desc: 'Solar EPC, engineering firms, manufacturing, export factories' }
      ]
    },
    {
      step: 2,
      title: 'What is your primary goal for this website?',
      subtitle: 'What should your new digital presence achieve for your business?',
      options: [
        { id: 'presence', label: 'Professional Credibility & WhatsApp Inquiries', desc: 'Showcase services, phone numbers, Google Maps location & get client calls' },
        { id: 'ecommerce', label: 'Sell Products Online & Accept Card Payments', desc: 'Shopping cart, product catalog & automated PayHere credit card checkout' },
        { id: 'portfolio', label: 'Showcase Visual Portfolio & Client Reviews', desc: 'High-res gallery of past projects, verified customer trust & booking inquiries' },
        { id: 'corporate_seo', label: 'Full Brand Authority & Top Google SEO Ranking', desc: 'Multi-page comprehensive site to outrank competitors on Google search' }
      ]
    },
    {
      step: 3,
      title: 'What is your preferred delivery timeline?',
      subtitle: 'How quickly would you like your website launched online?',
      options: [
        { id: 'rapid', label: 'Rapid Launch (3 to 5 Business Days)', desc: 'Fast turnaround with all essential business sections live this week' },
        { id: 'standard', label: 'Standard Schedule (1 to 2 Weeks)', desc: 'Room for extensive custom pages, multiple revisions and integrations' }
      ]
    }
  ];

  let currentStep = 1;
  const userAnswers = {};

  function initQuiz() {
    const container = document.getElementById('packageQuizContainer');
    if (!container) return;
    renderStep(1);
  }

  function renderStep(stepNumber) {
    const container = document.getElementById('packageQuizContainer');
    if (!container) return;

    currentStep = stepNumber;
    const q = QUIZ_QUESTIONS.find(item => item.step === stepNumber);
    if (!q) return;

    const progressPct = Math.round(((stepNumber - 1) / 3) * 100);

    let html = `
      <div class="quiz-card reveal">
        <div class="quiz-progress-bar-wrap">
          <div class="quiz-progress-header">
            <span class="quiz-step-label">Step ${stepNumber} of 3</span>
            <span class="quiz-step-pct">${progressPct}% Completed</span>
          </div>
          <div class="quiz-progress-track">
            <div class="quiz-progress-fill" style="width: ${stepNumber === 1 ? '33%' : stepNumber === 2 ? '66%' : '100%'}"></div>
          </div>
        </div>

        <h3 class="quiz-question-title">${q.title}</h3>
        <p class="quiz-question-subtitle">${q.subtitle}</p>

        <div class="quiz-options-grid">
    `;

    q.options.forEach(opt => {
      const isSelected = userAnswers[`step${stepNumber}`] === opt.id;
      html += `
        <button type="button" class="quiz-opt-btn ${isSelected ? 'selected' : ''}" data-step="${stepNumber}" data-opt="${opt.id}">
          <div class="quiz-opt-radio"><span class="quiz-opt-dot"></span></div>
          <div class="quiz-opt-text">
            <strong class="quiz-opt-label">${opt.label}</strong>
            <span class="quiz-opt-desc">${opt.desc}</span>
          </div>
        </button>
      `;
    });

    html += `
        </div>
        <div class="quiz-nav-row">
          ${stepNumber > 1 ? `<button type="button" class="btn-quiz-back" id="btnQuizBack">&larr; Previous Question</button>` : '<div></div>'}
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Attach click listeners to options
    container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.getAttribute('data-step'), 10);
        const optId = btn.getAttribute('data-opt');
        userAnswers[`step${step}`] = optId;

        if (step < 3) {
          renderStep(step + 1);
        } else {
          renderRecommendation();
        }
      });
    });

    const backBtn = document.getElementById('btnQuizBack');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        renderStep(stepNumber - 1);
      });
    }
  }

  function renderRecommendation() {
    const container = document.getElementById('packageQuizContainer');
    if (!container) return;

    // Smart logic matching user answers to best package
    let recommendedPackage = 'Standard Business Package';
    let priceLkr = 'Rs. 10,000/-';
    let priceUsd = '$33';
    let badgeText = '⭐ Recommended for Maximum Value';
    let highlights = [
      'Up to 5 Fully Responsive Custom Pages',
      '100% Free Lifetime Cloud Hosting on GitHub Pages & Cloudflare',
      'Interactive WhatsApp Lead Generator',
      'Google Maps Embed & Google Search Console SEO Ready',
      'Delivery in 3 to 5 Business Days'
    ];

    if (userAnswers.step2 === 'ecommerce' || userAnswers.step1 === 'retail') {
      recommendedPackage = 'E-Commerce & Online Store Package';
      priceLkr = 'Rs. 25,000 - 35,000/-';
      priceUsd = '$83 - $117';
      badgeText = '🛒 Ideal for Selling Online & Receiving Card Payments';
      highlights = [
        'PayHere, WebXPay & Local IPG Integration (Visa, Mastercard)',
        'Product Catalog with Shopping Cart & Checkout',
        'Direct Bank Account Payouts in Sri Lanka',
        'Mobile-First Core Web Vitals Performance',
        'Zero Monthly Maintenance Server Fees'
      ];
    } else if (userAnswers.step2 === 'presence' && userAnswers.step3 === 'rapid' && userAnswers.step1 === 'solo') {
      recommendedPackage = 'Starter Business Presence';
      priceLkr = 'Rs. 5,000/-';
      priceUsd = '$17';
      badgeText = '⚡ Most Affordable Professional Launch';
      highlights = [
        'Single-Page High-Impact Business Showcase',
        '100% Free Lifetime Cloud Hosting with Free SSL',
        'Direct WhatsApp Inquiry Integration',
        'Google SEO Ready Semantic Structure',
        'Fast 3-Day Turnaround'
      ];
    } else if (userAnswers.step1 === 'corporate' || userAnswers.step2 === 'corporate_seo') {
      recommendedPackage = 'Corporate & Custom Web Application';
      priceLkr = 'Rs. 20,000 - 40,000/-';
      priceUsd = '$67 - $133';
      badgeText = '🏢 Tailored for High-Authority Corporate Brands';
      highlights = [
        'Multi-Tier Architecture with Custom Layouts',
        'Advanced Google Search Ranking Structure & Local SEO',
        'Client Showcase, Technical Specs & Inquiry Forms',
        'Sub-Second Global Cloud Edge Deployment',
        'Dedicated Priority Developer Support'
      ];
    }

    const curr = window.getActiveCurrency ? window.getActiveCurrency() : 'LKR';
    const displayPrice = curr === 'USD' ? priceUsd : priceLkr;

    const waMsg = encodeURIComponent(
      `👋 Hello Infinite Creative Web Design!\n\n` +
      `I just completed your Website Package Recommender Quiz.\n` +
      `• *Business Type:* ${userAnswers.step1 || 'Not specified'}\n` +
      `• *Primary Goal:* ${userAnswers.step2 || 'Not specified'}\n` +
      `• *Timeline:* ${userAnswers.step3 || 'Not specified'}\n\n` +
      `🎯 *Recommended Package:* ${recommendedPackage} (${displayPrice})\n\n` +
      `I would like to discuss this package for my business website. How can we proceed?`
    );
    const waUrl = `https://wa.me/94789714912?text=${waMsg}`;

    let highlightsHtml = '';
    highlights.forEach(item => {
      highlightsHtml += `
        <li class="quiz-result-feature">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#04AA6D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${item}</span>
        </li>
      `;
    });

    container.innerHTML = `
      <div class="quiz-card quiz-result-card reveal">
        <div class="quiz-result-badge-wrap">
          <span class="quiz-result-badge">${badgeText}</span>
        </div>

        <h3 class="quiz-result-title">${recommendedPackage}</h3>
        <div class="quiz-result-price">${displayPrice}</div>
        <p class="quiz-result-desc">
          Based on your business needs, this solution offers the highest conversion rate, sub-second loading speed, and transparent zero-hidden-fee pricing.
        </p>

        <ul class="quiz-result-features-list">
          ${highlightsHtml}
        </ul>

        <div class="quiz-result-actions">
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn-quiz-claim" aria-label="Claim Package on WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
            <span>Claim This Package on WhatsApp &rarr;</span>
          </a>
          <button type="button" class="btn-quiz-retake" id="btnQuizRetake">
            <span>Retake Quiz</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('btnQuizRetake').addEventListener('click', () => {
      userAnswers.step1 = null;
      userAnswers.step2 = null;
      userAnswers.step3 = null;
      renderStep(1);
    });
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
  } else {
    initQuiz();
  }

})();
