/** @type {import('next').NextConfig} */
const nextConfig = {
  // `output: "export"` is only applied for production builds. Next's dev
  // server has a known false-positive with this flag on dynamic segments
  // (rejects pages that do export generateStaticParams), so we scope it to
  // `next build`, which is also the only place static-export correctness
  // actually needs to be enforced.
  ...(process.env.NODE_ENV === "production" ? { output: "export" } : {}),
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // Required for `output: export`; media is pre-optimized in /public/media.
    unoptimized: true,
  },
};

export default nextConfig;
