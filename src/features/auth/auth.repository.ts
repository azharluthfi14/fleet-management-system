import { and, eq, isNull } from "drizzle-orm";

import { type Role, ROLES } from "@/constants";
import { db } from "@/db";
import { roles, sessions, userRoles, users } from "@/db/schemas";

import type { AuthRepository, AuthUser, UserForAuth } from "./auth.types";

export class DrizzleAuthRepository implements AuthRepository {
  async findUserForAuth(email: string): Promise<UserForAuth | null> {
    const result = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        passwordHash: users.passwordHash,
        isActive: users.isActive,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] ?? null;
  }

  async getUserRoles(userId: string): Promise<readonly Role[]> {
    const result = await db
      .select({
        name: roles.name,
      })
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .where(eq(userRoles.userId, userId));

    return result.map((r) => r.name).filter(this.isRole);
  }

  async createSession(input: {
    userId: string;
    expiresAt: Date;
    userAgent?: string;
    ipAddress?: string;
  }): Promise<{ sessionId: string }> {
    const result = await db
      .insert(sessions)
      .values({
        userId: input.userId,
        expiresAt: input.expiresAt,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      })
      .returning({
        id: sessions.id,
      });

    return { sessionId: result[0].id };
  }

  async findSessionById(sessionId: string): Promise<{
    id: string;
    userId: string;
    expiresAt: Date;
    revokedAt: Date | null;
  } | null> {
    const result = await db
      .select({
        id: sessions.id,
        userId: sessions.userId,
        expiresAt: sessions.expiresAt,
        revokedAt: sessions.revokedAt,
      })
      .from(sessions)
      .where(eq(sessions.id, sessionId))
      .limit(1);

    return result[0] ?? null;
  }

  async revokeSession(sessionId: string): Promise<void> {
    await db
      .update(sessions)
      .set({
        revokedAt: new Date(),
      })
      .where(and(eq(sessions.id, sessionId), isNull(sessions.revokedAt)));
  }

  async getUserById(userId: string): Promise<AuthUser | null> {
    const userResult = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!userResult[0]) return null;

    const rolesResult = await this.getUserRoles(userId);

    return {
      ...userResult[0],
      roles: rolesResult,
    };
  }

  private isRole(value: string): value is Role {
    return ROLES.includes(value as Role);
  }
}
