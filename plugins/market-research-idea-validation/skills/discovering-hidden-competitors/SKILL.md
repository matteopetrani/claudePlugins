---
name: discovering-hidden-competitors
description: Discovers competitors and adjacent competitors not in initial research. Use when expanding competitive analysis to include niche players, adjacent market apps, and indirect competitors in related categories.
---

# Discovering Hidden Competitors

## Overview

This skill expands competitive analysis beyond obvious players to include niche competitors and adjacent market categories that compete for user attention.

## Configuration

Read "Competitor Discovery Dimensions" and "Adjacent Categories" from `domain-config.md` to guide your search strategy.

## Evidence standards

- Cite sources for each competitor listed.
- Use this citation format: `[Source Name](URL) - accessed YYYY-MM-DD`

## Discovery process

1. **Search for niche competitors** using search dimensions from domain-config.md:
   - Combine search keywords in various patterns
   - Use market category + market subcategory searches
   - App store searches (iOS/Android)
   - International marketplaces for non-English apps
   - Explore adjacent categories defined in config

2. **Evaluate relevance** of each discovery:
   - Do they compete for the same users?
   - Do they offer overlapping features?
   - Do they address similar market needs?
   - What is their market position and threat level?

3. **Categorize competitors**:
   - Direct competitors (same market category)
   - Adjacent competitors (related categories from config)
   - Indirect competitors (alternative solutions)

4. **De-duplicate** against existing entries in `research/competitive-landscape.md`

If sources are inaccessible, ask the user for a list of competitors or search results and proceed only with what is provided.

## Output format

Append to `research/competitive-landscape.md` under a section "Hidden & Adjacent Competitors":

```markdown
## Hidden & Adjacent Competitors

| Competitor | URL | Category (Direct/Adjacent/Indirect) | Threat (Low/Med/High) | Evidence |
| --- | --- | --- | --- | --- |
| [Name] | [URL] | [Category] | [Threat] | [Source](URL) - accessed YYYY-MM-DD |

### Notes
- [Short rationale for threat assessment]
- [Overlap with target user or features]

### Limits and Unknowns
- [Not available or unclear data points]
```

## Success criteria

- Found 3-5 additional relevant competitors (or fewer with documented limits)
- Clearly categorized direct vs. adjacent competition
- Assessed competitive threat of each
- Expanded view of true competitive landscape
- Evidence and citations included for key claims
