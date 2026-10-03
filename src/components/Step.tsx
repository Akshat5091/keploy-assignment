"use client";

import React from "react";
import { Clock } from "lucide-react";

interface StepProps {
  number: number | string;
  title: string;
  duration?: string;
  children: React.ReactNode;
  id?: string;
}

export function Step({ number, title, duration, children, id }: StepProps) {
  return (
    <div id={id} className="relative pl-10 sm:pl-12 my-10 group scroll-mt-24">
      {/* Step line connector */}
      <div className="absolute left-4.5 sm:left-5 top-10 bottom-0 w-0.5 bg-[var(--border-color)] group-last:hidden" />

      {/* Step Number Circle */}
      <div className="absolute left-1 sm:left-1.5 top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--brand-orange)] text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shadow-md ring-4 ring-[var(--bg-page)] transition-transform duration-200 group-hover:scale-110">
        {number}
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight">
            {title}
          </h3>
          {duration && (
            <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] font-mono">
              <Clock className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
              <span>~{duration}</span>
            </div>
          )}
        </div>

        <div className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-3 prose-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export function StepList({ children }: { children: React.ReactNode }) {
  return <div className="my-8">{children}</div>;
}
