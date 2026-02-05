import User from "../models/user.js";
import Admin from "../models/admin.js";

const createDefaultAdmin = async () => {
  const email = "mgcbuilding762@gmail.com";

  // Check for existing user first (users table holds emailAddress)
  let user = await User.findOne({ where: { emailAddress: email } });
  if (!user) {
    user = await User.create({
      publicUserID: "PUBLIC-ADMIN-001",
      fullName: "MGC ADMIN",
      emailAddress: email,
      contactNumber: "09170000000",
      userName: "mgc_admin",
      passwordHash: "adminMGC123",
      role: "admin",
    });
    console.log("✅ Default admin user created");
  }

  // Ensure Admin record exists and is linked to the user
  const existingAdmin = await Admin.findOne({ where: { userID: user.ID } });
  if (existingAdmin) {
    console.log("✅ Default admin already exists");
    return;
  }

  await Admin.create({
    adminID: "ADMIN-001",
    userID: user.ID,
    phoneNumber: "09170000000",
  });

  console.log("🚀 Default admin created");
};

export default createDefaultAdmin;
