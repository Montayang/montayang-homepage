import type { APIRoute } from "astro";
import en from "../../../data/benchmark/comparison-report.en.html?raw";
import zh from "../../../data/benchmark/comparison-report.zh-CN.html?raw";
import {
  data,
  routes,
  evidence,
  reportUrl,
  type Locale,
} from "../../../data/benchmark/content";
export function getStaticPaths() {
  return [{ params: { locale: "en" } }, { params: { locale: "zh-CN" } }];
}
export const GET: APIRoute = ({ params }) => {
  const locale = params.locale as Locale;
  let html = locale === "en" ? en : zh;
  for (const run of data.runs) {
    const path = run.reports[locale === "en" ? "en" : "zh_CN"];
    const destination =
      reportUrl(run, locale) || `${routes[locale]}#report-${run.strategy_id}`;
    html = html
      .replaceAll(`href='${path}'`, `href='${destination}'`)
      .replaceAll(`href="${path}"`, `href="${destination}"`);
  }
  html = html.replace(
    /href=(['"])report\.(en|zh-CN)\.html\1/g,
    (_match, quote, lang) => `href=${quote}comparison.${lang}.html${quote}`,
  );
  // The comparison is supporting evidence, not a competing search landing page.
  html = html.replace(
    "</head>",
    '<meta name="robots" content="noindex"></head>',
  );
  const notice = evidence.eventBaseUrl
    ? locale === "en"
      ? "Back to the experiment."
      : "返回实验专题。"
    : locale === "en"
      ? "Back to the experiment. Full Event reports are awaiting hosting; their links lead to the evidence status."
      : "返回实验专题。完整 Event 报告待托管，相关链接指向证据状态。";
  html = html.replace(
    /(<body[^>]*>)/,
    `$1<nav style="padding:16px;background:#fff;color:#292929"><a style="color:#28557d" href="${routes[locale]}">${notice}</a></nav>`,
  );
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
