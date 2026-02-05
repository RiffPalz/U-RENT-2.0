import jwt from "jsonwebtoken";
import crypto from "crypto";

/**
 * Generate JWT token (Admin, Caretaker, User)
 * @param {Object} payload - { id, role, email? }
 */
export const generateAccessToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });
};

/**
 * Verify JWT token
 */
export const verifyAccessToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Random token for login / session tracking
 */
export const generateLoginToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * Password reset token
 */
export const generatePasswordResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export default {
  generateAccessToken,
  verifyAccessToken,
  generateLoginToken,
  generatePasswordResetToken,
};
