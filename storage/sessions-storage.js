// storage/sessions-storage.js

class SessionsStorage {
  constructor() {
    this.sessions = new Map();
  }

  create(userId) {
    const sessionId = this.generateSessionId();
    const session = {
      userId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
    };

    this.sessions.set(sessionId, session);
    console.log(`Session created for user ${userId}: ${sessionId}`);
    return sessionId;
  }

  get(sessionId) {
    const session = this.sessions.get(sessionId);

    if (!session) return undefined;

    if (session.expiresAt < new Date()) {
      this.sessions.delete(sessionId);
      console.log(`Session expired: ${sessionId}`);
      return undefined;
    }

    return session;
  }

  delete(sessionId) {
    this.sessions.delete(sessionId);
    console.log(`Session deleted: ${sessionId}`);
  }

  getUserId(sessionId) {
    const session = this.get(sessionId);
    return session ? session.userId : undefined;
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  cleanup() {
    const now = new Date();
    let count = 0;

    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.expiresAt < now) {
        this.sessions.delete(sessionId);
        count++;
      }
    }

    if (count > 0) {
      console.log(`Cleaned up ${count} expired sessions`);
    }
  }
}

export const sessionsStorage = new SessionsStorage();

// Nettoyage automatique toutes les heures
setInterval(() => {
  sessionsStorage.cleanup();
}, 60 * 60 * 1000);
