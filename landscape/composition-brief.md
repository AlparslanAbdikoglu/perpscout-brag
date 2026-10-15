# Hyperframes Composition Brief: PerpScout

## Objective
Create a short launch-style brag video for PerpScout.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 23.46s

## Source Material
- Project root: `C:\Users\MSI\desktop\code\agent\crypto`
- Primary files read: index.html (full CSS + calc logic), README.md, firms.json (fees/sizes)
- Product name: PerpScout
- Tagline / strongest claim: "The crypto prop firm directory." / "Know every rule before you pay."
- Key UI moment to recreate: odds calculator (inputs + 4 output tiles), cheapest-per-$1k quick-pick card
- Copy that must appear verbatim:
  - Most challenge attempts fail.
  - Know every rule before you pay.
  - The crypto prop firm directory.
  - Fees, drawdown rules, profit splits and payout proof, side by side.
  - Is this challenge worth the fee?
  - A rough guide, not a forecast.
  - Missing data is shown as "not stated", never guessed.
  - Sourced, dated, and never for sale.

## Creative Direction
- Tone preset: deadpan
- Creative direction: the anti-hype prop-firm ad. Receipts instead of lambos.
- Interpretation: long holds, one idea per scene, dry site copy, sparse sound.
- Angle: open on the honest fact that most attempts fail, then show how you check the odds before paying.
- Hook: typed "Most challenge attempts fail." then "Know every rule before you pay."
- Outro / punchline: "Sourced, dated, and never for sale." + perpscout.cc
- Avoid: generic SaaS language, abstract filler, referral links/codes, creator handle, any redesign of the site look

## Visual Identity
- Background: #f7f8fa, ink #0f1115
- Text: #0f1115 / muted #586071
- Accent: #c8f169 (lime), #3f9b5a (green)
- Display font: Manrope 800 (assets/fonts/manrope-latin.woff2)
- Body font: Manrope
- Visual references: lime logo tile with trend arrow, white 1px-border cards radius 14-18, 4-up grey output tiles

## Storyboard
Use `brag-plan.md` as the creative contract.
1. Hook — 3.82s — typed two lines on ink
2. Reveal — 3.27s — logo slam + tagline
3. Cheapest per $1k — 4.37s — 3 rows on beats + hero sentence
4. Odds calculator — 6.01s — click, type 6→3, tiles swap, note
5. Outro — 5.64s — "not stated" line, then logo + never for sale + perpscout.cc

## Audio
- Audio role: sparse professional accents under a quiet bed
- Audio arc: bed under hook; key ticks; soft drops; click; one bell at the end
- Music: vol-12, `assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`
- Music treatment: volume 0.16, fade-out over final ~1s
- Music cue guidance: bundled preset `skills/brag/assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json` (109.96 BPM). Strong: 13.11 (click), 17.47 (outro). Grid: 3.82 slam; 7.64/8.19/8.74 rows.
- Audio-reactive treatment: none (extraction helper unavailable; deadpan restraint)
- SFX: keypress ticks, drop_001-003, mouseclick1, impactSoft_medium_001, bong_001 at 0.4-0.7

## Hyperframes Instructions
Hyperframes domain skills are not installed on this machine; the composition was built from `hyperframes docs` (data-attributes, compositions, gsap) and the CLI, run under Node 22 via npx. Run `hyperframes check` before render. Keep everything local.
