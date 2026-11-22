# USAJIO — AdSense Integration Blueprint (Pre-Domain)

**Status:** Design/preparation only. No advertising code is active.
**Publisher ID provided by owner:** pub-2956763554929412

## Placement principles

USAJIO's core product is interactive finance calculators. Ads must never be visually confused with a calculator control or result, and must not cause accidental taps.

When a custom domain is connected and Google approves the site, use responsive placements with these priorities:

1. **Guide pages:** one responsive in-content placement after a complete explanatory section, never between a heading and its first paragraph, inside a source list, or directly beside a link.
2. **Guide pages:** an optional second placement only on sufficiently long pages, separated from the first by substantial original content.
3. **Calculator pages:** if ads are used, prefer a clearly separated placement after the calculator/result section or at the end of the explanatory content. Do not place ads beside amount fields, selectors, submit/reset controls, result values, amortization tables or navigation.
4. **Homepage:** avoid placing ads in the hero, primary navigation, calculator cards or primary calls to action. If used later, place below a substantial content section.
5. **Mobile:** preserve clear spacing and ensure sticky/fixed ad formats do not cover controls, results, footer links or consent controls.

Do not use labels such as "click here", style ads as site navigation, encourage clicks, or make ads look like calculator outputs. The final placement must follow the then-current Google Publisher Policies.

## Technical integration after custom domain purchase

- Add the custom domain to GitHub Pages and confirm HTTPS first.
- Update canonical URLs, sitemap.xml and robots.txt to the final canonical domain.
- Add the custom domain in AdSense only after the domain is connected and publicly reachable.
- Use the exact code snippet from the AdSense account. Publisher ID recorded above is for checking the supplied account value; do not hand-construct verification code.
- Publish the exact seller line supplied by AdSense in the custom domain root /ads.txt. Do not publish /USAJIO/ads.txt as a substitute for a root ads.txt file.
- Confirm the exact URLs for the script and ads.txt are publicly accessible before requesting review.
- Configure consent for the actual countries, ad personalisation choices and technology providers. Do not select a CMP or paid service without the owner's approval.
- Keep ad serving disabled until Google marks the site Ready and the consent/privacy setup is complete.

## Pre-domain work that remains

- Finish the full-site content-quality audit across all 12 calculators and 9 guides.
- Confirm every calculator page explains inputs, method, assumptions, exclusions and estimate limitations.
- Improve publisher/about transparency without inventing personal credentials.
- Resolve the missing verified public contact channel with an owner-approved contact method.
- Resolve Search Console's sitemap fetch/read error independently.
- Run full-site mobile, keyboard, accessibility, link and page-content QA after changes.

## Owner-only decisions

- Choose a public contact channel and approve what may be published.
- Purchase and connect a custom domain when ready.
- Choose a consent approach based on actual audience and advertising settings.
- Complete private AdSense payment, identity and address tasks directly in Google.

## References

- https://support.google.com/adsense/answer/7299563
- https://support.google.com/adsense/answer/7584263
- https://support.google.com/adsense/answer/12171612
- https://support.google.com/adsense/answer/13554116
- https://support.google.com/publisherpolicies/answer/10437794
