import { caretakerLogin } from "../../services/caretaker/caretakerAuthService.js";
import User from "../../models/user.js";
import { emitEvent } from "../../utils/emitEvent.js";

/**
 * ==============================
 * CARETAKER LOGIN
 * ==============================
 */
export const loginCaretaker = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const result = await caretakerLogin({ userName, password });

    return res.status(200).json({
      success: true,
      accessToken: result.accessToken,
      role: "caretaker",
      caretaker: result.caretaker,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid username or password",
    });
  }
};

/**
 * ==============================
 * FETCH CARETAKER PROFILE
 * ==============================
 */
export const fetchCaretakerProfile = async (req, res) => {
  try {
    const { instance, user } = req.caretaker;

    return res.status(200).json({
      success: true,
      caretaker: {
        id: instance.ID,
        caretaker_id: instance.caretaker_id,
        fullName: instance.full_name,
        phoneNumber: instance.phone_number,
        userName: user.userName,
        emailAddress: user.emailAddress,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Fetch caretaker profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch caretaker profile",
    });
  }
};

/**
 * ==============================
 * UPDATE CARETAKER PROFILE
 * ==============================
 */
export const saveCaretakerProfile = async (req, res) => {
  try {
    const { instance: caretaker, user } = req.caretaker;
    const { fullName, phoneNumber, emailAddress, userName } = req.body;

    // Update caretaker fields
    if (fullName) caretaker.full_name = fullName.trim();
    if (phoneNumber) caretaker.phone_number = phoneNumber.trim();

    // Update linked user fields
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

    await caretaker.save();
    await user.save();

    // 🔔 Real-time update event
    emitEvent(req, "dataUpdated", {
      type: "CARETAKER",
      action: "UPDATED",
      caretaker_id: caretaker.caretaker_id,
    });

    return res.status(200).json({
      success: true,
      message: "Caretaker profile updated successfully",
      caretaker: {
        id: caretaker.ID,
        caretaker_id: caretaker.caretaker_id,
        fullName: caretaker.full_name,
        phoneNumber: caretaker.phone_number,
        userName: user.userName,
        emailAddress: user.emailAddress,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Caretaker update error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update caretaker profile",
    });
  }
};
