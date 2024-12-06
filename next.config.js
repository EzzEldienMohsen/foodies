/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ezz-foodies-bucket.s3.eu-north-1.amazonaws.com'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ezz-foodies-bucket.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
module.exports = nextConfig;
