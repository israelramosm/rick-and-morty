/** @type {import('next').NextConfig} */

const { IMAGE_PATH } = process.env;

const nextConfig = {
  images: {
    path: IMAGE_PATH,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
