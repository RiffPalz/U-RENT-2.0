import jwt from "jsonwebtoken";
import Admin from '../models/admin.js';

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token missing or malformed.",
            });
        }

        const token = authHeader.split(" ")[1];

        // ✅ Use SAME JWT_SECRET as the rest of the app
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ decoded.id (not decoded.ID)
        const adminUser = await Admin.findByPk(decoded.id);

        if (!adminUser) {
            return res.status(401).json({
                success: false,
                message: "Admin account not found.",
            });
        }

        // ✅ Attach admin to request
        req.admin = {
            id: adminUser.ID,
            email: adminUser.emailAddress,
            role: "admin",
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
