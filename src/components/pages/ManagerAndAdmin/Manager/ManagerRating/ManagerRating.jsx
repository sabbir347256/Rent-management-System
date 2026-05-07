import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ManagerRating = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:5000/api/v1/review/my-reviews', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.success) {
                setReviews(result.data);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/api/v1/review/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.success) {
                setReviews(reviews.filter(review => review._id !== id));
                toast.success("Review deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            toast.error('Something Wrong !')
        }
    }

    if (loading) return <div className="p-10 text-center text-xl">Loading...</div>;

    return (
        <div className="p-4">
            <Toaster position="top-center" reverseOrder={false} />
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Manager Reviews</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Reviewer</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-center">Rating</th>
                            <th className="py-3 px-6 text-center">Date</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {reviews.map((review) => (
                            <tr key={review._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                                    {review.userId?.fullName || 'N/A'}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{review.userId?.email}</span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span className="bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-xs font-bold">
                                        {review.rating} / 5
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        title="Delete Review"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {reviews.length === 0 && (
                    <div className="p-10 text-center text-gray-500">No reviews found.</div>
                )}
            </div>
        </div>
    );
};

export default ManagerRating;