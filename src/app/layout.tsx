import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./polish.css";
export const metadata: Metadata = {
  title: "AIM Germany — Equality. Education. Dignity. Together.",
  description: "A demonstration website concept for an Ambedkarite community in Germany. Organisation details to be confirmed.",
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
