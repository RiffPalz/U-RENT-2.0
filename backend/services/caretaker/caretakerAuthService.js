import User from "../../models/user.js";
import jwt from "jsonwebtoken";

export const caretakerLogin = async ({ userName, password }) => {
  if (!userName || !password) {
    throw new Error("Username and password are required");
  }

  // 1️⃣ Find user by username and role
  const user = await User.findOne({
    where: { userName: userName, role: "caretaker" },
  });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  // 2️⃣ Compare password using User model method
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  // 3️⃣ Generate JWT
  const token = jwt.sign(
    { id: user.ID, role: "caretaker" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "7d" }
  );

  user.loginToken = token;
  await user.save();

  return {
    accessToken: token,
    caretaker: {
      id: user.ID,
      caretaker_id: user.publicUserID,
      fullName: user.fullName,
      username: user.userName,
      role: "caretaker",
    },
  };
};
