// central model index and association setup

import Maintenance from "./maintenance.js";
import User from "./user.js";

// define associations after both models are imported
// one tenant (user) can create many maintenance requests
User.hasMany(Maintenance, {
  foreignKey: "userId",
  as: "maintenanceRequests",
});

// each maintenance request belongs to a single user
Maintenance.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export { User, Maintenance };