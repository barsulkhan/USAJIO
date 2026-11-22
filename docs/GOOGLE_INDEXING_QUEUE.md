# USAJIO — Google Indexing Queue

**Purpose:** Track every USAJIO URL submitted through Google Search Console URL Inspection, one at a time. This is an evidence-based work queue, not a claim that Google has indexed any page.

**Property:** `https://barsulkhan.github.io/USAJIO/`  
**Sitemap:** `https://barsulkhan.github.io/USAJIO/sitemap.xml`  
**Last updated:** 2026-11-22

## Rules for maintaining this queue

1. Work through the numbered URLs in order, one URL at a time.
2. Give the user the next URL to paste into Search Console → URL Inspection.
3. After the user shares the inspection result, record the exact result and date here.
4. Only mark **Indexed / Complete** when Search Console explicitly confirms the URL is on Google / indexed. A successful indexing request is **Submitted — waiting**, not complete.
5. If Search Console says the URL is not on Google and offers **Request Indexing**, the user may request it. Record that as **Requested — waiting** until Google later confirms indexing.
6. If a URL has an error, record the exact error and keep it open; do not skip it silently.
7. Whenever a new public HTML page is added to USAJIO and deployed, append its canonical URL to this queue as **Not submitted**. Do not add draft, redirect-only, verification-token or non-indexable URLs.
8. Keep this file in the USAJIO repository only. Never modify InfoJano.

## Current Search Console status

- USAJIO URL-prefix property is visible and opened in the user's Search Console account (user screenshot, 2026-11-22).
- Sitemap submission was accepted by the UI on 2026-11-22, but the sitemap detail subsequently showed **Couldn't fetch / Sitemap could not be read**, with **0 discovered pages**.
- Therefore sitemap processing is **NOT successful yet**. Diagnose the live sitemap fetch separately; do not treat submission acceptance as a successful read.
- No individual URL Inspection result or indexing request has yet been confirmed from the screenshots in this session.
- **Completed indexed URLs: 0 / 28 confirmed.**
- Next action: inspect URL 01 (homepage) using the URL Inspection box. If it is not on Google, use Request Indexing if Google offers it, then report the exact result.

## URL-by-URL queue

Status meanings:
- **Not submitted** — not yet inspected/requested in Search Console.
- **Requested — waiting** — Request Indexing was submitted; Google has not confirmed indexing.
- **Indexed / Complete** — Search Console explicitly confirms indexed / on Google.
- **Blocked / Error** — a specific issue needs diagnosis.

| No. | Priority | URL | Status | Search Console result / date |
|---:|---|---|---|---|
| 01 | Homepage | https://barsulkhan.github.io/USAJIO/ | Not submitted | Next URL to inspect |
| 02 | Calculator | https://barsulkhan.github.io/USAJIO/compound-interest.html | Not submitted | — |
| 03 | Calculator | https://barsulkhan.github.io/USAJIO/loan-calculator.html | Not submitted | — |
| 04 | Calculator | https://barsulkhan.github.io/USAJIO/monthly-budget.html | Not submitted | — |
| 05 | Calculator | https://barsulkhan.github.io/USAJIO/savings-goal.html | Not submitted | — |
| 06 | Calculator | https://barsulkhan.github.io/USAJIO/emergency-fund.html | Not submitted | — |
| 07 | Calculator | https://barsulkhan.github.io/USAJIO/debt-payoff.html | Not submitted | — |
| 08 | Calculator | https://barsulkhan.github.io/USAJIO/mortgage-calculator.html | Not submitted | — |
| 09 | Calculator | https://barsulkhan.github.io/USAJIO/auto-loan-calculator.html | Not submitted | — |
| 10 | Calculator | https://barsulkhan.github.io/USAJIO/credit-card-payoff.html | Not submitted | — |
| 11 | Calculator | https://barsulkhan.github.io/USAJIO/net-worth-calculator.html | Not submitted | — |
| 12 | Calculator | https://barsulkhan.github.io/USAJIO/retirement-calculator.html | Not submitted | — |
| 13 | Calculator | https://barsulkhan.github.io/USAJIO/student-loan-payoff.html | Not submitted | — |
| 14 | Guide | https://barsulkhan.github.io/USAJIO/budgeting-guide.html | Not submitted | — |
| 15 | Guide | https://barsulkhan.github.io/USAJIO/emergency-fund-guide.html | Not submitted | — |
| 16 | Guide | https://barsulkhan.github.io/USAJIO/debt-payoff-guide.html | Not submitted | — |
| 17 | Guide | https://barsulkhan.github.io/USAJIO/credit-score-guide.html | Not submitted | — |
| 18 | Guide | https://barsulkhan.github.io/USAJIO/mortgage-basics-guide.html | Not submitted | — |
| 19 | Guide | https://barsulkhan.github.io/USAJIO/auto-financing-guide.html | Not submitted | — |
| 20 | Guide | https://barsulkhan.github.io/USAJIO/retirement-planning-guide.html | Not submitted | — |
| 21 | Guide | https://barsulkhan.github.io/USAJIO/student-loan-guide.html | Not submitted | — |
| 22 | Guide | https://barsulkhan.github.io/USAJIO/cash-flow-budget-guide.html | Not submitted | — |
| 23 | Information | https://barsulkhan.github.io/USAJIO/about.html | Not submitted | — |
| 24 | Information | https://barsulkhan.github.io/USAJIO/contact.html | Not submitted | — |
| 25 | Policy | https://barsulkhan.github.io/USAJIO/privacy.html | Not submitted | — |
| 26 | Policy | https://barsulkhan.github.io/USAJIO/terms.html | Not submitted | — |
| 27 | Policy | https://barsulkhan.github.io/USAJIO/disclaimer.html | Not submitted | — |
| 28 | Policy | https://barsulkhan.github.io/USAJIO/editorial.html | Not submitted | — |

## Session log

| Date | Action | Result |
|---|---|---|
| 2026-11-22 | Opened USAJIO URL-prefix property | Property visible in user's Search Console |
| 2026-11-22 | Submitted `sitemap.xml` | UI accepted submission; later status became **Couldn't fetch**, details: **Sitemap could not be read**, 0 discovered pages |
| 2026-11-22 | Individual URL inspection | Not yet evidenced; queue remains at URL 01 |

## Completion summary

- Indexed / complete: **0**
- Requested / waiting: **0**
- Not submitted: **28**
- Blocked / error: **0 individual URLs** (sitemap fetch issue is tracked separately above)

**Important:** Google decides whether and when to index a URL. Request Indexing is a request, not a guarantee. Keep the exact status from Search Console; never mark a page complete just because it was submitted.
