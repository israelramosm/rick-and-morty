/** @type {import('next').NextConfig} */

const { NODE_ENV, BASE_PATH } = process.env;

console.log({NODE_ENV, BASE_PATH});

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
