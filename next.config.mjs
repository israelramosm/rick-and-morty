/** @type {import('next').NextConfig} */

const assetPrefix =
  process.env.NODE_ENV === "production" ? "/rick-and-morty" : "";

const nextConfig = {
  assetPrefix,
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
