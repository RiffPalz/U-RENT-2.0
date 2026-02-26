import { Maintenance, User } from "../../models/index.js";

/**
 * GET ALL MAINTENANCE REQUESTS (ADMIN)
 */
export const getAllMaintenance = async () => {
    const requests = await Maintenance.findAll({
        include: [
            {
                model: User,
                as: "user",
                attributes: ["publicUserID", "fullName", "unitNumber"],
            },
        ],
        order: [["created_at", "DESC"]],
    });

    return requests.map((item) => ({
        id: item.ID,
        title: item.title,
        category: item.category,
        description: item.description,
        status: item.status,
        requestedDate: item.dateRequested,
        startDate: item.startDate,
        endDate: item.endDate,
        tenant: {
            publicUserID: item.user.publicUserID,
            fullName: item.user.fullName,
            unitNumber: item.user.unitNumber,
        },
    }));
};

/**
 * APPROVE MAINTENANCE REQUEST
 */
export const approveMaintenance = async (maintenanceId) => {
    const request = await Maintenance.findByPk(maintenanceId);

    if (!request) {
        throw new Error("Maintenance request not found");
    }

    if (request.status !== "Pending") {
        throw new Error("Only pending requests can be approved");
    }

    request.status = "Approved";
    request.startDate = new Date();

    await request.save();

    return {
        message: "Maintenance request approved",
    };
};

/**
 * UPDATE MAINTENANCE STATUS
 */
export const updateMaintenance = async (maintenanceId, data) => {
  const { status, startDate, endDate } = data;

  const request = await Maintenance.findByPk(maintenanceId);

  if (!request) {
    throw new Error("Maintenance request not found");
  }

  const allowedStatuses = [
    "Pending",
    "Approved",
    "In Progress",
    "Done",
  ];

  if (status && !allowedStatuses.includes(status)) {
    throw new Error("Invalid status value");
  }

  // Update fields only if provided
  if (status) request.status = status;
  if (startDate) request.startDate = startDate;
  if (endDate) request.endDate = endDate;

  // Optional validation
  if (startDate && endDate) {
    if (new Date(endDate) < new Date(startDate)) {
      throw new Error("End date must be later than start date");
    }
  }

  await request.save();

  return {
    message: "Maintenance updated successfully",
  };
};

export const createMaintenance = async (data) => {
  const {
    userId,
    category,
    title,
    description,
    status,
    startDate,
    endDate,
  } = data;

  const user = await User.findByPk(userId);

  if (!user || user.role !== "tenant") {
    throw new Error("Tenant not found");
  }

  const request = await Maintenance.create({
    userId,
    category,
    title,
    description,
    status: status || "Pending",
    startDate: startDate || null,
    endDate: endDate || null,
  });

  return {
    message: "Maintenance request created by admin",
    id: request.ID,
  };
};