/** @type {import('next').NextConfig} */

const remotePatterns = [
  {
    protocol: "https",
    hostname: "rickandmortyapi.com",
    port: "",
    pathname: "**",
  },
];

const nextConfig = {
  basePath: "/rick-and-morty",
  images: {
    remotePatterns,
  },
};

export default nextConfig;
