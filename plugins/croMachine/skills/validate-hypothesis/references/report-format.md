# Validation Report Format

This document defines the standard format for hypothesis validation reports.

## Report Structure

```markdown
# Hypothesis Validation Report

## Overall Assessment: [✅ Recommended / ⚠️ Needs Revision / ❌ Not Recommended]

**Confidence Level**: [High/Medium/Low]

---

## 1. Hypothesis Quality

[Evaluate structure, testability, specificity]

**Strengths:**
- [Specific strength 1]
- [Specific strength 2]

**Concerns:**
- [Specific concern 1]
- [Specific concern 2]

---

## 2. Design Effectiveness

[Evaluate clarity, friction reduction, motivation]

**What Works:**
- [Positive aspect 1]
- [Positive aspect 2]

**What Could Be Improved:**
- [Improvement 1]
- [Improvement 2]

---

## 3. Best Practice Alignment

**Supporting Research:**
- [Source 1]: "[Key Finding]" - [URL]
- [Source 2]: "[Key Finding]" - [URL]

**Knowledge Base Reference:**
[If used knowledge base, cite the specific section and finding]

**Best Practices Applied:**
- [Practice 1]
- [Practice 2]

**Best Practices Violated or Missed:**
- [Violation/gap 1 with explanation]

---

## 4. Risk Assessment

### Accessibility Risk: [Low/Medium/High]
- [Specific concern or "None identified"]
- [WCAG compliance notes if relevant]

### Mobile Compatibility Risk: [Low/Medium/High]
- [Specific concern or "None identified"]

### Technical Risk: [Low/Medium/High]
- [Specific concern or "None identified"]

### Business Risk: [Low/Medium/High]
- [Specific concern or "None identified"]

---

## 5. Recommendations

### Priority Actions:
1. [Specific action 1]
2. [Specific action 2]

### Alternative Approaches (if applicable):
- [Alternative 1 with reasoning]
- [Alternative 2 with reasoning]

---

## 6. Next Steps

[If ✅ Recommended]:
Proceed with implementation using `/code-variant`. Consider [any minor refinements].

[If ⚠️ Needs Revision]:
Address the following before implementation:
1. [Specific item 1]
2. [Specific item 2]
Then re-validate or proceed if comfortable with remaining risks.

[If ❌ Not Recommended]:
This hypothesis has fundamental issues. Recommended alternatives:
1. [Alternative approach 1]
2. [Alternative approach 2]

---

## Knowledge Base Update Suggestions
[Only if web research was performed]

To improve your knowledge base for future validations, consider adding:

**Section**: [Section name, e.g., "Call-to-Action (CTA) Buttons > Button Color & Contrast"]

**Content to add**:
- **Pattern**: [e.g., High-contrast button colors]
- **Best Practice**: [Specific finding]
- **Source**: [Full URL]
- **Key Quote**: "[Exact quote from source]"
- **When to apply**: [Specific scenarios]
- **When to avoid**: [Contraindications]

**Why this helps**: [Explain how this addition will improve future validations]
```

## Assessment Categories

### ✅ Recommended
- Hypothesis is well-structured and testable
- Design is clear, effective, follows best practices
- Low risk, high potential impact
- Feasible to implement and test
- **Action**: Proceed with implementation

### ⚠️ Needs Revision
- Hypothesis has merit but needs refinement
- Design could be improved
- Some risks that should be addressed
- Implementation complexity could be reduced
- **Action**: Address feedback, then proceed

### ❌ Not Recommended
- Fundamental flaws in hypothesis or design
- High risk of negative impact
- Violates accessibility or best practices
- Not feasible to implement properly
- **Action**: Reconsider approach, explore alternatives

## Confidence Levels

### High (70%+)
- Strong research support
- Clear improvement over current state
- Low risk
- Proven pattern

### Medium (40-70%)
- Some support or unclear evidence
- Reasonable change with moderate risk
- Unproven but plausible

### Low (<40%)
- Weak or no research support
- Unclear improvement
- High risk
- Contradicts best practices
