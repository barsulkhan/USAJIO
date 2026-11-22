# USAJIO Competitive Research & Product Quality Charter

**Created:** 2026-11-22 | **Applies to:** Every future USAJIO feature, redesign, bug fix, calculator, content page and release.  
**Scope:** `barsulkhan/USAJIO` only. Never modify InfoJano.

## Product promise
USAJIO should be free, trustworthy, polished and easy to use. Visitors should quickly understand where to go, what to enter, what the result means and what to do next.

For every meaningful task, research relevant competitors before implementation. Deliver at least the same essential user value and workflow quality, then improve one or more evidence-backed dimensions: clarity, speed, accessibility, privacy, explanation, flexibility, mobile usability or report quality. If a better solution is not feasible or safe, provide a reliable equivalent. “Better than competitors” is a goal, not a marketing claim: never claim superiority without repeatable comparative evidence.

## Benchmark watchlist
| Competitor | Inspect | USAJIO opportunity |
|---|---|---|
| [NerdWallet calculators](https://www.nerdwallet.com/finance/calculators) | Goal-led discovery, free/no-sign-up positioning, editorial review and formula/rate freshness | Clear task discovery, transparent assumptions and real review dates |
| [Bankrate calculators](https://www.bankrate.com/calculators/) and [loan calculator](https://www.bankrate.com/loans/loan-calculator/) | Tool breadth, payment/interest breakdowns, amortization and monthly/yearly/one-time extra-payment scenarios | Explain total cost and payoff impact; match useful scenario flexibility |
| [Calculator.net](https://www.calculator.net/) | Dedicated utility pages, broad categories, formulas and worked explanations | Fast direct access, understandable methods, no unnecessary clutter |
| [SmartAsset](https://smartasset.com/) | Planning calculators and educational context | Explain results and limitations without copying lead-generation flows |
| [YNAB](https://www.ynab.com/) | Zero-based budgeting, goals, recurring planning and reports | Budget tools should support allocation and next steps, not only totals |

This is a watchlist, not a ranking. Choose competitors relevant to the actual user job. Distinguish calculator websites, editorial publishers and account-based finance apps.

## Mandatory pre-work research (before code or design)
Create or update the task's research note and record:
1. User job and target visitor.
2. At least two relevant competitors when available; official page URLs and date checked.
3. Observed inputs, outputs, defaults, scenarios, charts/tables, export/share, guidance, assumptions and pricing/sign-up gates.
4. Interaction details: steps, labels/units, validation, result hierarchy, error/empty/success states, keyboard and mobile behavior.
5. Trust: formulas, rounding, source dates, exclusions, privacy, disclaimers and evidence behind claims.
6. Competitor strengths, usability gaps and a specific USAJIO opportunity.
7. Build/defer/reject decisions with reasons.
8. Measurable acceptance criteria and the QA plan.
9. Dated URLs, screenshots or notes where practical. Never claim a page or behavior was inspected if it was not.

Prefer primary product pages, help/pricing/methodology docs and official filings. Label independent reviews as third-party evidence. If a page is blocked or dynamic, record the limitation and use another source. Do not invent observations or infer hidden internal systems.

## Premium-but-simple design rules
- One clear primary task and action per page.
- Plain language; consistent typography, spacing, alignment, field sizing and button hierarchy.
- Task first, inputs second, primary result third, explanation/details after.
- Predictable concise navigation; avoid clutter, excessive cards, decorative badges, needless animation and oversized hero sections.
- Readable contrast; never communicate status by color alone.
- Visible labels, units, disclosed editable defaults and helpful validation.
- Progressive disclosure for advanced options instead of overwhelming every visitor.
- Mobile-first stacking, touch-friendly controls, no clipped content or horizontal page scroll.
- Visible hover/focus/disabled/active states; keyboard operation for all interactions.
- Charts only when useful, with text/table equivalents.
- Preserve USAJIO identity; never copy competitor code, text, branding or distinctive layouts.

## Financial correctness and trust
- Independently test formulas with known answers, normal/boundary/zero/invalid/extreme values.
- Derive summaries, charts, tables and exports from the same validated calculation result.
- State currency, units, timing, rounding, assumptions and exclusions.
- Label estimates honestly; do not imply lender quotes, tax advice or guaranteed outcomes.
- Keep financial inputs in-browser unless a justified secure server workflow is explicitly approved.
- No fake reviews, ratings, credentials, authors, sources or review dates; no dark patterns or misleading defaults.

## QA and release gate
For each change, plan and run relevant checks:
1. Functional normal, boundary, zero and invalid-input tests.
2. Independent calculation/source cross-check where appropriate.
3. Phone/tablet/desktop responsive tests.
4. Keyboard-only operation and visible focus.
5. Automated accessibility checks (axe/WCAG where available); report manual screen-reader tests separately.
6. Console/network errors and broken links.
7. Lighthouse mobile and desktop for meaningful page changes.
8. Export/print completeness and pagination if affected.
9. Privacy/security review (data handling, CSV formula injection, URL state, external scripts).
10. Verify production deployment after merge.

Never mark a test passed unless it actually ran and the result was inspected. CI accessibility scans are not physical Android/TalkBack tests. Mark unperformed work NOT TESTED. Never merge while required checks fail or are running. Verify the deployed commit before saying a change is live.

## Required research-note template
```md
## [Feature] — competitor research and decision
- Research date:
- User job:
- Competitors and official pages checked:
- Observed features and interaction details:
- Mobile/accessibility observations:
- Trust/privacy/pricing observations:
- Gaps and USAJIO opportunity:
- Chosen scope:
- Deferred/rejected ideas and reasons:
- Acceptance criteria:
- QA evidence (workflow IDs, manual steps, results):
- Deployment evidence:
- Follow-up:
```

## Release checklist
- [ ] Competitor research recorded before implementation.
- [ ] User journey and measurable acceptance criteria defined.
- [ ] UX simple, consistent, premium and mobile-first.
- [ ] Calculations/functionality independently checked.
- [ ] Keyboard, accessibility, responsive and performance tests run as applicable.
- [ ] Privacy, security and content claims reviewed.
- [ ] Required CI checks pass before merge.
- [ ] Deployment verified after merge.
- [ ] Research note and master roadmap updated with evidence.
- [ ] Limitations and NOT TESTED items stated honestly.

## Operating constraints
- USAJIO repository only; never touch InfoJano.
- Separate branch and PR per logical change; no merge before required tests pass.
- No paid domains, subscriptions, APIs or services.
- Search Console/indexing and AdSense remain paused until separately authorized.
- Physical Android/TalkBack checks remain NOT TESTED until actually performed on a device.
- Do not store private financial inputs in fixtures, URLs, filenames or analytics.

## Initial public-source benchmark snapshot — 2026-11-22
This is a focused public-page review, not a full hands-on audit.
- NerdWallet's calculator hub highlights goal-based popular tools, claims editorial build/review and regular review of rates/limits/formulas, and advertises free use without signup. Source: https://www.nerdwallet.com/finance/calculators
- Bankrate's loan calculator explains total interest and amortization and describes monthly, yearly and one-time extra-payment scenarios. Useful parity checklist for loan tools. Source: https://www.bankrate.com/loans/loan-calculator/
- Calculator.net describes a broad category-based free calculator library and formula-based tools. Source: https://www.calculator.net/about-us.html
- NerdWallet's FY2025 Form 10-K describes an integrated editorial, marketplace/referral and regulated financial-services platform. This is business-model context, not a feature list to copy. Source: https://www.sec.gov/Archives/edgar/data/1625278/000162527826000036/form10-kfy25xars.pdf

## Current checkpoint
- Compare Scenarios CSV and browser-native Print / Save as PDF implemented in PR #65.
- Browser QA run #45052440913 passed.
- Lighthouse mobile and desktop jobs in run #45052440807 passed.
- PR #65 squash-merged as `c54fa30e9514782c56c7ffd9bad427a6dec633c4`.
- GitHub Pages deployment for this merge commit must still be verified before calling the change live.
