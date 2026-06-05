---
name: Poster Brief
description: Use when the user wants a marketing poster, social graphic, flyer, banner, or promo image. Produces a structured creative brief plus a ready-to-paste image-generation prompt (for Canva, Hugging Face / FLUX, or any image model).
---

# Poster Brief — from idea to a brief + a generation prompt

Claude can't render images itself, so this skill produces (a) a tight creative brief and
(b) a generation prompt you can run in **Canva** (you have it connected) or a free
**Hugging Face Space** (FLUX.1) and then finish in Canva.

## When invoked

1. **Collect the brief inputs** (ask only for what's missing, max 5 questions):
   - **What & why:** product/event + the one thing this poster must make people do.
   - **Audience:** who is looking, where (Instagram / print / web banner)?
   - **Key message + any exact copy:** headline, subhead, CTA, must-include text.
   - **Vibe:** 3 adjectives (e.g. "bold, playful, techy") + any brand colors/fonts.
   - **Format & size:** platform and dimensions (e.g. 1080×1350 IG portrait, A3 print).

2. **Produce the Creative Brief:**
   ```
   Objective:      <the action we want>
   Audience:       <who / where>
   Headline:       <punchy, <=7 words>
   Subhead:        <one supporting line>
   CTA:            <button/text>
   Palette:        <2–4 colors, with hex if known>
   Typography:     <vibe: e.g. heavy grotesk + clean sans>
   Layout notes:   <focal point, hierarchy, where text sits, negative space>
   Mood:           <3 adjectives>
   Must include:   <logo / legal / handles>
   Avoid:          <clichés / colors / styles to skip>
   ```

3. **Produce TWO generation prompts:**
   - **For Canva** (text + layout aware): a short natural-language design request naming
     the format, headline/subhead/CTA, palette and vibe — phrased to drive Canva's
     `generate-design`. Remind the user Canva output is a *starting draft* to finish in
     the editor; transparent PNG / resize need Pro.
   - **For an image model (FLUX / SD on Hugging Face)** — a descriptive prompt for the
     *background/hero visual only* (image models handle text poorly), e.g. style,
     subject, lighting, composition, color, aspect ratio. Tell the user to add the
     actual text/logo afterward in Canva.

4. **Offer next step:** if Canva is connected, offer to call it to generate a first draft
   now; otherwise point to a free FLUX Space (catalog → Creative/Marketing aisle).

## Notes
- Keep headlines short and the hierarchy obvious (one focal point).
- Check final text/background contrast for legibility (catalog has free contrast tools).
