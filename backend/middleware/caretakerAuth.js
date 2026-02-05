import jwt from "jsonwebtoken";
import Caretaker from "../models/caretaker.js";

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

        const caretaker = await Caretaker.findByPk(decoded.id);

        if (!caretaker) {
            return res.status(401).json({
                success: false,
                message: "Caretaker not found",
            });
        }

        req.caretaker = caretaker;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default caretakerAuth;
