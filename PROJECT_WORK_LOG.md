# USAJIO Project Work Log

This file is the durable, append-only record of work performed on the USAJIO website. Read it before starting a task to avoid repeating work. Update it after each meaningful change or verification.

## Project
- Repository: https://github.com/barsulkhan/USAJIO
- Live site: https://barsulkhan.github.io/USAJIO/
- Main roadmap: https://github.com/barsulkhan/USAJIO/issues/85
- Time basis: dates recorded in UTC where GitHub timestamps are used.

## Working rules
1. Check this log, the roadmap issue, and current repository state before making changes.
2. Record each task with date, files/URLs affected, exact change, validation performed, and commit/PR link.
3. Never mark a task complete until the change and its validation are verified.
4. Keep credentials, private data, and secrets out of this file.
5. Prefer modifying existing work over creating duplicate pages, components, or audits.
6. Keep pending external account actions clearly marked as requiring the site owner's action.

## Verified historical work

### 2026-11-24 — Existing website quality work (history recorded from verified roadmap)
- [x] PR #84 merged: improved thin-content calculator/guide pages, metadata, Loan Calculator heading structure, disclaimer, internal links, and FAQs.
  - PR: https://github.com/barsulkhan/USAJIO/pull/84
  - Note: the roadmap records browser QA, desktop Lighthouse, and mobile Lighthouse as passed for this release.
- [x] PR #83 merged: Mortgage Refinance Calculator improvements; reported Lighthouse desktop performance 99, mobile 90, accessibility 100, SEO 100; browser QA and accessibility passed.
  - PR: https://github.com/barsulkhan/USAJIO/pull/83
- [x] PR #82 merged: monthly spending planner.
  - PR: https://github.com/barsulkhan/USAJIO/pull/82
- [x] Previous full-site crawl (audit `26c5c4bb-6dea-465c-8978-d8d86bc19904`): 38/38 pages; no errors or warnings; one informational canonical note for /index.html.
- [x] Repository sitemap.xml contains 37 URLs; robots.txt allows crawling and points to sitemap.xml.
- [x] Google Search Console property `https://barsulkhan.github.io/USAJIO/` is connected to the SEO project.
- [x] 27 important URLs inspected in Search Console across three batches.
- [x] Fresh crawl on 2026-11-24: 38/38 pages returned HTTP 200; pages were indexable; titles, descriptions, and H1s were present; no SEO errors or warnings. One informational /index.html canonical note.
- [x] Latest nine inspected URLs were live, HTTP 200, indexable, self-canonical, and internally linked at crawl depth 1.
- [x] Search Console last-three-months report (2026-08-21 through 2026-11-21) returned zero page rows. This means no reportable rows in that report, not proof of zero site visitors.

### Search indexing observations (2026-11-24)
- Indexed: homepage, auto-loan-calculator.html, mortgage-calculator.html, savings-goal.html, loan-calculator.html, compound-interest.html, debt-payoff.html, emergency-fund.html, monthly-budget.html, debt-to-income.html.
- Unknown to Google in the latest batch: credit-card-minimum-payment.html, rent-vs-buy.html, emergency-fund-guide.html, debt-payoff-guide.html, credit-score-guide.html, mortgage-basics-guide.html, retirement-planning-guide.html, cash-flow-budget-guide.html, cash-flow-planner.html.
- Six older URLs reconfirmed unknown: student-loan-payoff.html, mortgage-refinance-calculator.html, net-worth-calculator.html, retirement-calculator.html, budgeting-guide.html, auto-financing-guide.html.
- credit-card-payoff.html: crawled but currently not indexed; last crawl reported as 2026-11-22.
- Do not repeat URL inspections without a new reason or a suitable recheck interval.
- Sitemap submission/processing in Search Console is NOT confirmed. Crawl report showed crawled URLs were not identified as sitemap members.
- Manual Request indexing is not available through the connected integration; owner action is required in Search Console.
- GA4: do not connect the existing infojano.com property to USAJIO. A separate USAJIO property must be created/connected first.
- IndexNow was not submitted; project hosting is under /USAJIO while the key file requirement is at the host root.

## Current open work (do not mark complete without evidence)
- [ ] After custom-domain purchase and connection, update and submit the custom-domain sitemap in Search Console. Deferred until domain purchase:
  https://search.google.com/search-console/sitemaps?resource_id=https%3A%2F%2Fbarsulkhan.github.io%2FUSAJIO%2F
- [ ] Request indexing for priority URLs in Search Console after sitemap processing is confirmed. Owner action required.
- [ ] Recheck the 15 unknown URLs and credit-card-payoff.html after a meaningful interval or new sitemap/indexing action.
- [ ] Create/connect a dedicated GA4 property for USAJIO and verify data collection. Do not use infojano.com.
- [ ] Complete functional and mobile edge-case tests for calculators.
- [ ] Improve guide depth with authoritative US primary sources, assumptions, update dates, and relevant calculator links.
- [ ] Review AdSense readiness only after policy/content/navigation checks.
- [ ] Establish monthly SEO and analytics review.

## Latest audit result — 2026-11-24
- [x] Audit `173fb499-a130-4fd5-a968-3da9df876461` completed its crawl: 38/38 pages.
- [x] All 38 pages returned HTTP 200, were indexable, had a title and one H1; all images in the crawl sample had alt text. No missing-title or broken-page issue was reported.
- [x] Audit issue report contained one informational item only: `/index.html` canonicalizes to `/` (expected; no action required).
- [ ] Lighthouse did not run successfully: 20/20 sampled checks failed with `INSUFFICIENT_CREDITS` (0 completed). No new performance/accessibility/SEO scores are available from this audit.
- [ ] Sitemap membership remains unresolved: all 38 crawled URLs were reported `inSitemap: false`. Confirm actual sitemap submission/fetching in Search Console.
- Next action: owner submits sitemap in Search Console; separately arrange Lighthouse credits or run an alternative Lighthouse check before claiming fresh scores.

## Change log template
For every future task, append:

### YYYY-MM-DD — Short task title
- Status: Done / In progress / Blocked
- Files/URLs:
- Change:
- Validation:
- Commit:
- PR:
- Follow-up:


### 2026-11-24 — Persistent work log and audit reconciliation
- Status: Done (work log created); audit follow-ups remain open.
- Files/URLs: `PROJECT_WORK_LOG.md`; live site audit across 38 URLs.
- Change: created a durable repository work log with project rules, verified historical work, indexing observations, owner-dependent tasks, and a reusable change-log template.
- Validation: fetched the committed file; audit `173fb499-a130-4fd5-a968-3da9df876461` reports 38/38 pages crawled. Issue report has one expected informational canonical note and no errors/warnings.
- Lighthouse validation: blocked; all 20 mobile and 20 desktop sampled results report `INSUFFICIENT_CREDITS`; no fresh Lighthouse scores were produced.
- Commit: recorded in the GitHub create-file response; commit SHA `08df92593a02bedb2235c28612d2c389f9016dd1`.
- PR: not applicable (direct documentation commit).
- Follow-up: sitemap processing, indexing requests, GA4 setup, calculator functional tests, and Lighthouse re-run remain open.


### 2026-11-24 — Search Console sitemap fetch failure review
- Status: In progress; Google fetch failure is confirmed from the owner's screenshot.
- Evidence: Search Console Sitemaps screen shows `/sitemap.xml`, submitted 2026-11-24, Type `Unknown`, Last read blank, Status `Couldn't fetch`, Discovered pages 0, Discovered videos 0.
- Repository files checked: `sitemap.xml` and `robots.txt`.
- Findings: repository sitemap contains 37 absolute HTTPS URLs under `https://barsulkhan.github.io/USAJIO/`, uses the standard sitemaps.org `urlset` namespace and `loc` elements, and appears structurally well-formed on inspection. `robots.txt` allows all crawlers and declares the same sitemap URL.
- Validation limitation: GitHub repository/raw file content is readable, but the live GitHub Pages sitemap URL could not be fetched through the available verification path in this session. Therefore the actual live HTTP response/content-type and Google's fetch error cause are not yet established.
- Change: no sitemap or robots file modified; changing a seemingly valid sitemap without confirming the live response could make things worse.
- Follow-up: verify that `https://barsulkhan.github.io/USAJIO/sitemap.xml` opens directly in a browser without login/download/error, then use Search Console's sitemap details/refresh or remove-and-resubmit only if it still fails. If the direct URL fails, investigate GitHub Pages deployment/path before resubmitting.


### 2026-11-24 — Student loan guide content upgrade
- Status: Implemented on branch; awaiting review and browser QA.
- File: `student-loan-guide.html`.
- Change: expanded the guide with loan inventory steps, daily-interest explanation, capitalization caveats, subsidized vs. unsubsidized distinction, July 1, 2026 federal repayment-plan eligibility context, federal/private differences, refinancing trade-offs, extra-payment considerations, borrower-hardship and scam precautions, and a practical checklist.
- Sources: Federal Student Aid repayment-plan guidance, IDR FAQs, interest-rate/daily-interest page and repayment calculator; CFPB federal/private repayment and refinance guidance. Links are included in the guide.
- Validation: reviewed existing calculator disclaimer and guide structure before editing; checked source material on official Federal Student Aid and CFPB pages. Automated browser QA has not yet run for this branch.
- Commit: `e4422238eac3cbc6218fe11410196337ad4e73d1`.
- PR: to be opened after documentation updates.
- Follow-up: verify page rendering, internal links, heading structure and responsive behavior with the repository browser QA workflow.


### 2026-11-24 — Student loan guide QA follow-up
- Initial Browser QA run completed with failure only in the site-wide guide metadata assertions: the test expected the prior November 22 review date and exact `Official sources and further reading` heading. The updated page correctly carried November 24, so the test expectation was stale.
- Updated the QA assertion to accept the new review date for `student-loan-guide.html` while retaining November 22 for the other guides, and aligned the guide's source-section heading with the site's test convention.
- Follow-up Browser QA and Lighthouse workflows triggered for the new PR head; results pending at this log update.
- Commits: `f3658d2dad0b79165a90ba7e4bf42aaf903db4ef`, `1aadbd7631b0e4286d2636504182ac836ea8709c`.


### 2026-11-24 — Post-merge verification and small-task QA sweep
- Status: Deployment and automated checks passed; minor Lighthouse follow-ups remain.
- Release: Student Loan Guide PR #86 merged as `f3439f46ed79315bb1f0c701d17ea3c154451ab1`; GitHub Pages deployment run `45388904496` completed successfully.
- Browser QA run: `45336419765` passed on PR head `a0c69c4`.
- Verified browser checks from CI log:
  - 12 calculator known-answer, zero-rate, boundary, invalid-input, deficit/negative, insufficient-payment and amortization checks.
  - Finance Workspace cash-flow/net-worth calculations, savings/debt CRUD, local persistence and 320px layout.
  - Monthly spending planner budget-vs-actual, income/expense CRUD, search, CSV export, monthly history, local persistence and 320px layout.
  - Responsive widths, labeled controls, keyboard-only calculation/focus checks.
  - 37 HTML pages plus Google verification endpoint: unique titles/descriptions/canonicals, H1, language, sitemap/robots, footer policy links, local paths/fragments.
  - Browser-local handling checks for financial data: no unexpected non-read network requests, fetch/XHR/beacon, persistent storage, or financial values leaked into URLs/request bodies.
  - axe WCAG 2.1 A/AA audit returned an empty violations list.
- Lighthouse CI run: `45336419525` passed for mobile and desktop. It tested the homepage and all calculator pages.
  - Mobile: homepage Performance 94, Accessibility 100, Best Practices 100, SEO 100; most calculator pages Performance 99–100, Accessibility 100, SEO 100. Noted lower scores: Compound Interest Performance 94, Credit Card Minimum Payment Best Practices 96.
  - Desktop: homepage Performance 99, Accessibility 100, Best Practices 100, SEO 100; most calculator pages Performance 98–100, Accessibility 100, Best Practices 100, SEO 100.
  - Finance Dashboard is not in the Lighthouse URL matrix; it scored Accessibility 96 on both profiles, and mobile Best Practices 96. Monthly Spending Planner mobile Best Practices 96. These are follow-up items, not blanket failures.
- OpenSEO Lighthouse audit `173fb499-a130-4fd5-a968-3da9df876461` remains blocked by `INSUFFICIENT_CREDITS`; do not report it as a pass or reuse it as a score source.
- Live website deployment status verified from GitHub Actions. Direct page fetch via the web reader was not available in this session, so visual/manual live-browser confirmation is still outstanding.
- Workflow warnings observed: Node.js 20 action runtime deprecation warning; npm/Node dependency deprecation warnings. No workflow failure resulted.
- Follow-up: investigate Lighthouse Best Practices/Accessibility findings for Finance Dashboard and Best Practices findings for the two flagged pages; consider updating workflow action/runtime versions after checking compatibility. Sitemap processing, custom domain, GA4 property creation and Search Console indexing remain owner-dependent.


### 2026-11-24 — Lighthouse detail review and accessibility follow-ups
- Status: Targeted fixes implemented on branch; regression validation pending.
- Reviewed the archived Lighthouse mobile/desktop JSON reports from CI run `45336419525`, not just the score summary.
- Confirmed Finance Dashboard accessibility issue was insufficient text contrast (examples included #0b927a on #f5f7fb at 3.62:1, #8a96a8 on white at 2.99:1, and #8390a2 on white at 3.24:1). Updated muted/secondary text colors in `finance-dashboard.css` to darker values; added intrinsic logo dimensions in `finance-dashboard.html`.
- Added aspect-ratio reservation for shared site logo in `styles.css` to reduce layout shift and size instability.
- Updated GitHub Actions checkout/setup-node actions to v5 and Node.js runtime to 22 to address the observed Node 20 action runtime deprecation warning.
- Lighthouse mobile best-practice 96 findings on Credit Card Minimum Payment and Monthly Spending Planner are associated with low font-size audit results; do not claim fixed until rerun confirms. The mobile homepage and Compound Interest performance scores are driven mainly by slower mobile first contentful paint/main-thread work; no risky broad performance refactor made without further profiling.
- OpenSEO Lighthouse remains unavailable due insufficient credits; GitHub Actions Lighthouse artifacts were used for this detailed review.


### 2026-11-24 — PR #87 merged, deployment verified, and RPM research handoff saved
- Status: Done for this quality follow-up and handoff documentation.
- PR #87: https://github.com/barsulkhan/USAJIO/pull/87 — merged successfully via squash.
- Merge commit: 3238143347ad3c98c338702f0c02d8b4b0f13a58.
- PR head checks: Browser QA, Lighthouse mobile, and Lighthouse desktop all completed successfully.
- GitHub Pages deployment run 45391501208 completed successfully for the merge commit.
- Changes in PR: Finance Dashboard muted/secondary text contrast adjustments; logo dimensions/aspect-ratio reservation; GitHub Actions checkout/setup-node v5 and Node.js 22.
- [x] Create durable next-chat handoff: NEXT_CHAT_HANDOFF.md. It records completed work, remaining owner-dependent tasks, repository links, known SEO/indexing/analytics status, and the user's next priority.
- [ ] New priority for next chat: research highest-potential AdSense RPM finance sub-niches, specific calculator/guide topics, country mix (especially US vs India), advertiser intent, search demand/competition, and a prioritized content roadmap. Clearly distinguish RPM estimates from actual site RPM; do not equate Google Ads CPC with AdSense RPM. No actual USAJIO AdSense RPM or GA4 audience/revenue data is available in this context.
- Handoff file commit: 2ae36088d06b1ad33d0034a3f747816a666e46d3.
- Follow-up: start with RPM research in the new chat; do not begin publishing new pages until the research and priorities are presented.
