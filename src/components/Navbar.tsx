"use client";

import React, { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ExternalLink, Sparkles, BookOpen, Layers } from "lucide-react";
import { GithubIcon } from "./Icons";

export function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--bg-surface)]/90 backdrop-blur-md transition-colors duration-200">
      {/* Scroll Reading Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-[var(--brand-orange)] via-amber-400 to-sky-400 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            {/* Keploy Rabbit / Box mark stylized */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff7d42] to-[#ff512f] flex items-center justify-center text-white font-black text-base shadow-sm group-hover:scale-105 transition-transform duration-200">
              K
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-[var(--text-primary)]">
                  Keploy
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--brand-orange-subtle)] text-[var(--brand-orange)] border border-[var(--brand-orange)]/20">
                  DevRel Guide
                </span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] -mt-0.5">
                Go Quickstart • Next.js & MDX
              </span>
            </div>
          </a>
        </div>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[var(--text-secondary)]">
          <a
            href="#architecture"
            className="hover:text-[var(--brand-orange)] transition-colors flex items-center gap-1"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>eBPF Architecture</span>
          </a>
          <a
            href="#step-1-setup"
            className="hover:text-[var(--brand-orange)] transition-colors flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Step-by-Step Guide</span>
          </a>
          <a
            href="#interactive-playground"
            className="hover:text-[var(--brand-orange)] transition-colors flex items-center gap-1 text-[var(--brand-orange)] font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </a>
          <a
            href="#devrel-learnings"
            className="hover:text-[var(--brand-orange)] transition-colors"
          >
            DevRel Takeaways
          </a>
        </nav>

        {/* Action Buttons & Theme Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href="https://keploy.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-sm"
          >
            <span>Keploy Docs</span>
            <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
          </a>

          <a
            href="https://github.com/keploy/keploy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] transition-all cursor-pointer border border-[var(--border-color)] shadow-sm"
          >
            <GithubIcon className="w-4 h-4 text-[var(--brand-orange)]" />
            <span className="hidden sm:inline">Keploy GitHub</span>
            <span className="text-[10px] bg-[var(--brand-orange-subtle)] text-[var(--brand-orange)] px-1.5 py-0.2 rounded font-mono">
              ★ 10k+
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
