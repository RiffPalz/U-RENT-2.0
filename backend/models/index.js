import User from "./user.js";
import Maintenance from "./maintenance.js";

// One user can have many maintenance requests
User.hasMany(Maintenance, {
  foreignKey: "userId",
  as: "maintenanceRequests",
});

Maintenance.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});