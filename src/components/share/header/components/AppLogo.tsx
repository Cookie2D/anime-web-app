import React from "react";
import Image from "next/image";
import globe from "../../../../app/icon0.svg";
import Link from "next/link";

export default function AppLogo() {
  return (
    <Link href="/">
      <Image height={48} width={48} alt="AniHub" src={globe} />
    </Link>
  );
}
