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
            columnName: 'adminID',
            allowNull: false,
            unique: true,
        },
        userID: {
            type: DataTypes.BIGINT.UNSIGNED,
            columnName: 'userID',
            allowNull: false,
            unique: true,
            references: {
                model: 'users',
                key: 'ID'
            }
        },
        full_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        emailAddress: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            columnName: 'phoneNumber',
            allowNull: true,
        },
        verificationCode: {
            type: DataTypes.STRING(10),
            columnName: 'verificationCode',
            allowNull: true,
        },
        codeExpiresAt: {
            type: DataTypes.DATE,
            columnName: 'codeExpiresAt',
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