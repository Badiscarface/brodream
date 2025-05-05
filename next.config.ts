/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,

  images: {
    domains: [
      "nextall.vercel.app",
      "res.cloudinary.com",
      "images.unsplash.com",
      "hotfinch.s3.ap-south-1.amazonaws.com",
      "commercehope-sdk.s3.ap-south-1.amazonaws.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    BASE_CURRENCY: process.env.BASE_CURRENCY,
    AUTH_SECRET: process.env.AUTH_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_BUCKET_SUB_PAT: process.env.S3_BUCKET_SUB_PATH,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    SECURE_TOKEN: process.env.SECURE_TOKENH,
  },
};

module.exports = nextConfig;
