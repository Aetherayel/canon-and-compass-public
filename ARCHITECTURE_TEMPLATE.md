# Architecture Notes

## 1. Information architecture

The project uses reader intent as the navigation model. The four principal destinations share rendering infrastructure while retaining different content contracts.

| Public route | Internal collection | Rendering behavior |
| --- | --- | --- |
| /the-clearing | the-clearing | One list; Field Notes identified by stream: field-notes |
| /forests | forests | Ordered overview cards; each overview can have its own interactive atlas and related trail |
| /forests/:forest/compass-points/:slug | compass-points | One primary Forest establishes the canonical URL; additional related Forests can surface the same entry |
| /fruit-path/:pathwayId | fruit-path | One integrated MDX entry, related Forests resolved through stable IDs |
| /foundations/:slug | bearings | Stable internal collection; kind distinguishes theology and worldview |
| /foundations/foundations-of-discernment/:slug | foundations-of-discernment | Ordered guided-study entries |
| /find-your-bearings | — | Guided orientation; not an editorial collection |

Field Notes and Compass Points are not standalone destinations. The Foundations is not a required fourth step. Older route namespaces are retained for compatibility, not for creating duplicate content.

## 2. Content and publication

The schema uses a discriminated union for Forest overviews and dated trail entries. An optional atlas object supplies four additional observations, an illustration path, and bounded percentage coordinates for marker overrides. Overview metadata includes presentation fields and order; trails use series and part.

Fruit Paths contain their symptom and renewal metadata in one collection. Related Forests declare pathway IDs, so both directions can be resolved without duplicating a relationship table. Legacy article slugs map to integrated Fruit Paths. Compass Points use primaryForest and optional relatedForests; the collection may be empty without causing a query warning.

Publication is shared: drafts are excluded, and dated entries become eligible on their calendar date in America/Chicago. YAML dates are read using UTC calendar fields to avoid date shifts. Undated overview entries are eligible unless marked draft. Routes and navigation use this predicate.

## 3. Layout and interaction

- PageLayout provides shared head metadata, navigation, main content and footer slots. TopLayout and BottomLayout provide consistent spacing and constrained content width.
- ArticleTopLayout uses collection-aware parent routes, category labels, reading time, and progress status. ArticleBottomLayout renders MDX and records reading state locally.
- FruitPathPage provides its own integrated article header and related Forest cards.
- ForestAtlas uses native radio inputs and CSS selectors for a six-marker scene, hover previews on fine pointers, keyboard selection, focus treatment and a reduced-motion rule. Content and marker positions are data-driven. Ordered trail entries remain separately available in a disclosure list.
- The homepage aggregates recent published destinations (up to three within 28 days) and falls back to a curated evergreen selection when no recent entries qualify. A Forest can represent its newest published trail entry.

## 4. Search and canonical URLs

The server projects eligible collection records into a uniform CardEntry shape; the browser searches metadata with Fuse.js in a SolidJS component. Current search assembly includes both published Forest overviews and trail entries, as well as Fruit Paths, Clearing, Foundations studies, contextual Compass Points and guided studies. No full production article bodies are included in the search payload.

The card mapper centralizes route mapping and labels for results. Field Notes share the Clearing route; internal bearings records map to /foundations; Compass Points map to the primary Forest. The search route uses noindex,follow.

Legacy /bearings and /the-clearing/worldview-bearings redirect to /foundations; the old Field Notes listing redirects to /the-clearing. Other production compatibility routes are omitted here. Browser-local reading keys are based on collection plus slug, not display URLs; the example migration exception uses a fictional slug.

## 5. Case-study boundaries

This is a selection of production-derived examples, not a deployable application. Schema, publication, link-resolution and route/card code are included for architectural review. The homepage and section route markup is shortened; protected prose, actual featured slugs and production artwork are replaced with illustrative values. Shared layout telemetry and feedback integrations are omitted. Some imported UI, styling, icon and configuration dependencies are intentionally outside this selection. The original PNGs are historical, and the example atlas illustration is an abstract stand-in. No article inventory, private strategy, secrets, or internal guides are included.

The production runtime is Astro 5 with server output on Vercel, not static-only generation. The public case study has no package manifest or runnable build.
