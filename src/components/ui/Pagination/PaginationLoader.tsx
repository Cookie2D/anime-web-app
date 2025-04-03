import React, { FC } from "react";
import Icon from "../Icon/Icon";

const PaginationLoader: FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <div className="p-2 rounded-lg border cursor-wait opacity-50">
        <Icon size={20} type="CaretLeft" />
      </div>

      <p>...</p>

      <div className="p-2 rounded-lg border cursor-wait">
        <Icon size={20} type="CaretRight" />
      </div>
    </div>
  );
};

export default PaginationLoader;
