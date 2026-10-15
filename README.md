# perpscout.cc: launch videos and posts

Promo assets for [PerpScout](https://perpscout.cc), the crypto prop firm directory.

| Folder | What |
|---|---|
| `still/calculator.jpg` | The odds-calculator frame (38% → 23%) for the first tweet |
| `landscape/` | 23.5s deadpan video, 1920x1080. Made with the `/brag` skill + HyperFrames. Has the editable composition |
| `vertical/` | 20s vertical video, 1080x1920. Made with `/brag-slim`. Drives the **live** site and records it |
| `posts.md` | Tweet copy and the posting schedule |

## Music

The videos use a bundled "Happy Beats / Business Moves" track by ende.app. Its licence is unverified, so **the mp3 is not in this repo**, only the finished videos. To rebuild anything, use your own licensed track.

## Use it without AI (plain terminal)

The AI only wrote the files. Rendering and editing is ordinary Node, a browser and ffmpeg.

### Landscape video (HyperFrames)

Needs Node 22 or newer and ffmpeg.

```bash
cd landscape/composition
mkdir -p assets/music && cp /path/to/your-track.mp3 assets/music/music.mp3   # your own licensed music
npx hyperframes browser ensure        # one-time: downloads the render browser
npx hyperframes preview               # live preview in the browser
npx hyperframes check                 # lint + layout + contrast gate
npx hyperframes render --quality high --output ../brag.mp4
```

To change the video, edit `index.html`. It is plain HTML + CSS with a GSAP timeline:
- **Copy and numbers:** edit the text in the scene `<div>`s (`#s1` to `#s5`).
- **Timing:** each scene has `data-start` / `data-duration`. The animation times live in the `tl.…` lines at the bottom.
- **Sound effects:** the `<audio>` tags (`data-start`, `data-volume`).
- **Poster frame, then bake it in as frame 0:**

```bash
ffmpeg -ss 15.9 -i ../brag.mp4 -frames:v 1 -q:v 2 ../brag.jpg
ffmpeg -y -i ../brag.mp4 -i ../brag.jpg -filter_complex "[0:v][1:v]overlay=0:0:enable='eq(n,0)'[v]" \
  -map "[v]" -map "0:a?" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a copy -movflags +faststart ../brag.poster.mp4
```

For a different product, copy `landscape/composition/`, replace the copy and numbers, adjust the colours in `:root`, and render.

### Vertical video (live-site recorder)

Needs Node 18+, ffmpeg and a `chrome-headless-shell` binary.

```bash
cd vertical
npm install
npx @puppeteer/browsers install chrome-headless-shell@stable     # prints the path
export CHROME_PATH=/path/to/chrome-headless-shell
node scripts/drive.mjs work/frames 5,9.9,13          # test a few stills first (t in seconds)
./scripts/build.sh /path/to/your-track.mp3 /path/to/sfx-dir      # full 600 frames + audio + encode
```

`scripts/drive.mjs` loads perpscout.cc in a phone-sized browser and, for each frame, sets the scroll position, fires the real taps (Hypernova, Vest Markets, Breakout, then "Compare now") and draws the caption overlays. Every frame is a function of time, so renders are repeatable. Edit the timings, captions and tap targets at the top of that file to retarget another site. The sound effects need `mouseclick1.ogg`, `drop_001.ogg`, `drop_002.ogg` and `impactSoft_medium_001.ogg`. Copies of the landscape ones are in `landscape/composition/assets/sfx/`.

## Credits

- Videos: [brag](https://latent-spaces.github.io/brag/) skill + HyperFrames (`npx hyperframes`)
- Sound effects: Kenney.nl and unicae_games (CC0)
- Manrope font: SIL OFL
