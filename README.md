# Canon & Compass

Live site: `https://canonandcompass.com`

This repository is a curated public case study for Canon & Compass, a custom Astro publishing site I designed and built. The live project is content-rich and structurally opinionated, but this repo is intentionally selective: it shares representative implementation and architecture decisions without reproducing the full editorial body of work.

Canon & Compass was built around a guided reader journey rather than a standard blog archive. The technical challenge was not only publishing content, but designing a content model, route structure, and linking system that could support orientation, discovery, and progression across a large body of writing.

## What This Public Repo Includes

- representative Astro, TypeScript, and component code
- content schema and metadata modeling examples
- search implementation and data shaping
- a few screenshots of the live site
- sample placeholder content used only to demonstrate structure

## What It Intentionally Does Not Include

- the full production content collection
- protected editorial copy and unpublished material
- private strategy documents or internal writing guides
- reusable rights to Canon & Compass brand assets or essays

## Stack

- Astro
- TypeScript
- MDX
- Tailwind CSS
- SolidJS
- Fuse.js

## What I Focused On

- Information architecture: the site is organized around reader pathways rather than chronology.
- Content modeling: typed frontmatter and collection schemas support consistent rendering, linking, and search.
- Relational navigation: content types connect to each other intentionally rather than living as isolated posts.
- Lightweight implementation: static generation keeps the site fast while a small amount of client-side interactivity supports search.

## Representative Files

- `src/content/config.ts`
- `src/lib/content.ts`
- `src/components/Search.tsx`
- `src/components/PathwayLinks.astro`
- `src/layouts/PageLayout.astro`
- `src/layouts/FruitPathPage.astro`
- `src/pages/search/index.astro`

## Notes On Scope

This is not the full production source. It is a selective engineering case study meant to show how I think about structure, content systems, and product-oriented frontend architecture while respecting the project's editorial and IP boundaries.

## Rights

Code included in this public repo is licensed as described in `LICENSE`.

Editorial content, screenshots, branding, and other Canon & Compass creative material remain subject to the notices in `NOTICE.md` and `COPYRIGHT.md`.
