import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "multichat ",
    template: "%s | multichat",
  },
  description: "A modern web application built with Next.js",
  keywords: ["Next.js", "React", "Web App", "Supabase"],
  authors: [{ name: "Abdul Rahman" }],
  creator: "Abdul Rahman",
  metadataBase: new URL("https://yourdomain.com"),

  openGraph: {
    title: "My Project",
    description: "A modern web application built with Next.js",
    url: "https://yourdomain.com",
    siteName: "My Project",
    images: ["/og-image.png"],
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-background
          text-foreground
          w-full
          h-full
          overflow-x-hidden
        `}
      >
        <Providers>
          {/* App Layout */}
          <div className="min-h-screen w-full flex flex-col overflow-hidden">
            {/* Main Content */}
            <main className="flex-1 w-full overflow-hidden">{children}</main>

            {/* Footer */}
            <footer className="border-t text-sm text-center py-4 text-muted-foreground shrink-0">
              © {new Date().getFullYear()} Multichat. All rights reserved.
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
