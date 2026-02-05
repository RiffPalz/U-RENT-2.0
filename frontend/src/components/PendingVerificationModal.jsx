import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaTimes } from "react-icons/fa";

export default function PendingVerificationModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleBackToLogin = () => {
    if (onClose) onClose(); // Close modal if used as a popup
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className="relative w-full max-w-md bg-[#fffaf5] rounded-none shadow-2xl border-t-[6px] border-[#db6747] overflow-hidden"
        data-aos="zoom-in"
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes size={18} />
        </button>

        <div className="p-8 sm:p-12 text-center">
          {/* Header */}
          <h2 className="text-3xl font-OswaldRegular text-[#1a1a1a] uppercase tracking-wider mb-3">
            Registration Pending
          </h2>

          <p className="text-[11px] text-gray-500 uppercase tracking-[2px] mb-10 leading-relaxed px-4">
            Please allow 2-3 business days for account approval. You will
            receive an email or SMS once verified.
          </p>

          {/* Icon/Visual Area */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-full border-b border-[#db6747] relative flex justify-center">
              <div className="absolute -bottom-3 bg-[#fffaf5] px-4">
                <FaEnvelope className="text-[#db6747] text-xl" />
              </div>
            </div>
          </div>

          {/* Information Detail */}
          <div className="mb-10">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-2">
              Current Status
            </label>
            <div className="text-sm font-bold text-gray-800 uppercase tracking-widest">
              Awaiting Administrative Review
            </div>
          </div>

          {/* The Styled Button */}
          <button
            onClick={handleBackToLogin}
            className="w-full bg-[#db6747] hover:bg-[#3a0f08] text-white py-4 text-xs tracking-[3px] font-bold uppercase transition-all duration-300 shadow-lg active:scale-[0.98]"
          >
            Proceed to Login
          </button>
        </div>
      </div>
    </div>
  );
}
