"use client";

import React, { useState } from "react";
import { Play, Database, Server, Radio, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, Layers } from "lucide-react";

export function ArchitectureDiagram() {
  const [mode, setMode] = useState<"record" | "test">("record");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodeDetails: Record<string, { title: string; desc: string; role: string }> = {
    client: {
      title: "Client / Test Runner",
      role: mode === "record" ? "Traffic Origin" : "Automated Replay Engine",
      desc:
        mode === "record"
          ? "You make realistic API calls via curl, Postman, or frontend browsers to your live running Gin app."
          : "Keploy's test runner automatically replays the exact recorded HTTP request payloads into the Go application.",
    },
    app: {
      title: "Go Gin Application (Port 8080)",
      role: "System Under Test (SUT)",
      desc:
        "The standard Go Gin microservice built with 'go build -cover'. No code changes or test harness modifications are required. It operates normally.",
    },
    ebpf: {
      title: "Keploy eBPF & Socket Interceptor",
      role: "Kernel / Network Layer Hook",
      desc:
        "Intercepts ingress & egress TCP sockets non-invasively at the OS level. Keploy decodes protocols (HTTP, MongoDB wire protocol) without any SDK wrapping or monkey-patching.",
    },
    mongo: {
      title: mode === "record" ? "Live MongoDB (Port 27017)" : "Mocks Engine (Mongo Offline!)",
      role: mode === "record" ? "Actual Database" : "Zero-Infrastructure Virtual Mock",
      desc:
        mode === "record"
          ? "Receives actual BSON queries from Gin and returns real documents, while Keploy records the exact bytes into mocks.yaml."
          : "MongoDB is 100% stopped! Keploy intercepts the Go app's connection to :27017 and feeds back the exact recorded BSON packets from mocks.yaml.",
    },
    storage: {
      title: "Keploy Test Suites & Mocks",
      role: "Declarative YAML Artifacts",
      desc:
        "Stored in ./keploy/test-set-0/ (tests/test-1.yaml and mocks.yaml). Completely version-controllable and human-readable.",
    },
  };

  return (
    <div className="my-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-lg transition-all duration-300">
      {/* Header and Mode Switcher */}
      <div className="p-4 sm:p-5 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[var(--brand-orange)]" />
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Interactive Keploy Architecture Visualizer
            </h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Click nodes below to inspect kernel-level eBPF interception in action
          </p>
        </div>

        {/* Toggle Pills */}
        <div className="flex items-center bg-[var(--bg-page)] p-1 rounded-xl border border-[var(--border-color)]">
          <button
            onClick={() => setMode("record")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              mode === "record"
                ? "bg-[var(--brand-orange)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${mode === "record" ? "animate-pulse" : ""}`} />
            Record Mode
          </button>
          <button
            onClick={() => setMode("test")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              mode === "test"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            Test / Replay Mode
          </button>
        </div>
      </div>

      {/* Main Diagram Canvas */}
      <div className="p-6 relative bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-page)]">
        {/* Status banner */}
        <div
          className={`mb-6 px-4 py-2.5 rounded-xl border text-xs font-medium flex items-center justify-between ${
            mode === "record"
              ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
          }`}
        >
          <div className="flex items-center gap-2">
            {mode === "record" ? (
              <Radio className="w-4 h-4 animate-pulse text-amber-500" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            )}
            <span>
              {mode === "record"
                ? "RECORD MODE: Capturing live ingress HTTP and egress MongoDB packets via eBPF"
                : "TEST MODE: Replaying requests & zero-code mocking MongoDB (No real DB needed!)"}
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] opacity-80">
            {mode === "record" ? "keploy record -c ..." : "keploy test -c ..."}
          </span>
        </div>

        {/* Diagram Flow Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Node 1: Client */}
          <div
            onClick={() => setSelectedNode("client")}
            className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left relative ${
              selectedNode === "client"
                ? "ring-2 ring-[var(--brand-orange)] border-transparent bg-[var(--bg-surface-elevated)]"
                : "border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--brand-orange)]/60"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center mb-3">
              <Server className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-[var(--text-primary)]">
              {mode === "record" ? "cURL / Client" : "Keploy Replay"}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1 font-mono">
              {mode === "record" ? "POST /url" : "Replays test-1.yaml"}
            </div>
            <div className="mt-3 text-[10px] text-sky-500 font-medium flex items-center gap-1">
              <span>Inspect</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Node 2: Go Gin App */}
          <div
            onClick={() => setSelectedNode("app")}
            className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left relative ${
              selectedNode === "app"
                ? "ring-2 ring-[var(--brand-orange)] border-transparent bg-[var(--bg-surface-elevated)]"
                : "border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--brand-orange)]/60"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-orange-subtle)] text-[var(--brand-orange)] flex items-center justify-center mb-3">
              <span className="font-bold text-xs">GO</span>
            </div>
            <div className="text-xs font-semibold text-[var(--text-primary)]">Gin Application</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1 font-mono">:8080 (Unmodified)</div>
            <div className="mt-3 text-[10px] text-[var(--brand-orange)] font-medium flex items-center gap-1">
              <span>Inspect</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Node 3: Keploy eBPF Engine */}
          <div
            onClick={() => setSelectedNode("ebpf")}
            className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left relative ${
              selectedNode === "ebpf"
                ? "ring-2 ring-purple-500 border-transparent bg-purple-500/10"
                : "border-purple-500/30 bg-purple-500/5 hover:border-purple-500/60"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div className="text-xs font-semibold text-[var(--text-primary)]">eBPF Interceptor</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1 font-mono">Kernel Socket Hook</div>
            <div className="mt-3 text-[10px] text-purple-400 font-medium flex items-center gap-1">
              <span>Inspect eBPF</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Node 4: MongoDB / Virtual Mocks */}
          <div
            onClick={() => setSelectedNode("mongo")}
            className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left relative ${
              selectedNode === "mongo"
                ? "ring-2 ring-emerald-500 border-transparent bg-[var(--bg-surface-elevated)]"
                : "border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-emerald-500/60"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                mode === "record"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-rose-500/10 text-rose-500"
              }`}
            >
              <Database className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-[var(--text-primary)]">
              {mode === "record" ? "Live Mongo (27017)" : "Virtual Mongo Mock"}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1 font-mono">
              {mode === "record" ? "Receives BSON" : "Mongo Server Offline"}
            </div>
            <div className="mt-3 text-[10px] text-emerald-500 font-medium flex items-center gap-1">
              <span>Inspect</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Selected Node Details Drawer */}
        {selectedNode && nodeDetails[selectedNode] && (
          <div className="mt-6 p-4.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-elevated)] animate-fadeIn text-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--brand-orange)]" />
                <h4 className="font-bold text-[var(--text-primary)]">
                  {nodeDetails[selectedNode].title}
                </h4>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--bg-page)] text-[var(--brand-orange)] border border-[var(--border-color)]">
                {nodeDetails[selectedNode].role}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {nodeDetails[selectedNode].desc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
