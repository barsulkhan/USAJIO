# Mortgage Refinance Calculator — Market Research & Product Decision

**Research date:** 2026-11-24  
**Market:** United States, English, USD-first  
**Repository:** barsulkhan/USAJIO  
**Status:** Implemented on feature branch; pending CI.

## User job
A homeowner wants to compare their current fixed-rate mortgage with a refinance offer and understand whether lower monthly payments offset upfront costs and any change in repayment term.

## Competitor review
- **Bankrate refinance calculator:** https://www.bankrate.com/mortgages/refinance-calculator/ — uses current remaining balance and term, new offer assumptions and closing costs; explains monthly savings, first-year savings, lifetime interest and break-even. The public guidance notes that changing the term can materially change total cost.
- **NerdWallet calculator hub:** https://www.nerdwallet.com/finance/calculators — organizes calculators by consumer task and links tools to explanatory content and editorial methodology.
- **Bankrate calculator hub:** https://www.bankrate.com/calculators/ — covers mortgage, auto, credit-card, savings, investment/CD, personal-finance and loan tools, including amortization and DTI.
- **CFPB mortgage refinance definitions:** https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms/ — explains refinance as replacing the existing mortgage, notes closing costs and warns that a lower payment may be due to a longer term.
- **CFPB “Should I refinance?” handout:** https://files.consumerfinance.gov/f/documents/cfpb_should_i_refinance_handout.pdf — encourages weighing refinance costs against benefits and considering how long the borrower expects to keep the home.

## Search opportunity evidence
Third-party US keyword estimates checked 2026-11-24 (not first-party rankings):
- Mortgage refinance calculator: approx. 40,000 searches/month; estimated CPC $4.24; estimated keyword difficulty 70. This appears in the related-keyword list on the mortgage calculator report: https://www.kwstrends.com/keywords/us/mortgage-calculator
- Credit card payoff calculator: approx. 25,000 searches/month; estimated CPC $3.51; estimated difficulty 39: https://www.kwstrends.com/keywords/us/credit-card-payoff-calculator
- Personal loan calculator: approx. 67,000 searches/month; estimated CPC $4.37; estimated difficulty 68: https://www.kwstrends.com/keywords/us/personal-loan-calculator

These figures are estimates from an independent keyword-report site, not Google Search Console data, verified ranking positions, advertiser bids for USAJIO, or expected AdSense RPM. Search volume and CPC do not guarantee traffic or publisher revenue.

## USAJIO gap and decision
USAJIO already has a general mortgage payment calculator and a rent-vs-buy calculator. A separate refinance workflow serves a distinct decision: compare a current mortgage against a replacement offer, including closing costs and term changes. This adds a recognized competitor feature without cloning their copy or design.

### Implemented scope
- Current balance, current APR and remaining term.
- New APR and new term.
- Estimated upfront closing costs.
- Current/new principal-and-interest payment, monthly payment change, simple payment break-even, modeled total interest comparison after closing costs, and annual balance/interest table.
- Zero-rate handling, range validation, accessible result announcement, currency formatting only, responsive layout and internal related-tool links.
- Browser-local calculation only; no bank connection, credit check, rate feed or lead form.

### Deferred
- Cash-out refinance, financed closing costs, points/lender credits, escrow/tax/insurance, adjustable-rate mortgages and lender integration. These need separate modeling and stronger source coverage.

## Monetization and policy constraints
- The current AdSense readiness document says not to submit the GitHub Pages URL or activate ads until the owner purchases and connects the intended custom domain. No ad code or units are added in this work.
- Google says viewable impressions require at least 50% of an ad's pixels to be in view for one continuous second and recommends useful content, responsive units and placements that do not obstruct use: https://support.google.com/adsense/answer/4510652
- Google prohibits artificial clicks/impressions and deceptive ad placement: https://support.google.com/adsense/answer/48182
- USAJIO should improve RPM through qualified organic visits, useful content, strong viewability and page speed—not click prompts, artificial traffic, ad clutter or misleading layouts.

## Data limitations
- Ahrefs returned “Insufficient plan” for competitor/keyword exports.
- OpenSEO Search Console returned “not_connected”; Google Analytics 4 returned “ga4_not_connected”.
- Therefore no first-party query, landing-page, country, session, revenue, RPM or ad-viewability breakdown is available. Connect those properties later to prioritize based on real USAJIO data. Do not infer a keyword is ranking or a page is earning.

## Acceptance and QA
- Homepage exposes the tool as the 19th calculator.
- Canonical, title, description, social metadata, sitemap and related links are present.
- Playwright known-answer: with $280,000 balance, 7.25% current rate, 6.25% new rate, 25 years each and $6,000 closing costs, monthly payments are $2,023.86 and $1,847.07, with break-even rounded up to 34 months.
- Zero-rate new loan: $280,000 / 300 = $933.33 per month.
- Reject rates above 30%.
- Run all browser QA/axe checks and desktop/mobile Lighthouse before merge.
