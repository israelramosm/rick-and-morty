/** @type {import('next').NextConfig} */
const output = process.env.NODE_ENV === "development" ? undefined : "export";

const nextConfig = {
  output,
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
