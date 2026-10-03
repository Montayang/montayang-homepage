# Xinyang Yang · Personal homepage

A minimal, static Astro website for https://montayang.com. No React, backend, database, analytics, remote fonts, or runtime environment variables.

## Local development

Use Node.js 22.23.3 (`nvm install && nvm use` if using nvm).

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

Production files are generated in `dist/` and are not committed. `.nvmrc` selects the build runtime; `package-lock.json` locks dependencies.

## Content and structure

- `src/data/site.ts`: identity, introduction, GitHub, email, CV, research, publications, projects. All factual content and TODOs are centralized here.
- `src/pages/`: home, research, projects, 404 and sitemap.
- `src/components/`: reusable research, publication and project lists.
- `src/layouts/Layout.astro`: page metadata and shared document structure.
- `src/styles/global.css`: shared responsive styling.
- `public/`: favicon, robots.txt and future CV.
- `astro.config.mjs`: canonical production origin and static output.

### Updating personal content

The supplied CV is available at `public/cv.pdf` and linked from the homepage. Replace this file when your CV changes. Email, biography, research and projects are based on the supplied CV. Rarus is the sole publication; its title, full author list and conference were checked against the USENIX proceedings page. The title links to https://eprint.iacr.org/2026/1440; the first two authors are marked as equal contributors as confirmed by the author.

The portrait is stored at `public/profile.jpg`, with its path configured in `site.avatar` in `src/data/site.ts`. Replace this image to update the portrait. Update the single `publication` entry to edit the paper's title, authors, venue or link; no publication detail page is generated.

## Cloudflare Pages deployment

1. Push this repository to `https://github.com/Montayang/montayang-homepage`.
2. In the Cloudflare account holding `montayang.com`, open **Workers & Pages → Create application → Pages → Connect to Git**.
3. Connect GitHub and grant access to `Montayang/montayang-homepage`. Select the repository and begin setup.
4. Set production branch to **main**, framework preset to **Astro**, build command to **npm run build**, output directory to **dist**. Leave the root directory empty (repository root). No secrets or application environment variables are required. Node is selected by `.nvmrc`.
5. Select **Save and Deploy**. Check the resulting `*.pages.dev` URL, including `/research`, `/projects`, and an unknown path for the 404 page.
6. Open the Pages project → **Custom domains → Set up a custom domain**, enter **montayang.com**, and follow Cloudflare's confirmation flow. Because the domain is in the same Cloudflare account, Cloudflare can create the required DNS record during this flow. Wait for the domain and certificate to become active.
7. Check `https://montayang.com`. Later pushes to `main` automatically build and deploy; other branches can create preview deployments.

Do not manually add DNS records before associating the domain with the Pages project. No server, Cloudflare adapter, Workers runtime, or Wrangler configuration is needed for this static site. Keep Cloudflare Web Analytics disabled to preserve the no-trackers requirement.

Official references:

- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/configuration/custom-domains/

## Experiment pages

The bilingual LLM Quant Benchmark is documented in [docs/llm-quant-benchmark.md](docs/llm-quant-benchmark.md), including source-data validation, preview routes and the pending large-report hosting plan. Validate it after building with `python3 scripts/check-benchmark.py`.
