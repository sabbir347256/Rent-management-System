import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthProvider } from '../../../../AuthProvider/CreateContext';
import AllFavorite from './AllFavorite';

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
            <div className="container ">
                <h2 className="text-3xl font-bold text-gray-900 mb-10">
                    My Favorite Property
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favouriteProperty?.map((property, index) => (
                        <AllFavorite key={index} data={property} refetch={refetch} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavouriteRent;