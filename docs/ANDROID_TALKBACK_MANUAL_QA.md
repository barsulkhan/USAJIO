# USAJIO — Physical Android and Screen Reader QA Checklist

**Prepared:** 2026-11-22  
**Scope:** Manual checks that cannot be honestly completed by GitHub Actions/headless Chromium.

> Status at preparation: **NOT TESTED**. This document is a checklist, not evidence that a physical-device test has passed. Record the device, Android version, browser, date and observed result before changing a status to PASS.

## 1. Test setup and record

- Device model: ____________________
- Android version: ____________________
- Browser and version: ____________________
- Display size / display scaling: ____________________
- Test date and tester: ____________________
- TalkBack version (if used): ____________________
- Network: Wi-Fi / mobile data
- Orientation tested: portrait / landscape

Use the live site: https://barsulkhan.github.io/USAJIO/

## 2. Visual and touch review — homepage

Open the homepage in Android Chrome at normal display and text scaling.

- [ ] Page loads over HTTPS without a browser error.
- [ ] USAJIO logo, heading, hero text and primary navigation are visible and not clipped.
- [ ] Calculator cards form a readable single-column/two-column layout appropriate to the available width.
- [ ] No horizontal scrolling is needed to read the page.
- [ ] Text remains readable at the device's default text size and at 200% browser/text zoom where supported.
- [ ] Buttons and links have comfortable touch targets; menu button is at least 44 × 44 CSS px.
- [ ] Open the mobile menu; verify it opens, exposes all expected links and updates its expanded state.
- [ ] Follow Calculators, Money Guides and About links; each lands at the intended section.
- [ ] Footer policy links are visible, distinct and tappable.
- [ ] Rotate to landscape and back; layout recovers without overlap or clipped controls.

Observed issues / screenshots (if any): ______________________________________

## 3. Visual and touch review — cash-flow guide

Open https://barsulkhan.github.io/USAJIO/cash-flow-budget-guide.html

- [ ] Header/menu matches the homepage and remains usable.
- [ ] Title, review date, paragraphs and numbered headings have sensible spacing.
- [ ] The worked-example table fits the viewport; if it scrolls, the scrolling area is discoverable and does not force the whole page sideways.
- [ ] External official-source links are visually distinguishable and open the expected CFPB / consumer.gov destinations.
- [ ] Monthly Budget Planner and Emergency Fund / Debt Payoff internal links open the correct USAJIO pages.
- [ ] Disclaimer and footer links are readable and tappable.
- [ ] No missing logo, stylesheet, font or broken-image placeholder appears.
- [ ] Test 200% text zoom and landscape orientation.

Observed issues / screenshots (if any): ______________________________________

## 4. Calculator touch smoke test

Repeat on all 12 calculator pages, at minimum check:
- [ ] Inputs can be focused and edited without the on-screen keyboard hiding the active field or Calculate button.
- [ ] Labels remain associated with their fields.
- [ ] Calculate action is easy to tap and gives a visible result.
- [ ] Invalid/empty input produces a clear, understandable message and does not show a misleading result.
- [ ] Long result tables/cards fit the screen or have an obvious scroll area.
- [ ] Currency selector is reachable and its formatting-only behavior is not confused with FX conversion.
- [ ] Browser Back returns to the expected previous page.

Pages: compound-interest.html; loan-calculator.html; monthly-budget.html; savings-goal.html; emergency-fund.html; debt-payoff.html; mortgage-calculator.html; auto-loan-calculator.html; credit-card-payoff.html; retirement-calculator.html; student-loan-payoff.html; net-worth-calculator.html.

## 5. TalkBack screen-reader review

Enable TalkBack in Android Settings → Accessibility → TalkBack. Use headphones if useful and test without relying on sight.

- [ ] Homepage: the page title/heading and navigation landmarks are announced meaningfully.
- [ ] Logo link has a useful accessible name; decorative icons are not announced as confusing noise.
- [ ] Menu button announces its purpose and expanded/collapsed state; state changes after activation.
- [ ] Every navigation and footer link has a meaningful name and can be activated.
- [ ] Guide headings are navigable by heading; paragraphs, lists and table headers are read in a sensible order.
- [ ] On each tested calculator, each input is announced with its label, role and current value.
- [ ] Units, currency and required/optional status are understandable without visual context.
- [ ] Calculate buttons have clear names and can be activated using TalkBack.
- [ ] Result changes are announced or are immediately discoverable after calculation; users are not left unaware that output changed.
- [ ] Validation errors are announced and associated with the relevant field where possible.
- [ ] Net Worth totals (assets, liabilities and net worth) are announced with clear labels and currency.
- [ ] Focus order follows the visual reading order; focus does not become trapped or disappear.
- [ ] No essential instruction is communicated only by color, icon, position or placeholder text.

Record TalkBack speech/focus problems and the exact page/field:
____________________________________________________________________________

## 6. Results log

| Area | Status | Notes / evidence |
|---|---|---|
| Android homepage visual/touch | NOT TESTED | |
| Cash-flow guide visual/touch | NOT TESTED | |
| Calculator touch smoke test | NOT TESTED | |
| TalkBack homepage/navigation | NOT TESTED | |
| TalkBack guide reading/table | NOT TESTED | |
| TalkBack calculator inputs/results/errors | NOT TESTED | |
| Net Worth result announcements | NOT TESTED | |

## 7. Exit criteria

Mark a section PASS only after completing it on a physical Android device and recording the device/browser/version. File GitHub issues or a separate fix PR for reproducible problems. Re-run the affected automated browser/axe checks after fixes. A clean axe report or keyboard test does **not** by itself prove TalkBack compatibility.

Do not enter real personal financial information during testing. Use made-up test values only.
