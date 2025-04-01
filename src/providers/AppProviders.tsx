"use client";

import { IconContext } from "@phosphor-icons/react";
import React from "react";

export default function AppProviders({ children }: React.PropsWithChildren) {
  return <IconContext.Provider value={{}}>{children}</IconContext.Provider>;
}
