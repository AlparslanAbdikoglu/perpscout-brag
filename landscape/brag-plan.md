# Brag Plan: PerpScout

## What is this app?
PerpScout (perpscout.cc) is a directory that compares crypto prop-firm challenges side by side: fees, drawdown rules, profit splits, payout proof. Its whole pitch is that it is "never for sale".

## The angle
Prop-firm marketing is lambos and payout screenshots. PerpScout is the opposite: a calm, receipts-first ad. The honest line "most attempts fail" opens the video, and the product then shows how you check the odds before you pay. The joke is the restraint: a trading ad that admits the odds.

## Hook (first 2-3 seconds)
Dark frame. Typed line: "Most challenge attempts fail." (from the site's FAQ: "most attempts fail"). Beat. Then, in lime on the second line: "Know every rule before you pay." (the hero h1, verbatim).

## Key moments (the middle)
- Logo slam: lime tile + "PerpScout." wordmark, tagline "The crypto prop firm directory."
- "Cheapest per $1k funded" quick-pick card: three rows arrive one by one (Hypernova $4.8/1k, Vest Markets $8.0/1k, Breakout $9.0/1k, computed from firms.json fee/size).
- Odds calculator: cursor clicks "Max drawdown (%)", types 6 → 3. Pass odds drop 38% → 23%, expected value $90 → $32. Then "A rough guide, not a forecast."

## Outro / punchline
Dark. "Missing data is shown as "not stated", never guessed." Then logo + "Sourced, dated, and never for sale." + perpscout.cc.

## User flow worth showing
Entry (cheapest-per-$1k picks) → key action (change a rule in the odds calculator) → result (pass odds and expected value move). Real calc math from index.html: pass = dd / (dd + target); payout = size × target × split; EV = pass × payout − fee.

## Tone
- Preset: deadpan
- Creative direction: the anti-hype prop-firm ad. Receipts instead of lambos.
- Interpretation: long holds, one idea per scene, dry copy lifted straight from the site, sparse quiet sound, no hype animation.

## Format: landscape — 1920x1080
## Duration: 23.5s

## Visual identity (from the project)
- Background: #f7f8fa (light UI), #0f1115 (ink, hook/outro)
- Accent: #c8f169 (lime), green #3f9b5a
- Text: #0f1115, muted #586071
- Display font: Manrope 800 (self-hosted, tight -0.045em tracking)
- Body font: Manrope 500-700
- Strongest visual element: lime logo tile with trend-arrow icon; white bordered cards; the 4-up calculator output tiles

## Share copy (draft)
Most prop-firm challenge attempts fail. PerpScout lays out the fees, drawdown rules and payout proof before you pay, and the odds calculator does the math. perpscout.cc

## Audio direction
- Role: sparse professional accents under a quiet bed
- Music: happy-beats-business-moves-vol-12 (polished/deadpan fit), 109.96 BPM
- Music treatment: starts at 0, volume 0.16, fade-out over the last ~1s
- Music cue guidance: preset read (vol-12). Strong cues used: 17.47s (outro line), 13.11s (cursor click). 3.82s grid beat for the logo slam. Rows land on beats 7.64 / 8.19 / 8.74 (8.74 is a strong cue); the full set holds after.
- Audio-reactive treatment: none. The hyperframes-creative skill is not installed on this machine, so no extraction helper is available; deadpan tone wants stillness anyway. Documented, not blocking.
- SFX posture: sparse, motion-matched
- Audio-coupled moments: hook typed with key ticks; rows with soft drops; cursor click; typed "3"; one soft bell on the final logo
- Restraint rule: no whooshes, no risers, nothing above 0.7 volume

## Storyboard

### Scene 1 — Hook — 3.82s
Ink background. Line 1 "Most challenge attempts fail." types in (0.1s-1.1s), holds. Line 2 "Know every rule before you pay." types in below, "pay" in lime (1.5s-2.7s), holds to the cut. Reading hold: line 2 settled by 2.7s, visible 1.1s+ before cut.
Sequential/interaction: yes. Typed text, char by char.
Audio intent: dry, keyboard ticks
Audio-coupled idea: randomized keypress per ~3rd character
Music: bed fades in under the type
Transition mood: hard cut on the 3.82s beat → Scene 2

### Scene 2 — Reveal — 3.27s
Light #f7f8fa. Lime logo tile + "PerpScout." slams in at 3.82s. "The crypto prop firm directory." fades up at 4.5s and holds to 7.09s.
Sequential/interaction: none
Audio intent: first real hit
Audio-coupled idea: soft impact on slam
Transition mood: clean crossfade → Scene 3

### Scene 3 — Cheapest per $1k — 4.37s
Left: "Fees, drawdown rules, profit splits and payout proof, side by side." (hero copy). Right: white card "CHEAPEST PER $1K FUNDED" with three rows arriving one by one: Hypernova $120 / $25k → $4.8 per $1k; Vest Markets $40 / $5k → $8.0; Breakout $45 / $5k → $9.0. Full set holds ≥ 2.5s after the last row (rows are short labels; the left sentence carries the reading time).
Sequential/interaction: yes. Three rows on consecutive beats 7.64 / 8.19 / 8.74.
Audio intent: gentle, one tick per row
Audio-coupled idea: drop_001..003 per row
Transition mood: slide → Scene 4

### Scene 4 — Odds calculator — 6.01s
Large white card. "CHALLENGE ODDS CALCULATOR" / "Is this challenge worth the fee?" Inputs: Account size $5000, Fee $60, Profit target 10%, Max drawdown 6%, Profit split 80%. Outputs 38% fair-game pass odds, $400 first payout if target hit, $90 expected value / attempt, 15% pass odds to break even. Cursor enters, clicks Max drawdown at 13.11s (strong cue), value 6 → 3, tiles swap to 23% / $400 / $32 / 15%. Note "A rough guide, not a forecast." lands at 15.29s and holds ≥ 1.8s.
Sequential/interaction: yes. Simulated click and type.
Audio intent: tactile, honest
Audio-coupled idea: mouse click on 13.11s, one keypress on the typed "3"
Transition mood: hard cut to dark → Scene 5

### Scene 5 — Outro — 5.0s total (two beats)
5a (17.47–20.19): ink. "Missing data is shown as "not stated", never guessed." Strong cue 17.47s. Holds 2.7s.
5b (20.19–23.46): logo tile + "PerpScout." + "Sourced, dated, and never for sale." + "perpscout.cc". Soft bell at 20.2s. Music fades out to the end.
Sequential/interaction: none
Audio intent: quiet landing
Transition mood: slow crossfade between 5a and 5b

**Music mood for this video:** deadpan, quiet corporate bed
**Audio summary:** a barely-there bed, key ticks in the hook, soft drops on the list, one click, one bell on the logo.

## Notes
- Source read from the local deploy folder `agent/crypto` (README says it is the live Cloudflare Pages site). Live URL was not fetched.
- Firm names and fees are public listing data from the site's own firms.json. Referral codes, affiliate links and the creator's handle are deliberately left out of the video.
