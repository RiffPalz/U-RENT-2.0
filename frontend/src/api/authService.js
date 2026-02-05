import api from "./config.js";
import { setAuth, clearAuth } from "./authStorage.js";

/**
 * ==============================
 * GENERAL LOGIN
 * ==============================
 */
export const login = async ({ role, credentials }) => {
    let endpoint = "";

    switch (role) {
        case "user":
            endpoint = "/users/login";
            break;

        case "admin":
            endpoint = "/admin/login";
            break;

        case "caretaker":
            endpoint = "/caretaker/login";
            break;

        default:
            throw new Error("Invalid role");
    }

    const response = await api.post(endpoint, credentials);

    // Admin login uses OTP → no token yet
    if (role === "admin") {
        return response.data; // { adminId, message, role }
    }

    // User / caretaker login
    const { accessToken } = response.data;

    setAuth({
        token: accessToken,
        role,
    });

    return response.data;
};

/**
 * ==============================
 * ADMIN OTP VERIFY
 * ==============================
 */
export const verifyAdminOtp = async ({ adminId, verificationCode }) => {
    const response = await api.post("/admin/login/verify", {
        adminId,
        verificationCode,
    });

    setAuth({
        token: response.data.accessToken,
        role: "admin",
    });

    return response.data;
};


/**
 * ==============================
 * ADMIN RESEND OTP
 * ==============================
 */
export const resendAdminOtp = async (adminId) => {
  const response = await api.post("/admin/login/resend", { adminId });
  return response.data;
};

/**
 * ==============================
 * LOGOUT (ALL ROLES)
 * ==============================
 */
export const logout = () => {
    clearAuth();
};
