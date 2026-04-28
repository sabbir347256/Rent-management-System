import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const AddProperty = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setSelectedImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    URL.revokeObjectURL(updatedImages[index].url);
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    selectedImages.forEach((img) => {
      formData.append("images", img.file);
    });

    formData.append("propertyTitle", data.propertyTitle);
    formData.append("availableDate", data.availableDate);
    formData.append("description", data.description);
    formData.append("propertyType", data.propertyType.toLowerCase());
    formData.append("monthlyRent", Number(data.monthlyRent));
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("area", data.area);
    formData.append("bedroom", Number(data.bedroom));
    formData.append("bathroom", Number(data.bathroom));
    formData.append("squareArea", Number(data.squareArea));

    const selectedFeatures = Object.keys(data.features || {}).filter(
      (key) => data.features[key],
    );
    const selectedAmenities = Object.keys(data.amenities || {}).filter(
      (key) => data.amenities[key],
    );

    formData.append("features", JSON.stringify(selectedFeatures));
    formData.append("amenities", JSON.stringify(selectedAmenities));

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/property/create-property",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: formData,
        },
      );

      const result = await response.json();
      if (result.success) {
        toast.success("Property Created Successfully");
        reset();
        setSelectedImages([]);
      } else {
        console.log("Server Error:", result.message);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full p-2.5 mt-1 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none";
  const labelClass =
    "block text-[11px] font-bold text-gray-700 uppercase tracking-tight mb-1";

  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section>
          <h2 className="text-lg font-bold mb-4 border-b pb-2">
            Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Property Title *</label>
              <input
                {...register("propertyTitle", { required: true })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Description *</label>
              <textarea
                {...register("description", { required: true })}
                rows="3"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Property Type *</label>
                <select {...register("propertyType")} className={inputClass}>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="flat">Flat</option>
                  <option value="office">Office</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Monthly Rent *</label>
                <input
                  type="number"
                  {...register("monthlyRent")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase mb-1 ml-1">
                  Available From
                </label>
                <input
                  type="date"
                  {...register("availableDate", { required: "Date is required" })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                />
                {errors.date && (
                  <p className="text-[10px] text-red-500 ml-1 font-bold mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4 border-b pb-2">
            Location & Details
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Address</label>
              <input {...register("address")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input {...register("city")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Area</label>
              <input {...register("area")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Bedrooms</label>
              <input
                type="number"
                {...register("bedroom")}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Bathrooms</label>
              <input
                type="number"
                {...register("bathroom")}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Sqft</label>
              <input
                type="number"
                {...register("squareArea")}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Images</h2>
          <div className="grid grid-cols-4 gap-4">
            {selectedImages.map((img, index) => (
              <div
                key={index}
                className="relative h-24 border rounded overflow-hidden"
              >
                <img
                  src={img.url}
                  alt="p"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
            <label className="h-24 border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <span className="text-xs text-gray-500">+ Upload</span>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className={labelClass}>Features</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Parking", "Generator", "Lift", "Security"].map((f) => (
                <label
                  key={f}
                  className="flex items-center gap-2 text-sm border p-2 rounded"
                >
                  <input type="checkbox" {...register(`features.${f}`)} /> {f}
                </label>
              ))}
            </div>
          </section>
          <section>
            <h2 className={labelClass}>Amenities</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {["WiFi", "AC", "Gas", "Gym"].map((a) => (
                <label
                  key={a}
                  className="flex items-center gap-2 text-sm border p-2 rounded"
                >
                  <input type="checkbox" {...register(`amenities.${a}`)} /> {a}
                </label>
              ))}
            </div>
          </section>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Property...
            </>
          ) : (
            "Create Property"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
