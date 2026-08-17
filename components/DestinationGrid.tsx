// components/DestinationGrid.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import DestinationCard from "./DestinationCard";
import type { Destination } from "../types";
import data from "../data/destinations.json";

/**
 * DestinationGrid (client)
 * - Loads destinations from local JSON (data/destinations.json)
 * - Supports client-side filtering via the 'site-search' event dispatched from Hero
 * - Includes an internal search input to filter results (keyboard accessible).
 *
 * Accessibility:
 * - Grid uses role="list" and each card uses role="listitem"
 */

export default function DestinationGrid() {
  // If you prefer typed data, add a Destination type in /types.ts (simple inline type here)
  const all: Destination[] = useMemo(() => data as Destination[], []);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Destination[]>(all);

  useEffect(() => {
    // initial
    setResults(all);
  }, [all]);

  // Listen for global 'site-search' events (from Hero)
  useEffect(() => {
    const onSearch = (e: Event) => {
      // CustomEvent with detail.query
      const ce = e as CustomEvent;
      const q = (ce?.detail?.query || "").trim();
      setQuery(q);
      if (!q) {
        setResults(all);
        return;
      }
      const ql = q.toLowerCase();
      setResults(
        all.filter(
          (d) =>
            d.title.toLowerCase().includes(ql) ||
            d.description.toLowerCase().includes(ql) ||
            (d.tags ?? []).some((t) => t.toLowerCase().includes(ql))
        )
      );
    };

    window.addEventListener("site-search", onSearch as EventListener);
    return () => window.removeEventListener("site-search", onSearch as EventListener);
  }, [all]);

  // Local search input handler (filters in real time)
  function handleLocalSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    if (!q) {
      setResults(all);
      return;
    }
    const ql = q.toLowerCase();
    setResults(
      all.filter(
        (d) =>
          d.title.toLowerCase().includes(ql) ||
          d.description.toLowerCase().includes(ql) ||
          (d.tags ?? []).some((t) => t.toLowerCase().includes(ql))
      )
    );
  }

  return (
    <div>
      {/* internal search for keyboard users */}
      <div className="mb-4 flex items-center gap-3">
        <label htmlFor="grid-search" className="sr-only">
          Filter destinations
        </label>
        <input
          id="grid-search"
          data-role="grid-search"
          aria-label="Filter destinations"
          value={query}
          onChange={handleLocalSearch}
          placeholder="Filter attractions (e.g., 'beach', 'market')"
          className="w-full max-w-md px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-sky-400"
        />
        <div className="text-sm text-slate-500">{results.length} results</div>
      </div>

      {/* semantic list/grid */}
      <ul
        role="list"
        aria-label="Attractions list"
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {results.map((d) => (
          <li key={d.id} role="listitem">
            <DestinationCard destination={d} />
          </li>
        ))}
      </ul>
    </div>
  );
}
