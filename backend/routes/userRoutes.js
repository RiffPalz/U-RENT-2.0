import express from "express";
import { register, login } from "../controllers/userControllers.js";
import { userRegisterValidator } from "../validator/userRegisterValidator.js";
import { userLoginValidator } from "../validator/userLoginValidator.js";

const router = express.Router();

/**
 * USER AUTH ROUTES
 */
router.post("/register", userRegisterValidator, register);
router.post("/login", userLoginValidator, login);

export default router;
