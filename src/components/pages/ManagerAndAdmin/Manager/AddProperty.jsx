import React from "react";
import { useForm } from "react-hook-form";

const AddProperty = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const inputClass =
    "w-full p-2.5 mt-1 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all";
  const labelClass =
    "block text-[11px] font-bold text-gray-700 uppercase tracking-tight";
  const sectionTitle = "text-lg font-extrabold text-slate-800 mb-6";
  const checkboxCard =
    "flex items-center p-3 bg-gray-50/50 border border-gray-100 rounded-lg hover:bg-white hover:border-blue-200 transition-all cursor-pointer";

  return (
    <div className="">
      <div className=" ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          <section>
            <h2 className={sectionTitle}>Basic Information</h2>
            <div className="grid gap-6">
              <div>
                <label className={labelClass}>Property Title *</label>
                <input
                  {...register("title", { required: true })}
                  placeholder="e.g. Modern 2 Bedroom Apartment in Banani"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Description *</label>
                <textarea
                  {...register("description", { required: true })}
                  rows="4"
                  placeholder="Describe your property..."
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Property Type *</label>
                  <select {...register("type")} className={inputClass}>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Studio</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Monthly Rent (৳) *</label>
                  <input
                    type="number"
                    {...register("rent")}
                    placeholder="25000"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className={sectionTitle}>Location</h2>
            <div className="grid gap-6">
              <div>
                <label className={labelClass}>Address *</label>
                <input
                  {...register("address")}
                  placeholder="House #00, Road #0"
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>City *</label>
                  <input
                    {...register("city")}
                    placeholder="Dhaka"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Area *</label>
                  <input
                    {...register("area")}
                    placeholder="Banani, Gulshan..."
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className={sectionTitle}>Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Bedrooms *</label>
                <input
                  type="number"
                  {...register("bedrooms")}
                  defaultValue="1"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Bathrooms *</label>
                <input
                  type="number"
                  {...register("bathrooms")}
                  defaultValue="1"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Area (sqft) *</label>
                <input
                  type="number"
                  {...register("sqft")}
                  placeholder="1200"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className={sectionTitle}>Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Furnished",
                "Parking",
                "Gym",
                "Swimming Pool",
                "Elevator",
                "24/7 Security",
                "Generator",
              ].map((f) => (
                <label key={f} className={checkboxCard}>
                  <input
                    type="checkbox"
                    {...register(`features.${f}`)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-600">
                    {f}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className={sectionTitle}>Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "24/7 Security",
                "Elevator",
                "Parking Space",
                "Gym",
                "Swimming Pool",
                "Generator",
                "CCTV",
                "Rooftop Garden",
                "Intercom",
                "Gas Connection",
                "WiFi",
                "AC",
                "Balcony",
                "Store Room",
                "Servant Room",
              ].map((a) => (
                <label key={a} className="cursor-pointer">
                  <input
                    type="checkbox"
                    {...register(`amenities.${a}`)}
                    className="hidden peer"
                  />
                  <span className="px-4 py-2 text-[11px] font-bold border border-gray-200 rounded-md bg-gray-50 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition-all inline-block">
                    {a}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className={sectionTitle}>Property Images *</h2>
            <p className="text-xs text-gray-400 mb-4">
              Upload at least 3 images (Max 10)
            </p>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-blue-50/50 hover:border-blue-300 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                    <span>📁</span> Upload Images
                  </span>
                </div>
                <input type="file" multiple className="hidden" />
              </label>
            </div>
          </section>

          <div className="flex justify-end gap-4 pt-10 border-t border-gray-100">
            <button
              type="button"
              className="px-8 py-2.5 text-sm font-bold text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 transition-all"
            >
              Submit for Approval
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
