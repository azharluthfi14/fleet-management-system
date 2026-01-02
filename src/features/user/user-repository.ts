import { eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { roles, userRoles, users } from "@/db/schemas";

import type { CreateUserInput, Role, User, UserRepository } from "./types";

export class DrizzleUserRepository implements UserRepository {
  private async getRoles(userId: string): Promise<Role[]> {
    const rows = await db
      .select({ name: roles.name })
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .where(eq(userRoles.userId, userId));

    return rows.map((r) => r.name as Role);
  }

  async findById(id: string): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) return null;

    const rolesResult = await this.getRoles(user.id);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: rolesResult,
      createdAt: user.createdAt,
      isActive: user.isActive,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) return null;

    const rolesResult = await this.getRoles(user.id);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      isActive: user.isActive,
      roles: rolesResult,
      createdAt: user.createdAt,
    };
  }

  async create(input: CreateUserInput): Promise<{ id: string }> {
    const [user] = await db
      .insert(users)
      .values({
        email: input.email,
        name: input.name,
        passwordHash: input.passwordHash,
        isActive: input.isActive ?? true,
      })
      .returning({ id: users.id });

    await this.setRoles(user.id, input.roles);

    return { id: user.id };
  }

  async list(): Promise<User[]> {
    const rows = await db.select().from(users);

    const result: User[] = [];

    for (const user of rows) {
      const roles = await this.getRoles(user.id);

      result.push({
        id: user.id,
        email: user.email,
        name: user.name,
        isActive: user.isActive,
        roles,
        createdAt: user.createdAt,
      });
    }

    return result;
  }

  async setRoles(userId: string, rolesInput: readonly Role[]): Promise<void> {
    const roleRows = await db
      .select()
      .from(roles)
      .where(inArray(roles.name, rolesInput));

    await db.delete(userRoles).where(eq(userRoles.userId, userId));

    await db.insert(userRoles).values(
      roleRows.map((role) => ({
        userId,
        roleId: role.id,
      }))
    );
  }

  async deactivate(userId: string): Promise<void> {
    await db.update(users).set({ isActive: false }).where(eq(users.id, userId));
  }
}
