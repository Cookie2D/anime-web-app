"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { FC } from "react";
import Icon from "../Icon/Icon";

interface Props {
  totalPages: number;
}

const Pagination: FC<Props> = ({ totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <Link
          scroll={false}
          key={index}
          href={createPageURL(page)}
          className={`px-3 py-1 rounded-lg border transition-all ${
            currentPage === page
              ? "bg-primary text-white border-primary"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          {page}
        </Link>
      ) : (
        <span key={index} className="px-2">
          ...
        </span>
      )
    );
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <Link
        aria-label="Previous page"
        scroll={false}
        href={createPageURL(currentPage - 1)}
        className={`p-2 rounded-lg border transition-all 
          hover:bg-gray-100 dark:hover:bg-gray-800 ${
            currentPage === 1 ? "pointer-events-none opacity-50" : ""
          }`}
        aria-disabled={currentPage === 1}
      >
        <Icon size={20} type="CaretLeft" />
      </Link>

      {renderPageNumbers()}

      <Link
        aria-label="Next page"
        scroll={false}
        href={createPageURL(currentPage + 1)}
        className={`p-2 rounded-lg border transition-all 
          hover:bg-gray-100 dark:hover:bg-gray-800 ${
            currentPage === totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        aria-disabled={currentPage === totalPages}
      >
        <Icon size={20} type="CaretRight" />
      </Link>
    </div>
  );
};

export default Pagination;
