import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

export default function ForgotPassword({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10001 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-[#fff7f1] w-full max-w-md shadow-2xl overflow-hidden border-t-4 border-[#db6747]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#db6747] transition-colors z-10"
        >
          <IoMdClose size={24} />
        </button>

        <div className="p-8 sm:p-10 text-center">
          {!submitted ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="font-OswaldRegular text-3xl text-gray-900 uppercase">
                  Reset Password
                </h2>
                <p className="font-NunitoSans text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
                  Enter your registered email below to receive instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="font-LemonMilkRegular text-[10px] font-bold text-gray-400 tracking-[2px] uppercase">
                    Email Address
                  </label>
                  <div className="flex items-center border-b border-gray-200 focus-within:border-[#db6747] transition-all py-2 group">
                    <MdEmail className="text-gray-300 group-focus-within:text-[#db6747] mr-3 transition-colors" />
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      className="w-full bg-transparent outline-none text-sm text-gray-700 font-NunitoSans"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#db6747] hover:bg-[#3a0f08] text-white py-4 font-OswaldRegular text-sm tracking-[3px] uppercase transition-all duration-500 shadow-lg disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </div>
          ) : (
            /* Success State */
            <div className="py-6 space-y-6 animate-fade-in">
              <div className="flex justify-center text-[#db6747]">
                <FaCheckCircle size={60} />
              </div>
              <div className="space-y-2">
                <h2 className="font-OswaldRegular text-2xl text-gray-900 uppercase">
                  Check Your Inbox
                </h2>
                <p className="font-NunitoSans text-sm text-gray-600 leading-relaxed">
                  Instructions to reset your password have been sent to <br />
                  <strong className="text-gray-900">{email}</strong>
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full border-2 border-gray-900 py-3 font-OswaldRegular text-xs tracking-[2px] uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>

        {/* Decorative architectural line */}
        <div className="h-1 bg-gray-100 w-full opacity-30"></div>
      </div>
    </div>
  );
}
