import mongoose from "mongoose";
import { connectDatabase, disconnectDatabase } from "../connection";

interface Migration {
  id: string;
  name: string;
  up: () => Promise<void>;
  down: () => Promise<void>;
}

const migrations: Migration[] = [];

const MigrationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
});

const MigrationModel = mongoose.model("Migration", MigrationSchema);

const runMigrations = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log("+++ Checking for pending migrations...");

    const appliedMigrations = await MigrationModel.find().select("id");
    const appliedIds = new Set(appliedMigrations.map((m) => m.id));

    const pendingMigrations = migrations.filter((m) => !appliedIds.has(m.id));

    if (pendingMigrations.length === 0) {
      console.log("+++ No pending migrations");
      await disconnectDatabase();
      return;
    }

    console.log(`Found ${pendingMigrations.length} pending migration(s)`);

    for (const migration of pendingMigrations) {
      console.log(`Running migration: ${migration.id} - ${migration.name}`);
      await migration.up();

      await MigrationModel.create({
        id: migration.id,
        name: migration.name,
      });

      console.log(`+++ Migration ${migration.id} completed`);
    }

    console.log("+++ All migrations completed successfully");
    await disconnectDatabase();
  } catch (error) {
    console.error("--- Migration failed:", error);
    await disconnectDatabase();
    throw error;
  }
};

const rollbackLastMigration = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log("+++ Rolling back last migration...");

    const lastMigration = await MigrationModel.findOne().sort({
      appliedAt: -1,
    });

    if (!lastMigration) {
      console.log("No migrations to rollback");
      await disconnectDatabase();
      return;
    }

    const migration = migrations.find((m) => m.id === lastMigration.id);

    if (!migration) {
      throw new Error(`Migration ${lastMigration.id} not found`);
    }

    console.log(`Rolling back migration: ${migration.id} - ${migration.name}`);
    await migration.down();

    await MigrationModel.deleteOne({ id: migration.id });

    console.log(`+++ Migration ${migration.id} rolled back successfully`);
    await disconnectDatabase();
  } catch (error) {
    console.error("--- Rollback failed:", error);
    await disconnectDatabase();
    throw error;
  }
};

if (require.main === module) {
  const command = process.argv[2];

  if (command === "up") {
    runMigrations();
  } else if (command === "down") {
    rollbackLastMigration();
  } else {
    console.error("Usage: npm run db:migrate:up or npm run db:migrate:down");
    process.exit(1);
  }
}

export { runMigrations, rollbackLastMigration };
