import { verifyPassword } from "@/utils";

import { InvalidCredentialsError, UserInactiveError } from "./errors";
import type { LoginFormInput } from "./schema";
import type { AuthRepository, AuthSession, AuthUser } from "./types";

type AuthServiceDeps = {
  repo: AuthRepository;
  sessionTTLms: number;
};

export class AuthService {
  private readonly repo: AuthRepository;
  private readonly sessionTTLms: number;

  constructor(deps: AuthServiceDeps) {
    this.repo = deps.repo;
    this.sessionTTLms = deps.sessionTTLms;
  }

  async login(
    input: LoginFormInput,
    ctx?: { userAgent?: string; ipAddress?: string }
  ): Promise<AuthSession> {
    const user = await this.repo.findUserForAuth(input.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (!user.isActive) {
      throw new UserInactiveError();
    }

    const valid = await verifyPassword(input.password, user.passwordHash);

    if (!valid) {
      throw new InvalidCredentialsError();
    }

    const roles = await this.repo.getUserRoles(user.id);
    const expiresAt = new Date(Date.now() + this.sessionTTLms);

    const { sessionId } = await this.repo.createSession({
      userId: user.id,
      expiresAt,
    });

    return {
      sessionId,
      expiresAt,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles,
      },
    };
  }

  async logout(sessionId: string): Promise<void> {
    await this.repo.revokeSession(sessionId);
  }

  async resolveSession(sessionId: string): Promise<AuthUser | null> {
    const session = await this.repo.findSessionById(sessionId);

    if (!session) return null;
    if (session.revokedAt) return null;
    if (session.expiresAt < new Date()) return null;

    return this.repo.getUserById(session.userId);
  }
}
