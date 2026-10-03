"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#ff7d42] to-[#ff512f] flex items-center justify-center text-white font-black text-xs">
                K
              </div>
              <span className="font-bold text-sm text-[var(--text-primary)]">
                Keploy DevRel Documentation
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1.5 text-center md:text-left max-w-md">
              Built for the Keploy DevRel Candidate Assignment. Powered by Next.js, MDX, and Tailwind CSS.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
            <a
              href="https://keploy.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--brand-orange)] transition-colors flex items-center gap-1"
            >
              <span>keploy.io</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-[var(--border-color)]">•</span>
            <a
              href="https://github.com/keploy/samples-go"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--brand-orange)] transition-colors flex items-center gap-1"
            >
              <span>Go Samples</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-[var(--border-color)]">•</span>
            <a
              href="https://github.com/keploy/keploy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--brand-orange)] transition-colors flex items-center gap-1"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--text-muted)] gap-3">
          <div>
            Keploy DevRel Assignment • Akshat Nagori
          </div>
          <div className="font-mono">
            Keploy v2 • Go 1.22+ • Next.js 16
          </div>
        </div>
      </div>
    </footer>
  );
}
