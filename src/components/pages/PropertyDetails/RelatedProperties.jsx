import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Bed, Bath, ArrowRight } from "lucide-react";
import SingleCard from "../HomeComponents/HomeCards/SingleCard";


const RelatedProperties = ({ city, currentPropertyId }) => {
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `http://localhost:5000/api/v1/property?searchTerm=${city}`
                );
                const result = await response.json();
                if (result.success && result.data) {
                    const filtered = result.data.filter(
                        (item) => item._id !== currentPropertyId
                    );
                    setRelated(filtered.slice(0, 3));
                }
                setLoading(false);
            } catch (error) {
                console.error("Related fetch error:", error);
                setLoading(false);
            }
        };

        if (city) fetchRelated();
    }, [city, currentPropertyId]);

    if (loading || related.length === 0) return null;
    return (
        <div className="">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-800">Related Properties</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((item) => <SingleCard data={item}></SingleCard>)}
            </div>
        </div>
    );
};

export default RelatedProperties;