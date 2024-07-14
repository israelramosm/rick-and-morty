const PHASE_DEVELOPMENT_SERVER = require("next/constants.js");

const remotePatterns = [
  {
    protocol: "https",
    hostname: "rickandmortyapi.com",
    port: "",
    pathname: "**",
  },
];

module.exports = (phase, { defaultConfig }) => {
  const config = {};
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      ...config,
      images: {
        remotePatterns,
      },
    };
  }

  return {
    /* config options for all phases except development here */
    ...config,
    images: {
      remotePatterns,
    },
  };
};
