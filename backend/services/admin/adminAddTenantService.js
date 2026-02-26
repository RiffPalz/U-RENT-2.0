import { User } from "../../models/index.js";
import bcrypt from "bcryptjs";

export const createTenant = async (data) => {
  const {
    fullName,
    emailAddress,
    contactNumber,
    unitNumber,
    numberOfTenants,
    password,
    moveInDate,
    leaseEndDate,
  } = data;

  // Check email uniqueness
  const existingEmail = await User.findOne({ where: { emailAddress } });
  if (existingEmail) throw new Error("Email already in use");

  // Check unit capacity (max 2 approved tenants)
  const existingCount = await User.count({
    where: {
      unitNumber,
      status: "Approved",
      role: "tenant",
    },
  });

  if (existingCount >= 2) {
    throw new Error("Unit already at maximum capacity");
  }

  // Validate lease dates
  if (new Date(leaseEndDate) <= new Date(moveInDate)) {
    throw new Error("Lease end date must be later than move-in date");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Step 1: Create tenant WITHOUT publicUserID first
  const tenant = await User.create({
    publicUserID: "TEMP", // temporary value (required because allowNull is false)
    fullName,
    emailAddress,
    contactNumber,
    unitNumber,
    numberOfTenants,
    userName: `unit${unitNumber}_${Date.now()}`,
    password_hash: hashedPassword,
    role: "tenant",
    status: "Approved",
    moveInDate,
    leaseEndDate,
    leaseStatus: "Active",
  });

  // Step 2: Generate publicUserID using auto-increment ID
  tenant.publicUserID = `TENANT-${String(tenant.ID).padStart(3, "0")}`;
  await tenant.save();

  return {
    message: "Tenant created successfully",
    tenantId: tenant.ID,
    publicUserID: tenant.publicUserID,
  };
};