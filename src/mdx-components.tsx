import type { MDXComponents } from "mdx/types";
import React from "react";
import { Callout } from "@/components/Callout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { InteractiveTestRunner } from "@/components/InteractiveTestRunner";
import { CodeTabs } from "@/components/CodeTabs";
import { CodeBlock } from "@/components/CodeBlock";
import { Step, StepList } from "@/components/Step";
import { Badge } from "@/components/Badge";
import { KeyConceptCard } from "@/components/KeyConceptCard";
import { YamlDiffViewer } from "@/components/YamlDiffViewer";
import { TroubleshootingFAQ } from "@/components/TroubleshootingFAQ";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Custom interactive components available without imports in MDX
    Callout,
    ArchitectureDiagram,
    InteractiveTestRunner,
    CodeTabs,
    CodeBlock,
    Step,
    StepList,
    Badge,
    KeyConceptCard,
    YamlDiffViewer,
    TroubleshootingFAQ,

    // Markdown HTML overrides
    h1: ({ children, id }) => (
      <h1
        id={id}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mt-6 mb-4"
      >
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2
        id={id}
        className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight mt-12 mb-4 pb-2 border-b border-[var(--border-color)] scroll-mt-24 group flex items-center justify-between"
      >
        <span>{children}</span>
        {id && (
          <a
            href={`#${id}`}
            className="opacity-0 group-hover:opacity-100 text-[var(--brand-orange)] text-sm font-mono transition-opacity ml-2"
            aria-label="Link to section"
          >
            #
          </a>
        )}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3
        id={id}
        className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight mt-8 mb-3 scroll-mt-24"
      >
        {children}
      </h3>
    ),
    h4: ({ children, id }) => (
      <h4
        id={id}
        className="text-base font-semibold text-[var(--text-primary)] mt-6 mb-2"
      >
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] my-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="my-4 space-y-2 text-sm sm:text-base text-[var(--text-secondary)] list-disc pl-5">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 space-y-2 text-sm sm:text-base text-[var(--text-secondary)] list-decimal pl-5">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="my-5 border-l-4 border-[var(--brand-orange)] bg-[var(--bg-surface-elevated)] p-4 rounded-r-xl italic text-sm text-[var(--text-secondary)]">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      // Inline code
      if (!className) {
        return (
          <code className="px-1.5 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--brand-orange)] border border-[var(--border-color)] font-mono text-[13px]">
            {children}
          </code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => {
      return (
        <div className="my-5 rounded-xl border border-[var(--border-color)] overflow-hidden bg-[#0d111c] text-[#e2e8f0] shadow-md">
          <div className="px-4 py-3 overflow-x-auto text-[13px] font-mono leading-relaxed">
            {children}
          </div>
        </div>
      );
    },
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-[var(--border-color)]">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-[var(--bg-surface-elevated)] border-b border-[var(--border-color)] text-[var(--text-primary)] font-semibold">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)]">
        {children}
      </tbody>
    ),
    tr: ({ children }) => <tr className="hover:bg-[var(--bg-surface-elevated)]/50 transition-colors">{children}</tr>,
    th: ({ children }) => <th className="p-3.5 font-bold">{children}</th>,
    td: ({ children }) => <td className="p-3.5">{children}</td>,
    hr: () => <hr className="my-10 border-[var(--border-color)]" />,
    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-[var(--brand-orange)] font-medium underline underline-offset-4 hover:text-[var(--brand-orange-hover)] transition-colors inline-flex items-center gap-0.5"
        >
          {children}
        </a>
      );
    },
  };
}
