import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PendingManager = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pendingManagers"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:5000/api/v1/user/pending-manager",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      return result.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
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
      if (!response.ok) throw new Error("Update failed");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingManagers"]);
    },
  });

  if (isLoading)
    return <div className="p-10 text-center font-semibold">Loading...</div>;
  if (isError)
    return (
      <div className="p-10 text-red-500 text-center font-semibold">
        Error fetching data
      </div>
    );

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  NID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.nidNo}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        user.isApproved === false
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.isApproved === false
                        ? "Pending"
                        : "Approved"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={user.auths[0]?.isApproved ? "true" : "false"}
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
      </div>
    </div>
  );
};

export default PendingManager;
