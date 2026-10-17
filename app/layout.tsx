import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "FormalLab",
  description: "Interactive Formal Language Generator and Calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-7xl px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
