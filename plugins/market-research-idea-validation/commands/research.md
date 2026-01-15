---
name: research
description: Run structured market research subcommands and write findings to research files.
argument-hint: competitor <url> | hidden-competitors | market | community | assumptions
allowed-tools: [Read, Glob, Edit, Skill]
---
# Research Command

Execute targeted research workflows for your market research project using specialized research skills.

## Usage

`/research $ARGUMENTS`

## Output and Evidence Standards

- Cite sources for every factual claim.
- Use this citation format: `[Source Name](URL) - accessed YYYY-MM-DD`
- If access to sources is not available, ask the user for links, notes, or screenshots and do not guess.
- Do not fabricate sources or citations.
- Include a short "Limits and Unknowns" section in each output file.

## File Handling

- Create `research/` if it does not exist.
- Append to existing files. Do not overwrite without confirming with the user.

## Data Handling and Ethics

- Use only public community content.
- Anonymize quotes and avoid including usernames or identifying details.
- Do not include content from private or closed groups without explicit user permission.

## Available Subcommands

### `competitor <url>`
Analyze a specific competitor by providing their website URL or app store link.

**Example:**
```
/research competitor https://example-competitor.com
/research competitor https://apps.apple.com/app/competitor-app/id123456
```

Use the `analyzing-competitors` skill to extract features, positioning, monetization model, content strategy, and identify gaps. Append findings to `research/competitive-landscape.md` with a new section for this competitor.

### `hidden-competitors`
Discover additional competitors beyond your known list, including niche players, international apps, and adjacent market competitors.

Use the `discovering-hidden-competitors` skill to search for competitors using dimensions defined in `domain-config.md`. Append findings to `research/competitive-landscape.md`.

### `market`
Gather market sizing data, trends, and growth projections for your target market.

Use the `researching-market-opportunity` skill to calculate TAM/SAM/SOM, analyze market segments, and document findings in `research/market-opportunity.md`.

### `community`
Mine online communities (Reddit, Facebook, Discord, forums) for user insights, pain points, and demand signals.

Use the `mining-community-insights` skill to analyze communities defined in `domain-config.md` and extract feature requests, competitor sentiment, and user personas. Document in `research/community-insights.md`.

### `assumptions`
Test hypotheses documented in the root `assumptions.md` file against research findings.

Read the user's `assumptions.md` file from the project root, then review all research findings to validate or invalidate each assumption. Document evidence for or against each hypothesis in `research/assumptions-validation.md`.

## Instructions for Claude

**First step for all research commands:**
1. Check if `domain-config.md` exists in project root
2. If missing, inform user to create it from `domain-config.template.md`
3. Read domain configuration and extract:
   - Product name
   - Market category
   - Search keywords
   - Key communities
   - Adjacent categories
   - Analysis dimensions
4. Apply this context throughout the research process
5. If sources are inaccessible, request user-provided sources or notes and proceed only with what is provided

---

When the user runs `/research [subcommand]`:

1. **For `competitor <url>`:**
   - Extract the URL from arguments
   - Read `domain-config.md` for product context and analysis dimensions
   - Use the `analyzing-competitors` skill to analyze this specific competitor
   - Fetch the competitor's website/app store page
   - Extract features, positioning, monetization, content approach, and domain-specific features
   - If `research/competitive-landscape.md` doesn't exist, create it
   - Append a new section for this competitor to the file
   - Provide a brief summary of key findings and competitive gaps with citations
   - Include "Limits and Unknowns" and note any missing data

2. **For `hidden-competitors`:**
   - Read `domain-config.md` for search dimensions and adjacent categories
   - Use the `discovering-hidden-competitors` skill
   - Search for niche, adjacent, and international competitors
   - Append discoveries to `research/competitive-landscape.md`
   - Summarize findings with citations and suggest if any should be analyzed in detail with `/research competitor`
   - Include "Limits and Unknowns" and note any missing data

3. **For `market`:**
   - Read `domain-config.md` for market category, subcategory, and target audience
   - Use the `researching-market-opportunity` skill
   - Execute market sizing and trend analysis
   - Create `research/market-opportunity.md`
   - Summarize key market insights with citations
   - Include "Limits and Unknowns" and note any missing data

4. **For `community`:**
   - Read `domain-config.md` for communities and search keywords
   - Use the `mining-community-insights` skill
   - Analyze online communities for user insights
   - Create `research/community-insights.md`
   - Summarize key pain points and demand signals with citations
   - Include "Limits and Unknowns" and note any missing data

5. **For `assumptions`:**
   - First, check if `assumptions.md` exists in the project root
   - If it doesn't exist, inform the user they need to create it with their hypotheses
   - Read the assumptions from the file
   - Review all files in `research/` directory (if present): `competitive-landscape.md`, `market-opportunity.md`, `community-insights.md`, `assumptions-validation.md`
   - For each assumption, label as Supported, Contradicted, or Inconclusive with evidence citations
   - If evidence is missing, note what research is needed next
   - Create `research/assumptions-validation.md` with validation results
   - Summarize which assumptions are validated, which need more research, and which are contradicted
   - Include "Limits and Unknowns"

If no subcommand is provided, ask the user which research area they want to explore.
