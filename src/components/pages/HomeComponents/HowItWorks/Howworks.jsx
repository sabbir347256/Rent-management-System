import React from "react";

const Howworks = () => {
  const steps = [
    {
      id: 1,
      title: "Search & Filter",
      description:
        "Browse thousands of verified properties with advanced filters to find your perfect match",
      icon: "🔍",
    },
    {
      id: 2,
      title: "Connect Directly",
      description:
        "Chat with property managers, schedule visits, and ask all your questions",
      icon: "📞",
    },
    {
      id: 3,
      title: "Move In",
      description:
        "Complete the booking, sign the agreement, and get the keys to your new home",
      icon: "🎉",
    },
  ];
  return (
    <section className="container dynamic-Padding bg-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div className="flex items-center gap-4">
          <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
        </div>
        <p className="text-gray-500 font-medium">
          Get your dream home in 3 easy steps
        </p>
      </div>

      <div className="border-t border-gray-100 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-blue-200">
                {step.id}
              </div>

              <div className="text-5xl mb-8 transform group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Howworks;
