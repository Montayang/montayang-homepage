# Can an LLM Design a Crypto Factor Strategy in One Shot?

I asked four leading language models to independently design a cross-sectional strategy for crypto
perpetual futures. Each model received the same prompt, had one response, and could not clarify or
revise its proposal after seeing data. I then translated each answer into a frozen, auditable Event
strategy and ran all four over the same one-year market history with identical execution costs.

The point was not to ask which model can write the most convincing strategy memo. It was to test
whether a one-shot research specification survives contact with point-in-time data, trading costs,
funding, missing observations, execution timing and path-dependent risk rules.

## The result

ChatGPT 6 Astra Ultra's Buffered Relative Momentum was the only strategy with a positive full-period
return: **+42.32% after costs**, with a **1.04 Sharpe ratio** and **−24.67% maximum drawdown**.
Grok finished close to flat at −3.91%; Kimi and Claude lost 47.06% and 38.69% respectively.

This is a result for one historical period and one frozen benchmark—not evidence that a model, a
factor or this implementation will be profitable in live trading.

## A fair one-shot contract

- Same causal top-100 universe and point-in-time data.
- Same initial equity: 100,000 USDT.
- Same friction: 5 bp taker fee plus 2 bp slippage.
- Same Event clock: completed observations only; scheduled fills no earlier than the next minute.
- One response per model; no follow-up questions or parameter search.
- Ambiguities were resolved mechanically before accessing results and retained as model defects.
- Every run has an immutable identity tied to source, dataset and response hashes.

## What the models proposed

### ChatGPT — Buffered Relative Momentum

A daily 28-day momentum signal that skips the most recent day, normalizes by volatility, and holds
15 longs against 15 shorts. Entry and retention buffers reduce unnecessary replacement, while the
Event implementation repairs stale data and exposure drift.

### Kimi — Carry, Momentum and Reversal

A four-hour blend of recent funding carry, medium-horizon momentum and 24-hour reversal. It holds
10 longs and 10 shorts and halves risk after a portfolio drawdown threshold is crossed.

### Grok — Residual Momentum and Carry

A daily blend of market-residual momentum and seven-day funding carry. It uses buffered 15-by-15
selection and a minute-level exposure enforcer. The common benchmark contract overrode its proposed
0.45 gross per side with the required 0.50.

### Claude — Trailing Funding Carry Reversal

An hourly strategy using trailing funding, inverse-volatility weights and rank holding bands. It
also proposed cooldowns, drift controls and rapid exits when a held contract moves sharply relative
to the market.

## What I learned

### A plausible factor story is not enough

Three of four proposals lost money after costs. The experiment rewarded not only factor choice, but
also clock consistency, turnover control, missing-data behavior and implementable risk rules.

### Funding was a first-order return source

All four strategies received substantial positive funding cashflows. The winning result was not a
pure price-momentum result; funding materially supported it. Grok received strong funding but still
finished slightly negative because adverse price returns and costs absorbed that advantage.

### Turnover separated the strategies

ChatGPT accumulated 196× turnover. Grok reached 270×, while Kimi and Claude both exceeded 535×.
With 7 bp of one-way friction, high-frequency replacement became a defining economic feature rather
than a reporting footnote.

### Specification quality is part of model quality

The models were not allowed a second attempt. Contradictory clocks, incomplete fallback rules and
infeasible constraints were recorded and resolved by the narrowest deterministic interpretation.
Being explicit enough to implement without beneficial clarification was therefore part of the test.

## Read the evidence

Start with the interactive comparison, then open any model's full Event report to inspect its equity
path, trades, rankings, instructions and risk events. The reports are generated from immutable run
artifacts; the landing page is only a narrative view over those records.

## Limitations

This benchmark covers four owner-selected model labels, one prompt, one historical period and public
Binance USD-M perpetual-futures data. It does not test live fills, liquidation tiers, order-book
queueing or strategy discovery across repeated prompts. Model and effort names are owner-supplied
metadata, not claims about current product availability. BFBT is independent and has no affiliation
with Binance.
