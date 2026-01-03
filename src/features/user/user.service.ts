import { type Role, ROLES } from "@/constants";
import type { CreateUserInput, User, UserRepository } from "@/features/user";
import { hashPassword } from "@/utils";

type UserServiceDeps = {
  repo: UserRepository;
};

export class UserService {
  private readonly repo: UserRepository;

  private validateRoles(roles: readonly Role[]) {
    for (const role of roles) {
      if (!ROLES.includes(role)) {
        throw new Error(`Invalid role: ${role}`);
      }
    }
  }
  constructor(deps: UserServiceDeps) {
    this.repo = deps.repo;
  }

  async createUser(input: CreateUserInput): Promise<{ id: string }> {
    this.validateRoles(input.roles);

    const existing = await this.repo.findByEmail(input.email);
    if (existing) {
      throw new Error("User already exists");
    }

    const passwordHash = await hashPassword(input.passwordHash);

    return this.repo.create({
      email: input.email,
      name: input.name,
      roles: input.roles,
      passwordHash,
      isActive: input.isActive ?? true,
    });
  }

  async deactivateUser(userId: string): Promise<void> {
    await this.repo.deactivate(userId);
  }

  async assignRoles(userId: string, roles: Role[]): Promise<void> {
    this.validateRoles(roles);

    await this.repo.setRoles(userId, roles);
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.repo.findById(userId);
  }

  async listUsers(): Promise<User[]> {
    return this.repo.list();
  }
}
