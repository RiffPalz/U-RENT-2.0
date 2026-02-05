import { useState } from "react";
import payhisbg from "../../assets/images/payhisbg.png";

function PaymenthisCards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const history = [
    {
      payment: "Rent Bill",
      amount: "₱8,000",
      date: "2025-06-06", 
      displayDate: "June 6, 2025",
      status: "Paid",
    },
    {
      payment: "Electricity and Water Bill",
      amount: "₱8,000",
      date: "2025-06-20",
      displayDate: "June 20, 2025",
      status: "Late",
    },
    {
      payment: "Advance",
      amount: "₱8,000",
      date: "2025-06-29",
      displayDate: "June 29, 2025",
      status: "Unpaid",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-700 border-green-200';
      case 'Late': return 'bg-red-100 text-red-700 border-red-200';
      case 'Unpaid': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredHistory = history.filter((entry) => {
    const matchesSearch = entry.payment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFrom = fromDate ? entry.date >= fromDate : true;
    const matchesTo = toDate ? entry.date <= toDate : true;
    return matchesSearch && matchesFrom && matchesTo;
  });

  return (
    <div className="bg-linear-to-r from-[#f7b094] to-[#dd7255] rounded-2xl w-full h-full px-4 sm:px-8 py-7 flex flex-col gap-6">

      {/* Header */}
      <div
        className="flex flex-col bg-cover bg-center items-center text-center sm:text-start sm:items-start text-white px-10 py-8 shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-3xl w-full"
        style={{ backgroundImage: `url(${payhisbg})` }}
      >
        <h1 className="font-BoldMilk tracking-[3px] md:tracking-[12px] text-xl md:text-2xl text-white">
          PAYMENT HISTORY
        </h1>
      </div>

      {/* Table Card */}
      <div className="h-full bg-linear-to-r from-[#ffebdf] to-[#f2c9b1] shadow-[5px_5px_0px_#330101] md:shadow-[10px_8px_0px_#330101] rounded-2xl px-4 md:px-8 py-5">

        {/* Filters Container */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search Bar - Original Style */}
          <div className="grow">
            <input
              type="text"
              placeholder="Search payment type..."
              className="w-full bg-white px-4 py-2 border border-[#330101] rounded-xl focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Date Range - Matching Original Input Style */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <input
              type="date"
              className="bg-white px-3 py-2 border border-[#330101] rounded-xl text-xs focus:outline-none"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <span className="text-[#330101] font-bold">-</span>
            <input
              type="date"
              className="bg-white px-3 py-2 border border-[#330101] rounded-xl text-xs focus:outline-none"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-auto rounded-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#4b150d] text-[#efd4c4] uppercase tracking-[2px] text-[10px] font-RegularMilk">
                <th className="py-4 px-4 text-left">Payment</th>
                <th className="py-4 px-4 text-left">Amount</th>
                <th className="py-4 px-4 text-left">Date</th>
                <th className="py-4 px-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredHistory.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white text-black text-sm border-b-2 border-[#330101]/10 last:border-b-0"
                >
                  <td className="py-4 px-4 font-semibold text-[#330101]">{item.payment}</td>
                  <td className="py-4 px-4 font-bold text-[#330101]">{item.amount}</td>
                  <td className="py-4 px-4 text-gray-500">{item.displayDate}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-4 py-1 rounded-full text-[10px] font-bold uppercase border-2 ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredHistory.length === 0 && (
            <div className="text-center py-6 text-[#330101] font-bold opacity-50">
              No matching records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymenthisCards;