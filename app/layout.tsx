import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FormalLab",
  description: "Interactive Formal Language Generator and Calculator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}