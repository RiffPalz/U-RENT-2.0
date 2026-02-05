import { verifyAccessToken } from "../utils/token.js";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    // Attach decoded payload to request
    req.auth = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * Role-based authorization
 * @example authorize("admin"), authorize("admin", "caretaker")
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.auth || !req.auth.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.auth.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
