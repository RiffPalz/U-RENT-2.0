import User from "../models/user.js";

const createDefaultCaretaker = async () => {
  try {
    const email = "caretaker@mgcbuilding.com";
    const plainPassword = "crtkr@246";

    // 1️⃣ Check if caretaker already exists
    let user = await User.findOne({
      where: { emailAddress: email },
    });

    if (!user) {
      // 2️⃣ Create default caretaker
      user = await User.create({
        publicUserID: "PUBLIC-CARE-001",
        fullName: "MGC CARETAKER",
        emailAddress: email,
        contactNumber: "09180000000",
        userName: "mgc_caretaker", 
        password_hash: plainPassword, 
        role: "caretaker",
        status: "Approved",
      });

      console.log("✅ Default caretaker created successfully");
    } else {
      // 3️⃣ Ensure role and status are correct
      user.role = "caretaker";
      user.status = "Approved";
      await user.save();

      console.log("✅ Default caretaker already exists (updated role/status)");
    }
  } catch (error) {
    console.error("❌ Failed to create default caretaker:", error);
  }
};

export default createDefaultCaretaker;