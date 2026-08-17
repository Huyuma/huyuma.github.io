// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

/**
 * Root layout for the App Router.
 * - Imports global Tailwind CSS
 * - Sets up the html/head/body structure
 *
 * Keep this file a server component (default). Provide any Providers here
 * if you adopt client-side state libraries later.
 */

export const metadata = {
  title: "Seabreeze Bay — Demo",
  description: "Seabreeze Bay — demo tourism showcase built with Next.js + TypeScript + Tailwind"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
