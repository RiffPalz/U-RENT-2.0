import React from "react";
import { FaFileDownload, FaEye } from "react-icons/fa";
import contractBgTwo from "../../assets/images/contractbgtwo.png";

export default function ContractCards() {
  return (
    <div
      className=" bg-linear-to-r from-[#f7b094] to-[#dd7255]
    w-full h-full
    overflow-x-hidden overflow-y-hidden
    px-4 sm:px-8 py-7
    flex flex-col gap-5 md:gap-6"
    >
      {/* HEADER */}
      <div
        className="flex flex-col bg-cover bg-center items-center text-center sm:text-start sm:items-start text-white
        px-5 sm:px-10 py-8 sm:py-10 shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101]
        rounded-3xl w-full"
        style={{ backgroundImage: `url(${contractBgTwo})` }}
      >
        <h1 className="font-BoldMilk tracking-[3px] md:tracking-[12px] text-lg sm:text-xl md:text-2xl">
          CONTRACT DETAILS
        </h1>
      </div>

      {/* INFO TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        <InfoTile label="Start Date" value="September 25, 2025" />
        <InfoTile label="End Date" value="September 25, 2026" />

        <div
          className="bg-[#4b150d] p-5 sm:p-6 rounded-2xl shadow-[5px_5px_0px_#faefe8] md:shadow-[10px_8px_0px_#faefe8]
        flex flex-col gap-y-1 sm:col-span-2 lg:col-span-1"
        >
          <p className="text-[10px] font-RegularMilk text-[#ffebdf]/60 uppercase tracking-widest mb-1">
            Status
          </p>
          <p className="font-BoldMilk bg-green-600 px-5 py-1 rounded-xl w-fit text-white text-xs md:text-sm tracking-[2px]">
            ACTIVE
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full">
        <ActionButton
          icon={<FaEye size={18} />}
          text="VIEW FULL CONTRACT"
          onClick={() => alert("Open full contract")}
        />
        <ActionButton
          icon={<FaFileDownload size={18} />}
          text="DOWNLOAD COPY"
          onClick={() => window.print()}
        />
      </div>

      {/* RULES & CONDITIONS */}
      <div
        className="bg-linear-to-r from-[#fefefe] to-[#ffede1] rounded-2xl
      shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101]
      p-5 sm:p-8 md:p-10 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <RulesSection
            title="Tenancy Rules"
            items={[
              "No pets allowed inside the premises.",
              "Quiet hours are enforced from 10PM to 6AM.",
              "Tenants are responsible for maintaining cleanliness.",
            ]}
          />

          <RulesSection
            title="Conditions & Renewal"
            items={[
              "Early termination requires a 30-day notice.",
              "Contract renewals are subject to landlord approval.",
              "Deposit will be refunded within 15 days after move-out.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Small helpers (NO UI CHANGE) ---------- */

function InfoTile({ label, value }) {
  return (
    <div className="bg-[#ffede1] p-5 sm:p-6 rounded-2xl shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] flex flex-col gap-y-1">
      <p className="text-[10px] font-RegularMilk text-[#330101]/60 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="font-BoldMilk text-[#330101] text-sm md:text-base">
        {value}
      </p>
    </div>
  );
}

function ActionButton({ icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 bg-[#4b150d] text-[#ffebdf] text-[11px] md:text-sm rounded-2xl
      shadow-[5px_5px_0px_#faefe8] md:shadow-[8px_8px_0px_#faefe8]
      font-RegularMilk px-4 py-5 tracking-[1px]
      hover:translate-y-0.5 hover:shadow-[4px_4px_0px_#faefe8]
      active:translate-y-1 active:shadow-none transition-all
      flex items-center justify-center gap-3 w-full"
    >
      {icon}
      {text}
    </button>
  );
}

function RulesSection({ title, items }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base md:text-lg font-BoldMilk text-[#330101] border-b-2 border-[#330101]/10 pb-2">
        {title}
      </h3>
      <ul className="list-disc ml-5 space-y-3 text-xs md:text-sm lg:text-base text-black/80">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
