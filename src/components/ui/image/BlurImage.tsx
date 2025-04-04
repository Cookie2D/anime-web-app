"use client";

import Image, { ImageProps } from "next/image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const BlurImage: React.FC<ImageProps> = (image) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      alt={image.alt}
      src={image.src}
      fill
      objectFit="cover"
      className={twMerge(
        "duration-700 ease-in-out group-hover:opacity-75",
        isLoading ? " blur-xs grayscale" : " blur-none grayscale-0",
        image.className
      )}
      sizes="230px"
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
};

export default BlurImage;
