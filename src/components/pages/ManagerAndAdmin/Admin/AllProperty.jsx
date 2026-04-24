import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../../utils/PageHeader";

const AllProperty = () => {
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(inputValue);
      setPage(1);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  const { data: response, isLoading } = useQuery({
    queryKey: ["propertyApprovals", searchTerm, page],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:5000/api/v1/property/allproperty?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5000/api/v1/property/property-status/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isApproved: status === "true" }),
        },
      );
      if (!response.ok) throw new Error("Update failed");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]);
    },
  });

  if (isLoading)
    return (
      <div className="p-10 text-center font-bold">Loading properties...</div>
    );

  const meta = response?.meta || {};

  return (
    <div className="min-h-screen">
      <PageHeader title={"Property Approval"}></PageHeader>
      <div className="mb-6 flex justify-between items-center  border-gray-100">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full max-w-md px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="hidden sm:block text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Total Results: {meta.total || 0}
        </div>
      </div>

      <div className="overflow-hidden shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full bg-white text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Property Title
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Rent
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {response?.data?.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                  {item.propertyTitle}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.city}, {item.address}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  ${item.monthlyRent}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.isApproved
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isApproved ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none cursor-pointer"
                    value={item.isApproved ? "true" : "false"}
                    onChange={(e) =>
                      updateStatusMutation.mutate({
                        id: item._id,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="false">Pending</option>
                    <option value="true">Approve</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-center items-center gap-2 pb-12">
        <button
          className="px-4 py-2 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-emerald-600 hover:text-white disabled:opacity-30 transition-all shadow-sm"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-md">
          {page}
        </span>
        <button
          className="px-4 py-2 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-emerald-600 hover:text-white disabled:opacity-30 transition-all shadow-sm"
          disabled={page >= (meta.totalPage || 1)}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProperty;
