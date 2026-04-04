/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true, // Crucial for cheap/free hackathon hosting
    }
};

export default nextConfig;
