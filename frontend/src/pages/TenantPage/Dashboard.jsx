import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import unitBg from "../../assets/images/unitbg.png";
import tenantdbbg from "../../assets/images/tenantsdbbg.png";
import dashboardBg from "../../assets/images/dashboardbackground.png";

export default function DashboardCards() {
  const announcementData = {
    electrical: [
      {
        id: 1,
        message: "Power will be off from 2PM to 5PM ",
        date: "11/20/25",
      },
      {
        id: 2,
        message: "Generator testing scheduled at 8AM.",
        date: "11/22/25",
      },
    ],
    water: [
      {
        id: 1,
        message: "Low water pressure expected tomorrow morning. ",
        date: "11/21/25",
      },
      { id: 2, message: "Maintenance flushing scheduled.", date: "11/25/25" },
    ],
    renovation: [
      {
        id: 1,
        message: "Floor renovation on Level 3 from Nov 26–30.",
        date: "11/23/25",
      },
      {
        id: 2,
        message: "Lobby repainting will begin next week.",
        date: "11/24/25",
      },
    ],
  };

  const categories = Object.keys(announcementData);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const currentCategory = categories[categoryIndex];
  const currentMessages = announcementData[currentCategory];

  const handleCategorySwitch = (direction) => {
    setCategoryIndex((prev) =>
      direction === "next"
        ? (prev + 1) % categories.length
        : (prev - 1 + categories.length) % categories.length,
    );
  };

  return (
    <div className="bg-linear-to-r from-[#f7b094] to-[#dd7255] w-full min-h-screen overflow-x-hidden px-4 sm:px-6 md:px-9 lg:px-13 py-6 sm:py-8 lg:py-13">
      <div className="flex flex-col gap-4 md:gap-6 w-full">
        {/* HEADER */}
        <div
          className="flex flex-col bg-cover bg-center items-center sm:items-start text-white px-5 sm:px-9 md:px-15 py-5 sm:py-8 shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-2xl w-full"
          style={{ backgroundImage: `url(${dashboardBg})` }}
        >
          <h2 className="font-LightMilk text-sm sm:text-base md:text-xl">
            WELCOME TENANT 101!
          </h2>
          <h1 className="font-BoldMilk text-xl sm:text-2xl md:text-3xl tracking-[6px] md:tracking-[10px]">
            DASHBOARD
          </h1>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 w-full">
          {/* LEFT SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 w-full lg:w-[66%]">
            {/* UNIT CARD */}
            <div
              className="bg-cover bg-center shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-2xl p-6 lg:p-9
              min-h-[180px] sm:min-h-60 lg:min-h-[300px] flex flex-col"
              style={{ backgroundImage: `url(${unitBg})` }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-MDMilk">
                101
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-LightMilk md:mt-2">
                Unit Number
              </p>
            </div>

            {/* TENANTS CARD */}
            <div
              className="bg-cover bg-center shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-2xl p-6 lg:p-9
              min-h-[180px] sm:min-h-60 lg:min-h-[300px] flex flex-col"
              style={{ backgroundImage: `url(${tenantdbbg})` }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-MDMilk">
                2
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-LightMilk md:mt-2">
                Tenants
              </p>
            </div>

            {/* RENT BILL */}
            <div
              className="bg-[#ffede1] shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-2xl
            p-6 sm:p-7 flex flex-col justify-between gap-y-4 min-h-[220px] sm:min-h-60 lg:min-h-[300px]"
            >
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-MDMilk mt-2">
                  ₱500.00
                </h2>
                <p className="text-xs sm:text-sm md:text-base font-LightMilk text-[#330101]/70">
                  RENT BILL
                </p>
                <span className="bg-[#c20b0a] text-white mt-2 inline-block px-3 py-1 rounded-full text-[10px] font-RegularMilk">
                  UNPAID
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <label className="font-RegularMilk bg-[#330101] text-[#ffede1] px-4 py-2 rounded-2xl cursor-pointer text-xs text-center w-full">
                  View Billing
                  <input type="file" className="hidden" />
                </label>
                <label className="font-RegularMilk bg-[#330101] text-[#ffede1] px-4 py-2 rounded-2xl cursor-pointer text-xs text-center w-full">
                  Upload Receipt
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            {/* ELECTRIC + WATER BILL */}
            <div
              className="bg-[#ffede1] shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-2xl
            p-6 sm:p-7 flex flex-col justify-between gap-y-4 min-h-[220px] sm:min-h-60 lg:min-h-[300px]"
            >
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-MDMilk mt-2">
                  ₱400.00
                </h2>
                <p className="text-xs sm:text-sm md:text-base font-LightMilk text-[#330101]/70">
                  ELECTRICITY AND WATER BILL
                </p>
                <span className="bg-green-600 text-white mt-2 inline-block px-3 py-1 rounded-full text-[10px] font-RegularMilk">
                  PAID
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <label className="font-RegularMilk bg-[#330101] text-[#ffede1] px-4 py-2 rounded-2xl cursor-pointer text-xs text-center w-full">
                  View Billing
                  <input type="file" className="hidden" />
                </label>
                <label className="font-RegularMilk bg-[#330101] text-[#ffede1] px-4 py-2 rounded-2xl cursor-pointer text-xs text-center w-full">
                  Upload Receipt
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div
            className="w-full lg:w-[37%] flex flex-col bg-linear-to-r from-[#4d0707] to-[#160000]
          shadow-[5px_5px_0px_#ffede1] md:shadow-[10px_8px_0px_#ffede1] rounded-2xl p-5 sm:p-8"
          >
            <h2 className="text-center font-MDMilk text-[#ffede1] text-base sm:text-lg mb-4 uppercase border-b border-white/20 pb-2">
              ANNOUNCEMENTS
            </h2>

            <div className="flex-1 overflow-y-auto space-y-3 max-h-[280px] sm:max-h-[350px] lg:max-h-none">
              {currentMessages.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#ffede1] text-[#330101] text-sm rounded-lg py-3 px-4 shadow relative"
                >
                  <p className="pr-6">{item.message}</p>
                  <span className="absolute bottom-1 right-2 text-[10px] text-gray-500">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 bg-black/30 p-2 rounded-2xl">
              <button
                onClick={() => handleCategorySwitch("prev")}
                className="p-2 text-white"
              >
                <FaChevronLeft />
              </button>
              <span className="text-xs sm:text-sm uppercase text-white">
                {currentCategory} maintenance
              </span>
              <button
                onClick={() => handleCategorySwitch("next")}
                className="p-2 text-white"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
