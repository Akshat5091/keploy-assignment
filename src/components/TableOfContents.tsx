"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, ChevronRight } from "lucide-react";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

const tocItems: TocItem[] = [
  { id: "introduction", title: "Why Keploy for Go?", level: 2 },
  { id: "architecture", title: "Architecture & eBPF Interception", level: 2 },
  { id: "prerequisites", title: "Prerequisites & Quickstart Selection", level: 2 },
  { id: "step-1-setup", title: "Step 1: Setup Mongo & Gin App", level: 2 },
  { id: "step-2-record", title: "Step 2: Record API Calls with Keploy", level: 2 },
  { id: "step-3-artifacts", title: "Step 3: Anatomy of Tests & Mocks", level: 2 },
  { id: "step-4-replay", title: "Step 4: Replay Tests & Timestamp Mismatch", level: 2 },
  { id: "step-5-noise", title: "Step 5: Mask Dynamic Noise & Pass 100%", level: 2 },
  { id: "step-6-coverage", title: "Step 6: Go Code Coverage Reports", level: 2 },
  { id: "interactive-playground", title: "Interactive Keploy Simulator", level: 2 },
  { id: "devrel-learnings", title: "DevRel Takeaways & Gotchas", level: 2 },
  { id: "faq", title: "Frequently Asked Questions", level: 2 },
];

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>("introduction");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0.1,
      }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[var(--border-color)]">
        <BookOpen className="w-4 h-4 text-[var(--brand-orange)]" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
          Table of Contents
        </h4>
      </div>

      <ul className="space-y-1 text-xs">
        {tocItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-between group ${
                  isActive
                    ? "bg-[var(--brand-orange-subtle)] text-[var(--brand-orange)] font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
                }`}
              >
                <span className="truncate">{item.title}</span>
                <ChevronRight
                  className={`w-3 h-3 transition-transform duration-150 ${
                    isActive
                      ? "text-[var(--brand-orange)] opacity-100 translate-x-0.5"
                      : "opacity-0 group-hover:opacity-60"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-[11px] text-[var(--text-muted)] flex items-center justify-between">
        <span>Reading Time</span>
        <span className="font-mono text-[var(--text-secondary)]">~8 min read</span>
      </div>
    </nav>
  );
}
