import React from "react";
import { useForm } from "react-hook-form";

const FilterSlideBar = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={() => reset()}
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          Reset All
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Search
          </label>
          <input
            {...register("search")}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by title or location..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Property Type
          </label>
          <select
            {...register("type")}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
          >
            <option>All Types</option>
            <option>Apartment</option>
            <option>House</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex items-center gap-2">
            <input
              {...register("minPrice")}
              placeholder="Min"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
            />
            <span className="text-gray-400">to</span>
            <input
              {...register("maxPrice")}
              placeholder="Max"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Bedrooms
          </label>
          <div className="grid grid-cols-4 gap-2">
            {["1", "2", "3", "4"].map((num) => (
              <label key={num} className="cursor-pointer">
                <input
                  type="radio"
                  {...register("bedrooms")}
                  value={num}
                  className="hidden peer"
                />
                <div className="p-2 text-center bg-gray-50 border border-gray-200 rounded-lg peer-checked:bg-blue-600 peer-checked:text-white transition-all">
                  {num}
                </div>
              </label>
            ))}
            <label className="col-span-4 cursor-pointer">
              <input
                type="radio"
                {...register("bedrooms")}
                value="5+"
                className="hidden peer"
              />
              <div className="p-2 text-center bg-gray-50 border border-gray-200 rounded-lg peer-checked:bg-blue-600 peer-checked:text-white transition-all">
                5+
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default FilterSlideBar;
