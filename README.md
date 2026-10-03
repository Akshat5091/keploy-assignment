# Record & Replay a Go API with Keploy 🚀

> **Keploy DevRel Assignment Submission**  
> An interactive, editorial-grade developer tutorial demonstrating how Keploy intercepts network sockets using eBPF to generate zero-code regression tests and mocks for a Go (Gin) + MongoDB microservice.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Vercel-success?style=flat-square&logo=vercel)](https://akshat-keploy-demo.vercel.app)
[![Next.js](https://img.shields.io/badge/Framework-Next.js%2016-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MDX](https://img.shields.io/badge/Authoring-MDX-yellow?style=flat-square&logo=mdx)](https://mdxjs.com/)
[![Design System](https://img.shields.io/badge/Theme-Keploy%20Docs%20Design-FF914D?style=flat-square)](https://keploy.io/docs)

---

## 🔗 Submission Links

- **🌐 Live Documentation Site**: [https://akshat-keploy-demo.vercel.app](https://akshat-keploy-demo.vercel.app)
- **📦 GitHub Repository**: [https://github.com/Akshat5091/keploy-assignment](https://github.com/Akshat5091/keploy-assignment)

---

## 💡 Overview & DevRel Philosophy

Great developer documentation does not merely list terminal commands—it clarifies the **underlying mental model**, builds intuition, and eliminates developer friction before it occurs.

This submission was designed around three core DevRel principles:
1. **Explain the "Why" Before the "How"**: Demystifies Keploy's eBPF/transport-layer socket capture, explaining why code modification or heavy SDK instrumentation is unnecessary.
2. **First-Class Interactive Visuals**: Rather than static screenshots that age poorly, key architectural concepts are explained with purpose-built interactive components:
   - **Interactive Architecture Visualizer**: Live toggle between **Record Mode** and **Test/Replay Mode**, illustrating kernel-level eBPF socket capture and zero-infrastructure replay.
   - **Interactive Keploy Playground**: Step-by-step simulator where readers can simulate `keploy record`, observe the realistic timestamp mismatch (`body.ts`), add declarative noise rules, and achieve 100% pass rate with celebratory confetti.
   - **Annotated YAML Diff Inspector**: Visual diff displaying how `noise` assertions eliminate non-deterministic test failures without writing mock code.
3. **Restrained, Editorial Aesthetics**: Faithful implementation of modern documentation standards (system-synchronized dark/light modes, accessible contrast, responsive sticky Table of Contents with scroll-spy, and one-click code copy buttons).

---

## 🛠️ Tech Stack & Engineering Decisions

| Layer | Choice | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | High performance, static prerendering, SEO optimization |
| **Authoring** | MDX (`@next/mdx`) | Native markdown documentation with embedded custom React components |
| **Styling** | Tailwind CSS v4 | Lightweight CSS tokens, dark/light theme switching without UI bloat |
| **Icons** | Lucide React | Consistent, accessible icon system |
| **Type Safety** | Strict TypeScript | Robust component interfaces and props validation |
| **Accessibility** | Semantic HTML + ARIA | Keyboard navigable tabs, screen-reader friendly callouts |

---

## 🧭 Tutorial Syllabus & Concepts Covered

- **Prerequisites & Architecture**: Docker Network isolation (`keploy-network`) and container orchestration.
- **Step 1: Setup MongoDB & Gin Application**: Understanding the URL Shortener endpoints (`POST /url` and `GET /:param`).
- **Step 2: Recording Wire Traffic**: Running `keploy record` to intercept inbound HTTP and outbound MongoDB TCP socket frames.
- **Step 3: Deep Dive into Generated Artifacts**:
  - `test-1.yaml`: Ingress HTTP request/response contract.
  - `mocks.yaml`: Binary MongoDB wire protocol frames (`OpMsg`/`OpQuery` and BSON data) captured for offline simulation.
- **Step 4: Replaying Without Real MongoDB**: Stopping the database container completely and diagnosing the initial timestamp regression (`body.ts`).
- **Step 5: Declarative Noise Filtering**: Adding `body.ts: []` to achieve a 100% stable pass.
- **Step 6: Native Go Code Coverage**: Running `go build -cover` and `--goCoverage` to achieve 83.3% genuine statement coverage.

---

## 🚀 Running Locally

### Prerequisites
- Node.js `20+` or `22+`
- npm / pnpm / yarn

### Quickstart

```bash
# 1. Clone the repository
git clone https://github.com/Akshat5091/keploy-assignment.git
cd keploy-assignment

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

Verify static compilation:

```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```text
keploy-assignment/
├── src/
│   ├── app/
│   │   ├── globals.css            # Dark/light theme design tokens and custom scrollbars
│   │   ├── layout.tsx             # Root layout, theme scripts, Navbar, Footer & SEO
│   │   └── page.mdx               # Full tutorial content authored directly in MDX
│   ├── components/
│   │   ├── ArchitectureDiagram.tsx# Interactive eBPF socket intercept visualizer
│   │   ├── Badge.tsx              # Status chips and pill badges
│   │   ├── Callout.tsx            # Semantic callout boxes (Why, Info, Warning, Aha)
│   │   ├── CodeBlock.tsx          # Syntax container with one-click copy button
│   │   ├── CodeTabs.tsx           # Tabbed code switcher (Docker vs Native Go)
│   │   ├── Footer.tsx             # Clean footer with project links
│   │   ├── Icons.tsx              # Clean SVG icons (GitHub mark, etc.)
│   │   ├── InteractiveTestRunner.tsx# 4-stage interactive Record -> Fail -> Fix -> Pass simulator
│   │   ├── KeyConceptCard.tsx     # Feature highlight cards
│   │   ├── Navbar.tsx             # Sticky header with reading progress bar & theme toggle
│   │   ├── Step.tsx               # Numbered tutorial step containers
│   │   ├── TableOfContents.tsx    # Scroll-spy floating TOC with reading time estimate
│   │   ├── ThemeToggle.tsx        # Anti-FOUC Dark/Light mode switcher with localStorage
│   │   ├── TroubleshootingFAQ.tsx # Expandable accordion for common gotchas
│   │   └── YamlDiffViewer.tsx     # Visual diff for noise rules
│   └── mdx-components.tsx         # MDX component registry and markdown typography bindings
├── public/
│   └── images/                    # Authentic Keploy quickstart screenshots and coverage reports
├── next.config.ts                 # Next.js 16 + MDX build configuration
├── package.json                   # Project metadata and dependencies
└── tsconfig.json                  # TypeScript compiler settings
```

---

## 👤 Author

- **Candidate**: Akshat ([@Akshat5091](https://github.com/Akshat5091))
- **Email**: akshatnagori04@gmail.com
- **Role**: Keploy DevRel Candidate Assignment
