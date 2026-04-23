import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const AllProperty = () => {
  const queryClient = useQueryClient();

  const {
    data: properties,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5000/api/v1/property/allproperty", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      return result.data;
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
  if (isError)
    return (
      <div className="p-10 text-red-500 text-center">
        Error fetching properties
      </div>
    );
  return (
    <div className="container mx-auto p-6 min-h-screen pt-32">
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
            {properties?.map((item) => (
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
    </div>
  );
};

export default AllProperty;
