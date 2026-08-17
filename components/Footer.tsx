// components/Footer.tsx
"use client";

/**
 * Footer
 * - Navigation links, social icons, and a newsletter signup UI (no backend)
 * - Newsletter stores the email in localStorage as a mock (UI-only)
 *
 * Accessibility:
 * - Proper labels, focus styles and keyboard operability
 */

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    // mock: store in localStorage and show a toast/notice
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const list = JSON.parse(localStorage.getItem("newsletter") || "[]");
      if (!list.includes(email)) {
        list.push(email);
        localStorage.setItem("newsletter", JSON.stringify(list));
      }
    } catch {
      localStorage.setItem("newsletter", JSON.stringify([email]));
    }
    setSubscribed(true);
  }

  return (
    <footer className="bg-slate-100 py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold text-lg">Seabreeze Bay</h3>
            <nav aria-label="Footer navigation" className="mt-3">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#home" className="text-slate-700 hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-slate-700 hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#attractions" className="text-slate-700 hover:underline">
                    Attractions
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-slate-700 hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-sm">Follow</h4>
            <div className="flex gap-3 mt-3">
              <a href="#" aria-label="Facebook" className="p-2 bg-white rounded shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12.1C22 6.48 17.52 2 11.9 2S1.8 6.48 1.8 12.1c0 4.99 3.66 9.13 8.46 9.97v-7.06H7.9v-2.91h2.36V9.77c0-2.33 1.39-3.62 3.52-3.62.  ," />
                </svg>
              </a>

              <a href="#" aria-label="Instagram" className="p-2 bg-white rounded shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                </svg>
              </a>

              <a href="#" aria-label="Twitter" className="p-2 bg-white rounded shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 5.92c-.63.28-1.3.46-2 .54.72-.43 1.26-1.12 1.52-1.94-.67.4-1.41.69-2.2.84A3.48 3.48 0 0016.5 4c-1.93 0-3.5 1.57-3.5 3.5 0 .27.03.53.09.78C9.1 8.13 6 6.2 3.9 3.2c-.3.5-.47 1.09-.47 1.71 0 1.18.6 2.22 1.5 2.83-.56 0-1.08-.17-1.54-.43v.04c0 1.71 1.22 3.13 2.85 3.45-.3.08-.62.12-.95.12-.23 0-.45-.02-.66-.06.45 1.4 1.76 2.42 3.31 2.44A6.99 6.99 0 012 19.54 9.86 9.86 0 007.29 21c6.05 0 9.37-5.01 9.37-9.36v-.43c.64-.46 1.2-1.04 1.64-1.7-.6.27-1.25.45-1.92.53z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm">Stay in touch</h4>

            <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
              <label htmlFor="newsletter" className="sr-only">
                Email sign up
              </label>
              <input
                id="newsletter"
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-sky-400"
                aria-label="Email for newsletter signup"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
                aria-label="Subscribe to newsletter"
                disabled={subscribed}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </form>

            <p className="mt-2 text-xs text-slate-600">No spam — just travel updates (demo only).</p>
          </div>
        </div>

        <div className="mt-8 text-sm text-slate-600">
          © <span id="year">{new Date().getFullYear()}</span> Seabreeze Bay — Demo tourism site.
        </div>
      </div>
    </footer>
  );
}
