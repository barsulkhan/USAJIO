# USAJIO — Google Indexing Queue

**Last updated:** 2026-11-22  
**Property:** `https://barsulkhan.github.io/USAJIO/`  
**Workflow:** User-requested maximum of 10 URL inspection/indexing requests per day. This is our working batch limit, not a claim about Google's published quota.

## Status definitions
- **PENDING — user action:** URL is in the current batch and has not yet been submitted by the user in Search Console.
- **SUBMITTED — awaiting Google:** User says the URL was submitted; do not mark complete yet.
- **COMPLETE — user confirmed:** User explicitly reports Google approved/indexed the URL. Only then move it to the completed list.
- **QUEUED:** URL is in a later batch and should not be submitted until the current batch is confirmed.

## Batch 01 — 10 URLs (2026-11-22)

All ten are **SUBMITTED — awaiting Google**. User reports live-tested all ten URLs and submitted a Google Search Console indexing request for each on 2026-11-22. Google indexing/approval is not yet confirmed.

1. https://barsulkhan.github.io/USAJIO/
2. https://barsulkhan.github.io/USAJIO/compound-interest.html
3. https://barsulkhan.github.io/USAJIO/loan-calculator.html
4. https://barsulkhan.github.io/USAJIO/monthly-budget.html
5. https://barsulkhan.github.io/USAJIO/savings-goal.html
6. https://barsulkhan.github.io/USAJIO/emergency-fund.html
7. https://barsulkhan.github.io/USAJIO/debt-payoff.html
8. https://barsulkhan.github.io/USAJIO/mortgage-calculator.html
9. https://barsulkhan.github.io/USAJIO/auto-loan-calculator.html
10. https://barsulkhan.github.io/USAJIO/credit-card-payoff.html

**User instruction:** Submit these ten individually through the URL Inspection field in the USAJIO Search Console property. When Google offers “Request indexing”, submit the request. User has submitted all ten requests. Await Google processing and the user's per-URL or batch result; do not mark complete until indexing is confirmed. A request being submitted is not the same as indexing approval.

## Batch 02 — next 10 URLs (QUEUED)

11. https://barsulkhan.github.io/USAJIO/about.html
12. https://barsulkhan.github.io/USAJIO/contact.html
13. https://barsulkhan.github.io/USAJIO/privacy.html
14. https://barsulkhan.github.io/USAJIO/terms.html
15. https://barsulkhan.github.io/USAJIO/disclaimer.html
16. https://barsulkhan.github.io/USAJIO/editorial.html
17. https://barsulkhan.github.io/USAJIO/budgeting-guide.html
18. https://barsulkhan.github.io/USAJIO/emergency-fund-guide.html
19. https://barsulkhan.github.io/USAJIO/debt-payoff-guide.html
20. https://barsulkhan.github.io/USAJIO/credit-score-guide.html

## Batch 03 — remaining URLs (QUEUED)

21. https://barsulkhan.github.io/USAJIO/mortgage-basics-guide.html
22. https://barsulkhan.github.io/USAJIO/auto-financing-guide.html
23. https://barsulkhan.github.io/USAJIO/net-worth-calculator.html
24. https://barsulkhan.github.io/USAJIO/retirement-calculator.html
25. https://barsulkhan.github.io/USAJIO/student-loan-payoff.html
26. https://barsulkhan.github.io/USAJIO/retirement-planning-guide.html
27. https://barsulkhan.github.io/USAJIO/student-loan-guide.html
28. https://barsulkhan.github.io/USAJIO/cash-flow-budget-guide.html

## Completion log

| URL | Status | User-confirmed result/date |
|---|---|---|
| Batch 01 URLs 1–10 | SUBMITTED — awaiting Google | User reports all ten requests submitted on 2026-11-22; indexing not yet confirmed |

## Important notes and follow-up

- The user's Search Console screenshots showed sitemap submission succeeded initially, but the sitemap detail later displayed **“Couldn't fetch” / “Sitemap could not be read”**, with zero discovered pages. This remains an independent technical issue to diagnose; individual URL requests do not resolve the sitemap fetch error.
- Do not claim a URL is indexed just because a request was submitted. Wait for the user's Search Console result or a reliable URL Inspection status.
- Do not advance the batch until the user reports the current batch outcomes. Move confirmed indexed URLs to the completion log; keep rejected, failed or still-processing URLs in their exact status.
- When a new public page is created and deployed, add its canonical live URL to this queue in the next available batch. Ensure sitemap and internal links are updated too.
- Continue the required content research and quality follow-ups for all calculators and guides; indexing is not a substitute for original, useful, sourced content.
- USAJIO only. Do not modify InfoJano.
