import { eq } from "drizzle-orm";

import { hashPassword } from "@/utils";

import { db } from ".";
import { roles, userRoles, users } from "./schemas";

async function seedRoles() {
  const roleNames = ["admin", "manager", "operator"];

  for (const name of roleNames) {
    const existing = await db
      .select()
      .from(roles)
      .where(eq(roles.name, name))
      .limit(1);

    if (!existing.length) {
      await db.insert(roles).values({ name });
      console.log(`Role created: ${name}`);
    }
  }
}

async function seedAdminUser() {
  const email = "admin@fleet.local";

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length) {
    console.log("Admin user already exists");
    return existingUser[0];
  }

  const passwordHash = await hashPassword("admin123");

  const [user] = await db
    .insert(users)
    .values({
      email,
      name: "System Admin",
      passwordHash,
      isActive: true,
    })
    .returning();

  console.log("Admin user created");
  return user;
}

async function assignAdminRole(userId: string) {
  const [adminRole] = await db
    .select()
    .from(roles)
    .where(eq(roles.name, "admin"))
    .limit(1);

  if (!adminRole) {
    throw new Error("Admin role not found");
  }

  const existing = await db
    .select()
    .from(userRoles)
    .where(eq(userRoles.userId, userId) && eq(userRoles.roleId, adminRole.id))
    .limit(1);

  if (!existing.length) {
    await db.insert(userRoles).values({
      userId,
      roleId: adminRole.id,
    });
    console.log("Admin role assigned");
  }
}

async function main() {
  console.log("Seeding started...");

  await seedRoles();
  const admin = await seedAdminUser();
  await assignAdminRole(admin.id);

  console.log("Seeding completed");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed", err);
  process.exit(1);
});
