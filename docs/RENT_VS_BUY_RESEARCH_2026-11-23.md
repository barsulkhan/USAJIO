# USAJIO Rent vs. Buy Comparison — Competitor Research
**Research date:** 2026-11-23  
**Branch:** `feature/rent-vs-buy-comparison-2026-11-23`

## Competitor observations
Public-page research (not a hands-on full calculator audit):
- **NerdWallet**'s calculator compares rent and buying across a stay horizon, shows break-even, and includes deposits, rent increases, closing costs, property taxes, homeowners insurance, PMI, maintenance, HOA, selling costs, appreciation, inflation, tax effects and opportunity cost: https://www.nerdwallet.com/mortgages/calculators/rent-vs-buy-calculator (page updated Nov 2, 2026).
- **Bankrate** highlights upfront and ongoing costs, including down payment, closing costs, insurance, property taxes, repairs and HOA, and the importance of intended stay length: https://www.bankrate.com/mortgages/rent-or-buy-home-calculator/ (reviewed 2026-11-23).
- **Zillow Research** describes a long-horizon model that considers equity, recurring costs, sale proceeds and the alternative investment of renter savings: https://www.zillow.com/research/rent-vs-buy-methodology/ (June 4, 2026).
- **CFPB** says homeowners should budget for principal/interest, taxes, mortgage insurance, homeowners insurance, HOA, maintenance, repairs and utilities; closing costs often range 2%–5%: https://www.consumerfinance.gov/owning-a-home/prepare/figure-out-how-much-you-want-to-spend/ (reviewed 2026-11-23).
- **CFPB** also notes buying/selling fees can make short stays expensive and maintenance/repair costs fall to the owner: https://www.consumerfinance.gov/ask-cfpb/what-are-some-of-the-financial-considerations-of-buying-a-home-en-119/ (last reviewed Jun 27, 2024).

## USAJIO gap and proposed improvement
The current site has mortgage, rent-adjacent budgeting and loan calculators but no dedicated rent-versus-buy comparison. Add a focused calculator with editable assumptions, total unrecoverable cost, estimated sale equity, break-even horizon and an annual comparison table. Keep the first screen compact and put optional assumptions in a disclosure section.

## Model scope and formulas
- Mortgage payment uses a fixed-rate amortizing loan, monthly rate = APR/12; zero APR uses principal divided by term months.
- Each month: rent increases at the start of each new year by the entered annual rate; home value compounds monthly at the entered annual appreciation rate; mortgage amortization is calculated monthly.
- Buyer cash cost includes down payment, purchase closing costs, mortgage payments, property tax, homeowners insurance, HOA, maintenance, and user-entered PMI estimate. At the end of the selected stay, subtract net sale proceeds (home value less selling costs and remaining mortgage balance).
- Renter cost includes rent and renter insurance. Security deposit is excluded on the assumption it is fully refundable.
- Break-even is the first modeled year where buyer net cost is no higher than renter cost.

## Guardrails and limitations
- All growth, fees, tax, insurance and PMI fields are user-entered assumptions; defaults are illustrative, not market quotes.
- No tax deductions, capital-gains tax, inflation adjustment, opportunity cost/investment return on down payment or monthly savings, utilities, moving costs, repairs outside the maintenance allowance, rate changes, ARM resets, loan fees, or local transfer taxes are modeled.
- Monthly approximation is not a lender quote. Actual mortgage, escrow, insurance, tax and sale costs vary by location and loan.
- No personal recommendation: the tool compares assumptions and does not decide which housing choice is right.
- Browser-only calculations; no network transmission or storage.

## Acceptance criteria
1. Homepage link and sitemap entry for a dedicated responsive Rent vs. Buy page.
2. Valid scenarios show renter cost, buyer net cost, net sale proceeds, lower modeled cost and first break-even year if found.
3. Annual schedule reflects rent escalation, home appreciation and mortgage amortization.
4. Zero APR, zero stay length, down payment boundaries, negative appreciation/rent growth and non-finite inputs are handled.
5. Assumptions and exclusions are visible; output avoids categorical financial recommendations.
6. Browser QA covers standard, zero-rate, invalid and short-stay cases; accessibility and Lighthouse mobile/desktop pass before merge.
