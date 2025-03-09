/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静的サイトとして出力
  images: {
    unoptimized: true  // 静的出力時に必要
  }
};

module.exports = nextConfig;