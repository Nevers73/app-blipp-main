type Session = {
  userId: string;
  createdAt: Date;
  expiresAt: Date;
};

class SessionsStorage {
  private sessions: Map<string, Session> = new Map();

  create(userId: string): string {
    const sessionId = this.generateSessionId();
    const session: Session = {
      userId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    
    this.sessions.set(sessionId, session);
    console.log(`Session created for user ${userId}: ${sessionId}`);
    return sessionId;
  }

  get(sessionId: string): Session | undefined {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      return undefined;
    }

    if (session.expiresAt < new Date()) {
      this.sessions.delete(sessionId);
      console.log(`Session expired: ${sessionId}`);
      return undefined;
    }

    return session;
  }

  delete(sessionId: string): void {
    this.sessions.delete(sessionId);
    console.log(`Session deleted: ${sessionId}`);
  }

  getUserId(sessionId: string): string | undefined {
    const session = this.get(sessionId);
    return session?.userId;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  cleanup(): void {
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

setInterval(() => {
  sessionsStorage.cleanup();
}, 60 * 60 * 1000);
