import React from "react";
import FilterSlideBar from "./FilterSlideBar";
import PropertyListing from "./PropertyListing";

const PropertyPage = () => {
  const properties = [
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
      title: "Cozy Family House",
      location: "Gulshan, Dhaka",
      price: 65000,
      beds: 4,
      baths: 3,
      sqft: 2200,
      rating: 4.9,
      type: "House",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
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
      title: "Cozy Family House",
      location: "Gulshan, Dhaka",
      price: 65000,
      beds: 4,
      baths: 3,
      sqft: 2200,
      rating: 4.9,
      type: "House",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
  ];
  return (
    <div className=" min-h-screen">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80">
            <FilterSlideBar />
          </aside>

          <main className="flex-1">
            <PropertyListing properties={properties} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
