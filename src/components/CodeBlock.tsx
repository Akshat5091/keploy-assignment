"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  children?: React.ReactNode;
  code?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  children,
  code: directCode,
  language = "bash",
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract raw text if children is a string or react node
  const textContent =
    directCode ||
    (typeof children === "string"
      ? children
      : React.Children.toArray(children)
          .map((child) => (typeof child === "string" ? child : ""))
          .join(""));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textContent.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const getLanguageLabel = (lang: string) => {
    const map: Record<string, string> = {
      bash: "BASH",
      sh: "SHELL",
      shell: "SHELL",
      zsh: "ZSH",
      go: "GO",
      yaml: "YAML",
      yml: "YAML",
      json: "JSON",
      dockerfile: "DOCKER",
      docker: "DOCKER",
    };
    return map[lang.toLowerCase()] || lang.toUpperCase();
  };

  return (
    <div className="my-5 rounded-xl border border-[var(--border-color)] overflow-hidden bg-[#0d111c] text-[#e2e8f0] shadow-md group transition-all duration-200">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#090d16] border-b border-[#1b253b] text-xs font-mono">
        <div className="flex items-center gap-2 text-[#94a3b8]">
          {language === "bash" || language === "sh" || language === "shell" ? (
            <Terminal className="w-3.5 h-3.5 text-[#ff7d42]" />
          ) : (
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff7d42]/70 inline-block" />
          )}
          <span className="font-medium text-[#cbd5e1]">{filename || getLanguageLabel(language)}</span>
        </div>

        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-[#1e293b] text-[#94a3b8]">
              {getLanguageLabel(language)}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-sans transition-colors duration-150 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] cursor-pointer"
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
      </div>

      {/* Code Body */}
      <div className="relative p-4 overflow-x-auto text-[13px] font-mono leading-relaxed selection:bg-[#ff7d42]/30 selection:text-white">
        <pre className="m-0 p-0 bg-transparent text-[#e2e8f0]">
          <code>{children || textContent}</code>
        </pre>
      </div>
    </div>
  );
}
