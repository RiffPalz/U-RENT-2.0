import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
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

    // 3️⃣ Fetch admin + user fresh from DB
    const admin = await Admin.findOne({
      where: { userID: decoded.id },
      include: [
        {
          model: User,
          attributes: ["ID", "userName", "emailAddress", "role"],
        },
      ],
    });

    if (!admin || !admin.User) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    // 4️⃣ Enforce admin role
    if (admin.User.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access only.",
      });
    }

    // 5️⃣ Attach full admin object to req for controllers
    // Controllers can access fresh fields or do updates
    req.admin = {
      instance: admin, // Sequelize instance for updates
      user: admin.User, // Linked User instance
      id: admin.ID, // Admin table PK
      adminID: admin.adminID,
      fullName: admin.full_name,
      emailAddress: admin.emailAddress,
      phoneNumber: admin.phoneNumber,
      userName: admin.User.userName,
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
