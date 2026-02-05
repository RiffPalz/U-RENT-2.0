import { useState } from "react";
import Accsettbg from "../../assets/images/accsettbg.png";
import { MdModeEdit, MdSave, MdDelete } from "react-icons/md";

export default function AccsettCards() {
  const [editMode, setEditMode] = useState(false);

  const [username, setUsername] = useState("Lances");
  const [fullName, setFullName] = useState("Lance Atendidas");
  const [email, setEmail] = useState("LanceAtendidas@example.com");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("09123456789");
  const [tenantsCount, setTenantsCount] = useState(2);
  const [tenants, setTenants] = useState(["Lance Atendidas", "Karl Atendidas"]);

  /* --------- HELPERS --------- */
  const lettersOnly = (v) => v.replace(/[^a-zA-Z\s]/g, "");
  const numbersOnly = (v) => v.replace(/\D/g, "");

  const removeTenant = (index) => {
    setTenants(tenants.filter((_, i) => i !== index));
    setTenantsCount(tenants.length - 1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Validation placeholder (backend later)
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // SUCCESS PLACEHOLDER
    setIsModalOpen(false);
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="bg-linear-to-r from-[#f7b094] to-[#dd7255] rounded-2xl w-full h-full px-4 sm:px-8 py-7 flex flex-col gap-6">
      {/* Header */}
      <div
        className="flex flex-col bg-cover bg-center items-center text-center sm:text-start sm:items-start text-white px-10 py-8 shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-3xl w-full"
        style={{ backgroundImage: `url(${Accsettbg})` }}
      >
        <h1 className="font-BoldMilk tracking-[3px] md:tracking-[12px] text-xl md:text-2xl text-white">
          ACCOUNT SETTINGS
        </h1>
      </div>

      {/* Form Card */}
      <div className="h-full bg-linear-to-r from-[#fff3ec] to-[#f1c4aa] shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-2xl px-4 md:px-10 py-6 flex flex-col gap-2 md:gap-4">
        {/* Title + Edit */}
        <div className="flex w-full gap-3">
          <div className="flex-1 bg-[#4b150d] p-4 rounded-lg">
            <h1 className="font-[RegularMilk] md:text-base text-[#fff3ec]">
              PERSONAL INFORMATION
            </h1>
          </div>

          <div
            onClick={() => setEditMode(!editMode)}
            className="flex items-center justify-center bg-[#db6949] px-6 rounded-lg cursor-pointer"
          >
            {editMode ? (
              <span className="text-white md:text-sm font-[RegularMilk] tracking-wider">
                SAVE
              </span>
            ) : (
              <MdModeEdit className="text-white text-xl" />
            )}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Username */}
          <div className="border border-[#e39b7c] bg-white/80 p-4 rounded-lg">
            <label className="text-xs md:sm block text-[#4b150d] font-RegularMilk mb-1">
              Username
            </label>
            <input
              value={username}
              readOnly={!editMode}
              onChange={(e) => setUsername(lettersOnly(e.target.value))}
              className="text-xs md:sm w-full px-4 py-1 rounded-lg text-[#4b150d] focus:outline-none"
            />
          </div>

          {/* Full Name */}
          <div className="border border-[#e39b7c] bg-white/80 p-4 rounded-lg">
            <label className="text-xs md:sm block text-[#4b150d] font-RegularMilk mb-1">
              Full Name
            </label>
            <input
              value={fullName}
              readOnly={!editMode}
              onChange={(e) => setFullName(lettersOnly(e.target.value))}
              className="text-xs md:sm w-full px-4 py-1 rounded-lg text-[#4b150d] focus:outline-none"
            />
          </div>

          {/* Password (unchanged display) */}
          <div className="border border-[#e39b7c] bg-white/80 p-4 rounded-lg">
            <label className="text-xs md:sm block text-[#4b150d] font-RegularMilk mb-1">
              Password
            </label>

            <div className="flex items-center justify-between">
              <input
                value="*******"
                readOnly
                className="text-xs md:sm w-full px-4 py-1 rounded-lg text-[#4b150d]"
              />

              {editMode && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#db6747] ml-4 text-xs md:sm font-RegularMilk text-[white] hover:underline whitespace-nowrap p-3 rounded-lg"
                >
                  Change Password
                </button>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="border border-[#e39b7c] bg-white/80 p-4 rounded-lg">
            <label className="text-xs md:sm block text-[#4b150d] font-RegularMilk mb-1">
              Gender
            </label>

            {editMode ? (
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="text-xs md:sm w-full px-4 py-1 rounded-lg text-[#4b150d]"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            ) : (
              <input
                value={gender}
                readOnly
                className="text-xs md:sm w-full px-4 py-1 rounded-lg text-[#4b150d]"
              />
            )}
          </div>

          {/* Email */}
          <div className="border border-[#e39b7c] bg-white/80 p-4 rounded-lg">
            <label className="text-xs md:sm block text-[#4b150d] font-RegularMilk mb-1">
              Email
            </label>
            <input
              value={email}
              readOnly={!editMode}
              onChange={(e) => setEmail(e.target.value)}
              className="text-xs md:sm w-full px-4 py-1 rounded-lg text-[#4b150d]"
            />
          </div>

          {/* Phone */}
          <div className="border border-[#e39b7c] bg-white/80 p-4 rounded-lg">
            <label className="text-xs md:sm block text-[#4b150d] font-RegularMilk mb-1">
              Phone Number
            </label>
            <input
              value={phone}
              readOnly={!editMode}
              onChange={(e) => setPhone(numbersOnly(e.target.value))}
              className="text-xs md:sm w-full px-4 py-1 rounded-lg text-[#4b150d]"
            />
          </div>
        </div>

        {/* Tenants */}
        <div className="flex flex-col gap-6">
          {/* Tenant Count */}
          <div className="bg-[#4b150d] p-6 rounded-lg font-RegularMilk text-[#fff3ec] text-base md:lg">
            {editMode ? (
              <select
                value={tenantsCount}
                onChange={(e) => setTenantsCount(Number(e.target.value))}
                className="text-white font-RegularMilk px-4 py-1 rounded-lg text-base md:lg"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            ) : (
              `Number of Tenants : ${tenantsCount}`
            )}
          </div>

          {/* Tenant List */}
          <div className="border border-[#e39b7c] bg-white/80 p-4 rounded-lg flex flex-col gap-4">
            <label className="text-xs md:sm block text-[#4b150d] font-RegularMilk mb-1">
              List of Tenants
            </label>

            {tenants.map((tenant, index) => (
              <div key={index} className=" flex items-center gap-4">
                <input
                  value={tenant}
                  readOnly={!editMode}
                  onChange={(e) =>
                    setTenants(
                      tenants.map((t, i) =>
                        i === index ? lettersOnly(e.target.value) : t,
                      ),
                    )
                  }
                  className="text-xs md:sm w-full px-4 py-1 rounded-lg text-[#4b150d]"
                />

                {editMode && (
                  <MdDelete
                    onClick={() => removeTenant(index)}
                    className="text-red-600 text-xl cursor-pointer"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold text-[#4b150d] mb-4">
              Change Password
            </h2>

            <form
              onSubmit={handlePasswordSubmit}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="block text-[#4b150d] font-semibold mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 rounded-lg border border-[#4b150d] focus:outline-none focus:ring-2 focus:ring-[#db6747]"
                />
              </div>

              <div>
                <label className="block text-[#4b150d] font-semibold mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 rounded-lg border border-[#4b150d] focus:outline-none focus:ring-2 focus:ring-[#db6747]"
                />
              </div>

              <div>
                <label className="block text-[#4b150d] font-semibold mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 rounded-lg border border-[#4b150d] focus:outline-none focus:ring-2 focus:ring-[#db6747]"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#db6747] text-white hover:bg-[#c55a3f] transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
