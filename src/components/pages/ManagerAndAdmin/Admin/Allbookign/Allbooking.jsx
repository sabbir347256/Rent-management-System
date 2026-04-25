import React, { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "../../../../utils/PageHeader";

const Allbooking = () => {
  const [bookings, setBookings] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5000/api/v1/booking?searchTerm=${searchTerm}&page=${currentPage}&limit=50`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await response.json();
      if (result.success) {
        setBookings(result.data);
        setMeta(result.meta);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBookings();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5000/api/v1/booking/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await response.json();

      if (result.success) {
        toast.success("Booking deleted successfully");
        fetchBookings();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Delete request failed", error);
    }
  };
  return (
    <div>
      <PageHeader title={"All Bookings"}></PageHeader>
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-black text-slate-800">Manage Bookings</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full md:w-80 transition-all"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 text-xs font-black text-slate-500 uppercase">
                  Sl
                </th>
                <th className="py-4 px-4 text-xs font-black text-slate-500 uppercase">
                  Property
                </th>
                <th className="py-4 px-4 text-xs font-black text-slate-500 uppercase">
                  Owner
                </th>
                <th className="py-4 px-4 text-xs font-black text-slate-500 uppercase">
                  Owner Email
                </th>
                <th className="py-4 px-4 text-xs font-black text-slate-500 uppercase">
                  Customer
                </th>
                <th className="py-4 px-4 text-xs font-black text-slate-500 uppercase">
                  Phone
                </th>
                <th className="py-4 px-4 text-xs font-black text-slate-500 uppercase">
                  Status
                </th>
                <th className="py-4 px-4 text-xs font-black text-slate-500 uppercase text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
                  </td>
                </tr>
              ) : bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm font-medium text-slate-600">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.propertyId?.images?.[0]}
                          className="w-10 h-10 rounded-lg object-cover"
                          alt=""
                        />
                        <span className="font-bold text-slate-700 text-sm truncate max-w-[150px]">
                          {booking.propertyId?.propertyTitle}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-600">
                      {booking.propertyId?.user?.fullName}
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-600">
                      {booking.propertyId?.user?.email}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      <div className="font-bold text-slate-700">
                        {booking.userName}
                      </div>
                      <div className="text-slate-400 text-xs">
                        {booking.userEmail}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-600">
                      {booking.userPhone}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          booking.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-600"
                            : booking.status === "pending"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-10 text-center text-slate-400 font-medium"
                  >
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {meta.totalPage > 1 && (
          <div className="flex items-center justify-between mt-6 px-2">
            <p className="text-xs font-bold text-slate-500">
              Showing Page {meta.page} of {meta.totalPage}
            </p>
            <div className="flex gap-2">
              <button
                disabled={meta.page === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-2 border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-50 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={meta.page === meta.totalPage}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-2 border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-50 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allbooking;
