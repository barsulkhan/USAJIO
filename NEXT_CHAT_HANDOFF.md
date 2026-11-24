# USAJIO — নতুন চ্যাট হ্যান্ডঅফ (2026-11-24)

এই ফাইলটি নতুন ChatGPT চ্যাটে প্রথমে পড়তে হবে। ব্যবহারকারী এখন RPM-ভিত্তিক niche/content research শুরু করতে চান। আগের কাজ আবার শুরু বা ডুপ্লিকেট করা যাবে না।

## এখনকার নতুন প্রধান কাজ: বেশি RPM সম্ভাবনাময় বিষয় খুঁজে বের করা

ব্যবহারকারীর মূল অনুরোধ: USAJIO (personal finance tools/guides website)-এর জন্য কোন কোন topic, calculator বা guide-এ বিজ্ঞাপনের RPM সবচেয়ে বেশি হতে পারে তা খুঁজে বের করা এবং সেই ভিত্তিতে পরবর্তী কনটেন্ট/পেজ পরিকল্পনা করা।

গবেষণার deliverable:
1. Finance sub-niche ও নির্দিষ্ট topic অনুযায়ী সম্ভাব্য RPM range (USD) — স্পষ্টভাবে estimate/benchmark হিসেবে, guaranteed income নয়।
2. Country mix আলাদা করে বিশ্লেষণ: বিশেষত US traffic বনাম India/অন্যান্য দেশ; USAJIO-র বর্তমান audience data না থাকলে তা স্পষ্ট বলা।
3. Advertiser intent/CPC proxy, search demand, keyword difficulty/competition, SERP competition, seasonality এবং user intent।
4. নির্দিষ্ট calculator/guide/page ideas এবং existing USAJIO content-এর সঙ্গে overlap/cannibalization check।
5. Impact × feasibility ভিত্তিতে prioritized content roadmap (প্রথমে কোন 5–10টি পেজ/টপিক)।
6. প্রতিটি recommendation-এর পেছনে cited sources; Google Ads CPC-কে AdSense RPM-এর সমান ধরে নেওয়া যাবে না।
7. RPM estimate-এর assumptions স্পষ্ট: page RPM বনাম session RPM আলাদা; geography, device, ad viewability, ad density, session depth, seasonality, advertiser demand ইত্যাদির প্রভাব।
8. Existing GA4/AdSense actual revenue data না থাকলে প্রকৃত USAJIO RPM জানা নেই—এটি জোর দিয়ে উল্লেখ করতে হবে। Existing GA4 property infojano.com-এর; সেটি USAJIO-তে ব্যবহার/মিশ্রণ করা যাবে না।

গবেষণার আগে:
- USAJIO repo-র PROJECT_WORK_LOG.md, এই handoff, roadmap issue #85 পড়তে হবে।
- বর্তমান পেজ/ক্যালকুলেটর inventory পরীক্ষা করতে হবে যাতে duplicate page proposal না আসে।
- User-এর অনুমতি ছাড়া সাইটে নতুন পেজ publish বা code changes শুরু নয়; আগে research/report ও proposed priority list।
- User এখন এই RPM research-টাই নতুন চ্যাটে শুরু করতে চান।

## Repository ও live website
- Repo: https://github.com/barsulkhan/USAJIO
- Live site: https://barsulkhan.github.io/USAJIO/
- Roadmap: https://github.com/barsulkhan/USAJIO/issues/85
- Work log: https://github.com/barsulkhan/USAJIO/blob/main/PROJECT_WORK_LOG.md
- This handoff: https://github.com/barsulkhan/USAJIO/blob/main/NEXT_CHAT_HANDOFF.md

## Verified completed work
- PR #84: calculator/guide thin content, metadata, Loan Calculator heading structure improvements merged.
- PR #86: Student Loan Guide upgrade merged; includes loan inventory, interest/capitalization, subsidized/unsubsidized, 2026 federal repayment context, federal/private differences, refinancing trade-offs, extra payments, hardship/scam precautions, checklist and official sources.
- PR #87: Finance Dashboard text contrast and logo sizing fixes; GitHub Actions runtime updated (checkout/setup-node v5, Node 22). Merged via squash.
  - PR: https://github.com/barsulkhan/USAJIO/pull/87
  - Merge commit: 3238143347ad3c98c338702f0c02d8b4b0f13a58
  - Checks on PR head 92c0de12cbbe3715a7d63c4fbaa0d95f21439c6c: Browser QA success, Lighthouse mobile success, Lighthouse desktop success.
  - GitHub Pages deployment run 45391501208 completed successfully.
- Browser QA earlier run 45336419765 passed: calculator known answers/edge cases, Finance Workspace CRUD/local persistence, monthly planner CRUD/CSV/history, responsive widths, keyboard/focus, privacy checks, 37-page metadata/internal links, axe WCAG 2.1 A/AA zero violations.
- Earlier Lighthouse run 45336419525 passed mobile and desktop. Recorded scores: mobile homepage Performance 94; Accessibility/Best Practices/SEO 100. Desktop homepage Performance 99, Accessibility/Best Practices/SEO 100. Compound Interest mobile Performance 94; Credit Card Minimum Payment mobile Best Practices 96; Finance Dashboard Accessibility 96 both profiles and mobile Best Practices 96; Monthly Spending Planner mobile Best Practices 96. PR #87 fresh Lighthouse CI passed, but exact new scores have not been recorded here.
- OpenSEO Lighthouse audit previously blocked by INSUFFICIENT_CREDITS; do not call it a pass.

## Existing SEO/indexing observations
- OpenSEO crawl audit 173fb499-a130-4fd5-a968-3da9df876461: 38/38 pages fetched HTTP 200, indexable, titles and one H1; no errors/warnings; informational /index.html canonicalizes to /.
- Repo sitemap.xml has 37 URLs and robots.txt points to it.
- Search Console sitemap had Type Unknown / Couldn't fetch / Last read blank / 0 discovered pages in screenshot. Actual root cause not verified.
- Sitemap troubleshooting on temporary GitHub Pages URL explicitly paused by owner until custom domain is purchased.
- Search Console inspected 27 URLs. Previously indexed: homepage, auto-loan-calculator, mortgage-calculator, savings-goal, loan-calculator, compound-interest, debt-payoff, emergency-fund, monthly-budget, debt-to-income. Some 15 URLs remained unknown, credit-card-payoff crawled not indexed; see issue #85 for detailed URL list. Do not repeatedly inspect without meaningful interval/new sitemap action.
- Search Console had no reportable rows for 2026-08-21 to 2026-11-21; this does not prove zero visitors.
- GA4: visible infojano.com property must NOT be connected to USAJIO. A separate USAJIO GA4 property needs owner creation/connection.
- No actual AdSense RPM or USAJIO GA4 audience/revenue data is available in this context. Do not invent it.

## Remaining tasks / blockers
Owner-dependent:
- Purchase/connect custom domain. Then update sitemap URLs and submit custom-domain sitemap in Search Console; request indexing after Google processes sitemap.
- Create a separate GA4 property for USAJIO and connect/verify collection. Never use infojano.com property.
- Search Console manual Request indexing requires owner action.
Other:
- Manually verify Student Loan Guide live appearance if useful; prior direct web fetch was unavailable.
- Recheck unknown URLs after new sitemap/indexing action or sufficient interval.
- AdSense readiness review and monthly SEO/analytics routine.
- Remaining older Lighthouse score findings are listed in PROJECT_WORK_LOG.md; PR #87 follow-up checks passed but don't claim each historic score is fully fixed unless new detailed artifact verifies it.

## User preferences / workflow
- User wants actual work performed and a clear checklist of completed vs remaining.
- Maintain persistent updates in PROJECT_WORK_LOG.md and roadmap issue #85.
- Do not claim unverified tasks done. Ask user only for genuine owner actions/permissions.
- User wants to discuss/add features after the research and outstanding small tasks; do not start unsolicited site feature implementation.
- Respond in Bengali.
