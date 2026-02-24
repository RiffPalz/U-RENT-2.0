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
    const { instance } = req.caretaker;

    return res.status(200).json({
      success: true,
      caretaker: {
        id: instance.ID,
        caretaker_id: instance.publicUserID,
        fullName: instance.fullName,
        contactNumber: instance.contactNumber,
        username: instance.userName,
        emailAddress: instance.emailAddress,
        role: instance.role,
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
    const { instance: user } = req.caretaker;
    const { fullName, contactNumber, emailAddress, username } = req.body;

    // Update user fields
    if (fullName) user.fullName = fullName.trim();
    if (contactNumber) user.contactNumber = contactNumber.trim();

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

    if (username && username !== user.userName) {
      const usernameExists = await User.findOne({ where: { userName } });
      if (usernameExists) {
        return res.status(400).json({
          success: false,
          message: "Username already in use",
        });
      }
      user.userName = username.trim();
    }

    await user.save();

    // 🔔 Real-time update event
    emitEvent(req, "dataUpdated", {
      type: "CARETAKER",
      action: "UPDATED",
      caretaker_id: user.publicUserID,
    });

    return res.status(200).json({
      success: true,
      message: "Caretaker profile updated successfully",
      caretaker: {
        id: user.ID,
        caretaker_id: user.publicUserID,
        fullName: user.fullName,
        contactNumber: user.contactNumber,
        username: user.userName,
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
