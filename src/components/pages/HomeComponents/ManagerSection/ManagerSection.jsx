import React from "react";
import { FaArrowRight, FaCheckCircle, FaStar } from "react-icons/fa";

const ManagerSection = () => {
  const managers = [
    {
      name: "Tanmoy",
      role: "Senior Property Manager",
      rating: 4.9,
      properties: 45,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Ayesha Begum",
      role: "Residential Specialist",
      rating: 4.8,
      properties: 32,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Samiul Islam",
      role: "Commercial Expert",
      rating: 5.0,
      properties: 28,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  const features = [
    "Background verified managers",
    "Average response time: 2 hours",
    "98% customer satisfaction rate",
    "Direct contact guaranteed",
  ];
  return (
    <section className=" bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center container dynamic-Padding">
        <div className="space-y-8">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            Trusted Network
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Connect with Verified <br /> Property Managers
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
            Our network of 1,200+ verified property managers ensures you get
            professional service and genuine listings. No brokers, no
            commission, just honest deals.
          </p>

          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-gray-700 font-medium"
              >
                <span className="text-blue-600">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 active:scale-95">
            Browse All Managers
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-50 border border-gray-100 p-8 md:p-10 relative">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900">
              Top Rated Managers
            </h3>
            <div className="flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              <FaCheckCircle size={12} /> Verified
            </div>
          </div>

          <div className="space-y-5">
            {managers.map((manager, index) => (
              <div
                key={index}
                className="flex items-center p-5 bg-gray-50 rounded-[1.5rem] hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all group"
              >
                <div className="relative">
                  <img
                    src={manager.image}
                    alt={manager.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="ml-5 flex-grow grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-gray-900">{manager.name}</h4>
                    <p className="text-xs text-gray-400">{manager.role}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                      <FaStar className="text-yellow-400" /> {manager.rating}
                    </div>
                    <p className="text-[10px] text-gray-400">
                      • {manager.properties} properties
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 text-blue-600 font-bold flex items-center justify-center gap-2 hover:gap-4 transition-all">
            See All Managers <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ManagerSection;
