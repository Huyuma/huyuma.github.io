// components/DestinationCard.tsx
"use client";

import Link from "next/link";
import type { Destination } from "../types";

type Props = {
  destination: Destination;
};

/**
 * DestinationCard
 * - Card shows image, title, short description and a link to the detail page (placeholder)
 * - Images are referenced by public path (destination.image)
 * - Provides accessible alt text (destination.alt)
 */

export default function DestinationCard({ destination }: Props) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 focus-within:ring-2 focus-within:ring-sky-400">
      <div className="h-44 bg-slate-100 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.alt ?? destination.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{destination.title}</h3>
        <p className="text-sm text-slate-600 mb-3">{destination.description}</p>

        <div className="flex items-center justify-between">
          <Link
            href={destination.url ?? `/destinations/${destination.slug}`}
            className="text-sky-600 hover:underline text-sm font-medium"
            aria-label={`View details for ${destination.title}`}
          >
            View details
          </Link>

          <button
            className="text-sm px-3 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50"
            onClick={() => {
              // simple saved trips localStorage action (UI-only)
              try {
                const saved = JSON.parse(localStorage.getItem("savedTrips") || "[]");
                if (!saved.includes(destination.id)) {
                  saved.push(destination.id);
                  localStorage.setItem("savedTrips", JSON.stringify(saved));
                  alert(`${destination.title} saved to your trips (local only).`);
                } else {
                  alert(`${destination.title} is already in your saved trips.`);
                }
              } catch {
                localStorage.setItem("savedTrips", JSON.stringify([destination.id]));
                alert(`${destination.title} saved to your trips (local only).`);
              }
            }}
            aria-label={`Save ${destination.title} to trips`}
          >
            Save
          </button>
        </div>
      </div>
    </article>
  );
}
