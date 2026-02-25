import Maintenance from "../models/maintenance.js";
import User from "../models/user.js";

/**
 * CREATE MAINTENANCE REQUEST (Tenant)
 */
export const createMaintenance = async (userId, data) => {
  const { category, title, description } = data;

  if (!category || !title || !description) {
    throw new Error("Category, title, and description are required");
  }

  const user = await User.findByPk(userId);

  if (!user || user.role !== "tenant") {
    throw new Error("Only tenants can create maintenance requests");
  }

  const request = await Maintenance.create({
    userId,
    category,
    title,
    description,
  });

  return {
    id: request.ID,
    title: request.title,
    category: request.category,
    status: request.status,
    requestedDate: request.dateRequested,
  };
};

/**
 * GET TENANT MAINTENANCE REQUESTS
 */
export const getTenantMaintenance = async (userId) => {
  const requests = await Maintenance.findAll({
    where: { userId },
    order: [["created_at", "DESC"]],
  });

  return requests.map((item) => ({
    id: item.ID,
    title: item.title,
    category: item.category,
    requestedDate: item.dateRequested,
    startDate: item.startDate,
    endDate: item.endDate,
    status: item.status,
  }));
};