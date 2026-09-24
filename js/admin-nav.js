/**
 * js/admin-nav.js
 * Shared administration utilities for Infinite Creative Web Design.
 * Handles:
 * - Strict Firebase Auth Gate enforcement & automatic redirect to login.html
 * - Off-canvas mobile navigation drawer toggle & overlay interactions
 * - Safe user email & avatar rendering
 * - Working signOut handler wired to #logoutBtn
 */

import { auth, onAuthStateChanged, signOut } from './firebase-config.js';

/**
 * Enforce authentication gate on protected admin pages.
 * @param {Function} [onAuthenticated] Callback invoked with the authenticated user object.
 */
export function initAdminAuth(onAuthenticated) {
  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.replace('login.html');
      return;
    }

    // Unhide body and remove the blocking gate stylesheet
    const gate = document.getElementById('authGate');
    if (gate) {
      gate.remove();
    }
    document.body.style.display = 'flex';

    // Populate user email and avatar in sidebar footer
    const email = user.email || 'infinitedesign768@gmail.com';
    const emailEl = document.getElementById('sbEmail');
    const avatarEl = document.getElementById('sbAvatar');

    if (emailEl) {
      emailEl.textContent = email;
    }
    if (avatarEl) {
      avatarEl.textContent = (email.charAt(0) || 'A').toUpperCase();
    }

    // Invoke page-specific callback once auth is firmly established
    if (typeof onAuthenticated === 'function') {
      try {
        onAuthenticated(user);
      } catch (err) {
        console.error('Error in onAuthenticated callback:', err);
      }
    }
  });
}

/**
 * Initialize the mobile off-canvas drawer navigation.
 */
export function initMobileNav() {
  const toggleBtn = document.getElementById('sbToggle') || document.querySelector('.sb-toggle');
  const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
  const overlay = document.getElementById('sbOverlay') || document.querySelector('.sidebar-overlay');

  if (!toggleBtn || !sidebar || !overlay) {
    return;
  }

  function openDrawer() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Toggle button click
  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (sidebar.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Clicking backdrop overlay closes the drawer
  overlay.addEventListener('click', closeDrawer);

  // Close drawer on clicking any sidebar navigation link on mobile/tablet viewports
  sidebar.querySelectorAll('.sb-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        closeDrawer();
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * Wire the sidebar sign out button to Firebase Auth signOut.
 */
export function initLogoutBtn() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn && !logoutBtn.dataset.wired) {
    logoutBtn.dataset.wired = 'true';
    logoutBtn.addEventListener('click', async e => {
      e.preventDefault();
      try {
        await signOut(auth);
      } catch (err) {
        console.warn('Sign out warning:', err);
      }
      window.location.replace('login.html');
    });
  }
}

// Auto-bind mobile navigation and logout button when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initLogoutBtn();
  });
} else {
  initMobileNav();
  initLogoutBtn();
}
