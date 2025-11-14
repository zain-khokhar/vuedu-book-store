// lib/session.js
export function getOrCreateSessionId() {
  let sessionId = localStorage.getItem('bookstore_session_id');
  if (!sessionId) {
    try {
      sessionId = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : null;
    } catch (e) {
      sessionId = null;
    }
    if (!sessionId) {
      sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
    }
    localStorage.setItem('bookstore_session_id', sessionId);
  }
  return sessionId;
}
