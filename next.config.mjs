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
  /* config options for all phases except development here */
  assetPrefix: isProd
    ? "https://israelramosm.github.io/rick-and-morty"
    : undefined,
  images: {
    remotePatterns,
  },
};

export default nextConfig;
