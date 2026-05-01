import React, { useEffect } from "react";
import FilterSlideBar from "./FilterSlideBar";
import PropertyListing from "./PropertyListing";
import { useLocation, useNavigate, useSearchParams } from "react-router";

const PropertyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (location.search) {
      navigate(location.pathname, { replace: true });
    }
  }, []);

  const handleFilter = (filterData) => {
    const params = {};

    if (filterData.search) params.searchTerm = filterData.search;
    if (filterData.type && filterData.type !== "All Types") params.propertyType = filterData.type.toLowerCase();
    if (filterData.bedrooms) params.bedroom = filterData.bedrooms;

    if (filterData.minPrice) params.minPrice = filterData.minPrice;
    if (filterData.maxPrice) params.maxPrice = filterData.maxPrice;

    params.page = 1;
    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <div className=" min-h-screen py-32">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80">
            <FilterSlideBar onFilter={handleFilter} onReset={handleReset} />
          </aside>

          <main className="flex-1">
            <PropertyListing searchParams={searchParams} setSearchParams={setSearchParams} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
