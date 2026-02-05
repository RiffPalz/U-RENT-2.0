import express from "express";
import {
    loginAdmin,
    loginCodeVerify,
    fetchAdminProfile,
    saveAdminProfile,
    resendCodeController,
} from "../../controllers/admin/adminControllers.js";

import adminAuth from "../../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/login/verify", loginCodeVerify);
adminRouter.post("/login/resend", resendCodeController);

adminRouter.get("/profile", adminAuth, fetchAdminProfile);
adminRouter.patch("/profile/update", adminAuth, saveAdminProfile);

export default adminRouter;
