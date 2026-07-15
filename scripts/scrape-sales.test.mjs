import assert from "node:assert/strict";
import test from "node:test";

import { findMatchingOrgLink } from "./scrape-sales.mjs";

function link(slug, saleId = 1) {
    return {
        slug,
        saleId,
        url: `https://estatesales.org/${slug}-${saleId}`,
    };
}

test("matches small title differences between .net and .org", () => {
    const orgLink = link("tools-treasures-and-tees");

    assert.equal(
        findMatchingOrgLink("TOOLS, TREASURES & TOYS", [orgLink]),
        orgLink,
    );
});

test("prefers an exact or prefix match over a fuzzy match", () => {
    const fuzzy = link("tools-treasures-and-tees", 2);
    const exact = link("tools-treasures-and-toys", 1);

    assert.equal(
        findMatchingOrgLink("TOOLS, TREASURES, AND TOYS", [fuzzy, exact]),
        exact,
    );
});

test("does not match an unrelated title", () => {
    assert.equal(
        findMatchingOrgLink("TOOLS, TREASURES, AND TOYS", [
            link("mid-century-modern-estate-sale"),
        ]),
        undefined,
    );
});

test("does not guess between similarly plausible fuzzy matches", () => {
    assert.equal(
        findMatchingOrgLink("TOOLS, TREASURES, AND TOYS", [
            link("tools-treasures-and-tees", 2),
            link("tools-treasures-and-tots", 1),
        ]),
        undefined,
    );
});
