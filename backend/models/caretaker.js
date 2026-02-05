import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Caretaker = sequelize.define(
  "Caretaker",
  {
    ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    caretaker_id: { 
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'ID'
      }
    },
    full_name: { 
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone_number: { 
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "caretaker",
    timestamps: true,
    createdAt: "created_at", // Mapping camelCase JS to snake_case SQL
    updatedAt: "updated_at", // Mapping camelCase JS to snake_case SQL
  }
);

export default Caretaker;