"use client";

import React from "react";
import { Zap, ShieldCheck, Repeat, Cpu } from "lucide-react";

interface KeyConceptCardProps {
  icon?: "zap" | "shield" | "repeat" | "cpu";
  title: string;
  description: string;
  highlight?: string;
}

export function KeyConceptCard({
  icon = "zap",
  title,
  description,
  highlight,
}: KeyConceptCardProps) {
  const iconMap = {
    zap: <Zap className="w-5 h-5 text-[var(--brand-orange)]" />,
    shield: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    repeat: <Repeat className="w-5 h-5 text-sky-500" />,
    cpu: <Cpu className="w-5 h-5 text-purple-500" />,
  };

  return (
    <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--brand-orange)]/50 transition-all duration-200 shadow-sm flex flex-col justify-between group">
      <div>
        <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
          {iconMap[icon]}
        </div>
        <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">{title}</h4>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{description}</p>
      </div>
      {highlight && (
        <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-[11px] font-mono text-[var(--brand-orange)]">
          {highlight}
        </div>
      )}
    </div>
  );
}
