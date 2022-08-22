// /** @type {import('next').NextConfig} */
module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
      {
        loader: '@svgr/webpack',
        options: {
          prettier: false,
          svgo: true,
          svgoConfig: {
            plugins:
              [
                {
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false },
                  },
                }]
          },
          titleProp: true,
        },
      },
      ],
    });
    return config;
  }
}





// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig
// module.exports = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ["@svgr/webpack"]
//     });

//     return config;
//   }
// };

// module.exports = {
//   // other configs...

//   // future: { webpack5: true }, // -- not needed since Next.js v11.0.0
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: { and: [/\.(js|ts|md)x?$/] },
//       use: [
//         {
//           loader: '@svgr/webpack',
//           options: {
//             prettier: false,
//             svgo: true,
//             svgoConfig: {
//               plugins:
//                 [
//                   {
//                     name: 'preset-default',
//                     params: {
//                       overrides: { removeViewBox: false },
//                     },
//                   }]
//             },
//             titleProp: true,
//           },
//         },
//       ],
//     });
//     return config;
//   },
// };