import jwt from "jsonwebtoken";
import User from "../models/user.js";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1️⃣ Check token presence & format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Access token is required.",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload.",
      });
    }

    // 3️⃣ Fetch admin user from DB
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    // 4️⃣ Enforce admin role
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access only.",
      });
    }

    // 5️⃣ Attach user object to req for controllers
    req.admin = {
      instance: user, // Sequelize instance for updates
      id: user.ID,
      adminID: user.publicUserID,
      fullName: user.fullName,
      emailAddress: user.emailAddress,
      contactNumber: user.contactNumber,
      username: user.userName,
    };

    next();
  } catch (error) {
    console.error("Admin Auth Middleware Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

export default adminAuth;
