# USAJIO — Research, assumptions and QA notes

## Product direction
A global-first personal finance education platform. Core structure: calculators, money planning, finance guides, country guides and trust centre.

## Competitor benchmark
Detailed current competitor audit and premium roadmap: [COMPETITOR_RESEARCH_AND_PREMIUM_PLAN_2026-11-21.md](COMPETITOR_RESEARCH_AND_PREMIUM_PLAN_2026-11-21.md).
Reference set: NerdWallet (task-led calculators, editorial/methodology transparency), Bankrate (topic breadth and repayment scenarios), Calculator.net (broad utility catalogue and direct access). This is a public-page review, not a claim that any competitor is universally number one.

## Current prototype tools
- Compound interest: starting balance, monthly contribution, annual rate, duration and compounding frequency.
- Loan: fixed-rate payment estimate, extra monthly payment, total interest and repayment estimate.
- Budget: income, five expense categories and remaining balance.
- Savings goal: target, current savings and months.
- Emergency fund: essential costs, months of cover and current savings.
- Debt payoff: balance, annual rate and monthly payment.

## Important limitations to address
1. Compound-interest calculation needs a precisely documented contribution timing convention and independent tests.
2. Loan extra-payment display should distinguish contractual payment from total payment including extra amount.
3. Debt payoff must validate payment against monthly interest and clearly label impossible payoff cases.
4. Currency selector changes formatting only; no FX conversion or country localization.
5. Privacy, terms and contact pages are starter copy and require final legal/editorial review.
6. Add verified sources, review dates, accessibility checks, sitemap, robots.txt, canonical URLs and metadata.
7. Test all calculators with zero, boundary, negative, large and invalid inputs before production sign-off.

## Trust principles
Educational estimates only; no guaranteed returns or unverified rates. Do not collect banking credentials, card/account numbers or unnecessary sensitive financial information. Disclose affiliate relationships if introduced.

## 2026-11-21 — Calculator hub / dedicated pages
- Homepage links six calculator cards to dedicated pages: `compound-interest.html`, `loan-calculator.html`, `monthly-budget.html`, `savings-goal.html`, `emergency-fund.html`, `debt-payoff.html`.
- Added `calculator-pages.css`; shared `script.js` initializes safely on standalone pages.
- User confirmed on Android that all six calculator cards open their respective pages.
- This confirms navigation only; it does not establish that all calculations or all responsive states passed QA.

## 2026-11-21 — Code-level calculator audit
- Confirmed all six standalone pages include shared `script.js`, corresponding button IDs exist, and no duplicate IDs were found in the calculator forms.
- Independently checked baseline arithmetic:
  - Compound interest (monthly frequency): approx. $17,175.24 future value; $13,000 contributions; $4,175.24 interest for the test case previously recorded.
  - Loan ($10,000, 7%, 5 years, no extra): approx. $198.01 monthly; $1,880.72 interest; $11,880.72 total; 60 months.
  - Budget ($3,500 income; $2,350 expenses): $1,150 remaining; 32.9%.
  - Savings goal ($5,000 target, $500 saved, 18 months): $250/month.
  - Emergency fund ($1,800 essential costs × 6 months; $1,000 saved): $10,800 target; $9,800 gap.
  - Debt ($5,000 at 12%, $250/month): 23 months; approx. $606.74 interest.
- Known issues identified in earlier branch review: contribution timing needs clear definition; validation and edge-case behaviour require regression coverage; extra-payment output needs clear distinction.
- A later shared JS patch introduced more consistent input checks and monthly compounding logic. It has not yet received full real-browser regression testing. Treat all calculations as needing a complete QA pass.

## 2026-11-21 — Competitor research and redesign planning
- Reviewed public NerdWallet calculator hub, banking calculator hub and methodology page; Bankrate calculator and personal-finance calculator directories; Calculator.net public site; NerdWallet 2025 Form 10-K; Google Search Central helpful-content/Search Essentials/SEO guidance; Core Web Vitals guidance.
- Findings and actionable comparison recorded in `COMPETITOR_RESEARCH_AND_PREMIUM_PLAN_2026-11-21.md`.
- Main opportunity: combine task-led calculator discovery, deeper scenario breakdowns, transparent formulas/assumptions, mobile-first polish and original educational guides.
- Keyword list is intent-based planning only. Exact US volume/difficulty/rank exports were not available: connected Ahrefs returned insufficient plan; connected OpenSEO workspace had insufficient credits. No search volumes or ranking claims are fabricated.
- Research is public-facing and does not reveal competitors' internal CMS, design systems or full operational workflows.
- Next implementation order: P0 calculation correctness/trust; P1 design consistency/results UX; P2 technical SEO/content; P3 controlled new tools.
- No production deployment or live changes made in this research task.
