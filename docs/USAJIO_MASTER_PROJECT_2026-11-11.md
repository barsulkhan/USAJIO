# USAJIO — Master Project File
**Last updated:** 2026-11-11  
**Project:** Global Personal Finance Website  
**Brand:** USAJIO  
**Status:** V1.1 local prototype package prepared; GitHub repository and Cloudflare staging not yet created.

## 1. Project identity and scope
- Separate project from InfoJano. Never mix repositories, code, assets, or deployment settings.
- Global-first audience; website language: English.
- Platform model: Complete Personal Finance Platform. Calculators/planning tools and SEO finance guides have equal priority.
- Audience: broad adult audience (students, workers, families, borrowers, long-term planners).
- Initial approach: free browser-based tools and free hosting/staging. No paid domain, hosting, subscriptions, APIs, or purchases without explicit user permission.

## 2. Approved brand and design
- Brand name: **USAJIO**.
- Approved visual direction: clean, light, premium, mobile-first.
- Background: white/off-white and subtle light mint/grey.
- Typography: deep navy.
- Accent: restrained soft teal.
- Spacious layout, clean calculator cards, minimal shadows, simple navigation.
- Do not use neon, excessive colours, strong glow effects, or unnecessary animation.
- Approved hero direction/tagline: **“Make Smarter Money Decisions”**.
- User requested each asset separately (one file/design at a time), not a collage. When delivering a finished asset, provide the direct file link without explanatory text below it.
- The hero banner concept was approved by the user. Logo/brand asset package still needs final approval as separate files.

## 3. Product structure planned
1. Home
2. Financial Calculators
3. Budget & Savings Planning
4. Loans & Debt
5. Money Guides
6. Country Guides (jurisdiction-specific information only)
7. About
8. Contact
9. Privacy Policy
10. Terms
11. Financial Disclaimer
12. Editorial Policy
13. Trust Center

## 4. V1.1 local prototype package
File: `USAJIO_Website_v1.zip` (local package; not deployed)
Included files/assets:
- `index.html`, `styles.css`, `script.js`
- `terms.html`, `disclaimer.html`, `contact.html`, `editorial.html`, `privacy.html`
- `assets/hero-banner.png`, `assets/logo.svg`, `assets/favicon.svg`
- `docs/RESEARCH_AND_QA.md`, `README.md`

Features present in the prototype:
- Responsive homepage and navigation
- Compound interest calculator (compounding frequency and yearly growth table)
- Loan EMI calculator (extra monthly payment and amortization schedule)
- Monthly budget planner (categorized expenses, surplus/deficit)
- Savings goal calculator
- Emergency fund calculator
- Debt payoff planner
- Currency display selector (USD, EUR, GBP, CAD, AUD, INR)
- Basic policy and information pages

Important implementation notes:
- Currency selector changes display formatting only; it does not localize tax, lending, credit, banking, or retirement rules.
- Calculations run locally in the browser; prototype does not submit entered financial figures to a server.
- Placeholder contact details and policy wording must be reviewed before public launch.
- Do not claim investment returns, lender approval, or guaranteed outcomes.

## 5. Research and quality rules
For every feature: **Research → Competitor Analysis → Improvement Plan → Development → Testing**.
- Compare reputable competitors and primary/official guidance before implementation.
- Improve usefulness, clarity, calculation transparency, UX, accessibility, and SEO; do not copy competitors.
- Finance content is YMYL: use reliable primary sources, explain formulas/assumptions/limitations, show update dates, avoid unsupported claims, and disclose affiliate relationships.
- Educational information only; not individualized financial, tax, legal, or investment advice.
- Never request bank passwords, card numbers, account numbers, or unnecessary sensitive financial information.
- Accessibility: check WCAG contrast, keyboard navigation, labels, focus states, screen-reader output.
- Performance targets: LCP <= 2.5s, INP < 200ms, CLS <= 0.1; measure only after a real staging deployment.

Research references embedded in `docs/RESEARCH_AND_QA.md`:
- Google Search Central helpful content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Essentials: https://developers.google.com/search/docs/essentials
- W3C WCAG contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum
- W3C mobile accessibility: https://www.w3.org/WAI/standards-guidelines/mobile/

## 6. QA status (do not overstate)
Recorded in the package notes:
- HTML parser check: passed
- JavaScript syntax check (`node --check`): passed
- Required local assets: present
- Calculation scenario tests: reported as run for release, but need reproducible test evidence before production sign-off
- Android manual browser QA: pending
- Keyboard/screen-reader QA: pending
- Lighthouse/Core Web Vitals: pending real staging URL
- SEO canonical/sitemap/robots/indexability: pending final domain/staging URL
- No production deployment has happened.

## 7. GitHub / deployment status and blocker
- Connected GitHub account currently exposes `barsulkhan/InfoJano` only.
- Do **not** put USAJIO code into InfoJano.
- The available GitHub connector actions can list repositories, create branches/files/commits within an existing repo, but no create-new-repository action is exposed in this session.
- Therefore a separate repository `barsulkhan/USAJIO` has NOT been created, and no Cloudflare Pages project has been deployed.
- Next required user-side step: create a new empty public GitHub repository named `USAJIO` under `barsulkhan`, with README initialization OFF (empty repo). Then provide/confirm its URL so the prepared package can be committed safely. No domain or paid service needed.

## 8. Next-step execution order
1. Create empty GitHub repo `barsulkhan/USAJIO` (keep separate from InfoJano).
2. Upload/commit the V1.1 package to a development branch, not a production branch initially.
3. Inspect repository tree and run reproducible calculator tests; fix any issues found.
4. Set up Cloudflare Pages free staging connected only to USAJIO repo.
5. Verify deployed URL, assets, mobile navigation, all calculator results, policy links, and browser console.
6. Run Lighthouse/accessibility/performance QA; record actual results, not estimates.
7. Add final SEO metadata, canonical, sitemap and robots only after staging/domain URL is known.
8. Prepare remaining global finance guides and country-specific content with sources.
9. Do not connect monetization or purchase a domain until user explicitly approves.

## 9. Separate InfoJano project reminder
- InfoJano is a separate existing project and repository: https://github.com/barsulkhan/InfoJano
- Live website previously recorded: https://barsulkhan.github.io/InfoJano/
- Do not alter InfoJano while working on USAJIO. User plans to return to InfoJano after this short USAJIO session.
- Before switching projects, record the exact USAJIO stopping point and next action in this master file.

## 10. User workflow preferences
- Communicate in simple Bengali.
- User works mainly from Android and wants assistant-led incremental execution.
- User may stop work at short notice; preserve current status and next action clearly.
- Never say “saved”, “deployed”, “tested”, “merged”, or “verified” unless that exact action truly happened.
- Do not ask the user to repeat information already in this file.

## 11. Quick continuation check — 2026-11-11 (latest session)
- Confirmed the local project folder and ZIP exist in the working files area.
- Re-ran `node --check script.js`: passed.
- Re-ran Python HTML parser across all six HTML pages: passed.
- Re-ran ZIP integrity test (`unzip -t`): passed.
- Confirmed the research/QA note is included and records competitor/Google/W3C-informed principles, calculator assumptions, and outstanding manual checks.
- Confirmed the connected GitHub installation search currently returns only `barsulkhan/InfoJano`; no `USAJIO` repository is available through the connected installation.
- No files were pushed to InfoJano; no deployment or live URL exists for USAJIO.
- Current next step remains: create a separate empty `barsulkhan/USAJIO` repository. The available GitHub connector exposes repository search and repository-content operations but no repository-creation action. Do not modify InfoJano as a workaround.

---

## 12. Session update — 2026-11-11: Separate GitHub repository created, website published, and Android visual confirmation

### Repository and uploaded files
- User created/authorized the separate public GitHub repository `barsulkhan/USAJIO` and shared its repository screenshot.
- Repository URL: https://github.com/barsulkhan/USAJIO
- README initialization commit was made in the repository; later website source files were uploaded to this repository only. InfoJano was not modified.
- Website files committed include: `index.html`, `styles.css`, `script.js`, `assets/logo.svg`, `assets/favicon.svg`, `about.html`, `contact.html`, `privacy.html`, `terms.html`, `disclaimer.html`, `editorial.html`, `README.md`, `docs/RESEARCH_AND_QA.md`.
- GitHub read-back checks confirmed key files such as `index.html`, `styles.css`, `script.js`, logo/favicon, privacy page and research note existed in the repository at the time of checking.
- A GitHub Pages Actions workflow was added at `.github/workflows/deploy-pages.yml`.

### Pages deployment issue and resolution
- First Actions run failed because GitHub Pages had not yet been enabled/configured; screenshot showed `Get Pages site failed` / Pages site not found. Node 20 deprecation was only a warning, not the primary failure.
- User opened repository Settings → Pages and selected Source = `GitHub Actions`. GitHub displayed the confirmation “GitHub Pages source saved.”
- Workflow was then updated/committed again to trigger a fresh run. Update commit SHA: `bcdff727c235161c10967590f45dea8f98b03e2d`.
- User's Actions screenshot showed the second run, titled “Retry GitHub Pages deployment after Pages source enabled”, with green success tick, duration 21 seconds. This is evidence that the GitHub Pages deployment workflow completed successfully.
- The live site URL is: https://barsulkhan.github.io/USAJIO/
- User opened the live URL on Android Chrome and sent a screenshot. The screenshot visibly confirms the site loads and shows the USAJIO logo/header/navigation, approved clean light hero (“Make Smarter Money Decisions”), feature/trust strip, six calculator cards and the beginning of the Compound Interest Calculator form.
- Therefore current status: **GitHub Pages deployment succeeded and homepage is visually confirmed loading on the user's Android browser.** This is GitHub Pages hosting, not Cloudflare Pages. Cloudflare has not been connected or deployed.

### Current live build scope / limitations to remember
- Live homepage contains six tools: Compound Interest, Loan Calculator, Monthly Budget, Savings Goal, Emergency Fund, Debt Payoff.
- Currency display selector includes USD, EUR, GBP, CAD, AUD, INR. It changes number formatting only; it is not FX conversion or jurisdiction localization.
- Basic About, Contact, Privacy, Terms, Financial Disclaimer and Editorial Policy pages are included. Contact details and policy copy remain starter text and need review before a production/business launch.
- The uploaded code version should be treated as the current V1 initial live deployment; do not assume it contains every feature listed in the earlier local V1.1 ZIP notes (for example yearly growth table/amortization table) without inspecting actual repository code.
- Do not claim all calculator math is fully validated. Android screenshot proves visual rendering only, not result accuracy.

### Next work when user resumes
1. Perform a structured QA audit of all six live calculators: known-answer cases, zero/boundary/invalid inputs, rounding, negative/large inputs, and clear error handling. Fix issues on a separate branch and deploy only after tests.
2. Check each navigation link and each policy/info page on the live site; review placeholder contact and policy language.
3. Check mobile menu and responsive layout at common viewport sizes; user's Android screenshot confirms the homepage top portion and first calculator section only.
4. Review formulas and disclose assumptions for compound interest, loan payment/extra payments and debt payoff; ensure displayed payment/interest totals are internally consistent.
5. Add SEO technical foundations after reviewing current source: unique titles/descriptions, canonical strategy appropriate to the GitHub Pages URL, `robots.txt`, `sitemap.xml`, internal links and structured data only where justified. Verify actual HTTP responses and Google Search Console separately; do not claim indexed merely because live.
6. Continue competitor research before new tools/content. Required workflow remains **Research → Competitor Analysis → Improvement Plan → Development → Testing**.
7. Consider Cloudflare Pages only if there is a concrete need; GitHub Pages currently provides free hosting and is working. Do not switch hosting unnecessarily.
8. No paid domain, paid hosting, subscriptions, API spend or monetization setup without explicit user approval.

### End-of-session / new-chat handoff rule (user explicitly requested)
- Whenever the user says they are stopping work / “এখন আর কাজ করব না” / asks to pause, first update this same main USAJIO master file with all current progress, exact files/commits/URLs, tests, blockers and next task. Do not create a competing new master file unless the user explicitly asks.
- Then tell the user the exact master filename: `USAJIO_MASTER_PROJECT_2026-11-11.md`.
- Then provide a short, copy-ready new-chat starter prompt that tells the next chat to read/continue this exact master file and resume from its recorded next task, without asking the user to repeat project history.
- Trigger phrase agreed by user: when the user says **“USAJIO”** (voice typing may render it as “জিও”), treat it as a request to retrieve/continue from this USAJIO master project file and its latest saved checkpoint. If they say “আমি এখন আর কাজ করব না” or equivalent, use the save-and-handoff procedure above automatically.

### Copy-ready new-chat starter prompt
আমাদের USAJIO Main Smart Project File `USAJIO_MASTER_PROJECT_2026-11-11.md` আগে খুঁজে সম্পূর্ণ পড়ে নাও। আগের কাজ নতুন করে শুরু করবে না। USAJIO আলাদা প্রজেক্ট; InfoJano-র কোনো ফাইল/কোড পরিবর্তন করবে না। বর্তমান লাইভ সাইট https://barsulkhan.github.io/USAJIO/ এবং GitHub Repository https://github.com/barsulkhan/USAJIO । GitHub Pages deployment সফল এবং Android homepage visual load নিশ্চিত হয়েছে। Master File-এর সর্বশেষ “Next work when user resumes” অংশ থেকে ছয়টি Calculator-এর structured QA শুরু করো। প্রতিটি নতুন feature-এর আগে Research → Competitor Analysis → Improvement Plan → Development → Testing অনুসরণ করবে। কাজ শেষে একই Master File আপডেট করবে। বাংলায় সহজভাবে কথা বলবে; আমি Android ব্যবহার করি। কোনো paid service/domain/hosting/API খরচ আমার অনুমতি ছাড়া করবে না। কোনো পরীক্ষা বা deployment না করে সফল বলবে না।

## 12. Latest progress update — 2026-11-11 (GitHub Pages live)
- User created the separate public GitHub repository: https://github.com/barsulkhan/USAJIO (confirmed by user's screenshots).
- Repository contains the USAJIO homepage and site files, plus `.github/workflows/deploy-pages.yml` for GitHub Pages deployment.
- GitHub Pages Source was set to **GitHub Actions**; user screenshot showed “GitHub Pages source saved”.
- First workflow run failed because Pages was not enabled/configured yet (`Get Pages site failed`).
- Workflow was then retried after the Pages source setting was saved. User screenshot of Actions list showed the second run, “Retry GitHub Pages deployment after Pages source enabled”, with a green check and duration of 21 seconds. This is evidence that the workflow run succeeded.
- User opened the deployed site on Android and supplied a screenshot showing the USAJIO homepage rendered. Visible: logo/navigation, hero banner “Make Smarter Money Decisions”, six tool cards, and Compound Interest Calculator section.
- Public URL: https://barsulkhan.github.io/USAJIO/
- Current status: **GitHub Pages deployment succeeded and homepage visibly loads on user's Android browser.** This is an initial visual confirmation only; do not claim all calculator functions, all links, responsive breakpoints, SEO, accessibility, or performance are fully tested.
- Cloudflare Pages has NOT been configured/deployed. GitHub Pages is the current free hosting/staging deployment.
- Next work when user resumes: run a structured QA audit of all six calculators (inputs, expected outputs, edge cases, validation, currency display), then mobile navigation and all policy/page links; inspect console and accessibility/performance where tools permit. Record actual outcomes only.
- SEO tasks still pending: metadata/canonical review, sitemap.xml, robots.txt, structured data, Search Console readiness, and original finance guide content with reputable sources.
- Review placeholder contact details and starter policy wording before public launch. No paid domain, paid hosting, subscriptions, APIs, or monetization have been approved.

## 13. Stop-work / new-chat handoff protocol (user explicitly requested)
- Whenever the user says they are stopping work / will not work now / wants to continue in a new chat, follow this sequence without waiting for another reminder:
  1. Update this **main USAJIO Master Project File** with all verified work, decisions, current blockers, and the exact next task.
  2. Upload/replace the updated master file in the Library, preserving this canonical filename unless a dated version is explicitly needed.
  3. Tell the user the exact master file name: `USAJIO_MASTER_PROJECT_2026-11-11.md`.
  4. Provide a short copy-ready Bengali prompt for the new chat that says to read/continue from this master file and resume from the next pending task; do not ask the user to repeat project details.
- Continuation trigger: if the user starts a new chat and says **“USAJIO”**, treat that as a request to retrieve/read this master project file and continue from its latest recorded status. Search the Library for the exact file before asking the user for anything.
- Keep USAJIO separate from InfoJano. Do not modify InfoJano while working on USAJIO.

## 14. Final checkpoint — 2026-11-11: User paused USAJIO work
- User explicitly requested that all current USAJIO information be saved in the existing main Smart Project File, and that the assistant provide the exact file name plus a copy-ready new-chat continuation prompt whenever the user says they are stopping work.
- Reconfirmed live status from the user's latest Android screenshot: USAJIO loads at `https://barsulkhan.github.io/USAJIO/`. The visible page shows the approved light design, logo/header/navigation, hero banner, trust/value strip, six calculator cards, and the beginning of the Compound Interest Calculator. This is a visual homepage check only, not a full functional QA pass.
- Current repository: `https://github.com/barsulkhan/USAJIO` (separate from InfoJano).
- GitHub Actions screenshot showed the retry deployment run completed with a green success indicator (21 seconds). Pages source was saved as GitHub Actions. Public live URL: `https://barsulkhan.github.io/USAJIO/`.
- No Cloudflare deployment. GitHub Pages is the active free hosting.
- Do not state that all six calculators or all links have passed QA. Functional QA, responsive testing beyond the supplied viewport, policy/contact review, SEO technical checks and Search Console readiness remain pending.
- Next task on resume: structured QA audit of all six calculators using known-answer cases, boundary/invalid inputs, rounding and clear validation; then inspect navigation and policy pages. Follow `Research → Competitor Analysis → Improvement Plan → Development → Testing` before any new feature. Keep USAJIO isolated from InfoJano.
- Stop-work protocol: when user says “আমি এখন আর কাজ করব না” or equivalent, update this same master file first, replace the canonical Library copy, then tell them the filename and provide the short new-chat prompt below. If user later says “USAJIO” (or voice transcription “জিও”), retrieve this exact master file and continue from its latest checkpoint without asking them to repeat project history.

### Canonical master file name
`USAJIO_MASTER_PROJECT_2026-11-11.md`

### New-chat starter prompt
আমাদের USAJIO Main Smart Project File `USAJIO_MASTER_PROJECT_2026-11-11.md` আগে Library থেকে খুঁজে সম্পূর্ণ পড়ে নাও। আগের কাজ নতুন করে শুরু করবে না। USAJIO আলাদা প্রজেক্ট; InfoJano-র কোনো ফাইল বা কোড পরিবর্তন করবে না। Live website: https://barsulkhan.github.io/USAJIO/ । GitHub repository: https://github.com/barsulkhan/USAJIO । GitHub Pages deployment সফল এবং আমার Android-এ homepage দেখা গেছে; কিন্তু ছয়টি Calculator-এর functional QA এখনো বাকি। Master File-এর সর্বশেষ checkpoint থেকে ছয়টি Calculator-এর structured QA শুরু করো। প্রতিটি নতুন feature-এর আগে Research → Competitor Analysis → Improvement Plan → Development → Testing অনুসরণ করবে। কাজের শেষে একই Master File আপডেট করবে। সহজ বাংলায় কথা বলবে; আমি Android ব্যবহার করি। আমার অনুমতি ছাড়া কোনো paid domain, hosting, API বা subscription নেবে না। যাচাই না করে কোনো কাজকে সফল বলবে না।

---

## 15. Migration verification update — 12 November 2026

This section supersedes earlier checkpoint statements in Sections 7 and 11–14 that said the separate USAJIO repository did not yet exist.

- Confirmed repository: https://github.com/barsulkhan/USAJIO (public; default branch `main`).
- The complete 219-line Library master file has been transferred to this repository at `docs/USAJIO_MASTER_PROJECT_2026-11-11.md` and fetched back successfully (21,368 characters).
- The original Library master remains unchanged.
- The previously recorded GitHub Pages deployment remains successful: workflow run `43022301635`, commit `bcdff727c235161c10967590f45dea8f98b03e2d`. The user's Android screenshot had confirmed the homepage top section visually; this does not prove calculator functional QA.
- A new Pages workflow was queued after the documentation transfer (run `43180954264`, commit `54cdfec8c1fdff9e848ae7b52b1d9d91df06a148`). Recheck its final status; a docs-only transfer is not proof of a successful new deployment.
- Keep USAJIO separate from InfoJano. Do not switch hosting or add paid services. Next product task remains structured QA of the six live calculators and navigation/policy pages.


## 16. Calculator Hub and standalone pages — 21 November 2026

### Decision and rationale
- Adopt a Calculator Hub homepage plus six standalone calculator pages. The previous homepage displayed six tool cards that jumped to six sections in one long document; this was confusing on mobile.
- Competitor-inspired patterns used as product ideas (not copied content/code): category-led calculator discovery and dedicated tool pages; clear result summaries; visible assumptions/disclaimers; links back to related tools.
- Keep existing free GitHub Pages hosting and avoid paid services.

### Implementation on branch
- Branch: `feature/calculator-hub-separate-pages` (created from latest `main`).
- Updated `index.html` to present six cards linking to separate pages.
- Added `calculator-pages.css` for responsive standalone calculator layouts.
- Updated `script.js` so shared initialization and calculator handlers tolerate pages where unrelated calculator fields are absent.
- Added: `compound-interest.html`, `loan-calculator.html`, `monthly-budget.html`, `savings-goal.html`, `emergency-fund.html`, `debt-payoff.html`.
- Each page has a unique title/description, shared navigation, its own calculator form, return-to-hub link, and related-tool links.

### Verification status
- GitHub write calls returned commits for all changed/new files on the feature branch.
- Full live-browser/Android QA has not been performed in this environment. Do not call the change production-ready or deployed until links, calculations, responsive layouts, and console behavior are checked.
- Existing calculator formulas were retained in principle; this change is primarily page structure and shared-script initialization. Formula correctness remains subject to the separate calculator QA work.
- Existing open PRs #1 and #2 were left untouched; no PR was merged.

### Next steps
1. Fetch back every changed/new file from the feature branch and confirm the expected contents.
2. Run available static checks and inspect page-to-script element IDs.
3. Open a PR against `main` with explicit remaining QA notes; do not merge until browser/mobile checks and user approval.
4. After merge and successful GitHub Pages deployment, verify the live hub and all six URLs on Android.


## 17. Independent code-level QA checkpoint — 21 November 2026
- Reviewed the feature branch's six standalone calculator pages, shared JavaScript, shared CSS, homepage links, and documentation.
- Static structure check: each page loads the shared script, has its corresponding calculation button ID, and has no duplicate form IDs. Existing policy/contact/about page targets were confirmed to exist on `main`; the suspected `about.html` missing link is not a defect.
- Independently checked sample/default arithmetic: compound interest monthly mode ≈ $17,175.24 future value; loan ≈ $198.01/month, $1,880.72 interest, 60 months; budget $1,150 remaining; savings goal $250/month; emergency fund $10,800 target / $9,800 remaining; debt payoff 23 months / ≈ $606.74 interest.
- Defects/limitations: compound-interest quarterly/annual frequency batches monthly contributions into larger periodic deposits, inconsistent with the monthly-contribution label; validation is not consistently enforced in JavaScript for zero/out-of-range values; zero-payment debt edge cases need robust handling. Currency selector is formatting-only, not FX conversion.
- PR #3 status checked: open, unmerged, mergeable. No changes merged or deployed.
- This was code/static and independent arithmetic QA only. No real browser, console, responsive visual, or Android Chrome session was available; full QA is still pending. Keep PR #3 unmerged until fixes and further testing are complete.
- Detailed results are in `docs/RESEARCH_AND_QA.md`, section “Independent code-level QA pass”.


## 21. Formula accuracy and validation follow-up — 21 November 2026
- Created branch `qa/calculator-accuracy-and-methodology-2026-11-21` from current `main`.
- Documented compound-interest timing so monthly contributions are posted at month-end and the selected nominal compounding frequency is converted to an equivalent monthly rate.
- Disclosed the exact contribution/interest timing assumption on the calculator page.
- Hardened validation bounds and loan/debt termination handling to avoid showing partial or misleading payoff estimates.
- Independent calculation check: for $1,000 principal + $100 monthly contribution, 5% APR, 12 months, estimated ending values are about $2,279.05 monthly, $2,278.71 quarterly, and $2,277.26 annual compounding.
- Static and independent arithmetic checks are not a substitute for real browser, accessibility and Android Chrome testing. No deployment occurred.


## 2026-11-21 — Calculator catalog expansion (PR #9)
- Added dedicated Mortgage, Auto Loan and Credit Card Payoff calculator pages and homepage cards on branch `feature/us-loan-and-credit-calculators-2026-11-21`.
- New pages: `mortgage-calculator.html`, `auto-loan-calculator.html`, `credit-card-payoff.html`.
- Shared `script.js` includes handlers for all three tools. Mortgage separates principal-and-interest from estimated housing total; tax/insurance/HOA are user-entered and exclusions are disclosed.
- Auto loan supports extra monthly payments and uses fixed-rate amortization; enter financed amount after upfront taxes/fees.
- Credit card payoff uses monthly APR/12 approximation and flags payments that do not exceed monthly interest; daily interest accrual, fees, new purchases and variable APR are excluded.
- Homepage now has nine calculator cards. These changes are in a review branch only; no production merge/deployment. Static checks and independent arithmetic only; real browser/Android QA remains pending.


## 2026-11-21 — Editorial content expansion (PR #9)
- Added six dedicated Money Guide pages: `budgeting-guide.html`, `emergency-fund-guide.html`, `debt-payoff-guide.html`, `credit-score-guide.html`, `mortgage-basics-guide.html`, and `auto-financing-guide.html`.
- Homepage guide cards now link to all six pages; relevant calculators are cross-linked from the guides.
- Topics cover practical budgeting, emergency savings, debt repayment methods, US credit score/report basics, mortgage cost components and auto financing comparisons.
- Sitemap expanded to include all six guides. Pages are general education only and do not offer individualized advice.
- This work remains in PR #9 review branch. No production merge/deployment; browser/mobile QA and external source review remain pending.


## 2026-11-21 — Retirement and student-loan tools (follow-on PR)
- Added `retirement-calculator.html` and `student-loan-payoff.html`, bringing the calculator catalog to eleven tools.
- Retirement projection includes current savings, monthly contribution, years, assumed return and optional match; uses month-end contribution timing and clearly labels return as an assumption.
- Student loan planner estimates fixed-payment payoff using monthly APR/12 approximation. It is not a federal student-loan plan estimator and excludes income-driven plans, forgiveness, deferment, fees and variable rates.
- Homepage and sitemap updated. This is a follow-on branch from PR #9 and remains unmerged/unpublished pending review and dependency checks.


## 2026-11-21 — Consolidated quality, trust, SEO and mobile pass
- Created integration-review branch `quality/trust-seo-mobile-final-pass-2026-11-21` from the eleven-calculator/six-guide expansion branch (PR #10 head). This is a review branch only; it does not change production.
- Improved About, Contact, Privacy, Terms, Financial Disclaimer and Editorial Policy pages. Privacy wording describes the current static-browser calculation approach, GitHub Pages hosting and the absence of intentionally configured first-party analytics/ads; third-party font requests are acknowledged. No unverified contact email was invented.
- Added Retirement Planning and Student Loan educational guides and homepage discovery links. The guides distinguish simplified calculator scenarios from actual plan/servicer rules and direct readers to official US resources where relevant.
- Expanded sitemap for both new guides, added homepage canonical/Open Graph metadata, and added responsive keyboard-focus, touch-target, reduced-motion and guide-reading styles.
- Integration note: PR #10 does not include the separate premium visual stylesheet work from PR #5 or the competitor research report from PR #4. Do not close or merge stacked PRs blindly; compare and integrate deliberately.
- QA remains source/static only. No real browser, Android, screen-reader, Lighthouse or live HTTP verification has been performed. No production merge/deployment; explicit user approval is still required.


## Integrated QA checkpoint — 2026-11-21

Consolidated integration branch: `quality/integrated-final-qa-2026-11-21`. Premium visual CSS, canonical metadata, calculator result live regions, and consistent mobile navigation/footer links have been staged. Static source and arithmetic checks have been performed. Real-browser, Android, assistive-technology and Lighthouse validation remain outstanding. No merge or production deployment has been performed.


## 2026-11-21 — Automated browser QA passed
- Added a Playwright Chromium workflow and browser smoke suite on the integration branch. GitHub Actions run https://github.com/barsulkhan/USAJIO/actions/runs/44935795608 completed successfully.
- Homepage and all eleven calculators load; all eleven default calculator interactions produce results; polite result announcements, mobile navigation open/close, 390px homepage overflow and local HTML links pass; no browser/console errors or HTTP error responses were observed in the run.
- This is CI Chromium with a mobile viewport, not a physical Android device. Screen-reader/manual keyboard review, Lighthouse/Core Web Vitals and visual regression remain outstanding.
- Changes remain on the integration PR; no merge or live deployment has occurred.


## 14. Deployment incident resolution and homepage release verification — 2026-11-22

### Repository state verified
- Repository: `barsulkhan/USAJIO` (public); default branch: `main`; repository is not archived.
- PR #13 remains the homepage design change, merged as `e0673687ad2c3b48f8b0b921ff1fbbacd20319d9`.
- PR #14 (`Fix Pages deployment artifact metadata timing`) was already merged into `main` as `ebe4a214ed948b5cdd36e16ef8d9c7f00d18fb76`.
- Current `main` head at verification: `ebe4a214ed948b5cdd36e16ef8d9c7f00d18fb76`.
- No changes were made to InfoJano.

### Deployment failure root cause
- Failed run #44936850607 checked out PR #13 commit `e0673687ad2c3b48f8b0b921ff1fbbacd20319d9`.
- Checkout, Configure Pages, and Upload site artifact all succeeded.
- `upload-pages-artifact@v3` finalized artifact `github-pages` (ID `14719629520`) successfully.
- Immediately afterward, `deploy-pages@v4` queried the Actions artifact API and received `Found 0 artifact(s)` / `No artifacts named "github-pages" were found`. This was an artifact metadata visibility/race condition, not a missing upload, Pages configuration failure, or missing workflow permission.
- The Node.js 20 deprecation warning was non-fatal and unrelated to the deployment failure.

### Fix already merged and verified
- PR #14 added a 15-second wait after `actions/upload-pages-artifact@v3` and before `actions/deploy-pages@v4` in `.github/workflows/deploy-pages.yml`.
- Workflow permissions remain least-privilege for this deployment: `contents: read`, `pages: write`, `id-token: write`.
- Successful run: https://github.com/barsulkhan/USAJIO/actions/runs/44937240457 (run #8; commit `ebe4a214ed948b5cdd36e16ef8d9c7f00d18fb76`).
- Successful job steps: Checkout — Pass; Configure Pages — Pass; Upload site artifact — Pass; Wait for Pages artifact registration — Pass; Deploy to GitHub Pages — Pass.
- Success log confirms artifact metadata lookup returned `Found 1 artifact(s)`, Pages deployment was created for commit `ebe4a214ed948b5cdd36e16ef8d9c7f00d18fb76`, deployment status `Reported success!`, and environment URL `https://barsulkhan.github.io/USAJIO/`.
- GitHub Pages remains the free hosting platform. No paid service, domain, API, subscription, or hosting migration was introduced.

### Homepage/live verification status
- `index.html` in `main` is the homepage source included in the successful deployment artifact; it contains the PR #13 homepage implementation.
- GitHub Actions confirms the Pages deployment succeeded and publishes the environment URL above.
- Direct external HTTP/browser fetch of the live URL could not be completed from this execution environment because outbound DNS/network access was unavailable. Therefore direct visual rendering/HTTP response of the current deployment is **Not Tested here**; do not represent it as browser-verified. User-side Android visual confirmation from the earlier release is separate historical evidence, not a new test of this build.

### Current next actions
1. Verify the live homepage via a browser-capable check when available, then record HTTP status and confirm the new hero content.
2. Re-run the current 11-calculator browser QA against the deployed build; do not reuse older test outcomes as current pass evidence.
3. Check internal links, navigation, guides, SEO metadata, sitemap and robots.
4. Continue pending keyboard accessibility, screen reader, physical Android, visual regression, and Lighthouse/Core Web Vitals checks; mark each Pass/Fail/Not Tested honestly.


## 15. Today's execution plan and static QA — 2026-11-22

### Work sequence for today
1. Reconfirm `main`, deployment status, open PRs, and release source — **Pass**.
2. Verify live homepage HTTP/rendering — **Not Tested**: this environment cannot resolve `barsulkhan.github.io` (DNS/network restriction). User confirmation is required only for the visible live page on their own device.
3. Inspect all 11 calculator source pages and their JavaScript wiring — **Pass for static structure**; runtime/browser interactions remain **Not Tested**.
4. Audit SEO basics, sitemap and robots directives — **Pass for static source checks**; search-engine crawl/index status remains **Not Tested**.
5. Check internal navigation and guide-page links — **In progress**; automated runtime link crawl is not available in this execution environment.
6. Record remaining manual-only checks and prioritize next work.

### Static source QA performed against `main` at `ebe4a214ed948b5cdd36e16ef8d9c7f00d18fb76`
- All 11 calculator HTML pages fetched from current `main`: **Pass**.
- Each of the 11 calculator pages has one branded `<title>`, a meta description, exactly one `<h1>`, and exactly one matching calculator action ID — **Pass**.
- Each calculator page contains a result region with `aria-live="polite"` — **Pass**.
- JavaScript contains matching click handlers for all 11 calculator action IDs — **Pass** by source inspection.
- Independent arithmetic spot checks using the same documented formulas: $10,000 at 7% for 60 months = $198.01/month; $28,000 at 6.9% for 60 months = $553.11/month; $5,000 at 12% with $250/month = 23 months; $1,000 initial + $100 at month-end for 12 months at 5% monthly compounding = $2,279.05 — **Pass (formula calculation only; not browser execution of current code)**.
- Sitemap contains 26 absolute URLs under the GitHub Pages project path — **Pass (syntax/count)**; existence and live response of every URL still require a browser/HTTP crawl.
- `robots.txt` allows crawling and references the correct sitemap URL — **Pass (static source)**.
- Homepage source has a branded title and description and includes the new hero copy, green trust badge, both CTAs, and the three trust statements — **Pass (source inspection)**.
- Live HTTP status, visual rendering, browser console/network errors, real mobile overflow, and interactive calculator behavior — **Not Tested** because outbound DNS/network is unavailable and no browser runner is exposed in this execution.

### PR overlap / branch hygiene
- PR #15 is documentation-only and remains open; no main-branch merge/deployment was performed.
- PR #11 remains open but is based on the older `4f55fb9...` base and its branch diverges from current `main` (`57` commits ahead, `3` behind); its changed-file set substantially overlaps files already delivered through merged PRs #12–#14. Do not merge it as-is. Review/close as obsolete only after a patch-level comparison.
- PRs #10, #9, #8 and #7 are also open historical branches with overlapping site files; do not merge without checking exact current diff and unique value. PR #12 is merged; PR #13 and #14 are merged.

### Checks that require user/device or unavailable browser access
- User: open `https://barsulkhan.github.io/USAJIO/` on the device/browser they normally use and confirm whether the new hero design is visible. This cannot be confirmed by GitHub Actions alone.
- User/device: physical Android touch/layout check; this cannot be emulated as a real device here.
- Not tested: keyboard-only and screen-reader audit, visual regression, Lighthouse/Core Web Vitals.


### Additional static content/navigation checks — 2026-11-22
- All 8 Money Guide pages inspected: each has a page-specific title, meta description, canonical URL and exactly one H1 — **Pass**.
- About, Contact, Privacy, Terms, Disclaimer and Editorial pages inspected: each has a title, meta description, canonical URL and exactly one H1 — **Pass**.
- Static local HTML-link audit across all 26 HTML pages in the repository tree: **Pass**; no missing relative `.html` targets were found.
- Sitemap URL count (26) matches the current HTML page count (26) — **Pass (count only)**. Sitemap URLs are project-relative GitHub Pages absolute URLs; live URL reachability remains **Not Tested**.
- No source code or calculator logic was modified during this QA pass.

### CI automation follow-up
- PR #16 opened: https://github.com/barsulkhan/USAJIO/pull/16. It adds a `pull_request` trigger for the existing Playwright browser QA workflow when site HTML/CSS/JS, assets, tests or the workflow itself change. This is a CI-only change; it does not modify the website or deployment workflow.
- GitHub will not execute the newly added PR trigger for PR #16 itself because the workflow definition is not yet present on the base branch. After approval/merge, future site PRs will run the browser QA automatically.


## 19. Browser QA automation and approved deployment — 22 November 2026
- User approved merging the documentation and CI follow-ups. PR #15 merged as `8c75c8b8bd8f64fd57b82ef81096be479e54762f` (docs only).
- The original CI PR #16 was found one commit behind after PR #15 changed `main`; it was closed unmerged and recreated on the current base as PR #17.
- PR #17 merged as `53cc87accf1e7c2eea44e4e6e38b1a26768b4367`. It adds automatic Playwright QA on pull requests targeting `main` when site HTML/CSS/JS, assets, tests or the workflow change. The workflow also retains its quality-branch push and manual dispatch triggers.
- Browser QA run #44984822409 completed **successfully** on the PR merge preview. The Playwright log reports: `PASS: homepage, 11 calculator default interactions, live result announcements, mobile menu, 390px overflow and local HTML links.` This is real headless Chromium browser execution, not source-only inspection or physical Android testing.
- GitHub Pages deployment run #44984834009 completed **successfully** for `main` commit `53cc87accf1e7c2eea44e4e6e38b1a26768b4367`. The log found one `github-pages` artifact, created the deployment for that exact commit, and reported success. Environment URL: https://barsulkhan.github.io/USAJIO/.
- Historical PRs #4–#11 were closed unmerged after checking their age, overlap and representative current files. Do not restore/merge these historical branches directly; any genuinely unique work should be cherry-picked or rebuilt against current `main` after a fresh review.
- Current `main` head at this checkpoint: `53cc87accf1e7c2eea44e4e6e38b1a26768b4367`.

### Still requires a human device
- Open the deployed site on a physical Android device and visually confirm the hero, CTA and navigation. CI tests a 390px Chromium viewport but cannot certify the user's actual handset/browser rendering or touch experience.
- Keyboard/screen-reader audit, visual regression and Lighthouse/Core Web Vitals have not yet been run.


## 2026-11-22 — Net worth calculator service
- Added a new standalone net worth calculator on branch `feature/net-worth-calculator` for the planned net-worth tool in the competitor research roadmap.
- The tool totals cash/bank accounts, non-retirement investments, retirement accounts, home value and vehicles/other assets; subtracts mortgage, auto, student, credit-card and other debt balances.
- Added the homepage card, canonical page metadata, sitemap URL, README catalog entry, browser QA coverage and Lighthouse mobile/desktop URLs.
- Privacy scope: values are calculated in-page only and are not transmitted or saved by this static tool. Currency selection is formatting-only, not FX conversion.
- Static read-back confirms 12 calculator cards and 13 Lighthouse URLs including homepage. PR-triggered browser/axe and Lighthouse results remain pending; physical-device QA remains separate.
- Work is isolated in PR review; no merge or production deployment is included.


---

## Final checkpoint — 2026-11-22 (user paused work; PR #26 deployed successfully)

### Verified repository state
- Repository: https://github.com/barsulkhan/USAJIO
- Default branch: `main`
- Latest feature merge: PR #26, Net Worth Calculator; merge commit `491917ca21b713d7fc99a774c5119ea899688ffb`.
- GitHub Pages deployment workflow run #44989840988 for that exact commit: **completed / success**.
- Latest open pull requests API check: **0 open PRs**.
- Repository tree was read from the exact latest main commit. Source, tests, assets, policy pages, documentation and workflows are committed in GitHub; no uncommitted local working tree is being relied upon.
- README currently documents 12 calculators. The repo includes 12 calculator HTML pages: compound interest, loan, monthly budget, savings goal, emergency fund, debt payoff, mortgage, auto loan, credit-card payoff, retirement, student-loan payoff and net worth.
- Latest main commit before this checkpoint: `491917ca21b713d7fc99a774c5119ea899688ffb`.
- Live website: https://barsulkhan.github.io/USAJIO/
- Deployment run: https://github.com/barsulkhan/USAJIO/actions/runs/44989840988
- PR #26: https://github.com/barsulkhan/USAJIO/pull/26

### What is included / preserved in the repository
- Homepage and shared CSS/JS.
- 12 calculator pages.
- About, Contact, Privacy, Terms, Financial Disclaimer and Editorial Policy pages.
- SVG logo and favicon.
- `sitemap.xml`, `robots.txt`.
- Playwright browser QA test source and GitHub Actions browser QA workflow.
- Mobile and desktop Lighthouse CI configuration and performance audit workflow.
- Research, QA and competitor-plan documentation.
- Full file inventory is available from the repository tree at the latest main commit; all these files are committed in GitHub.

### Quality / deployment evidence
- PR #26 browser QA run #44989723413 completed successfully (recorded in the preceding session checkpoint).
- Latest GitHub Pages deployment run #44989840988 completed successfully for commit `491917c`.
- Previous Lighthouse performance audit run #44989462057 passed on the preceding commit; the newer performance run #449898409? was not confirmed in the final API check and should not be claimed as passing for #26.
- The last known contrast adjustment for homepage text was committed as `9eb66129760c4624169137197419bae5e314a562` before PR #26 merge.
- Deployment success proves the Pages workflow completed; it is not a substitute for a fresh physical Android/browser check of every page and calculator.
- No open PRs remain. Old PRs #1 and #2 were closed as superseded; do not reopen or merge stale branches.

### Next session — recommended work order
Follow the established process for every new feature: **Research → Competitor Analysis → Improvement Plan → Development → Testing**. Keep changes in separate PRs, test before merge, and do not bother the user with repeated confirmations. User has already authorized merging when QA passes.
1. **P0: Functional correctness audit of all 12 calculators.** Build reproducible known-answer, zero/boundary, invalid, negative, very large and rounding tests; verify payment totals, schedules and assumptions. Existing automated browser QA covers default interactions but does not prove every financial formula/edge case.
2. **P0: Verify the Net Worth Calculator specifically.** Test assets/liabilities totals, zero values, invalid values, all currency display choices, and confirm entered data stays browser-local (no network submission/storage).
3. **P1: Accessibility and mobile review.** Check keyboard-only operation, focus order, labels, errors, screen-reader result announcements, contrast and responsive widths including common Android phone sizes. Existing automated axe/browser coverage is useful but not a replacement for manual assistive-technology checks.
4. **P1: Performance audit follow-through.** Inspect the latest Lighthouse mobile/desktop workflow runs for commit #26, retain the reports, and fix any real regressions. Measure actual results; never invent Core Web Vitals.
5. **P1: Full site navigation/content review.** Check all internal links, calculator-to-guide links, footer links, Contact page placeholders and policy text. Update placeholder contact/policy language before any business launch.
6. **P2: SEO review.** Inspect page titles/descriptions, canonical URLs for GitHub Pages, sitemap and robots; validate crawlability and structured data only where justified. Search Console/indexing status must be checked separately; a sitemap alone does not prove indexing.
7. **P2: Improve sourced finance guides.** Expand useful original guides with primary/official sources, formulas, assumptions, update dates and clear limitations. Do not mass-produce thin SEO pages or claim unverified expertise/rankings.
8. **Only after P0/P1 quality is stable:** consider further calculator features based on research. The competitor backlog mentions richer visual summaries, monthly cash-flow/50-30-20 guidance, savings “already reached/target gap” states, and clearer formula/assumption disclosures.
9. Keep hosting on free GitHub Pages for now. Do not buy a domain, paid hosting, APIs, subscriptions, or activate monetization without explicit user approval.

### Operating rules for the next chat
- USAJIO is separate from InfoJano. Never modify InfoJano.
- Use the existing GitHub repository and latest `main`; inspect current source before editing.
- Use a separate branch and PR for each task. Do not merge until checks pass; once checks pass, merge without asking the user repeatedly.
- User prefers simple Bengali, concise communication, and one uninterrupted work session rather than frequent progress messages.
- User said they are stopping work now. Do not start additional feature work unless they resume.
- Do not claim a test, deployment, browser check or merge unless the corresponding evidence exists.

### Copy-ready new-chat prompt
আমাদের USAJIO প্রজেক্ট এখান থেকে চালিয়ে যাও। আগে GitHub-এর `docs/USAJIO_MASTER_PROJECT_2026-11-11.md` ফাইলটি সম্পূর্ণ পড়ে নাও এবং সর্বশেষ checkpoint অনুসরণ করো। Repository: https://github.com/barsulkhan/USAJIO । Live site: https://barsulkhan.github.io/USAJIO/ । সর্বশেষ feature PR #26 (Net Worth Calculator) মার্জ হয়েছে; commit `491917ca21b713d7fc99a774c5119ea899688ffb`; GitHub Pages deployment run #44989840988 সফল; বর্তমানে Open PR শূন্য। সব বর্তমান source/assets/docs/tests GitHub main-এ committed আছে। প্রথম কাজ হবে P0 হিসেবে ১২টি calculator-এর reproducible formula ও edge-case QA, বিশেষ করে Net Worth Calculator-এর browser-local privacy check; তারপর accessibility/mobile, latest Lighthouse reports, internal links/policy text এবং SEO review। নতুন feature-এর আগে Research → Competitor Analysis → Improvement Plan → Development → Testing অনুসরণ করবে। প্রতিটি কাজ আলাদা branch/PR-এ করবে; checks সফল হলে merge করবে, বারবার অনুমতি চাইবে না। USAJIO ছাড়া InfoJano-তে হাত দেবে না। কোনো paid domain/hosting/API/subscription বা monetization আমার অনুমতি ছাড়া করবে না। বাংলায় সংক্ষেপে কথা বলবে, অকারণে progress update বা একই প্রশ্ন বারবার করবে না। কাজ শেষে এই একই master file আপডেট করবে।


---

## 2026-11-22 — Continuation checkpoint: full QA, site audit, SEO and new finance guide

### Current verified GitHub state
- Repository: https://github.com/barsulkhan/USAJIO
- Live site: https://barsulkhan.github.io/USAJIO/
- Current `main` commit: `dd1906eb746176957e34684be04af63a8924855e`
- Open PR count: **0** (checked after PR #32 merge).
- PR #27: calculator QA/formula regression tests and retirement calculation fix — merged.
- PR #28: Net Worth browser-local privacy regression tests — merged.
- PR #29: responsive/keyboard accessibility QA and 44×44px mobile menu touch target — merged.
- PR #30: Lighthouse report artifact retention and actual metric summaries — merged.
- PR #31: full page/navigation/policy/sitemap audit; corrected homepage calculator count from 11 to 12 and connected the Resources nav item to the footer resource/policy links — merged as `4b6e2c5374b755784e60fad6169b8632fa8552c8`.
- PR #32: sourced cash-flow budgeting guide, homepage and calculator cross-links, sitemap/README updates, SEO regression checks — merged as `dd1906eb746176957e34684be04af63a8924855e`.
- GitHub Pages deployment run #45023188599 for the latest main commit: **completed / success**. Environment URL: https://barsulkhan.github.io/USAJIO/.
- No InfoJano files or settings were changed. No paid service or domain was purchased.

### Calculator correctness and Net Worth privacy — verified
- Browser QA run #45022893157 passed on the PR #32 commit.
- The automated suite reports: `PASS: 12-calculator known-answer, zero-rate, boundary, invalid, deficit/negative, insufficient-payment and amortization checks.`
- Net Worth privacy regression passed: entered financial figures stayed in the browser; no non-read request, fetch/XHR/beacon transfer, local/session storage or IndexedDB persistence, or financial values in request URL/body. Reload did not restore values.
- Currency display checks cover USD, EUR, GBP, CAD, AUD and INR; selector changes formatting only, not FX conversion.
- These are reproducible headless Chromium tests, not a professional review of every financial product assumption.

### Accessibility, mobile and navigation — automated QA passed
- Responsive widths tested: 320, 360, 375, 390, 412, 430, 620, 700, 768 and 1024 CSS pixels across the homepage and all 12 calculator pages.
- All calculator form controls tested for programmatic labels. Each calculator action was reached by keyboard Tab, checked for visible focus, and activated with Enter.
- Mobile menu target was enlarged to at least 44×44 CSS pixels.
- axe WCAG 2.1 A/AA audit passed.
- PR #32 browser run additionally served all **28 HTML pages** and passed unique title, meta description, canonical URL, H1, language, sitemap/robots, footer policy links, internal file links and fragment-target checks.
- Physical Android touch review and a real assistive-technology/screen-reader audit remain **Not Tested**. Headless browser results do not replace those manual checks.

### Lighthouse results — actual PR #32 run
- Performance workflow run #45022893143 completed successfully for mobile and desktop.
- Across the homepage and all 12 calculator pages:
  - Mobile Performance: **96–100**; Desktop Performance: **100** on every audited page.
  - Accessibility, Best Practices and SEO: **100** on every audited page in both profiles.
  - Maximum mobile LCP: approximately **2,214 ms**; maximum desktop LCP: approximately **693 ms**.
  - Maximum mobile CLS: approximately **0.0475**; maximum desktop CLS: approximately **0.0019**.
  - TBT: **0 ms** for every audited page.
- The Lighthouse configuration audits the homepage and 12 calculators, not every guide and policy page. Browser QA did load and validate all 28 HTML pages.
- Reports are retained as GitHub Actions artifacts by the updated performance workflow. These are CI lab results; field Core Web Vitals and live Search Console data have not been checked.

### Full navigation, policy and technical SEO review
- PR #31 browser QA run #45022418844 passed; its Lighthouse run #45022418845 passed.
- All 27 pre-guide HTML pages were inspected. Every page had a unique title, meta description, canonical link and exactly one H1.
- After adding the new guide, PR #32 automated QA verified the same metadata conditions across all 28 HTML pages and enforced unique page titles.
- Sitemap contains **28 unique URLs**, all on the correct GitHub Pages project path. `robots.txt` allows crawling and references `https://barsulkhan.github.io/USAJIO/sitemap.xml`.
- Homepage now correctly states 12 calculators; Resources nav anchor targets the footer policy/resource list.
- Privacy, Terms and Financial Disclaimer pages show a review date of 21 November 2026.
- Contact page deliberately does not invent an email address or form. It says no dedicated public email/contact form has been published. Before any business launch, publish a verified contact channel and review policy wording with appropriate legal guidance.
- Technical metadata and crawl paths were checked in source/CI. Google indexing, search rankings, Search Console ownership/coverage and real public HTTP status for every URL are **Not Tested**.

### SEO research and new finance guide
- Google Search Central documentation reviewed: people-first, original, useful content; descriptive titles/headings; crawlable links; avoid thin or mass-produced search-first pages.
  - https://developers.google.com/search/docs/fundamentals/creating-helpful-content
  - https://developers.google.com/search/docs/essentials
- Primary financial education sources reviewed:
  - CFPB — Assess your spending: https://www.consumerfinance.gov/owning-a-home/prepare/assess-your-spending/
  - CFPB — Get your money situation in order: https://www.consumerfinance.gov/owning-a-home/prepare/get-your-money-situation-in-order/
  - CFPB — Your Money, Your Goals toolkit: https://files.consumerfinance.gov/f/documents/cfpb_your-money-your-goals_financial-empowerment_toolkit.pdf
  - consumer.gov — Making a budget: https://consumer.gov/your-money/making-budget
- Competitor pattern review: NerdWallet budgeting pages explain take-home pay, tracking spending, optional 50/30/20 methods and regular review. USAJIO's content angle adds payday/bill-date timing, pay-frequency conversions, annual-cost set-asides and an illustrative worked example; wording was written independently.
- Added `cash-flow-budget-guide.html`, an original U.S.-focused educational guide with official source links, review date, monthly-budget and related-tool links, clear scope limitations and social-preview metadata.
- Linked the guide from the homepage and Monthly Budget Planner; added it to sitemap, README and research documentation. Corrected the Monthly Budget page's outdated “View all six calculators” label to “View all calculators”.
- Current site has 12 calculators and 9 finance guides. Sitemap has 28 HTML URLs including homepage and information/policy pages.

### Current next actions
1. Do a manual visual check of the newly deployed cash-flow guide and updated homepage on a physical Android browser when practical; record separately from CI.
2. Continue improving the remaining finance guides one at a time with official sources, examples, assumptions, review dates and useful links; do not mass-produce thin pages or fabricate author credentials.
3. If Search Console becomes available, verify ownership, sitemap submission and indexing/coverage. Do not claim indexed until Search Console or a reliable search check confirms it.
4. Consider social-preview metadata consistency across the older guide pages; current CI enforces titles, descriptions and canonical URLs, not complete Open Graph coverage.
5. Keep physical screen-reader testing outstanding until a real device/assistive technology is used.
6. Continue using separate branches and PRs; merge only after browser QA and relevant Lighthouse checks pass.

### Operating rules reaffirmed
- USAJIO only. Do not modify InfoJano.
- No paid domain, hosting, APIs, subscriptions, monetization or purchases without explicit permission.
- Keep hosting on free GitHub Pages.
- Speak Bengali; avoid repeated questions and unnecessary progress chatter.
- Do not claim physical-device testing, Search Console indexing or live visual verification from CI results.
- Keep this file as the single canonical project master and append future verified checkpoints here.

### Copy-ready continuation prompt
আমাদের USAJIO প্রজেক্ট এখান থেকে চালিয়ে যাও। আগে `docs/USAJIO_MASTER_PROJECT_2026-11-11.md` সম্পূর্ণ পড়বে এবং এই সর্বশেষ checkpoint অনুসরণ করবে। Repository: https://github.com/barsulkhan/USAJIO । Live site: https://barsulkhan.github.io/USAJIO/ । সর্বশেষ main commit `dd1906eb746176957e34684be04af63a8924855e`; PR #27–#32 মার্জ হয়েছে; GitHub Pages deployment run #45023188599 সফল; Open PR শূন্য। ১২টি Calculator-এর formula/edge-case tests, Net Worth privacy, ১০টি responsive width, keyboard/axe QA, ২৮টি HTML page navigation/SEO metadata, sitemap/robots checks পাস। Lighthouse mobile performance 96–100, desktop 100; accessibility/SEO/best-practices 100। নতুন `cash-flow-budget-guide.html` তৈরি ও deploy হয়েছে। পরের কাজ: Android-এ নতুন guide ও homepage manual visual review, তারপর official-source-ভিত্তিক finance guide উন্নয়ন এবং Search Console readiness/indexing যাচাই (যদি access থাকে)। প্রতিটি নতুন কাজ আলাদা branch/PR-এ করবে; tests সফল হলে merge করবে। USAJIO ছাড়া InfoJano-তে কোনো পরিবর্তন করবে না। কোনো paid service/domain কিনবে না। বাংলায় কথা বলবে, অকারণে প্রশ্ন করবে না, এবং পরীক্ষা না করে pass বলবে না।


### Final verification after master-file PR #33 — 2026-11-22
- PR #33 (canonical master checkpoint update) merged successfully as `dd1906eb746176957e34684be04af63a8924855e`.
- GitHub Pages deployment run #45023314659 for this exact latest `main` commit completed successfully.
- Latest `main` is now `dd1906eb746176957e34684be04af63a8924855e`; open PR count remains 0.
- PR #33 changed documentation only; the website source released by PR #32 remains the deployed site content.


---

## 2026-11-22 — Five follow-up tasks: guide quality, social metadata, manual QA and Search Console readiness

### Verified GitHub state for this checkpoint
- PR #35: official-source refresh and social-preview metadata across all nine finance guides — merged as `5c352bcd4412d0a2e9f77a7777edef5db1994b49`.
- PR #36: physical Android and TalkBack manual QA checklist — merged as `e23116afeb481b53d6ec8c680077b927981d41d7`.
- PR #37: USAJIO Search Console verification/indexing setup checklist — merged as `6b371f4faa7e84098d3bfa76dbdd4bbc053bf74d`.
- PR #38: official Google Search Console help references — merged as `cda19c45b0d28ec0ebeff3c491c0c9c0e8899e69`.
- Main after PR #35–#38: `5c352bcd4412d0a2e9f77a7777edef5db1994b49`.
- Open PR count after these merges: **0**.
- GitHub Pages deployment run #45024192053 for this exact code commit completed successfully.
- No InfoJano repository, file or setting was changed. No paid service/domain was purchased.

### Task 1 — Physical Android visual review
- A detailed checklist is now committed at `docs/ANDROID_TALKBACK_MANUAL_QA.md`.
- It covers the homepage and cash-flow guide, mobile menu, layout, touch targets, text zoom, orientation, calculator interactions and all 12 calculator pages.
- **Actual physical Android visual/touch review remains NOT TESTED.** The assistant cannot operate or observe the user's physical Android handset in this session. Existing responsive Playwright widths and mobile Lighthouse emulation are automated tests, not a substitute for the physical-device review.
- The prior user-provided Android screenshot confirmed an earlier homepage build only; it does not verify the new guide or current deployment.

### Task 2 — Improve the remaining finance guides
- Reviewed and refreshed all eight pre-existing guides: budgeting, emergency fund, debt payoff, credit score, mortgage basics, auto financing, retirement planning and student loans.
- Added visible review date (November 22, 2026) and dedicated official-source/further-reading links to each.
- Official references include CFPB, FTC, IRS, SEC Investor.gov and Federal Student Aid. The student-loan guide now warns that 2026 federal repayment eligibility depends on loan type and first-disbursement timing; readers are directed to current StudentAid.gov information rather than relying on stale plan names.
- Preserved the existing original educational content, disclaimers and internal calculator links. No invented author credentials, guaranteed outcomes or affiliate claims.
- The ninth guide, `cash-flow-budget-guide.html`, retains its official source section and review date.
- All nine finance guides are now consistently supplied with Open Graph article/site/title/description/url and Twitter summary metadata.

### Task 3 — Google Search Console readiness
- OpenSEO's connected project list returned only the existing **InfoJano SEO** project. No USAJIO project or Search Console property was visible.
- To preserve project separation, no InfoJano project, account, property or setting was accessed, rebound or modified.
- Added `docs/SEARCH_CONSOLE_SETUP.md` with the recommended URL-prefix property, verification process, sitemap submission, URL Inspection and evidence log.
- Added official Google help links for ownership verification and URL Inspection. Follow the exact verification file path/name/content that Google provides; do not alter the token.
- **Search Console ownership, sitemap submission, indexing status and USAJIO Search Console connection remain NOT VERIFIED / NOT CONNECTED.**
- User-side prerequisite: create the URL-prefix property `https://barsulkhan.github.io/USAJIO/` in the user's Google account, choose HTML file or meta-tag verification, then provide the exact Google-generated file/tag for a dedicated USAJIO-only PR. Never share Google account credentials.
- After verification, submit `https://barsulkhan.github.io/USAJIO/sitemap.xml` and inspect the homepage, cash-flow guide and a calculator. Sitemap submission and a live test do not guarantee indexing.

### Task 4 — Social-preview metadata
- Standardized Open Graph `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url` and `twitter:card` on all nine finance guides.
- Added Playwright assertions for the guide review date, source section/link and social metadata.
- The browser QA on final PR #35 head commit `cad5cc11f793ffe3d07f3c731f241c9373d3e20f` passed as run #45023893130.
- An earlier QA attempt (#45023797601) failed because the first assertion incorrectly searched for CSS-selector-like text instead of the actual HTML attributes. The test was corrected in a follow-up commit and rerun successfully before merge. The initial failure is not being represented as a pass.

### Task 5 — Physical screen-reader review
- Added a detailed TalkBack checklist in `docs/ANDROID_TALKBACK_MANUAL_QA.md`, covering navigation landmarks, heading navigation, link names, menu state, form labels, units, errors, result announcements, table reading order, focus order and Net Worth totals.
- Automated axe WCAG 2.1 A/AA audit returned no findings on the PR #35 final head; the browser QA also passed keyboard focus/activation and result-announcement checks.
- **Actual TalkBack / assistive-technology review remains NOT TESTED.** Axe and keyboard automation cannot confirm real TalkBack speech, rotor/gesture navigation or Android accessibility behavior.

### Automated validation for PR #35 final head
- Browser QA run #45023893130: **completed / success**.
  - 12-calculator known-answer, zero-rate, boundary, invalid, deficit/negative, insufficient-payment and amortization tests passed.
  - Net Worth browser-local privacy regression passed.
  - 10 responsive widths across homepage and all 12 calculators passed; form labels and keyboard-only calculation/focus checks passed.
  - All 28 HTML pages served and passed unique title, description, canonical, H1, language, sitemap/robots, footer policy links and internal path/fragment checks.
  - axe WCAG 2.1 A/AA findings: `[]`.
  - New guide-source/social metadata assertions passed as part of the site-wide browser audit.
- Performance run #45023893131: **completed / success**, mobile and desktop.
  - Mobile Performance: **94–100**; Desktop Performance: **99–100**.
  - Accessibility, Best Practices and SEO: **100** on all audited homepage/calculator pages.
  - Maximum mobile LCP: approximately **2,468 ms**; maximum desktop LCP: approximately **720 ms**.
  - Maximum mobile CLS: approximately **0.0476**; maximum desktop CLS: approximately **0.0121**.
  - TBT: **0 ms** throughout.
  - These Lighthouse results cover homepage and 12 calculators, not all nine guide pages. They are CI lab measurements, not field Core Web Vitals.

### Next exact actions
1. Confirm GitHub Pages deployment run #45024192053 for main commit `5c352bcd4412d0a2e9f77a7777edef5db1994b49` completes successfully; verify the resulting deployment status before claiming release.
2. The user should complete the physical Android visual/touch checklist for the homepage and new cash-flow guide. Record model, Android/Chrome versions and observed results.
3. The user should complete the TalkBack manual checklist on a physical Android device; do not mark it pass from CI.
4. The user should create/verify the USAJIO URL-prefix property in Search Console and provide the exact Google-generated verification file or meta tag. Then implement it on a dedicated USAJIO branch/PR, deploy, submit the sitemap and inspect representative URLs.
5. Continue guide improvements only where research supports useful new substance; do not mass-produce thin SEO content.
6. Keep USAJIO and InfoJano separate; do not buy a domain, paid service or subscription.

### Copy-ready continuation prompt
USAJIO এখান থেকে চালিয়ে যাও। আগে `docs/USAJIO_MASTER_PROJECT_2026-11-11.md` সম্পূর্ণ পড়বে। PR #35–#38 merged; all nine finance guides now have official sources, review dates and social metadata; browser QA #45023893130 and Lighthouse #45023893131 passed. Android visual/touch and TalkBack physical testing are still NOT TESTED; use `docs/ANDROID_TALKBACK_MANUAL_QA.md`. Search Console is NOT VERIFIED because the connected OpenSEO workspace exposes only InfoJano; do not touch InfoJano. Follow `docs/SEARCH_CONSOLE_SETUP.md`; wait for the user's exact Google verification file/meta tag before adding it in a separate USAJIO PR. First verify deployment run #45024192053 for main commit `5c352bcd4412d0a2e9f77a7777edef5db1994b49`. Use separate branches and PRs; merge only after relevant tests pass. বাংলায় কথা বলবে, কোনো paid service/domain কিনবে না, এবং বাস্তব Android/TalkBack বা Search Console পরীক্ষা না করে pass/indexed বলবে না.

- Final deployment verification: run #45024192053 completed with **success** for main commit `5c352bcd4412d0a2e9f77a7777edef5db1994b49`; all deploy steps completed, including GitHub Pages deployment.


---

## 2026-11-22 project checkpoint — AdSense pre-domain preparation

- Scope remains USAJIO only. InfoJano is explicitly out of scope.
- Owner supplied AdSense Publisher ID: `pub-2956763554929412`. Do not store Customer ID, payment information, identity documents, passwords or one-time codes in the repository.
- Owner's explicit workflow: do not add USAJIO to AdSense or attempt site verification until a custom domain has been purchased and connected. No domain or paid service is to be purchased without explicit permission.
- `privacy.html` contains conditional third-party advertising disclosures; it must be made specific to the actual live ad/consent configuration before ads are enabled.
- `editorial.html` expanded with source hierarchy, jurisdiction scope, calculator methodology/testing, corrections, review-date and advertising-independence standards.
- `docs/ADSENSE_READINESS.md` records pre-domain work, deferred domain-dependent steps and the supplied Publisher ID.
- `docs/ADSENSE_INTEGRATION_BLUEPRINT.md` records safe future placements and domain connection/integration sequence.
- No AdSense script, ad unit, ads.txt, CMP or advertising request is active. Do not add these before custom domain connection and the relevant owner/account decisions.
- Remaining pre-domain priorities: full content-quality audit across 12 calculators and 9 guides; improve About/publisher transparency without inventing credentials; obtain owner-approved public contact channel; resolve Search Console sitemap fetch/read error; rerun full-site QA.
- Domain-after-purchase sequence: connect custom domain to USAJIO GitHub Pages, update canonicals/sitemap/robots, add site in AdSense, install exact account code, publish exact root ads.txt line, configure consent, request Google review, and only after Ready enable carefully placed ads.


---

## 2026-11-22 — Google indexing queue started (Batch 01)

- Created `docs/INDEXING_QUEUE.md` as the single durable tracker for individual Google Search Console URL Inspection requests.
- User's requested operating rule: provide at most 10 URLs in one daily batch; do not issue the next batch until the user reports the current batch's outcomes.
- Batch 01 contains the first 10 canonical URLs from the live sitemap: homepage, Compound Interest, Loan, Monthly Budget, Savings Goal, Emergency Fund, Debt Payoff, Mortgage, Auto Loan and Credit Card Payoff pages. All ten are **PENDING — user action**; the user has not yet reported submission or Google approval.
- Batch 02 (URLs 11–20) and Batch 03 (URLs 21–28) are queued in `docs/INDEXING_QUEUE.md`.
- Status rule: mark a URL COMPLETE only after the user reports Google's indexed/approved result. A submitted request is not proof of indexing.
- User should open the USAJIO Search Console property, paste each URL into the top “Inspect any URL” field, and select “Request indexing” if Google offers it. Direct public page links are listed in the queue file.
- Search Console's prior sitemap detail screenshot showed **“Couldn't fetch” / “Sitemap could not be read”** and zero discovered pages. This remains a separate unresolved technical follow-up; the individual indexing queue does not fix it.
- Continue source-based research/content-quality follow-ups for the calculator pages and finance guides. Every newly created and deployed public page must be added to the queue and sitemap.
- Scope: USAJIO only; do not modify InfoJano. The 10-per-day cap is the user's chosen workflow, not a statement of Google's guaranteed daily quota.


---

## 2026-11-22 — Batch 01 indexing requests submitted

- User reports live-testing all ten Batch 01 URLs and submitting a Google Search Console indexing request for each.
- Updated `docs/INDEXING_QUEUE.md`: all ten URLs now have status **SUBMITTED — awaiting Google**.
- No URL is marked indexed/complete yet. Wait for Google processing and user confirmation of indexing results.
- Keep Batch 02 queued until the user reports outcomes for Batch 01.


---

## 2026-11-22 — Master Roadmap & Task Schedule (active execution plan)

### Operating rule
This is the single ordered backlog for USAJIO. Work in sequence unless a critical defect interrupts it. Every feature follows **Research → Competitor Analysis → Improvement Plan → Development → Testing → Review/merge → Deployment verification**. Use a separate branch and PR for each meaningful task. Do not merge until required checks pass. Update this section after each completed milestone with evidence, commit/PR links, and any blockers. No paid domain, hosting, APIs, subscriptions, purchases, or monetization without explicit permission. USAJIO only; never modify InfoJano.

### Milestone 0 — Finish current maintenance release
- [x] PR #48 — fix homepage calculator-card HTML nesting and add a browser-QA assertion that the calculator grid contains 12 direct card children.
- [x] Browser QA passed for PR #48 head `b2bad12aa0aa17dd8efd10e18a8c6f332ef589cb` (workflow run #45029206148).
- [x] Mobile and desktop Lighthouse/performance checks passed for the same PR head (workflow run #45029206105).
- [x] PR #48 squash-merged; merge commit `d61f0498a1fbc965ec5278a1185fb92458ecf85f`.
- [ ] Verify GitHub Pages deployment for merge commit; deployment workflow run #45030278000 was queued at checkpoint time. Do not call this release deployed until success is confirmed.

### Milestone 1 — Loan Amortization Schedule (first new feature; highest priority)
**Goal:** Make the loan calculator's repayment schedule clear, useful and exportable, without duplicating or breaking the existing EMI calculation.
1. Research: inspect current USAJIO loan calculator implementation and formulas; identify supported loan types/inputs and current schedule behavior.
2. Competitor analysis: review reputable loan/mortgage calculators and compare schedule columns, extra-payment handling, frequency, rounding, accessibility and export behavior. Use findings to create an original, simpler UX.
3. Improvement plan: define exact inputs, assumptions, schedule columns (payment number/date if supported, payment, principal, interest, remaining balance), summary totals, extra-payment behavior, rounding policy, validation and responsive behavior.
4. Development: implement monthly principal/interest/balance schedule for supported loan inputs; make clear that it is an estimate and state assumptions. Add export only after the schedule itself is correct and usable.
5. Testing: known-answer amortization cases, zero interest, fractional cents/rounding, early payoff, extra payments, invalid/zero/negative inputs, large values, total principal/interest reconciliation, keyboard/screen-reader labels, mobile layout and browser regression.
6. Release: separate PR; require browser QA and relevant Lighthouse checks; merge only when green; verify deployment workflow on the resulting main SHA.
**Acceptance:** scheduled principal sums reconcile to the amount financed within documented rounding tolerance; final balance reaches zero (or a documented residual due only to rounding); interest totals match the payment schedule; extra payments shorten payoff without increasing total interest; no regression to existing loan calculator.

### Milestone 2 — Advanced Budget Planner
- Review the existing Monthly Budget Planner before designing additions; retain simple entry flow.
- Add optional 50/30/20 guidance and actual-vs-target breakdown only if research demonstrates user value.
- Define take-home income basis, category mapping, treatment of savings/debt payments, and clear warning that 50/30/20 is an optional guideline, not a universal rule.
- Test totals, surplus/deficit, empty categories, irregular income, negative/invalid entries, rounding, mobile usability and privacy (browser-local processing).
- Acceptance: totals reconcile exactly to entered income/expenses and the optional framework never silently changes user-entered categories.

### Milestone 3 — Compare Scenarios
- Allow side-by-side comparison of loan rate, term and payment assumptions (initial scope limited to supported loan calculations).
- Show assumptions and comparable outputs consistently; avoid implying lender offers or guaranteed savings.
- Test identical scenarios, lower/higher rates, shorter/longer terms, extra payments, invalid inputs and rounding.
- Acceptance: each scenario independently matches the underlying calculator; comparison does not mix currencies or assumptions.

### Milestone 4 — Inflation-adjusted Retirement Projection
- Research official, reputable educational sources and explain inflation, nominal vs real returns, contribution timing and uncertainty.
- Show assumptions transparently; avoid presenting a deterministic projection as a promise or individualized investment recommendation.
- Include conservative/base/optimistic scenarios only where methodology is defensible and clearly explained.
- Test inflation zero/boundaries, contribution timing, long horizons, negative real returns, large values and rounding.
- Acceptance: nominal and inflation-adjusted values are mathematically consistent and every assumption is visible.

### Milestone 5 — Downloadable Reports (PDF/CSV)
- Implement after the underlying calculators/schedules are stable.
- Decide per tool whether CSV, print-friendly output or PDF materially helps; do not add export controls that do not work.
- Keep generation client-side where practical; never transmit private financial inputs to a server.
- Test file contents, units/currency labels, totals, escaping, long schedules, empty data, filename safety and mobile download behavior.
- Acceptance: exported values match on-screen values and include calculation assumptions/disclaimers.

### Ongoing core-quality backlog (interleave after each feature milestone)
- [ ] Audit the 12 calculators and 9 finance guides for content clarity, formula/assumption disclosure, source quality, update dates and internal linking; fix only evidence-backed issues.
- [ ] Review About/publisher transparency and Contact page; do not invent credentials, postal address, phone number or support email. Use only an owner-approved public contact channel.
- [ ] Re-run full-site browser QA after material code changes: all calculator formulas/edge cases, Net Worth browser-local privacy, responsive widths, keyboard operation, labels, navigation, policy links, HTML metadata, sitemap/robots and internal links.
- [ ] Physical Android visual/touch review and actual TalkBack testing remain **NOT TESTED** until completed on a real device by the user; automated browser and axe results are not substitutes.
- [ ] Keep accessibility/performance regression checks in CI and record exact run IDs/results. Lighthouse lab scores are not field Core Web Vitals.

### Explicitly paused / not part of the active execution queue
- Google Search Console, sitemap/indexing submissions and related troubleshooting: paused by the user. Do not resume unless explicitly requested.
- AdSense, ads.txt, CMP, ad scripts and monetization: paused pending the user's explicit direction and custom-domain decision. Do not resume or purchase a domain/service.
- Any InfoJano work: out of scope.

### Execution sequence and status ledger
| Order | Work item | Status at 2026-11-22 |
|---|---|---|
| 0 | Homepage card nesting fix (PR #48) | Merged; deployment verification pending |
| 1 | Loan Amortization Schedule | Next active task |
| 2 | Advanced Budget Planner | Planned |
| 3 | Compare Scenarios | Planned |
| 4 | Inflation-adjusted Retirement Projection | Planned |
| 5 | Downloadable Reports (PDF/CSV) | Planned |
| Ongoing | Core-quality backlog and real-device manual QA | Partly pending; see checklist above |

### Current resume point
First verify deployment run #45030278000 for merge commit `d61f0498a1fbc965ec5278a1185fb92458ecf85f`. Then begin Milestone 1 research by inspecting the current loan calculator source and reviewing reputable competitor schedule patterns. Do not jump directly into coding before recording the research and improvement plan.


### Milestone 1 progress update — 2026-11-22
- Roadmap and ordered task schedule were merged in PR #49 as `74df7d946040d511f80ebd9b76566fb13fa8e329`.
- PR #48 homepage card nesting fix was merged as `d61f0498a1fbc965ec5278a1185fb92458ecf85f`; GitHub Pages deployment run #45030278000 completed successfully for that exact commit.
- Loan amortization research was documented and merged in PR #50 as `8ca9229df7b5702d12efbe6babef6a3c264268b6`; see `docs/LOAN_AMORTIZATION_RESEARCH.md`.
- Inspected current `loan-calculator.html` and `script.js`: current tool shows payment including extra, total interest and total repayment, but has no payment-by-payment schedule. It uses fixed-rate monthly calculations, recurring extra monthly payment and a 600-payment cap.
- Public patterns reviewed: TransUnion amortization and loan-payment calculators, DexoCalc and PayoffSchedule. Primary grounding reviewed from CFPB mortgage and auto-loan amortization explainers and its negative-amortization guidance.
- Proposed first release: monthly schedule with opening balance, scheduled payment, extra principal, interest, principal reduction, ending balance and cumulative interest; consistent summary; final payment capped; local-only computation. Variable rates, irregular frequencies, one-time extras, dates and PDF/Excel exports remain out of scope initially.
- Proposed calculation policy: a cent-rounded monthly ledger with summary totals derived from the same rows. This still needs to be implemented and validated against independent examples; no production feature code has been changed yet.
- Next exact action: implement the schedule on a dedicated feature branch, add known-answer/zero-rate/extra-payment/final-payment/rounding/input/privacy/accessibility tests, then run browser QA and relevant Lighthouse checks. Merge only after required checks pass.


### Loan Amortization implementation QA correction — 2026-11-22
- PR #52 introduced the monthly table and cent-rounded ledger, but its first Browser QA run failed (run #45031330430); Mobile and Desktop Lighthouse passed. PR remains unmerged.
- Review of the example $10,000 at 7% for 5 years found that rounding the scheduled payment down to $198.01 left a small residual and generated a 61st payment. Corrected policy on the PR branch: round the scheduled payment upward to the next cent ($198.02) so the planned 60-month term is respected; the final installment is still capped to the actual payoff amount.
- Independent decimal arithmetic for that example: 60 payments, total interest $1,880.67, total paid $11,880.67. Browser regression expectations updated accordingly.
- Re-run CI and inspect any remaining failures before merge. No feature release until Browser QA, Mobile Lighthouse and Desktop Lighthouse all pass.

---

## 2026-11-22 — PR #52 merged: Loan Amortization Schedule

### Verified implementation and release checks
- PR #52, Add monthly loan amortization schedule, was squash-merged to main.
- PR: https://github.com/barsulkhan/USAJIO/pull/52
- Feature branch: feature/loan-amortization-schedule-2026-11-22
- Merged commit: 623611353a62df1f48f105c6b8a93204dbb02635
- Feature head before merge: d034b20647dae0a19b2a9f8a7531570d9796c565
- The fix preserves the wide, readable eight-column amortization table inside its responsive horizontal scroll region and constrains calculator/grid children with min-width: 0; it does not hide columns or weaken test assertions.
- Browser QA run #45046620695: completed / success. Logs confirm all 12 calculator known-answer/edge-case/amortization checks, 10 responsive widths, keyboard/focus checks, privacy checks and accessibility checks passed. The responsive suite covers the loan page at 320px.
- Performance audit run #45046620712: completed / success. Both mobile Lighthouse (job #137282527604) and desktop Lighthouse (job #137282527855) passed, including report generation/upload.
- Prior failing Browser QA run #45031992981 remains historical evidence only; it was superseded by the passing run on the corrected head.
- The example $10,000 / 7% / 5-year loan uses a $198.02 scheduled monthly payment rounded upward to cents, pays off in 60 payments, yields $1,880.67 total interest and ends at $0.00. The final payment is capped to the remaining amount due.
- GitHub read-back from main confirms loan-calculator.html now contains the monthly amortization schedule and accessible table structure.

### Deployment verification status
- The squash merge is confirmed, but the GitHub Actions connector available in this session only returns PR-triggered workflow runs for a commit; it returned no deployment run for merge commit 623611353a62df1f48f105c6b8a93204dbb02635.
- A direct live-page fetch of https://barsulkhan.github.io/USAJIO/loan-calculator.html was not accessible through the available browser fetch tool. Therefore GitHub Pages deployment for this merge is NOT YET VERIFIED. Do not claim it is deployed until the Pages workflow run or live page is confirmed.
- Next release check: inspect the repository Actions page for the deployment workflow triggered by the merge commit, confirm success, then open the live Loan Calculator page and verify the schedule is present. No Search Console or AdSense work is authorized.

### Roadmap status and next work
- Milestone 1 — Loan Amortization Schedule: implementation merged; CI passed; production deployment verification pending.
- Milestone 2 — Advanced Budget Planner: next feature. Begin with current Monthly Budget Planner source inspection, research, competitor analysis and a written improvement plan before implementation. Consider optional 50/30/20 guidance and actual-vs-target breakdown only where research supports them. Preserve existing simple entry flow and browser-local privacy.
- Every next change must use a dedicated branch and PR; run relevant tests and Lighthouse before merge; verify deployment after merge.
- Search Console/indexing and AdSense remain paused. Android/TalkBack physical-device checks remain NOT TESTED. No paid domain/service/subscription. USAJIO only; never modify InfoJano.
### Deployment verification addendum — 2026-11-22
- Follow-up after the PR #53 documentation update: GitHub Pages deployment for PR #52 merge commit 623611353a62df1f48f105c6b8a93204dbb02635 is now confirmed.
- Deployment workflow run #45046936416 (Deploy USAJIO to GitHub Pages) completed with conclusion SUCCESS.
- Deployment job #137283503415 completed successfully; Checkout, Configure Pages, Upload site artifact, artifact-registration wait and Deploy to GitHub Pages all completed successfully.
- Documentation PR #53 was squash-merged as commit 9d0b2b64a487850f49e1f2ef28e45e46ef468109.
- PR #52 release status is now: implementation merged, Browser QA passed, mobile and desktop Lighthouse passed, GitHub Pages deployment passed.
- Next active item remains Advanced Budget Planner (PR #54 currently under validation).
---

## 2026-11-22 — Advanced Budget Planner completed and deployed

### Loan Amortization release record
- PR #52 squash-merged as 623611353a62df1f48f105c6b8a93204dbb02635.
- Browser QA run #45046620695 passed; mobile and desktop Lighthouse run #45046620712 passed.
- GitHub Pages deployment run #45046936416 passed for the PR #52 merge commit.
- Documentation PR #53 merged as 9d0b2b64a487850f49e1f2ef28e45e46ef468109; PR #55 merged as 757ee5cf48a6225399d49d197ee59219e392d3a3 and recorded the deployment evidence.

### Advanced Budget Planner release record
- Research, competitor analysis and improvement plan: docs/ADVANCED_BUDGET_PLANNER_RESEARCH.md.
- PR #54, feat: add advanced budget allocation planner, squash-merged as 41e13db4259b82e78932a85c30514c50b57eaab3.
- Browser QA run #45047728008 passed on head d0dfa2d2a5d2a16ca655e5fec43cc7791607e2cc. This includes budget arithmetic, default/custom targets, unassigned-category handling, zero income, invalid percentages, 10 responsive widths, and an explicit expanded-panel 320px overflow check; all 12 calculator known-answer/edge-case tests and axe WCAG 2.1 A/AA checks passed.
- Lighthouse run #45047662620 passed on commit dcdc3c4305b745ef75286ff30cdafc3c7c85faac. The only subsequent commit before the passing Browser QA head added a Browser QA-only 320px expanded-panel assertion; no application HTML/CSS/JS changed between those commits.
- Mobile Lighthouse: Performance 99–100, Accessibility 100, Best Practices 100, SEO 100; maximum reported LCP about 1,444 ms, maximum CLS about 0.0414, TBT 0 ms.
- Desktop Lighthouse: Performance 99–100, Accessibility 100, Best Practices 100, SEO 100; maximum reported LCP about 729 ms, maximum CLS about 0.0121, TBT 0 ms.
- GitHub Pages deployment run #45047971297 passed for merge commit 41e13db4259b82e78932a85c30514c50b57eaab3. Configure Pages, upload artifact, artifact-registration wait and Deploy to GitHub Pages all completed successfully.

### Current roadmap and controls
- Milestone 1 — Loan Amortization Schedule: complete, merged, CI passed and GitHub Pages deployment verified.
- Milestone 2 — Advanced Budget Planner: complete, merged, CI passed and GitHub Pages deployment verified.
- Next active roadmap item: Milestone 3 — Compare Scenarios. Begin with research, competitor analysis and an improvement plan before coding. Initial scope should compare supported loan assumptions side by side, preserve transparent assumptions, avoid mixing currencies and keep all financial inputs browser-local.
- Search Console/indexing and AdSense/monetization remain paused. Do not resume unless explicitly requested.
- Physical Android visual/touch and TalkBack tests remain NOT TESTED until performed on a real device. Automated Browser QA and axe checks are not substitutes.
- USAJIO only. Do not modify InfoJano. No paid domain, service or subscription.