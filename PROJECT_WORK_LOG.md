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
- [ ] Submit sitemap.xml in Search Console and verify processing. Owner action required:
  https://search.google.com/search-console/sitemaps?resource_id=https%3A%2F%2Fbarsulkhan.github.io%2FUSAJIO%2F
- [ ] Request indexing for priority URLs in Search Console after sitemap processing is confirmed. Owner action required.
- [ ] Recheck the 15 unknown URLs and credit-card-payoff.html after a meaningful interval or new sitemap/indexing action.
- [ ] Create/connect a dedicated GA4 property for USAJIO and verify data collection. Do not use infojano.com.
- [ ] Complete functional and mobile edge-case tests for calculators.
- [ ] Improve guide depth with authoritative US primary sources, assumptions, update dates, and relevant calculator links.
- [ ] Review AdSense readiness only after policy/content/navigation checks.
- [ ] Establish monthly SEO and analytics review.

## Audit in progress
- Audit ID: `173fb499-a130-4fd5-a968-3da9df876461`
- Started: 2026-11-24
- Scope: live homepage, 38 pages total, Lighthouse sample 20 pages.
- Last known state at log creation: running; 6/38 pages crawled; Lighthouse 0/20 complete.
- Next action: poll audit status; when complete, record issues, page results, and desktop/mobile Lighthouse findings here and in issue #85.

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
