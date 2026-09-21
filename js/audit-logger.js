/**
 * js/audit-logger.js
 * Centralized Audit Logging for Infinite Admin
 * Records authentication events and content modifications in Firestore and localStorage.
 */
import { db, auth, collection, addDoc, serverTimestamp } from './firebase-config.js';

/**
 * Log an authentication event (login attempt, logout, lockout)
 * @param {string} email 
 * @param {'success'|'fail'|'locked'|'logout'} status 
 * @param {object} [extra] 
 */
export async function logAuthEvent(email, status, extra = {}) {
  const record = {
    eventType: 'AUTH',
    email: email || 'anonymous',
    status,
    userAgent: navigator.userAgent.slice(0, 150),
    timestamp: new Date().toISOString(),
    ...extra
  };

  // 1. Write to localStorage for fast client-side history
  try {
    const hist = JSON.parse(localStorage.getItem('id_login_hist') || '[]');
    hist.unshift({ email: record.email, status, ts: Date.now(), ua: record.userAgent });
    if (hist.length > 30) hist.length = 30;
    localStorage.setItem('id_login_hist', JSON.stringify(hist));
  } catch (e) {
    console.warn('Local audit log notice:', e.message);
  }

  // 2. Write to Firestore audit_logs if authenticated or server allows
  try {
    if (auth.currentUser) {
      await addDoc(collection(db, 'audit_logs'), {
        ...record,
        uid: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
    }
  } catch (err) {
    console.warn('Firestore auth audit log notice:', err.message);
  }
}

/**
 * Log a content modification event (create, update, delete)
 * @param {'create'|'update'|'delete'} action 
 * @param {'blogs'|'projects'|'packages'|'tutorials'|'settings'} targetCollection 
 * @param {string} docId 
 * @param {string} summary 
 */
export async function logContentChange(action, targetCollection, docId, summary) {
  const user = auth.currentUser;
  const record = {
    eventType: 'CONTENT_CHANGE',
    action,
    targetCollection,
    docId: String(docId),
    summary: String(summary).slice(0, 300),
    adminEmail: user?.email || 'admin@infiniteweb.dev',
    uid: user?.uid || 'unknown',
    timestamp: new Date().toISOString()
  };

  // Local record
  try {
    const changes = JSON.parse(localStorage.getItem('id_content_audit') || '[]');
    changes.unshift(record);
    if (changes.length > 50) changes.length = 50;
    localStorage.setItem('id_content_audit', JSON.stringify(changes));
  } catch (e) {}

  // Firestore write
  try {
    await addDoc(collection(db, 'audit_logs'), {
      ...record,
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore content audit log notice:', err.message);
  }
}
