import { Navigate, Outlet } from "react-router-dom";
import { getToken, getRole } from "../api/authStorage";

/**
 * ==============================
 * PRIVATE ROUTE (ROLE-BASED)
 * ==============================
 * @param {Array} allowedRoles - roles allowed to access route
*/
const PrivateRoute = ({ allowedRoles }) => {
  const token = getToken();
  const role = getRole();

  // 🔐 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authorized
  return <Outlet />;
};

export default PrivateRoute;
