---
name: analyzing-competitors
description: Analyzes individual product competitors from their website or app store URL to identify features, positioning, monetization strategies, and market gaps. Use when evaluating a specific competitor's offering or benchmarking product positioning.
---

# Analyzing Competitors

## Overview

This skill evaluates individual competitors in your target market by analyzing their website or app store presence to extract strategic insights and identify differentiation opportunities.

## Configuration

Before starting, read `domain-config.md` from the project root to understand:
- Product name and market context
- Key analysis dimensions specific to this market
- Domain-specific features to evaluate

## Evidence standards

- Cite sources for key claims.
- Use this citation format: `[Source Name](URL) - accessed YYYY-MM-DD`

## Analysis dimensions

- Core features and functionality
- Target audience and positioning
- Monetization model (free, freemium, subscription, one-time purchase)
- Content approach and strategy
- User reviews and sentiment (if available)
- UX/UI approach and design philosophy
- Domain-specific features (as defined in domain-config.md)

## Research process

1. **Fetch competitor information** from the provided URL:
   - For websites: Extract product descriptions, features, pricing, about pages
   - For app stores: Extract app description, screenshots, reviews, pricing, feature list
   - If the source is inaccessible, ask the user for links, screenshots, or notes and proceed only with what is provided

2. **Extract key data** for this competitor:
   - Feature set and unique capabilities
   - Pricing and monetization strategy
   - Target user definition and positioning
   - Content strategy and editorial approach
   - Key differentiators and value propositions
   - User sentiment from reviews (if app store link)
   - Domain-specific features per analysis dimensions in domain-config.md

3. **Identify gaps and opportunities**:
   - What does this competitor lack?
   - How could your product (from domain-config.md) differentiate?
   - What domain-specific features are missing?
   - What user complaints or feature requests appear in reviews?

4. **Document findings** in structured format

## Output format

Append to `research/competitive-landscape.md` with a new section:

```markdown
## [Competitor Name]

**URL:** [provided URL]
**Type:** [Website/iOS App/Android App]
**Analyzed:** [YYYY-MM-DD]

### Overview
[Brief description of the product]

### Target Audience
[Who they're targeting]

### Core Features
- Feature 1
- Feature 2
- [etc.]

### Monetization
- Model: [Free/Freemium/Subscription/Paid]
- Pricing: [specific pricing if available]

### Content Strategy
[How they approach content, if applicable]

### Domain-Specific Features
[Evaluate based on analysis dimensions from domain-config.md]

### User Sentiment
[Based on reviews, if available]

### Evidence
- [Source Name](URL) - accessed YYYY-MM-DD
- [Source Name](URL) - accessed YYYY-MM-DD

### Strengths
- Strength 1
- Strength 2

### Weaknesses / Gaps
- Gap 1
- Gap 2

### Differentiation Opportunities
[How your product could position differently - use product name from domain-config.md]

### Limits and Unknowns
- [Not available or unclear data points]

### Assumptions Made
- [Only if needed, otherwise state "None"]

---
```

If any data is missing, write "Not available" rather than guessing.

## Success criteria

- Comprehensive analysis of the competitor's offering
- Clear identification of strengths and weaknesses
- Specific differentiation opportunities identified
- User sentiment captured (if reviews available)
- Domain-specific features evaluated per market context
- Evidence and citations included for key claims
