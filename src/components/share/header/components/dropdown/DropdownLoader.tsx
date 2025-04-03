import React from "react";

const DropdownLoader = () => {
  return (
    <div className="space-y-4 mt-2">
      {Array.from({ length: 10 }).map((_, idx) => (
        <div key={idx} className="px-4 w-full">
          <div className="h-5 w-full bg-gray-300 animate-pulse rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default DropdownLoader;
