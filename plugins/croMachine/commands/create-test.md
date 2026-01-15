---
name: create-test
description: Creates a new test directory with a specs template.
argument-hint: [test-name]
allowed-tools: [Bash, AskUserQuestion]
---

# Create Test

This command creates a new test directory with a specs template.

## Instructions

1. If the user provided arguments, use the first argument as the test name. Otherwise, ask the user for the test name using AskUserQuestion.

2. Once you have the test name:
   - Create a new directory at `tests/{test_name}` using the Bash tool
   - Copy the template file from `plugins/croMachine/.claude-plugin/templates/specs.md` to `tests/{test_name}/specs.md` using the Bash tool

3. After creating the test directory and copying the template, confirm to the user that the test has been created and show them the path.

## Example

If the test name is "homepage-hero", create:
- Directory: `tests/homepage-hero/`
- File: `tests/homepage-hero/specs.md` (copied from template)

## Notes

- Use `mkdir -p` to create the directory (handles nested paths gracefully)
- Test names should be descriptive and use kebab-case
- The specs.md template contains sections for target URLs, test URL, component HTML, and desired results
