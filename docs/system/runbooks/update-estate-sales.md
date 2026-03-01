# Runbook: Update Estate Sales Data

## Purpose

This runbook is for **scheduled AI sessions** that receive new estate sale data (from an API route or scraper) and need to update the site's sales listing.

## Target File

```
src/lib/data/sales.ts
```

This is the **only file you modify** during a sales data update. Do not touch any other file.

## The `Sale` Interface

Every sale entry must conform to this TypeScript interface (defined at the top of the file):

```ts
export interface Sale {
    id: string;
    title: string;
    dates: string;
    endDate: string;
    area: string;
    categories: string[];
    externalUrlNet?: string;
    externalUrlOrg?: string;
}
```

### Field Definitions

| Field | Required | Format / Example |
|---|---|---|
| `id` | Yes | kebab-case slug: `"roseville-march-2026"` (city + month + year) |
| `title` | Yes | Sale headline: `"Mid-Century Modern & Vintage Collection"` |
| `dates` | Yes | Human-readable date range spanning first through last date: `"March 7–8th, 2026 \| 8 AM – 3 PM"` |
| `endDate` | Yes | Last day of the sale in `YYYY-MM-DD` format: `"2026-03-08"`. Used to auto-hide sales after 5 PM on their final day. |
| `area` | Yes | City and state: `"Roseville, CA"` |
| `categories` | Yes | Array of 3–5 category strings describing item types |
| `externalUrlNet` | No | Full URL to the listing on estatesales.net |
| `externalUrlOrg` | No | Full URL to the listing on estatesales.org |

## Step-by-Step Process

### 1. Receive the new data

You will be given estate sale data — either as structured JSON, raw text, or a prompt describing the sales. The data may come from **two sources**: estatesales.net and estatesales.org.

**Source priority:** estatesales.net is the authoritative source. When the two sources provide conflicting data for the same sale (different titles, categories, etc.), **always use the estatesales.net version**.

**Exceptions — values taken from estatesales.org:**
- **`externalUrlOrg`** — always use the .org listing URL.
- **`dates`** — if .net only lists a single day but .org shows a multi-day range, use .org's date range. Sales are almost always multi-day, so a single date on .net likely means the listing is incomplete.

**Date range format:** The `dates` field should always span from the **first date** through the **last date** you see across both sources (e.g., `"March 6–8th, 2026"`), followed by the time range. Do not list individual dates separately.

Parse the authoritative (.net) data into objects matching the `Sale` interface, applying the exceptions above and attaching the corresponding .org URL if available.

### 2. Read the current file

Read `src/lib/data/sales.ts` to understand the current entries and formatting.

### 3. Replace the `sales` array contents

**Completely replace** the contents of the `sales` array with the new data. Do not merge or append — the array should reflect the current/upcoming sales only. Past sales are removed.

### 4. Preserve the interface and exports

- Do **not** modify the `Sale` interface.
- Do **not** change the `export const sales: Sale[] =` declaration.
- Only change the array contents.

### 5. Follow formatting conventions

- 4-space indentation (project standard)
- Trailing commas on array items and object properties
- Use an en dash (`–`) in date ranges (e.g., `March 7–8th`)
- Use a pipe with spaces (`" | "`) to separate dates from times
- Keep categories concise — title-cased, 1–3 words each

### 6. Validate

Run the build to confirm no TypeScript errors:

```bash
npm run build
```

### 7. Commit

Commit with the message format:

```
content: update estate sales data
```

## Example Entry

```ts
{
    id: "roseville-march-2026",
    title: "Roseville Estate — Mid-Century Modern & Vintage Collection",
    dates: "March 7–8, 2026 | 8 AM – 3 PM",
    endDate: "2026-03-08",
    area: "Roseville, CA",
    categories: [
        "Mid-Century Furniture",
        "Vintage Kitchenware",
        "Art Glass",
        "Vinyl Records",
    ],
    externalUrlNet: "https://www.estatesales.net",
    externalUrlOrg: "https://www.estatesales.org",
},
```

## Rules

- **Only modify `src/lib/data/sales.ts`** — nothing else.
- **Replace, don't append** — the array should only contain current/upcoming sales.
- **Do not invent data** — only use data that was provided to you.
- **Preserve the `Sale` interface and `isSaleActive` function exactly** — no field additions or removals.
- **If zero sales are provided**, set the array to empty: `export const sales: Sale[] = [];`
- **estatesales.net is the source of truth.** When .net and .org data conflict, use all field values from .net. Only use .org for its listing URL (`externalUrlOrg`).
- **Dates span first through last.** Always format as a range from the earliest date to the latest date (e.g., `"March 6–8"`), not as individual dates.
- **`endDate` must match the last date in `dates`.** Set `endDate` to the final day of the sale in `YYYY-MM-DD` format. Sales are automatically hidden after 5 PM on this date.
