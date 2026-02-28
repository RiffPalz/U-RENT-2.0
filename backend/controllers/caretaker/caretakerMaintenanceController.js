import {
  createMaintenance,
  updateMaintenance,
  getAllMaintenance,
  deleteMaintenance,
} from "../../services/caretaker/caretakerMaintenanceService.js";

/**
 * CREATE MAINTENANCE 
 */
export const createMaintenanceController = async (req, res) => {
  try {
    const result = await createMaintenance(req.body);

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


/**
 * UPDATE MAINTENANCE
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

export const deleteMaintenanceController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteMaintenance(id);

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
 * GET ALL MAINTENANCE
 */
export const fetchAllMaintenanceController = async (req, res) => {
  try {
    const data = await getAllMaintenance();

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Fetch maintenance error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch maintenance requests",
    });
  }
};