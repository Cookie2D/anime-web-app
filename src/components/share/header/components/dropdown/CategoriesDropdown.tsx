import { getHeaderData } from "@/server/header/getHeaderData";
import React from "react";
import Link from "next/link";

const CategoriesDropdown: React.FC = async () => {
  const { status } = await getHeaderData();

  return (
    <>
      {status.map((status) => (
        <Link
          className="hover:text-gray-800 block px-4 py-2 font-bold"
          key={status.name_key}
          href={`/anime?category=${status.name_key}`}
        >
          {status.type}
        </Link>
      ))}
    </>
  );
};

export default CategoriesDropdown;
