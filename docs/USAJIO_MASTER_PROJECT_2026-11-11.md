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
