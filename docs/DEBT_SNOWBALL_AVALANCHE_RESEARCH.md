# Multi-debt Snowball vs Avalanche Planner — Research & Implementation Plan

**Research date:** 2026-11-22  
**Target page:** `debt-payoff.html`  
**User job:** A person with multiple fixed-rate debts wants to estimate a realistic payoff path and compare prioritizing the smallest balance (snowball) against the highest APR (avalanche), without signing up or sharing account data.

## Competitor and primary-source review

| Source | Publicly documented capability | Design implication |
|---|---|---|
| [NerdWallet — Debt Snowball](https://www.nerdwallet.com/finance/learn/what-is-a-debt-snowball) (updated Oct 9, 2026) | Order debts smallest balance first, keep minimums current, direct extra funds to the target, roll freed payments to the next debt; explains motivation benefit and possible higher interest cost | Show the payoff order and explain trade-off, not just a single total |
| [NerdWallet — Debt Avalanche](https://www.nerdwallet.com/finance/learn/what-is-a-debt-avalanche) | Order highest interest rate first, keep minimums on other debts and roll freed payments; explains interest savings vs delayed early wins | Compare interest and payoff dates side by side |
| [Bankrate — Debt payoff guidance](https://www.bankrate.com/banking/savings/these-guidelines-will-help-you-decide-whether-to-pay-down-debt-or-save/) | Describes avalanche, snowball and other prioritization factors | Avoid presenting one method as universally best |
| [CFPB — How to reduce your debt](https://www.consumerfinance.gov/archive/blog/how-reduce-your-debt/) | Describes highest-rate and smallest-balance strategies, minimum payments on all debts, and trade-offs | Keep minimum payments protected and disclose method limitations |
| [CFPB — Reducing debt worksheet](https://www.consumerfinance.gov/documents/5782/cfpb_ymyg-toolkit_reducing-debt-worksheet.pdf) | Collect debt balance, interest rate, minimum payment and extra payment; roll freed payment to next debt | Capture the minimum necessary inputs and show the ordered plan |

This review is based on published product/educational pages and official guidance, not a hands-on audit of competitor calculators or independent verification of their calculations.

## Current USAJIO gap

The current `debt-payoff.html` supports one debt balance, one annual rate and one fixed monthly payment. It estimates months and interest, but cannot model several debts, minimum payments, payoff order or compare snowball and avalanche. This is a direct extension of an existing user journey and avoids creating a redundant new calculator.

## Proposed feature

Add a collapsed, optional **Multiple-debt strategy comparison** section beneath the existing single-debt calculator. Preserve the current simple calculator unchanged.

- Support up to four debts with editable short labels, balance, annual APR and minimum monthly payment.
- Provide one additional monthly amount available above the sum of minimum payments.
- Compare Snowball (smallest balance first) and Avalanche (highest APR first) using the same debt inputs and same total monthly budget.
- Continue paying minimums on all active debts; allocate the extra amount to the current priority debt; when a debt is cleared, roll its freed minimum plus allocated extra into the next target.
- Simulate month-by-month interest and payments, cap final payments to actual amount due, and show total interest, months to debt-free, payoff order and month each debt clears.
- Keep processing in the browser; no accounts, API calls, tracking or storage.
- Make the comparison optional and responsive; clearly state assumptions and that actual card issuers may use daily balances, fees, changing rates and minimum-payment formulas not represented by this simplified model.

## Calculation rules and edge cases

- APR is fixed and converted to a monthly periodic rate APR / 12 / 100; monthly interest is calculated on opening balance.
- Minimum payments are fixed user-entered amounts. The tool validates that each minimum is greater than the first month's interest and no more than the balance plus first-month interest; otherwise the simulation cannot safely amortize that debt and must show a correction message.
- Extra monthly budget is non-negative and is added on top of minimums, then directed according to the selected priority order.
- Payments are capped at amount due; no overpayment is counted. When one debt is paid, unused amount flows to the next priority debt in the same month.
- The monthly budget remains constant as debts clear; freed minimum payments are rolled forward, so the strategy's total monthly debt budget does not shrink.
- Maximum simulation horizon is 1,200 months; exceeding it is reported as unable to estimate within 100 years.
- Ties are deterministic: snowball uses APR descending then original row order; avalanche uses balance ascending then original row order.
- Round interest and payments to cents each month. Results are estimates, not lender statements.
- Do not add missed-payment, late-fee, variable-rate, promotional APR, tax, credit-score or consolidation assumptions.

## Acceptance criteria

1. Existing single-debt calculation remains unchanged.
2. Users can enter 1–4 debts; blank optional rows are ignored, but at least one valid debt is required.
3. Every debt requires a non-empty label, positive balance, APR 0–100%, and minimum payment greater than its first monthly interest; malformed rows are identified accessibly.
4. Extra monthly amount accepts zero or greater.
5. Snowball and avalanche use the same monthly budget and independently simulated cent-rounded ledgers.
6. All balances reach zero; monthly payment totals never exceed available budget or amount due; final payments are capped.
7. Show payoff months/order and total interest for both methods; identify savings/difference without calling either method universally best.
8. Handle zero APR, ties, one debt, high extra payment, minimum-payment-too-low, invalid/empty rows and 100-year cap.
9. Mobile 320px layout, keyboard operation, live result announcement and axe WCAG 2.1 A/AA checks pass.
10. No financial inputs are sent over network, placed in URLs or persisted.
11. Browser QA and mobile/desktop Lighthouse pass before merge; Pages deployment verified after merge.

## Implementation sequence

1. Add the optional collapsed form and accessible result comparison to `debt-payoff.html`.
2. Add independent snowball/avalanche monthly simulation in `script.js`, keeping existing `debt-calc` handler intact.
3. Add responsive styles in `calculator-pages.css`.
4. Extend `tests/browser-qa.cjs` for known-answer parity, edge cases, responsive and accessibility behavior.
5. Run Browser QA and mobile/desktop Lighthouse; fix failures before merge.
6. Update Master Project roadmap and this research record with actual workflow and deployment evidence.

## Sources
- https://www.nerdwallet.com/finance/learn/what-is-a-debt-snowball
- https://www.nerdwallet.com/finance/learn/what-is-a-debt-avalanche
- https://www.bankrate.com/banking/savings/these-guidelines-will-help-you-decide-whether-to-pay-down-debt-or-save/
- https://www.consumerfinance.gov/archive/blog/how-reduce-your-debt/
- https://www.consumerfinance.gov/documents/5782/cfpb_ymyg-toolkit_reducing-debt-worksheet.pdf
