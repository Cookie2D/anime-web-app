import React from "react";

export default function AnimeListSkeleton() {
  const limit = 10;

  return (
    <div className="grid grid-cols-5 gap-3">
      {Array.from({ length: limit }).map((_, index) => (
        <AnimeListSkeletonItem key={index} />
      ))}
    </div>
  );
}

export const AnimeListSkeletonItem = () => {
  return (
    <div className="border-4 border-transparent rounded-xl cursor-wait">
      <div className="block rounded-lg shadow-sm  h-full bg-gray-800 group-hover:opacity-80 transition-opacity ease-out duration-500">
        <div className="relative w-full aspect-square">
          <div className="w-full h-full rounded-t-lg bg-gray-600 animate-pulse" />

          <div className="absolute z-10 left-0 bottom-2  text-sm font-medium me-2 px-2.5 py-0.5 rounded-r-sm bg-blue-900 text-blue-300 w-16 h-6"></div>
        </div>

        <div className="p-5">
          <div className="mb-2 h-6 w-full bg-gray-700 rounded animate-pulse"></div>
          <div className="mb-2 h-6 w-3/4 bg-gray-700 rounded animate-pulse"></div>

          <div className="h-3 w-full bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-3 w-5/6 bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-3 w-2/3 bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-3 w-3/5 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
