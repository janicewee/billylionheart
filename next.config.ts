import type { NextConfig } from "next";
<<<<<<< Updated upstream
=======
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');
>>>>>>> Stashed changes

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
<<<<<<< Updated upstream
=======
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
>>>>>>> Stashed changes
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
<<<<<<< Updated upstream
=======
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  }
>>>>>>> Stashed changes
};

export default nextConfig;
