# Weekly Cash Flow Planner — Competitor Research & Product Brief

**Project:** USAJIO  
**Research date:** 2026-11-23  
**Status:** Implementation branch

## User problem and current gap
USAJIO's Monthly Budget Planner is a monthly allocation snapshot. Its cash-flow guide explains timing but does not calculate dated future balances. A user can have a positive monthly surplus and still face a short-term shortfall when bills arrive before a paycheck.

## Competitor and primary-source review
- **Quicken Simplifi:** Projected Cash Flow uses scheduled income, bills, subscriptions, refunds and future-dated transactions to project balances over a selectable period, including up to one year. The core pattern is a running balance that changes on each scheduled date. Source: https://www.quicken.com/features/projected-cashflow
- **Quicken Simplifi Help:** Its projections use recurring income reminders, bills/subscriptions and future-dated transactions; its documentation notes that the result depends on keeping reminders current. Source: https://support.simplifi.quicken.com/en/articles/3357429-using-projected-cash-flow
- **NerdWallet:** Its cash-flow budgeting tool uses a flexible needs/wants/savings-and-debt allocation and custom budget splits. This complements, but does not replace, a dated balance forecast. Source: https://support.nerdwallet.com/en/articles/16923936-how-do-i-use-the-cash-flow-budgeting-tool
- **CFPB:** The cash-flow budget worksheet carries each week's ending balance into the next week's beginning balance and records weekly income and expenses. This is an authoritative model for timing-based cash planning. Source: https://files-prod.consumerfinance.gov/f/documents/cfpb_your-money-your-goals_cash_flow_budget_tool_2018-11_ADA.pdf

This is a public-source feature review, not a hands-on audit of competitor products.

## Proposed USAJIO implementation
- Dedicated weekly cash-flow planner, linked from homepage and sitemap.
- Starting balance, forecast start date, 4/8/13-week horizon and display currency.
- User-entered income and expense items with one-time, weekly, biweekly or monthly recurrence.
- Date-based running balance, weekly inflow/outflow/ending balance, lowest daily projected balance and count of weeks with a negative daily balance.
- Monthly recurrence clamps to the last valid day of shorter months.
- Manual estimates only; no account connections, transaction import, network submission or browser storage.

## Red-team risks and controls
- **Dates/time zones:** Parse date-only values as UTC calendar dates to avoid local DST shifts.
- **Month-end recurrence:** Clamp Jan 31-style recurrence to the last day of shorter months.
- **Double counting:** Same-day events are netted together; explicitly document that intraday order and pending transaction timing are not modeled.
- **Stale results:** Hide prior forecast when any input changes.
- **Negative cash:** Report negative daily balances, not only negative week-end balances, so a shortfall that recovers later in the week is not hidden.
- **Bad inputs:** Reject negative/zero event amounts, invalid dates and dates before the forecast start.
- **Privacy:** Use local DOM calculation only; no analytics payload, account credentials, local storage or network requests carrying financial inputs.
- **Scope:** Forecast only the user-entered schedule; do not imply bank accuracy, overdraft prediction, tax treatment or individualized financial advice.

## Acceptance criteria
1. Start balance carries forward day by day; event date adds income or subtracts expense.
2. Weekly money-in/out totals and ending balances reconcile to all scheduled events.
3. Weekly, biweekly, monthly and one-time schedules recur on correct dates, including month-end clamping.
4. Negative daily balances are detected even when the week ends positive.
5. Empty schedule, invalid amount, invalid date, date before start and negative start balance are rejected accessibly.
6. Editing any forecast input invalidates stale results.
7. Keyboard-operable labeled controls, live status, responsive table and no horizontal page overflow at 320px.
8. Browser QA, axe WCAG 2.1 A/AA, mobile and desktop Lighthouse must pass before merge.
9. GitHub Pages deployment is checked after merge; no merge if required checks fail.

## Release gate
Separate feature branch and PR. Run the repository Browser QA workflow and both Lighthouse profiles on the PR head. Review all diffs and check results before squash merge. Verify the deployed URL and record deployment evidence after merge.
