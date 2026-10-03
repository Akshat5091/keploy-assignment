import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Testing Go Microservices with Keploy | Hands-on DevRel Guide",
  description:
    "A beginner-friendly, deep-dive tutorial explaining how Keploy records API traffic, creates zero-code MongoDB mocks using eBPF, and generates automated regression tests for Go Gin applications.",
  keywords: [
    "Keploy",
    "Go",
    "Golang",
    "Gin",
    "MongoDB",
    "eBPF",
    "API Testing",
    "Regression Testing",
    "Integration Testing",
    "Zero Code Mocking",
    "DevRel",
  ],
  authors: [{ name: "Keploy DevRel Team" }],
  openGraph: {
    title: "Testing Go Microservices with Keploy | Hands-on DevRel Guide",
    description:
      "Record API traffic and generate zero-code database mocks with eBPF. Complete Go Gin & MongoDB Quickstart tutorial.",
    type: "article",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var stored = localStorage.getItem('keploy-theme');
                var theme = stored || 'light';
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] antialiased transition-colors duration-200">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
