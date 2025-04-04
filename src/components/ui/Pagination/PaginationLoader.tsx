import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import React, { FC } from "react";

const PaginationLoader: FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <div className="p-2 rounded-lg border cursor-wait opacity-50">
        <CaretLeft size={20} />
      </div>

      <p>...</p>

      <div className="p-2 rounded-lg border cursor-wait">
        <CaretRight size={20} />
      </div>
    </div>
  );
};

export default PaginationLoader;
