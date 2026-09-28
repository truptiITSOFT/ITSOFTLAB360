import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  async redirects() {
    return [
      {
        source: "/itsoftlab360",
        destination: "https://itsoftlab360.com",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   async redirects() {
//     return [
//       {
//         source: '/hrms',
//         destination: 'https://hrmsm.com',
//         permanent: false,
//       },
//     ];
//   },
// };

// export default nextConfig;
