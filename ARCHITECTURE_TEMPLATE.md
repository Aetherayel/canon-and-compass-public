# Architecture Notes

## Project Goal

Canon & Compass is not structured as a generic blog. The central problem was how to make a large body of writing navigable in a way that matched reader need, not just publish date.

## Core Design Decision

Instead of flattening everything into posts and categories, the site uses distinct content types with different roles in the reader journey. That lets the information architecture reflect intent: orientation, diagnosis, targeted exploration, and reinforcement each have different entry points.

## Technical Approach

- Astro handles static generation and file-based routing.
- MDX content collections provide typed structured content.
- TypeScript schemas keep metadata consistent across layouts and routes.
- Shared layouts reduce duplication while allowing route-specific rendering behavior.
- Client-side search is intentionally narrow and metadata-driven rather than a generic full-text dump.

## Why The Content Schema Matters

The content model does more than validate frontmatter. It enables:

- consistent page rendering
- route-aware linking between related content
- search indexing based on structured metadata
- predictable editorial growth without ad hoc templates

## Why This Repo Is Selective

The full project contains protected editorial material and brand assets. This public version focuses on the engineering system behind the site: schemas, route logic, layouts, and search. That keeps the case study useful for review without turning the repo into a free copy of the production work.
