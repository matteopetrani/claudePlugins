# CRO Machine Skills

This directory contains Agent Skills (compliant with [agentskills.io specification](https://agentskills.io/specification)) for automating CRO (Conversion Rate Optimization) A/B testing workflows.

## Specification Compliance

These skills follow the Agent Skills open format with:
- **YAML frontmatter** in `SKILL.md` files with required `name` and `description` fields
- **Progressive disclosure** - metadata loads at startup, full instructions load on activation
- **References directory** - detailed system prompts and guides separate from main instructions
- **Portable structure** - just folders and markdown files

---

## Available Skills

### 1. `/validate-hypothesis`
**Purpose**: Validate A/B test hypotheses against CRO best practices

**Use when**: You have a test hypothesis and want expert feedback before implementation

**What it does**:
- Evaluates hypothesis structure and quality
- Checks your curated knowledge base for relevant best practices
- Performs web research (Nielsen Norman, Baymard) if needed
- Assesses risks (accessibility, mobile, technical, business)
- Provides actionable recommendations
- Suggests knowledge base updates

**Usage**:
```
/validate-hypothesis path/to/hypothesis.md
```

OR

```
/validate-hypothesis

[Describe your hypothesis directly]
```

**See**: `validate-hypothesis/SKILL.md` for detailed documentation

---

### 2. `/code-variant`
**Purpose**: Generate and test ABTasty-compatible JavaScript variants

**Use when**: You're ready to implement a variant after validation

**What it does**:
- Generates robust, production-ready JavaScript
- Uses mutation observers for dynamic content
- Tests variant using Chrome MCP
- Takes before/after screenshots
- Monitors console for errors
- Handles errors intelligently (reports, discusses, waits for approval)
- Provides copy-paste ready code for ABTasty

**Usage**:
```
/code-variant path/to/spec.md https://target-url.com
```

OR

```
/code-variant https://target-url.com

HTML: [paste HTML snippet]
Changes: [describe modifications]
```

**Requires**: Chrome MCP server to be running

**See**: `code-variant/SKILL.md` for detailed documentation

---

## Typical Workflow

### Step 1: Create Hypothesis
Use the template at `plugins/croMachine/.claude-plugin/templates/hypothesis-template.md`:
```bash
cp plugins/croMachine/.claude-plugin/templates/hypothesis-template.md tests/my-test/hypothesis.md
# Edit hypothesis.md with your test details
```

### Step 2: Validate Hypothesis
```
/validate-hypothesis tests/my-test/hypothesis.md
```

Review feedback and iterate on hypothesis if needed.

### Step 3: Create Implementation Spec (Optional)
Use the template at `plugins/croMachine/.claude-plugin/templates/specs.md`:
```bash
cp plugins/croMachine/.claude-plugin/templates/specs.md tests/my-test/spec.md
# Add HTML snippet and change details
```

### Step 4: Generate and Test Variant Code
```
/code-variant tests/my-test/spec.md https://your-target-url.com
```

The skill will:
1. Generate JavaScript code
2. Test it on your actual page
3. Show before/after screenshots
4. Provide production-ready code

### Step 5: Deploy to ABTasty
1. Copy the generated JavaScript
2. Paste into ABTasty variant editor
3. Test in ABTasty staging
4. Launch your A/B test!

---

## Skill Structure

Skills follow the Agent Skills specification:

```
plugins/croMachine/.claude-plugin/skills/
├── validate-hypothesis/
│   ├── SKILL.md              # Skill definition with YAML frontmatter
│   └── references/
│       ├── system-prompt.md  # Detailed agent behavior
│       └── report-format.md  # Output format template
└── code-variant/
    ├── SKILL.md              # Skill definition with YAML frontmatter
    └── references/
        ├── system-prompt.md  # Detailed agent behavior
        └── error-handling.md # Error remediation guide
```

Each `SKILL.md` file contains:
- **YAML frontmatter** - Metadata (name, description, compatibility, etc.)
- **Markdown body** - Instructions for using the skill (<500 lines)
- **References** - Links to detailed documentation in `references/` directory

### Modifying Skills

To customize skill behavior:
1. **Skill activation criteria**: Edit `description` field in YAML frontmatter
2. **Instructions**: Edit markdown body in `SKILL.md`
3. **Agent persona**: Edit `references/system-prompt.md`
4. **Output format**: Edit reference files (report-format.md, error-handling.md)

---

## Dependencies

### Required
- Claude Code (with skills support)
- Chrome MCP server (for `/code-variant`)

### Optional but Recommended
- `plugins/croMachine/.claude-plugin/utils/cro-best-practices.md` - Your curated CRO knowledge base
- `plugins/croMachine/.claude-plugin/templates/` - Templates for hypothesis and spec documents

---

## Best Practices

### For `/validate-hypothesis`
1. **Keep knowledge base updated** - Add findings from web research
2. **Be specific in hypotheses** - Use "If... then... because..." format
3. **Include designs** - Attach mockups for better validation
4. **Iterate** - Use feedback to improve hypothesis before coding

### For `/code-variant`
1. **Validate first** - Always run `/validate-hypothesis` before `/code-variant`
2. **Provide clean HTML** - Extract the relevant HTML section, not entire page
3. **Test on actual URL** - Use real target URL for accurate testing
4. **Review screenshots** - Visually confirm variant works as expected
5. **Monitor console** - Check debug logs for any warnings

---

## Troubleshooting

### `/validate-hypothesis` Issues

**Problem**: Generic feedback, no specific citations
**Solution**: Populate `plugins/croMachine/.claude-plugin/utils/cro-best-practices.md` with specific findings for your test types

**Problem**: Skill doesn't search web
**Solution**: Ensure your knowledge base section is marked [PLACEHOLDER] or lacks detail

---

### `/code-variant` Issues

**Problem**: "Chrome MCP not available"
**Solution**: Start Chrome MCP server before using skill

**Problem**: Variant code doesn't work in screenshots
**Solution**: Skill should detect this and report error. Follow diagnostic report to fix.

**Problem**: "Element not found" errors
**Solution**: Check HTML selector accuracy, increase timeout, or use mutation observer

---

## Advanced Usage

### Custom ABTasty Patterns

The skills use patterns from:
- `plugins/croMachine/.claude-plugin/utils/abtasty-helpers.js` - Utility functions
- `plugins/croMachine/.claude-plugin/templates/abtasty-wrapper.js` - Code structure templates

You can modify these to match your specific ABTasty setup.

### Knowledge Base Organization

Structure `plugins/croMachine/.claude-plugin/utils/cro-best-practices.md` by:
- Test type (CTAs, forms, product pages)
- Pattern (colors, copy, layout)
- Source (Nielsen Norman, Baymard, your own tests)

The more specific and detailed, the better validation quality.

---

## Examples

See `tests/examples/` for complete example test cases showing:
- Full hypothesis documentation
- Validation feedback
- Implementation specs
- Generated JavaScript code
- Test results

---

## Support

For issues or questions:
1. Check skill documentation (`SKILL.md`)
2. Review detailed references (`references/` directory)
3. Consult main project README
4. Check example test cases

### Validating Skills

Skills can be validated using the [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) tool:

```bash
# Install skills-ref
pip install agentskills

# Validate a skill
skills-ref validate plugins/croMachine/.claude-plugin/skills/validate-hypothesis

# Generate agent prompt XML
skills-ref to-prompt plugins/croMachine/.claude-plugin/skills/validate-hypothesis plugins/croMachine/.claude-plugin/skills/code-variant
```

---

## Future Enhancements

Potential additions:
- `/extract-html` - Use Chrome MCP to interactively extract HTML
- `/analyze-results` - Analyze A/B test results and generate reports
- `/multi-variant` - Handle A/B/C testing with multiple variants
- `/mobile-test` - Specialized mobile testing workflow
