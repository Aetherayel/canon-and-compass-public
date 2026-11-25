# Canon & Compass — Engineering Case Study

[Visit the live site](https://canonandcompass.com)

Canon & Compass is a Christian formation-oriented publishing platform built with Astro. It organizes reading around what a reader needs to understand rather than around a chronological blog archive.

This repository is a **curated engineering case study**, not the production source, a starter template, or a runnable mirror. The examples illustrate architecture and selected implementation patterns; editorial copy, production artwork, private integrations, build configuration, and some dependencies are deliberately omitted or replaced.

## Reader architecture

| Destination | Function | Implementation |
| --- | --- | --- |
| The Clearing | Witness and reorientation | Shared article listing, including Field Notes |
| The Forests | Explore formative worldviews and environments | Interactive six-marker field guides, ordered trails, contextual Compass Points |
| Fruit Paths | Trace a pattern from fruit to root and renewal | Integrated pathway pages with links to related Forests |
| The Foundations | Biblical, theological, philosophical, and worldview grounding | Theology and worldview shelves plus guided studies |

These are independent entry points, not mandatory sequential stages. Find Your Bearings provides an additional guided orientation experience.

## Engineering highlights

- **Typed content model:** six collections, discriminated Forest overview/trail schemas, structured pathway metadata, stable IDs and relationships.
- **Route and publication policy:** canonical destinations, legacy redirects, shared draft/date gating in the America/Chicago time zone.
- **Interactive field guides:** CSS-driven marker selection, keyboard-operable radio inputs, per-entry coordinates, responsive detail panels, and ordered deeper reading.
- **Search:** server-side metadata projection into a common card model; SolidJS and Fuse.js handle client-side matching.
- **Reading continuity:** browser-local progress, article completion, stable collection-based keys across route migrations.
- **Homepage:** four reader destinations, recent publication aggregation, and evergreen fallback.

## Stack

Astro 5 (server output on Vercel), Node.js 22, TypeScript, MDX, Tailwind CSS, SolidJS, and Fuse.js. The public repository intentionally excludes deployment configuration and is not independently buildable.

## Explore the examples

| Area | Representative files |
| --- | --- |
| Data model | [Collection schema](src/content/config.ts), [relationships](src/lib/content.ts), [publication policy](src/lib/publication.ts) |
| Layouts | [Page shell](src/layouts/PageLayout.astro), [article header](src/layouts/ArticleTopLayout.astro), [article body](src/layouts/ArticleBottomLayout.astro), [Fruit Path](src/layouts/FruitPathPage.astro) |
| Interactive Forests | [Atlas component](src/components/ForestAtlas.astro), [Forest route](src/pages/forests/%5B...slug%5D.astro), [cross-link cards](src/components/CrossLinkCards.astro) |
| Discovery | [Homepage excerpt](src/pages/index.astro), [search assembly](src/pages/search/index.astro), [search UI](src/components/Search.tsx), [card projection](src/lib/cardEntries.ts) |
| Foundations and Clearing | [Foundations excerpt](src/pages/foundations.astro), [Clearing excerpt](src/pages/the-clearing/index.astro) |
| Reading continuity | [Progress keys](src/lib/articleProgress.ts), [list status](src/components/ArticleProgressListScript.astro) |

See [Architecture Notes](ARCHITECTURE_TEMPLATE.md) for the route map, implementation tradeoffs, and redaction details. Existing PNGs in `public/` are historical reference images, not current screenshots; visit the live site for its present design. `public/example-atlas.svg` is an illustrative placeholder, not production artwork.

## Rights

Software licensing and reserved editorial/creative material are distinct. See [LICENSE](LICENSE), [NOTICE](NOTICE.md), and [COPYRIGHT](COPYRIGHT.md). No production article collection or internal editorial guide is included.
