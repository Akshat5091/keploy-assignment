"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export interface TabItem {
  id: string;
  label: string;
  language?: string;
  code: string;
  notes?: string;
}

interface CodeTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
}

export function CodeTabs({ tabs, defaultTab }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");
  const [copied, setCopied] = useState(false);

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  const handleCopy = async () => {
    if (!currentTab) return;
    try {
      await navigator.clipboard.writeText(currentTab.code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-6 rounded-xl border border-[var(--border-color)] overflow-hidden bg-[#0d111c] text-[#e2e8f0] shadow-md transition-all duration-200">
      {/* Tabs Header */}
      <div className="flex items-center justify-between px-3 pt-2 bg-[#090d16] border-b border-[#1b253b]">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-t-lg transition-all duration-150 cursor-pointer border-b-2 whitespace-nowrap ${
                  isActive
                    ? "text-[#ff7d42] border-[#ff7d42] bg-[#111827]/70 font-semibold"
                    : "text-[#94a3b8] border-transparent hover:text-[#e2e8f0] hover:bg-[#1e293b]/40"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 mb-1.5 rounded-md text-xs font-sans transition-colors duration-150 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] cursor-pointer"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[11px] font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#94a3b8]" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed selection:bg-[#ff7d42]/30 selection:text-white">
        <pre className="m-0 p-0 bg-transparent text-[#e2e8f0]">
          <code>{currentTab?.code}</code>
        </pre>
      </div>

      {currentTab?.notes && (
        <div className="px-4 py-2 bg-[#090d16]/70 border-t border-[#1b253b] text-xs text-[#94a3b8] font-sans">
          💡 {currentTab.notes}
        </div>
      )}
    </div>
  );
}
