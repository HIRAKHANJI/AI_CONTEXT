---
name: Prompt Forge
description: Use when the user needs to turn a rough idea into a polished, self-contained prompt to hand off to ANOTHER person or AI to execute (a build brief, a delegation prompt, a task spec, a "write me a prompt for X"). Produces a structured, copy-paste-ready prompt plus a quick quality check.
---

# Prompt Forge — generate a great prompt to delegate a task

Goal: take a vague request and produce a **complete, unambiguous prompt** the user can
paste to a colleague, freelancer, or another AI and get exactly what they want — without
being in the loop to clarify.

## When invoked

1. **Gather the essentials.** If any are missing from the user's request, ask up to 4
   crisp questions (no more):
   - **Goal / deliverable:** what should exist when this is done?
   - **Audience / executor:** who/what will run this prompt (a person? GPT? an image model? a junior dev)? Tune vocabulary and assumptions accordingly.
   - **Context & constraints:** stack, brand, tone, length, must-use / must-avoid, deadline.
   - **Definition of done:** how will they know it's correct?

2. **Forge the prompt** using this skeleton (include only the parts that apply):

   ```
   # Role
   You are <the most relevant expert role for this task>.

   # Context
   <Everything the executor needs that they don't already know.>

   # Task
   <The single, specific objective, in plain imperative language.>

   # Requirements / constraints
   - <hard requirements, one per line>

   # Inputs
   <Any data/files/links they'll work from, or "ask the user for X".>

   # Output format
   <Exact shape of the result: format, length, structure, file type.>

   # Quality bar / definition of done
   - <checklist the executor can self-verify against>

   # If unsure
   <What to assume vs. when to stop and ask.>
   ```

3. **Self-check** the forged prompt against this rubric and fix any weak spots before
   presenting it:
   - Could a stranger execute this with **zero** follow-up questions?
   - Is the deliverable and its format **unambiguous**?
   - Are success criteria **verifiable**?
   - Is it free of vague words ("nice", "good", "modern") unless they're defined?
   - Is it the right altitude for the executor (more spelled-out for a junior/AI, more
     latitude for an expert)?

4. **Deliver** in three blocks:
   - **The prompt** (in a single fenced code block, ready to copy).
   - **Why it's built this way** (2–3 bullets).
   - **Knobs to tweak** (what to change to make it stricter/looser, shorter/longer).

## Notes
- For prompts aimed at non-Claude models (GPT, Gemini, image models), keep structure
  but drop Claude-specific idioms; mention this to the user.
- For a fully authoritative pass, suggest running the result through Anthropic's Console
  **Prompt Improver** (free) — see the catalog's Prompting aisle.
