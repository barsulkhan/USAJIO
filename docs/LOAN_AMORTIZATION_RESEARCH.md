# USAJIO Loan Amortization Schedule — Research & Product Brief

**Research date:** 2026-11-22  
**Status:** Research pass complete; product decisions proposed; development not started.  
**Target page:** `loan-calculator.html`; shared logic: `script.js`.

## 1. Current USAJIO baseline
Current inputs: loan amount (>0, up to 1e12), annual rate (0–100%), term (1–50 years), recurring extra monthly payment (0–1e12), and display currency (USD, EUR, GBP, CAD, AUD, INR). Results: monthly payment including extra, total interest and total repayment. The page describes a fixed-rate monthly estimate excluding taxes, fees, insurance, lender charges and prepayment penalties.

Current code computes monthly rate as annual/1200, uses the standard fixed-payment formula (or principal/months at zero rate), then iterates monthly interest against the balance and applies base payment + extra. It stops near zero and caps at 600 months. There is no visible per-payment schedule or payment start-date input. Internal calculations are not rounded to cents per month; display formatting rounds only at presentation. A cent-rounded schedule could therefore change displayed lifetime totals by pennies. Implementation must use one consistent ledger for rows and totals and document the policy.

## 2. Public competitor patterns

### TransUnion — Amortization Calculator
https://www.transunion.com/tools/amortization-calculator
- Schedule fields include payment number/date, opening balance, scheduled payment, interest, principal, ending balance and cumulative interest.
- Offers recurring, yearly and one-time extra payments; schedule is grouped by year.
- Discloses that lender-specific rounding/processes can cause differences.
- Lesson: useful column names, cumulative interest, yearly grouping and clear estimate caveats.

### TransUnion — Loan Payment Calculator
https://www.transunion.com/tools/loan-payment-calculator
- Combines quick summary metrics with monthly/yearly schedule breakdown.
- Separates loan amount, interest, total cost and payoff date.
- Lesson: provide a quick summary and a detailed schedule.

### DexoCalc — Loan Amortization Calculator
https://www.dexocalc.com/finance-calculators/loan-amortization-calculator/
- Separates simple monthly mode from an advanced schedule builder; supports recurring extras, lump sums and specialized loan structures.
- Lesson: progressive disclosure keeps the basic flow approachable. Balloon/interest-only/variable-frequency options are out of first-release scope.

### PayoffSchedule
https://www.payoffschedule.com/
- Shows payment-by-payment date, payment, principal, interest, extra and balance; promotes CSV/Excel/PDF export.
- Lesson: exports are useful after the schedule is validated, not before.

### Minimum competitive feature set
1. Summary: base scheduled payment, total interest, total paid, number of payments.
2. Monthly table: payment number, beginning balance, scheduled payment, extra principal, interest, principal paid, ending balance and cumulative interest.
3. Explicit assumptions and warning that daily accrual, fees, posting dates and lender rounding can differ.
4. Accessible table semantics and a mobile-friendly presentation.
5. CSV export only after row and summary totals reconcile. PDF/Excel are later enhancements.

## 3. Primary-source grounding
- CFPB, “How does paying down a mortgage work?” (reviewed May 28, 2024): each payment includes principal and interest; the fixed-rate principal-and-interest amount can remain constant while its allocation changes; taxes and insurance may be additional. https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/
- CFPB, “What is amortization and how could it affect my auto loan?”: explains changing principal/interest split and the effect of loan term on payment and total interest. https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-auto-loan-en-771/
- CFPB, “What is negative amortization?”: if payment does not cover accrued interest, the amount owed can rise. USAJIO must not silently show a misleading payoff schedule for a non-amortizing payment. https://www.consumerfinance.gov/ask-cfpb/what-is-negative-amortization-en-103/

## 4. Proposed first-release scope

**In scope**
- Keep current fixed-rate monthly inputs and assumptions.
- Generate a complete monthly schedule consistent with the summary.
- Columns: payment number, opening balance, scheduled/base payment, extra payment, interest, principal and ending balance.
- Summary: scheduled payment, total interest, total paid, total extra paid and actual payment count.
- Cap the final installment to the amount actually needed to clear the balance.
- Apply recurring extra amount as additional principal after scheduled interest is covered.
- Explain that this is a simplified monthly estimate, not a lender statement.
- All computation remains browser-local; do not transmit entered loan values.

**Out of scope**
- Variable rates, daily accrual, biweekly/weekly schedules, annual or one-time lump sums, balloon payments, interest-only periods, taxes/insurance/fees, refinance comparisons, dated payoff calendar, PDF/Excel exports.
- CSV can be added only after schedule correctness is demonstrated; broader exports belong to the Downloadable Reports milestone.

## 5. Rounding decision for implementation
Options: exact internal precision preserves current summary more closely but displayed row sums can differ by a few cents; a cent-rounded monthly ledger makes rows and totals auditable but can change lifetime interest slightly.

Recommendation: use a cent-rounded monthly ledger and derive summary totals from that same ledger. Compute theoretical base payment at full precision, round actual monthly cash amounts to cents, cap final payment at opening balance + interest, and close final balance at $0.00. Document the convention and test against independent known-answer cases. This is a proposed decision to confirm during implementation, not a claim that lender statements use the same convention.

## 6. Required tests
- Known answer: $10,000, 7%, 5 years, no extra.
- Zero interest; payment equals principal/months and total interest is zero.
- Recurring extra payment reduces both payoff count and total interest.
- Extra exceeds remaining amount; final payment is capped, balance never negative.
- Tiny positive rate, fractional cents and reconciliation.
- Maximum term (600 payments) and high valid principal.
- Empty, invalid, negative and over-limit inputs; zero principal rejected accessibly.
- Currency selector reformats every monetary value, including schedule cells.
- Reconcile each row: opening balance + interest − principal − extra = ending balance; sum principal equals original principal; sum interest equals total interest; total paid equals principal + interest.
- Keyboard navigation, associated table headers, screen-reader announcements and narrow mobile widths.
- Full existing browser QA and relevant Lighthouse checks.

## 7. Decision log and next actions
- [x] Inspect current `loan-calculator.html` and loan logic in `script.js`.
- [x] Review public competitor patterns (TransUnion, DexoCalc, PayoffSchedule).
- [x] Ground terminology and limitations in CFPB guidance.
- [ ] Confirm rounding policy and column definitions in implementation plan.
- [ ] Implement schedule and tests on a dedicated feature branch.
- [ ] Run browser QA, relevant performance/accessibility checks, review PR and merge only when green.
- [ ] Verify GitHub Pages deployment for merged commit.

**No production code has been changed as part of this research brief.**