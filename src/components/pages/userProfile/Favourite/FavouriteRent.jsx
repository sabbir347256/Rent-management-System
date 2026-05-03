import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthProvider } from '../../../../AuthProvider/CreateContext';
import AllFavorite from './AllFavorite';
import { NavLink } from 'react-router';

const FavouriteRent = () => {
    const { user } = useContext(AuthProvider);
    const { data: favouriteProperty = [], isLoading, refetch } = useQuery({
        queryKey: ['favorites', user?.userId],
        queryFn: async () => {
            const token = localStorage.getItem("accessToken");
            const res = await fetch(`http://localhost:5000/api/v1/favourite/user-favorites/${user?.userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) {
                throw new Error("Failed to fetch favorites");
            }
            const result = await res.json();
            return result.data;
        }
    });


    return (
        <div className="bg-gray-50 min-h-screen py-32">
            <div className="container">
                {favouriteProperty && favouriteProperty.length > 0 ? (
                    <h2 className="text-3xl font-bold text-gray-900 mb-10">
                        My Favorite Property
                    </h2>
                ) : ''}

                {favouriteProperty && favouriteProperty.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favouriteProperty.map((property, index) => (
                            <AllFavorite key={index} data={property} refetch={refetch} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Status: 404, M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700">No Favorites Yet</h3>
                        <p className="text-gray-500 mt-2 max-w-sm">
                            You haven't added any properties to your favorites list yet.
                            Start exploring and save the ones you love!
                        </p>
                        <NavLink to='/'>
                            <button
                                
                                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Browse Properties
                            </button>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavouriteRent;