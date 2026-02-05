import User from "../models/user.js";
import { generateAccessToken, generateLoginToken } from "../utils/token.js";

/**
 * Register new user
 */
export const registerUser = async (userData) => {
  const {
    userID,
    fullName,
    email, 
    contactNumber,
    unitNumber,
    numberOfTenants,
    userName,
    password,
  } = userData;

  // Check email (map email -> emailAddress)
  const emailExists = await User.findOne({
    where: { emailAddress: email },
  });

  if (emailExists) {
    throw new Error("Email already in use");
  }

  // Check username
  const usernameExists = await User.findOne({
    where: { userName },
  });

  if (usernameExists) {
    throw new Error("Username already in use");
  }

  const user = await User.create({
    userID,
    fullName,
    emailAddress: email, // ✅ correct DB field
    contactNumber,
    unitNumber,
    numberOfTenants,
    userName,
    password, // 🔐 auto-hashed by hook
    role: "user",
  });

  return user;
};


/**
 * User login
 */
export const loginUser = async ({ userName, password }) => {
  const user = await User.findOne({
    where: { userName },
  });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  const accessToken = generateAccessToken({
    id: user.ID,
    role: user.role,
  });

  const loginToken = generateLoginToken();
  user.loginToken = loginToken;
  await user.save();

  return {
    accessToken,
    loginToken,
    user: {
      id: user.ID,
      userID: user.userID,
      fullName: user.fullName,
      userName: user.userName,
      emailAddress: user.emailAddress,
      unitNumber: user.unitNumber,
      role: user.role,
    },
  };
};


