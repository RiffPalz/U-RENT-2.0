import {
    adminLogin,
    verifyAdminOtp,
} from "../../services/admin/adminAuthService.js";


// STEP 1: Email + Password → Send OTP
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

// STEP 2: Verify OTP → Generate JWT
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


// FETCH ADMIN PROFILE
export const fetchAdminProfile = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            admin: req.admin,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch admin profile",
        });
    }
};

// UPDATE ADMIN PROFILE
export const saveAdminProfile = async (req, res) => {
    try {
        // You can expand this later
        return res.status(200).json({
            success: true,
            message: "Admin profile updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update admin profile",
        });
    }
};

// RESEND VERIFICATION CODE
import { resendAdminCode } from "../../services/admin/adminAuthService.js";

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

