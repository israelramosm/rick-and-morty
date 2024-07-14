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
  basePath: isProd ? "/rick-and-morty" : undefined,
  assetPrefix: isProd
    ? "https://israelramosm.github.io/rick-and-morty"
    : undefined,
  images: {
    remotePatterns,
  },
};

export default nextConfig;
