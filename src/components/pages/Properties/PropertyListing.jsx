import React from 'react';
import { FiGrid, FiList } from 'react-icons/fi';
import SingleCard from '../HomeComponents/HomeCards/SingleCard';
import { useQuery } from '@tanstack/react-query';

const PropertyListing = ({searchParams, setSearchParams }) => {
  const currentPage = Number(searchParams.get('page')) || 1;

  const { data: propertyData, isLoading } = useQuery({
    queryKey: ['properties', searchParams.toString()],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/api/v1/property?${searchParams.toString()}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    }
  });

  const handlePageChange = (newPage) => {
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
  };

  if (isLoading) return <div>Loading...</div>;

  const meta = propertyData?.meta;

  return (
    <div className="flex-1">
      <div className="mb-8">
        <p>Showing <span className="text-blue-600 font-bold">{propertyData?.data?.length || 0}</span> properties</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {propertyData?.data?.map((item) => (
          <SingleCard key={item._id} data={item} />
        ))}
      </div>

      {meta?.totalPage > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-10 h-10 rounded-lg border flex items-center justify-center disabled:opacity-50"
          >«</button>

          {[...Array(meta.totalPage)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`w-10 h-10 rounded-lg font-bold ${currentPage === i + 1 ? "bg-blue-600 text-white" : "border"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === meta.totalPage}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-10 h-10 rounded-lg border flex items-center justify-center disabled:opacity-50"
          >»</button>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;