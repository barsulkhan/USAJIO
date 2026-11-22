# USAJIO — AdSense Readiness Work Plan

**Last reviewed:** 2026-11-22  
**Project:** USAJIO only  
**Live site:** https://barsulkhan.github.io/USAJIO/  
**Policy basis:** Current Google AdSense / Publisher Help Center guidance linked below.

## Objective

Prepare USAJIO so that connecting an AdSense account and requesting a site review can be a short implementation step later, rather than starting site-quality and policy work at that time.

This checklist does not guarantee approval. Google reviews the site and makes the final decision.

## Current audit snapshot

### Already present in the repository

- A live, public HTTPS website with a clear personal-finance purpose.
- Homepage and 12 calculator pages.
- Nine educational finance guides.
- About, Contact, Privacy, Terms, Disclaimer and Editorial pages.
- Shared navigation and footer links; page titles, descriptions and canonical URLs are part of the existing SEO baseline.
- Responsive and accessibility QA has previously passed for the homepage and calculator pages; this is useful UX evidence, not an AdSense approval.
- Calculator inputs are processed in the browser according to the current Privacy Policy.

### Changes made in this preparation pass

- Updated `privacy.html` with a clearly conditional explanation of the cookies, web beacons, IP addresses / identifiers and third-party advertising data practices that may apply if Google AdSense is enabled.
- Added Google's partner-sites data-use disclosure link.
- Kept the policy truthful: USAJIO does not currently intentionally run advertising or first-party analytics. The policy says the live details must be updated before ads are switched on.
- No AdSense script, placeholder publisher ID, ads.txt, third-party CMP, or ad slot has been activated. Those require account-specific values or a decision about actual ad markets and consent configuration.

## Readiness checklist

| Area | Current assessment | Next action |
|---|---|---|
| Original, useful content | 12 tools and 9 guides exist; Google evaluates usefulness and originality across the whole site | Review every guide and calculator page for substantive explanations, examples, assumptions, sources, and thin/duplicated sections |
| Site completeness | Public pages and navigation exist | Recheck every nav/footer link and ensure no placeholder, empty, broken, or under-construction pages |
| About / ownership transparency | About page exists | Consider adding a real publisher/editor identity and editorial responsibility details only using information the owner approves for publication |
| Contact | Contact page exists but currently says no dedicated public email/form is published | Before applying, owner should choose a monitored public contact method; do not invent an email |
| Privacy | Updated conditionally in this pass | Once AdSense account and ad settings are known, update with the actual data practices, providers, consent controls and choices; verify policy matches what is actually enabled |
| Terms / disclaimer | Both exist | Keep financial calculator limitations and educational-only status clear; review after any new features |
| Navigation / UX | Existing responsive and accessibility QA passed for prior tested scope | Run full-site mobile, keyboard, link, and content QA before review |
| Crawlability | robots.txt allows crawling; sitemap is present but Search Console currently reports Couldn't fetch / Sitemap could not be read | Diagnose live sitemap fetch independently; do not mistake submission acceptance for successful processing |
| Site ownership / AdSense connection | No AdSense account/site connection evidenced yet | When owner has an AdSense account, use the exact verification method and code shown in that account |
| Ad code | Not installed | Install only the exact AdSense code supplied for the approved account, after the account/site workflow calls for it |
| ads.txt | Not created | Add only the exact Google-provided line containing the real publisher ID; never publish a guessed or placeholder ID |
| Consent | No CMP configured | If serving personalised ads in the EEA, UK or Switzerland, use a Google-certified CMP integrated with IAB TCF; select based on actual audience and ad settings |
| Ad placement | No ad units active | After approval, place ads conservatively away from calculator controls, navigation, buttons, form fields and interactive results to avoid accidental clicks |

## Account-dependent items (cannot be completed without owner action)

1. AdSense account access and the site's addition to the AdSense Sites list.
2. Exact publisher ID / verification snippet supplied by Google.
3. The ad personalisation and ad technology provider settings selected in the AdSense account.
4. Payment profile, identity, address and any required verification handled privately by the owner in Google.
5. Site review request and review outcome.

Never share Google passwords, one-time codes, payment details, identity documents or private account credentials in chat.

## Implementation gates

- **Before account exists:** improve site content, transparency, navigation, technical crawlability and QA; keep ads disabled.
- **After account exists:** install the exact account-provided verification/ad code, add the exact publisher line to root `ads.txt`, and configure consent appropriately.
- **After Google marks the site Ready / approved:** enable selected ad formats and test that placements do not interfere with the tools or encourage accidental clicks.
- **After activation:** update the Privacy Policy to reflect the actual live providers and controls; periodically review AdSense Policy Center and ads.txt status.

## Google documentation

- [AdSense eligibility requirements](https://support.google.com/adsense/answer/9724)
- [Make sure your site's pages are ready for AdSense](https://support.google.com/adsense/answer/7299563)
- [Connect your site to AdSense and site review](https://support.google.com/adsense/answer/7584263)
- [What to do when your site is not ready to show ads](https://support.google.com/adsense/answer/12176698)
- [Publisher privacy disclosures](https://support.google.com/publisherpolicies/answer/10437794)
- [Google consent requirements for EEA, UK and Switzerland](https://support.google.com/adsense/answer/13554116)
- [Create an ads.txt file](https://support.google.com/adsense/answer/12171612)
- [Google's partner-sites data-use disclosure](https://policies.google.com/technologies/partner-sites)

## Working rule

Continue the Google indexing queue separately. New public pages should be added both to the sitemap and the indexing queue when deployed. This AdSense work plan remains in USAJIO only; never modify InfoJano and never purchase a domain, service, or subscription without explicit permission.
