# USAJIO Personal Finance Workspace — Product & Technical Plan

## Product direction

Evolve USAJIO from a calculator collection into a privacy-conscious personal finance workspace. Keep the public calculators free and independently useful; the workspace adds ongoing planning without requiring a bank connection.

## Experience principles

- Calm, polished visual hierarchy: clear typography, restrained color, useful whitespace, consistent cards and charts.
- One overview that connects monthly cash flow, category budgets, savings goals and debt balances.
- Explain every number and keep calculations auditable; do not imply that an estimate is a recommendation.
- Responsive from narrow mobile screens to wide desktop; keyboard operation, visible focus and readable chart summaries are baseline requirements.
- No forced signup or financial-account linking.

## Current milestone — Private workspace foundation

- Overview dashboard and six-month income/expense visualization.
- Transaction entry, search and income/expense filters.
- Monthly category budgets with used/remaining/over-budget states.
- Savings goals with progress and contributions.
- Debt inventory with APR and payment metadata; manual payment updates.
- Currency display preference.
- Encrypted local vault, lock/unlock, encrypted backup download/restore and CSV export.

## Data architecture

The static GitHub Pages deployment does not provide a trusted server-side database. The workspace therefore stores a single encrypted vault record in IndexedDB. A passphrase derives a key with PBKDF2-SHA-256; records are encrypted using AES-GCM with a fresh random IV on each save. The passphrase and derived key are not persisted.

The vault currently contains:
- transactions: date, description, type, category, amount and optional note.
- budgets: category and monthly limit.
- goals: target, saved amount, optional target date and icon.
- debts: balance, APR, minimum payment and debt type.
- currency: display currency.

## Security and privacy boundaries

Encryption at rest is a meaningful safeguard, not a guarantee against a compromised device, malicious browser extension, XSS, or hostile script while the vault is unlocked. Users should use a unique strong passphrase, keep an encrypted backup, lock shared devices, and never enter bank passwords, card numbers or account credentials. No bank connection, server-side sync, account authentication, or recovery service is included in this static-site milestone. Losing both the passphrase and usable backup means the vault cannot be recovered.

The workspace should never send financial record values to analytics, URLs, third-party services or server logs. Third-party fonts are presentation resources only.

## Roadmap

### Next — Planning depth
- Recurring income/expense templates and upcoming bill calendar.
- Net-worth accounts and assets/liabilities snapshot.
- More complete debt payoff planning with snowball/avalanche projections.
- Savings contribution history and goal timelines.

### Then — Reporting
- Monthly and annual reports with category trends.
- Printable reports and more robust CSV exports/import validation.
- Period comparison and cash-flow insights with transparent methodology.

### Hardening
- Cross-browser testing, keyboard and screen-reader review, chart text alternatives.
- Backup/restore edge cases, corrupted-record handling and storage-quota behavior.
- Content Security Policy and dependency review before adding third-party scripts.
- Clear privacy copy and data deletion confirmation.

## Non-goals without a secure backend

Do not add shared accounts, password reset, multi-device cloud sync, bank aggregation, or remote financial data storage to the static-only site. Those require a separately designed authenticated backend, secure session handling, consent and data-retention policies, and a security review.