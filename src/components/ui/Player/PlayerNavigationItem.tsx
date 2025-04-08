"use client";

import { cn } from "@/utils/cn";

interface ItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const PlayerNavigationItem: React.FC<React.PropsWithChildren<ItemProps>> = ({
  children,
  className,
  label,
  ...props
}) => {
  return (
    <>
      <button
        {...props}
        className={cn(
          "py-3 px-4 cursor-pointer border border-gray-300 transition-colors ease-out",
          className
        )}
      >
        {label}
      </button>
      {children}
    </>
  );
};

export default PlayerNavigationItem;
