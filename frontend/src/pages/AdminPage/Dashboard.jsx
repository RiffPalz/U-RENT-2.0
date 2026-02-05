import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

// Placeholder images - replace with your actual imports
import dashboardBg from "../../assets/images/dashboardbackground.png";
import totaltenantbg from "../../assets/images/totaltenantsbg.png";
import totalunits from "../../assets/images/totalunitsbg.png";
import maintreq from "../../assets/images/maintreqbg.png";
import appointreq from "../../assets/images/appointreqbg.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function AdminDashboardCards() {
  const navigate = useNavigate();

  // --- CHART CONFIGURATION ---
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyEarnings = [
    4000, 2000, 3000, 4500, 7000, 10000, 9500, 6000, 7500, 8500, 9000, 8200,
  ];

  const earningsData = {
    labels: monthNames,
    datasets: [
      {
        label: "Earnings",
        data: monthlyEarnings,
        borderColor: "#ffffff", // White line
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#ffffff",
        pointRadius: 4,
        borderWidth: 2,
      },
    ],
  };

  const earningsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: "rgba(255,255,255,0.7)", font: { size: 10 } },
        grid: { display: false },
      },
      y: {
        ticks: { color: "rgba(255,255,255,0.7)", font: { size: 10 } },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        beginAtZero: true,
      },
    },
  };

  return (
    // MAIN WRAPPER: 'min-h-screen' ensures full height background
    <div className="bg-[#FFF4EC] w-full min-h-screen px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* 1. HEADER */}
      <div
        className="flex flex-col bg-cover bg-center items-center sm:items-start text-white px-8 py-8 shadow-[6px_6px_0px_#330101] rounded-3xl w-full"
        style={{
          backgroundImage: `url(${dashboardBg})`,
          backgroundColor: "#DD7255",
        }}
      >
        <h2 className="font-LightMilk text-sm tracking-wider mb-1">
          WELCOME ADMIN!
        </h2>
        <h1 className="font-BoldMilk text-4xl tracking-[6px] uppercase">
          DASHBOARD
        </h1>
      </div>

      {/* 2. MAIN GRID */}
      <div className="flex flex-col lg:flex-row gap-6 w-full flex-1">
        {/* === LEFT COLUMN (Light Cards) === */}
        <div className="flex flex-col gap-6 w-full lg:w-[65%]">
          {/* Row A: Total Tenants */}
          <div
            className="bg-linear-to-r from-[#FFF4EC] to-[#FDE8D7] shadow-[6px_6px_0px_#330101] rounded-3xl p-6 md:p-8 flex flex-col justify-center min-h-40"
            style={{
              backgroundImage: `url(${totaltenantbg})`,
              backgroundSize: "cover",
            }}
          >
            <h3 className="text-[#330101] font-RegularMilk text-xs uppercase tracking-widest mb-2">
              Total Tenants
            </h3>
            <p className="text-[#330101] font-BoldMilk text-6xl">20</p>
          </div>

          {/* Row B: Total Units */}
          <div
            className="bg-linear-to-r from-[#FFF4EC] to-[#FDE8D7] shadow-[6px_6px_0px_#330101] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 min-h-40"
            style={{
              backgroundImage: `url(${totalunits})`,
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col w-full md:w-auto">
              <h3 className="text-[#330101] font-RegularMilk text-xs uppercase tracking-widest mb-2">
                Total Units
              </h3>
              <p className="text-[#330101] font-BoldMilk text-6xl">35</p>
            </div>

            {/* Pills */}
            <div className="flex gap-4 w-full md:w-auto justify-end">
              <div className="text-center">
                <p className="text-[10px] font-BoldMilk text-[#330101] mb-1">
                  OCCUPIED
                </p>
                <div className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-[#330101]/10">
                  <p className="text-xl font-BoldMilk text-[#330101]">15</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-BoldMilk text-[#330101] mb-1">
                  VACANT
                </p>
                <div className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-[#330101]/10">
                  <p className="text-xl font-BoldMilk text-[#330101]">20</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row C: Requests (Split) */}
          <div className="flex flex-col sm:flex-row gap-6 w-full">
            {/* Maintenance */}
            <div
              className="bg-[#FFF4EC] shadow-[6px_6px_0px_#330101] rounded-3xl p-6 w-full flex flex-col justify-between min-h-40"
              style={{
                backgroundImage: `url(${maintreq})`,
                backgroundSize: "cover",
              }}
            >
              <h3 className="text-[#330101] font-RegularMilk text-xs uppercase tracking-widest">
                Maintenance Requests
              </h3>
              <div className="flex justify-between items-end mt-4">
                <p className="text-[#330101] font-BoldMilk text-5xl">5</p>
                <button
                  onClick={() => navigate("/adminmaintenance")}
                  className="bg-[#330101] text-[#ffede1] text-[10px] font-BoldMilk px-6 py-2 rounded-full hover:bg-white hover:text-[#330101] transition-all"
                >
                  VIEW
                </button>
              </div>
            </div>

            {/* Appointment */}
            <div
              className="bg-[#FFF4EC] shadow-[6px_6px_0px_#330101] rounded-3xl p-6 w-full flex flex-col justify-between min-h-40"
              style={{
                backgroundImage: `url(${appointreq})`,
                backgroundSize: "cover",
              }}
            >
              <h3 className="text-[#330101] font-RegularMilk text-xs uppercase tracking-widest">
                Appointment Requests
              </h3>
              <div className="flex justify-between items-end mt-4">
                <p className="text-[#330101] font-BoldMilk text-5xl">2</p>
                <button
                  onClick={() => navigate("/adminapplicationrequest")}
                  className="bg-[#330101] text-[#ffede1] text-[10px] font-BoldMilk px-6 py-2 rounded-full hover:bg-white hover:text-[#330101] transition-all"
                >
                  VIEW
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* === RIGHT COLUMN (Dark Cards) === */}
        <div className="flex flex-col gap-6 w-full lg:w-[35%]">
          {/* Chart Card */}
          <div className="bg-[#330101] shadow-[6px_6px_0px_#bc7d6f] rounded-3xl p-6 flex flex-col flex-1 min-h-[350px]">
            <div className="flex-1 w-full relative">
              <Line data={earningsData} options={earningsOptions} />
            </div>
            <div className="mt-4 border-t border-white/20 pt-4 text-center">
              <h3 className="text-[#ffede1] text-[10px] font-RegularMilk uppercase tracking-widest">
                Rent Collected This Month (Jan)
              </h3>
              <p className="text-[#ffede1] font-BoldMilk text-2xl mt-1">
                ₱4,000{" "}
                <span className="text-[#ffede1]/50 text-lg">/ ₱10,000</span>
              </p>
            </div>
          </div>

          {/* Due Rent Card */}
          <div className="bg-[#330101] shadow-[6px_6px_0px_#bc7d6f] rounded-3xl p-6 flex flex-col justify-between min-h-[140px]">
            <h3 className="text-[#ffede1] font-RegularMilk text-xs uppercase tracking-widest">
              Due Rent Today
            </h3>
            <div className="flex justify-between items-end mt-2">
              <p className="text-[#ffede1] font-BoldMilk text-5xl">4</p>
              <button
                onClick={() => navigate("/adminpayments")}
                className="bg-[#ffede1] text-[#330101] text-[10px] font-BoldMilk px-6 py-2 rounded-full hover:bg-[#bc7d6f] hover:text-white transition-all"
              >
                VIEW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
