import User from "../models/user.js";
import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";

const createDefaultAdmin = async () => {
  try {
    const email = "mgcbuilding762@gmail.com";
    const plainPassword = "adminMGC123";

    // 1️⃣ Check if user already exists
    let user = await User.findOne({ where: { emailAddress: email } });

    if (!user) {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      // Create the default user
      user = await User.create({
        publicUserID: "PUBLIC-ADMIN-001",
        fullName: "MGC ADMIN",
        emailAddress: email,
        userName: "mgc_admin",
        passwordHash: hashedPassword,
        role: "admin",
      });

      console.log("✅ Default admin user created");
    } else {
      console.log("ℹ️ Default admin user already exists");
    }

    // 2️⃣ Check if Admin profile exists
    const existingAdmin = await Admin.findOne({ where: { userID: user.ID } });
    if (existingAdmin) {
      console.log("✅ Default admin profile already exists");
      return;
    }

    // 3️⃣ Create Admin profile
    await Admin.create({
      adminID: "ADMIN-001",
      userID: user.ID,               // Link to User.ID
      full_name: user.fullName,      // Required
      emailAddress: user.emailAddress, // Required
      phoneNumber: "09170000000",    // Optional
    });

    console.log("🚀 Default admin profile created and linked");
  } catch (error) {
    console.error("❌ Failed to create default admin:", error);
  }
};

export default createDefaultAdmin;
