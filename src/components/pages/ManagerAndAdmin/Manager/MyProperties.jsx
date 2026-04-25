import React, { useEffect, useState } from "react";
import { Edit, Trash2, Home, Search } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import SkalatonTableLoader from "../../../utils/SkalatonTableLoader";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(token)
      const url = searchTerm
        ? `http://localhost:5000/api/v1/property/own-property?searchTerm=${searchTerm}`
        : "http://localhost:5000/api/v1/property/own-property";

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setProperties(result.data);
      }
    } catch (error) {
      toast.error("Failed to load properties",error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProperties();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `http://localhost:5000/api/v1/property/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await response.json();
        if (result.success) {
          toast.success("Property deleted successfully");
          setProperties(properties.filter((p) => p._id !== id));
        }
      } catch (error) {
        toast.error("Delete failed",error);
      }
    }
  };

  if (loading && !searchTerm)
    return <SkalatonTableLoader></SkalatonTableLoader>
  return (
    <div className="min-h-screen">
      <Toaster />
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Home className="text-blue-600" /> My Properties
          </h2>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, city or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-4 text-sm font-bold uppercase tracking-wider">
                    Property
                  </th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider">
                    Type
                  </th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider">
                    Rent
                  </th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider">
                    Location
                  </th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-center">
                    Status
                  </th>
                  <th className="p-4 text-sm font-bold uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {properties.map((property) => (
                  <tr
                    key={property._id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={property.images[0]}
                          alt={property.propertyTitle}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                        <span className="font-bold text-slate-700 line-clamp-1">
                          {property.propertyTitle}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase">
                        {property.propertyType}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-700">
                      ${property.monthlyRent}
                    </td>
                    <td className="p-4 text-sm text-slate-500 capitalize">
                      {property.city}, {property.address}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          property.isApproved
                            ? "bg-green-100 text-green-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {property.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(property._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {properties.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-medium">
              {searchTerm
                ? "No results found for your search."
                : "No properties found. Start by adding one!"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
