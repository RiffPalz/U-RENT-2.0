import React from "react";
import { useAuth } from "../context/AuthContext";

const UserHeader = () => {
  const { user, loading } = useAuth();

  // If loading, show a placeholder or nothing (prevents flicker)
  if (loading) return <div className="p-4">Loading header...</div>;

  // If no user, log it to console for debugging
  if (!user) {
    console.warn("UserHeader: No user found in context.");
    return null;
  }

  const getHeaderContent = () => {
    switch (user.role) {
      /* =======================
         TENANT
      ======================= */
      case "user":
        return {
          title: `Welcome, Tenant ${user.userID || ""}`,
          subtitle: user.fullName,
          roleDisplay: "Tenant",
          badgeColor: "bg-blue-100 text-blue-800",
        };

      /* =======================
         ADMIN
      ======================= */
      case "admin":
        return {
          title: "System Administrator",
          subtitle: user.email || user.emailAddress,
          roleDisplay: "Admin",
          badgeColor: "bg-red-100 text-red-800",
        };

      /* =======================
         CARETAKER
      ======================= */
      case "caretaker":
        return {
          title: "MGC Building Caretaker",
          subtitle: user.userName,
          roleDisplay: "Caretaker",
          badgeColor: "bg-green-100 text-green-800",
        };

      /* =======================
         FALLBACK
      ======================= */
      default:
        return {
          title: "Welcome",
          subtitle: user.fullName || user.userName,
          roleDisplay: "User",
          badgeColor: "bg-gray-100 text-gray-800",
        };
    }
  };

  const content = getHeaderContent();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* LEFT: TITLE + SUBTITLE */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            {content.title}
          </h2>
          <p className="text-sm font-medium text-gray-500">
            {content.subtitle}
          </p>
        </div>

        {/* RIGHT: ROLE */}
        <div className="text-right">
          <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
            Logged in as: {content.roleDisplay}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
