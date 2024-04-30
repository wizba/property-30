/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // domains: ['lh3.googleusercontent.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          pathname: '**',
        },
      ],
    },
  };
  
  export default nextConfig;

