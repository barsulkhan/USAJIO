# Compare Scenarios — Research, Competitor Analysis & Improvement Plan

**Project:** USAJIO  
**Research date:** 2026-11-22  
**Status:** Research and scope definition; implementation not yet started.

## 1. Existing USAJIO baseline
- Current source page: loan-calculator.html.
- Current fixed-rate calculator accepts one loan amount, annual interest rate, term (years) and extra monthly principal payment.
- Current engine uses monthly periodic interest and a cent-rounded amortization ledger, caps the final payment, and reports monthly payment, total interest, total repayment, payoff count, extra principal and a monthly schedule.
- Current assumptions exclude fees, taxes, insurance and prepayment penalties. The calculator explicitly says it is an estimate, not a lender quote.
- The baseline example ($10,000 at 7% for 5 years, no extra payment) is 60 payments, $198.02 scheduled monthly payment, $1,880.67 total interest and $11,880.67 total repayment.
- Keep the existing loan calculator behavior and financial calculations unchanged. Build scenario comparison as a separate page and reuse a shared, tested calculation helper only if refactoring can preserve the current outputs.

## 2. Primary research

### CFPB — compare written Loan Estimates
- CFPB says to compare loan amount, interest rate and monthly principal-and-interest payment, and to compare costs over the life of the loan. Its Loan Estimate comparison guidance also discusses five-year cost and principal paid off, not just the monthly payment.
- CFPB cautions that APR/TIP and upfront costs should be considered together; a low headline rate or 'no closing costs' offer can conceal higher costs elsewhere.
- Implication: a general what-if scenario tool must not claim to compare real lender offers fully if it excludes APR, fees, points, credits, taxes or insurance. It should clearly separate modeled principal/interest scenarios from formal lender disclosures.
- Sources: https://www.consumerfinance.gov/owning-a-home/compare/compare-loan-estimates/ and https://files-prod.consumerfinance.gov/f/documents/cfpb_your-home-loan-toolkit_print_2026-08.pdf

### CFPB — request like-for-like offers
- CFPB recommends asking multiple lenders for the same kind of loan and same features so the comparison is apples-to-apples. It also notes that rate-lock date and loan features matter.
- Implication: use a single shared loan amount for all scenarios in the first release, and vary only rate, term and recurring extra principal. This prevents a misleading comparison where each scenario borrows a different amount.
- Source: https://www.consumerfinance.gov/owning-a-home/compare/request-and-review-multiple-loan-estimates/

## 3. Competitor analysis

| Product/source | Observed approach | Useful pattern | USAJIO response |
|---|---|---|---|
| Calcendium Loan Comparison Calculator (reviewed Oct 24, 2026) | Up to three offers; monthly payment, interest, fees, total cost and effective APR; includes browser-local calculation claim | Side-by-side three-column comparison and clear total-cost metrics | Compare up to three scenarios, but do not claim APR/fee-inclusive lender comparison in a fee-free model |
| SumAtlas Loan Comparison Calculator (updated Oct 10, 2026) | Two or three offers, interest rate, term, upfront fees, APR, total cost and break-even | Shared inputs, optional advanced assumptions, explicit difference and break-even outputs | Keep first release simpler: shared principal, scenario-specific rate/term/extra payment, no unsupported APR or break-even claims |
| CFPB Loan Estimate comparison | Uses official written disclosures, monthly principal/interest, five-year cost, principal reduction, APR/TIP and upfront costs | Explain what a simplified calculator can and cannot compare | Link to official disclosure guidance; label scenario results as estimates, not lender offers |

Sources:
- https://calcendium.com/en/calculators/finance/loan-comparison-calculator/
- https://sumatlas.com/us/loans/loan-comparison-calculator
- https://www.consumerfinance.gov/owning-a-home/compare/compare-loan-estimates/

## 4. Improvement plan and proposed first-release scope

### Product definition
- Build a separate Compare Scenarios page for fixed-rate loan what-if analysis, not a marketplace or lender ranking tool.
- Compare up to three scenarios against one shared loan principal and currency.
- Each scenario has its own annual interest rate, term in years and extra monthly principal amount.
- Provide a clear default baseline and two editable scenarios. Users can leave a scenario disabled/blank if they only want a two-way comparison.

### Comparison outputs
- Scheduled monthly principal-and-interest payment before extra principal.
- Actual monthly outflow including the recurring extra principal amount.
- Total interest, total principal repaid and total payments over the payoff period.
- Number of payments/payoff duration and total extra principal applied.
- Difference versus Scenario A for total interest, total repayment and payoff count; show signs and units clearly.
- Identify lowest monthly outflow and lowest total interest as separate observations, never as a single 'best loan' recommendation.
- Explain that a longer term can lower monthly payments but increase total interest; show this directly from the modeled results.

### Calculation and safety rules
- Use the same monthly-rate, cent-rounded amortization logic and final-payment cap as the current Loan Payment Calculator.
- Keep the shared loan amount identical across all scenarios for a like-for-like comparison.
- Use annual nominal rate divided by 12, monthly payments and a fixed rate throughout; state these assumptions.
- Do not calculate or display APR, finance charge, points, lender fees, closing costs, prepayment penalties, taxes or insurance in the first release.
- Do not label any scenario a lender offer or promise savings; scenario inputs are user-entered assumptions, not verified quotes.
- If a future release adds fees or lender-offer comparison, first research fee treatment and APR methodology and test against authoritative disclosures.
- Preserve browser-local calculations; do not send financial inputs over the network or persist them to storage.

### UX and accessibility
- Keep scenario cards visually parallel with consistent field order and labels.
- Make the shared loan amount prominent so users understand the comparison is normalized.
- Use a semantic comparison table with scoped headers and a horizontal scroll region on narrow screens; include a stacked summary for small mobile viewports if necessary.
- Provide text explanations for differences; do not rely on color alone.
- Support keyboard-only operation, visible focus, labels, live result announcements and 320px viewport.

### Explicitly out of scope
- Real lender-rate search, prequalification, lender recommendations or application flows.
- APR/fee-inclusive offer comparisons, mortgage Loan Estimate extraction, tax/insurance/escrow and points/credits.
- Variable-rate, balloon, interest-only, biweekly or daily-accrual loans.
- Cloud storage, account creation, bank connections or paid APIs.

## 5. Acceptance criteria
1. Existing Loan Payment Calculator remains unchanged and its known-answer amortization result stays at 60 payments, $198.02 scheduled payment and $1,880.67 interest for the $10,000 / 7% / 5-year baseline.
2. Two or three scenarios share one loan amount and currency; each scenario independently validates rate (0–100%), term (1–50 years) and non-negative extra payment.
3. Zero-rate scenarios, no-extra scenarios, extra-payment acceleration, final-payment cap and maximum-term edge cases reconcile to the same cent-rounded engine.
4. Scenario totals reconcile: total repayment = principal + total interest; all final balances are $0.00; payment count never exceeds 600.
5. Deltas versus Scenario A are correct for interest, repayment and payoff count; equal scenarios produce zero differences.
6. Lowest monthly outflow and lowest total interest are distinct labels, not a universal best-choice badge.
7. Fee/APR exclusions and fixed-rate monthly assumptions are visible near the results.
8. Browser QA covers known answers, zero rate, high extra payments, invalid inputs, same-principal comparison, two/three scenarios, mobile overflow, keyboard and accessibility.
9. Privacy tests confirm no network request, storage persistence or URL/body leakage of financial values.
10. Browser QA, mobile Lighthouse and desktop Lighthouse pass before merge; GitHub Pages deployment is verified after merge.

## 6. Implementation sequence
1. Review the current loan engine and decide whether to extract a shared pure amortization helper without changing its existing outputs.
2. Create compare-scenarios.html with shared principal and up to three parallel scenario cards.
3. Render side-by-side results and deltas using the shared cent-rounded ledger.
4. Add responsive comparison table and mobile summary, labels, keyboard and live result announcements.
5. Extend Browser QA for calculation parity, edge cases, three-scenario reconciliation, privacy and 320px layout.
6. Run Browser QA and mobile/desktop Lighthouse; review the diff and results.
7. Squash-merge only after all required checks pass; verify GitHub Pages deployment and update the master roadmap.

## 7. Research limitations
- Competitor analysis uses public feature descriptions, not hands-on testing or independent verification of competitor calculations.
- CFPB Loan Estimate guidance primarily addresses mortgage offers. USAJIO's first release is a general fixed-rate loan scenario model and must not imply that it replaces official disclosures.
- The calculator is educational and should not choose a loan for the user.