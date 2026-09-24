/**
 * js/admin-bot-monitor.js
 * AI Bots Command Center & Live Monitor Controller for Infinite Creative Web Design Admin Panel.
 * Hardened features:
 * - Shared auth gate via initAdminAuth
 * - Sanitized log rendering with escapeHTML to prevent XSS
 * - No inline scripts or event handlers (strict CSP compliant)
 * - Staleness detection and live log feed refresh
 */

import { initAdminAuth } from './admin-nav.js';
import { escapeHTML } from './sanitize.js';

(function () {
  'use strict';

  const STALE_THRESHOLD_MS = 48 * 60 * 60 * 1000; // 48 hours

  function updateBotStaleness(logs) {
    const now = Date.now();

    function checkBot(botIdentifier, badgeId, lastRunId) {
      const badge = document.getElementById(badgeId);
      const lastRun = document.getElementById(lastRunId);
      if (!badge || !lastRun) return;

      const botLogs = logs.filter(l => (l.bot_name || '').toLowerCase().includes(botIdentifier.toLowerCase()));
      if (botLogs.length === 0) {
        badge.className = 'status-badge status-stale';
        badge.textContent = '⚠️ NO RECENT LOGS';
        lastRun.innerHTML = '⏳ <strong>Last Run:</strong> Never / No log recorded';
        return;
      }

      const latest = botLogs[0];
      const safeTimestamp = escapeHTML(latest.timestamp || '');
      const logDate = new Date((latest.timestamp || '').replace(' ', 'T'));
      const ageMs = now - logDate.getTime();

      lastRun.innerHTML = '⏳ <strong>Last Run:</strong> ' + safeTimestamp;

      if (isNaN(ageMs) || ageMs > STALE_THRESHOLD_MS) {
        badge.className = 'status-badge status-stale';
        badge.textContent = '⚠️ STALE (>48h)';
      } else {
        badge.className = 'status-badge status-active';
        badge.textContent = '🟢 ACTIVE';
      }
    }

    checkBot('Bot 01', 'badgeBot1', 'lastRunBot1');
    checkBot('Bot 02', 'badgeBot2', 'lastRunBot2');
    checkBot('Bot 06', 'badgeBot6', 'lastRunBot6');
  }

  async function refreshBotLogs() {
    const container = document.getElementById('botLogContainer');
    if (!container) return;

    try {
      const res = await fetch('../data/bot-activity-log.json?v=' + Date.now());
      if (!res.ok) throw new Error('Log file not found');
      const logs = await res.json();

      if (!logs || !Array.isArray(logs) || logs.length === 0) {
        container.innerHTML = '<div style="color:#94a3b8; text-align:center; padding:20px;">No activity logged yet.</div>';
        updateBotStaleness([]);
        return;
      }

      let html = '';
      logs.forEach(log => {
        const safeIcon = escapeHTML(log.bot_icon || '🤖');
        const safeName = escapeHTML(log.bot_name || 'AI Bot');
        const safeTimestamp = escapeHTML(log.timestamp || '');
        const safeMessage = escapeHTML(log.message || '');

        html += `
          <div class="log-item">
            <div style="font-size:22px;">${safeIcon}</div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <strong style="color:#fff; font-size:0.95rem;">${safeName}</strong>
                <span style="color:#64748b; font-size:0.78rem; font-weight:600;">${safeTimestamp}</span>
              </div>
              <div style="color:#cbd5e1; font-size:0.88rem; line-height:1.4;">${safeMessage}</div>
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
      updateBotStaleness(logs);
    } catch (err) {
      container.innerHTML = '<div style="color:#f87171; text-align:center; padding:20px;">Failed to load logs: ' + escapeHTML(err.message) + '</div>';
      updateBotStaleness([]);
    }
  }

  // Auth gate initialization
  initAdminAuth(() => {
    refreshBotLogs();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refreshBotLogsBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', refreshBotLogs);
    }
  });
})();
