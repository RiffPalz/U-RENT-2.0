import bcrypt from "bcryptjs";
import { User, Admin } from "../../models/index.js";
import { sendMail } from "../../utils/mailer.js";
import { generateVerificationCode } from "../../utils/codeGenerator.js";
import { loginEmailTemplate } from "../../utils/emailTemplate.js";

export const adminLogin = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    // 1️⃣ Find user by email
    const user = await User.findOne({ where: { emailAddress: email } });

    if (!user || user.role !== "admin") {
        throw new Error("Invalid email or password");
    }

    // 2️⃣ Compare password using model method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    // 3️⃣ Find admin profile
    const admin = await Admin.findOne({ where: { userID: user.ID } });
    if (!admin) {
        throw new Error("Admin profile not found");
    }

    // 4️⃣ Generate OTP (5 minutes expiry)
    const verificationCode = generateVerificationCode();
    admin.verificationCode = verificationCode;
    admin.codeExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await admin.save();

    // 5️⃣ Send OTP via email
    await sendMail({
        to: user.emailAddress,
        subject: "Admin Login Verification Code",
        html: loginEmailTemplate(user.userName, verificationCode),
    });

    return {
        message: "Verification code sent to admin email",
        adminId: admin.ID, // use primary key for OTP verification
    };
};

export const verifyAdminOtp = async ({ adminId, verificationCode }) => {
    // 1️⃣ Fetch admin with associated user
    const admin = await Admin.findByPk(adminId, { include: [{ model: User }] });
    if (!admin || !admin.User) throw new Error("Admin account not found");

    // 2️⃣ Verify code
    if (!admin.verificationCode || admin.verificationCode !== verificationCode) {
        throw new Error("Invalid verification code");
    }

    if (!admin.codeExpiresAt || admin.codeExpiresAt < new Date()) {
        throw new Error("Verification code has expired");
    }

    // 3️⃣ Clear OTP
    admin.verificationCode = null;
    admin.codeExpiresAt = null;
    await admin.save();

    // 4️⃣ Generate JWT
    const { generateAccessToken } = await import("../../utils/token.js");
    const accessToken = generateAccessToken({
        id: admin.User.ID,
        role: "admin",
    });

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
    const admin = await Admin.findByPk(adminId, { include: [{ model: User }] });
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
