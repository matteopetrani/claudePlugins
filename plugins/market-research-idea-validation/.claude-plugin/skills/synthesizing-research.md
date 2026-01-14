---
name: synthesizing-research
description: Aggregates all research findings into executive summary, MVP recommendations, and viability assessment. Use when consolidating market, competitive, and user research into actionable business decisions and product strategy.
---

# Synthesizing Research

## Overview

This skill consolidates market, competitive, and user research into a cohesive executive summary with clear viability assessment and MVP recommendations.

## Configuration

Read `domain-config.md` from project root to understand:
- Product name and market context
- Key differentiators to highlight
- Target audience definition

## Evidence standards

- Tie recommendations to evidence in `research/` files.
- Use original citations from the research files when available.
- If a claim lacks a citation in the research files, note it as a gap.

## Research inputs required

- `research/competitive-landscape.md` (competitor analysis)
- `research/market-opportunity.md` (market sizing and trends)
- `research/community-insights.md` (user needs and pain points)
- `research/assumptions-validation.md` (assumption testing results, if available)
- `assumptions.md` (user's hypotheses in project root, if available)
- `domain-config.md` (product and market context)

## Synthesis process

1. **Extract key findings** across all research:
   - Market opportunity and addressable size
   - Competitive landscape and differentiation gaps
   - User pain points and unmet needs
   - Demand validation signals
   - Monetization opportunities

2. **Synthesize strategic insights**:
   - **Viability**: Is the concept viable given market and competitive data?
   - **Differentiation**: What makes this product unique?
   - **Target audience**: Who is the primary user segment?
   - **MVP scope**: What features should launch first?
   - **Risks**: What could prevent success?

3. **Create actionable recommendations** for MVP development with citations
4. **Document known unknowns** and gaps in the evidence

If required research files are missing, list them and stop (do not guess).

## Output format

Create `output/executive-summary.md` with:
- Executive summary (market opportunity + viability)
- Competitive positioning
- User validation findings
- Key differentiators
- MVP feature recommendations
- Go/no-go decision framework
- Risk assessment and mitigation
- Known unknowns and gaps
- Evidence links for major claims

Optional supplementary files:
- `output/mvp-feature-spec.md` (detailed feature scope)
- `output/content-strategy.md` (editorial approach)
- `output/validation-plan.md` (experiments for key assumptions)
- `output/go-to-market.md` (initial user acquisition strategy)

## Success criteria

- Clear viability assessment with supporting data
- Defined MVP scope with strategic rationale
- Identified 2-3 key risks and mitigations
- Decision-ready for stakeholders
- Actionable next steps defined
- Evidence and citations included for key claims
