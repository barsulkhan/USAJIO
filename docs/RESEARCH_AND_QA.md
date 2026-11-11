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
