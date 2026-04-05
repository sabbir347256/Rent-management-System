import React from "react";

const Features = () => {
  const features = [
    {
      title: "Verified Listings",
      description:
        "Every property is verified by our team to ensure authenticity and quality",
      icon: "🏠", // Anda bisa mengganti dengan icon image/lucide-react
      highlight: true,
    },
    {
      title: "Direct Contact",
      description:
        "Chat directly with property owners and managers, no middlemen involved",
      icon: "💬",
      highlight: false,
    },
    {
      title: "Transparent Pricing",
      description: "No hidden fees or commissions, see the real price upfront",
      icon: "💰",
      highlight: false,
    },
    {
      title: "Secure Payments",
      description:
        "Safe and encrypted payment processing for your peace of mind",
      icon: "🔒",
      highlight: false,
    },
  ];
  return (
    <section className="container bg-white dynamic-Padding">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-4">
        <div className="flex items-center gap-4">
          <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl font-bold text-gray-900">
            Everything You Need in One Place
          </h2>
        </div>
        <p className="text-gray-500 max-w-xs md:text-right">
          Experience the future of hassle-free property rental
        </p>
      </div>

      <div className="border-t border-gray-100 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-10 rounded-[2rem] transition-all duration-500 flex flex-col items-center text-center border-2 
                ${
                  feature.highlight
                    ? "border-blue-100 bg-white shadow-xl shadow-blue-50"
                    : "border-transparent bg-white hover:border-blue-50 hover:shadow-xl hover:shadow-gray-100"
                }`}
            >
              <div className="text-5xl mb-8 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 px-2 leading-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>

              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-500 rounded-full transition-all duration-300 group-hover:w-20`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
