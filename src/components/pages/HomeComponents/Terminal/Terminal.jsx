import React from "react";
import { FaStar } from "react-icons/fa";

const Terminal = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Rented in Banani",
      content:
        "Found my dream apartment in just 2 days! The direct contact with the owner made everything so smooth and transparent. Highly recommend!",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 2,
      name: "Karim Rahman",
      role: "Rented in Gulshan",
      content:
        "No broker fees saved me thousands! The platform is easy to use and all listings are genuine. Best rental experience ever.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 3,
      name: "Fahim Hossain",
      role: "Property Manager",
      content:
        "As a property manager, this platform helped me reach genuine tenants directly. No more dealing with brokers. Win-win!",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
  ];
  return (
    <section className="container dynamic-Padding bg-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-4">
        <div className="flex items-center gap-4">
          <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Reviews
          </span>
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
        </div>
        <p className="text-gray-500 font-medium italic">
          Real experiences from real renters
        </p>
      </div>

      <div className="border-t border-gray-100 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="relative bg-white p-8 rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-50 flex flex-col justify-between group hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

              <div className="mb-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" size={18} />
                  ))}
                </div>

                <p className="text-gray-600 italic leading-relaxed text-lg">
                  "{review.content}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-300 ring-2 ring-blue-50"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Terminal;
