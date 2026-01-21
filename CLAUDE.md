# Corpus Review - Design & Development Guidelines

## Product Overview

Corpus Review is a desktop software product for evidence analysis. It serves legal professionals, expert witnesses, investigators, and analysts who work with large, complex document sets (medical negligence, complex litigation, regulatory matters).

## Core Philosophy

**Non-AI, expert-driven.** Corpus Review makes zero AI calls. It does not automate judgment, scoring, or conclusions. It provides a disciplined environment for transparent human reasoning grounded directly in primary sources.

### What it does:
- Helps professionals organize, annotate, and reason over large document corpora
- Preserves a clear, inspectable chain from assertions to exact source locations
- Supports highlights, tagging, notes, chronologies, and cross-document links
- Emphasizes provenance, stability, and evidential grounding over automation
- Designed for early case assessment, expert review, and evidence-driven reporting

### What it explicitly does NOT do:
- No AI, no automation, no hidden prioritization
- No scoring, predictions, or "analysis engines"
- No claims of completeness or certainty on the user's behalf

## Design Tone & Voice

**Serious. Restrained. Professional. Credible.**

- Avoid hype, buzzwords, and "AI-powered" language
- Assume a skeptical, intelligent reader (experts and lawyers)
- Write copy that would feel appropriate to show to a judge or expert witness
- No testimonials, no marketing fluff, no urgency tactics

## Visual Design Principles

- Clean, minimal, professional aesthetic
- Muted color palette - no bright marketing colors
- Generous whitespace
- Typography: serif headings (Crimson Pro) for authority, clean sans-serif (Inter) for body
- No stock photos, no illustrations, no decorative elements
- Restrained use of UI components - substance over style

## Content Guidelines

### Do:
- Emphasize evidence, reasoning, and transparency
- Focus on workflow and how professionals actually use the tool
- Be direct and concise
- Use precise language

### Don't:
- Make AI claims or comparisons
- Use superlatives or marketing hyperbole ("revolutionary", "game-changing")
- Include pricing tables on the main site
- Promise outcomes or results
- Use exclamation points

## CTAs

- Primary: "Download Free Trial"
- Secondary: "Read the Philosophy" / "Learn How It Works"
- Keep CTAs calm and professional - no urgency language

## Technical Details

- **Stack:** Vite + React + TypeScript + Tailwind CSS + shadcn/ui
- **Hosting:** Vercel
- **Releases:** GitHub releases at Digital-Extensions/corpus-review-releases
- **Trial:** 14-day free trial (mention specifics only on Download page)

## Page Structure

The site follows a focused, single-purpose structure:
1. Clear headline emphasizing evidence and transparency
2. Subheadline explaining audience and purpose
3. Philosophy section (concise, one paragraph)
4. Workflow section (how professionals use it)
5. Contrast section (what it is / what it is not)
6. CTA to download

Future pages should maintain this restrained, substance-focused approach.
