import withFlowbiteReact from "flowbite-react/plugin/nextjs";

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
  output: "export",
  basePath: "/rick-and-morty",
  images: {
    remotePatterns,
    unoptimized: true,
  },
};

export default withFlowbiteReact(nextConfig);