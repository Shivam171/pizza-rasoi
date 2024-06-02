/** @type {import('next').NextConfig} */
const nextConfig = {
  // Error:  lh3.googleusercontent.com
  // Why This Error Occurred ?
  // One of your pages that leverages the next/image component, passed a src value that uses a hostname in the URL that isn't defined in the images.remotePatterns in next.config.js.
  // -----------------------------------
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "shivam-pizza-rasoi.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
