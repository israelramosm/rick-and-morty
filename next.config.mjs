/** @type {import('next').NextConfig} */

const basePath =
  process.env.NODE_ENV === "production" ? "/rick-and-morty" : "";

const nextConfig = {
  basePath,
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
