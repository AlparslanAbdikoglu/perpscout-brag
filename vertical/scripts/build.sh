#!/usr/bin/env bash
# Build the vertical video: capture frames from the live site, mix audio, encode.
# Needs: node >= 18, ffmpeg, a Chrome/Chromium (CHROME_PATH), and your own music file.
# usage: CHROME_PATH=/path/to/chrome ./scripts/build.sh /path/to/music.mp3 /path/to/sfx-dir
set -euo pipefail
MUSIC="${1:?music file}"; SFX="${2:?sfx dir (needs mouseclick1.ogg drop_001.ogg drop_002.ogg impactSoft_medium_001.ogg)}"
cd "$(dirname "$0")/.."
mkdir -p work/frames
node scripts/drive.mjs work/frames
ffmpeg -y -i "$MUSIC" -i "$SFX/mouseclick1.ogg" -i "$SFX/drop_001.ogg" -i "$SFX/drop_002.ogg" -i "$SFX/impactSoft_medium_001.ogg" -filter_complex "\
[0:a]atrim=0:20,asetpts=PTS-STARTPTS,volume=0.32,afade=t=in:st=0:d=0.6,afade=t=out:st=18.2:d=1.8[m];\
[1:a]lowpass=f=7500,volume=0.55,asplit=4[c1][c2][c3][c4];\
[c1]adelay=7550|7550[a1];[c2]adelay=8350|8350[a2];[c3]adelay=9150|9150[a3];[c4]adelay=10450|10450[a4];\
[2:a]lowpass=f=7000,volume=0.4,asplit=2[h1][h2];[h1]adelay=200|200[b1];[h2]adelay=1400|1400[b2];\
[4:a]lowpass=f=6500,volume=0.6,adelay=15900|15900[s1];\
[3:a]lowpass=f=7000,volume=0.4,asplit=2[u1][u2];[u1]adelay=16550|16550[s2];[u2]adelay=17300|17300[s3];\
[m][a1][a2][a3][a4][b1][b2][s1][s2][s3]amix=inputs=10:normalize=0:duration=longest,alimiter=limit=0.9,atrim=0:20[out]" \
  -map "[out]" -ar 48000 -c:a aac -b:a 192k work/audio.m4a
ffmpeg -y -framerate 30 -i work/frames/f%04d.jpg -i work/audio.m4a -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a copy -shortest -movflags +faststart brag.mp4
echo "wrote vertical/brag.mp4"
