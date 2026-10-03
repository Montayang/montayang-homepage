// Run with Playwright and @axe-core/playwright available in NODE_PATH.
// Requires npm run preview on 127.0.0.1:4321. Writes review artifacts under /tmp.
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const fs = require("fs");
(async () => {
  const browser = await chromium.launch();
  const results = [];
  for (const locale of ["en", "zh-CN"]) {
    const route =
      locale === "en"
        ? "/experiments/llm-quant-benchmark"
        : "/zh/experiments/llm-quant-benchmark";
    for (const width of [1280, 390, 320]) {
      console.log(`Checking ${locale} ${width}`);
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [],
        requests = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("request", (r) => requests.push(r.url()));
      const res = await page.goto("http://127.0.0.1:4321" + route);
      await page.evaluate(() => document.fonts.ready);
      if (res.status() !== 200) throw Error("HTTP " + res.status());
      if (
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        )
      )
        throw Error("Overflow " + locale + width);
      if (
        requests.some((r) => /comparison\.|event_reports|homepage-data/.test(r))
      )
        throw Error("Eager evidence request");
      await page.keyboard.press("Tab");
      if (
        !(await page
          .locator(".skip-link")
          .evaluate((e) => e === document.activeElement))
      )
        throw Error("Skip link inaccessible");
      await page.keyboard.press("Enter");
      if (
        !(await page
          .locator("#main")
          .evaluate((e) => e === document.activeElement))
      )
        throw Error("Skip link target");
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      results.push({
        locale,
        width,
        requests: requests.length,
        violations: axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => n.target),
        })),
      });
      if (axe.violations.length) throw Error(JSON.stringify(results.at(-1)));
      await page.evaluate(() => {
        document.activeElement.blur();
        window.scrollTo(0, 0);
      });
      if (width !== 320) {
        await page.screenshot({
          path: `/tmp/benchmark-${locale}-${width}.png`,
          fullPage: true,
        });
        await page.screenshot({
          path: `/tmp/benchmark-${locale}-${width}-top.png`,
        });
      }
      await page.locator(".equity-values summary").click();
      if (
        !(await page
          .locator(".equity-values")
          .getAttribute("open")
          .then((x) => x !== null))
      )
        throw Error("Data table");
      await page.locator(".experiment-nav a[hreflang]").click();
      if (!page.url().includes(locale === "en" ? "/zh/" : "/experiments/"))
        throw Error("Language route");
      if (errors.length) throw Error(errors.join("\n"));
      await context.close();
    }
  }
  for (const locale of ["en", "zh-CN"]) {
    const page = await browser.newPage();
    let errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(
      `http://127.0.0.1:4321/experiments/llm-quant-benchmark/comparison.${locale}.html`,
    );
    if (await page.locator('a[href^="event_reports/"]').count())
      throw Error("Unrewritten Event link");
    await page
      .locator(`a[href="comparison.${locale === "en" ? "zh-CN" : "en"}.html"]`)
      .click();
    if (errors.length) throw Error(errors.join("\n"));
    await page.close();
  }
  fs.writeFileSync(
    "/tmp/benchmark-browser-check.json",
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
