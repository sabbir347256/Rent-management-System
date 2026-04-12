import React from "react";

const PropertyBookings = () => {
  const bookings = [
    {
      id: "BK-9021",
      property: "Modern 2 Bedroom Apartment",
      customer: "Ariful Islam",
      date: "12 Oct 2026",
      amount: "৳25,000",
      status: "Confirmed",
    },
    {
      id: "BK-8842",
      property: "Luxury Villa with Pool",
      customer: "Sultana Razia",
      date: "10 Oct 2026",
      amount: "৳45,000",
      status: "Pending",
    },
    {
      id: "BK-7530",
      property: "Studio in Gulshan",
      customer: "Rahat Kabir",
      date: "08 Oct 2026",
      amount: "৳18,000",
      status: "Cancelled",
    },
    {
      id: "BK-6211",
      property: "Duplex Near Banani Lake",
      customer: "Farhana Ahmed",
      date: "05 Oct 2026",
      amount: "৳35,000",
      status: "Confirmed",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return (
    <div className="pt-16">
      <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="container bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-2xl font-extrabold text-slate-800">
              Property Bookings
            </h2>
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {bookings.length} Total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-4 font-bold">Booking ID</th>
                  <th className="px-6 py-4 font-bold">Property Name</th>
                  <th className="px-6 py-4 font-bold">Customer</th>
                  <th className="px-6 py-4 font-bold">Check-in Date</th>
                  <th className="px-6 py-4 font-bold">Amount</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-blue-600">
                      #{booking.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                      {booking.property}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {booking.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">
                      {booking.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${getStatusStyle(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors">
                        <svg
                          className="w-5 h-5 inline"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bookings.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 italic">No bookings found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyBookings;
