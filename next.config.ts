import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    async redirects() {
        return [
            {
                source: "/estatesales",
                destination: "/estate-sales",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
