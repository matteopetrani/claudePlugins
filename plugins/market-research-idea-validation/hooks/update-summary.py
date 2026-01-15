#!/usr/bin/env python3
"""
Auto-update SUMMARY.md with markdown files from research/ and output/ directories.

This script scans for new .md files in research/ and output/ folders and adds them
to SUMMARY.md under the M+M section. It maintains GitBook formatting, prevents
duplicates, and handles edge cases gracefully.

Usage:
    python3 update-summary.py                    # Update SUMMARY.md
    python3 update-summary.py --dry-run          # Show what would be added
"""

import os
import re
import sys
from pathlib import Path
from typing import List, Set, Dict, Optional

# Configuration
REPO_ROOT = Path(__file__).parent.parent.parent.absolute()
SUMMARY_PATH = REPO_ROOT / "SUMMARY.md"
RESEARCH_DIR = REPO_ROOT / "research"
OUTPUT_DIR = REPO_ROOT / "output"

# Section markers
SECTION_MM = "## M+M"
SECTION_CLAUDE = "## Claude code stuff"


def find_markdown_files(directory: Path) -> List[str]:
    """
    Find all .md files in directory, return relative paths sorted alphabetically.

    Args:
        directory: Path to search for markdown files

    Returns:
        List of relative file paths sorted alphabetically
    """
    if not directory.exists():
        return []

    files = []
    for md_file in directory.glob("*.md"):
        relative_path = str(md_file.relative_to(REPO_ROOT))
        files.append(relative_path)

    return sorted(files)


def filename_to_title(filepath: str) -> str:
    """
    Convert filename to human-readable title.

    Examples:
        "research/competitive-landscape.md" -> "Competitive Landscape"
        "output/mvp-feature-spec.md" -> "MVP Feature Spec"
        "market_opportunity.md" -> "Market Opportunity"

    Args:
        filepath: Path to markdown file

    Returns:
        Human-readable title in Title Case
    """
    name = Path(filepath).stem
    # Convert kebab-case and snake_case to spaces
    title = name.replace("-", " ").replace("_", " ")
    # Convert to Title Case
    return title.title()


def extract_existing_links(content: str) -> Set[str]:
    """
    Extract all markdown file links from SUMMARY.md content.

    Args:
        content: Content of SUMMARY.md

    Returns:
        Set of file paths that are already linked in SUMMARY.md
    """
    existing_files = set()
    # Match markdown links: [text](path.md)
    link_pattern = re.compile(r'\[.*?\]\((.*?\.md)\)')

    for match in link_pattern.finditer(content):
        filepath = match.group(1)
        existing_files.add(filepath)

    return existing_files


def create_entry(filepath: str, indent_level: int = 0) -> str:
    """
    Create a GitBook entry line.

    Args:
        filepath: Relative path to markdown file
        indent_level: Number of indentation levels (each level = 2 spaces)

    Returns:
        Formatted GitBook entry line
    """
    title = filename_to_title(filepath)
    indent = "  " * indent_level
    return f"{indent}* [{title}]({filepath})"


def parse_summary_structure(content: str) -> Dict:
    """
    Parse SUMMARY.md structure and identify section boundaries.

    Args:
        content: Content of SUMMARY.md

    Returns:
        Dictionary containing parsed structure with sections
    """
    lines = content.split('\n')
    structure = {
        'before_mm': [],
        'mm_section': [],
        'between_sections': [],
        'claude_section': [],
        'after_claude': [],
    }

    current_section = 'before_mm'
    mm_found = False
    claude_found = False

    for line in lines:
        stripped = line.strip()

        # Track section transitions
        if stripped == SECTION_MM:
            current_section = 'mm_section'
            mm_found = True
        elif stripped == SECTION_CLAUDE:
            if mm_found:
                current_section = 'claude_section'
            else:
                current_section = 'before_mm'
            claude_found = True
        elif current_section == 'mm_section' and stripped.startswith('##'):
            # Hit another section header after M+M
            current_section = 'between_sections'
        elif current_section == 'claude_section' and stripped.startswith('##'):
            # Hit another section header after Claude
            current_section = 'after_claude'

        structure[current_section].append(line)

    return structure


def insert_research_output_sections(
    structure: Dict,
    research_files: List[str],
    output_files: List[str],
    existing_files: Set[str]
) -> List[str]:
    """
    Insert Research and Output subsections into the M+M section.

    Args:
        structure: Parsed SUMMARY.md structure
        research_files: List of research file paths
        output_files: List of output file paths
        existing_files: Set of already-linked file paths

    Returns:
        List of lines for updated SUMMARY.md
    """
    result = []

    # Add everything before and including M+M section header
    result.extend(structure['before_mm'])

    # Add M+M section but prepare to insert subsections before next section
    mm_section_lines = structure['mm_section'][:]

    # Find the insertion point (before next ## header or at end of mm_section)
    insertion_index = len(mm_section_lines)
    for i, line in enumerate(mm_section_lines):
        if i > 0 and line.strip().startswith('##'):
            insertion_index = i
            break

    # Add M+M content up to insertion point
    result.extend(mm_section_lines[:insertion_index])

    # Add Research subsection if there are new files
    new_research = [f for f in research_files if f not in existing_files]
    if new_research:
        # Check if there's already a Research header
        has_research_header = any('* [Research]' in line for line in mm_section_lines)
        if not has_research_header:
            result.append("  * [Research]")
        for filepath in new_research:
            result.append(create_entry(filepath, indent_level=2))

    # Add Output subsection if there are new files
    new_output = [f for f in output_files if f not in existing_files]
    if new_output:
        # Check if there's already an Output header
        has_output_header = any('* [Output]' in line for line in mm_section_lines)
        if not has_output_header:
            result.append("  * [Output]")
        for filepath in new_output:
            result.append(create_entry(filepath, indent_level=2))

    # Add rest of M+M section (if there was a ## header)
    if insertion_index < len(mm_section_lines):
        result.extend(mm_section_lines[insertion_index:])

    # Add remaining sections
    result.extend(structure['between_sections'])
    result.extend(structure['claude_section'])
    result.extend(structure['after_claude'])

    return result


def update_summary(dry_run: bool = False) -> bool:
    """
    Main function to update SUMMARY.md with new research and output files.

    Args:
        dry_run: If True, only show what would be added without modifying files

    Returns:
        True if successful, False otherwise
    """
    # Check if SUMMARY.md exists
    if not SUMMARY_PATH.exists():
        print(f"Error: {SUMMARY_PATH} not found", file=sys.stderr)
        return False

    # Find markdown files in research and output directories
    research_files = find_markdown_files(RESEARCH_DIR)
    output_files = find_markdown_files(OUTPUT_DIR)

    if not research_files and not output_files:
        if not dry_run:
            print("No markdown files found in research/ or output/ directories")
        return True

    # Read current SUMMARY.md
    with open(SUMMARY_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract existing file links
    existing_files = extract_existing_links(content)

    # Check if there are new files to add
    new_research = [f for f in research_files if f not in existing_files]
    new_output = [f for f in output_files if f not in existing_files]

    if not new_research and not new_output:
        if not dry_run:
            print("All files already present in SUMMARY.md - no changes needed")
        return True

    # Dry run mode - just show what would be added
    if dry_run:
        print("Would add the following files to SUMMARY.md:")
        if new_research:
            print("\nResearch files:")
            for f in new_research:
                print(f"  - {f}")
        if new_output:
            print("\nOutput files:")
            for f in new_output:
                print(f"  - {f}")
        return True

    # Parse SUMMARY.md structure
    structure = parse_summary_structure(content)

    # Create backup
    backup_path = SUMMARY_PATH.with_suffix('.md.bak')
    with open(backup_path, 'w', encoding='utf-8') as f:
        f.write(content)

    # Generate updated content
    updated_lines = insert_research_output_sections(
        structure,
        research_files,
        output_files,
        existing_files
    )
    updated_content = '\n'.join(updated_lines)

    # Ensure file ends with newline
    if not updated_content.endswith('\n'):
        updated_content += '\n'

    # Atomic write (write to temp file, then rename)
    temp_path = SUMMARY_PATH.with_suffix('.md.tmp')
    try:
        with open(temp_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        temp_path.rename(SUMMARY_PATH)
    except Exception as e:
        print(f"Error writing SUMMARY.md: {e}", file=sys.stderr)
        if temp_path.exists():
            temp_path.unlink()
        return False

    # Print summary of changes
    print("Updated SUMMARY.md successfully:")
    if new_research:
        print(f"  Added {len(new_research)} research file(s)")
    if new_output:
        print(f"  Added {len(new_output)} output file(s)")

    return True


def main():
    """Main entry point."""
    dry_run = '--dry-run' in sys.argv

    success = update_summary(dry_run=dry_run)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
