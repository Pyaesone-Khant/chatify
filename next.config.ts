import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**"
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        optimizePackageImports: ["@mantine/hooks", "@mantine/core"],
    }
};

export default nextConfig;
