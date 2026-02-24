import express from "express";
import {
  loginAdmin,
  loginCodeVerify,
  fetchAdminProfile,
  saveAdminProfile,
  resendCodeController,
  getPendingUsers,
  updateUserApproval,
  getTenantsOverview,
} from "../../controllers/admin/adminControllers.js";

import adminAuth from "../../middleware/adminAuth.js";

const adminRouter = express.Router();

// LOGIN FLOW
adminRouter.post("/login", loginAdmin);
adminRouter.post("/login/verify", loginCodeVerify);
adminRouter.post("/login/resend", resendCodeController);

// PROFILE (Protected)
adminRouter.get("/profile", adminAuth, fetchAdminProfile);
adminRouter.patch("/profile/update", adminAuth, saveAdminProfile);

// ACCOUNT APPROVAL (Protected - Admin Only)
adminRouter.get("/users/pending", adminAuth, getPendingUsers);
adminRouter.patch("/users/:userId/approval", adminAuth, updateUserApproval);
adminRouter.get("/tenants/overview", adminAuth, getTenantsOverview);

export default adminRouter;