import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ltiumfqgtagnorsdlwws.supabase.co",
      },
    ],
  },
};

export default nextConfig;
