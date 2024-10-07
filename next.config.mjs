/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        largePageDataBytes: 128 * 100000,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.pokemon-card.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
