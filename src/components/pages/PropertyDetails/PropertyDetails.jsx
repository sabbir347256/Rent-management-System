import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import { useParams } from "react-router";

const PropertyDetails = () => {

  const { id } = useParams(); 
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProperty = async () => {
    try {
      setLoading(true); 
      
      const response = await fetch(`http://localhost:5000/api/v1/property/${id}`);
      
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
console.log(property)

  if (loading) return <p className="text-center p-10">Loading...</p>;
  const amenities = [
    "24/7 Security",
    "Elevator",
    "Parking Space",
    "Gym",
    "Swimming Pool",
    "Backup Generator",
    "CCTV Surveillance",
    "Rooftop Garden",
    "Intercom",
    "Gas Connection",
  ];

  const nearbyPlaces = [
    { name: "Banani School", dist: "0.5 km away", type: "School" },
    { name: "Banani Hospital", dist: "1.2 km away", type: "Hospital" },
    { name: "Shopping Mall", dist: "0.8 km away", type: "Mall" },
    { name: "Restaurant Hub", dist: "0.3 km away", type: "Food" },
  ];
  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen container">
      <div className="flex flex-col lg:flex-row gap-8 mt-20 pb-20">
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
            <div className="relative h-[400px]">
              <img
                src={property?.images[0]}
                alt="Modern Apartment"
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
                <Heart className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 p-2">
              {property?.images?.map((i) => (
                <img
                  key={i}
                  src={i}
                  alt="thumb"
                  className="rounded-lg cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h1 className="text-2xl font-bold text-slate-800">
              Modern 2 Bedroom Apartment in Prime Location
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> House 45, Road 12, Banani, Dhaka
              </span>
              <span className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" /> 4.8 (24 reviews)
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
              <div className="bg-blue-50 p-3 rounded-xl flex items-center gap-3">
                <Bed className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Bedrooms</p>{" "}
                  <p className="font-bold text-blue-900 text-sm">2</p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl flex items-center gap-3">
                <Bath className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Bathrooms</p>{" "}
                  <p className="font-bold text-blue-900 text-sm">2</p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl flex items-center gap-3">
                <Square className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Sq Ft</p>{" "}
                  <p className="font-bold text-blue-900 text-sm">1200</p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl flex items-center gap-3">
                <Building2 className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Type</p>{" "}
                  <p className="font-bold text-blue-900 text-sm">Apartment</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience luxury living in this beautifully designed 2-bedroom
                apartment located in the heart of Banani. Perfect for families
                or professionals seeking comfort and convenience.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Amenities & Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenities.map((item) => (
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
              <h3 className="font-bold text-lg mb-4">Nearby Places</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {nearbyPlaces.map((place) => (
                  <div
                    key={place.name}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        🏫
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{place.name}</p>
                        <p className="text-xs text-gray-500">{place.dist}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-bold text-lg mb-4">Location</h3>
              <div className="w-full h-64 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200 flex flex-col items-center justify-center text-blue-600">
                <MapPin className="w-8 h-8 mb-2" />
                <p className="font-medium text-sm">
                  Interactive map will be displayed here
                </p>
                <p className="text-xs text-blue-400">
                  House 45, Road 12, Banani, Dhaka 1213
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
                  <p className="text-3xl font-black text-blue-600">৳ 35,000</p>
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
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                  <MessageSquare className="w-5 h-5" /> Contact Owner
                </button>
                <button className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition">
                  <Calendar className="w-5 h-5" /> Schedule Visit
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-blue-600">
                  <div className="p-2 bg-pink-50 rounded-lg">
                    <Phone className="w-4 h-4 text-pink-500" />
                  </div>
                  Call for inquiry
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-blue-600">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Mail className="w-4 h-4 text-purple-500" />
                  </div>
                  Get details via email
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4">Property Manager</h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/api/placeholder/100/100"
                  alt="Manager"
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-50"
                />
                <div>
                  <p className="font-bold text-slate-800">Rahim Khan</p>
                  <p className="text-xs text-gray-500">
                    Senior Property Manager
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-500 flex items-center text-xs font-bold">
                      <Star className="w-3 h-3 fill-current mr-1" /> 4.9
                    </span>
                    <span className="text-gray-300 text-xs">•</span>
                    <span className="text-gray-500 text-xs">45 properties</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-4 mb-4">
                <Zap className="text-orange-500 fill-current" />
                <div>
                  <p className="text-xs font-bold text-blue-900">
                    Typical Response Time
                  </p>
                  <p className="text-xs text-blue-600">2 hours</p>
                </div>
              </div>
              <button className="w-full border border-blue-200 text-blue-600 py-3 rounded-xl text-sm font-bold hover:bg-blue-50 transition">
                View Full Profile
              </button>
            </div>

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
    </div>
  );
};

export default PropertyDetails;
