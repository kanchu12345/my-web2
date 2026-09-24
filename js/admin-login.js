/**
 * js/admin-login.js
 * Secure administration authentication handler for Infinite Creative Web Design.
 * Hardened features:
 * - Anti-User Enumeration: Identical error messaging for nonexistent users and bad passwords
 * - Real Firebase Auth integration
 * - Server-side throttling awareness & client-side attempt indicator
 * - Removed dead 2FA stub and inert CSRF token
 */

import { auth, signInWithEmailAndPassword, onAuthStateChanged } from './firebase-config.js';
import { logAuthEvent } from './audit-logger.js';

const MAX_ATTEMPTS = 5;
const LOCK_MS = 30 * 60 * 1000; // 30 min client lockout

/* ── Rate limiting (Client-side UX nicety) ──────────────────── */
function getAttempts() {
  try {
    return JSON.parse(localStorage.getItem('id_attempts') || '{"count":0,"lockedUntil":0}');
  } catch (e) {
    return { count: 0, lockedUntil: 0 };
  }
}

function saveAttempts(a) {
  try {
    localStorage.setItem('id_attempts', JSON.stringify(a));
  } catch (e) {}
}

function resetAttempts() {
  saveAttempts({ count: 0, lockedUntil: 0 });
}

function checkLock() {
  const a = getAttempts();
  if (a.lockedUntil && Date.now() < a.lockedUntil) return true;
  if (a.lockedUntil && Date.now() >= a.lockedUntil) {
    resetAttempts();
    return false;
  }
  return false;
}

/* ── Attempts UI ────────────────────────────── */
function updateAttemptsUI() {
  const a = getAttempts();
  const pct = Math.min((a.count / MAX_ATTEMPTS) * 100, 100);
  const fill = document.getElementById('attemptsFill');
  if (fill) {
    fill.style.width = pct + '%';
    fill.style.background = pct < 60 ? '#00aaff' : pct < 80 ? '#ffaa00' : '#ff4444';
  }
  if (a.count > 0 && a.count < MAX_ATTEMPTS) {
    showWarn(`${MAX_ATTEMPTS - a.count} attempt${MAX_ATTEMPTS - a.count === 1 ? '' : 's'} remaining.`);
  }
}

/* ── Lockout timer ──────────────────────────── */
let lockInterval;
function startLockTimer(until) {
  const lockoutView = document.getElementById('lockoutView');
  const loginForm = document.getElementById('loginForm');
  const lockTimer = document.getElementById('lockTimer');

  if (lockoutView) lockoutView.style.display = 'block';
  if (loginForm) loginForm.style.display = 'none';

  lockInterval = setInterval(function () {
    const rem = Math.max(0, until - Date.now());
    if (rem === 0) {
      clearInterval(lockInterval);
      resetAttempts();
      location.reload();
      return;
    }
    const m = Math.floor(rem / 60000);
    const s = Math.floor((rem % 60000) / 1000);
    if (lockTimer) {
      lockTimer.textContent = `${m}:${String(s).padStart(2, '0')}`;
    }
  }, 1000);
}

/* ── Message helpers ────────────────────────── */
function showErr(msg) {
  const e = document.getElementById('errMsg');
  const t = document.getElementById('errText');
  if (e && t) {
    t.textContent = msg;
    e.classList.add('show');
  }
}

function hideErr() {
  const e = document.getElementById('errMsg');
  if (e) e.classList.remove('show');
}

function showWarn(msg) {
  const w = document.getElementById('warnMsg');
  const t = document.getElementById('warnText');
  if (w && t) {
    t.textContent = msg;
    w.classList.add('show');
  }
}

/* ── Login history (local audit trail) ──────── */
function logLogin(email, status) {
  try {
    const hist = JSON.parse(localStorage.getItem('id_login_hist') || '[]');
    hist.unshift({ email, status, ts: Date.now(), ua: navigator.userAgent.slice(0, 80) });
    if (hist.length > 20) hist.length = 20;
    localStorage.setItem('id_login_hist', JSON.stringify(hist));
  } catch (e) {}
}

/* ── Initialize handlers on DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', () => {
  // Password toggle
  const pwToggle = document.getElementById('pwToggle');
  const pwInput = document.getElementById('pwInput');
  if (pwToggle && pwInput) {
    pwToggle.addEventListener('click', () => {
      pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
    });
  }

  // Redirect if already authenticated
  onAuthStateChanged(auth, user => {
    if (user) {
      window.location.replace('dashboard.html');
    }
  });

  // Login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      hideErr();

      if (checkLock()) {
        const a = getAttempts();
        startLockTimer(a.lockedUntil);
        return;
      }

      const email = (document.getElementById('emailInput')?.value || '').trim().toLowerCase();
      const pw = document.getElementById('pwInput')?.value || '';
      if (!email || !pw) {
        showErr('Please enter your email and password.');
        return;
      }

      if (email.length > 254 || pw.length > 128) {
        showErr('Invalid input length.');
        return;
      }

      const btn = document.getElementById('loginBtn');
      const btnText = document.getElementById('loginBtnText');
      if (btn) btn.disabled = true;
      if (btnText) btnText.innerHTML = '<span class="spin"></span>';

      try {
        await signInWithEmailAndPassword(auth, email, pw);
        logLogin(email, 'success');
        await logAuthEvent(email, 'success');
        resetAttempts();
        window.location.replace('dashboard.html');
      } catch (err) {
        if (btn) btn.disabled = false;
        if (btnText) btnText.textContent = 'Sign In';

        const a = getAttempts();
        a.count++;
        if (a.count >= MAX_ATTEMPTS) {
          a.lockedUntil = Date.now() + LOCK_MS;
          saveAttempts(a);
          logLogin(email, 'locked');
          await logAuthEvent(email, 'locked');
          startLockTimer(a.lockedUntil);
          return;
        }
        saveAttempts(a);
        updateAttemptsUI();
        logLogin(email, 'fail');
        await logAuthEvent(email, 'fail', { error: err.code });

        // Task 6a: Prevent user enumeration by returning identical message for user-not-found & wrong-password
        const map = {
          'auth/user-not-found': 'Invalid email or password.',
          'auth/wrong-password': 'Invalid email or password.',
          'auth/invalid-credential': 'Invalid email or password.',
          'auth/invalid-email': 'Please enter a valid email address.',
          'auth/too-many-requests': 'Too many failed login attempts. Firebase has temporarily blocked requests. Please try again later.'
        };
        showErr(map[err.code] || 'Invalid email or password.');
      }
    });
  }

  // Init lockout check on load
  if (checkLock()) {
    const a = getAttempts();
    startLockTimer(a.lockedUntil);
  } else {
    updateAttemptsUI();
  }
});
