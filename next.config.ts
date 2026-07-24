import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const productionBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio";

const nextConfig = (phase: string): NextConfig => {
  const basePath = phase === PHASE_DEVELOPMENT_SERVER ? "" : productionBasePath;

  return {
    output: "export",
    images: {
      unoptimized: true,
    },
    ...(basePath
      ? {
          basePath,
          assetPrefix: `${basePath}/`,
        }
      : {}),
  };
};

export default nextConfig;
