import {
  adminLogin,
  verifyAdminOtp,
  resendAdminCode,
} from "../../services/admin/adminAuthService.js";

import { User } from "../../models/index.js";
import { emitEvent } from "../../utils/emitEvent.js";

/**
 * ==============================
 * STEP 1: Email + Password → Send OTP
 * ==============================
 */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await adminLogin({ email, password });

    return res.status(200).json({
      success: true,
      message: result.message,
      adminId: result.adminId,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ==============================
 * STEP 2: Verify OTP → Generate JWT
 * ==============================
 */
export const loginCodeVerify = async (req, res) => {
  try {
    const { adminId, verificationCode } = req.body;

    const result = await verifyAdminOtp({ adminId, verificationCode });

    return res.status(200).json({
      success: true,
      message: result.message,
      accessToken: result.accessToken,
      admin: result.admin,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ==============================
 * FETCH ADMIN PROFILE
 * ==============================
 */
export const fetchAdminProfile = async (req, res) => {
  try {
    const { instance: admin, user } = req.admin;

    return res.status(200).json({
      success: true,
      admin: {
        id: admin.ID,
        adminID: admin.adminID,
        fullName: admin.full_name,
        phoneNumber: admin.phoneNumber,
        emailAddress: user.emailAddress,
        userName: user.userName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Fetch admin profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin profile",
    });
  }
};

/**
 * ==============================
 * UPDATE ADMIN PROFILE
 * ==============================
 */
export const saveAdminProfile = async (req, res) => {
  try {
    const { instance: admin, user } = req.admin;
    const { fullName, phoneNumber, emailAddress, userName } = req.body;

    // Update Admin fields
    if (fullName) admin.full_name = fullName.trim();
    if (phoneNumber) admin.phoneNumber = phoneNumber.trim();

    // Update linked User fields
    if (emailAddress && emailAddress !== user.emailAddress) {
      const emailExists = await User.findOne({ where: { emailAddress } });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
      user.emailAddress = emailAddress.trim();
    }

    if (userName && userName !== user.userName) {
      const userNameExists = await User.findOne({ where: { userName } });
      if (userNameExists) {
        return res.status(400).json({
          success: false,
          message: "Username already in use",
        });
      }
      user.userName = userName.trim();
    }

    await admin.save();
    await user.save();

    // 🔔 Real-time update
    emitEvent(req, "dataUpdated", {
      type: "ADMIN",
      action: "UPDATED",
      adminID: admin.adminID,
    });

    return res.status(200).json({
      success: true,
      message: "Admin profile updated successfully",
      admin: {
        id: admin.ID,
        adminID: admin.adminID,
        fullName: admin.full_name,
        phoneNumber: admin.phoneNumber,
        emailAddress: user.emailAddress,
        userName: user.userName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Admin update error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update admin profile",
    });
  }
};

/**
 * ==============================
 * RESEND VERIFICATION CODE
 * ==============================
 */
export const resendCodeController = async (req, res) => {
  try {
    const { adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required",
      });
    }

    await resendAdminCode(adminId);

    return res.status(200).json({
      success: true,
      message: "Verification code resent successfully",
    });
  } catch (error) {
    console.error("Resend OTP Error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to resend verification code",
    });
  }
};
