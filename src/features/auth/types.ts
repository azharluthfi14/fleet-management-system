export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export type AuthSession = {
  sessionId: string;
  user: AuthUser;
  expiresAt: Date;
};

export type UserForAuth = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  isActive: boolean;
};

export interface AuthRepository {
  findUserForAuth(email: string): Promise<UserForAuth | null>;
  getUserRoles(userId: string): Promise<string[]>;
  createSession(input: {
    userId: string;
    expiresAt: Date;
    userAgent?: string;
    ipAddress?: string;
  }): Promise<{ sessionId: string }>;
  findSessionById(sessionId: string): Promise<{
    id: string;
    userId: string;
    expiresAt: Date;
    revokedAt: Date | null;
  } | null>;
  revokeSession(sessionId: string): Promise<void>;
  getUserById(userId: string): Promise<AuthUser | null>;
}
