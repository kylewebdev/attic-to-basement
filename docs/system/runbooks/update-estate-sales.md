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
    area: string;
    categories: string[];
    externalUrlNet?: string;
    externalUrlOrg?: string;
    imageAlt?: string;
}
```

### Field Definitions

| Field | Required | Format / Example |
|---|---|---|
| `id` | Yes | kebab-case slug: `"roseville-march-2026"` (city + month + year) |
| `title` | Yes | Sale headline: `"Roseville Estate — Mid-Century Modern & Vintage Collection"` |
| `dates` | Yes | Human-readable date range: `"March 7–8, 2026 \| 8 AM – 3 PM"` |
| `area` | Yes | City and state: `"Roseville, CA"` |
| `categories` | Yes | Array of 3–5 category strings describing item types |
| `externalUrlNet` | No | Full URL to the listing on estatesales.net |
| `externalUrlOrg` | No | Full URL to the listing on estatesales.org |
| `imageAlt` | No | Alt text for a sale-specific image (if one exists) |

## Step-by-Step Process

### 1. Receive the new data

You will be given estate sale data — either as structured JSON, raw text, or a prompt describing the sales. The data may come from **two sources**: estatesales.net and estatesales.org.

**Source priority:** estatesales.net is the authoritative source. When the two sources provide conflicting data for the same sale (different titles, dates, categories, etc.), **always use the estatesales.net version**. The only value taken from estatesales.org is its listing URL for the `externalUrlOrg` field.

Parse the authoritative (.net) data into objects matching the `Sale` interface, and attach the corresponding .org URL if available.

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
- Use an en dash (`–`) in date ranges (e.g., `March 7–8`)
- Use an em dash (`—`) in titles (e.g., `Roseville Estate — Collection`)
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
- **Preserve the `Sale` interface exactly** — no field additions or removals.
- **If zero sales are provided**, set the array to empty: `export const sales: Sale[] = [];`
- **estatesales.net is the source of truth.** When .net and .org data conflict, use all field values from .net. Only use .org for its listing URL (`externalUrlOrg`).
