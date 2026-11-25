/**
 * Publication dates are calendar dates, not exact timestamps. A piece dated
 * 2026-08-08 becomes public at the start of August 8 in this time zone.
 */
export const PUBLICATION_TIME_ZONE = "America/Chicago";

type PublishableData = {
  date?: Date;
  draft?: boolean;
};

type PublishableEntry = {
  data: PublishableData;
};

const publicationDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: PUBLICATION_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function dateKeyInPublicationTimeZone(date: Date) {
  const parts = publicationDateFormatter.formatToParts(date);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);

  return year * 10_000 + month * 100 + day;
}

function frontmatterDateKey(date: Date) {
  // Astro coerces a YAML date such as 2026-08-08 to midnight UTC. Reading the
  // UTC fields preserves the calendar date the author actually entered.
  return (
    date.getUTCFullYear() * 10_000 +
    (date.getUTCMonth() + 1) * 100 +
    date.getUTCDate()
  );
}

export function isPublishedData(data: PublishableData, now = new Date()) {
  if (data.draft) return false;
  if (!data.date) return true;

  return frontmatterDateKey(data.date) <= dateKeyInPublicationTimeZone(now);
}

export function isPublished(entry: PublishableEntry) {
  return isPublishedData(entry.data);
}
