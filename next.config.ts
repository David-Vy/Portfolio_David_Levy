import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimização e compressão nativa de assets
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Otimização avançada de imagens com AVIF e WebP
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 ano de cache para imagens otimizadas
  },

  // Headers de cache HTTP de longa duração para assets estáticos e imutáveis
  headers: async () => [
    {
      source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/_next/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/_next/image/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, stale-while-revalidate=86400",
        },
      ],
    },
  ],
};

export default nextConfig;
