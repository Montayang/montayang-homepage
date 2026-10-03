import type { APIRoute } from "astro";
import raw from "../../../data/benchmark/homepage-data.json?raw";
export const GET: APIRoute = () =>
  new Response(raw, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
