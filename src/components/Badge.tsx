"use client";

import React from "react";

interface BadgeProps {
  variant?: "orange" | "cyan" | "emerald" | "amber" | "purple" | "neutral";
  children: React.ReactNode;
  size?: "sm" | "md";
}

export function Badge({ variant = "orange", children, size = "md" }: BadgeProps) {
  const styles = {
    orange: "bg-[var(--brand-orange-subtle)] text-[var(--brand-orange)] border-[var(--brand-orange)]/25",
    cyan: "bg-[var(--brand-cyan-subtle)] text-[var(--brand-cyan)] border-[var(--brand-cyan)]/25",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25",
    neutral: "bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border-[var(--border-color)]",
  };

  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full border font-mono tracking-wide ${styles[variant]} ${sizeClasses}`}
    >
      {children}
    </span>
  );
}
