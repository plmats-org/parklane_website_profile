import { connectDatabase, disconnectDatabase } from "../connection";
import { seedSuperAdmin } from "./users.seeder";

const runSeeders = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log("... Starting database seeding...");

    await seedSuperAdmin();

    console.log("+++ Database seeding completed successfully");
    await disconnectDatabase();
    process.exit(0);
  } catch (error) {
    console.error("--- Database seeding failed:", error);
    await disconnectDatabase();
    process.exit(1);
  }
};

if (require.main === module) {
  runSeeders();
}

export { runSeeders };
