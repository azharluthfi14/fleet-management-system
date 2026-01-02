import { db } from "@/db";
import { roles } from "@/db/schemas";
import { ROLES } from "@/features/user";

export async function seedRoles() {
  for (const role of ROLES) {
    await db.insert(roles).values({ name: role }).onConflictDoNothing();
  }
  console.log("Roles seeded");
}
