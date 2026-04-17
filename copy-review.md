# Corpus Review — Site Copy Review

Scope: copy on the four main pages (Home, About, Download, Contact), plus the shared Header/Footer and `index.html` meta tags.

Evaluated against `CLAUDE.md` (design/voice guidelines), the Positioning & Messaging Brief, the Terminology Guide, and the ICP Persona Deck.

Fixes are ordered by impact. Each entry cites the source file, shows the current line, explains the issue, and proposes a replacement.

---

## P0 — Positioning contradictions (fix first)

### 1. Hero H1 contradicts core positioning

**File:** `src/components/HeroSection.tsx:20–23`
**Current:**
> Evidence Analysis
> Grounded in Primary Sources

**Issue:** The positioning brief is explicit: *"It's a thinking environment, not an analysis engine."* The word "Analysis" as the dominant headline noun frames CR as the exact category the brief tells us to avoid. It's also the first thing a skeptical MEW or agency buyer reads.

**Suggested rewrite (pick one):**
- `Evidence Work, / Grounded in Primary Sources`
- `A Workspace for Evidence, / Grounded in Primary Sources`
- `Disciplined Review of / Primary-Source Evidence`

Pairs cleanly with the existing subhead and keeps the rhythm of the two-line display type.

---

### 2. Philosophy section scare-quotes "analysis"

**File:** `src/components/PhilosophySection.tsx:17–22`
**Current:**
> We offer no scoring, no prioritization, no "analysis" beyond what you explicitly create.

**Issue:** Scare-quoting "analysis" reads as defensive and mildly sneering — the opposite of the "confident but understated" tone the brief prescribes. It also begs the question of what CR *does* offer, which isn't answered in the same sentence.

**Suggested rewrite:**
> We offer no scoring, no prioritisation, and no machine-generated analysis. The software provides structure for your reasoning — highlights, annotations, chronologies, and source-linking — but the reasoning remains yours, and the responsibility remains with you.

(Drops the scare quotes, swaps "cross-references" → "source-linking" per the terminology guide, cuts one em-dash clause.)

---

### 3. "Cross-references" violates terminology guide

**Files:**
- `src/components/PhilosophySection.tsx:19–21` — `"…highlights, annotations, chronologies, cross-references…"`
- `src/components/WorkflowSection.tsx:41` — `"CR's highlights, annotations, and cross-references make every piece of evidence relocatable."`
- Same concept appears implicitly in `ContrastSection.tsx`.

**Issue:** The terminology guide lists "cross-referencing" under **Don't use** (reason: "too vague") and mandates **source-linking** as the canonical term.

**Fix:** Replace `cross-references` → `source-linking` everywhere in marketing copy. The UI may retain its own labels.

---

### 4. "Pristine Knowledge" — the doctrinal anchor — is entirely absent

**Files:** Home (all sections), About page, meta tags.

**Issue:** The positioning brief names Pristine Knowledge as "the philosophical anchor for CR's entire ecosystem" and explicitly mirrors the Basecamp / Shape Up pattern (tool + company + doctrine). Today the site has no surface reference to it. This is the single biggest strategic gap between site copy and the brief.

**Suggested fix (low-risk insertion):** Add a short paragraph in the Philosophy section closing the loop, e.g.:

> We call this **pristine knowledge**: an inviolable source of truth. The corpus is never altered. Every annotation lives separately from the original. Every assertion traces back to its source — intact, stable, and auditable.

This replaces the italic closing line (`src/components/PhilosophySection.tsx:24–27`) with something that carries real doctrinal weight.

---

## P1 — Voice, tone, and guideline violations

### 5. Workflow H2 is flat; descriptions read salesy

**File:** `src/components/WorkflowSection.tsx:252–257` and the `painPoints` array
**Current H2:** "Problems Corpus Review Solves"
**Current pattern:** Each description ends with `"CR solves this with…"` / `"CR's highlights…"` / `"CR detects source file changes…"`

**Issue:** "Problems X Solves" is the most generic SaaS frame there is — and the repeated "CR [verb]…" refrain turns the section into feature marketing. The quotes are the strongest content on the page; let them do the work, then describe the CR response in one restrained sentence that doesn't start with the product name.

**Suggested rewrites:**

H2: `The Work, and Where It Breaks Down` or `What Experts Run Into`

Example rewrite (volume problem):
> Expert witnesses receive massive, disorganised document dumps and must absorb them under deadline. Every hour spent orienting to the corpus is an hour not spent reasoning about it. In Corpus Review, the corpus is indexed, tagged, and searchable from the moment you point at the folder.

(Same structural move across all five pain points: lead with the practitioner's reality, close with a single sentence describing the CR response — without "CR solves…".)

---

### 6. Hero subhead "No account required" is a mass-market signal

**File:** `src/components/HeroSection.tsx:48–50`
**Current:** `Windows & macOS · No account required`

**Issue:** The positioning brief lists "Free trial, no credit card" under "Do less of (mass-market signals)." "No account required" is the same register. For an agency-issued premium tool, this flattens the prestige cue.

**Suggested rewrite:**
> `Windows & macOS · Air-gapped · Local-first`

This swaps a consumer signal for two of the brief's mandated premium differentiators. Keeps line length. The "no account required" fact can live on the Download page.

---

### 7. Hero micro-copy "before positions harden and costs escalate"

**File:** `src/components/HeroSection.tsx:31–33`
**Current:**
> Designed for early case assessment, expert review, and evidence-driven reporting—before positions harden and costs escalate.

**Issue:** "Before positions harden and costs escalate" is punchy but reads as copywriter prose rather than practitioner prose. The brief says: *"write like a practitioner, not a marketer."* It also promises an outcome ("costs escalate") which CLAUDE.md flags as something to avoid.

**Suggested rewrite:**
> Designed for early case assessment, expert review, and evidence-driven reporting.

Let the nouns do the work. Cut the clause.

---

### 8. Quick Clips caption is factually inconsistent

**File:** `src/components/QuickClipsSection.tsx:93–95` and `:40–43`
**Current caption:** `Short, task-focused demonstrations. Each under three minutes.`
**Video #3 duration:** `3:00`

**Issue:** 3:00 is not "under three minutes." Small, but this is a product for people trained to catch small inconsistencies.

**Suggested rewrite:** `Short, task-focused demonstrations. Each three minutes or less.`

---

### 9. Quick Clips title casing is inconsistent

**File:** `src/components/QuickClipsSection.tsx:21, 29, 37`
**Current titles:**
- `Keeping track of what matters across thousands of pages` (sentence case)
- `Building a defensible chronology from scattered documents` (sentence case)
- `Turning Messy Medical Records Into Defensible Chronologies` (title case)

**Fix:** Pick one and apply it. Sentence case is more in keeping with the restrained tone. Rewrite #3 as:
> `Turning messy medical records into defensible chronologies`

---

### 10. Header nav label doesn't match destination heading

**Files:** `src/components/Header.tsx:26–30` and `src/components/WorkflowSection.tsx:252–253`
**Current:** Nav link "How It Works" → anchors to `#workflow` → section H2 is "Problems Corpus Review Solves"

**Issue:** The nav promises one thing, the destination is a different thing. Combined with fix #5 (renaming the H2), align these.

**Suggested fix:** Rename the nav item to match the new H2, e.g. `The Work` or `Where Review Breaks`, depending on which H2 you choose.

---

## P2 — Strategic gaps and additions

### 11. "Air-gapped" / "Local-first" are invisible on the home page

**Current state:** Neither term appears anywhere on Home, About, Download, or Contact.

**Issue:** The brief mandates these as core terms, and the ICP deck names "Data security / PHI / cloud upload = compliance risk" as a top-three buying motivation for MEWs. The zero-AI stance is present on the site; the zero-cloud stance is not.

**Suggested fix:** Add a short security band, either inside the Philosophy section or as a sibling panel to "What It Is. What It Is Not." Three lines:

> **Air-gapped.** No network connection required. No data leaves the machine.
>
> **Local-first.** Every corpus, every annotation, every report lives on your drive.
>
> **Zero cloud exposure.** Zero PHI in third-party systems. Zero compliance anxiety.

---

### 12. About page omits the zero-AI / air-gapped differentiators

**File:** `src/pages/About.tsx:22–42`

**Issue:** The About page talks about "structured reasoning, traceability, and disciplined organization" — all true, but generic. Nothing on the page would tell a skeptical buyer why Digital Extensions is different from any other legal-tech shop. The zero-AI posture and the air-gapped architecture are the two facts that *are* different.

**Suggested addition** (as a new paragraph after the existing third paragraph):

> Our tools are deliberately non-AI. We do not score, summarise, or infer on our users' behalf. They are also air-gapped and local-first — no cloud upload, no hidden telemetry. The foundation of expert judgement should be evidence, not a black box.

---

### 13. Download page "No account required" and "14-day"

**File:** `src/pages/Download.tsx:47–49`
**Current:** `14-day free trial. Fully functional. No account required.`

**Issue:** CLAUDE.md explicitly permits trial specifics on this page, so "14-day" is fine. "Fully functional" is fine. "No account required" is the mass-market signal again — but keeping it *only* on the Download page (per fix #6) is a reasonable trade.

**Optional refinement:**
> `14-day free trial. Fully functional. Air-gapped from install.`

This swaps the mass-market cue for a trust cue, still accurate.

---

### 14. Contact page intro leaves the ICP blurry

**File:** `src/pages/Contact.tsx:100–105`
**Current:**
> Whether you are evaluating Corpus Review for a practice, a chambers, or an investigation team, we are happy to answer questions about the product, discuss licensing, or arrange a demonstration.

**Issue:** "Practice, chambers, investigation team" is a reasonable spread but omits the two buyers the strategy docs name as most important: **medical expert witnesses** and **expert witness agencies**. Deal size for agencies is 10x that of individuals.

**Suggested rewrite:**
> Whether you are evaluating Corpus Review as an individual expert, for an expert witness agency, a chambers, or an investigation team, we are happy to answer questions about the product, discuss licensing, or arrange a demonstration.

---

### 15. Contrast list is accurate but under-powered

**File:** `src/components/ContrastSection.tsx:4–16`

**Issue:** The "is / is not" lists are solid and well-aligned with philosophy. But neither column mentions the two differentiators that actually matter to a risk-averse buyer: air-gapped architecture and non-destructive originals. One more item on each side would sharpen it.

**Suggested additions:**
- *Corpus Review is*: add `Air-gapped and local-first — the corpus never leaves your machine`
- *Corpus Review is not*: add `A cloud service that processes your records on someone else's infrastructure`

---

## P3 — Line-level polish

### 16. "Organisation" vs "organization" inconsistency

**File:** `src/pages/Contact.tsx`
- Line 16: schema error message says `"Organisation must be…"` (UK)
- Line 145: label reads `Firm or Organisation` (UK)
- Line 16: schema field key is `organization` (US)
- Line 29: state key `organization` (US)

**Issue:** The user-facing copy is UK English, the code variables are US English — that's fine and normal. But confirm the whole site leans UK (the Contact page does). Check `index.html`, About, etc., for consistency. Right now the Contact page is UK; the rest of the site is a mix (e.g. "organize" appears in About at line 26: "disciplined organization").

**Fix:** Pick one spelling convention and apply across all user-facing copy. Given the UK agency prospects named in the ICP deck (Bush & Co, Premex, etc.), UK spelling is defensible. If going UK: `organization` → `organisation`, `analyze` → `analyse`, `prioritization` → `prioritisation` in Philosophy (line 18).

---

### 17. `og:title` and `<title>` disagree

**File:** `index.html:8` vs `:16–18`
- `<title>`: `Corpus Review — Expert Review and Evidence-driven Reporting`
- `og:title`: `Corpus Review — Evidence Analysis Grounded in Primary Sources`

**Issue:** Two different product straplines in two meta fields two lines apart. Also, the `og:title` contains "Evidence Analysis" — same issue as fix #1. When that's corrected, update both tags together.

**Suggested fix:** Pick one strapline (matching the new hero) and use it for both.

---

### 18. CTA subtitle duplicates hero device list

**Files:**
- `HeroSection.tsx:48` → `Windows & macOS · No account required`
- `CtaSection.tsx:24–26` → `Available for Windows and macOS`

**Issue:** Minor, but the bottom CTA repeating the top CTA's device info is the kind of thing that reads "template" not "craft."

**Suggested rewrite** for CtaSection: drop the device line, or replace with a trust signal like `No cloud. No account handoff. Just the download.`

---

### 19. Footer company attribution reads a bit redundant with Contact bottom band

**Files:** `src/components/Footer.tsx:29–39` and `src/pages/Contact.tsx:242–255`

**Issue:** The Contact page bottom band and the global footer both say "Corpus Review is built by Digital Extensions…" The terminology guide says to use Digital Extensions *sparingly* in customer-facing content. Having it in both is slight over-use.

**Suggested fix:** Keep the global footer mention; remove or rewrite the Contact bottom band (`src/pages/Contact.tsx:242–256`) to be about something else, e.g. a link to the Philosophy section for visitors who arrived on Contact first.

---

### 20. Philosophy opening clause is a bit formal for the brief's "practitioner voice"

**File:** `src/components/PhilosophySection.tsx:10–15`
**Current:**
> Corpus Review is built on a simple premise: in matters of consequence—litigation, expert testimony, regulatory review—conclusions must trace unambiguously to their sources.

**Issue:** "Built on a simple premise" is a construction more common in corporate about-pages than practitioner prose. Decent but worth tightening.

**Suggested rewrite:**
> In matters of consequence — litigation, expert testimony, regulatory review — conclusions must trace unambiguously to their sources. Every assertion should be inspectable. Every inference should be visible. Corpus Review exists to enforce this discipline, not to replace it.

(Cuts the meta-framing; leads with the principle.)

---

## Summary of recommended order

1. Fix the hero H1 (fix #1) — single biggest positioning lift, minutes of work.
2. Swap "cross-references" for "source-linking" and drop scare quotes in Philosophy (fixes #2, #3).
3. Add an air-gapped / local-first surface somewhere on Home (fix #11).
4. Add Pristine Knowledge to Philosophy (fix #4).
5. Rework Workflow H2 and the "CR solves this…" refrain (fix #5).
6. Align nav label with the new H2 (fix #10).
7. Polish the rest in order.

Most of the P0 and P1 items are small text edits — a single afternoon of copy work would move the site materially closer to the positioning brief without any design changes.
