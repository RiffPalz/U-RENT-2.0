import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Tenant = sequelize.define(
  "Tenant",
  {
    tenant_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "ID",
      },
    },
    unit_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: "units",
        key: "unit_id",
      },
    },
    occupancy_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 2, // Matches MGC Building rule for individuals and couples
      },
    },
    move_in_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    lease_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "tenants",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Tenant;