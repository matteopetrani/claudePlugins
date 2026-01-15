---
name: validate-hypothesis
description: Validates A/B test hypotheses against CRO best practices from your curated knowledge base and authoritative sources (Nielsen Norman, Baymard). Evaluates hypothesis quality, design effectiveness, accessibility, mobile compatibility, and business risks. Use when planning A/B tests, reviewing test ideas, or when user mentions hypotheses, CRO, conversion optimization, or A/B testing.
compatibility: Designed for Claude Code. Requires Read tool access to plugins/croMachine/.claude-plugin/utils/cro-best-practices.md and plugins/croMachine/.claude-plugin/utils/validation-checklist.md. Optional WebSearch tool for research.
metadata:
  author: croMachine
  version: "1.0.0"
  category: cro-testing
---

# Validate Hypothesis

Validates A/B test hypotheses against conversion rate optimization (CRO) best practices, providing expert feedback and actionable recommendations.

## When to Use This Skill

Use this skill when:
- Planning a new A/B test and need validation
- User mentions "hypothesis", "A/B test", "CRO", "conversion optimization"
- Reviewing test ideas for potential issues
- Need expert feedback on proposed design changes
- Want to check accessibility or mobile compatibility risks

**Important**: This skill only validates hypotheses. For implementation, use the `code-variant` skill afterward.

## Input Format

Accept hypothesis in any of these formats:

**Option 1: Markdown file**
```
/validate-hypothesis tests/my-test/hypothesis.md
```

**Option 2: Design images with description**
```
/validate-hypothesis
[User attaches before.jpg and after.jpg]
[User describes the hypothesis]
```

**Option 3: Direct description**
```
/validate-hypothesis

Hypothesis: If we change the checkout button from gray to green, then we'll increase CTR by 15% because the high-contrast color will be more visible and compelling.
```

## How to Execute This Skill

### Phase 1: Understand the Hypothesis

1. Read the provided file (if file path given) or understand the description
2. If images are attached, analyze design mockups
3. Identify:
   - The specific change being proposed
   - Expected outcome and success metrics
   - Reasoning/rationale for the change
   - Current performance baseline (if provided)

### Phase 2: Check Curated Knowledge Base FIRST

**CRITICAL**: Always check the user's knowledge base before web searching.

1. Read `plugins/croMachine/.claude-plugin/utils/cro-best-practices.md`
2. Search for sections relevant to the test type (CTAs, forms, product pages, etc.)
3. Extract applicable best practices, quotes, and source URLs
4. If knowledge base has detailed information → use it (skip web search)
5. If marked [PLACEHOLDER] or lacks depth → proceed to web research

### Phase 3: Web Research (Only If Needed)

Perform web search ONLY when knowledge base lacks relevant information.

Search authoritative sources: Nielsen Norman Group, Baymard Institute, WCAG Guidelines. Extract specific findings and URLs.

### Phase 4: Evaluate Using Validation Checklist

Use `plugins/croMachine/.claude-plugin/utils/validation-checklist.md` as framework. Assess:

1. **Hypothesis Quality** - Structure, testability, specificity
2. **Design Effectiveness** - Clarity, friction, motivation  
3. **Best Practice Alignment** - Knowledge base and research findings
4. **Risk Assessment** - Accessibility (WCAG), mobile, technical, business risks
5. **Implementation Feasibility** - ABTasty compatibility, complexity
   - **Selector stability**: Prefer `data-*` attributes (e.g., `data-ab`, `data-id`, `data-testid`) over hashed CSS classes.
   - If only hashed classes are available (e.g., Chakra), flag the risk and explicitly notify the user that selectors may break if classes change.
6. **Alternative Approaches** - Better ways to achieve goal?

### Phase 5: Generate Validation Report

Provide structured feedback - see [references/report-format.md](references/report-format.md) for complete template.

Report includes:
- Overall assessment (✅/⚠️/❌) and confidence level
- Detailed feedback across 6 categories
- Supporting research with citations
- Risk analysis for each category
- Specific recommendations
- Knowledge base update suggestions (if web research performed)

## Critical Guidelines

### DO:
- ✅ Check knowledge base FIRST before web searching
- ✅ Be specific - cite actual research with URLs
- ✅ Flag accessibility issues - WCAG violations must be addressed
- ✅ Consider mobile - most traffic is mobile
- ✅ Suggest alternatives when hypothesis is flawed
- ✅ Build knowledge base - suggest additions from web research
- ✅ Call out selector risks if hashed CSS classes are the only option

### DON'T:
- ❌ Give generic advice without specifics
- ❌ Search web before checking knowledge base
- ❌ Miss accessibility issues (contrast, keyboard nav, screen readers)
- ❌ Support dark patterns (false urgency, manipulation)
- ❌ Assume hashed class selectors are stable without warning

## Reference Documents

- **Agent system prompt**: [references/system-prompt.md](references/system-prompt.md) - Full CRO expert persona and evaluation methodology
- **Report format**: [references/report-format.md](references/report-format.md) - Complete validation report structure
- **Validation checklist**: `plugins/croMachine/.claude-plugin/utils/validation-checklist.md` - Detailed evaluation criteria
- **Knowledge base**: `plugins/croMachine/.claude-plugin/utils/cro-best-practices.md` - Your primary CRO research source

## Notes

- This skill only validates - use `/code-variant` for implementation
- Save validation feedback to hypothesis document
- Keep knowledge base updated with research findings
