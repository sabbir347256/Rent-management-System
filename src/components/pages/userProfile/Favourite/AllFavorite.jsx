import React, { useContext, useEffect, useState } from 'react';
import { AuthProvider } from '../../../../AuthProvider/CreateContext';
import { FaBath, FaBed, FaHeart, FaMapMarkerAlt, FaRulerCombined, FaStar } from 'react-icons/fa';
import { NavLink } from 'react-router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';

const AllFavorite = ({ data , refetch}) => {
    const { user } = useContext(AuthProvider);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const { data: favoriteStatus, isLoading: isStatusLoading } = useQuery({
        queryKey: ['favoriteCheck', user?.userId, data?.propertyId?._id],
        enabled: !!user && !!data?.propertyId?._id,
        queryFn: async () => {
            const token = localStorage.getItem("accessToken");
            const response = await fetch(
                `http://localhost:5000/api/v1/favourite/check?userId=${user.userId}&propertyId=${data.propertyId._id}`,
                {
                    headers: { "Authorization": `Bearer ${token}` }
                }
            );
            if (!response.ok) throw new Error("Status check failed");
            return response.json();
        },
    });

    useEffect(() => {
        if (favoriteStatus?.exists) {
            setIsFavorited(true);
        } else {
            setIsFavorited(false);
        }
    }, [favoriteStatus]);



    // useEffect(() => {
    //     const checkFavoriteStatus = async () => {
    //         if (!user || !data?.propertyId?._id) return;

    //         const token = localStorage.getItem("accessToken");
    //         try {
    //             const response = await fetch(`http://localhost:5000/api/v1/favourite/check?userId=${user.userId}&propertyId=${data.propertyId._id}`, {
    //                 headers: { "Authorization": `Bearer ${token}` }
    //             });
    //             const result = await response.json();
    //             if (result.exists) {
    //                 setIsFavorited(true);
    //             }
    //         } catch (error) {
    //             console.error("Status check failed", error);
    //         }
    //     };

    //     checkFavoriteStatus();
    // }, [user, data?.propertyId?._id]);

    const handleFavoriteToggle = async () => {
        if (!user) {
            alert("Please login first");
            return;
        }

        setIsPending(true);
        const token = localStorage.getItem("accessToken");
        const favoriteData = {
            propertyId: data.propertyId._id,
            userId: user.userId,
            ownerId: data.propertyId.user._id,
        };

        try {
            const response = await fetch("http://localhost:5000/api/v1/favourite/toggle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(favoriteData),
            });

            const result = await response.json();
            if (response.ok) {
                setIsFavorited(result.isFavorited);
                refetch();
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        } finally {
            setIsPending(false);
            refetch();
        }
    };




    return (
        <div>
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={data.propertyId.images[0]}
                        alt={data.propertyId.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-yellow-400 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                        <FaStar size={10} /> Featured
                    </div>
                    <button
                        onClick={handleFavoriteToggle}
                        disabled={isPending}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-all flex items-center justify-center ${isFavorited ? "bg-red-500 text-white" : "bg-white/80 text-gray-400 hover:text-red-500"
                            } ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        {isPending ? (
                            <AiOutlineLoading3Quarters className="animate-spin" size={18} />
                        ) : (
                            <FaHeart size={18} fill={isFavorited ? "currentColor" : "none"} strokeWidth={isFavorited ? 0 : 40} />
                        )}
                    </button>
                    <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-5 py-1.5 rounded-lg text-sm font-semibold">
                        {data.propertyId.type}
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight max-w-[70%]">
                            {data.propertyId.propertyTitle}
                        </h3>
                        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg flex items-center gap-1 font-bold text-sm">
                            <FaStar className="text-yellow-400" /> {data.propertyId.rating}
                        </div>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-6">
                        <FaMapMarkerAlt className="text-pink-500 mr-2" />
                        {data.propertyId.address} - {data.propertyId.city}
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="text-blue-600 text-xl">
                                <FaBed />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">
                                {data.propertyId.beds} Beds
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-blue-400 text-xl">
                                <FaBath />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">
                                {data.propertyId.baths} Baths
                            </span>
                        </div>
                        <div className="flex items-center gap-3 col-span-2">
                            <div className="text-purple-400 text-xl">
                                <FaRulerCombined />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">
                                {data.propertyId.sqft} sqft
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
                                ৳ {data.propertyId.monthlyRent.toLocaleString()}
                            </p>
                        </div>
                        <NavLink to={`/property-details/${data?.propertyId?._id}`}>
                            <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-300">
                                View Details
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllFavorite;