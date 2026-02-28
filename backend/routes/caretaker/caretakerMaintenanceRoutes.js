import express from 'express';
import caretakerAuth from '../../middleware/caretakerAuth.js';

import {
    createMaintenanceController,
    updateMaintenanceController,
    deleteMaintenanceController,
    fetchAllMaintenanceController,
} from "../../controllers/caretaker/caretakerMaintenanceController.js";

const router = express.Router();

router.post(
    "/",
    caretakerAuth,
    createMaintenanceController
);

router.patch(
    "/:id",
    caretakerAuth,
    updateMaintenanceController
);

router.delete(
    "/:id",
    caretakerAuth,
    deleteMaintenanceController
);

router.get(
    "/",
    caretakerAuth,
    fetchAllMaintenanceController
);

export default router;