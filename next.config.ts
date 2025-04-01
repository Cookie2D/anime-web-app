import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ltiumfqgtagnorsdlwws.supabase.co',
        pathname: '/storage/v1/render/image/**', // Додайте render/image
      },
    ],
  },
};

export default nextConfig;
