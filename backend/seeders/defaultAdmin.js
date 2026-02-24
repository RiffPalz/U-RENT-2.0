import User from "../models/user.js";

const createDefaultAdmin = async () => {
  try {
    const email = "mgcbuilding762@gmail.com";
    const plainPassword = "adminMGC123";

    // 1️⃣ Check if admin already exists
    let user = await User.findOne({
      where: { emailAddress: email },
    });

    if (!user) {
      // 2️⃣ Create default admin
      user = await User.create({
        publicUserID: "PUBLIC-ADMIN-001",
        fullName: "MGC ADMIN",
        emailAddress: email,
        userName: "mgc_admin", // ✅ FIXED (correct field name)
        password_hash: plainPassword, // ✅ Send plain password (hook will hash it)
        role: "admin",
        status: "Approved",
      });

      console.log("✅ Default admin created successfully");
    } else {
      // 3️⃣ Ensure role and status are correct
      user.role = "admin";
      user.status = "Approved";
      await user.save();

      console.log("✅ Default admin already exists (updated role/status)");
    }
  } catch (error) {
    console.error("❌ Failed to create default admin:", error);
  }
};

export default createDefaultAdmin;