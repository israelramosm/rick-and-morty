/** @type {import('next').NextConfig} */

const { BASE_PATH } = process.env;

const nextConfig = {
  basePath: BASE_PATH,
  images: {
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
