import { sequelize } from "./config/database.js";
import seedUnits from "./seeders/unitSeeder.js";

const runSeeders = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected for seeding...");
    
    await seedUnits();
    
    console.log("Seeding complete.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

runSeeders();