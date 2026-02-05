import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import { sequelize } from "../config/database.js";

const User = sequelize.define(
    "User",
    {
        ID: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        publicUserID: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        fullName: {
            type: DataTypes.STRING(255), 
            allowNull: false,
        },
        emailAddress: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        contactNumber: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: null,
        },
        unitNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isIn: [[
                    101, 102, 103, 104, 105, 106, 107,
                    201, 202, 203, 204, 205, 206,
                    301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316,
                    401, 402, 403, 404, 405, 406, 407, 408
                ]],
            },
        },
        numberOfTenants: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            validate: {
                min: 1,
                max: 2,
            },
        },
        userName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        passwordHash: { 
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("admin", "caretaker", "user"),
            allowNull: false,
            defaultValue: "user",
        },
        loginToken: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        resetPasswordCode: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        resetPasswordToken: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "users", 
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",

        hooks: {
            beforeCreate: async (user) => {
                if (user.passwordHash) {
                    const salt = await bcrypt.genSalt(10);
                    user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed("passwordHash")) {
                    const salt = await bcrypt.genSalt(10);
                    user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
                }
            },
        },
    }
);

// Updated to use passwordHash
User.prototype.comparePassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.passwordHash);
};

export default User;