export const ARTICLE_PROGRESS_STORAGE_KEY = "canonCompass.articleProgress.v1";
export const FOUNDATIONS_PROGRESS_STORAGE_KEY = "canonCompass.foundationsProgress.v1";

export function getArticleProgressKey(collection: string, slug: string) {
  // This study was originally published in The Clearing. Keep its existing
  // progress key when serving it from The Foundations so reading state survives.
  if (collection === "bearings" && slug === "example-migrated-study") {
    return "article:the-clearing:example-migrated-study";
  }
  return `article:${collection}:${slug}`;
}
