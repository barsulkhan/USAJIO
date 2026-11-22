# Advanced Budget Planner — Research, Competitor Analysis & Improvement Plan

**Project:** USAJIO  
**Research date:** 2026-11-22  
**Status:** Research and scope definition; implementation not yet started.

## 1. Existing USAJIO baseline
- Current page: `monthly-budget.html`.
- Existing inputs: monthly income, housing, food, transport, bills & utilities, other expenses, currency.
- Existing outputs: total expenses, money remaining, remaining share.
- Existing formula: total expenses = sum of five expense fields; remaining = monthly income − total expenses; remaining share = remaining ÷ income.
- Current page is a simple monthly snapshot. It does not separate needs/wants/savings, support custom budget targets, compare actual allocations with targets, or account for savings/debt contributions as a distinct budget allocation.
- Existing JavaScript validates non-negative numeric inputs and performs calculations locally in the browser. Preserve this privacy model and existing simple flow.

## 2. Primary research

### CFPB — personal spending rules
- CFPB's 'My spending rule to live by' worksheet describes a common 50/20/30 split (needs, savings/debt, wants) but explicitly encourages consumers to create a personal rule that fits their financial situation.
- Implication: USAJIO must present 50/30/20 as an editable guideline, never as a universal standard, pass/fail score or personalized recommendation.
- Source: https://files-prod.consumerfinance.gov/f/documents/cfpb_worksheet_my-spending-rule-to-live-by.pdf

### CFPB — cash-flow budgeting
- CFPB's cash-flow budget materials track beginning balance, money received, weekly expenses and ending balance, carrying each week's ending balance forward as the next week's beginning balance.
- Implication: monthly totals do not fully explain timing-related shortfalls. This first release should keep the monthly tool simple and explicitly label it a monthly plan; weekly cash-flow forecasting can remain a separate future enhancement.
- Sources: https://files-prod.consumerfinance.gov/f/documents/cfpb_your-money-your-goals_cash_flow_budget_tool_2018-11_ADA.pdf and https://files.consumerfinance.gov/f/documents/cfpb_your-money-your-goals_financial-empowerment_toolkit.pdf

## 3. Competitor analysis

| Product/source | Observed approach | Useful pattern | USAJIO response |
|---|---|---|---|
| NerdWallet budgeting methods (updated May 13, 2026) | Explains 50/30/20, envelope and other methods; emphasizes selecting a system users can maintain | Make the budgeting rule understandable and flexible | Keep basic calculator first; make advanced allocation optional and editable |
| NerdWallet Cash Flow help (Sep 11, 2026) | Uses Needs, Wants and Savings & debt buckets; supports presets and custom targets; bucket totals depend on transaction categorization | Clear three-bucket model and custom target percentages | Manual category-to-bucket mapping; no bank connection or transaction sync |
| CNBC Select budgeting app comparison (2026) | Compares apps with automatic account links, categorization, goals and reports; highlights simplicity, security and pricing trade-offs | Transparent distinction between manual and connected-account workflows | Stay free, manual and browser-local; do not collect bank credentials or add paid integrations |
| CFPB cash-flow worksheet | Weekly starting/ending balances and carry-forward | Show timing is a separate problem from monthly allocation | State monthly snapshot limitation; consider weekly cash-flow planning as a separate later feature |

Sources:
- https://www.nerdwallet.com/finance/learn/how-to-choose-the-right-budget-system
- https://support.nerdwallet.com/en/articles/16923936-how-do-i-use-the-cash-flow-budgeting-tool
- https://www.cnbc.com/select/best-budgeting-apps/
- https://files-prod.consumerfinance.gov/f/documents/cfpb_your-money-your-goals_cash_flow_budget_tool_2018-11_ADA.pdf

## 4. Improvement plan and proposed first-release scope

### Preserve the basic experience
- Keep the current monthly income and five expense inputs, calculate button and three summary outputs.
- Do not force a budgeting method, require an account, ask for transaction data or remove the simple workflow.
- Add an optional Advanced allocation section that users can expand when they want target comparisons.

### Advanced allocation
- Add one optional monthly savings and debt-payments amount, defaulting to zero.
- Let users manually assign each existing expense category to Needs, Wants or Savings & debt. Do not silently assume that categories such as food or transport always belong to one bucket.
- The savings/debt contribution field is classified as Savings & debt by design.
- Allow editable target percentages, default 50 / 30 / 20. Validate that all three are finite, non-negative and sum to exactly 100 (within a small numeric tolerance).
- For each bucket, display actual amount, target amount (net monthly income × target percentage), actual share of net income, target percentage and amount above/below target.
- If a non-zero expense category has no bucket assignment, explain that the allocation comparison is incomplete rather than guessing or displaying misleading totals.
- Keep remaining cash visible and calculate it as net monthly income minus all entered expenses minus savings/debt contributions. A positive remainder is unallocated; a negative remainder is a shortfall.

### Calculation and UX rules
- Label income as take-home/net monthly income for the percentage targets.
- Distinguish 'budget target' from 'actual spending/allocations'; the user is entering planned or actual amounts manually, so label the mode clearly and do not imply transaction verification.
- Do not score, shame or declare a user financially unhealthy for exceeding a guideline.
- Explain that target percentages are editable planning assumptions and may not fit high housing costs, debt obligations, family needs or irregular income.
- Do not convert currencies or apply country-specific tax/benefit rules. Currency selector remains display formatting only.
- Preserve browser-local processing; do not add analytics events or network calls containing financial inputs.

### Explicitly out of scope for first release
- Bank/account connections, transaction imports, credential collection or paid APIs.
- Automated categorization, account sync, cloud storage or user accounts.
- Weekly cash-flow calendar, bill due-date reminders, rollover envelopes and irregular-income forecasting; evaluate separately after the monthly allocation release.
- Financial advice, recommended debt repayment amounts, or claims that 50/30/20 is suitable for everyone.

## 5. Acceptance criteria
1. Existing basic budget results remain unchanged when the advanced section is unused and the savings/debt amount is zero.
2. Total expenses and remaining cash reconcile exactly to the entered values (within cent rounding).
3. Advanced bucket totals reconcile to the sum of all assigned categories plus savings/debt contributions.
4. Unassigned non-zero categories prevent a misleading complete allocation comparison and are clearly identified.
5. Default targets are 50/30/20; custom targets are accepted only when their sum is 100%.
6. Actual percentages use take-home monthly income; zero income is handled without division-by-zero or NaN output.
7. Tests cover empty, zero, negative, invalid, very large, mixed-category, custom-target, unassigned-category, surplus and deficit cases.
8. Mobile responsive layouts, keyboard operation, accessible labels/live results and 320px viewport are checked.
9. Financial values remain browser-local; no network requests, storage persistence or URL/body leakage are introduced.
10. Browser QA and mobile/desktop Lighthouse checks pass before merge; GitHub Pages deployment is verified after merge.

## 6. Implementation sequence
1. Add the advanced allocation section and explicit category mapping without changing the basic calculation path.
2. Add a pure allocation calculation helper where practical; render actual/target comparison from validated inputs.
3. Extend browser QA for arithmetic reconciliation, custom targets, unassigned categories, zero income, invalid values, responsive behavior, accessibility and privacy.
4. Run Browser QA, mobile Lighthouse and desktop Lighthouse on the feature branch.
5. Review diff and results; squash-merge only after all required checks pass.
6. Verify GitHub Pages deployment and update the master project roadmap with evidence.

## 7. Source and limitations
- Research is based on the linked public guidance and competitor feature descriptions, not hands-on testing of competitor apps.
- Product features and availability can change; re-check primary product documentation if implementation depends on a specific behavior.
- The 50/30/20 method is an optional rule of thumb, not a regulatory standard or individualized financial recommendation.