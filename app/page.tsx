// app/page.tsx
import Hero from "../components/Hero";
import DestinationGrid from "../components/DestinationGrid";
import SocialProof from "../components/SocialProof";
import Footer from "../components/Footer";
import type { Metadata } from "next";
import destinations from "../data/destinations.json";

/**
 * Page metadata (App Router)
 */
export const metadata: Metadata = {
  title: "Seabreeze Bay — Tourist Destination (Demo)",
  description:
    "Seabreeze Bay — Explore beaches, trails, local markets and more. Demo tourism showcase built with Next.js + TypeScript + Tailwind.",
  openGraph: {
    title: "Seabreeze Bay — Tourist Destination (Demo)",
    description:
      "Seabreeze Bay — Explore beaches, trails, local markets and more. Demo tourism showcase built with Next.js + TypeScript + Tailwind.",
    images: ["/hero.jpg"],
  },
};

/**
 * JSON-LD schema.org structured data for the homepage
 * (TouristDestination with hasPart for attractions)
 */
function SchemaLD() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Seabreeze Bay (Demo)",
    description:
      "Seabreeze Bay is a demo tourist destination used for a portfolio site. It features beaches, cliffs, markets and scenic trails.",
    url: "https://example.com/",
    image: "/hero.jpg",
    hasPart: destinations.map((d) => ({
      "@type": "TouristAttraction",
      name: d.title,
      description: d.description,
      url: d.url ?? `/destinations/${d.slug}`,
      image: d.image,
    })),
  };

  return (
    <script
      key="ld"
      type="application/ld+json"
      // JSON must be stringified here
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Homepage layout (server component)
 */
export default function Page() {
  return (
    <>
      {/* Insert structured data into head */}
      <SchemaLD />

      <main className="min-h-screen bg-gray-50 text-slate-900">
        {/* Hero: full-bleed image with headline, subheading, and search bar */}
        <Hero />

        <section id="attractions" className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-2">Top attractions</h2>
            <p className="text-sm text-slate-600 mb-6">
              Discover curated places to visit in Seabreeze Bay.
            </p>

            {/* Destination grid (client component) reads data/destinations.json and supports filtering */}
            <DestinationGrid />
          </div>
        </section>

        <section id="social-proof" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-2">What visitors say</h2>
            <p className="text-sm text-slate-600 mb-6">
              Selected reviews from recent visitors.
            </p>
            <SocialProof />
          </div>
        </section>

        {/* Footer includes nav links, socials, and newsletter UI (no backend) */}
        <Footer />
      </main>
    </>
  );
}
