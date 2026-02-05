import React from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function TenantNavbar({ toggleSidebar, isOpen }) {
  const location = useLocation();

  // Helper to get a nice title based on current path
  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    if (!path) return "Dashboard";
    // Handles cases like "payment-history" -> "Payment History"
    return path
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 md:h-20 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm transition-all duration-300">
      {/* LEFT: Toggle & Page Title */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
          className="text-[#3a0f08] hover:text-[#db6747] active:scale-95 transition-all p-2 rounded-md lg:hidden"
        >
          {/* Icon size adjusts slightly for mobile */}
          <FaBars className="text-lg md:text-xl" />
        </button>

        <div>
          <h2 className="font-OswaldRegular text-lg md:text-2xl text-gray-800 uppercase tracking-wide truncate max-w-[150px] sm:max-w-none">
            {getPageTitle()}
          </h2>
          {/* Subtitle hidden on mobile to save vertical space */}
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[2px] hidden sm:block">
            MGC Building Portal
          </p>
        </div>
      </div>

      {/* RIGHT: Actions & Profile */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* User Profile Summary */}
        <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-gray-100 h-8 md:h-10">
          {/* Name & Unit - Hidden on Mobile */}
          <div className="text-right hidden md:block">
            <p className="font-OswaldRegular text-sm text-gray-800 uppercase leading-none mb-1">
              Juan Dela Cruz
            </p>
            <p className="text-[10px] font-bold text-[#db6747] uppercase tracking-wider leading-none">
              Unit 305
            </p>
          </div>

          {/* Avatar - Always Visible */}
          <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#fdfaf8] border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#db6747] hover:border-[#db6747] transition-all">
            <FaUserCircle className="text-xl md:text-2xl" />
          </button>
        </div>
      </div>
    </header>
  );
}
