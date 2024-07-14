/** @type {import('next').NextConfig} */
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const remotePatterns = [
  {
    protocol: "https",
    hostname: "rickandmortyapi.com",
    port: "",
    pathname: "**",
  },
];

const nextConfig = (phase, { defaultConfig }) => {
  const config = {
    images: {
      remotePatterns,
    },
  };
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      ...config,
    };
  }

  return {
    /* config options for all phases except development here */
    ...config,
    basePath: "/rick-and-morty",
    output: "export",
    reactStrictMode: true,
  };
};

export default nextConfig;
