# TaxMax AI 
### APM Assignment | AI-Enabled Tax Feature | FY 2024–25

---

## What I Built

**TaxMax AI** is a two-part AI-powered feature for a tax product:

1. **Deduction Finder**: Users input their salary, HRA, investments (80C, 80D, NPS, etc.), and liabilities. The tool calculates their current tax, identifies missed deductions, and quantifies the exact rupee savings available — in real time.

2. **Future Tax Planner**: Users set goals (corpus target, monthly surplus, risk appetite). The AI generates a personalised, section-wise investment roadmap showing *which* instruments to buy, *how much*, and *why* — optimised for tax efficiency.

The full prototype is a working React app (6-step wizard) with live tax computation, missed-deduction alerts, and an AI-generated action plan. It runs entirely client-side, with the tax logic powered by a `computeAnalysis()` function I generated with a single Claude prompt.

---

## Specific prompts that worked well:

- *Persona generation*: `"Create 3 Indian taxpayer personas (₹8L–₹30L income) with pain points, goals, and tech savviness. Output as structured JSON."` → Claude produced nuanced, realistic personas (Priya the Bengaluru engineer, Ramesh the Mumbai consultant, Anita the Pune business owner) in under 15 seconds. These directly informed the 6-step flow design.

- *Tax logic generation*: `"Write a JS function that computes Indian income tax for FY2024–25 old regime — all slabs, 4% cess, 80C/80D/80CCD deductions — and returns taxableIncome, tax, effectiveRate."` → Working, accurate code on the first attempt. Saved ~2 hours of documentation parsing.

- *UX copy variants*: `"Write 5 A/B test variants of the CTA for a tax deduction finder. Under 12 words. Tone: urgent but trustworthy."` → Generated instantly; I picked the winner and moved on.

---

## What Failed

**1. First AI-generated tax logic had calculation errors.** The initial version incorrectly computed tax for certain income ranges and gave wrong savings estimates for a few test cases. I had to manually review the formulas and correct the bracket logic.

**2. Persona assumptions were too generic initially.** The first prompt gave me urban-tech-savvy users only. I added a constraint: `"Include one semi-urban user with no prior investment knowledge"` — this surfaced the key insight that the UX needed *education tooltips* alongside deduction fields, not just input boxes.

---

## AI Cycle Reduction — By the Numbers

| Task | Traditional Estimate | AI-Assisted Actual |
|---|---|---|
| Persona research | 3–5 days | 15 minutes |
| UX flow design | 1–2 days | 2 hours |
| Tax logic coding | 4–6 hours | 20 minutes |
| Copy variants (A/B) | 2 hours | 5 minutes |
| Slide deck | 3–4 hours | 45 minutes |
| **Total** | **~8 days** | **~4 hours** |

---

## Team Coordination Strategy

In a real team setting, I would use the following AI-first workflow:

- **Discovery**: PM uses Claude to synthesise user interview notes → themes → HMW statements in 30 minutes instead of 3 days
- **Design**: Designer uses Lovable for rapid prototyping; PM reviews and iterates via natural language
- **Engineering**: Dev uses Cursor / Claude Code to scaffold the feature; PM writes the acceptance criteria *as a Claude prompt*, which engineers refine into test cases
- **Analytics**: Claude weekly digest on Mixpanel funnel data → auto-generated hypotheses for A/B tests → LaunchDarkly ships variants

The PM's role shifts from *coordinator of slow handoffs* to *curator of AI outputs* — reviewing, selecting, and refining rather than waiting.

---

## Key Insight

The biggest unlock wasn't any single prompt — it was **using AI to compress the feedback loop itself**. When persona creation takes 15 minutes instead of 5 days, you can validate 10 personas and discard 7 before an engineer writes a single line of code. AI doesn't just make execution faster; it makes *learning* faster.
