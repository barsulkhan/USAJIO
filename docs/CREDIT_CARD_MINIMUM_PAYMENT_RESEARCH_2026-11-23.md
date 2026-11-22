# USAJIO Credit Card Minimum-Payment Planner — Competitor Research
**Research date:** 2026-11-23  
**Branch:** `feature/credit-card-minimum-payment-planner-2026-11-23`

## Competitor observations
Public-page research (not a hands-on audit):
- **CreditBharosa** groups a minimum-due calculator, credit-card payoff calculator and balance-transfer calculator, and says assumptions are stated plainly and calculations run in-browser: https://www.creditbharosa.com/tools/ (web result reviewed 2026-11-23).
- **Toolsfy** shows a credit-card payoff workflow with payoff time, total interest, payoff date and monthly schedule, while explicitly warning that issuer daily-balance and fee rules may differ: https://www.toolsfy.in/tools/credit-card-payoff-calculator (reviewed 2026-11-23).
- **iBudget** explains a two-simulation model: minimum-only payment recalculated each month versus a fixed-payment plan, and clearly documents its percentage-plus-floor assumptions: https://ibudget.app/tools/credit-card-payoff-calculator (reviewed 2026-11-23).
- **CalculatorGeek** includes rate phases, account fees, and issuer-specific minimum-payment formula inputs: https://calculatorgeek.com/finance/credit-card-payoff-calculator/ (reviewed 2026-11-23).
- **USAJIO current gap:** the existing Debt Payoff page accepts one fixed monthly payment. It does not model a declining minimum payment based on a user-entered percentage and floor.

## Feature proposal
Add a separate, focused Credit Card Minimum-Payment Planner. Inputs: current balance, APR, minimum-payment percentage, minimum dollar floor, and display currency. Each month: add interest at APR/12; calculate minimum as the greater of the percentage of the interest-inclusive balance and the floor; cap payment at amount owed; apply payment; record interest and remaining balance. Show payoff months, total interest, first minimum payment, total paid, and the first 12 monthly schedule rows.

## Guardrails and limitations
- Percentage and floor are user-editable assumptions, not a claim about any issuer's actual rule.
- Monthly APR/12 interest is a simplified estimate; many issuers use average daily balance, differing APR buckets, fees, grace periods and payment-allocation rules.
- No new purchases, fees, rate changes, promotional rates, missed payments, late charges or compounding conventions beyond the stated monthly model.
- No issuer lookup, account connection, network transmission or browser storage.
- If the payment rule does not reduce principal or the plan exceeds 1,200 months, show a clear limitation instead of a false payoff date.
- The tool is educational, not financial advice.

## Acceptance criteria
1. A standalone mobile-friendly page is discoverable from the homepage.
2. Valid inputs return payoff months, first minimum payment, total interest, total paid and up to 12 schedule rows.
3. Zero APR and zero balance are handled correctly.
4. Percentage and floor are validated; invalid or non-amortizing plans do not show fabricated payoff results.
5. Assumptions and limitations are visible before users rely on the result.
6. Browser QA covers normal, zero-rate, invalid and non-amortizing cases; Lighthouse mobile and desktop pass before merge.
