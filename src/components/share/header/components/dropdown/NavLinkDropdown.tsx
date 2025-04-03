import React from "react";

const NavLinkDropdown: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="absolute top-10 left-0 bg-purple-800 h-0 transition-[height] duration-300 ease-out group-hover:h-96 overflow-y-scroll min-w-64">
    {children}
  </div>
);

export default NavLinkDropdown;
