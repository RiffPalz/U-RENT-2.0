import api from "../config";

/**
 * ==============================
 * TENANT AUTH API
 * ==============================
 */

/**
 * Register Tenant
 * POST /api/users/register
 */
export const registerTenant = async (payload) => {
  const response = await api.post("/users/register", payload);
  return response.data;
};

/**
 * Login Tenant (USERNAME + PASSWORD)
 * POST /api/users/login
 */
export const loginTenant = async ({ userName, password }) => {
  const response = await api.post("/users/login", {
    userName,
    password,
  });

  // Save token locally
  if (response.data?.accessToken) {
    localStorage.setItem("tenantToken", response.data.accessToken);
  }

  return response.data;
};

/**
 * Logout Tenant
 * Clears local token (backend logout optional)
 */
export const logoutTenant = () => {
  localStorage.removeItem("tenantToken");
};

/**
 * Get Tenant Profile (Protected)
 * GET /api/users/profile
 */
export const fetchTenantProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};
