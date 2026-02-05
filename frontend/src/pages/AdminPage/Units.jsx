import { useState } from "react";
import { Link } from "react-router-dom";
import UnitsOverviewBG from "../../assets/images/unitsoverviewbg.png";
import Roombg from "../../assets/images/Roombg.png";
import { MdDeleteForever, MdEdit, MdPeople, MdSearchOff } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";

export default function AdminUnitsCards() {
  const [search, setSearch] = useState("");
  const [units, setUnits] = useState([
    {
      number: "101",
      floor: "Ground Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 1,
    },
    {
      number: "102",
      floor: "Ground Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "103",
      floor: "Ground Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 2,
    },
    {
      number: "104",
      floor: "Ground Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "105",
      floor: "Ground Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 1,
    },
    {
      number: "106",
      floor: "Ground Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "107",
      floor: "Ground Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "201",
      floor: "Second Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 1,
    },
    {
      number: "202",
      floor: "Second Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 2,
    },
    {
      number: "203",
      floor: "Second Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "204",
      floor: "Second Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 1,
    },
    {
      number: "205",
      floor: "Second Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 2,
    },
    {
      number: "206",
      floor: "Second Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "301",
      floor: "Third Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 1,
    },
    {
      number: "302",
      floor: "Third Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 1,
    },
    {
      number: "303",
      floor: "Third Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 2,
    },
    {
      number: "304",
      floor: "Third Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "305",
      floor: "Third Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 1,
    },
    {
      number: "306",
      floor: "Third Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "307",
      floor: "Third Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 1,
    },
    {
      number: "308",
      floor: "Third Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "309",
      floor: "Third Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 1,
    },
    {
      number: "310",
      floor: "Third Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 2,
    },
    {
      number: "311",
      floor: "Third Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "312",
      floor: "Third Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "313",
      floor: "Third Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "314",
      floor: "Third Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "315",
      floor: "Third Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "316",
      floor: "Third Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "401",
      floor: "Fourth Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "402",
      floor: "Fourth Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "403",
      floor: "Fourth Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 1,
    },
    {
      number: "404",
      floor: "Fourth Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "405",
      floor: "Fourth Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "406",
      floor: "Fourth Floor",
      occupied: false,
      capacity: 2,
      currentTenants: 0,
    },
    {
      number: "407",
      floor: "Fourth Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 1,
    },
    {
      number: "408",
      floor: "Fourth Floor",
      occupied: true,
      capacity: 2,
      currentTenants: 2,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isConfigureMode, setIsConfigureMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [newUnit, setNewUnit] = useState({
    number: "",
    floor: "Ground Floor",
    capacity: 2,
    currentTenants: 0,
  });
  const [editingUnit, setEditingUnit] = useState(null);

  const confirmAddUnit = () => {
    if (newUnit.number && newUnit.floor) {
      setUnits([
        ...units,
        { ...newUnit, occupied: newUnit.currentTenants > 0 },
      ]);
      setNewUnit({
        number: "",
        floor: "Ground Floor",
        capacity: 2,
        currentTenants: 0,
      });
      setShowAddModal(false);
    }
  };

  const handleEditClick = (unit) => {
    setEditingUnit({ ...unit });
    setShowEditModal(true);
  };

  const saveEdit = () => {
    setUnits(
      units.map((u) => (u.number === editingUnit.number ? editingUnit : u)),
    );
    setShowEditModal(false);
    setEditingUnit(null);
  };

  const filteredUnits = units.filter(
    (unit) =>
      unit.number.toLowerCase().includes(search.toLowerCase()) ||
      unit.floor.toLowerCase().includes(search.toLowerCase()),
  );

  const groupByFloor = (floor) =>
    filteredUnits.filter((u) => u.floor === floor);

  const FloorBlock = ({ label, color, floorUnits }) => {
    if (floorUnits.length === 0) return null;

    return (
      <div className="flex flex-col gap-2">
        <h2
          className={`text-white text-sm md:text-base font-bold px-4 py-2 rounded-md ${color}`}
        >
          {label.toUpperCase()}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {floorUnits.map((unit) => (
            <div
              key={unit.number}
              className="relative bg-cover bg-center text-[#4b150d] border border-[#4b150d] rounded-xl flex flex-col gap-y-4 p-5 shadow hover:shadow-lg transition"
              style={{ backgroundImage: `url(${Roombg})` }}
            >
              <Link
                to={`/admintenantprof`}
                className="font-RegularMilk text-lg no-underline hover:text-[#8b2d1a]"
              >
                UNIT {unit.number}
              </Link>
              <div className="flex justify-between items-center">
                <div
                  className={`text-[10px] font-LightMilk px-3 py-1 text-white rounded-md w-fit uppercase tracking-wider ${
                    unit.occupied ? "bg-[#ff7b7b]" : "bg-[#2edb8b]"
                  }`}
                >
                  {unit.occupied ? "Occupied" : "Vacant"}
                </div>
                <div className="flex items-center gap-1 text-xs md:text-sm font-bold px-2 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-sm text-[#4b150d]">
                  <MdPeople size={16} className="opacity-80" />
                  <span>
                    {unit.currentTenants}/{unit.capacity}
                  </span>
                </div>
              </div>

              {isConfigureMode && (
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    className="bg-blue-600 text-white p-1.5 rounded-lg shadow-md hover:bg-blue-700"
                    onClick={() => handleEditClick(unit)}
                  >
                    <MdEdit size={12} />
                  </button>
                  <button
                    className="bg-red-600 text-white p-1.5 rounded-lg shadow-md hover:bg-red-700"
                    onClick={() => setConfirmDelete(unit.number)}
                  >
                    <MdDeleteForever size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-linear-to-r from-[#f7b094] to-[#dd7255] rounded-2xl h-full w-full px-4 sm:px-8 py-7 flex flex-col gap-3 md:gap-4">
      <div
        className="flex flex-col bg-cover bg-center items-center text-center sm:text-start sm:items-start text-white px-8 py-8 shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-3xl w-full"
        style={{ backgroundImage: `url(${UnitsOverviewBG})` }}
      >
        <h1 className="font-BoldMilk tracking-[3px] md:tracking-[12px] text-xl md:text-2xl uppercase">
          Units Overview
        </h1>
      </div>

      <div className="bg-linear-to-r from-[#ffebdf] to-[#f2c9b1] shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] flex flex-col gap-6 rounded-2xl px-4 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap relative w-full sm:w-auto grow">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-black"
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
              placeholder="Search by unit or floor (e.g., Ground)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2 border border-[#4b150d] rounded-xl shadow-sm text-sm  focus:outline-none focus:ring-2 focus:ring-[#4b150d]"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#4b150d] text-[#efd4c4] px-4 py-2 rounded-xl shadow  hover:bg-[#5c1a12] flex items-center gap-2 text-xs sm:text-sm font-LightMilk transition cursor-pointer"
            >
              <HiPlus /> Add Unit
            </button>
            <button
              onClick={() => setIsConfigureMode(!isConfigureMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow transition text-xs sm:text-sm font-LightMilk text-white cursor-pointer ${isConfigureMode ? "bg-green-700" : "bg-[#aa2f1e]"}`}
            >
              <IoSettingsSharp
                className={isConfigureMode ? "animate-spin" : ""}
              />
              {isConfigureMode ? "Exit Configure" : "Configure"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {filteredUnits.length > 0 ? (
            ["Ground Floor", "Second Floor", "Third Floor", "Fourth Floor"].map(
              (floor) => (
                <FloorBlock
                  key={floor}
                  label={floor}
                  color="bg-[#3f0d0a]"
                  floorUnits={groupByFloor(floor)}
                />
              ),
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-[#4b150d] opacity-60">
              <MdSearchOff size={64} />
              <p className="font-LightMilk text-lg mt-2">
                No units or floors found matching "{search}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit/Delete Modals (Logic remains the same) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-[#4b150d]">
              Add New Unit
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Unit Number"
                className="border p-2 rounded focus:ring-2 ring-[#f7b094]"
                onChange={(e) =>
                  setNewUnit({ ...newUnit, number: e.target.value })
                }
              />
              <select
                className="border p-2 rounded"
                onChange={(e) =>
                  setNewUnit({ ...newUnit, floor: e.target.value })
                }
              >
                <option>Ground Floor</option>
                <option>Second Floor</option>
                <option>Third Floor</option>
                <option>Fourth Floor</option>
              </select>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <label className="text-[10px] font-bold">MAX CAPACITY</label>
                  <input
                    type="number"
                    className="border p-2 rounded w-full"
                    value={newUnit.capacity}
                    onChange={(e) =>
                      setNewUnit({
                        ...newUnit,
                        capacity: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-[10px] font-bold">TENANTS</label>
                  <input
                    type="number"
                    className="border p-2 rounded w-full"
                    value={newUnit.currentTenants}
                    onChange={(e) =>
                      setNewUnit({
                        ...newUnit,
                        currentTenants: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md font-bold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddUnit}
                className="bg-green-600 text-white px-4 py-2 rounded-md font-bold text-sm"
              >
                Add Unit
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingUnit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-[#4b150d]">
              Edit Unit {editingUnit.number}
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold block mb-1">
                  UNIT NO:
                </label>
                <input
                  type="text"
                  className="border w-full p-2 rounded"
                  value={editingUnit.number}
                  onChange={(e) =>
                    setEditingUnit({ ...editingUnit, number: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-bold block mb-1">
                  STATUS:
                </label>
                <select
                  className="border w-full p-2 rounded"
                  value={editingUnit.occupied ? "Occupied" : "Vacant"}
                  onChange={(e) =>
                    setEditingUnit({
                      ...editingUnit,
                      occupied: e.target.value === "Occupied",
                    })
                  }
                >
                  <option>Occupied</option>
                  <option>Vacant</option>
                </select>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-[10px] font-bold block mb-1">
                    MAX CAPACITY:
                  </label>
                  <input
                    type="number"
                    className="border w-full p-2 rounded"
                    value={editingUnit.capacity}
                    onChange={(e) =>
                      setEditingUnit({
                        ...editingUnit,
                        capacity: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-[10px] font-bold block mb-1">
                    CURRENT TENANTS:
                  </label>
                  <input
                    type="number"
                    className="border w-full p-2 rounded"
                    value={editingUnit.currentTenants}
                    onChange={(e) =>
                      setEditingUnit({
                        ...editingUnit,
                        currentTenants: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md font-bold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center text-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-2">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600 text-sm">
              When you delete this unit, all existing information within it will
              also be deleted. Are you sure?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-300 px-6 py-2 rounded-md font-bold text-sm"
              >
                No
              </button>
              <button
                onClick={() => {
                  setUnits(units.filter((u) => u.number !== confirmDelete));
                  setConfirmDelete(null);
                }}
                className="bg-red-600 text-white px-6 py-2 rounded-md font-bold text-sm"
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
