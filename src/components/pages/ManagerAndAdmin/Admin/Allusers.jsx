import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import PageHeader from "../../../utils/PageHeader";
const Allusers = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 50;

  const getHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  };

  const { data: response, isLoading } = useQuery({
    queryKey: ["users", searchTerm, page],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/user/all-users?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: getHeaders(),
        },
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, isApproved }) => {
      const res = await fetch(
        `http://localhost:5000/api/v1/user/update-status/${id}`,
        {
          method: "PATCH",
          headers: getHeaders(),
          body: JSON.stringify({ isApproved }),
        },
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  if (isLoading)
    return <div className="p-10 text-center font-bold">Loading...</div>;

  const meta = response?.meta || {};

  return (
    <div className="min-h-screen">
        <PageHeader title={'Manage Users'}></PageHeader>
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name, email..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="text-sm font-medium text-gray-500">
          Total Users: {meta.total || 0}
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                SL
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Full Name
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Contact
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {response?.data?.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                  {(page - 1) * limit + index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {user.fullName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.contactNo}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-bold">
                  {user.role}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.isApproved
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {user.isApproved ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <select
                    className="px-2 py-1 text-sm border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    value={user.isApproved ? "true" : "false"}
                    onChange={(e) =>
                      mutation.mutate({
                        id: user._id,
                        isApproved: e.target.value === "true",
                      })
                    }
                  >
                    <option value="false">Pending</option>
                    <option value="true">Approved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {response?.data?.length === 0 && (
          <div className="p-10 text-center text-gray-500">No users found.</div>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 py-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          disabled={page === 1}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
        >
          Previous
        </button>
        <span className="font-semibold text-gray-700">
          Page {meta.page} of {meta.totalPage || 1}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          disabled={page >= meta.totalPage}
          onClick={() => setPage((old) => old + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Allusers;
