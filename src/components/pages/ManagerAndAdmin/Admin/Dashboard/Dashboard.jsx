import React from "react";
import {
  Download,
  DollarSign,
  Calendar,
  Users,
  Clock,
  Percent,
  RotateCcw,
  Star,
  Globe,
  BarChart2,
  Home,
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from "recharts";
import { useFetchQuery } from "../../../../utils/useFetchQuery";

const Dashboard = () => {
  const { data: allBooking, isLoading, isError } = useFetchQuery('getbooking', 'http://localhost:5000/api/v1/booking');
  const { data: Allusers } = useFetchQuery('alluser', 'http://localhost:5000/api/v1/user/all-users');
  const { data: AllManager } = useFetchQuery('allmanager', 'http://localhost:5000/api/v1/user/all-manager');
  const { data: allProperty } = useFetchQuery('allproperty', 'http://localhost:5000/api/v1/property');

  const approvedManager = AllManager?.data?.filter(data => (data?.isApproved === false));

  console.log(allProperty)

  const totalServiceFee = allBooking?.data?.reduce((total, item) => {
    const fee = parseFloat(item?.serviceFee) || 0;
    return total + fee;
  }, 0);


  const chartData = [
    { name: "Total Bookings", value: allBooking?.data?.length || 0, color: "#2563eb" },
    { name: "All Property", value: allProperty?.data?.length || 0, color: "#ea580c" },
    { name: "All Users", value: Allusers?.data?.length || 0, color: "#dc2626" },
    { name: "All Manager", value: AllManager?.data?.length || 0, color: "#059669" },
    { name: "Pending Manager", value: approvedManager?.length || 0, color: "#059669" },
  ];


  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Good morning, Admin
          </h1>
          <p className="text-gray-500 mt-1">
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <DollarSign className="text-emerald-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{totalServiceFee}</h2>
          <p className="text-gray-400 text-md mt-3">Total Revenue</p>

        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <Calendar className="text-blue-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{allBooking?.data?.length > 0 ? allBooking?.data?.length : "0"}</h2>
          <p className="text-gray-400 text-md mt-3">Total Bookings</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="bg-orange-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <Users className="text-orange-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{Allusers?.data?.length > 0 ? Allusers?.data?.length : "0"}</h2>
          <p className="text-gray-400 text-md mt-3">All Users</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="bg-red-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <Users className="text-red-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{AllManager?.data?.length > 0 ? AllManager?.data?.length : "0"}</h2>
          <p className="text-gray-400 text-md mt-3">All Manager</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <Users className="text-emerald-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{approvedManager?.length > 0 ? approvedManager?.length : "0"}</h2>
          <p className="text-gray-400 text-md mt-3">Pending Manager</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <Home className="text-blue-600" size={20} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{allProperty?.data?.length > 0 ? allProperty?.data?.length : "0"}</h2>
          <p className="text-gray-400 text-md mt-3">All Property</p>
        </div>
      </div>


      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">Platform Overview</h3>
          <p className="text-gray-500 text-sm">Visual representation of your current data</p>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 14 }}
                dy={10}
              />
              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                barSize={60}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
