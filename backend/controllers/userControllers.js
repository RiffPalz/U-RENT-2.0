import { registerUser, loginUser } from "../services/userAuthService.js";
import User from "../models/user.js";

/**
 * REGISTER USER
 */
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.ID,
        publicUserID: user.publicUserID,
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        userName: user.userName,
        unitNumber: user.unitNumber,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * LOGIN USER
 */
export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      accessToken: result.accessToken,
      loginToken: result.loginToken,
      user: result.user,
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

/**
 * FETCH USER PROFILE
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.auth.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
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
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
};

/**
 * UPDATE USER PROFILE
 */
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.auth.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const { fullName, emailAddress, userName, contactNumber, unitNumber } = req.body;

    if (fullName) user.fullName = fullName;
    if (contactNumber) user.contactNumber = contactNumber;
    if (unitNumber) user.unitNumber = unitNumber;

    // Check email & username uniqueness
    if (emailAddress && emailAddress !== user.emailAddress) {
      const emailExists = await User.findOne({ where: { emailAddress } });
      if (emailExists) return res.status(400).json({ success: false, message: "Email already in use" });
      user.emailAddress = emailAddress;
    }

    if (userName && userName !== user.userName) {
      const usernameExists = await User.findOne({ where: { userName } });
      if (usernameExists) return res.status(400).json({ success: false, message: "Username already in use" });
      user.userName = userName;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
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
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};
