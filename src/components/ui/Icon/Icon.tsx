"use client";

import { IconProps } from "@phosphor-icons/react";
import * as Icons from "@phosphor-icons/react";

interface IconComponentProps extends IconProps {
  type: keyof typeof Icons;
}

export default function Icon({ type, ...props }: IconComponentProps) {
  const PhosphorIcon = Icons[type] as React.ElementType;

  if (!PhosphorIcon) {
    console.warn(`Icon "${type}" does not exist in @phosphor-icons/react`);
    return null;
  }

  return <PhosphorIcon {...props} />;
}
