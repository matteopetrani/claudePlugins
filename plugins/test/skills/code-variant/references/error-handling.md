# Error Handling Guide

This document describes common errors encountered when testing ABTasty variants and their remediation strategies.

## Error Categories

### 1. Element Not Found Errors

**Error Pattern**: `Element not found within Xms: .selector`

**Common Causes:**
1. Selector is incorrect (typo, wrong class name)
2. Element loads after the timeout period
3. Element doesn't exist on this page/variation
4. Element is dynamically added by JavaScript

**Remediation Options:**

**Option A: Increase Timeout**
- Increase `maxWaitTime` from 10000ms to 20000ms or more
- Pros: Handles slow-loading elements
- Cons: Adds delay, might still fail if element doesn't exist

**Option B: Fix Selector**
- Verify selector in browser DevTools console
- Check for typos or incorrect class names
- Try more specific or less specific selector
- Pros: Fixes root cause
- Cons: Requires correct selector knowledge

**Option C: Add Conditional Logic**
- Only run variant on pages where element exists
- Check page URL or other page characteristics
- Pros: Prevents errors on wrong pages
- Cons: Adds complexity

**Option D: Use Different Approach**
- Target parent element instead
- Wait for different, more reliable element first
- Use CSS injection instead of DOM manipulation
- Pros: May be more reliable
- Cons: Requires rethinking approach

### 2. JavaScript Syntax Errors

**Error Pattern**: `Uncaught SyntaxError: ...`

**Common Causes:**
1. Missing or extra brackets/parentheses
2. Unclosed strings or template literals
3. Invalid JavaScript syntax
4. Special characters not properly escaped

**Remediation Options:**

**Option A: Review and Fix Syntax**
- Carefully review the generated code
- Check bracket matching
- Validate string escaping
- Pros: Direct fix
- Cons: Requires careful code review

**Option B: Simplify Code**
- Break complex operations into simpler steps
- Remove unnecessary complexity
- Use more straightforward syntax
- Pros: Reduces error surface area
- Cons: May reduce code elegance

### 3. Timeout Errors

**Error Pattern**: `Timeout waiting for ...` or `Promise rejected after Xms`

**Common Causes:**
1. Element takes longer than expected to load
2. AJAX request delays
3. Page has slow performance
4. Element never appears (wrong page, incorrect implementation)

**Remediation Options:**

**Option A: Increase Timeout**
- Extend timeout period
- Add retry logic
- Pros: Handles slow pages
- Cons: Adds delay, may not solve root cause

**Option B: Optimize Waiting Strategy**
- Wait for different, earlier-loading element
- Use multiple fallback selectors
- Check page readiness first
- Pros: More robust
- Cons: More complex code

**Option C: Verify Page Context**
- Confirm element should exist on this page
- Check page URL matching
- Verify page state
- Pros: Prevents wrong-page errors
- Cons: Requires page analysis

### 4. Multiple Elements Match

**Error Pattern**: Element modification affects wrong element or multiple elements unintentionally

**Common Causes:**
1. Selector is too broad
2. Page has multiple instances of the element
3. Selector matches unexpected elements

**Remediation Options:**

**Option A: Use More Specific Selector**
- Add more context to selector (parent classes)
- Use ID instead of class
- Use attribute selectors
- Pros: Targets correct element
- Cons: May be too specific, brittle

**Option B: Use querySelectorAll with Logic**
- Select all matches
- Apply logic to choose correct one (index, content check)
- Pros: Handles multiple instances correctly
- Cons: More complex code

**Option C: Target Parent Container**
- Target unique parent element first
- Then find child element within that context
- Pros: More reliable scoping
- Cons: Requires understanding DOM structure

### 5. Conflicts with Page JavaScript

**Error Pattern**: Variant works initially but breaks after page interactions, or causes page errors

**Common Causes:**
1. Page JavaScript overwrites variant changes
2. Variant interferes with page event listeners
3. Timing conflicts between variant and page code
4. Variant modifies elements page code depends on

**Remediation Options:**

**Option A: Use MutationObserver Continuously**
- Don't disconnect observer
- Re-apply changes if page code overwrites them
- Pros: Maintains variant state
- Cons: Performance overhead

**Option B: Modify at Different Time**
- Apply changes earlier or later in page lifecycle
- Hook into page events
- Pros: Avoids conflicts
- Cons: Requires understanding page timing

**Option C: Use CSS Injection**
- Use style injection instead of DOM manipulation
- Apply !important to ensure precedence
- Pros: Hard to override
- Cons: Limited to visual changes

### 6. Mobile-Specific Issues

**Error Pattern**: Variant works on desktop but fails on mobile

**Common Causes:**
1. Different DOM structure on mobile
2. Different selectors on responsive site
3. Elements hidden/shown differently
4. Touch events vs click events

**Remediation Options:**

**Option A: Add Responsive Checks**
- Check viewport width
- Apply different logic for mobile
- Pros: Handles both contexts
- Cons: More complex code

**Option B: Use More Generic Selector**
- Find selector that works across both
- Test on multiple viewport sizes
- Pros: Single code path
- Cons: May be less precise

**Option C: Separate Mobile Variant**
- Create separate variant for mobile
- Use device detection or media queries
- Pros: Optimized for each platform
- Cons: Duplicate code maintenance

## Diagnostic Process

When an error occurs, follow this process:

### Step 1: Gather Information
- Full error message and stack trace
- Console output (all logs, not just errors)
- Screenshot at time of error
- Page URL and state
- Browser and device info

### Step 2: Reproduce and Isolate
- Can you reproduce the error consistently?
- Does it happen on all pages or specific ones?
- Does it happen on all browsers or specific ones?
- Is it timing-related (works sometimes, fails others)?

### Step 3: Analyze Root Cause
- Is selector correct? (Verify in DevTools)
- Is element present when code runs? (Check timing)
- Are there JavaScript errors from page? (Could interfere)
- Is the approach appropriate for this situation?

### Step 4: Present Options
- List 2-3 specific remediation approaches
- For each approach, explain pros/cons
- Recommend one based on analysis
- Wait for user decision

### Step 5: Implement and Verify
- Implement approved solution
- Test again with Chrome MCP
- Verify error is resolved
- Check for new errors introduced

## Prevention Best Practices

**To minimize errors:**

1. **Use Mutation Observers by Default**
   - Assume content is dynamic unless proven otherwise
   - Wait for elements rather than assuming they exist

2. **Validate Selectors in DevTools First**
   - Test selector in console before generating code
   - Ensure it returns expected element
   - Check it's not too broad or too narrow

3. **Add Comprehensive Error Handling**
   - Wrap all DOM operations in try-catch
   - Log errors for debugging
   - Fail gracefully without breaking page

4. **Include Debug Logging**
   - Log when variant starts
   - Log when element is found
   - Log when modifications are applied
   - Log any errors or warnings

5. **Test on Actual Target URL**
   - Always test on real page, not localhost
   - Test on both desktop and mobile if relevant
   - Test across major browsers

6. **Keep Code Simple**
   - Avoid unnecessary complexity
   - One clear purpose per function
   - Easy to understand and debug

## Common Pitfalls to Avoid

❌ **Assuming static content** - Always use mutation observers for reliability

❌ **Using fragile selectors** - Avoid :nth-child, deep nesting, index-based selection

❌ **Ignoring timing** - Element might not exist when code runs

❌ **Not handling edge cases** - Element might be missing, hidden, or multiple

❌ **Breaking page functionality** - Test that variant doesn't interfere with page

❌ **Forgetting mobile** - Test responsive behavior

❌ **Auto-retrying without approval** - Wastes tokens and may not fix root cause
