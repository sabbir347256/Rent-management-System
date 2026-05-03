import React, { useContext, useEffect, useState } from "react";
import {
  Heart,
  MapPin,
  Star,
  Bed,
  Bath,
  Square,
  Building2,
  ShieldCheck,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Zap,
  Info,
  ShieldCheckIcon,
  X,
} from "lucide-react";
import { useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "../../../AuthProvider/CreateContext";
import DatePicker from "react-datepicker";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;
function RecenterAutomatically({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

const PropertyDetails = () => {
  const { user } = useContext(AuthProvider);
  console.log(user);
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/v1/property/${id}`,
        );

        if (!response.ok) {
          throw new Error("Property not found or Server Error");
        }
        const result = await response.json();
        setProperty(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Fetching error:", error.message);
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  console.log(property);

  const onBookingSubmit = async (data) => {
    const token = localStorage.getItem("accessToken");
    const loadingToast = toast.loading("Sending request...");
    try {
      const bookingData = {
        userName: data.userName,
        userEmail: data.userEmail,
        userPhone: data.userPhone,
        visitDate: data.visitDate,
        propertyId: id,
        userID: user.userId,
      };

      const response = await fetch(
        "http://localhost:5000/api/v1/booking/property",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Booking request sent successfully!", {
          id: loadingToast,
        });
        setIsModalOpen(false);
        reset();
      } else {
        toast.error(result.message || "Failed to send request", {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", error, { id: loadingToast });
    }
  };

  const handleRatingSubmit = async (value) => {
    if (!user?.userId || !property?.user?._id) {
      return toast.error("User information is missing");
    }

    const token = localStorage.getItem("accessToken");
    const loadingToast = toast.loading("Submitting rating...");

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/review/rating",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            managerId: property.user._id,
            userId: user.userId,
            rating: value,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Rating updated!", { id: loadingToast });
        setRating(value);
      } else {
        toast.error(result.message || "Failed to submit rating", {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: loadingToast }, error);
    }
  };

  const [coords, setCoords] = useState({ lat: 23.7661, lng: 90.4304 });

  useEffect(() => {
    const geocodeAddress = async () => {
      const fullAddress =
        property && `$${property.city}`;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`,
        );
        const data = await response.json();
        if (data.length > 0) {
          setCoords({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
        }
      } catch (error) {
        console.error("Geocoding failed", error);
      }
    };

    if (property) {
      geocodeAddress();
    }
  }, [property]);

  if (loading) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="  min-h-screen container py-32">
      <Toaster />
      <div className="flex flex-col lg:flex-row gap-8 pb-20">
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="relative h-[400px]">
            <img
              src={property?.images[0]}
              alt="Modern Apartment"
              className="w-full h-full rounded-md"
            />
          </div>
          <div className=" overflow-hidden bg-white shadow-sm">
            <div className="grid grid-cols-4 gap-2">
              {property?.images?.map((i) => (
                <img
                  key={i}
                  src={i}
                  alt="thumb"
                  className="rounded-md cursor-pointer hover:opacity-80 transition h-[200px] w-full"
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm space-y-4">
            <h1 className="text-2xl font-bold text-slate-800">
              {property?.propertyTitle}
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {property?.area},{property?.city}
                ,{property?.address}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
              <div className="bg-blue-50 p-3 rounded-xl flex items-center gap-3">
                <Bed className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Bedrooms</p>{" "}
                  <p className="font-bold text-blue-900 text-sm">
                    {property?.bedroom}
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl flex items-center gap-3">
                <Bath className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Bathrooms</p>{" "}
                  <p className="font-bold text-blue-900 text-sm">
                    {property?.bathroom}
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl flex items-center gap-3">
                <Square className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Sq Ft</p>{" "}
                  <p className="font-bold text-blue-900 text-sm">
                    {property?.squareArea}
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl flex items-center gap-3">
                <Building2 className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Type</p>{" "}
                  <p className="font-bold text-blue-900 text-sm">
                    {property?.propertyType}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {property?.description}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Amenities & Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property?.amenities?.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property?.features?.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 w-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl shadow-slate-200">
              {coords && (
                <MapContainer
                  center={[coords.lat, coords.lng]}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%", zIndex: 0 }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[coords.lat, coords.lng]}>
                    <Popup className="font-bold">
                      {property?.propertyTitle || "Property Location"}
                    </Popup>
                  </Marker>
                  <RecenterAutomatically lat={coords.lat} lng={coords.lng} />
                </MapContainer>
              )}

              <div className="absolute bottom-6 left-6 right-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-white shadow-xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Location
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {property && ` ${property.area},${property.city},${property.address}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 space-y-6">
          <div className="sticky top-8 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                    Monthly Rent
                  </p>
                  <p className="text-3xl font-black text-blue-600">
                    ৳ {property?.monthlyRent}
                  </p>
                </div>
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  ✓ Available
                </span>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl mb-6 text-sm">
                <span className="text-gray-500">Available from: </span>
                <span className="text-blue-600 font-bold">March 1, 2024</span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200 group"
                >
                  <MessageSquare className="w-5 h-5 group-hover:scale-110 transition" />{" "}
                  Contact Owner
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                <a
                  href={`tel:${property?.user?.contactNo}`}
                  className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                >
                  <div className="p-2 bg-pink-50 rounded-lg">
                    <Phone className="w-4 h-4 text-pink-500" />
                  </div>
                  {property?.user?.contactNo || "Call for inquiry"}
                </a>

                <a
                  href={`mailto:${property?.user?.email}?subject=Inquiry: ${property?.title || "Property"}`}
                  className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                >
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Mail className="w-4 h-4 text-purple-500" />
                  </div>
                  {property?.user?.email || "Get details via email"}
                </a>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4 text-slate-800">
                Property Manager
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    property?.user?.profileImage || "/api/placeholder/100/100"
                  }
                  alt="Manager"
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-50"
                />
                <div>
                  <p className="font-bold text-slate-800">
                    {property?.user?.fullName}
                  </p>
                  <p className="text-xs text-gray-500">Property Manager</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-500 flex items-center text-xs font-bold">
                      <Star className="w-3 h-3 fill-current mr-1" />{" "}
                      {property?.user?.rating || "4.9"}
                    </span>
                    <span className="text-gray-300 text-xs">•</span>
                    <span className="text-gray-500 text-xs">
                      {property?.user?.totalProperties || "45"} properties
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-50 pt-4 mt-2">
                <h3 className="font-bold text-xs mb-3 text-slate-400 uppercase tracking-wider">
                  Rate Manager
                </h3>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingSubmit(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="transition-transform active:scale-90"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-bold text-slate-600">
                    {rating > 0 ? `${rating}/5` : "0/5"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="w-full mt-6 border border-blue-200 text-blue-600 py-3 rounded-xl text-sm font-bold hover:bg-blue-50 transition"
              >
                View Full Profile
              </button>
            </div>

            {isProfileModalOpen && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="relative h-32 bg-[#0f172a]">
                    <button
                      onClick={() => setIsProfileModalOpen(false)}
                      className="absolute right-4 top-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="px-6 pb-8">
                    <div className="relative -mt-12 mb-4">
                      <img
                        src={
                          property?.user?.profileImage ||
                          "/api/placeholder/100/100"
                        }
                        className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                        alt="Profile"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-black text-slate-800">
                          {property?.user?.fullName}
                        </h2>
                        <p className="text-blue-600 font-bold text-sm">
                          Property Manager
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 py-4 border-y border-slate-100">
                        {/* <div className="text-center">
                          <p className="text-xs text-slate-400 uppercase font-bold">
                            Experience
                          </p>
                          <p className="text-lg font-black text-slate-700">
                            5+ Years
                          </p>
                        </div> */}
                        <div className=" border-l border-slate-100">
                          <p className="text-xs text-slate-400 uppercase font-bold">
                            Response
                          </p>
                          <p className="text-lg font-black text-slate-700">
                            2 Hours
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="p-2 bg-slate-50 rounded-lg">
                            <Phone className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">
                            {property?.user?.contactNo || "+880 1XXX-XXXXXX"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="p-2 bg-slate-50 rounded-lg">
                            <Mail className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">
                            {property?.user?.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="p-2 bg-slate-50 rounded-lg">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">
                            Dhaka, Bangladesh
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsProfileModalOpen(false)}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold mt-4 hover:bg-slate-800 transition"
                      >
                        Close Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-blue-900">Safety Tips</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Always visit property in person",
                  "Verify documents before payment",
                  "Never share financial details via chat",
                  "Report suspicious activity",
                ].map((tip, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2 text-xs text-blue-800 leading-tight"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-800">
                Inquiry Form
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white rounded-full transition text-slate-400 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onBookingSubmit)}
              className="p-8 space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase ml-1">
                  Full Name
                </label>
                <input
                  {...register("userName", { required: "Name is required" })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="Enter your name"
                />
                {errors.userName && (
                  <p className="text-[10px] text-red-500 ml-1 font-bold">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase ml-1">
                  Email Address
                </label>
                <input
                  {...register("userEmail", { required: "Email is required" })}
                  type="email"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="example@mail.com"
                />
                {errors.userEmail && (
                  <p className="text-[10px] text-red-500 ml-1 font-bold">
                    {errors.userEmail.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase ml-1">
                  Phone Number
                </label>
                <input
                  {...register("userPhone", { required: "Phone is required" })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="017XXXXXXXX"
                />
                {errors.userPhone && (
                  <p className="text-[10px] text-red-500 ml-1 font-bold">
                    {errors.userPhone.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase ml-1">
                  Schedule Visit (Date & Time)
                </label>
                <input
                  type="datetime-local"
                  {...register("visitDate", {
                    required: "Date and time are required",
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const now = new Date();
                      return (
                        selectedDate > now ||
                        "Please select a future date and time"
                      );
                    },
                  })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                />
                {errors.visitDate && (
                  <p className="text-[10px] text-red-500 ml-1 font-bold">
                    {errors.visitDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase ml-1">
                  Message (Optional)
                </label>
                <textarea
                  {...register("message")}
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium resize-none"
                  placeholder="Any specific questions?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
