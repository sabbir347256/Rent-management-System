import React from "react";
import { FaBath, FaBed, FaHeart, FaMapMarkerAlt, FaRulerCombined, FaStar } from "react-icons/fa";
import { NavLink } from "react-router";

const SingleCard = ({ data }) => {
  console.log(data)
  return (
    <div>
      <NavLink to={`/property-details/${data?._id}`}>
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
          <div className="relative h-64 overflow-hidden">
            <img
              src={data.images[0]}
              alt={data.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-yellow-400 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
              <FaStar size={10} /> Featured
            </div>
            <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors">
              <FaHeart size={18} />
            </button>
            <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-5 py-1.5 rounded-lg text-sm font-semibold">
              {data.type}
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 leading-tight max-w-[70%]">
                {data.propertyTitle}
              </h3>
              <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg flex items-center gap-1 font-bold text-sm">
                <FaStar className="text-yellow-400" /> {data.rating}
              </div>
            </div>

            <div className="flex items-center text-gray-500 text-sm mb-6">
              <FaMapMarkerAlt className="text-pink-500 mr-2" />
              {data.address} - {data.city}
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="text-blue-600 text-xl">
                  <FaBed />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {data.beds} Beds
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-blue-400 text-xl">
                  <FaBath />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {data.baths} Baths
                </span>
              </div>
              <div className="flex items-center gap-3 col-span-2">
                <div className="text-purple-400 text-xl">
                  <FaRulerCombined />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {data.sqft} sqft
                </span>
              </div>
            </div>

            <hr className="border-gray-100 mb-6" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Monthly Rent
                </p>
                <p className="text-2xl font-black text-blue-600">
                  ৳ {data.monthlyRent.toLocaleString()}
                </p>
              </div>
              <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-300">
                View Details
              </button>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SingleCard;
