import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.jsx";

// Private Route
import PrivateRoute from "../components/PrivateRoute.jsx";
import Unauthorized from "../components/Unauthorized.jsx";

// Landing Pages
import Home from "../pages/LandingPage/Home.jsx";
import Login from "../pages/LandingPage/Login.jsx";
import ApplyNow from "../pages/LandingPage/ApplyNow.jsx";
import CreateAcc from "../pages/LandingPage/CreateAcc.jsx";
import AdminVerification from "../pages/LandingPage/Verification.jsx";

// Tenant Pages
import TenantLayout from "../layout/TenantLayout.jsx";
import TenantDashboard from "../pages/TenantPage/dashboard.jsx";
import TenantMaintenance from "../pages/TenantPage/Maintenance.jsx";
import TenantContract from "../pages/TenantPage/Contract.jsx";
import TenantPaymentHistory from "../pages/TenantPage/PaymentHistory.jsx";
import TenantAccountSettings from "../pages/TenantPage/AccountSetting.jsx";

// Admin Pages
import AdminLayout from "../layout/AdminLayout.jsx";
import AdminDashboard from "../pages/AdminPage/Dashboard.jsx";
import AdminTenants from "../pages/AdminPage/Tenants.jsx";

/* 
   LOGIN REDIRECT LOGIC 
*/
const LoginRedirect = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isAuthenticated = !!token && !!role;

  if (isAuthenticated) {
    switch (role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;

      case "caretaker":
        return <Navigate to="/caretaker/dashboard" replace />;

      case "user": // tenant
        return <Navigate to="/tenant/dashboard" replace />;

      default:
        // corrupted role
        localStorage.clear();
        return <Login />;
    }
  }

  return <Login />;
};

export default function MGCRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/applynow" element={<ApplyNow />} />
          <Route path="/createAccount" element={<CreateAcc />} />
          <Route path="/verification" element={<AdminVerification />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ================= TENANT PROTECTED ================= */}
          <Route element={<PrivateRoute allowedRoles={["tenant","Tenant","user"]} />}>
            <Route path="/tenant" element={<TenantLayout />}>
              <Route path="dashboard" element={<TenantDashboard />} />
              <Route path="maintenance" element={<TenantMaintenance />} />
              <Route path="contract" element={<TenantContract />} />
              <Route path="payment" element={<TenantPaymentHistory />} />
              <Route path="myAccount" element={<TenantAccountSettings />} />
            </Route>
          </Route>

          {/* ================= ADMIN PROTECTED ================= */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="tenants" element={<AdminTenants />} />
            </Route>
          </Route>

          {/* ================= CARETAKER (READY FOR LATER) ================= */}
          {/*
        <Route element={<PrivateRoute allowedRoles={["caretaker"]} />}>
          <Route path="/caretaker" element={<CaretakerLayout />}>
            <Route path="dashboard" element={<CaretakerDashboard />} />
          </Route>
        </Route>
        */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
