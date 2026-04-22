import React from "react";
import SingleCard from "./SingleCard";
import { useQuery } from "@tanstack/react-query";

const ViewHomeCards = () => {

  const { data: property = [], isLoading, refetch } = useQuery({
    queryKey: ['GET'],
    queryFn: () => {
      return fetch('http://localhost:5000/api/v1/property')
        .then(res => res.json())
        .then(data => {
          return data;
        })
    }
  });

  const propertyData = [
    {
      id: 1,
      title: "Modern 2 Bedroom Apartment",
      location: "Banani, Dhaka",
      price: 35000,
      beds: 2,
      baths: 2,
      sqft: 1200,
      rating: 4.8,
      type: "Apartment",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Luxury Duplex Villa",
      location: "Gulshan, Dhaka",
      price: 85000,
      beds: 4,
      baths: 3,
      sqft: 2500,
      rating: 4.9,
      type: "Villa",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
  ];
  const sixProperties = [
    ...propertyData,
    ...propertyData,
    ...propertyData,
  ].slice(0, 6);



  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="container dynamic-Padding">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Available Properties
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {property?.data?.map((property, index) => (
            <SingleCard key={index} data={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewHomeCards;
