// components/Hero.tsx
"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Full-bleed hero component.
 * - Headline, subheading, search bar over background image at /public/hero.jpg
 * - Accessible form: labeled input, button
 * - On submit: dispatches a custom 'site-search' event and scrolls to #attractions
 *
 * Notes:
 * - The background image file should be placed at /public/hero.jpg
 * - Motion is subtle and prefers-reduced-motion is respected
 */

export default function Hero() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Respect prefers-reduced-motion for subtle animations if needed
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    const listener = () => setPrefersReducedMotion(media.matches);
    media.addEventListener?.("change", listener);
    return () => media.removeEventListener?.("change", listener);
  }, []);

  // Submit handler: dispatch custom event with the query and navigate/scroll to attractions
  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    // Dispatch custom event for DestinationGrid to pick up and filter client-side
    const ev = new CustomEvent("site-search", { detail: { query } });
    window.dispatchEvent(ev);

    // Focus the search inside the list if present and scroll to section
    const attractions = document.getElementById("attractions");
    attractions?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });

    // optionally focus the internal search input if present after scrolling
    setTimeout(() => {
      const destSearch = document.querySelector<HTMLInputElement>("#attractions input[data-role='grid-search']");
      destSearch?.focus();
    }, 400);
  }

  return (
    <header className="relative w-full">
      {/* Background image (full-bleed) */}
      <div
        className="h-[56vh] md:h-[64vh] lg:h-[72vh] bg-cover bg-center"
        style={{
          backgroundImage: `url('/hero.jpg')`,
        }}
        role="img"
        aria-label="Ocean view at Seabreeze Bay"
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" aria-hidden="true" />

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
              Seabreeze Bay
            </h1>
            <p className="mt-3 text-slate-100 text-sm md:text-lg max-w-2xl mx-auto drop-shadow-sm">
              Sandy beaches, sunlit cliffs, and unforgettable sunsets — plan your next getaway.
            </p>

            {/* Search form (aria, accessible) */}
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="mt-6 mx-auto w-full max-w-2xl"
              role="search"
              aria-label="Search attractions"
            >
              <label htmlFor="hero-search" className="sr-only">
                Search attractions
              </label>

              <div className="flex items-center gap-3">
                <input
                  id="hero-search"
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-400 text-slate-900"
                  placeholder="Search attractions, beaches, trails..."
                  type="search"
                  aria-label="Search attractions"
                />
                <button
                  type="submit"
                  className="px-4 py-3 rounded-lg bg-sky-500 text-white font-semibold hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  Search
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-100/80">
                Try: "lighthouse", "cliff trail", "market"
              </p>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
