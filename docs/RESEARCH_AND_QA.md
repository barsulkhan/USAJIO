# USAJIO — Research, assumptions and QA notes

## Product direction
A global-first personal finance education platform. Core structure: calculators, money planning, finance guides, country guides and trust centre.

## Competitor benchmark to continue
Review calculator clarity and educational structure from NerdWallet, Bankrate, Calculator.net and MoneyHelper before expanding features. Improve with transparent formulas, assumptions, total-cost views, accessible mobile controls and jurisdiction labels. This is an initial benchmark list, not a completed live competitor audit.

## Current prototype tools
- Compound interest: starting balance, monthly contribution, annual rate, duration and compounding frequency.
- Loan: fixed-rate payment estimate, extra monthly payment, total interest and repayment estimate.
- Budget: income, five expense categories and remaining balance.
- Savings goal: target, current savings and months.
- Emergency fund: essential costs, months of cover and current savings.
- Debt payoff: balance, annual rate and monthly payment.

## Important limitations to address before public launch
1. Compound-interest calculation currently uses a simplified contribution timing convention; publish exact formula and test against independent reference cases.
2. Loan extra-payment display should distinguish contractual payment from total payment including extra amount.
3. Debt payoff calculator must validate payment against monthly interest and clearly label impossible payoff cases.
4. Currency selector changes formatting only; no FX conversion or country localization.
5. Privacy, terms and contact pages are starter copy and require final legal/editorial review.
6. Add verified sources, review dates, accessibility checks, sitemap, robots.txt, canonical URLs and metadata after domain selection.
7. Test all calculators with zero, boundary, negative, large and invalid inputs before launch.

## Trust principles
Educational estimates only; no guaranteed returns or unverified rates. Do not collect banking credentials, card/account numbers or unnecessary sensitive financial data. Disclose affiliate relationships if introduced.


## 2026-11-21 — Calculator Hub / dedicated page implementation
- Research direction: use a calculator discovery hub plus individual tool pages, reflecting common patterns in finance calculator sites (category-led discovery, focused calculator pages, clear results and assumptions). This is a design-pattern benchmark, not copied source code or wording.
- Created branch `feature/calculator-hub-separate-pages` from latest `main`.
- Homepage now links six calculator cards to dedicated pages: `compound-interest.html`, `loan-calculator.html`, `monthly-budget.html`, `savings-goal.html`, `emergency-fund.html`, `debt-payoff.html`.
- Added `calculator-pages.css`; made `script.js` shared initialization null-safe for single-calculator pages.
- Each calculator page includes a page-specific title/description, a return-to-all-tools link, its form/results, and related calculator links.
- No merge or deployment performed. Browser/Android visual and functional QA remains pending; formula QA is not implied by this structural change.
- Existing PR #1 (calculator input QA) and PR #2 (documentation) were not merged or modified.
- Next: fetch-back verification, static ID/script review, PR creation, then manual Android checks after approved merge/deployment.


## 2026-11-21 — Independent code-level QA pass (not browser QA)
- Confirmed all six standalone pages include the shared `script.js`, each page contains its matching calculator button ID, and no duplicate IDs were found in the six forms.
- Confirmed the hub's linked HTML pages/assets include the six calculator pages and the existing `about.html`, `contact.html`, `privacy.html`, `terms.html`, `disclaimer.html`, and `editorial.html` files on the repository default branch. The earlier concern about `about.html` was cleared; the file exists.
- Checked default-value arithmetic independently:
  - Compound interest (monthly frequency): approximately $17,175.24 future value; $13,000 contributions; $4,175.24 interest.
  - Loan ($10,000, 7%, 5 years, no extra): approximately $198.01 monthly; $1,880.72 interest; $11,880.72 total; 60 months.
  - Budget ($3,500 income; $2,350 expenses): $1,150 remaining; 32.9%.
  - Savings goal ($5,000 target, $500 saved, 18 months): $250/month.
  - Emergency fund ($1,800 essential costs × 6 months; $1,000 saved): $10,800 target; $9,800 gap.
  - Debt ($5,000 at 12%, $250/month): 23 months; approximately $606.74 interest.
- Issues found:
  1. Compound-interest calculation groups monthly deposits into quarterly/annual lumps when compounding frequency is set to quarterly/annually, despite the UI saying monthly contributions. Monthly mode matches the tested ordinary monthly contribution convention; non-monthly modes need a clearly defined contribution/compounding convention and independent tests.
  2. Input constraints are mostly HTML attributes only; JavaScript does not consistently reject out-of-range or invalid values. A zero/invalid duration can leave stale/blank loan results; zero-payment edge cases in debt payoff are not robustly handled.
  3. Currency selection changes formatting only; it does not convert currencies (already disclosed in the project limitations).
- PR #3 currently reports open, unmerged, and mergeable. No merge or deployment was performed.
- Not performed: live browser rendering, JavaScript console inspection in a real browser, Android Chrome touch/keyboard/accessibility checks, and full boundary/negative/large-input test matrix. Do not describe this pass as full QA or production approval.


## 2026-11-21 — Formula and input-validation follow-up
- Corrected and documented compound-interest convention: monthly deposits are added at month-end, and the selected nominal compounding frequency is converted into an equivalent monthly rate. This keeps monthly contributions consistent across monthly, quarterly and annual selections.
- Updated the calculator's on-page assumption text to disclose month-end deposits and selected interest-credit frequency.
- Loan calculator now caps monetary inputs, enforces the one-year UI minimum, protects against zero-month rounding, and reports invalid non-amortizing simulation rather than presenting a partial total.
- Budget, savings, emergency-fund and debt inputs now share finite numeric bounds. Debt payoff handles zero balance, zero payment, insufficient payment and 100-year simulation limits distinctly.
- Independent arithmetic check for a $1,000 starting balance, $100 month-end contribution, 5% nominal annual rate over one year: monthly ≈ $2,279.05; quarterly ≈ $2,278.71; annual ≈ $2,277.26 using equivalent monthly rates.
- Static source checks and independent formula calculations only; no real-browser/Android testing has been performed. Changes remain in PR review and are not live.

- Added a plain-language “How this estimate works” methodology section to each of the six calculator pages, including the main calculation method and key exclusions/assumptions. Added responsive styling for those sections.
- The calculator pages now disclose that the currency selector changes display formatting only (project limitation remains; no exchange-rate conversion is performed).


## 2026-11-21 — US borrowing calculator expansion
- Added three dedicated calculator pages and homepage cards: Mortgage, Auto Loan and Credit Card Payoff.
- Mortgage separates monthly principal-and-interest from a broader estimate including user-entered property tax, homeowners insurance and HOA. It is not an escrow quote and excludes PMI, utilities, maintenance and closing costs.
- Auto loan uses fixed-rate monthly amortization with optional extra payments. Amount financed should be entered after down payment, taxes and fees.
- Credit card payoff uses an APR/12 monthly-interest approximation and fixed monthly payment. It flags payments at or below monthly interest and discloses daily accrual, fees, new purchases and variable-rate limitations.
- Static read-back confirmed the three new pages, calculator button IDs, script and homepage changes exist on the feature branch. Independent sample arithmetic: $280,000 mortgage principal at 6.5% for 30 years gives about $1,769.79 monthly P&I and $357,124.57 total interest; $28,000 auto loan at 6.9% for 60 months gives about $553.11 scheduled monthly payment and $5,186.81 interest; $4,500 card balance at 24.99% APR with $200 monthly payment gives 31 months and about $1,634.71 interest.
- Static and independent arithmetic checks only; real-browser, Android, accessibility and console checks remain pending. No merge or deployment.


## 2026-11-21 — Money guide library expansion
- Created six standalone, linked educational guides: budgeting, emergency funds, debt payoff, US credit scores/reports, mortgage basics and auto financing.
- Homepage Money Guides section now links to all six pages; relevant calculator links connect the education pages to tools.
- US credit-report guide points readers to AnnualCreditReport.com and distinguishes credit scores from reports; it does not promise a specific score or approval result.
- Mortgage and auto guides emphasize full borrowing cost, loan terms, fees and ownership costs rather than monthly payment alone.
- Added the six guide URLs to sitemap.xml. Content is general education and requires periodic source/date review as rules and products change.
- Static read-back of all six pages and homepage links completed. Real browser/mobile QA and external-link validation remain pending; no merge or deployment.


## 2026-11-21 — Retirement and student-loan calculator expansion
- Added Retirement Savings Calculator with current balance, monthly contributions, assumed annual return, horizon and optional user-entered employer-match percentage.
- Retirement projection uses monthly equivalent rate, current balance compounding and month-end contributions; discloses no inflation, tax, fees, contribution limits, vesting, volatility or withdrawals.
- Added Student Loan Payoff Calculator using fixed monthly payment and APR/12 approximation; flags payments that do not exceed monthly interest and discloses that federal income-driven repayment, forgiveness and other program rules are not modeled.
- Added both tools to homepage and sitemap. Static read-back checks follow; browser/mobile QA remains pending.


## 2026-11-21 — Consolidated trust, SEO and mobile review branch
- Added two linked education guides: retirement planning and student-loan repayment. Homepage now surfaces both; sitemap contains their canonical GitHub Pages URLs.
- Homepage metadata now includes canonical URL and Open Graph fields. Policy pages have been expanded to explain the current implementation and avoid invented contact details or unsupported legal/business claims.
- Privacy copy notes that calculations run in the browser in the current static implementation, GitHub Pages may process technical request data, no first-party analytics/ads/account feature is intentionally implemented, and third-party web fonts can make external requests.
- Added keyboard-visible focus treatment, minimum touch target/input sizing, reduced-motion handling and mobile guide typography.
- Source review confirmed all eleven calculator buttons are wired into both the currency-format refresh and initial calculation loops in the PR #10 branch. Mortgage, auto, card, retirement and student handlers include finite-value guards and payoff termination limits.
- Important QA gap: browser/Android interaction, actual rendered mobile layout, accessibility/screen-reader, console and live HTTP response tests remain unperformed. Static review cannot certify production readiness.
- This branch is based on PR #10 and remains a separate review PR. No merge or production deployment.


## Integrated QA checkpoint — 2026-11-21

- Integrated the premium visual layer from the design review into the consolidated QA branch and linked it from the homepage, calculator pages and guides.
- Added canonical URLs to the calculator pages and guides; added editorial-page description and canonical metadata.
- Added polite live regions to calculator result groups for assistive technology.
- Standardized mobile navigation and footer policy links on retirement and student-loan calculator pages.
- Static checks: 11 calculator pages have unique IDs, expected calculator button IDs, viewport metadata and script references; internal page links inspected in the 11 calculator pages, guides and policy pages had no missing local HTML targets; sitemap contains all 11 calculators and 8 guides plus policy pages.
- Independent arithmetic spot checks matched the documented outputs for compound growth, personal loan amortization, debt payoff and auto-loan amortization.
- Automated Chromium browser QA now passes in GitHub Actions: homepage loads; all 11 calculators execute their default calculation and render results; result regions expose polite live announcements; mobile navigation opens/closes; homepage has no horizontal overflow at 390px; local HTML links resolve. Run: https://github.com/barsulkhan/USAJIO/actions/runs/44935795608
- Still not performed: physical Android-device testing, screen-reader/manual keyboard audit, Lighthouse/Core Web Vitals and visual regression. Do not mark these as passed.
- Integration is staged in `quality/integrated-final-qa-2026-11-21`; no merge or live deployment has been performed.

- Integrated the competitor research report from the former research PR into this consolidated branch so the research record and implementation now travel together.


## Automated browser QA checkpoint — 2026-11-21

- Added `.github/workflows/browser-qa.yml` and `tests/browser-qa.cjs` on the integration branch. The workflow installs Playwright Chromium and serves the static site locally in CI; it does not deploy the site.
- Successful run: https://github.com/barsulkhan/USAJIO/actions/runs/44935795608 (PASS).
- Verified homepage and all eleven calculator pages load; each calculator's default action runs and produces non-placeholder results; result groups use `aria-live="polite"`; mobile menu toggles correctly; 390px homepage has no horizontal overflow; local HTML links resolve; no browser page errors, console errors or HTTP 4xx/5xx responses were observed during the run.
- This is automated desktop Chromium plus mobile-viewport emulation, not a physical Android device test. Screen-reader/manual keyboard review, Lighthouse/Core Web Vitals and visual regression remain outstanding.
- No merge or GitHub Pages deployment was performed.
