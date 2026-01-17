# Hypothesis Validation Checklist

This checklist is used by the validate-hypothesis skill to evaluate test hypotheses systematically.

---

## 1. Hypothesis Quality

### Is the hypothesis properly structured?
- [ ] Uses "If... then... because..." format
- [ ] Clearly states the change being made
- [ ] Defines expected outcome with specific metrics
- [ ] Provides reasoning based on user psychology/behavior

### Is the hypothesis testable?
- [ ] Outcome is measurable
- [ ] Success metrics are clearly defined
- [ ] Timeframe for results is realistic
- [ ] Sample size requirements can be met

### Is the hypothesis specific enough?
- [ ] Not too broad or vague
- [ ] Focused on one main change
- [ ] Target audience is defined
- [ ] Expected impact is quantified

### Red Flags
- ❌ "This will make users happier" (not measurable)
- ❌ "We should improve the page" (not specific)
- ❌ "Multiple unrelated changes tested simultaneously" (confounded)
- ❌ No clear success criteria

---

## 2. Design Effectiveness

### Does the design improve clarity?
- [ ] Is the purpose/action immediately clear?
- [ ] Does it reduce cognitive load?
- [ ] Are important elements prominent?
- [ ] Is the visual hierarchy appropriate?

### Does the design reduce friction?
- [ ] Fewer steps/clicks required?
- [ ] Less form fields to fill?
- [ ] Clearer error messages?
- [ ] Reduced uncertainty about next steps?

### Does the design increase motivation?
- [ ] Communicates clear value proposition?
- [ ] Uses appropriate persuasion techniques?
- [ ] Creates appropriate urgency (if applicable)?
- [ ] Builds trust and credibility?

### Visual Design Quality
- [ ] Sufficient contrast for readability
- [ ] Appropriate sizing for touch targets (mobile)
- [ ] Consistent with brand/site aesthetics
- [ ] Professional appearance

### Red Flags
- ❌ False urgency / dark patterns
- ❌ Cluttered or overwhelming design
- ❌ Low contrast or hard to read
- ❌ Tiny buttons/touch targets on mobile

---

## 3. Best Practice Alignment

### Check against curated knowledge base
- [ ] Search knowledge base for relevant patterns
- [ ] Compare proposed change with documented best practices
- [ ] Identify any contradictions with established principles
- [ ] Note any missing best practices that should be applied

### Web search (if knowledge base lacks info)
- [ ] Search Nielsen Norman Group
- [ ] Search Baymard Institute
- [ ] Search for relevant case studies
- [ ] Document findings for knowledge base update

### Common CRO Principles
- [ ] **Clarity**: Is the message/action crystal clear?
- [ ] **Relevance**: Does it match user intent?
- [ ] **Value**: Is the value proposition compelling?
- [ ] **Trust**: Does it build credibility?
- [ ] **Urgency**: Is urgency appropriate (not false)?
- [ ] **Simplicity**: Is it as simple as possible?

### Red Flags
- ❌ Violates established usability heuristics
- ❌ Goes against well-researched best practices
- ❌ No research supporting the approach
- ❌ Relies solely on "gut feeling"

---

## 4. Risk Assessment

### Accessibility Risks
- [ ] **Color Contrast**: WCAG AA compliance (4.5:1 minimum)?
- [ ] **Keyboard Navigation**: Can users navigate without mouse?
- [ ] **Screen Readers**: Will it work with assistive technology?
- [ ] **Text Size**: Readable at default zoom level?
- [ ] **Focus Indicators**: Clear focus states for interactive elements?

### Mobile Compatibility Risks
- [ ] **Touch Target Size**: Minimum 44x44px?
- [ ] **Responsive Layout**: Works on all screen sizes?
- [ ] **Load Time**: No significant performance impact?
- [ ] **Thumb Reach**: Important actions within easy reach?

### Technical Risks
- [ ] **JavaScript Errors**: Could it cause console errors?
- [ ] **Page Load Impact**: Will it slow down the page?
- [ ] **Browser Compatibility**: Works on all major browsers?
- [ ] **Existing Functionality**: Could it break current features?
- [ ] **A/B Testing Platform**: Compatible with ABTasty?

### Business Risks
- [ ] **Brand Consistency**: Aligns with brand guidelines?
- [ ] **Legal Compliance**: No legal/regulatory issues?
- [ ] **User Trust**: Could it damage user trust?
- [ ] **Customer Support**: Could it increase support tickets?

### Red Flags
- ❌ Accessibility violations (WCAG failures)
- ❌ Could break on mobile devices
- ❌ Requires extensive JavaScript that might fail
- ❌ Contradicts brand guidelines
- ❌ Uses dark patterns or deceptive techniques

---

## 5. Implementation Feasibility

### Technical Complexity
- [ ] Can be implemented in ABTasty?
- [ ] Doesn't require backend changes?
- [ ] Doesn't require excessive JavaScript?
- [ ] Can be reliably tested?

### Resource Requirements
- [ ] Design resources available (if needed)?
- [ ] Development time is reasonable?
- [ ] QA testing is manageable?

### Timeline
- [ ] Can launch within desired timeframe?
- [ ] Traffic volume supports reaching significance?

### Red Flags
- ❌ Requires backend/database changes
- ❌ Too complex to implement reliably in client-side
- ❌ Would take months to reach statistical significance

---

## 6. Alternative Approaches

### Are there better alternatives?
- [ ] Could a simpler change achieve the same goal?
- [ ] Is this the most impactful area to test?
- [ ] Would a different approach be safer?
- [ ] Are we testing the right thing?

### Common Alternative Suggestions
- Simplify the change (test one element at a time)
- Test more impactful area first
- Address more fundamental friction point
- Combine with complementary changes
- Split into multiple incremental tests

---

## 7. Success Prediction

### Confidence Level
Rate confidence that hypothesis will succeed:
- **High** (70%+): Strong research support, clear improvement, low risk
- **Medium** (40-70%): Some support, reasonable change, moderate risk
- **Low** (<40%): Weak support, unclear improvement, high risk

### Factors That Increase Confidence
- Strong research/data support
- Addresses clear pain point
- Follows proven best practices
- Simple, focused change
- Low risk of negative impact

### Factors That Decrease Confidence
- No research support ("gut feeling")
- Unclear problem being solved
- Complex, multi-faceted change
- High technical or accessibility risk
- Contradicts known best practices

---

## 8. Recommendation Categories

### ✅ RECOMMENDED
- Hypothesis is well-structured and testable
- Design is clear, effective, and follows best practices
- Low risk, high potential impact
- Feasible to implement and test
- **Action**: Proceed with implementation

### ⚠️ NEEDS REVISION
- Hypothesis has merit but needs refinement
- Design could be improved
- Some risks that should be addressed
- Implementation complexity could be reduced
- **Action**: Address feedback, then proceed

### ❌ NOT RECOMMENDED
- Fundamental flaws in hypothesis or design
- High risk of negative impact
- Violates accessibility or best practices
- Not feasible to implement properly
- **Action**: Reconsider approach, explore alternatives

---

## Output Format for Validation

```markdown
## Hypothesis Validation Report

### Overall Assessment: [✅ Recommended / ⚠️ Needs Revision / ❌ Not Recommended]

### Confidence Level: [High / Medium / Low]

---

### 1. Hypothesis Quality
[Feedback on hypothesis structure, specificity, measurability]

**Strengths:**
- [Strength 1]
- [Strength 2]

**Concerns:**
- [Concern 1]
- [Concern 2]

---

### 2. Design Effectiveness
[Feedback on design quality and expected impact]

**What Works:**
- [Positive aspect 1]
- [Positive aspect 2]

**What Could Be Improved:**
- [Improvement 1]
- [Improvement 2]

---

### 3. Best Practice Alignment
[Comparison with CRO best practices]

**Supporting Research:**
- [Source 1]: [Key Finding] - [URL]
- [Source 2]: [Key Finding] - [URL]

**Best Practices Applied:**
- [Practice 1]
- [Practice 2]

**Best Practices Violated:**
- [Violation 1]
- [Violation 2]

---

### 4. Risk Assessment

**Accessibility:** [Low / Medium / High Risk]
- [Specific concern or "None identified"]

**Mobile Compatibility:** [Low / Medium / High Risk]
- [Specific concern or "None identified"]

**Technical:** [Low / Medium / High Risk]
- [Specific concern or "None identified"]

**Business:** [Low / Medium / High Risk]
- [Specific concern or "None identified"]

---

### 5. Recommendations

**Priority Actions:**
1. [Action 1]
2. [Action 2]

**Alternative Approaches:**
- [Alternative 1]
- [Alternative 2]

**Knowledge Base Updates:**
[If web search was performed, suggest specific additions to cro-best-practices.md]
- Add: [Finding] from [Source URL] to section [Section Name]

---

### 6. Next Steps

[If Recommended]: Proceed with implementation. Consider [any minor suggestions].

[If Needs Revision]: Address the following before implementation: [specific items].

[If Not Recommended]: Explore alternative approaches such as [suggestions].
```
