import React from "react";
import { useForm } from "react-hook-form";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { Link } from "react-router";

const HeroSection = () => {
const stats = [
  { value: "12K+", label: "Verified Listed Properties" },
  { value: "5K+", label: "Happy Renters" },
  { value: "100+", label: "Property Managers" },
];
  return (
   <div className="container dynamic-Padding w-full min-h-[90vh] bg-white flex flex-col md:flex-row items-center justify-center gap-12 ">
      <div className="w-full md:w-1/2 flex flex-col items-start text-left space-y-8">
        <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-inner border border-blue-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          #1 Rental Platform in Dhaka
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 leading-tight">
          Find Your Perfect <span className="text-blue-600">Rental Home</span> Without the Hassle.
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
          Connect directly with verified property managers. Hassle-free, transparent, and fast. Discover verified listings that match your lifestyle and budget.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link to="/properties" className="w-full sm:w-auto h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-blue-500/20 active:scale-[0.98] text-lg">
            Browse Properties
          </Link>
          <Link to="/about" className="w-full sm:w-auto h-14 px-10 bg-white hover:bg-gray-50 text-gray-900 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-200 border border-gray-200 active:scale-[0.98] text-lg">
            Learn More
          </Link>
        </div>

        <div className="w-full pt-10 border-t border-gray-100">
          <div className="flex flex-row items-center justify-start gap-10 md:gap-16 text-gray-950">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-start">
                <span className="text-3xl md:text-4xl font-bold mb-1 tracking-tight text-blue-600">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-600 font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-[500px] md:h-[650px] relative">
        <div className="absolute inset-0 bg-blue-100 rounded-[3rem] rotate-3 scale-105 z-0"></div>
        <img
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop"
          alt="Modern apartment building exterior"
          className="w-full h-full object-cover rounded-[3rem] shadow-2xl z-10 relative border-4 border-white"
        />
        <div className="absolute bottom-10 -left-16 bg-white p-5 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-gray-100">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=100&h=100&auto=format&fit=crop" alt="User" className="w-16 h-16 rounded-xl object-cover" />
            <div>
                <p className="text-sm font-bold text-gray-950">"Found my dream apartment in days!"</p>
                <p className="text-xs text-gray-500">- Sarah J., Verified Renter</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
