import React from "react";

const PageHeader = ({ title }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            {title}
          </h2>
         
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
