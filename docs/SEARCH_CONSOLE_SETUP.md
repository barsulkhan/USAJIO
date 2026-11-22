# USAJIO — Google Search Console Setup and Indexing Checklist

**Prepared:** 2026-11-22  
**Site:** https://barsulkhan.github.io/USAJIO/  
**Sitemap:** https://barsulkhan.github.io/USAJIO/sitemap.xml

## Current connection status

- The USAJIO repository contains a sitemap and robots.txt reference to that sitemap.
- A repository/CI SEO audit does not prove that Google has indexed any page.
- The currently connected OpenSEO workspace lists only the **InfoJano SEO** project. There is no USAJIO project or connected USAJIO Search Console property available to inspect in this session.
- Do not select, rebind, or change the InfoJano Search Console property as a workaround. No InfoJano settings were accessed or changed for this task.
- Search Console verification, sitemap submission, URL inspection and indexing status are therefore **NOT VERIFIED**.

## 1. Add the correct Search Console property

1. Sign in to the Google account that should own USAJIO's Search Console property.
2. Open https://search.google.com/search-console/
3. Choose **Add property**.
4. Select **URL prefix** and enter exactly:
   `https://barsulkhan.github.io/USAJIO/`
5. Do not create a Domain property for `github.io`: USAJIO is hosted under a GitHub Pages project path, and the site owner does not control the parent `github.io` domain's DNS.

## 2. Verify ownership without sharing account credentials

Recommended method: **HTML file upload**.

1. In Search Console, choose the HTML file verification method and download the exact Google-generated verification file.
2. Do not rename or edit the file. It contains a unique verification token.
3. Provide the downloaded file to the USAJIO maintainer through the supported file upload, or provide its exact filename and full text if it is a small HTML file.
4. Add only that verification file to the root of the USAJIO repository on a dedicated branch and PR. Do not place it in InfoJano.
5. After the PR is merged and GitHub Pages deployment succeeds, confirm that the exact verification URL loads under `https://barsulkhan.github.io/USAJIO/`.
6. Return to Search Console and click **Verify**.
7. Keep the verification file in the repository while the property is in use.

Alternative: if Google provides an HTML meta-tag method, share only the exact `<meta name="google-site-verification" ...>` tag. It can be added to the homepage `<head>` in a separate USAJIO PR. Never share a Google password, recovery code, session cookie or account credential.

## 3. Submit the sitemap

After ownership verification:

1. Open the property's **Sitemaps** section.
2. Submit `sitemap.xml` (or the full URL above).
3. Check the reported submission/read status and any parsing errors.
4. A successful sitemap submission means Google received the sitemap; it does not mean every URL is indexed.

## 4. Inspect URLs and monitor coverage

Use URL Inspection for a small representative sample first:
- Homepage: `https://barsulkhan.github.io/USAJIO/`
- Cash-flow guide: `https://barsulkhan.github.io/USAJIO/cash-flow-budget-guide.html`
- One calculator: `https://barsulkhan.github.io/USAJIO/net-worth-calculator.html`

For each URL, record:
- Whether the URL is known to Google.
- Page indexing verdict and any exclusion reason.
- Last crawl date, if shown.
- Google's selected canonical versus the declared canonical.
- Mobile usability / rich-result status where reported.
- Whether a live test is needed after a change.

Request indexing only after checking that the page is public, returns successfully, is not blocked by robots/noindex, has the intended canonical and provides useful content. Repeated requests do not guarantee faster indexing.

## 5. Record evidence

| Check | Status | Evidence / date |
|---|---|---|
| URL-prefix property created | NOT VERIFIED | |
| Ownership verification | NOT VERIFIED | |
| Sitemap submitted | NOT VERIFIED | |
| Sitemap read successfully | NOT VERIFIED | |
| Homepage URL inspection | NOT VERIFIED | |
| Cash-flow guide URL inspection | NOT VERIFIED | |
| Calculator URL inspection | NOT VERIFIED | |
| Indexing / coverage review | NOT VERIFIED | |
| USAJIO OpenSEO project connected | NOT CONNECTED | |


## Official Google help references

- Search Console ownership verification (HTML file and HTML tag requirements): https://support.google.com/webmasters/answer/9008080
- URL Inspection and indexing troubleshooting: https://support.google.com/webmasters/answer/12482179
- URL Inspection reference: https://support.google.com/webmasters/answer/9012289
- Google Search Central SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

Google's verification instructions require the downloaded HTML file to be published at the exact location specified by the verification wizard, without changing its filename or contents. For the USAJIO URL-prefix property, follow the exact URL shown in the wizard; do not assume a token intended for a different path will verify this property.

## Important limitations

- Search Console data can be delayed and may omit some queries.
- A URL being present in the sitemap, returning HTTP 200, or appearing in a `site:` search does not prove that Google has indexed it.
- Do not promise ranking, traffic, or an indexing date.
- No paid domain, hosting, subscription or API is needed for this setup.
- Keep USAJIO and InfoJano fully separate.
