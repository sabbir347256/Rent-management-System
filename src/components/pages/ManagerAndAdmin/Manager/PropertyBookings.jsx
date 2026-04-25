import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  Search,
  Eye,
  ChevronDown,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Loader,
} from "lucide-react";
const PropertyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = async (query = "") => {
    try {
      const token = localStorage.getItem("accessToken");
      const url = `http://localhost:5000/api/v1/booking/get-manager-booking?searchTerm=${query}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setBookings(result.data);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBookings(searchTerm);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    const loadingToast = toast.loading("Updating status...");
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5000/api/v1/booking/update-status/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      const result = await response.json();
      if (result.success) {
        toast.success("Status updated!", { id: loadingToast });
        setBookings(
          bookings.map((b) => (b._id === id ? { ...b, status: newStatus } : b)),
        );
      } else {
        toast.error(result.message, { id: loadingToast });
      }
    } catch (error) {
      toast.error("Update failed", error, { id: loadingToast });
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  return (
    <div className="min-h-screen">
      <Toaster />
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-800">
              Property Bookings
            </h2>
            <p className="text-slate-500 font-medium">
              Manage your property reservation requests
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by customer or property..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm font-medium"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white text-[11px] font-bold uppercase tracking-widest">
                  <th className="px-6 py-5">Property</th>
                  <th className="px-6 py-5">Customer Info</th>
                  <th className="px-6 py-5">Booking Date</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                          <RefreshCw className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-700 line-clamp-1">
                          {booking.propertyId?.propertyTitle || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div>
                        <p className="text-sm font-black text-slate-800">
                          {booking.userName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {booking.userEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-slate-500">
                      {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusStyle(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="relative group/dropdown">
                          <select
                            disabled={updatingId === booking._id}
                            value={booking.status}
                            onChange={(e) =>
                              handleStatusUpdate(booking._id, e.target.value)
                            }
                            className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer disabled:opacity-50"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirm</option>
                            <option value="cancelled">Cancel</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>

                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bookings.length === 0 && !loading && (
            <div className="py-32 text-center">
              <div className="inline-flex p-6 bg-slate-50 rounded-full mb-4">
                <Clock className="w-10 h-10 text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold text-lg">
                No bookings found for your criteria
              </p>
            </div>
          )}

          {loading && (
            <div className="py-20 text-center font-black text-blue-600 animate-pulse flex items-center justify-center">
              <Loader></Loader>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyBookings;
