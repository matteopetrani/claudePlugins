# SUMMARY.md Auto-Update Hook

Automatically updates `SUMMARY.md` with new markdown files from `research/` and `output/` directories.

## Overview

When you run research commands (like `/research competitor` or `/synthesize`), they generate markdown files in the `research/` and `output/` directories. This git pre-commit hook ensures those files are automatically added to `SUMMARY.md` before each commit, keeping your GitBook documentation in sync without manual maintenance.

## Features

- **Automatic detection**: Scans `research/` and `output/` directories for `.md` files
- **Duplicate prevention**: Only adds files that aren't already in SUMMARY.md
- **Proper formatting**: Maintains GitBook structure with correct indentation
- **Safe operations**: Creates backups and uses atomic writes
- **Manual mode**: Can be run independently for testing

## Installation

Run the installation script from the repository root:

```bash
bash .claude/hooks/install-hook.sh
```

The script will:
1. Check for Python 3 availability
2. Create a pre-commit hook in `.git/hooks/`
3. Make the hook executable
4. Back up any existing pre-commit hook

## Usage

### Automatic (via git hook)

Once installed, the hook runs automatically before each commit:

```bash
git add .
git commit -m "Add competitive research"
# Hook automatically updates SUMMARY.md if new files exist
# SUMMARY.md is staged for commit if modified
```

### Manual Execution

Run the script directly to update SUMMARY.md:

```bash
# Update SUMMARY.md with new files
python3 .claude/hooks/update-summary.py

# Preview what would be added (dry-run mode)
python3 .claude/hooks/update-summary.py --dry-run

# Check the changes
git diff SUMMARY.md
```

## How It Works

### Directory Scanning

The script scans two directories:
- `research/` - Contains competitive analysis, market research, community insights, etc.
- `output/` - Contains synthesis documents like executive summaries

### SUMMARY.md Structure

New files are added as subsections under the `## M+M` section:

**Before:**
```markdown
## M+M

* [Nine Moons - Product Assumptions](assumptions.md)
* [Domain Configuration](domain-config.md)

## Claude code stuff
```

**After (with new files):**
```markdown
## M+M

* [Nine Moons - Product Assumptions](assumptions.md)
* [Domain Configuration](domain-config.md)
  * [Research]
    * [Competitive Landscape](research/competitive-landscape.md)
    * [Market Opportunity](research/market-opportunity.md)
  * [Output]
    * [Executive Summary](output/executive-summary.md)

## Claude code stuff
```

### File Naming

The script converts filenames to human-readable titles:
- `competitive-landscape.md` → "Competitive Landscape"
- `mvp-feature-spec.md` → "MVP Feature Spec"
- `market_opportunity.md` → "Market Opportunity"

Files are sorted alphabetically within each subsection.

## Troubleshooting

### Hook not running

**Check if hook is installed:**
```bash
ls -la .git/hooks/pre-commit
```

**Reinstall if needed:**
```bash
bash .claude/hooks/install-hook.sh
```

### Python not found

The hook requires Python 3. Check if it's installed:
```bash
python3 --version
```

If not installed, install Python 3 for your platform.

### Files not being added

**Verify files exist:**
```bash
ls research/*.md
ls output/*.md
```

**Check if already listed:**
```bash
grep "research/" SUMMARY.md
grep "output/" SUMMARY.md
```

**Run manually to see output:**
```bash
python3 .claude/hooks/update-summary.py
```

### Script errors

**View detailed error messages:**
```bash
python3 .claude/hooks/update-summary.py
```

**Check backup file:**
If SUMMARY.md gets corrupted, restore from backup:
```bash
cp SUMMARY.md.bak SUMMARY.md
```

### Hook interfering with commits

If you need to bypass the hook temporarily:
```bash
git commit --no-verify -m "Your message"
```

## Uninstallation

To remove the hook:

```bash
rm .git/hooks/pre-commit
```

The script files in `.claude/hooks/` can remain for manual use.

## Testing

### Test without modifying files

```bash
python3 .claude/hooks/update-summary.py --dry-run
```

### Test with sample files

```bash
# Create test directories
mkdir -p research output

# Add test files
echo "# Test Research" > research/test-research.md
echo "# Test Output" > output/test-output.md

# Run the script
python3 .claude/hooks/update-summary.py

# Check the changes
git diff SUMMARY.md

# Clean up test files
rm research/test-research.md output/test-output.md
git restore SUMMARY.md
```

### Test git hook integration

```bash
# Create a test file
echo "# Sample" > research/sample.md

# Stage and commit
git add research/sample.md
git commit -m "Test commit"

# Verify SUMMARY.md was updated and staged
git show HEAD:SUMMARY.md | grep "sample.md"
```

## Edge Cases

The script handles various edge cases:

1. **Directories don't exist**: Gracefully skips non-existent directories
2. **Empty directories**: No changes made if no .md files present
3. **All files already listed**: Exits with success, no modifications
4. **Malformed SUMMARY.md**: Creates backup and attempts best-effort parsing
5. **Concurrent modifications**: Atomic write prevents file corruption

## Technical Details

### Requirements

- Python 3.6 or higher
- Git repository
- SUMMARY.md file in repository root

### File Structure

```
.claude/hooks/
├── update-summary.py    # Main script
├── install-hook.sh      # Installation helper
└── README.md           # This file

.git/hooks/
└── pre-commit          # Generated hook (not version-controlled)
```

### Safety Features

- **Backup creation**: Creates `SUMMARY.md.bak` before modification
- **Atomic writes**: Writes to temporary file, then renames
- **Duplicate prevention**: Checks existing links before adding
- **Error handling**: Exits with proper status codes

## Contributing

To modify the hook behavior:

1. Edit `.claude/hooks/update-summary.py`
2. Test changes with `python3 .claude/hooks/update-summary.py --dry-run`
3. Verify git integration works correctly
4. Update this documentation if needed

## Support

For issues or questions:
- Check the troubleshooting section above
- Review the script with `cat .claude/hooks/update-summary.py`
- Test manually to see detailed error messages
- Check `.git/hooks/pre-commit` configuration
