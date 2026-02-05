import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Admin = sequelize.define(
    "Admin",
    {
        ID: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        adminID: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        userID: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: true,
            references: {
                model: 'users', // Matches the table name in query
                key: 'ID'
            }
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        verificationCode: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        codeExpiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "admin",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
);

export default Admin;