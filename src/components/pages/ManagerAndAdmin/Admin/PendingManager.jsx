import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../../utils/PageHeader";
import { Users2 } from "lucide-react";
import { useEffect, useState } from "react";

const PendingManager = () => {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(inputValue);
      setPage(1);
    }, 500) ;

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  const {
    data: response,
    isLoading,
  } = useQuery({
    queryKey: ["pendingManagers", searchTerm, page],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:5000/api/v1/user/pending-manager?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
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
      const res = await fetch(
        `http://localhost:5000/api/v1/user/update-status/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isApproved: status === "true" }),
        },
      );
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingManagers"]);
    },
  });

  if (isLoading && !searchTerm)
    return (
      <div className="p-10 text-center font-semibold text-emerald-600">
        Loading...
      </div>
    );

  const managers = response?.data || [];
  const meta = response?.meta || {};

  
  return (
    <div className="min-h-screen">
      <PageHeader title="Manager Approval" icon={Users2} />

      <div className="mb-6 flex justify-between items-center   border border-gray-100">
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

      <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-100 bg-white">
        <table className="min-w-full">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                SL
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Full Name
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Email
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                NID Number
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Role
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {managers.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-emerald-50/30 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                  {(page - 1) * limit + index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                  {user.fullName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.nidNo}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                  {user.role}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      !user.isApproved
                        ? "bg-amber-50 text-amber-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {!user.isApproved ? "Pending" : "Approved"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2 cursor-pointer outline-none"
                    value={user.isApproved ? "true" : "false"}
                    onChange={(e) =>
                      updateStatusMutation.mutate({
                        id: user._id,
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

export default PendingManager;
