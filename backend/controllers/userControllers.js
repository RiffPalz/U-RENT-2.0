import {
  registerUser,
  loginUser,
} from "../services/userAuthService.js";

/**
 * REGISTER USER
 * POST /api/users/register
 */
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        userID: user.userID,
        fullName: user.fullName,
        email: user.email,
        userName: user.userName,
        unitNumber: user.unitNumber,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * LOGIN USER
 * POST /api/users/login
 */
export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      message: "Login successful",
      accessToken: result.accessToken,
      loginToken: result.loginToken,
      user: result.user,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
