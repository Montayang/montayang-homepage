import type { APIRoute } from "astro";
export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", "/research", "/projects", "/experiments/llm-quant-benchmark", "/zh/experiments/llm-quant-benchmark"].map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
