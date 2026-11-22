# Downloadable Reports (PDF/CSV) — Research, Competitor Analysis & Improvement Plan

**Project:** USAJIO  
**Research date:** 2026-11-22  
**Status:** Research complete; first implementation slice (loan amortization CSV and print report) is merged, tested and deployed.

## 1. Existing USAJIO baseline
- Loan Calculator has a complete monthly amortization schedule (up to 600 payments), extra principal, cent-rounded interest and final-payment cap.
- Compare Scenarios shows three scenarios using a shared principal/currency, summary metrics and differences versus Scenario A.
- Advanced Budget Planner shows manual expense groupings, 50/30/20 target comparisons and savings/debt contributions.
- Retirement Savings Calculator shows nominal future values and inflation-adjusted today's-dollar values across conservative/base/optimistic return assumptions.
- All calculations are browser-local. There is no server-side report generation or financial-data upload.
- Do not add export buttons to every calculator by default. Export only where a durable file materially helps users retain, share with their own adviser, print or analyze the calculation.

## 2. Primary research and security requirements

### RFC 4180 — CSV structure
- CSV records are line-separated and fields containing commas, quotes or line breaks must be quoted; embedded double quotes are doubled.
- Use a consistent comma delimiter and CRLF record separators for spreadsheet interoperability.
- Source: https://www.rfc-editor.org/rfc/rfc4180

### OWASP — CSV / Formula Injection
- Spreadsheet programs can interpret cells beginning with =, +, -, @, tab, carriage return or line feed as formulas. Quoting fields alone is not a universal mitigation; spreadsheet save/re-open behavior can remove some escaping.
- OWASP also warns that separators and quotes can break out of a cell if field encoding is incorrect.
- USAJIO first-release reports can keep all values numeric and all labels static; do not insert arbitrary user text into CSV cells or filenames. If future free-text fields are exported, use a separately reviewed spreadsheet-safe text policy and test it in target spreadsheet applications.
- Sources: https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/21-CSV_Injection and https://owasp.org/www-community/attacks/CSV_Injection

### OWASP ASVS 5.0 — export encoding
- ASVS requirement 1.2.10 calls for RFC 4180 escaping and neutralization of formula-leading characters in CSV/spreadsheet exports.
- Source: https://github.com/OWASP/ASVS/blob/master/5.0/en/0x10-V1-Encoding-and-Sanitization.md

## 3. Competitor analysis

| Product/source | Observed export approach | Useful pattern | USAJIO response |
|---|---|---|---|
| TVMStack Pro | Free on-screen schedules, browser print and Copy CSV for loan amortization; full branded PDF and broader exports are paid | Core data export can be free; PDF print can avoid paid report infrastructure | Keep exports free; do not introduce subscriptions or paid report services |
| Arte Soft loan schedule generator | Client-side full amortization schedule CSV with extra payments and zero-balance checks | Export every payment row, not just the visible preview | Include the full 600-payment schedule, including extra principal and ending balance |
| AmortizeKit | Full amortization schedule export as PDF and CSV; claims local/offline calculation | Users value both spreadsheet data and printable report | Provide CSV plus print-friendly report; native browser print can save as PDF |
| Run Local Tools / Open Tools Library | CSV/JSON schedule exports, browser-local processing and print/PDF workflows | Clear privacy positioning and format choice | Keep report generation in the browser; avoid JSON unless a structured backup/import workflow is justified |
| ArtByLogic amortization tool | CSV for comparison/schedule and print-friendly PDF; separates row labels and scenario columns | Comparison exports should preserve scenario names, assumptions and deltas | Include shared principal, currency and scenario assumptions with comparison metrics |

Sources:
- https://tvmstack.com/pricing/
- https://sheets.arte-soft.com/tools/loan-amortization-schedule-generator/
- https://chromewebstore.google.com/detail/loan-calculator-amortizat/onpilnphbmodhbcaibhjaegjicojcopb
- https://runlocaltools.online/amortization-export/
- https://www.artbylogic.com/finance/amort/amortization-calculator.htm

## 4. Tool-by-tool export decisions

| USAJIO tool | Recommended first-release export | Why it helps |
|---|---|---|
| Loan Payment Calculator | Full amortization schedule CSV + print-friendly report | Long monthly schedule is useful in spreadsheets and as a durable payment record |
| Compare Scenarios | Scenario comparison CSV + print-friendly report | Side-by-side assumptions, totals and deltas are useful to review outside the browser |
| Advanced Budget Planner | Allocation summary CSV + print-friendly report | Users may retain or discuss their needs/wants/savings targets and remaining-cash plan |
| Retirement Savings Calculator | Conservative/base/optimistic projection CSV + print-friendly report | Nominal and today's-dollar balances, assumptions and disclosures should travel together |
| Other simple calculators | No export initially unless research shows a durable output is materially useful | Avoid clutter and inert export controls |

### CSV contents
- Loan schedule: report title, generated-on date, loan principal, currency, annual rate, term, scheduled payment, extra monthly principal, total interest, total repayment, payoff count, rounding/payment assumptions, disclaimer, then all payment rows (number, opening balance, scheduled payment, extra principal, interest, principal paid, ending balance, cumulative interest).
- Compare scenarios: shared principal/currency, each scenario's rate/term/extra payment, scheduled payment, monthly outflow, total interest, total repayment, payoff count, extra principal, deltas versus Scenario A and fee/APR exclusions.
- Budget planner: take-home income, each entered expense, savings/debt contribution, assigned bucket, target percentages, actual bucket totals, target amounts, variances and remaining cash; include note that amounts are manual inputs.
- Retirement projection: current savings, monthly contribution, employer match, horizon, inflation, low/base/high return assumptions, nominal future balance, today's-dollar value, total contributions, estimated growth and model limitations.
- Export numeric values as numeric decimal fields without currency symbols; include currency once in report metadata and column headings/metadata so spreadsheet users do not mix currencies.
- Include all assumptions and disclaimers in the report itself; a downloaded table without assumptions is incomplete.

### Print/PDF strategy
- Use a dedicated print stylesheet and the browser's native Print → Save as PDF workflow; do not add a paid PDF service or a heavy PDF library in the first release.
- Print layout should hide site navigation, calculator inputs and action buttons; show report title, assumptions, key results, disclaimer and all relevant table rows.
- Keep table headers repeatable across printed pages where supported; avoid clipping wide tables and include currency/units in headings.
- Label the action 'Print / Save as PDF' rather than claiming an automatic PDF download.

## 5. Client-side implementation and security plan
- Build CSV content from validated numeric result objects, not by scraping formatted DOM text.
- Use RFC 4180 quoting: quote every field consistently and double embedded quotes; join rows with CRLF.
- Use UTF-8 (consider a BOM only for spreadsheet compatibility after testing), a Blob with text/csv;charset=utf-8, a temporary object URL and a deterministic safe filename.
- Revoke object URLs after the download action; avoid server upload, analytics payloads, localStorage or cloud storage.
- Keep headers and report labels static and allowlisted. Current report schemas contain no free-text user fields; if that changes, add formula-injection tests for =, +, -, @, tab, CR/LF, full-width variants, commas and quotes before shipping.
- Do not trust CSV quoting alone to neutralize formulas. Numeric-only validated cells should remain numeric; static text cells should not include user-supplied formula-like values.
- Avoid embedding financial inputs in filenames, URLs or telemetry.

## 6. Acceptance criteria
1. Each export button exists only on the tools listed in the approved scope and performs a real download or native print action.
2. Exported numeric values exactly match on-screen values after cent rounding; all schedule rows are included, including the final capped payment.
3. CSV has a stable header, UTF-8 text, RFC 4180 quoting, CRLF rows and explicit currency/units/assumptions/disclaimers.
4. Compare Scenario export includes all three scenarios and deltas; budget export includes manual group mapping and target percentages; retirement export includes nominal and today's-dollar values plus inflation/return assumptions.
5. Long schedules up to 600 rows export without truncation or browser freeze.
6. Empty/invalid states do not download misleading or partial reports.
7. CSV export does not include formulas from user-controlled text; tests cover delimiters, quotes, CR/LF and formula-injection cases in any exported text fields.
8. Filenames are fixed safe slugs with optional date, never raw user input.
9. Print output hides controls/navigation, includes assumptions and disclaimers, and keeps tables readable across page breaks.
10. Mobile download action and native print behavior are checked in supported browsers; real-device Android/TalkBack remains a separate manual test.
11. Browser QA and mobile/desktop Lighthouse pass before merge; GitHub Pages deployment is verified after merge.

## 7. Implementation sequence
1. Implement CSV and print helpers once, with a shared safe encoder and deterministic filenames.
2. Add CSV and Print / Save as PDF actions to Loan Amortization and verify every schedule row.
3. Add exports to Compare Scenarios, Advanced Budget Planner and Retirement Projection using structured result objects.
4. Add print stylesheet and responsive action controls; do not add PDF library or server service.
5. Extend Browser QA to capture downloads, inspect file contents/headers/units/totals/assumptions, test long schedules and formula-injection cases.
6. Run Browser QA and mobile/desktop Lighthouse; review exported files and print preview.
7. Squash-merge only after all required checks pass; verify GitHub Pages deployment and update the master roadmap.

## 8. Research limitations
- Competitor review uses public feature pages and descriptions, not hands-on testing of all products.
- Native browser Print → Save as PDF depends on the user's browser/OS print UI; USAJIO must not claim a PDF file was automatically created.
- Spreadsheet formula handling varies by application and version. Test the actual generated CSV in a text editor and representative spreadsheet software before making strong compatibility claims.

## 9. Implementation progress — 2026-11-22
- PR #63 implements the first approved slice on the Loan Payment Calculator only: a client-side UTF-8 CSV download and native browser Print / Save as PDF action.
- CSV is generated from the validated cent-rounded amortization result object, not formatted DOM text. It includes currency, principal, rate, term, extra principal, payment totals, assumptions, exclusions and every schedule row (including final capped payment).
- All CSV fields are consistently quoted and embedded quotes are doubled; rows use CRLF. Numeric fields are emitted as decimal values without currency symbols. Static labels and allowlisted currency codes are used; no user-controlled free-text fields are exported, and financial inputs are not sent to a server or included in filenames.
- The CSV filename is fixed (usajio-loan-amortization.csv). Object URLs are revoked after download.
- Print / Save as PDF invokes the browser's native print UI; a print stylesheet hides navigation, calculator inputs, action buttons and scenario controls while retaining report assumptions, summary, disclaimer and the full schedule table. This is not represented as an automatic PDF download.
- Editing any loan assumption invalidates the prior report actions until recalculation, preventing stale exports.
- Browser QA adds checks for download filename, UTF-8 BOM, currency/assumption metadata, CRLF row count, all 60 schedule rows, final zero balance, static non-formula row prefixes, native print invocation, print stylesheet visibility and stale-report invalidation. Automated run results are pending.
- This PR deliberately implements only the loan amortization export slice. Compare Scenarios, Advanced Budget Planner and Retirement Projection exports remain future work after this slice is reviewed and validated.


## 10. Release verification — 2026-11-22 (PR #63)
- PR #63 was squash-merged as `8c7bb010a925a7d47ae0ec322cc4ebbfec9ca270`.
- Browser QA run #45050335877 passed on the PR head. The automated suite checked the CSV filename, UTF-8 BOM, metadata, CRLF rows, all 60 payment rows, final zero balance, formula-safe static labels, print invocation, print stylesheet and stale-result invalidation, in addition to the broader calculator/responsive/keyboard/axe checks.
- Lighthouse run #45050335847: Mobile and Desktop jobs passed.
- User supplied a generated CSV for review; the conversation review recorded the expected metadata, UTF-8 BOM, CRLF row structure and complete 60-payment schedule with final zero balance.
- User supplied a browser-generated PDF for review. The inspected PDF contains 3 pages and all 60 payments in sequence, with the 8-column table continuing across page boundaries. For the PDF example ($100 principal, 7% annual rate, 5 years), the final payment is $1.30, ending balance is $0.00 and cumulative interest is $18.71.
- GitHub Pages deployment run #45050740122 for merge commit `8c7bb010a925a7d47ae0ec322cc4ebbfec9ca270` completed with conclusion `success`.
- A non-blocking Node.js 20 deprecation warning appeared in the Pages workflow. It did not prevent deployment; review runtime/action upgrades in a separate maintenance change.
- This release implements only the loan export slice. Compare Scenarios, Advanced Budget Planner and Retirement Projection exports remain planned, not complete.
