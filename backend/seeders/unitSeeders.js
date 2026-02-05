import { Unit } from "../models/index.js";

const seedUnits = async () => {
  const unitNumbers = [
    101, 102, 103, 104, 105, 106, 107,
    201, 202, 203, 204, 205, 206,
    301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316,
    401, 402, 403, 404, 405, 406, 407, 408
  ];

  try {
    const unitData = unitNumbers.map((num) => ({
      unit_number: num,
      status: "Vacant",
      base_rent: 3000.00,
    }));

    // bulkCreate is faster and more efficient for multiple rows
    await Unit.bulkCreate(unitData, { ignoreDuplicates: true });
    console.log("✅ All MGC Building units seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding units:", error);
  }
};

export default seedUnits;