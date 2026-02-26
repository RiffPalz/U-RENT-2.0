import express from "express";
import adminAuth from "../../middleware/adminAuth.js";

import {
    fetchAllMaintenance,
    approveMaintenanceController,
    updateMaintenanceController,
    createMaintenanceController
} from "../../controllers/admin/adminMaintenanceController.js";

const router = express.Router();

// Get all maintenance requests
router.get(
    "/",
    adminAuth,
    fetchAllMaintenance
);

// Approve maintenance request
router.patch(
    "/:id/approve",
    adminAuth,
    approveMaintenanceController
);

// Update maintenance status (In Progress / Done)
router.patch(
  "/:id",
  adminAuth,
  updateMaintenanceController
);

router.post(
  "/",
  adminAuth,
  createMaintenanceController
);


export default router;