import { createEffect, createSignal } from "solid-js"
import Fuse from "fuse.js"
import ArrowCard from "@components/ArrowCard"
import SearchBar from "@components/SearchBar"
import type { CardEntry } from "@lib/cardEntries"

type Props = {
  data: CardEntry[]
}

const suggestedStarts = [
  { href: "/the-clearing", label: "The Clearing" },
  { href: "/forests", label: "The Forests" },
  { href: "/fruit-path", label: "Fruit Paths" },
  { href: "/foundations", label: "The Foundations" },
]

export default function Search({ data }: Props) {
  const [query, setQuery] = createSignal("")
  const [results, setResults] = createSignal<CardEntry[]>([])

  const fuse = new Fuse(data, {
    keys: [
      "slug",
      "title",
      "summary",
      "tags",
      "series",
      "searchText",
    ],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.4,
  })

  createEffect(() => {
    if (query().length < 2) {
      setResults([])
    } else {
      setResults(fuse.search(query()).map((result) => result.item))
    }
  })

  const onSearchInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    setQuery(target.value)
  }

  return (
    <div class="flex flex-col">
      <SearchBar onSearchInput={onSearchInput} query={query} setQuery={setQuery} placeholderText="What are you looking for?" />

      {(query().length >= 2 && results().length >= 1) && (
        <div class="mt-12">
          <div class="text-sm uppercase mb-2">
            Found {results().length} results for {`'${query()}'`}
          </div>
          <ul class="flex flex-col gap-3">
            {results().map(result => (
              <li>
                <ArrowCard entry={result} pill={true} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {(query().length >= 2 && results().length === 0) && (
        <div class="mt-12 rounded-xl border border-ash/15 bg-paper/80 p-5 text-ash dark:border-bone/15 dark:bg-white/5 dark:text-zinc-300">
          <div class="text-sm font-semibold uppercase tracking-[0.16em] text-ink dark:text-bone">
            No results found
          </div>
          <p class="mt-3 max-w-prose text-sm">
            Try another term or browse a section.
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            {suggestedStarts.map((start) => (
              <a
                href={start.href}
                class="rounded-full border border-starlight/35 px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-starlight/15 dark:text-bone"
              >
                {start.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
