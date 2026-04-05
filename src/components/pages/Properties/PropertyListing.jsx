import React from 'react';
import { FiGrid, FiList } from 'react-icons/fi';
import SingleCard from '../HomeComponents/HomeCards/SingleCard';

const PropertyListing = ({properties}) => {
    
    return (
      <div className="flex-1">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <p className="text-gray-500 font-medium">
          Showing <span className="text-blue-600 font-bold">{properties.length}</span> properties
        </p>
        
        <div className="flex items-center gap-3">
          <select className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold outline-none cursor-pointer">
            <option>Featured First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button className="p-2 bg-blue-50 text-blue-600 border-r border-gray-200"><FiGrid /></button>
            <button className="p-2 text-gray-400 hover:bg-gray-50"><FiList /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {properties.map((property) => (
          <SingleCard key={property.id} data={property} />
        ))}
      </div>

      <div className="mt-12 flex justify-center items-center gap-2">
        <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">«</button>
        <button className="w-10 h-10 rounded-lg bg-blue-600 text-white font-bold shadow-lg shadow-blue-100">1</button>
        <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">2</button>
        <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">3</button>
        <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">»</button>
      </div>
    </div>
    );
};

export default PropertyListing;