"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const defaultFAQs: FAQItem[] = [
  {
    question: "Do I need to rewrite my Go code or add special Keploy SDK dependencies?",
    answer:
      "No! That is the core breakthrough of Keploy v2. Unlike traditional tools that require you to wrap HTTP handlers or instantiate mock clients, Keploy works at the Linux kernel/eBPF and Docker network layer. Your Go codebase remains 100% clean and vanilla.",
  },
  {
    question: "Why did my first replay test fail with a timestamp mismatch ('body.ts')?",
    answer:
      "Because Keploy performs deep, field-by-field payload diffing. When an API produces dynamic values like Unix timestamps, UUIDs, or current dates, those naturally change during replay. By declaring those fields in the 'noise' block (e.g., body.ts: []), you tell Keploy's assertion engine to verify existence while ignoring dynamic fluctuations.",
  },
  {
    question: "Why must Go binaries be built with 'go build -cover'?",
    answer:
      "The Go runtime provides native code coverage instrumentation. Compiling with '-cover' enables the binary to track which code blocks are executed during integration tests. Passing '--goCoverage' to Keploy then aggregates this data into standard Go cover profiles (e.g. 83.3% statement coverage).",
  },
  {
    question: "How does Keploy replay MongoDB queries when MongoDB is completely shut down?",
    answer:
      "Keploy acts as a transparent network proxy. During recording, Keploy stores the exact binary BSON protocol exchange (OpQuery, OpMsg, updates, documents) in mocks.yaml. During testing, when your Go Mongo driver connects to port 27017, Keploy answers the TCP connection directly, serving back the mock packets without touching any database server.",
  },
];

export function TroubleshootingFAQ({ items = defaultFAQs }: { items?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="my-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-color)]">
        <HelpCircle className="w-5 h-5 text-[var(--brand-orange)]" />
        <h3 className="text-base font-bold text-[var(--text-primary)]">
          Frequently Asked Questions & Gotchas
        </h3>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-elevated)] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--brand-orange)] transition-colors cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? "rotate-180 text-[var(--brand-orange)]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-xs leading-relaxed text-[var(--text-secondary)] border-t border-[var(--border-color)] pt-3 animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
