import type { CollectionEntry } from "astro:content";
import { isPublished } from "@lib/publication";

export type ForestEntry = CollectionEntry<"forests">;
export type ForestOverviewEntry = ForestEntry & {
  data: Extract<ForestEntry["data"], { type: "forest" }>;
};
export type ForestPathEntry = ForestEntry & {
  data: Exclude<ForestEntry["data"], { type: "forest" }>;
};
export type FruitPathEntry = CollectionEntry<"fruit-path">;
export type FruitPathLegacySource = "canonNotes" | "compassPoints" | "pillars";

export type ArticleEntry =
  | CollectionEntry<"foundations-of-discernment">
  | CollectionEntry<"the-clearing">
  | CollectionEntry<"bearings">
  | CollectionEntry<"compass-points">
  | ForestPathEntry;

export function isForestOverview(entry: ForestEntry): entry is ForestOverviewEntry {
  return "type" in entry.data && entry.data.type === "forest";
}

export function isForestPathEntry(entry: ForestEntry): entry is ForestPathEntry {
  return !isForestOverview(entry);
}

export function getPathwayId(entry: FruitPathEntry) {
  return entry.data.pathwayId ?? entry.slug;
}

export function getFruitPathHref(entry: FruitPathEntry) {
  return `/fruit-path/${getPathwayId(entry)}`;
}

export async function getPublishedForestOverviews() {
  const { getCollection } = await import("astro:content");
  const forests = await getCollection("forests");
  return forests.filter(
    (entry): entry is ForestOverviewEntry =>
      isForestOverview(entry) && isPublished(entry),
  );
}

export async function getPublishedFruitPaths() {
  const { getCollection } = await import("astro:content");
  const pathways = await getCollection("fruit-path");
  return pathways.filter(isPublished);
}

export async function getLegacyFruitPathHref(
  source: FruitPathLegacySource,
  slug?: string,
) {
  if (!slug) return "/fruit-path";

  const pathways = await getPublishedFruitPaths();
  const match = pathways.find((entry) =>
    entry.data.legacy?.[source]?.includes(slug),
  );

  return match ? getFruitPathHref(match) : "/fruit-path";
}

export async function getRelatedPathwaysForForest({
  forestSlug,
  series,
}: {
  forestSlug?: string;
  series?: string;
}) {
  const [forests, pathways] = await Promise.all([
    getPublishedForestOverviews(),
    getPublishedFruitPaths(),
  ]);

  const forest = forestSlug
    ? forests.find((entry) => entry.slug === forestSlug)
    : series
      ? forests.find((entry) => entry.data.series === series)
      : undefined;

  if (!forest?.data.relatedPathways?.length) return [];

  const pathwaysById = new Map(
    pathways.map((entry) => [getPathwayId(entry), entry] as const),
  );

  return forest.data.relatedPathways.flatMap((pathwayId) => {
    const match = pathwaysById.get(pathwayId);
    return match ? [match] : [];
  });
}

export async function getRelatedForestsForPathway(pathwayId: string) {
  const forests = await getPublishedForestOverviews();

  return forests.filter((entry) =>
    entry.data.relatedPathways?.includes(pathwayId),
  );
}

/** Compass Points can illuminate several Forests, but have one canonical home. */
export async function getPublishedCompassPointsForForest(forestSlug: string) {
  const { getCompassPoints } = await import("@lib/compassPoints");
  const points = await getCompassPoints();
  return points
    .filter(isPublished)
    .filter((entry) =>
      entry.data.primaryForest === forestSlug ||
      entry.data.relatedForests?.includes(forestSlug),
    )
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
