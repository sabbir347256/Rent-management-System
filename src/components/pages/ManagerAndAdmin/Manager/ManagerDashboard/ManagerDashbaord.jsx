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
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from "recharts";


const ManagerDashbaord = () => {
    return (
        <div className="">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Good morning, Admin
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Here's what's happening with Pura Vida today
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                        <DollarSign className="text-emerald-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">$284,920</h2>
                    <p className="text-gray-400 text-sm mt-1">Total Revenue</p>
                    <div className="text-emerald-500 text-sm font-medium mt-4 flex items-center gap-1">
                        ↗ +18.4% vs last period
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                        <Calendar className="text-blue-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">847</h2>
                    <p className="text-gray-400 text-sm mt-1">Total Bookings</p>
                    <div className="text-emerald-500 text-sm font-medium mt-4 flex items-center gap-1">
                        ↗ +12.1% vs last period
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="bg-orange-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                        <Users className="text-orange-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">3,241</h2>
                    <p className="text-gray-400 text-sm mt-1">Registered Users</p>
                    <div className="text-emerald-500 text-sm font-medium mt-4 flex items-center gap-1">
                        ↗ +7.8% vs last period
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="bg-red-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                        <Clock className="text-red-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">12</h2>
                    <p className="text-gray-400 text-sm mt-1">Pending Actions</p>
                    <div className="text-red-600 text-sm font-medium mt-4 flex items-center gap-1">
                        Requires attention
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                        <DollarSign className="text-emerald-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">$284,920</h2>
                    <p className="text-gray-400 text-sm mt-1">Total Revenue</p>
                    <div className="text-emerald-500 text-sm font-medium mt-4 flex items-center gap-1">
                        ↗ +18.4% vs last period
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                        <Calendar className="text-blue-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">847</h2>
                    <p className="text-gray-400 text-sm mt-1">Total Bookings</p>
                    <div className="text-emerald-500 text-sm font-medium mt-4 flex items-center gap-1">
                        ↗ +12.1% vs last period
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="bg-orange-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                        <Users className="text-orange-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">3,241</h2>
                    <p className="text-gray-400 text-sm mt-1">Registered Users</p>
                    <div className="text-emerald-500 text-sm font-medium mt-4 flex items-center gap-1">
                        ↗ +7.8% vs last period
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="bg-red-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                        <Clock className="text-red-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">12</h2>
                    <p className="text-gray-400 text-sm mt-1">Pending Actions</p>
                    <div className="text-red-600 text-sm font-medium mt-4 flex items-center gap-1">
                        Requires attention
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="bg-red-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                        <Clock className="text-red-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">12</h2>
                    <p className="text-gray-400 text-sm mt-1">Pending Actions</p>
                    <div className="text-red-600 text-sm font-medium mt-4 flex items-center gap-1">
                        Requires attention
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="bg-red-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                        <Clock className="text-red-600" size={20} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">12</h2>
                    <p className="text-gray-400 text-sm mt-1">Pending Actions</p>
                    <div className="text-red-600 text-sm font-medium mt-4 flex items-center gap-1">
                        Requires attention
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashbaord;