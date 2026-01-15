---
name: code-variant
description: Generates production-ready ABTasty JavaScript variants with mutation observers, error handling, and debug logging. Tests variants live using Chrome MCP with before/after screenshots and console monitoring. Handles errors intelligently by presenting diagnostics and waiting for user approval before retrying. Use when implementing A/B test variants, generating ABTasty code, or when user mentions variant implementation, JavaScript generation, or A/B testing code.
compatibility: Designed for Claude Code. Requires Chrome MCP server for testing. Needs Read access to plugins/croMachine/.claude-plugin/utils/abtasty-helpers.js and plugins/croMachine/.claude-plugin/templates/abtasty-wrapper.js.
metadata:
  author: croMachine
  version: "1.0.0"
  category: cro-testing
  requires-mcp: chrome
---

# Code Variant

Generates and tests ABTasty-compatible JavaScript variants using Chrome MCP for live validation.

## When to Use This Skill

Use this skill when:
- Implementing an A/B test variant after hypothesis validation
- User mentions "variant code", "ABTasty", "JavaScript generation"
- Need to generate production-ready A/B testing JavaScript
- Want to test variant code on actual pages before deployment

**Prerequisites**: 
- Hypothesis should be validated first using `/validate-hypothesis`
- Chrome MCP server must be running for testing

## Input Format

Accept variant specifications in any format:

**Option 1: Spec file (recommended)**
```
/code-variant tests/my-test/spec.md
```

**Option 1b: Spec file + explicit test URL override**
```
/code-variant tests/my-test/spec.md https://example.com/product
```

**Option 2: Inline HTML + changes**
```
/code-variant https://example.com/checkout

HTML:
<button class="checkout-btn">Proceed to Checkout</button>

Changes:
- Change button text to "Complete Your Purchase"
- Change background color to green (#00AA00)
```

**Option 3: Design mockups**
```
/code-variant https://example.com
[User attaches images and provides HTML]
```

**Spec file structure (recommended)**: use `plugins/croMachine/.claude-plugin/templates/specs.md`
```
# test specs
## target urls (list of urls or regex)
## test url (a single url to be used as reference for developing the variant code)
## component html
## desired result
```

## How to Execute This Skill

### Phase 1: Analyze Input

1. Read specification or understand description
   - If input is a spec `.md` file, parse:
     - Target URLs list (explicit URLs or regex patterns)
     - Test URL (single URL to develop and validate the variant)
     - Component HTML to modify
     - Desired result / changes
2. Parse HTML structure
3. Identify CSS selectors - validate for fragility:
   - Warn about `:nth-child` (breaks when DOM changes)
   - Warn about deep nesting (>4 levels)
   - Prefer class/ID selectors
4. Build target URL list:
   - Include explicit URLs listed under target urls
   - If regex entries exist, verify the test URL matches the pattern
   - Try to expand simple regex alternations (e.g., `(de-de|it-it)`) by substituting into the test URL
   - If expansion is not possible, notify the user and request explicit URLs (continue with test URL only)
5. Identify challenges: dynamic content, AJAX loading, multiple instances

### Phase 2: Generate JavaScript Code

Use structure from `plugins/croMachine/.claude-plugin/templates/abtasty-wrapper.js` and utilities from `plugins/croMachine/.claude-plugin/utils/abtasty-helpers.js`.

**Code must include:**
- Self-executing function (IIFE) with 'use strict'
- Configuration object with test ID
- Debug logging (log and logError functions)
- Mutation observer for dynamic content
- Comprehensive try-catch error handling
- Proper initialization (wait for page ready)
- Data attribute to prevent double-application

**Select appropriate pattern:**
- Static content: Direct DOM manipulation
- Dynamic/AJAX content: Mutation observer (RECOMMENDED)
- jQuery available: Use with fallback

### Phase 3: Write Variant File(s)

If a spec `.md` file is provided:

1. Create one or more `variantN.js` files in the same folder as the spec file
   - Use the next available integer `N` (e.g., `variant1.js`, `variant2.js`)
   - Do not overwrite existing `variantN.js` files
2. Write the generated JavaScript to the new variant file(s)
3. Reference the created file path(s) in your response

### Phase 4: Test on Test URL with Chrome MCP

**CRITICAL**: Always test generated code before presenting to user.

**Testing workflow:**

1. Initialize Chrome MCP - get tab ID
2. Navigate to test URL
3. Take "before" screenshot
4. Inject variant JavaScript
5. Wait 2-3 seconds for modifications
6. Take "after" screenshot  
7. Read console logs (filter for 'ABTasty')

### Phase 5: Test Across Target URLs

After the variant works on the test URL:

1. Iterate through all target URLs (explicit list + regex expansions)
2. For each URL:
   - Navigate to the page
   - Take a quick "before" screenshot
   - Inject the same variant JavaScript
   - Wait 2-3 seconds
   - Take an "after" screenshot
   - Read console logs and capture any errors
3. If any target URL fails, report which URLs failed and why

### Phase 6: Error Handling - TOKEN CONSERVATION

**CRITICAL**: DO NOT auto-retry without user approval.

**If errors detected:**

1. **Analyze** - What went wrong? Error type, message, stack trace
2. **Present diagnostic report** - Format showing:
   - Error type and message
   - Console output
   - What happened (explanation)
   - Possible causes
   - 2-3 remediation options with pros/cons
   - Your recommendation
3. **Wait for user decision** - DO NOT proceed without explicit input
4. **Implement approved fix and retest**

See [references/error-handling.md](references/error-handling.md) for common errors and solutions.

### Phase 7: Success Output

When variant works:

```markdown
## ✅ Variant Code Ready for ABTasty

### Production JavaScript
[Clean, formatted code]

### Test Results
- Before/After Screenshots
- Console Output: ✅ No errors

### Usage Notes
[Important notes, compatibility, caveats]

### Next Steps
1. Copy code
2. Paste into ABTasty
3. Test in staging
4. Launch

**Production-ready and copy-paste ready for ABTasty.**
```

## Critical Guidelines

### DO:
- ✅ Always test with Chrome MCP before presenting
- ✅ Use mutation observers for dynamic content
- ✅ Include debug logging
- ✅ Validate selectors - warn if fragile
- ✅ Handle errors gracefully
- ✅ Wait for user approval before retrying
- ✅ Take screenshots and read console

### DON'T:
- ❌ Auto-retry without approval (wastes tokens)
- ❌ Skip Chrome MCP testing
- ❌ Use fragile selectors without warning
- ❌ Ignore errors
- ❌ Generate overly complex code

## ABTasty-Specific Considerations

- jQuery available (ABTasty provides it)
- Runs in page context
- Page might still be loading - use mutation observers
- Avoid nth-child selectors

## Reference Documents

- **Agent system prompt**: [references/system-prompt.md](references/system-prompt.md) - Full developer persona and testing procedures
- **Error handling**: [references/error-handling.md](references/error-handling.md) - Common errors and remediation
- **Code patterns**: `plugins/croMachine/.claude-plugin/templates/abtasty-wrapper.js` - Templates with examples
- **Utilities**: `plugins/croMachine/.claude-plugin/utils/abtasty-helpers.js` - Reusable helper functions

## Notes

- Requires Chrome MCP server
- Test on actual target URL
- Code is copy-paste ready for ABTasty
- Use after `/validate-hypothesis`
- Version control generated code
- Test in ABTasty staging first
