import jwt from "jsonwebtoken";
import Caretaker from "../models/caretaker.js";
import User from "../models/user.js";

const caretakerAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing or malformed.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "caretaker") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // ✅ Fetch caretaker + linked User instance
    const caretaker = await Caretaker.findOne({
      where: { user_id: decoded.id },
      include: [
        {
          model: User,
          attributes: ["ID", "userName", "emailAddress", "role"],
        },
      ],
    });

    if (!caretaker || !caretaker.User) {
      return res.status(401).json({
        success: false,
        message: "Caretaker not found",
      });
    }

    // Attach instances + clean snapshot to req
    req.caretaker = {
      instance: caretaker, // Sequelize instance for updates
      user: caretaker.User, // Linked User instance
      id: caretaker.ID,
      caretaker_id: caretaker.caretaker_id,
      fullName: caretaker.full_name,
      phoneNumber: caretaker.phone_number,
      userName: caretaker.User.userName,
      emailAddress: caretaker.User.emailAddress,
      role: caretaker.User.role,
    };

    next();
  } catch (error) {
    console.error("Caretaker Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default caretakerAuth;
