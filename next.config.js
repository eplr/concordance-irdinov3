/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pas d’output: 'export' : on a besoin du middleware Next.js (édge runtime)
  // pour protéger /dashboard par Basic Auth. Vercel rend les pages en statique
  // via le runtime Next.js (output 'standalone' implicite).
  trailingSlash: true,
  images: { unoptimized: true },
}

module.exports = nextConfig
