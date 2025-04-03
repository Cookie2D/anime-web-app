import { getHeaderData } from "@/server/header/getHeaderData";
import React from "react";
import Link from "next/link";

const GenreDropdown: React.FC = async () => {
  const { categories } = await getHeaderData();

  return (
    <>
      {categories.map((category) => (
        <Link
          className="hover:text-gray-800 block px-4 py-2 font-bold"
          key={category.slug}
          href={`/anime?category=${category.slug}`}
        >
          {category.slug}
        </Link>
      ))}
    </>
  );
};

export default GenreDropdown;
