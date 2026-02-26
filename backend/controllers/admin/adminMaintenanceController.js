import {
  getAllMaintenance,
  approveMaintenance,
  updateMaintenance,
  createMaintenance as createMaintenanceService
} from "../../services/admin/adminMaintenanceService.js";

/**
 * GET ALL MAINTENANCE REQUESTS
 */
export const fetchAllMaintenance = async (req, res) => {
  try {
    const result = await getAllMaintenance();

    return res.status(200).json({
      success: true,
      count: result.length,
      requests: result,
    });
  } catch (error) {
    console.error("Fetch maintenance error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch maintenance requests",
    });
  }
};

/**
 * APPROVE MAINTENANCE REQUEST
 */
export const approveMaintenanceController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await approveMaintenance(id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE MAINTENANCE STATUS
 */
export const updateMaintenanceController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await updateMaintenance(id, req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



// controller for admin to manually create a maintenance request
export const createMaintenanceController = async (req, res) => {
  try {
    const result = await createMaintenanceService(req.body);

    return res.status(201).json({
      success: true,
      message: result.message,
      id: result.id,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};