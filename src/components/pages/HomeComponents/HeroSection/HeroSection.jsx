import React from "react";
import { useForm } from "react-hook-form";
import { FiMapPin, FiSearch } from "react-icons/fi";

const HeroSection = () => {
  const stats = [
    { value: "12,450+", label: "Active Listings" },
    { value: "4.8/5", label: "User Rating" },
    { value: "24/7", label: "Support" },
  ];
  const {
    register,
    handleSubmit,
    // control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      propertyType: "", 
      price: "", 
    },
  });
  const onSubmit = (data) => {
    console.log("Form Submitted Data:", data);
    alert(
      `Searching for: ${data.location}, ${data.propertyType}, ${data.price}`,
    );
  };
  return (
    <div className="w-full min-h-[85vh] bg-gradient-to-br from-[#1E4DFF] via-[#3381FF] to-[#0041C2] flex flex-col items-center justify-center text-center mobileResponsiveDynamicPM">
      <div className=" mb-10 md:mb-14 text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          Find Your Perfect Rental Home
        </h1>
        <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
          Connect directly with verified property managers. Hassle-free,
          transparent, and fast.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mb-16 md:mb-20 container" 
      >
        <div className="bg-white rounded-2xl px-4 p-2.5 shadow-xl flex flex-col md:flex-row items-center gap-2">
          <div className="relative flex-grow w-full">
            <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF4C6A] text-xl" />
            <input
              {...register("location", { required: true })} // Mendaftarkan input ke react-hook-form
              type="text"
              placeholder="Location, area or city..."
              className="w-full h-14 pl-12 pr-4 bg-[#F9FBFF] rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100 transition duration-150"
            />
          </div>

          <div className="relative w-full md:w-56">
            <select
              {...register("propertyType")}
              className="w-full h-14 px-5 bg-[#F9FBFF] rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100 appearance-none transition duration-150 cursor-pointer"
            >
              <option value="" disabled hidden>
                All Types
              </option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="villa">Villa</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="relative w-full md:w-56">
            <select
              {...register("price")}
              className="w-full h-14 px-5 bg-[#F9FBFF] rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100 appearance-none transition duration-150 cursor-pointer"
            >
              <option value="" disabled hidden>
                Any Price
              </option>
              <option value="low">Under $1,000/mo</option>
              <option value="medium">$1,000 - $2,500/mo</option>
              <option value="high">$2,500 - $5,000/mo</option>
              <option value="luxury">$5,000+/mo</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto h-14 md:h-14 md:px-8 bg-[#3366FF] hover:bg-[#2552E0] text-white rounded-full font-semibold flex items-center justify-center gap-3 transition duration-200 shadow-md whitespace-nowrap active:scale-[0.98]"
          >
            <FiSearch className="text-xl" />
            <span>Search</span>
          </button>
        </div>

        {errors.location && (
          <p className="text-[#FFB3B3] text-sm mt-3 ml-6 text-left">
            Please enter a location
          </p>
        )}
      </form>

      <div className="w-full max-w-3xl mx-auto flex flex-row items-center justify-center gap-10 md:gap-20 text-white">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold mb-1 tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs md:text-sm text-blue-100 font-normal uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
