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


---

## 2026-11-21 — Ongoing research, work plan and decision log

This file is the living research and execution log for USAJIO. Update it after each meaningful research, planning, development, test, review, merge or release activity. Keep completed work, failures, corrections, pending work and decisions separate. Do not silently overwrite history; append dated entries and mark superseded plans.

### Product goal and audience
- Primary audience: people in the United States.
- Product: an English-language personal finance education and calculator resource.
- Initial priority: make the six existing calculators accurate, understandable, accessible and dependable before expanding the site.
- Longer-term content/tool areas, in priority order to be researched: credit score and credit education; credit cards; mortgages and home loans; auto loans; insurance; retirement and tax planning.
- Revenue/RPM is a business consideration, not a promise. Never publish guaranteed RPM or income claims. Any future monetization must preserve trust, disclose affiliate relationships, and be reviewed before implementation.
- Cost rule: remain on the current GitHub Pages setup; no paid domain, hosting, API, subscription or other paid service without explicit user permission.

### Working rules
1. Before every code change, fetch and inspect the latest `main` and relevant files.
2. Work on a clearly named branch; do not edit `main` directly.
3. Follow Research → Competitor Analysis → Improvement Plan → Development → Testing for each meaningful feature.
4. Test calculations against independently calculated examples and boundary cases; distinguish simulated tests from real browser/device tests.
5. Do not merge until the relevant tests and review gates are satisfied. The user has authorized merging project changes, but that does not waive QA or release checks.
6. Verify GitHub Actions and the live GitHub Pages site separately. A successful commit or workflow start is not proof of deployment.
7. Update this log and the canonical master project file after each completed work session.
8. Keep USAJIO separate from InfoJano. Do not introduce paid dependencies.

### Existing research and benchmark baseline
- Competitor/reference sites previously reviewed: NerdWallet calculator hubs, Bankrate calculator hub and Finelta methodology.
- Reference URLs:
  - https://www.nerdwallet.com/banking/calculators
  - https://www.nerdwallet.com/finance/calculators
  - https://www.bankrate.com/calculators/
  - https://finelta.com/methodology
- Initial observations: make formulas and assumptions visible; show total cost/interest, not just a headline payment; explain timing conventions; validate impossible inputs; make mobile controls and educational context clear.
- Scope caveat: this is a focused initial benchmark, not a comprehensive competitor, keyword, RPM or legal/compliance audit. Recheck sources and dates before relying on market claims.

### Project history and current status — 2026-11-21
- The six calculators already present are Compound Interest, Loan, Monthly Budget, Savings Goal, Emergency Fund and Debt Payoff.
- Earlier QA identified these defects/risks: blank or negative values could be silently converted to zero; a zero-month savings period could mislead; debt payments at or below monthly interest could prevent payoff; zero balances needed explicit handling; compound contribution timing and loan extra-payment assumptions needed clearer disclosure.
- A working branch `qa/six-calculators-validation` was created from `main`. It changes `script.js`, `styles.css` and the canonical master project file.
- That branch adds field-level validation, accessible inline errors, zero-balance handling and explanatory assumptions.
- Checks recorded on the branch: JavaScript syntax parsing and simulated DOM regression checks for default values and edge cases passed. These are simulated checks only; they do not establish real Android Chrome behavior, full accessibility, or current live deployment.
- PR #1: https://github.com/barsulkhan/USAJIO/pull/1 — “QA: validate inputs across all six financial calculators”. On the latest GitHub fetch at this checkpoint it is open, not merged, and GitHub reports `mergeable: true`. It contains 4 commits and 3 changed files. No review comments or submitted reviews were returned.
- Do not assume PR #1 is production-ready solely because GitHub currently reports it mergeable. Real Android Chrome QA, browser accessibility checks and current deployment verification remain outstanding.
- The master project file on `main` has not yet received the QA checkpoint; that checkpoint currently exists on the PR #1 branch.
- Previous workflow run `43180954264` was recorded as completed/cancelled at its deploy job. Do not call that a successful deployment. A prior successful deployment `43022301635` is historical evidence only, not proof of the current live state.

### Prioritized execution plan

| Priority | Work item | Status | Completion evidence required |
|---|---|---|---|
| P0 | Preserve project history and keep this living log | In progress | Log committed in repository and linked from the master file |
| P0 | Review PR #1 and validate all six calculators in a real browser | Pending | Repeatable test cases and recorded actual results |
| P0 | Android Chrome QA | Pending | User/device observations for layout, input, output and errors |
| P0 | Accessibility and navigation/policy review | Pending | Keyboard/focus, labels/errors, responsive layout and page review |
| P0 | Merge PR #1 after QA gates pass | Pending | GitHub confirms merged; record merge SHA |
| P0 | Verify GitHub Pages deployment and live site | Pending | Successful deploy run and fresh live-site checks |
| P1 | Update canonical master project file after QA/release | Pending | Main-branch file fetched back and checkpoint verified |
| P1 | Technical SEO foundation (metadata, canonical URLs, sitemap, robots, structured content) | Not started | Research, implementation and validation |
| P1 | US-specific content plan and keyword/intent research | Not started | Dated research with sources and editorial priorities |
| P2 | New tools: credit card, mortgage and auto loan calculators | Not started | Formula research, assumptions, competitor review and tests |
| P2 | Guides: credit score, insurance, retirement and tax | Not started | Authoritative US sources, review dates and clear disclaimers |
| P3 | Monetization/ads/affiliate strategy | Not started | Eligibility and policy research; no integration without user approval |

### Next action (do not skip order)
1. Perform real browser QA for all six calculators using the current PR branch, starting with normal/default values, then zero, minimum/maximum, blank, negative, malformed and impossible inputs.
2. For Android Chrome, ask the user to open the current live site and report any layout or interaction problem; if the PR branch is not deployed, do not imply the live site contains the PR changes. Use a preview or local browser test only if an available safe workflow supports it.
3. Review accessibility, navigation and policy-page copy.
4. Fix confirmed defects on a follow-up branch and rerun tests.
5. Recheck PR #1; merge only when the QA gates are met. Record the exact merge SHA.
6. Verify the resulting Pages workflow and fetch the live website before claiming release.
7. Update this file and `docs/USAJIO_MASTER_PROJECT_2026-11-11.md` with exact outcomes, failures, corrections and remaining work.

### Session log format
For each future session append:
- Date/time and branch/commit/PR:
- Research and sources checked:
- Plan and reason for priority:
- Changes made:
- Tests run and exact results:
- Failures/errors encountered:
- Corrections made:
- Merge/deployment/live verification:
- Still pending / next action:
- Master project file update status:

