import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Search, X, Scale, Bed, Bath, Square, MapPin, Building2 } from "lucide-react";
import PropertyColumn from "./PropertyColumn";


const CompareProperty = () => {
    const { id } = useParams(); 
    const [baseProperty, setBaseProperty] = useState(null);
    const [compareProperty, setCompareProperty] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/property/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setBaseProperty(result.data);
                setLoading(false);
            });
    }, [id]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(
                `http://localhost:5000/api/v1/property/compare/searchTerm?name=${encodeURIComponent(searchTerm)}`
            );
            const result = await res.json();
            if (result.success && result.data) {
                setCompareProperty(result.data);
            }
        } catch (error) {
            console.error("Search failed", error);
        }
    };

    if (loading) return <div className="text-center py-20">Loading Comparison...</div>;
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 md:px-4">
            <div className="container max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-5">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                            <Scale className="text-blue-600" /> Compare Properties
                        </h1>
                        <p className="text-slate-500 mt-1">Side-by-side analysis of your selected homes</p>
                    </div>

                    <form onSubmit={handleSearch} className="relative w-full md:w-96">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by property name..."
                            className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition">
                            Search
                        </button>
                    </form>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <PropertyColumn data={baseProperty} isPlaceholder={false} />

                    <div className="hidden lg:flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center font-black text-slate-300">VS</div>
                        <div className="w-[2px] h-full bg-slate-200 mt-4"></div>
                    </div>

                    <PropertyColumn data={compareProperty} isPlaceholder={!compareProperty} />
                </div>
            </div>
        </div>
    );

};

export default CompareProperty;