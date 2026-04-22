import React from "react";

const SkalatonTableLoader = () => {
  return (
    <div className="w-full animate-pulse p-10 container">
      <div className="h-10 bg-gray-300 rounded-md mb-4"></div>

      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4 mb-3">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
};

export default SkalatonTableLoader;
