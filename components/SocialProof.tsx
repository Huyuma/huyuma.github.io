// components/SocialProof.tsx
/**
 * SocialProof (server or client neutral)
 * - Renders 3 review snippets (placeholder data)
 * - Each review includes quote, author, and location/date optional.
 *
 * Accessibility:
 * - Uses blockquote and cite semantics
 */

export default function SocialProof() {
  const reviews = [
    {
      quote:
        "An unforgettable escape — the cliffs and beaches are stunning, and the local food is delicious.",
      author: "Alex P.",
      location: "United Kingdom",
    },
    {
      quote:
        "Perfect for families. Plenty of safe beaches and activities. We’ll be back next year!",
      author: "Maria S.",
      location: "Spain",
    },
    {
      quote:
        "Hiked the coastal trail at sunrise — magical. The harbor market is a must-visit for fresh seafood.",
      author: "Jason K.",
      location: "USA",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {reviews.map((r, i) => (
        <figure key={i} className="p-4 bg-slate-50 rounded-lg shadow-sm">
          <blockquote>
            <p className="text-sm text-slate-800">“{r.quote}”</p>
          </blockquote>
          <figcaption className="mt-3 text-xs text-slate-600">
            — <span className="font-semibold">{r.author}</span>, {r.location}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
