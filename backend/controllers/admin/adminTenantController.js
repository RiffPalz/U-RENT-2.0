import { createTenant } from "../../services/admin/adminAddTenantService.js";

export const createTenantController = async (req, res) => {
  try {
    const result = await createTenant(req.body);

    return res.status(201).json({
      success: true,
      message: result.message,
      tenantId: result.tenantId,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};