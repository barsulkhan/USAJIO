# Inflation-adjusted Retirement Projection — Research, Competitor Analysis & Improvement Plan

**Project:** USAJIO  
**Research date:** 2026-11-22  
**Status:** Complete — PR #59 merged and GitHub Pages deployment verified.

## 1. Existing USAJIO baseline
- Current page: retirement-calculator.html.
- Inputs: current retirement savings, monthly contribution, years until retirement, assumed annual return (0–30%) and employer match percentage.
- Current model derives an effective monthly rate from the entered annual return, compounds the existing balance monthly, and adds each monthly contribution (including match) at month-end.
- Current outputs: nominal projected future balance, total contributions including match and nominal estimated growth.
- Current methodology excludes inflation, fees, taxes, investment volatility, contribution limits, vesting, withdrawals and retirement income.
- Preserve the existing base projection and its current known-answer results; add inflation/scenario analysis as an optional section.

## 2. Primary research

### U.S. Department of Labor — Taking the Mystery Out of Retirement Planning
- DOL uses assumed rates of return in its educational examples and explicitly warns that returns go up and down and cannot be guaranteed.
- DOL's worksheets show how inflation affects future expenses and emphasize that long-range inflation assumptions are difficult to predict.
- Implication: all return and inflation inputs must be editable assumptions, not system forecasts or guarantees. Results should be shown as illustrations, not a promise or personalized investment recommendation.
- Source: https://www.dol.gov/agencies/ebsa/about-ebsa/our-activities/resource-center/publications/taking-the-mystery-out-of-retirement-planning

### FINRA — Retirement Calculator
- FINRA's retirement calculator asks users to consider inflation, assumed average annual return, account type, tax assumptions and whether contributions rise with inflation. It warns that returns are difficult to predict and encourages trying different rates.
- Implication: clearly disclose which important real-world factors USAJIO does and does not model. Keep the first release simpler by not estimating taxes, account rules or withdrawals.
- Source: https://retirementcalculator.nga.finra.org/calculator/

### Real versus nominal values
- A nominal future balance is converted into today's purchasing-power terms by dividing by the cumulative inflation factor: real value today = nominal future balance / (1 + inflation)^years.
- The equivalent annual real return is (1 + nominal return) / (1 + inflation) − 1. This can be negative even when the nominal return is positive.
- Implication: label nominal future dollars and inflation-adjusted today's dollars separately. Never subtract inflation as a percentage-point shortcut when calculating the exact real return.
- Supporting methodology: https://education.fpsb.org/topclass/media/29017/6_pub_Global_RetirementPlanning_2020-1.1.pdf

## 3. Competitor analysis

| Product/source | Observed approach | Useful pattern | USAJIO response |
|---|---|---|---|
| FINRA Retirement Calculator | Models accumulation and decumulation; includes inflation, tax rates, account type, return assumptions and contribution adjustments | Explicit assumptions and multiple inputs for a more complete retirement view | First release focuses on accumulation and today's-dollar value; disclose omitted taxes, account and withdrawal rules |
| Schwab Retirement Income Calculator methodology | Uses return/volatility assumptions and Monte Carlo paths; presents probability of success and explains that projections are estimates, not guarantees | Communicates uncertainty and avoids treating one deterministic path as certainty | Do not claim probability of success or use Monte Carlo without a defensible model and validated assumptions |
| U.S. Department of Labor retirement worksheets | Shows simple assumed return examples, inflation-adjusted expenses and warnings about uncertain long-term assumptions | Plain-language assumptions and caution around future returns/inflation | Keep the tool transparent, educational and user-controlled |
| Fast Retirement Calculator methodology | Shows real-return formula and retirement withdrawal/required-savings calculations | Clear separation of accumulation, real return and withdrawal phase | First release only converts projected accumulation to today's dollars; defer withdrawal sustainability |

Sources:
- https://retirementcalculator.nga.finra.org/calculator/
- https://www.schwab.com/retirement-income-how-it-works
- https://www.dol.gov/agencies/ebsa/about-ebsa/our-activities/resource-center/publications/taking-the-mystery-out-of-retirement-planning
- https://www.fastretirementcalculator.com/methodology

## 4. Improvement plan and proposed first-release scope

### Preserve the existing simple calculator
- Keep the current balance, monthly contribution, years, base annual return and employer match inputs and the existing nominal outputs.
- Add an optional collapsed Inflation-adjusted projection section; do not force users to configure scenarios to use the base calculator.
- Add one editable annual inflation assumption, default 3.0% as an illustrative placeholder, not a forecast.

### Three transparent return scenarios
- Use the existing annual return input as the Base scenario.
- Add editable Conservative and Optimistic annual return assumptions, initially 4.0% and 8.0% while the base default remains 6.0%. These are illustrative placeholders, not recommended portfolio returns or forecasts.
- Validate that conservative return ≤ base return ≤ optimistic return, and that each is within the supported 0–30% range.
- Apply the same current savings, monthly contribution, employer match, time horizon and inflation assumption to all three scenarios.
- For each scenario show nominal projected balance, inflation-adjusted value in today's dollars, total contributions including match and nominal estimated growth.
- Label the return range as user-entered scenarios. Do not assign probabilities, success rates or a single recommended scenario.

### Calculation methodology
- Keep the current monthly equivalent return calculation: monthly rate = (1 + nominal annual return)^(1/12) − 1.
- Keep current month-end contribution timing and employer match handling.
- For each scenario, nominal future balance = current balance compounded monthly + month-end contributions compounded monthly.
- Today's-dollar value = nominal future balance / (1 + annual inflation)^years.
- Real annual return, when shown in explanatory text, is (1 + nominal annual return) / (1 + annual inflation) − 1. A negative real return is valid and must not create a negative account balance.
- Contributions remain fixed in nominal dollars; do not silently increase them with inflation. Explain that contribution escalation is not modeled.

### Disclosures and boundaries
- State that market returns are volatile and actual outcomes can be lower, including losses; constant return paths are illustrations only.
- Exclude investment fees, taxes, contribution limits, account eligibility, vesting, employer match limits, Social Security, pensions, healthcare, retirement withdrawals and sequence-of-returns risk from the first release.
- Do not calculate a sustainable withdrawal rate, probability of success or a retirement date recommendation.
- No asset allocation advice or recommended return assumptions.
- Keep all inputs and calculations browser-local; no account connections, cloud storage or paid APIs.

## 5. Acceptance criteria
1. Existing nominal base calculator outputs remain unchanged when the optional inflation/scenario section is unused.
2. Base scenario exactly matches the current retirement calculation for the same inputs.
3. With 0% inflation, today's-dollar value equals nominal future balance for all scenarios.
4. With positive inflation, today's-dollar value is below nominal balance; with inflation greater than nominal return, real purchasing-power growth can be negative without producing an invalid balance.
5. Conservative ≤ base ≤ optimistic is enforced; invalid order, negative values and out-of-range rates are rejected accessibly.
6. Contributions and employer match reconcile across scenarios; only return assumption changes scenario balances.
7. Test zero return, zero inflation, high inflation, negative real return, maximum horizon, zero contributions, large values, rounding and invalid inputs.
8. Results label nominal future dollars versus today's dollars clearly and disclose month-end contributions and fixed nominal contributions.
9. Responsive layout, keyboard operation, visible focus, labels, live results and 320px viewport pass.
10. Browser-local privacy checks show no financial input network/body/URL leakage or storage persistence.
11. Browser QA and mobile/desktop Lighthouse pass before merge; GitHub Pages deployment is verified after merge.

## 6. Implementation sequence
1. Inspect and preserve the existing retirement calculator's exact base formula and known-answer test.
2. Add the optional inflation and conservative/base/optimistic scenario panel to retirement-calculator.html.
3. Extend the calculation handler to compute nominal and today's-dollar balances for all three user-entered return assumptions.
4. Add a semantic comparison table, plain-language disclosures and responsive styling.
5. Extend Browser QA for baseline parity, inflation zero/high, negative real return, ordered scenarios, invalid inputs, month-end contributions and 320px layout.
6. Run Browser QA, mobile Lighthouse and desktop Lighthouse; review the diff and calculation results.
7. Squash-merge only after all required checks pass; verify GitHub Pages deployment and update the master roadmap.

## 7. Research limitations
- Competitor analysis uses public documentation and methodology descriptions, not hands-on testing or independent verification of proprietary projections.
- A constant-return projection is deterministic and does not model volatility or sequence risk; it must not be described as a probability forecast.
- The default 3% inflation and 4%/6%/8% return values are editable examples only, not current forecasts or individualized investment advice.
## 8. Implementation note — 2026-11-22
- PR #59 adds a collapsed optional scenario panel to the existing Retirement Savings Calculator. The original current-balance, monthly-contribution, years, base-return and employer-match fields and nominal outputs remain the base calculator.
- The optional panel adds editable annual inflation (default 3%), conservative return (default 4%) and optimistic return (default 8%); the existing return input is the Base scenario (default 6%). All values are user-editable assumptions.
- The engine preserves the current monthly-equivalent return and month-end contribution formula. It shows nominal future balance and today's-dollar value for conservative/base/optimistic scenarios, using nominal balance divided by the inflation factor.
- Conservative ≤ Base ≤ Optimistic is validated. Invalid advanced assumptions do not erase the base nominal projection.
- Browser QA now covers scenario reconciliation, zero return, zero inflation, negative real return, invalid ordering/inflation and the expanded 320px mobile layout. Full Browser QA and Lighthouse results are pending.
## 9. Release evidence — 2026-11-22
- PR #59 merged as f5d50f749effc461b7e803aa8a258547dc6ab829.
- Browser QA #45049291104 passed on the PR head, including zero return/inflation, negative real return, invalid assumptions, responsive and accessibility checks.
- Mobile and desktop Lighthouse #45049198576 passed; only documentation/test-only changes differ from the browser-tested head.
- GitHub Pages deployment #45049568548 succeeded for the merge commit.