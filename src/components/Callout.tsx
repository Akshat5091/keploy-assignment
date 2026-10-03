"use client";

import React from "react";
import { Info, Lightbulb, AlertTriangle, Sparkles, AlertCircle } from "lucide-react";

interface CalloutProps {
  type?: "info" | "tip" | "warning" | "aha" | "danger";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const configs = {
    info: {
      border: "border-sky-500/30",
      bg: "bg-[var(--callout-info-bg)]",
      titleColor: "text-sky-600 dark:text-sky-400",
      icon: <Info className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />,
      defaultTitle: "Note",
    },
    tip: {
      border: "border-emerald-500/30",
      bg: "bg-[var(--callout-tip-bg)]",
      titleColor: "text-emerald-600 dark:text-emerald-400",
      icon: <Lightbulb className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />,
      defaultTitle: "Pro Tip",
    },
    warning: {
      border: "border-amber-500/30",
      bg: "bg-[var(--callout-warning-bg)]",
      titleColor: "text-amber-600 dark:text-amber-400",
      icon: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />,
      defaultTitle: "Caution",
    },
    aha: {
      border: "border-purple-500/30",
      bg: "bg-[var(--callout-aha-bg)]",
      titleColor: "text-purple-600 dark:text-purple-400",
      icon: <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />,
      defaultTitle: "A-ha! Moment",
    },
    danger: {
      border: "border-rose-500/30",
      bg: "bg-rose-500/10",
      titleColor: "text-rose-600 dark:text-rose-400",
      icon: <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />,
      defaultTitle: "Important",
    },
  };

  const config = configs[type] || configs.info;
  const displayTitle = title || config.defaultTitle;

  return (
    <div
      className={`my-6 rounded-xl border ${config.border} ${config.bg} p-4.5 sm:p-5 shadow-sm transition-all duration-200`}
    >
      <div className="flex items-start gap-3.5">
        {config.icon}
        <div className="flex-1 min-w-0">
          {displayTitle && (
            <h4 className={`text-sm font-semibold mb-1.5 ${config.titleColor}`}>
              {displayTitle}
            </h4>
          )}
          <div className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-2 prose-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
