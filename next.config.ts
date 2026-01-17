/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    // Enable SCSS
    sassOptions: {
        includePaths: ['./src/styles'],
    },
};

export default nextConfig;
