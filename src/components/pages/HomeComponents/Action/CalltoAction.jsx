import React from "react";

const CalltoAction = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container dynamic-Padding text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Ready to Find Your Dream Home?
        </h2>

        <p className="text-blue-100 text-lg md:text-xl mb-12 font-medium">
          Join thousands of happy renters who found their perfect place
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-10 py-4 bg-[#2962FF] hover:bg-[#1A50FF] text-white font-bold rounded-xl shadow-lg transition-all active:scale-95">
            Get Started Free
          </button>

          <button className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white/80 hover:bg-white/10 text-white font-bold rounded-xl transition-all active:scale-95">
            List Your Property
          </button>
        </div>
      </div>
    </section>
  );
};

export default CalltoAction;
