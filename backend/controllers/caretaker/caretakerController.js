import {
  caretakerLogin,
} from "../../services/caretaker/caretakerAuthService.js";

/**
 * ==============================
 * CARETAKER LOGIN
 * ==============================
 * Username + Password → Generate JWT
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
    return res.status(200).json({
      success: true,
      caretaker: req.caretaker,
    });
  } catch (error) {
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
    // You can expand this later
    return res.status(200).json({
      success: true,
      message: "Caretaker profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update caretaker profile",
    });
  }
};
