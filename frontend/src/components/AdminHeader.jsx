import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaBars,
  FaRegBell,
  FaSearch,
  FaUserCircle,
  FaChevronDown,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminHeader() {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Convert path to Title (e.g., /admin-tenants -> Admin Tenants)
  const getPageTitle = () => {
    const path =
      location.pathname === "/"
        ? "Dashboard"
        : location.pathname.split("/").pop();
    return path.replace(/-/g, " ").replace("admin", "Admin ");
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* 1. LEFT SIDE: PAGE TITLE */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 capitalize font-OswaldRegular tracking-wide">
          {getPageTitle()}
        </h2>
        <span className="text-xs text-gray-400 font-NunitoSans">
          Welcome back, Administrator
        </span>

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden p-2 mr-3 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* 2. CENTER: SEARCH BAR (Optional) */}
      <div className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-full px-4 py-2 w-96 transition-all focus-within:ring-2 focus-within:ring-[#db6747]/20 focus-within:border-[#db6747]">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search for units, tenants, or payments..."
          className="bg-transparent border-none outline-none text-sm w-full text-gray-600 placeholder:text-gray-400"
        />
      </div>

      {/* 3. RIGHT SIDE: ACTIONS & PROFILE */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-[#db6747] hover:bg-orange-50 rounded-full transition-colors">
          <FaRegBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-700 leading-none">
                Admin User
              </p>
              <p className="text-[10px] text-gray-400 uppercase mt-1">
                Super Admin
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-[#3a0f08] to-[#db6747] flex items-center justify-center text-white shadow-md">
              <FaUserCircle size={24} />
            </div>
            <FaChevronDown
              size={12}
              className={`text-gray-400 transition-transform ${showProfileMenu ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#db6747] transition-colors">
                <FaCog /> Settings
              </button>
              <div className="h-px bg-gray-100 my-1"></div>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                <FaSignOutAlt /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
