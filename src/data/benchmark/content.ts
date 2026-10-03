import data from "./homepage-data.json";
export { data };
export type Locale = "en" | "zh-CN";
export const routes = {
  en: "/experiments/llm-quant-benchmark",
  "zh-CN": "/zh/experiments/llm-quant-benchmark",
};
// Approved by the owner; all eight public objects verified against the manifest.
export const evidence = {
  eventBaseUrl: "https://reports.montayang.com/llm-cs-202509-202608-v1",
  protocolUrl:
    "https://github.com/Montayang/bfbt/blob/2b1ca8f6826866fcf70e1cc39fefae4c8a668c7f/docs/research/llm_cross_sectional_benchmark_2025_2026/README.md",
};
export const reportUrl = (run: (typeof data.runs)[number], locale: Locale) =>
  evidence.eventBaseUrl
    ? `${evidence.eventBaseUrl.replace(/\/$/, "")}/${run.reports[locale === "en" ? "en" : "zh_CN"]}`
    : null;
// Display precision matches the supplied comparison reports; metrics are never recomputed.
export const pct = (v: number) => `${v > 0 ? "+" : ""}${(v * 100).toFixed(2)}%`;
export const decimal = (v: number) => v.toFixed(2);
export const cash = (v: number) =>
  v.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
export const integer = (v: number) => v.toLocaleString("en-US");
export const copy = {
  en: {
    title: "Can an LLM Design a Crypto Factor Strategy in One Shot?",
    description:
      "A frozen, after-cost benchmark of one-shot language-model trading proposals: fair design, strategy specifications, equity paths, funding, turnover, and limitations.",
    eyebrow: "EXPERIMENT / RESEARCH NOTES",
    back: "Xinyang Yang",
    switch: "中文",
    intro:
      "I asked four language models to independently design a cross-sectional strategy for crypto perpetual futures. Each received the same prompt and one response, with no follow-up or parameter search. I translated the answers into frozen, auditable Event strategies and tested them on the same history with identical costs.",
    question:
      "The question is not who writes the most convincing strategy memo. It is whether a one-shot specification survives point-in-time data, trading costs, funding, missing observations, execution timing, and path-dependent risk rules.",
    result: "The only positive after-cost result",
    resultNote:
      "One historical period, one frozen benchmark. This is not evidence of live profitability.",
    contract: "A fair one-shot contract",
    proposals: "What the models proposed",
    results: "Results under the frozen rule",
    path: "The path matters",
    months: "Monthly consistency",
    lessons: "What I learned",
    audit: "Audit & limitations",
    reports: "Read the evidence",
    period:
      "Evaluation interval (UTC, end exclusive; plus terminal liquidation)",
    capital: "Initial equity",
    costs: "Friction per traded notional",
    fee: "bp taker fee",
    slip: "bp slippage",
    rules: [
      "Same causal universe and point-in-time data.",
      "Completed observations only; scheduled fills no earlier than the next minute.",
      "One response per model; no clarification, follow-up, or parameter search.",
      "Ambiguities resolved mechanically before accessing results, retained as model defects.",
      "Each run has an immutable identity tied to source, dataset, and response hashes.",
    ],
    strategies: {
      "chatgpt-6-astra-ultra": [
        "Buffered relative momentum",
        "Daily momentum skips the most recent day and normalizes by volatility. Balanced long/short selection uses entry and retention buffers to reduce replacement; the Event implementation handles stale prices and exposure drift.",
      ],
      "grok-4.7-xhigh": [
        "Residual momentum & carry",
        "A daily blend of market-residual momentum and funding carry, with buffered long/short selection and a minute-level exposure enforcer. Its proposed exposure conflicted with the common contract and was mechanically overridden.",
      ],
      "kimi-k3-max": [
        "Carry, momentum & reversal",
        "An intraday blend of recent funding carry, medium-horizon momentum and short-term reversal. A portfolio drawdown threshold triggers lower risk.",
      ],
      "claude-fable-5.1-max": [
        "Trailing funding carry reversal",
        "An hourly strategy using trailing funding, inverse-volatility weights and rank holding bands. Cooldowns, drift controls and rapid exits respond to sharp contract moves relative to the market.",
      ],
    },
    ranking:
      "Ranking is preserved: positive total return first, then after-cost Sharpe, Calmar, lower drawdown, and lower turnover. Kimi ranks ahead of Claude under this rule despite its larger loss. A positive Sharpe does not make Grok profitable.",
    headers: [
      "Rank",
      "Owner-supplied model label",
      "Total return",
      "Sharpe",
      "Max drawdown",
      "Turnover",
      "Trades",
    ],
    chartLabel: "Daily ending equity in USDT, shared axes for all strategies",
    chartNote:
      "Daily ending equity as supplied, with the terminal liquidation point included. Line styles and labels distinguish models without relying on color.",
    tableData: "Inspect exact daily equity values",
    date: "Date (UTC)",
    month: "Month",
    positive: "Positive full months",
    terminal:
      "Terminal liquidation period — excluded from full-month consistency",
    lessonsItems: [
      [
        "A plausible factor story is not enough",
        "Most proposals lost money after costs. Clock consistency, turnover control, missing-data behavior and implementable risk rules mattered alongside factor choice.",
      ],
      [
        "Funding was a first-order return source",
        "Every strategy received positive funding cashflows. The winning result was not pure price momentum. Grok also received substantial funding, but adverse price returns and costs absorbed that advantage.",
      ],
      [
        "Turnover separated the strategies",
        "Repeated replacement consumed capital through fees and slippage. Read the observed cashflows below alongside cumulative turnover, rather than treating trading frequency as a reporting footnote.",
      ],
      [
        "Specification quality is part of model quality",
        "Contradictory clocks, incomplete fallbacks and infeasible constraints were resolved by the narrowest deterministic interpretation. No model benefited from a second attempt.",
      ],
    ],
    cashCaption:
      "Observed cashflows (USDT), not a reconstructed return attribution",
    cashHeaders: ["Model", "Funding received", "Fees paid", "Slippage paid"],
    limitations:
      "This benchmark covers owner-selected model labels, one prompt, one historical period, and public Binance USD-M perpetual-futures data. It does not test live fills, liquidation tiers, order-book queueing or strategy discovery across repeated prompts. Complete historical exchange-status snapshots are not available for every timestamp; eligibility inferred from observed bars, history boundaries and trailing liquidity retains this limitation. Model and effort names are supplied by the experiment owner, not claims about current product availability. BFBT is independent and has no Binance affiliation. Historical backtest evidence only; not investment advice.",
    source: "Frozen source commit",
    dataset: "DatasetSnapshot SHA-256",
    identity: "Run identities",
    benchmark: "Benchmark",
    evidenceIntro:
      "Start with the unified comparison. Full Event reports provide equity paths, trades, rankings, instructions and risk events; they open only when requested.",
    comparison: "Open the comparison report",
    download: "Download the source JSON",
    repository: "BFBT repository",
    protocol: "Frozen original protocol",
    pendingProtocol:
      "Not included in the handoff; awaiting the original document.",
    pendingReport: "Full Event report — awaiting hosting",
    pending:
      "Full Event reports have been verified and are awaiting publication to the report host. No large report is loaded here.",
    precision:
      "Display precision follows the supplied comparison: percentages and Sharpe to two decimals, turnover to one decimal. Exact source values are retained in the JSON.",
  },
  "zh-CN": {
    title: "大模型能否一次性设计出有效的加密货币因子策略？",
    description:
      "一次性大模型量化策略实验：公平设计、冻结策略、成本后结果、权益曲线、资金费与换手，以及实验局限。",
    eyebrow: "实验 / 研究笔记",
    back: "Xinyang Yang",
    switch: "English",
    intro:
      "我让四个大模型分别独立设计加密货币永续合约截面策略。它们收到相同的提示词，每个模型只能回答一次，不追问、不调参。随后，我把回答实现为冻结、可审计的 Event 策略，在同一历史区间和相同交易成本下回测。",
    question:
      "这不是比较谁能写出最像样的策略说明，而是检验一次性生成的研究规格，能否经受时点化数据、交易成本、资金费、缺失观测、成交时序和路径依赖风险规则的考验。",
    result: "唯一取得正收益的成本后结果",
    resultNote: "一个历史区间，一个冻结基准。这不是实盘盈利能力的证明。",
    contract: "公平的一次性实验合同",
    proposals: "四个模型分别提出了什么",
    results: "冻结规则下的最终结果",
    path: "收益路径同样重要",
    months: "月度一致性",
    lessons: "我从实验中学到了什么",
    audit: "审计与局限",
    reports: "查看证据",
    period: "评估区间（UTC，右端不含；另计终止清算）",
    capital: "初始权益",
    costs: "每单位成交名义金额的摩擦成本",
    fee: "bp 吃单手续费",
    slip: "bp 滑点",
    rules: [
      "相同的因果合约池和时点化数据。",
      "只读取已完成观测；计划指令不早于下一分钟成交。",
      "每个模型只回答一次，不澄清、不追问、不搜索参数。",
      "读取结果前机械解决歧义，并作为模型缺陷保留。",
      "每个 run 都由源代码、数据集和原始回答哈希共同确定不可变身份。",
    ],
    strategies: {
      "chatgpt-6-astra-ultra": [
        "缓冲相对动量",
        "每日计算跳过最近一日的动量，并用波动率标准化。多空选择使用进入与保留排名缓冲区，减少无意义换仓；Event 实现处理陈旧价格和暴露漂移。",
      ],
      "grok-4.7-xhigh": [
        "残差动量与资金费 carry",
        "每日组合市场残差动量和资金费 carry，采用多空缓冲选择与分钟级暴露约束器。其提出的暴露与公共合同冲突，因此按公共合同机械覆盖。",
      ],
      "kimi-k3-max": [
        "资金费、动量与反转",
        "在日内组合近期资金费 carry、中期动量和短期反转。组合回撤突破阈值后缩减风险。",
      ],
      "claude-fable-5.1-max": [
        "滚动资金费 carry 反转",
        "每小时使用滚动资金费信号、逆波动权重和排名持有带，并加入冷却期、漂移控制及合约相对市场快速异动时的退出规则。",
      ],
    },
    ranking:
      "保留冻结排名：先看总收益是否为正，再比较成本后夏普、Calmar、更低回撤和更低换手。因此，Kimi 虽然亏损更多，仍排在 Claude 前面。Grok 的夏普为正不代表它盈利。",
    headers: [
      "排名",
      "发起人提供的模型名称",
      "总收益",
      "夏普",
      "最大回撤",
      "累计换手",
      "成交次数",
    ],
    chartLabel: "每日期末权益（USDT），所有策略共用坐标轴",
    chartNote:
      "直接使用提供的每日期末权益，包含终止清算点。通过线型和文字区分模型，不仅依赖颜色。",
    tableData: "查看每日权益原始数值",
    date: "日期（UTC）",
    month: "月份",
    positive: "正收益完整月份",
    terminal: "终止清算期间——不计入完整月份一致性",
    lessonsItems: [
      [
        "因子故事合理并不够",
        "多数方案在成本后亏损。除了因子方向，时钟自洽、换手控制、缺失数据处理和可实现的风险规则同样重要。",
      ],
      [
        "资金费是一级收益来源",
        "所有策略都获得了正资金费现金流。获胜结果并非纯粹来自价格动量；Grok 同样获得大量资金费，但不利的价格收益和交易成本抵消了优势。",
      ],
      [
        "换手率真正拉开了差距",
        "重复换仓通过手续费与滑点消耗资金。应将下面的实际现金流与累计换手一起阅读，而不是把交易频率当作报告的附属指标。",
      ],
      [
        "规格表达能力也是模型能力的一部分",
        "冲突时钟、缺失回退规则和不可同时满足的约束，都按最窄的确定性解释处理。任何模型都没有获得第二次机会。",
      ],
    ],
    cashCaption: "实际现金流（USDT），不是重新构造的收益归因",
    cashHeaders: ["模型", "收到的资金费", "支付的手续费", "支付的滑点"],
    limitations:
      "本实验只包含发起人选择的模型标签、一个提示词、一个历史区间及 Binance USD-M 永续合约公开历史数据。没有测试实盘成交、清算阶梯、订单簿排队或重复提示下的策略搜索。并非每个历史时点都有完整的交易所状态快照；从观测行情、历史边界和滚动流动性推断合约资格仍有这一局限。模型与推理强度名称由实验发起人提供，不代表当前产品可用性。BFBT 是独立项目，与 Binance 没有官方关联。这里只是历史回测证据，不构成投资建议。",
    source: "冻结源代码提交",
    dataset: "DatasetSnapshot SHA-256",
    identity: "Run 身份",
    benchmark: "基准",
    evidenceIntro:
      "先看统一比较，再查看完整 Event 报告中的权益路径、成交、排名、指令和风险事件。报告仅在点击后打开。",
    comparison: "打开统一比较报告",
    download: "下载原始 JSON",
    repository: "BFBT 代码仓库",
    protocol: "冻结的原始实验协议",
    pendingProtocol: "交接包未包含，等待补充原始文档。",
    pendingReport: "完整 Event 报告——待托管",
    pending:
      "完整 Event 报告已校验，正在等待上传至报告托管站点；本页不会加载大报告。",
    precision:
      "显示精度与交接比较报告一致：百分比及夏普保留两位小数，换手保留一位；JSON 保留全部原始精度。",
  },
};
