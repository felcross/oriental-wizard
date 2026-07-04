import type { NextConfig } from "next";

// Static export: gera HTML/JS/CSS puro em ./out
// Basta copiar a pasta 'out' pra VPS e servir via Nginx Proxy Manager,
// sem precisar de processo Node rodando.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // exigido pelo static export
  },
};

export default nextConfig;
