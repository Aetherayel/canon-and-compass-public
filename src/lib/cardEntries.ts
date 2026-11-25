import type { CollectionEntry } from "astro:content";
import { isForestOverview, type ForestPathEntry } from "@lib/content";

export type CardEntry = {
  collection:
    | "fruit-path"
    | "the-clearing"
    | "foundations-of-discernment"
    | "forests"
    | "bearings"
    | "compass-points";
  slug: string;
  href: string;
  title: string;
  summary: string;
  tags: string[];
  date?: Date;
  series?: string;
  seriesPart?: number;
  searchText: string[];
};

type SupportedEntry =
  | CollectionEntry<"fruit-path">
  | CollectionEntry<"the-clearing">
  | CollectionEntry<"foundations-of-discernment">
  | CollectionEntry<"forests">
  | CollectionEntry<"bearings">
  | CollectionEntry<"compass-points">;

type StandardEntry = Exclude<SupportedEntry, CollectionEntry<"forests"> | CollectionEntry<"fruit-path"> | CollectionEntry<"compass-points">>;

export function toCardEntry(entry: SupportedEntry): CardEntry {
  if (entry.collection === "fruit-path") {
    return {
      collection: entry.collection,
      slug: entry.slug,
      href: `/fruit-path/${entry.data.pathwayId ?? entry.slug}`,
      title: entry.data.shift.title,
      summary: entry.data.shift.blurb,
      tags: entry.data.shift.tags,
      date: entry.data.date,
      searchText: [
        entry.slug,
        entry.data.title,
        entry.data.summary,
        entry.data.shift.title,
        entry.data.shift.description,
        entry.data.shift.blurb,
        ...entry.data.shift.fruit,
        ...entry.data.shift.tags,
      ],
    };
  }

  if (entry.collection === "forests") {
    if (isForestOverview(entry)) {
      return {
        collection: entry.collection,
        slug: entry.slug,
        href: `/forests/${entry.slug}`,
        title: entry.data.cardTitle ?? entry.data.title,
        summary: entry.data.cardSummary ?? entry.data.summary,
        tags: [entry.data.series, "Worldview", "Formation"],
        series: "The Forests",
        searchText: [
          entry.slug,
          entry.data.title,
          entry.data.cardTitle ?? "",
          entry.data.summary,
          entry.data.subtitle,
          entry.data.tagline ?? "",
          entry.data.series,
          entry.data.climate,
          entry.data.quietGospel,
          ...entry.data.canopy,
          ...entry.data.fruit,
        ],
      };
    }

    const forestEntry = entry as ForestPathEntry;
    return {
      collection: forestEntry.collection,
      slug: forestEntry.slug,
      href: `/forests/${forestEntry.slug}`,
      title: forestEntry.data.title,
      summary: forestEntry.data.summary,
      tags: forestEntry.data.tags,
      date: forestEntry.data.date,
      series: forestEntry.data.series,
      seriesPart: forestEntry.data.part,
      searchText: [
        forestEntry.slug,
        forestEntry.data.title,
        forestEntry.data.summary,
        forestEntry.data.series,
        ...forestEntry.data.tags,
      ],
    };
  }

  if (entry.collection === "compass-points") {
    return {
      collection: entry.collection,
      slug: entry.slug,
      href: `/forests/${entry.data.primaryForest}/compass-points/${entry.slug}`,
      title: entry.data.title,
      summary: entry.data.summary,
      tags: entry.data.tags,
      date: entry.data.date,
      series: "Compass Point",
      searchText: [entry.slug, entry.data.title, entry.data.summary, "Compass Point", entry.data.primaryForest, ...(entry.data.relatedForests ?? []), ...entry.data.tags],
    };
  }

  const standardEntry = entry as StandardEntry;
  const seriesPart =
    standardEntry.collection === "foundations-of-discernment"
      ? standardEntry.data.day
      : undefined;
  const series =
    standardEntry.collection === "the-clearing" &&
    standardEntry.data.stream === "field-notes"
      ? "Field Notes"
      : standardEntry.collection === "bearings"
        ? standardEntry.data.kind === "theology" ? "Theology" : "Worldview"
      : "series" in standardEntry.data
        ? standardEntry.data.series
        : undefined;

  return {
    collection: standardEntry.collection,
    slug: standardEntry.slug,
    href:
      standardEntry.collection === "foundations-of-discernment"
        ? `/foundations/foundations-of-discernment/${standardEntry.slug}`
        : standardEntry.collection === "bearings"
          ? `/foundations/${standardEntry.slug}`
        : `/${standardEntry.collection}/${standardEntry.slug}`,
    title: standardEntry.data.title,
    summary: standardEntry.data.summary,
    tags: standardEntry.data.tags,
    date: standardEntry.data.date,
    series,
    seriesPart,
    searchText: [
      standardEntry.slug,
      standardEntry.data.title,
      standardEntry.data.summary,
      ...standardEntry.data.tags,
      ...(series ? [series] : []),
    ],
  };
}
