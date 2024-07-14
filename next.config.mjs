/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const remotePatterns = [
  {
    protocol: "https",
    hostname: "rickandmortyapi.com",
    port: "",
    pathname: "**",
  },
];

const nextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
