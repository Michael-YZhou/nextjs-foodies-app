/** @type {import('next').NextConfig} */

// allow images from this domain
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
