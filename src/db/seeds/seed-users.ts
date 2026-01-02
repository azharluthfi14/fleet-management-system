import { DrizzleUserRepository, UserService } from "@/features/user";

const userService = new UserService({
  repo: new DrizzleUserRepository(),
});

export async function seedUsers() {
  const users = [
    {
      email: "admin@fleet.app",
      name: "Admin Fleet",
      passwordHash: "admin123",
      roles: ["admin"] as const,
    },
    {
      email: "manager@fleet.app",
      name: "Manager Fleet",
      passwordHash: "manager123",
      roles: ["manager"] as const,
    },
    {
      email: "operator@fleet.app",
      name: "Operator Fleet",
      passwordHash: "operator123",
      roles: ["operator"] as const,
    },
  ];

  for (const user of users) {
    const existing = await userService["repo"].findByEmail(user.email);

    if (existing) {
      console.log(`User ${user.email} already exists`);
      continue;
    }

    await userService.createUser(user);
    console.log(`User ${user.email} created`);
  }
}
