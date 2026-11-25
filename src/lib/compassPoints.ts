import { getCollection, type CollectionEntry } from "astro:content";

// Check for source files before querying an intentionally empty collection.
// The glob detects future MD/MDX entries without importing their content.
const compassPointFiles = import.meta.glob("../content/compass-points/**/*.{md,mdx}", {
  query: "?raw",
  import: "default",
});

export async function getCompassPoints(): Promise<CollectionEntry<"compass-points">[]> {
  if (Object.keys(compassPointFiles).length === 0) return [];
  return getCollection("compass-points");
}
