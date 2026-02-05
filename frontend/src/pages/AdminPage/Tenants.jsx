import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrashAlt, FaPrint } from "react-icons/fa";
import TenantsBg from "../../assets/images/tenantsoverviewbg.png";
import logo from "../../assets/images/logo.png"; // Integrated logo for official header

export default function AdminTenantsCard() {
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);
  const navigate = useNavigate();
  const printRef = useRef();

  const [tenants, setTenants] = useState([
    {
      unit: "101",
      name: "Lance Atendidas",
      phone: "09123456789",
      due: "September 15, 2025",
      totalBill: "₱10,000",
    },
    {
      unit: "102",
      name: "Matthew Karl Batista",
      phone: "09198765432",
      due: "September 1, 2025",
      totalBill: "₱12,500",
    },
    {
      unit: "103",
      name: "Aldjon Dela Cruz",
      phone: "09111222333",
      due: "September 20, 2025",
      totalBill: "₱9,800",
    },
  ]);

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(search.toLowerCase()) ||
      tenant.unit.includes(search),
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-linear-to-r from-[#f7b094] to-[#dd7255] rounded-2xl w-full h-full px-4 sm:px-8 py-7 flex flex-col gap-3 md:gap-4 printable-area">
      {/* Integrated Caretaker Print Styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .printable-content, .printable-content * { visibility: visible; }
          .printable-content { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            background: white !important;
            padding: 20px;
          }
          .no-print { display: none !important; }
          table { 
            color: black !important; 
            border-collapse: collapse !important; 
            width: 100% !important; 
            margin-top: 10px;
          }
          th, td { 
            border: 1px solid #000 !important; 
            padding: 8px !important; 
            color: black !important; 
          }
          thead tr { background-color: #f2f2f2 !important; -webkit-print-color-adjust: exact; }
          .print-header-visible { display: flex !important; visibility: visible !important; }
        }
      `}</style>

      {/* Header (Hidden during print) */}
      <div
        className="flex flex-col bg-cover bg-center items-center text-center sm:text-start sm:items-start text-white px-8 py-8 shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-3xl w-full no-print"
        style={{ backgroundImage: `url(${TenantsBg})` }}
      >
        <h1 className="font-BoldMilk tracking-[3px] md:tracking-[12px] text-xl md:text-2xl uppercase">
          Tenants Overview
        </h1>
      </div>

      {/* Search & Table Container */}
      <div className="h-full bg-linear-to-r from-[#ffebdf] to-[#f2c9b1] shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] flex flex-col gap-2 rounded-2xl px-4 md:px-8 py-5">
        <div className="flex items-center gap-3 no-print">
          <div className="relative grow">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-black opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by name or unit number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2 border text-sm border-[#330101] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4b150d]"
            />
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center p-3 bg-[#4b150d] text-[#efd4c4] rounded-xl shadow-md hover:bg-[#5c1a12] transition-all active:scale-95"
            title="Print Table"
          >
            <FaPrint size={20} />
          </button>
        </div>

        {/* Printable Content Section */}
        <div className="overflow-x-auto printable-content">
          {/* MGC BUILDING PRINT HEADER (Visible only on print) */}
          <div className="hidden print-header-visible items-center justify-between border-b-2 border-black pb-4 mb-6 text-black">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
              <div className="text-left">
                <h1 className="text-2xl font-bold tracking-tight">
                  MGC BUILDING
                </h1>
                <p className="text-xs uppercase tracking-widest text-gray-600">
                  Tenant Summary Report
                </p>
              </div>
            </div>
            <div className="text-right text-xs">
              <p>Date Generated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <table className="w-full border-separate border-spacing-y-1">
            <thead>
              <tr className="bg-[#4b150d] text-[#efd4c4] uppercase tracking-[2px] text-[10px] font-RegularMilk">
                <th className="py-3 px-4 text-left">Unit No.</th>
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Phone No.</th>
                <th className="py-3 px-4 text-left">Bills Due Date</th>
                <th className="py-3 px-4 text-center">Total Bill</th>
                <th className="py-3 px-4 text-center no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant, index) => (
                <tr key={index} className="bg-white text-black text-sm">
                  <td className="py-3 px-4 text-left border-b border-gray-100 font-bold">
                    {tenant.unit}
                  </td>
                  <td className="py-3 px-4 text-left font-semibold border-b border-gray-100">
                    {tenant.name}
                  </td>
                  <td className="py-3 px-4 text-left border-b border-gray-100">
                    {tenant.phone}
                  </td>
                  <td className="py-3 px-4 text-left border-b border-gray-100">
                    {tenant.due}
                  </td>
                  <td className="py-3 px-4 text-center border-b border-gray-100">
                    {tenant.totalBill}
                  </td>
                  <td className="py-3 px-4 text-center no-print border-b border-gray-100">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => navigate("/admintenantprof")}
                        className="p-2 bg-[#d45f41] text-white rounded-lg active:scale-90"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setTenantToDelete(tenant);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 bg-[#4b150d] text-[#efd4c4] rounded-lg active:scale-90"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DELETE MODAL (no-print not strictly needed but good practice) */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 no-print">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4 text-[#4b150d]">
              Are you sure you want to delete this tenant?
            </h2>
            <p className="text-[#4b150d] mb-6">
              It will clear the tenant's details in their profile and remove
              them from their unit.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md cursor-pointer text-black"
              >
                No
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-[#4b150d] text-[#efd4c4] px-4 py-2 rounded-md cursor-pointer"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
