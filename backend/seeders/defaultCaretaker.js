import User from "../models/user.js";
import Caretaker from "../models/caretaker.js";

const createDefaultCaretaker = async () => {
  try {
    const email = "caretaker@mgcbuilding.com";
    const plainPassword = "crtkr@246"; // plain password

    // 1️⃣ Check if user already exists
    let user = await User.findOne({ where: { emailAddress: email } });

    if (!user) {
      // Let the User model hash the password automatically
      user = await User.create({
        publicUserID: "PUBLIC-CARE-001",
        fullName: "MGC CARETAKER",
        emailAddress: email,
        contactNumber: "09180000000",
        userName: "mgc_caretaker",
        passwordHash: plainPassword, // plain password
        role: "caretaker",
      });
    }

    // 2️⃣ Check if Caretaker profile exists
    const existingCaretaker = await Caretaker.findOne({ where: { user_id: user.ID } });
    if (existingCaretaker) {
      console.log("✅ Default caretaker profile already exists");
      return;
    }

    // 3️⃣ Create caretaker profile
    await Caretaker.create({
      caretaker_id: "CARETAKER-001",
      user_id: user.ID,
      full_name: user.fullName,
      phone_number: user.contactNumber || "09180000000",
    });

    console.log("🚀 Default caretaker profile created and linked");
  } catch (error) {
    console.error("❌ Failed to create default caretaker:", error);
  }
};

export default createDefaultCaretaker;
