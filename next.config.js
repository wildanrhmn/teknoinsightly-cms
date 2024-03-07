/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback = {
            fs: false,
          };
        }
        return config;
      },
      redirects() {
        return [
          {
            source: '/dashboard',
            destination: '/dashboard/swiper',
            permanent: false,
          },
        ];
      },
      images: {
        domains: ['res.cloudinary.com'],
      },
};

module.exports = nextConfig;
