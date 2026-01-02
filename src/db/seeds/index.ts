import { seedRoles } from "./seed-roles";
import { seedUsers } from "./seed-users";

async function main() {
  console.log("Seeding started...");

  await seedRoles();
  await seedUsers();

  console.log("Seeding finished");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed", err);
  process.exit(1);
});
