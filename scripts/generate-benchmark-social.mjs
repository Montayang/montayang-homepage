// Run with: node scripts/generate-benchmark-social.mjs (Sharp ships with Astro).
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#fff"/><path d="M72 86H1128" stroke="#dce1e5"/><g font-family="Arial,Helvetica,sans-serif"><text x="72" y="62" font-size="24" fill="#28557d">Xinyang Yang / Experiments</text><text x="72" y="224" font-size="62" fill="#292929">Can an LLM design a</text><text x="72" y="304" font-size="62" fill="#292929">factor strategy in one shot?</text><rect x="72" y="372" width="6" height="116" fill="#28557d"/><text x="102" y="407" font-size="26" fill="#292929">One-shot proposals. Frozen runs.</text><text x="102" y="452" font-size="26" fill="#606970">After-cost evidence, funding and limitations.</text><text x="72" y="563" font-size="23" fill="#28557d">montayang.com</text></g></svg>`;
await writeFile(
  "public/experiments/llm-quant-benchmark/social.png",
  await sharp(Buffer.from(svg)).png().toBuffer(),
);
