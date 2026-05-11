import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Search, Scale, Bed, Bath, Square, MapPin, Building2 } from "lucide-react";


const PropertyColumn = ({ data, isPlaceholder }) => {
    return (
        <div className={`flex-1 min-w-[300px] bg-white rounded-3xl p-6 ${!isPlaceholder ? 'border border-slate-100 shadow-sm' : 'border-2 border-dashed border-slate-200 flex flex-col items-center justify-center min-h-[500px]'
            }`}>
            {isPlaceholder ? (
                <div className="text-center space-y-4">
                    <div className="bg-slate-50 p-4 rounded-full inline-block">
                        <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-medium">Search a property to compare</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <img src={data?.images?.[0]} className="w-full h-64 object-cover rounded-xl" alt="" />
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">{data?.propertyTitle}</h3>
                        <p className="text-blue-600 font-black text-2xl mt-2">৳ {data?.monthlyRent}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 p-3 rounded-xl">
                            <Bed className="w-4 h-4 text-slate-400 mb-1" />
                            <p className="text-xs text-slate-500">Bedrooms</p>
                            <p className="font-bold">{data?.bedroom}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                            <Bath className="w-4 h-4 text-slate-400 mb-1" />
                            <p className="text-xs text-slate-500">Bathrooms</p>
                            <p className="font-bold">{data?.bathroom}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                            <Square className="w-4 h-4 text-slate-400 mb-1" />
                            <p className="text-xs text-slate-500">Area</p>
                            <p className="font-bold">{data?.squareArea} sqft</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                            <Building2 className="w-4 h-4 text-slate-400 mb-1" />
                            <p className="text-xs text-slate-500">Type</p>
                            <p className="font-bold">{data?.propertyType}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-400 uppercase">Location</p>
                        <p className="text-sm flex items-start gap-2 text-slate-600">
                            <MapPin className="w-4 h-4 shrink-0 text-red-400" /> {data?.address}, {data?.city}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">Amenities</p>
                        <div className="flex flex-wrap gap-2">
                            {data?.amenities?.slice(0, 4).map((item, index) => (
                                <span key={index} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-bold">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyColumn;