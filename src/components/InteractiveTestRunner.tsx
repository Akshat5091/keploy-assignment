"use client";

import React, { useState } from "react";
import { Play, CheckCircle2, XCircle, RotateCcw, Sparkles, Terminal, Sliders, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export function InteractiveTestRunner() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [recordedCalls, setRecordedCalls] = useState<string[]>([]);
  const [testStatus, setTestStatus] = useState<"idle" | "running" | "failed" | "passed">("idle");
  const [noiseConfigured, setNoiseConfigured] = useState<boolean>(false);
  const [coverageReported, setCoverageReported] = useState<boolean>(false);

  const handleRecordCall = (endpoint: string) => {
    if (!recordedCalls.includes(endpoint)) {
      setRecordedCalls((prev) => [...prev, endpoint]);
    }
  };

  const handleRunTest = () => {
    setTestStatus("running");
    setTimeout(() => {
      if (noiseConfigured) {
        setTestStatus("passed");
        setCoverageReported(true);
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch {
          // ignore if canvas not supported
        }
      } else {
        setTestStatus("failed");
      }
    }, 900);
  };

  const handleReset = () => {
    setActiveStep(1);
    setRecordedCalls([]);
    setTestStatus("idle");
    setNoiseConfigured(false);
    setCoverageReported(false);
  };

  return (
    <div className="my-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-xl transition-all duration-300">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-color)] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-orange-subtle)] text-[var(--brand-orange)] flex items-center justify-center">
            <Terminal className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              Interactive Keploy Playground
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Experience the exact Record → Fail on Timestamp → Fix Noise → Pass workflow
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)] rounded-lg transition-colors cursor-pointer border border-[var(--border-color)]"
          title="Reset Playground"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Progress Steps Header */}
      <div className="grid grid-cols-3 border-b border-[var(--border-color)] bg-[var(--bg-page)] text-xs">
        <button
          onClick={() => setActiveStep(1)}
          className={`py-3 px-4 font-semibold text-center border-b-2 transition-all cursor-pointer ${
            activeStep === 1
              ? "border-[var(--brand-orange)] text-[var(--brand-orange)] bg-[var(--bg-surface)]"
              : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          1. Record Calls {recordedCalls.length > 0 && `(${recordedCalls.length}/2)`}
        </button>
        <button
          onClick={() => setActiveStep(2)}
          className={`py-3 px-4 font-semibold text-center border-b-2 transition-all cursor-pointer ${
            activeStep === 2
              ? "border-[var(--brand-orange)] text-[var(--brand-orange)] bg-[var(--bg-surface)]"
              : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          2. Execute Test & Mismatch
        </button>
        <button
          onClick={() => setActiveStep(3)}
          className={`py-3 px-4 font-semibold text-center border-b-2 transition-all cursor-pointer ${
            activeStep === 3
              ? "border-[var(--brand-orange)] text-[var(--brand-orange)] bg-[var(--bg-surface)]"
              : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          3. Mask Noise & Pass
        </button>
      </div>

      {/* Step Content */}
      <div className="p-5 sm:p-6">
        {/* STEP 1: RECORDING */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              In record mode (<code className="text-[var(--brand-orange)]">keploy record</code>), Keploy intercepts your app&apos;s inbound HTTP calls and egress Mongo queries. Click below to fire realistic API calls:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleRecordCall("POST /url")}
                disabled={recordedCalls.includes("POST /url")}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  recordedCalls.includes("POST /url")
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-[var(--border-color)] bg-[var(--bg-surface-elevated)] hover:border-[var(--brand-orange)]"
                }`}
              >
                <div>
                  <div className="text-xs font-mono font-bold">POST /url</div>
                  <div className="text-[11px] opacity-75 mt-0.5">Shorten &apos;https://google.com&apos;</div>
                </div>
                {recordedCalls.includes("POST /url") ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
                )}
              </button>

              <button
                onClick={() => handleRecordCall("GET /Lhr4BWAi")}
                disabled={recordedCalls.includes("GET /Lhr4BWAi")}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  recordedCalls.includes("GET /Lhr4BWAi")
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-[var(--border-color)] bg-[var(--bg-surface-elevated)] hover:border-[var(--brand-orange)]"
                }`}
              >
                <div>
                  <div className="text-xs font-mono font-bold">GET /Lhr4BWAi</div>
                  <div className="text-[11px] opacity-75 mt-0.5">Redirect to original URL</div>
                </div>
                {recordedCalls.includes("GET /Lhr4BWAi") ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
                )}
              </button>
            </div>

            {/* Generated YAML Status Card */}
            {recordedCalls.length > 0 && (
              <div className="mt-4 p-4 rounded-xl border border-[var(--border-color)] bg-[#0d111c] text-[#e2e8f0] font-mono text-xs">
                <div className="text-[11px] text-[#ff7d42] font-semibold mb-2">
                  ✨ Captured Keploy Artifacts Generated:
                </div>
                <div className="space-y-1 text-[11px] text-[#94a3b8]">
                  {recordedCalls.includes("POST /url") && (
                    <div>✓ ./keploy/test-set-0/tests/test-1.yaml (HTTP POST & assertions)</div>
                  )}
                  {recordedCalls.includes("GET /Lhr4BWAi") && (
                    <div>✓ ./keploy/test-set-0/tests/test-2.yaml (HTTP GET & 302 redirect)</div>
                  )}
                  <div>✓ ./keploy/test-set-0/mocks.yaml (Captured MongoDB wire-protocol BSON calls)</div>
                </div>
              </div>
            )}

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setActiveStep(2)}
                disabled={recordedCalls.length === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Proceed to Replay Tests</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: TEST REPLAY & REALISTIC FAIL */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl border border-sky-500/20 bg-sky-500/10 text-xs text-sky-600 dark:text-sky-400">
              💡 <strong>Notice:</strong> MongoDB can be completely stopped now. Keploy will mock MongoDB at the socket level. Click below to run <code className="font-mono">keploy test</code>:
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRunTest}
                disabled={testStatus === "running"}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{testStatus === "running" ? "Running Replay..." : "Run keploy test"}</span>
              </button>
            </div>

            {/* Terminal output simulation */}
            {testStatus !== "idle" && (
              <div className="rounded-xl border border-[#1e293b] bg-[#090d16] text-[#e2e8f0] p-4 font-mono text-xs overflow-x-auto">
                <div className="text-[10px] text-[#64748b] mb-2">$ keploy test -c &quot;./test-app-url-shortener&quot;</div>

                {testStatus === "running" && (
                  <div className="text-amber-400 animate-pulse">Running test-set-0 (2 tests)...</div>
                )}

                {testStatus === "failed" && (
                  <div className="space-y-2">
                    <div className="text-rose-400 font-bold flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" />
                      <span>Test Failed: test-1 (POST /url)</span>
                    </div>
                    <div className="text-[#94a3b8] text-[11px] pl-5 space-y-1">
                      <div>Diff Result: Field mismatch at <span className="text-rose-300">&apos;body.ts&apos;</span></div>
                      <div className="text-rose-400/90">- Expected: 1718943885198315028</div>
                      <div className="text-emerald-400/90">+ Actual:   1718943921004123891</div>
                      <div className="text-amber-400 text-[10px] mt-2">
                        ⚠️ Reason: Timestamp is dynamically generated at runtime. Keploy caught the regression, but this is expected noise!
                      </div>
                    </div>
                  </div>
                )}

                {testStatus === "passed" && (
                  <div className="space-y-2">
                    <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Test Suite: test-set-0 PASSED (2/2 Passed)</span>
                    </div>
                    <div className="text-[#94a3b8] text-[11px] pl-5 space-y-1">
                      <div>✓ test-1: Passed (Timestamp ignored via noise assertion)</div>
                      <div>✓ test-2: Passed (302 Redirect verified)</div>
                      {coverageReported && (
                        <div className="text-sky-400 font-bold mt-2">
                          🎯 Go Statement Test Coverage: 83.3% of statements
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {testStatus === "failed" && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Fix with Noise Assertion in Step 3</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: MASK NOISE & 100% PASS */}
        {activeStep === 3 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/10 text-xs text-purple-600 dark:text-purple-400">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>The DevRel Solution: Declarative Noise Filtering</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Tell Keploy to ignore dynamic runtime fields like timestamps or random UUIDs by adding them under <code className="font-mono">assertions.noise</code> in <code className="font-mono">test-1.yaml</code>.
              </p>
            </div>

            {/* Toggle switch for Noise */}
            <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[var(--text-primary)]">
                  Add &apos;body.ts&apos; to assertions.noise
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  Instructs Keploy assertion engine to bypass exact timestamp matching
                </div>
              </div>
              <button
                onClick={() => setNoiseConfigured(!noiseConfigured)}
                className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                  noiseConfigured ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 absolute top-0.5 ${
                    noiseConfigured ? "left-6.5" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Re-run button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleRunTest}
                className="px-4.5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Re-run Test Suite with Noise Rule</span>
              </button>
            </div>

            {/* Success Banner */}
            {testStatus === "passed" && (
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-600 dark:text-emerald-400 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>All Tests Passed! 🎉 (Coverage: 83.3%)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
                  Keploy successfully validated the application contract against zero-code database mocks and provided full Go statement coverage without writing a single line of manual unit tests!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
