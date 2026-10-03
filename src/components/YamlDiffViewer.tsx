"use client";

import React, { useState } from "react";
import { Check, Copy, FileCode2 } from "lucide-react";

export function YamlDiffViewer() {
  const [copied, setCopied] = useState(false);

  const diffCode = `assertions:
    noise:
+       body.ts: []       # Added: Tell Keploy to ignore dynamic timestamp
        header.Date: []   # Built-in: Ignore standard HTTP date drift`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`assertions:
    noise:
        body.ts: []
        header.Date: []`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="my-6 rounded-xl border border-[var(--border-color)] overflow-hidden bg-[#0d111c] text-[#e2e8f0] shadow-md transition-all">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#090d16] border-b border-[#1b253b] text-xs font-mono">
        <div className="flex items-center gap-2 text-[#94a3b8]">
          <FileCode2 className="w-3.5 h-3.5 text-[#ff7d42]" />
          <span className="font-medium text-[#cbd5e1]">keploy/test-set-0/tests/test-1.yaml (Diff)</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-sans transition-colors duration-150 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] cursor-pointer"
          aria-label="Copy noise rule to clipboard"
        >
          {copied ? (
            <span className="text-emerald-400 text-[11px] font-medium">Copied!</span>
          ) : (
            <span className="text-[11px]">Copy Snippet</span>
          )}
        </button>
      </div>

      <div className="p-4 font-mono text-[13px] leading-relaxed overflow-x-auto">
        <div className="text-[#94a3b8]">34:   assertions:</div>
        <div className="text-[#94a3b8]">35:       noise:</div>
        <div className="bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded -mx-2 font-semibold">
          36: +         body.ts: []
        </div>
        <div className="text-[#94a3b8]">37:           header.Date: []</div>
      </div>

      <div className="px-4 py-2.5 bg-[#090d16]/80 border-t border-[#1b253b] text-xs text-[#94a3b8] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>Adding <code className="text-emerald-300 font-mono">body.ts: []</code> suppresses false positives during replay assertions.</span>
      </div>
    </div>
  );
}
