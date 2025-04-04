import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ltiumfqgtagnorsdlwws.supabase.co",
      },
    ],
  },
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
