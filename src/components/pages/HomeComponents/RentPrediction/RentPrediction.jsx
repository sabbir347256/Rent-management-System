import React, { useState } from 'react';

const RentPrediction = () => {
    const [formData, setFormData] = useState({
        area: '',
        bed: '',
        bath: '',
        location: 'Gulshan 1, Gulshan, Dhaka'
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPrediction(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setPrediction(data.price);
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Unable to connect to the server. Please ensure Flask (app.py) is running on port 5000.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 py-32 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <header className=" py-8 px-6 text-center text-blue-600">
                    <h1 className="text-3xl font-bold mb-2">🏠 Dhaka House Rent Predictor</h1>
                    <p className="text-blue-600 opacity-90">Predict house rent in Dhaka using Machine Learning</p>
                </header>

                <main className="p-6 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                                Location (Area in Dhaka)
                            </label>
                            <select
                                id="location"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none bg-no-repeat bg-right"
                                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')", backgroundPosition: "right 1rem center", backgroundSize: "1.5em" }}
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            >
                                <option value="Gulshan 1, Gulshan, Dhaka">Gulshan 1</option>
                                <option value="Dhanmondi, Dhaka">Dhanmondi</option>
                                <option value="Block H, Bashundhara R-A, Dhaka">Bashundhara R-A (Block H)</option>
                                <option value="Sector 6, Uttara, Dhaka">Uttara (Sector 6)</option>
                                <option value="Mirpur, Dhaka">Mirpur</option>
                                <option value="Mohammadpur, Dhaka">Mohammadpur</option>
                                <option value="Baridhara, Dhaka">Baridhara</option>
                            </select>
                            <p className="mt-2 text-xs text-gray-500 italic">*Location must match the dataset exactly</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Area (sq ft)
                                </label>
                                <input
                                    id="area"
                                    type="number"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    value={formData.area}
                                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                    placeholder="e.g., 1200"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="bed" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Bedrooms
                                </label>
                                <input
                                    id="bed"
                                    type="number"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    value={formData.bed}
                                    onChange={(e) => setFormData({ ...formData, bed: e.target.value })}
                                    placeholder="e.g., 3"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="bath" className="block text-sm font-semibold text-gray-700 mb-2">
                                Bathrooms
                            </label>
                            <input
                                id="bath"
                                type="number"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                value={formData.bath}
                                onChange={(e) => setFormData({ ...formData, bath: e.target.value })}
                                placeholder="e.g., 2"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-4 rounded-lg font-bold text-white shadow-lg transform transition-all active:scale-95 ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                                }`}
                            disabled={loading}
                        >
                            {loading ? '🔄 Calculating...' : '✨ Check Estimated Rent'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 animate-pulse">
                            <p className="flex items-center justify-center">
                                <span className="mr-2">⚠️</span> {error}
                            </p>
                        </div>
                    )}

                    {prediction && (
                        <div className="mt-8 p-8 bg-green-50 rounded-xl border border-green-100 text-center animate-in fade-in zoom-in duration-300">
                            <h2 className="text-lg font-semibold text-green-800 mb-2 uppercase tracking-wide">Estimated Rent</h2>
                            <p className="text-4xl font-black text-green-600 mb-4">
                                ৳ {prediction.toLocaleString()} <span className="text-xl font-normal text-gray-500">/ month</span>
                            </p>
                            <p className="text-sm text-green-700 opacity-80 italic">
                                *Estimate based on {formData.location} area trends.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default RentPrediction;