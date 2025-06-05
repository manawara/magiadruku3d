import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // next.config.js

  images: {
    domains: ["res.cloudinary.com"], // Dodaj domenę Cloudinary
  },
};

export default withNextIntl(nextConfig);
