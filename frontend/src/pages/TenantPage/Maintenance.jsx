import { useState } from "react";
import maintenancebg from "../../assets/images/maintenancebg.png";
import maintenanceprog from "../../assets/images/maintenanceprogressbg.png";

function MaintenanceCards() {
  const [selectedConcern, setSelectedConcern] = useState("Concern");
  const [messageTitle, setMessageTitle] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [followedUp, setFollowedUp] = useState([]);

  const categories = [
    {
      category: "Electrical Maintenance",
      title: "Fix wiring in Unit 101",
      requestDate: "2025-06-01",
      startDate: "2025-06-05",
      endDate: "2025-06-07",
      status: "Completed",
    },
    {
      category: "Water Interruptions",
      title: "Leaking pipe in Unit 202",
      requestDate: "2025-06-03",
      startDate: "2025-06-06",
      endDate: "Ongoing",
      status: "In Progress",
    },
    {
      category: "Floor Renovation",
      title: "Bathroom Tiles",
      requestDate: "2025-06-04",
      startDate: "2025-06-08",
      endDate: "2025-06-12",
      status: "Completed",
    },
    {
      category: "Others",
      title: "Aircon cleaning request",
      requestDate: "2025-06-07",
      startDate: "2025-06-10",
      endDate: "Ongoing",
      status: "Pending",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Pending":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date) => {
    if (date === "Ongoing") return "Ongoing";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSubmit = () => {
    setMessageTitle("");
    setMessage("");
    alert("Request Submitted!");
  };

  return (
    <div className="bg-linear-to-r from-[#f7b094] to-[#dd7255] min-h-screen w-full px-3 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Header - Fixed height and better text scaling */}
      <div
        className="flex flex-col bg-cover bg-center items-center justify-center sm:items-start text-white px-6 py-10 shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-3xl w-full"
        style={{ backgroundImage: `url(${maintenancebg})` }}
      >
        <h1 className="font-BoldMilk tracking-[4px] md:tracking-[12px] text-xl md:text-3xl text-center sm:text-left">
          MAINTENANCE
        </h1>
      </div>

      {/* Form Section - Stacked on mobile, 2-cols on desktop */}
      <div className="bg-[#ffede1] shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-3xl p-5 sm:p-8 flex flex-col gap-5">
        <h2 className="font-RegularMilk text-[#330101] text-lg sm:text-xl">
          Report a Concern
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#4b150d] text-[10px] sm:text-xs uppercase tracking-wider">
              Category
            </label>
            <select
              className="text-sm px-4 py-3 border border-[#e39b7c] rounded-xl bg-white focus:ring-2 focus:ring-[#db5833] outline-none transition"
              value={selectedConcern}
              onChange={(e) => setSelectedConcern(e.target.value)}
            >
              {categories.map((c, i) => (
                <option key={i}>{c.category}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#4b150d] text-[10px] sm:text-xs uppercase tracking-wider">
              Title
            </label>
            <input
              type="text"
              className="px-4 py-3 border border-[#e39b7c] rounded-xl bg-white text-sm focus:ring-2 focus:ring-[#db5833] outline-none transition"
              placeholder="What needs fixing?"
              value={messageTitle}
              onChange={(e) => setMessageTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-[#4b150d] text-[10px] sm:text-xs uppercase tracking-wider">
            Description
          </label>
          <textarea
            className="px-4 py-3 border border-[#e39b7c] rounded-xl bg-white text-sm focus:ring-2 focus:ring-[#db5833] outline-none transition resize-none"
            rows={3}
            placeholder="Describe the issue in detail..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-2">
          <button
            className="w-full sm:w-auto bg-[#330101] text-xs sm:text-sm text-[#ffede1] font-bold px-8 py-4 rounded-xl hover:bg-[#4d0707] active:scale-95 transition transform"
            onClick={handleSubmit}
          >
            SUBMIT REQUEST
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div
        className="bg-cover bg-center shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-3xl p-5 sm:p-8 flex flex-col gap-6 min-h-[400px]"
        style={{ backgroundImage: `url(${maintenanceprog})` }}
      >
        <h2 className="text-[#330101] text-lg font-BoldMilk tracking-wide text-center sm:text-left">
          UNIT MAINTENANCE PROGRESS
        </h2>

        {/* Desktop Table View (Hidden on mobile/tablet) */}
        <div className="hidden xl:block overflow-hidden rounded-2xl border border-black/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#4b150d] text-white font-LightMilk text-[11px] tracking-widest uppercase">
              <tr>
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Timeline</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/80 backdrop-blur-sm">
              {categories.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-black/5 hover:bg-white transition"
                >
                  <td className="py-4 px-6 font-semibold text-[#330101]">
                    {item.title}
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-sm">
                    {item.category}
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-500">
                    <span className="block italic">
                      Requested: {formatDate(item.requestDate)}
                    </span>
                    <span className="block font-medium text-black">
                      {formatDate(item.startDate)} → {formatDate(item.endDate)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${getStatusStyle(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      disabled={followedUp.includes(index)}
                      className={`px-6 py-2 rounded-lg text-xs font-bold transition ${followedUp.includes(index) ? "bg-gray-200 text-gray-400" : "bg-[#db5833] text-white hover:scale-105"}`}
                      onClick={() => {
                        setModalOpen(true);
                        setFollowedUp([...followedUp, index]);
                      }}
                    >
                      {followedUp.includes(index) ? "DONE" : "FOLLOW UP"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View (Hidden on extra large screens) */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-sm border-l-8 border-[#db5833] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-bold text-[#330101] text-sm leading-tight">
                    {item.title}
                  </h3>
                  <span
                    className={`whitespace-nowrap px-2 py-0.5 rounded-md text-[9px] font-bold border ${getStatusStyle(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4">{item.category}</p>

                <div className="space-y-1 text-[11px] text-gray-600 bg-[#fff5f0] p-3 rounded-xl mb-4">
                  <p>
                    <span className="font-bold">Requested:</span>{" "}
                    {formatDate(item.requestDate)}
                  </p>
                  <p>
                    <span className="font-bold">Schedule:</span>{" "}
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                  </p>
                </div>
              </div>

              <button
                disabled={followedUp.includes(index)}
                className={`w-full py-3 rounded-xl text-xs font-bold transition ${followedUp.includes(index) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#db5833] text-white active:bg-[#b04326]"}`}
                onClick={() => {
                  setModalOpen(true);
                  setFollowedUp([...followedUp, index]);
                }}
              >
                {followedUp.includes(index)
                  ? "FOLLOWED UP"
                  : "FOLLOW UP REQUEST"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - Responsive Width */}
      {modalOpen && (
        <div className="fixed inset-0 bg-[#330101]/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-4xl p-8 shadow-2xl max-w-sm w-full text-center border-t-8 border-[#db5833] animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-black text-[#330101] mb-2 uppercase tracking-tight">
              Notification Sent!
            </h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              The building admin has been notified. You will receive an update
              shortly regarding your request.
            </p>
            <button
              className="w-full bg-[#330101] text-white px-6 py-4 rounded-2xl font-bold hover:bg-[#4d0707] transition-all"
              onClick={() => setModalOpen(false)}
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MaintenanceCards;
