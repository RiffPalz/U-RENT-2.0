import User from "../models/user.js";
import Caretaker from "../models/caretaker.js";

const createDefaultCaretaker = async () => {
  const email = "caretaker@mgcbuilding.com";

  // Check for existing user first
  let user = await User.findOne({ where: { emailAddress: email } });
  if (!user) {
    user = await User.create({
      publicUserID: "PUBLIC-CARE-001",
      fullName: "MGC CARETAKER",
      emailAddress: email,
      contactNumber: "09180000000",
      userName: "mgc_caretaker",
      passwordHash: "crtkr@246",
      role: "caretaker",
    });
    console.log("✅ Default caretaker user created");
  }

  // Ensure Caretaker record exists and is linked to the user
  const exists = await Caretaker.findOne({ where: { user_id: user.ID } });
  if (exists) return;

  await Caretaker.create({
    caretaker_id: "CARETAKER-001",
    user_id: user.ID,
    full_name: user.fullName,
    phone_number: user.contactNumber || "09180000000",
  });

  console.log("🚀 Default caretaker created");
};

export default createDefaultCaretaker;
