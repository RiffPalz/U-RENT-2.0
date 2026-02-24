import User from "../models/user.js";
import { generateAccessToken, generateLoginToken } from "../utils/token.js";
import { Op } from "sequelize";

/**
 * Helper to generate auto-incrementing publicUserID like TENANT-001
 */
const generatePublicUserID = async () => {
  // Find the last user with a TENANT-XXX ID
  const lastUser = await User.findOne({
    where: { publicUserID: { [Op.like]: "TENANT-%" } },
    order: [["created_at", "DESC"]],
  });

  let nextNumber = 1;

  if (lastUser && lastUser.publicUserID) {
    const match = lastUser.publicUserID.match(/TENANT-(\d+)/);
    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }

  return `TENANT-${String(nextNumber).padStart(3, "0")}`;
};

/**
 * REGISTER USER
 */
export const registerUser = async (userData) => {
  const {
    fullName,
    email,
    contactNumber,
    unitNumber,
    numberOfTenants,
    userName,
    password,
  } = userData;

  // Check if email already exists
  if (await User.findOne({ where: { emailAddress: email } })) {
    throw new Error("Email already in use");
  }

  // Check if username already exists
  if (await User.findOne({ where: { userName } })) {
    throw new Error("Username already in use");
  }

  // Auto-generate publicUserID
  const publicUserID = await generatePublicUserID();

  // Create user
  const user = await User.create({
    publicUserID,
    fullName,
    emailAddress: email,
    contactNumber,
    unitNumber,
    numberOfTenants,
    userName,
    password_hash: password, // ✅ CORRECT FIELD NAME
    role: "tenant", // ✅ CORRECT ENUM VALUE
  });

  return user;
};

/**
 * LOGIN USER
 */
export const loginUser = async ({ userName, password }) => {
  const user = await User.findOne({ where: { userName } });
  if (!user || user.role !== "tenant") {
    throw new Error("Invalid username or password");
  }

  if (user.status !== "Approved") {
    throw new Error("Your account is still pending admin approval");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid username or password");

  // Generate tokens
  const accessToken = generateAccessToken({ id: user.ID, role: user.role });
  const loginToken = generateLoginToken();

  // Save login token
  user.loginToken = loginToken;
  await user.save();

  return {
    message: "Login successful",
    accessToken,
    loginToken,
    user: {
      id: user.ID,
      publicUserID: user.publicUserID,
      fullName: user.fullName,
      emailAddress: user.emailAddress,
      userName: user.userName,
      contactNumber: user.contactNumber,
      unitNumber: user.unitNumber,
      role: user.role,
    },
  };
};
