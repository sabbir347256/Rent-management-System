import React from "react";
import { NavLink } from "react-router";

const ManagerDashboard = () => {
  const stats = [
    { label: "Total Properties", value: 0, icon: "🏠" },
    { label: "Available", value: 0, icon: "✅" },
    { label: "Rented", value: 0, icon: "🔑" },
    { label: "Total Bookings", value: 0, icon: "📅" },
    { label: "Pending", value: 0, icon: "⌛" },
    { label: "Total Revenue", value: "৳0", icon: "💰" },
    { label: "Total Views", value: 0, icon: "👁️" },
    { label: "Active Bookings", value: 0, icon: "⚡" },
  ];

  const actions = [
    {
      title: "My Properties",
      path: "/my-properties",
      desc: "View and manage your listings",
      icon: "🏘️",
    },
    {
      title: "Add Property",
      path: "/add-property",
      desc: "List a new property",
      icon: "➕",
    },
    {
      title: "Bookings",
      path: "/bookings",
      desc: "Manage property bookings",
      icon: "📋",
    },
    {
      title: "Reviews",
      path: "/reviews",
      desc: "View and respond to reviews",
      icon: "⭐",
    },
  ];
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10  text-slate-900 ">
      <div className="container p">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pt-20">
          <h1 className="text-3xl font-bold tracking-tight">
            Manager Dashboard
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm active:scale-95">
            + Add New Property
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center p-5 bg-white rounded-2xl border-l-[3px] border-blue-500 shadow-sm transition-transform hover:translate-y-[-2px]"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-xl text-2xl mr-4">
                {item.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 leading-tight">
                  {item.value}
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-slate-800">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action, idx) => (
              <NavLink
                to={action.path}
                key={idx}
                className="group flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer text-center"
              >
                <div>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {action.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">
                    {action.title}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-[150px] leading-relaxed">
                    {action.desc}
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-slate-50">
            <h2 className="text-lg font-bold">Recent Bookings</h2>
            <button className="text-blue-600 text-sm font-bold hover:text-blue-800 transition-colors">
              View All →
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-slate-300 mb-2">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-slate-400 text-sm font-medium">
              No bookings yet
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManagerDashboard;
