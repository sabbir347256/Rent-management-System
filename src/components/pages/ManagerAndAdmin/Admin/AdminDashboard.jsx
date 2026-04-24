import React from "react";
import { NavLink } from "react-router";

const AdminDashboard = () => {
  const stats = [
    {
      label: "Total Users",
      value: 0,
      icon: "👥",
      color: "from-blue-600 to-indigo-600",
    },
    {
      label: "Total Managers",
      value: 0,
      icon: "🏢",
      color: "from-green-500 to-teal-500",
    },
    {
      label: "Pending Managers",
      value: 0,
      icon: "⌛",
      color: "from-orange-400 to-yellow-500",
      review: true,
    },
    {
      label: "Total Properties",
      value: 0,
      icon: "🏠",
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Pending Properties",
      value: 0,
      icon: "🔍",
      color: "from-yellow-400 to-orange-500",
      review: true,
    },
    {
      label: "Total Bookings",
      value: 0,
      icon: "📋",
      color: "from-blue-400 to-cyan-500",
    },
    {
      label: "Active Bookings",
      value: 0,
      icon: "⚡",
      color: "from-pink-500 to-rose-500",
    },
    {
      label: "Total Reviews",
      value: 0,
      icon: "⭐",
      color: "from-indigo-500 to-blue-700",
    },
    {
      label: "Total Revenue",
      value: "৳0",
      icon: "💰",
      color: "from-red-500 to-orange-500",
    },
    {
      label: "Service Fees",
      value: "৳0",
      icon: "💵",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const actions = [
    { title: "Manager Approvals", path : "/pending-manager", subtitle: "0 pending", icon: "🤵" },
    { title: "Property Approvals", path : "/all-property", subtitle: "0 pending", icon: "🏘️" },
    { title: "Manage Users", path : "/manage-users", subtitle: "View all users", icon: "👥" },
    { title: "All Properties", path : "/all-type-property", subtitle: "Manage listings", icon: "🏠" },
    { title: "All Bookings", path : "", subtitle: "Monitor bookings", icon: "📅" },
    { title: "All Managers", path : "/all-manager", subtitle: "Manage managers", icon: "🏢" },
  ];
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10  text-slate-900">
      <div className="container pt-10">
        <header className="flex justify-between items-end mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-xs font-medium text-slate-500 hidden sm:block">
            Manage your rental platform
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative group flex items-center p-5 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${stat.color}`}
              />

              <div className="flex items-center justify-center w-12 h-12 bg-slate-50 rounded-lg text-2xl mr-4">
                {stat.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-blue-600">
                    {stat.value}
                  </span>
                  {stat.review && (
                    <button className="text-[10px] font-bold text-blue-500 hover:underline">
                      Review →
                    </button>
                  )}
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-slate-800">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {actions?.map((action, idx) => (
             <NavLink to={action?.path} key={idx}>
               <div
               
                className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {action.icon}
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">
                  {action.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                  {action.subtitle}
                </p>
              </div>
             </NavLink>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6 text-slate-800">
            Recent Activities
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {["Recent Users", "Recent Properties", "Recent Bookings"].map(
              (title, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-sm border border-slate-100 min-h-[180px]"
                >
                  <div className="p-4 border-b border-slate-50">
                    <h3 className="text-sm font-bold text-slate-700">
                      {title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="w-full h-[1px] bg-slate-50" />
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
