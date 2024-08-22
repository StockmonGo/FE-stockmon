import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
    dest: "public",
};

export default withPWA(nextConfig);