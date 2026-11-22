# USAJIO — AdSense Readiness Work Plan

**Last reviewed:** 2026-11-22  
**Project:** USAJIO only  
**Current hosting URL:** https://barsulkhan.github.io/USAJIO/  
**AdSense Publisher ID supplied by owner:** pub-2956763554929412  
**Current phase:** Pre-domain preparation. Do not add USAJIO as an AdSense site or activate ad serving until the owner purchases and connects the intended custom domain.

## Objective

Complete all work that can safely be done inside the USAJIO website before a custom domain is purchased. Once the domain exists, only domain-specific configuration, account connection, Google verification/review and final consent/ad activation should remain.

Google makes the final eligibility and site-review decision; this plan is preparation, not a promise of approval.

## Already present

- Public HTTPS site with a defined personal-finance purpose.
- Homepage, 12 calculators and nine educational finance guides.
- About, Contact, Privacy, Terms, Disclaimer and Editorial pages.
- Shared navigation/footer and existing SEO metadata.
- Browser-local calculator processing described in the privacy policy.
- Prior responsive, keyboard and accessibility QA for the homepage and calculator pages. This is UX evidence, not AdSense approval.

## Work completed in the pre-domain preparation

- Privacy Policy explains the potential third-party advertising data practices conditionally, without claiming ads are currently running.
- Editorial Policy expanded to cover primary-source research, jurisdiction scope, calculator assumptions/testing, corrections, review dates and advertising/editorial independence.
- Publisher ID recorded above for later implementation. It is public account metadata, not a password or secret.
- No live ad script, ad unit, ads.txt, placeholder code or CMP has been installed.
- No AdSense site submission attempted. No domain purchased.

## Pre-domain work checklist

| Area | Current status | Work to complete before domain purchase |
|---|---|---|
| Original useful content | 12 tools + 9 guides exist | Page-by-page quality pass: add meaningful original explanations, examples, assumptions, limitations and useful official references where missing |
| Calculator trust | Existing regression QA passed | Ensure every calculator page visibly explains inputs, formula/method, assumptions, exclusions and estimate limitations |
| Editorial standards | Expanded 2026-11-22 | Keep page review dates and primary-source links current when content changes |
| About / publisher transparency | About page exists | Improve explanation of who the site serves, what it covers, how content is produced and what it does not do; do not invent personal credentials or identities |
| Contact | No verified public contact channel is published | Keep this as an owner-dependent item; do not invent an email or publish a private address without approval |
| Privacy | Conditional ad disclosures added | Keep accurate before ads; finalise the actual provider, cookie, personalisation and consent details only after the real ad configuration is selected |
| Terms / disclaimer | Both exist | Maintain clear educational-only status and calculator limitations |
| Navigation / UX | Prior QA passed for homepage/calculators | Run full-site mobile, keyboard, link, content and accessibility QA after remaining content work |
| Crawlability | Search Console showed sitemap "Couldn't fetch" / "Sitemap could not be read" despite submission confirmation | Diagnose and fix sitemap fetch separately; verify robots.txt, canonical URLs and internal links |
| Site-specific domain | Not yet purchased | After purchase: connect domain to GitHub Pages, enable HTTPS, set one canonical host and update canonical URLs, sitemap and robots.txt consistently |
| AdSense site registration | Deliberately deferred | Only after custom domain is connected: add the custom domain in AdSense and follow the exact verification method shown in that account |
| Ad code | Deliberately not installed | After domain connection and when AdSense requests it, add the exact code supplied for Publisher ID above |
| ads.txt | Deliberately not installed | After domain connection, publish the exact Google-provided seller line at the custom domain root; confirm it is publicly reachable |
| Consent | No CMP configured | Before serving personalised ads to affected regions, select a Google-certified CMP compatible with applicable requirements and actual targeting settings |
| Ad placement | No ad units active | Prepare conservative responsive placements away from calculator inputs, buttons, navigation, menus, results and other interactive controls |

## Domain-after-purchase checklist

1. Connect the purchased custom domain to USAJIO's GitHub Pages project; do not alter InfoJano.
2. Confirm HTTPS and canonical redirect/host behavior.
3. Update every canonical URL, sitemap URL and robots.txt sitemap reference to the custom domain.
4. Verify the custom-domain homepage, policy pages, calculator pages, sitemap and robots file are publicly accessible.
5. Add the custom domain to the owner's AdSense Sites list.
6. Install only the exact AdSense verification/ad code supplied by Google.
7. Create root ads.txt with the exact seller line shown by the owner's AdSense account and verify its public URL.
8. Configure a suitable consent solution for the actual audience and ad settings before ads are served where required.
9. Request Google review only when the account dashboard says the required setup is complete.
10. After approval, enable selected ad formats and test placements on desktop/mobile so ads do not obstruct tools or cause accidental clicks.
11. Update Privacy Policy to match the actual live ad providers, cookies, data practices and consent controls.

## Account-specific information

- Publisher ID: pub-2956763554929412
- Customer ID and payment/identity details are not needed in the website repository.
- Never place Google passwords, one-time codes, payment details, identity documents or private account credentials in source code or chat.
- Never guess or fabricate ad code, seller IDs, consent settings or domain verification tokens.

## Official Google guidance

- [AdSense eligibility requirements](https://support.google.com/adsense/answer/9724)
- [Make sure your site's pages are ready for AdSense](https://support.google.com/adsense/answer/7299563)
- [Connect your site to AdSense and site review](https://support.google.com/adsense/answer/7584263)
- [What to do when your site is not ready for ads](https://support.google.com/adsense/answer/12176698)
- [Publisher privacy disclosures](https://support.google.com/publisherpolicies/answer/10437794)
- [Google consent requirements for EEA, UK and Switzerland](https://support.google.com/adsense/answer/13554116)
- [Create an ads.txt file](https://support.google.com/adsense/answer/12171612)
- [Google's partner-sites data-use disclosure](https://policies.google.com/technologies/partner-sites)

## Project rules

- Continue the Google indexing queue independently; each newly deployed public page must be added to sitemap and indexing queue.
- USAJIO only. Never modify InfoJano.
- Do not purchase a domain, service or subscription without the owner's explicit instruction.
- Do not add the site to AdSense before the custom domain is purchased and connected.
