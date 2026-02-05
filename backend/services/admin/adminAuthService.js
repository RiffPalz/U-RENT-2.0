import { User, Admin } from "../../models/index.js";
import { sendMail } from "../../utils/mailer.js";
import { generateVerificationCode } from "../../utils/codeGenerator.js";
import { loginEmailTemplate } from "../../utils/emailTemplate.js";
import { generateAccessToken } from "../../utils/token.js";

export const adminLogin = async ({ email, password }) => {
    const user = await User.findOne({
        where: { emailAddress: email }, 
        include: [{ model: Admin }]
    });

    if (!user || user.role !== 'admin' || !user.Admin) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const admin = user.Admin;
    admin.verificationCode = verificationCode;
    admin.codeExpiresAt = expiresAt;
    await admin.save();

    await sendMail({
        to: user.emailAddress,
        subject: "Admin Login Verification Code",
        html: loginEmailTemplate(user.userName, verificationCode),
    });

    return {
        message: "Verification code sent to admin email",
        adminId: admin.ID,
    };
};

export const verifyAdminOtp = async ({ adminId, verificationCode }) => {
    const admin = await Admin.findByPk(adminId, {
        include: [{ model: User }]
    });

    if (!admin || !admin.User) {
        throw new Error("Admin account not found");
    }

    if (!admin.verificationCode || admin.verificationCode !== verificationCode) {
        throw new Error("Invalid verification code");
    }

    if (!admin.codeExpiresAt || admin.codeExpiresAt < new Date()) {
        throw new Error("Verification code has expired");
    }

    admin.verificationCode = null;
    admin.codeExpiresAt = null;

    const accessToken = generateAccessToken({
        id: admin.User.ID,
        role: "admin",
    });

    admin.User.loginToken = accessToken;
    await admin.User.save();
    await admin.save();

    return {
        message: "Admin login successful",
        accessToken,
        admin: {
            id: admin.User.ID,
            adminID: admin.adminID,
            userName: admin.User.userName,
            emailAddress: admin.User.emailAddress,
            role: "admin",
        },
    };
};

export const resendAdminCode = async (adminId) => {
    const admin = await Admin.findByPk(adminId, {
        include: [{ model: User }]
    });
    if (!admin || !admin.User) throw new Error("Admin not found");

    const code = generateVerificationCode();
    admin.verificationCode = code;
    admin.codeExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await admin.save();

    await sendMail({
        to: admin.User.emailAddress,
        subject: "Your New Login Verification Code",
        html: loginEmailTemplate(admin.User.userName, code),
    });
};