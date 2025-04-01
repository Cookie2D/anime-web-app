import React from 'react';
import Image from 'next/image';
import globe from '../../../../../public/globe.svg';

export default function AppLogo() {
  return <Image height={32} width={32} alt="website-logo" src={globe} className="rounded-3xl" />;
}
