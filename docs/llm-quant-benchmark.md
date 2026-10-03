# LLM Quant Benchmark — preview and hosting handoff

## Routes

- English: `/experiments/llm-quant-benchmark`
- Chinese: `/zh/experiments/llm-quant-benchmark`
- Supporting comparison: `/experiments/llm-quant-benchmark/comparison.en.html` and `comparison.zh-CN.html`
- Lossless source download: `/experiments/llm-quant-benchmark/homepage-data.json`
- Social image: `/experiments/llm-quant-benchmark/social.png` (1200 × 630 PNG)

The site previously had no Chinese locale routing. The `/zh/` prefix is scoped to this feature; existing routes and the homepage content are preserved. Shared Layout gains opt-in language, alternate URLs, share image and width. Pages use the existing system font and blue accent, static Astro output and Cloudflare Pages build.

## Data and editorial decisions

`src/data/benchmark/homepage-data.json` is a byte-for-byte copy of the handoff. The approved bilingual copy is retained next to it. `content.ts` contains shortened bilingual narrative, shared formatters and pending evidence configuration. Exact run labels, order and ranks are preserved. No statistical metric is recomputed. Percentages and Sharpe use two decimal places, turnover one, and cashflows two, consistent with the supplied comparison. Daily equity is plotted directly using an affine screen-coordinate mapping; an expandable table exposes every supplied value. Monthly consistency uses the supplied `full_months` and `positive_full_months`; the additional terminal-liquidation record is separately labeled, not treated as a full month. The cashflow table uses `cashflows`, not an inferred PnL decomposition or an assertion that summed attribution equals compounded return.

Numerical strategy parameters absent from the JSON are omitted from the shortened strategy explanations, rather than introduced as additional numeric sources. The original approved copy remains available for editorial review. The frozen original protocol was located and verified at https://github.com/Montayang/bfbt/blob/2b1ca8f6826866fcf70e1cc39fefae4c8a668c7f/docs/research/llm_cross_sectional_benchmark_2025_2026/README.md; it links to the byte-identical original prompt in the same commit. Its qualification about incomplete historical exchange-status snapshots is explicitly included in both languages.

## Approved large-report hosting — live and verified

Current hosting: Cloudflare Pages Git integration, `npm run build` → `dist`. There is no configured object-storage or release-asset mechanism in this repository.

Proposal: a dedicated Cloudflare R2 bucket `montayang-reports`, with custom domain `reports.montayang.com`. Use this immutable version prefix:

`https://reports.montayang.com/llm-cs-202509-202608-v1/`

Under it, preserve all eight original object keys:

```text
event_reports/chatgpt-6-astra-ultra/report.en.html
event_reports/chatgpt-6-astra-ultra/report.zh-CN.html
event_reports/grok-4.7-xhigh/report.en.html
event_reports/grok-4.7-xhigh/report.zh-CN.html
event_reports/kimi-k3-max/report.en.html
event_reports/kimi-k3-max/report.zh-CN.html
event_reports/claude-fable-5.1-max/report.en.html
event_reports/claude-fable-5.1-max/report.zh-CN.html
```

The owner approved the preview and R2 hosting on 2026-10-03 and completed bucket/domain setup and upload. All eight URLs are live and byte-verified as of 2026-10-04 (Asia/Singapore). Credentials were not shared with the agent.

After approval and receipt of the original reports:

1. Inspect the original archive and each report's dependency/relative-link graph, sizes, and SHA-256. Keep a manifest of original bytes. The subsequent report archive contains all eight files (99,028,942 bytes total). Every bundled SHA-256 checksum passed, and its homepage JSON matches the page source byte-for-byte. The HTML files have no external resource references or fetch/XHR/WebSocket calls. Object keys, lengths and SHA-256 values are recorded in `docs/llm-quant-report-manifest.json`.
2. Create the bucket and custom-domain binding in the owner's Cloudflare account. Review the account's R2 billing terms before enabling it. Use the production custom domain, not the development-only `r2.dev` URL.
3. Upload the original files, plus any required dependencies, outside Git. Preserve relative paths and bilingual switches. HTML content type: `text/html; charset=utf-8`. Use immutable caching only after the object identity is verified; changes must use a new version prefix. Inspect reports for active external dependencies and secrets before publication.
4. Check all eight HTTPS URLs, MIME types, language switching and in-report links. Check the report bytes against the manifest. No CORS is needed for ordinary top-level navigation.
5. Set `evidence.eventBaseUrl` in `content.ts` to the approved prefix. The original frozen protocol is already linked at the verified source commit; preserve this immutable URL.
6. Rebuild and run the validation suite. Comparison-report links are rewritten at build time using the same configuration as the native page. Confirm no `event_reports/...` local-relative links survive. Then obtain the user's release confirmation before push.

In the preview, the four full Event report entries visibly say “awaiting hosting.” The comparison's four report anchors lead to those precise status entries rather than broken URLs. Its language switches have also been fixed. Original comparison HTML remains unchanged in source; transformations happen in Astro static endpoints. The comparison assets are marked `noindex` to keep the native article as the search landing page.

Official reference: https://developers.cloudflare.com/r2/buckets/public-buckets/

## Checks

```sh
npm run check
npm run build
python3 scripts/check-benchmark.py
```

`check-benchmark.py` pins the original JSON SHA-256, checks lossless output, both languages' metrics and order, all supplied daily points and chart coordinates, monthly/terminal handling, local links, alternate/canonical/share metadata, zero article scripts/iframes, and a compressed HTML budget.

`scripts/check-benchmark-browser.cjs` implements browser review using Playwright and axe-core in temporary tooling (not production dependencies), covering desktop 1280 px and mobile 390 / 320 px, skip links, data-table disclosure, language switching, overflow, requests, and comparison script/link behavior. Automated accessibility checks supplement manual visual and keyboard review; they are not a full accessibility certification. Preview screenshots and audit output are review artifacts, not deployed assets. Run with the two browser-test packages resolvable via `NODE_PATH`, after starting `npm run preview -- --host 127.0.0.1`; for example `NODE_PATH=/tmp/homepage-browser/node_modules node scripts/check-benchmark-browser.cjs`. On minimal servers, install browser OS dependencies and a Chinese font for accurate previews.

No new npm dependencies or runtime services. The article itself makes no report requests. The two comparison documents load only on navigation. The JSON is linked as a download, not fetched at runtime. The large Event files are not in Git or `public/`.

## Files prepared for review

- `README.md`
- `docs/llm-quant-benchmark.md`
- `public/experiments/llm-quant-benchmark/social.png`
- `scripts/check-benchmark-browser.cjs`
- `scripts/check-benchmark.py`
- `scripts/generate-benchmark-social.mjs`
- `src/components/benchmark/Benchmark.astro`
- `src/components/benchmark/EquityChart.astro`
- `src/data/benchmark/comparison-report.en.html`
- `src/data/benchmark/comparison-report.zh-CN.html`
- `src/data/benchmark/content.ts`
- `src/data/benchmark/homepage-data.json`
- `src/data/benchmark/page-copy.en.md`
- `src/data/benchmark/page-copy.zh-CN.md`
- `src/layouts/Layout.astro`
- `src/pages/experiments/llm-quant-benchmark/comparison.[locale].html.ts`
- `src/pages/experiments/llm-quant-benchmark/homepage-data.json.ts`
- `src/pages/experiments/llm-quant-benchmark/index.astro`
- `src/pages/sitemap.xml.ts`
- `src/pages/zh/experiments/llm-quant-benchmark.astro`
- `src/styles/benchmark.css`

## Preview validation result

- `npm run check`: zero errors, warnings or hints. Production build successful.
- Source SHA-256, bilingual metrics, all daily values and SVG coordinates, monthly consistency, terminal liquidation, internal links and metadata passed.
- Both languages at 1280, 390 and 320 px: no page overflow, keyboard skip link/disclosure/language switching passed, axe WCAG A/AA audit found no violations.
- Initial article load requests only HTML and CSS; no script, iframe, remote font, report or data fetch. HTML gzip is approximately 49 KB (English) and 50 KB (Chinese); the share PNG is about 45 KB and is not loaded by the article. These are local measurements, not production Lighthouse or field Core Web Vitals results.
- BFBT repository and frozen commit returned HTTP 200. The original protocol and prompt were read successfully from that commit.
- Full Event reports have been received and both local and public R2 objects have been verified against the original checksums. Production links are enabled.
- No commit, push, object-storage upload or domain change has been performed.

## Release verification — 2026-10-04 (Asia/Singapore)

The owner completed R2 setup. All eight production report URLs returned HTTP 200 with `text/html`; downloaded lengths and SHA-256 match the original manifest. The approved report base URL is now active in the native pages and generated comparison links. Large report bytes remain outside Git. The earlier pending-hosting sections describe the preview workflow, not the release state.
