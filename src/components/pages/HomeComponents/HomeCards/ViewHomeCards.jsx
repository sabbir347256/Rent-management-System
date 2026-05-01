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
