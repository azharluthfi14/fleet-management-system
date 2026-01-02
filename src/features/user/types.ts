export const ROLES = ["admin", "manager", "operator"] as const;
export type Role = (typeof ROLES)[number];

export interface User {
  id: string;
  email: string;
  name: string;
  roles: readonly Role[];
  createdAt: Date;
  isActive: boolean;
}

export interface CreateUserInput {
  email: string;
  name: string;
  passwordHash: string;
  roles: readonly Role[];
  isActive?: boolean;
}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  list(): Promise<User[]>;
  create(input: CreateUserInput): Promise<{ id: string }>;
  setRoles(userId: string, roles: readonly Role[]): Promise<void>;
  deactivate(userId: string): Promise<void>;
}
