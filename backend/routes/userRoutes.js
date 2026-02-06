import express from "express";
import { register, login, getUserProfile, updateUserProfile } from "../controllers/userControllers.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { userRegisterValidator } from "../validator/userRegisterValidator.js";
import { userLoginValidator } from "../validator/userLoginValidator.js";

const router = express.Router();

// REGISTER
router.post("/register", userRegisterValidator, register);

// LOGIN
router.post("/login", userLoginValidator, login);

// FETCH PROFILE (protected)
router.get("/profile", authenticate, authorize("user"), getUserProfile);

// UPDATE PROFILE (protected)
router.patch("/profile/update", authenticate, authorize("user"), updateUserProfile);

export default router;
