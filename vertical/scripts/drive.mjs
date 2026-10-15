// Drives the LIVE perpscout.cc page as a pure function of time t and screenshots each frame.
// usage: CHROME_PATH=<chrome/chromium/headless-shell> node scripts/drive.mjs <outDir> [t1,t2,...]   (no list = all 600 frames at 30fps)
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const out = process.argv[2];
const only = process.argv[3] ? process.argv[3].split(",").map(Number) : null;
const FPS = 30, DUR = 20.0;
fs.mkdirSync(out, { recursive: true });

const b = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: "shell", args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 540, height: 960, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await p.goto("https://perpscout.cc/", { waitUntil: "networkidle0" });
await new Promise(r => setTimeout(r, 1200));

await p.evaluate(() => {
  const css = `
  html{scroll-behavior:auto!important}
  *{transition:none!important;animation:none!important}
  #ov{position:fixed;inset:0;pointer-events:none;z-index:9999;font-family:Manrope,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
  .dk{position:absolute;inset:0;background:#0f1115;color:#fff;opacity:0}
  #dk1 .wrap{position:absolute;left:34px;right:34px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:22px}
  #dk1 .ln{font-size:56px;font-weight:800;letter-spacing:-.045em;line-height:1.04;opacity:0}
  #dk1 .b{color:#aab1bf}#dk1 .lime{color:#c8f169}
  #dk2 .wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:30px;text-align:center;padding:0 30px}
  .lg{display:flex;align-items:center;gap:14px;opacity:0}
  .lg i{width:68px;height:68px;border-radius:19px;background:#c8f169;display:grid;place-items:center}
  .lg i svg{width:40px;height:40px}
  .lg b{font-size:62px;font-weight:800;letter-spacing:-.045em;color:#fff}.lg b em{font-style:normal;color:#c8f169}
  #nv{text-wrap:balance;font-size:34px;font-weight:700;color:#d5d9e1;letter-spacing:-.025em;line-height:1.15;opacity:0}
  #url{font-size:28px;font-weight:800;color:#c8f169;letter-spacing:.02em;opacity:0}
  #cap{position:absolute;left:50%;bottom:118px;transform:translate(-50%,0);background:#0f1115;color:#fff;border-radius:999px;padding:13px 22px;font-size:20px;font-weight:700;letter-spacing:-.01em;white-space:nowrap;opacity:0;box-shadow:0 6px 24px rgba(0,0,0,.28);border:1px solid #262a33}
  #cap em{font-style:normal;color:#c8f169}
  #cur{position:absolute;left:0;top:0;width:30px;height:30px;opacity:0;filter:drop-shadow(0 3px 4px rgba(0,0,0,.35))}
  #rip{position:absolute;left:0;top:0;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;border:3px solid #3f9b5a;opacity:0}
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const ov = document.createElement("div"); ov.id = "ov";
  ov.innerHTML = `
   <div class="dk" id="dk1"><div class="wrap"><div class="ln" id="h1">Don't buy a prop firm challenge blind.</div><div class="ln b" id="h2">Know every rule before you <span class="lime">pay</span>.</div></div></div>
   <div class="dk" id="dk2"><div class="wrap">
     <div class="lg" id="lg"><i><svg viewBox="0 0 24 24" fill="none" stroke="#0f1115" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg></i><b>PerpScout<em>.</em></b></div>
     <div id="nv">Sourced, dated, and never for sale.</div><div id="url">perpscout.cc</div></div></div>
   <div id="cap"></div>
   <div id="rip"></div>
   <svg id="cur" viewBox="0 0 24 24"><path d="M4 2l15 9-6.5 1.6L9.6 19z" fill="#fff" stroke="#0f1115" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  document.body.appendChild(ov);

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const ease = x => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const eo = x => 1 - Math.pow(1 - clamp(x), 3);
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const $ = s => document.querySelector(s);
  const clicked = {};
  const click = (key, fn) => { if (!clicked[key]) { clicked[key] = 1; fn(); } };
  const center = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  let lastCur = [580, 800];

  function pop(el, t, a, d = .35, dy = 22) { const k = eo(seg(t, a, a + d)); el.style.opacity = k; el.style.transform = `translateY(${(1 - k) * dy}px)`; }

  window.__setT = function (t) {
    // ---- dark layers (dip transitions)
    $("#dk1").style.opacity = t < 3.7 ? 1 : 1 - seg(t, 3.7, 4.05);
    $("#dk2").style.opacity = seg(t, 15.5, 15.85);
    $("#dk1").style.display = t < 4.1 ? "block" : "none";
    pop($("#h1"), t, .2, .45, 26); pop($("#h2"), t, 1.4, .45, 26);

    // ---- real page actions
    if (t >= 7.6) click("hyper", () => $('[data-cmp="hypernova"]').click());
    if (t >= 8.4) click("vest", () => $('[data-cmp="vest"]').click());
    if (t >= 9.2) click("brk", () => $('[data-cmp="breakout"]').click());
    if (t >= 10.5) click("go", () => $("#tray .go").click());
    const cmp = $("#cmp"); const cmpTop = cmp.classList.contains("show") ? cmp.getBoundingClientRect().top + scrollY : 1791;

    // ---- scroll as function of time
    let y;
    if (t < 3.9) y = 540;
    else if (t < 7.0) y = 540 + (1560 - 540) * ease(seg(t, 3.9, 7.0));
    else if (t < 10.5) y = 1560;
    else if (t < 11.4) y = 1560 + (cmpTop - 20 - 1560) * ease(seg(t, 10.5, 11.4));
    else y = cmpTop - 20 + 560 * ease(seg(t, 11.4, 15.5));
    window.scrollTo(0, y);

    // ---- cursor
    const cur = $("#cur"), rip = $("#rip");
    const tg = [["[data-cmp=\"hypernova\"]", 7.6], ["[data-cmp=\"vest\"]", 8.4], ["[data-cmp=\"breakout\"]", 9.2], ["#tray .go", 10.5]];
    let pos = [580, 800], op = 0;
    if (t >= 6.9 && t < 11.6) {
      let from = [580, 800], tPrev = 6.9;
      pos = from;
      for (let i = 0; i < tg.length; i++) {
        const [sel, tc] = tg[i];
        const el = $(sel); const to = el ? center(el) : lastCur;
        const t0 = i === 0 ? 6.9 : tg[i - 1][1] + .12;
        if (t <= tc) { const k = ease(seg(t, t0, tc)); pos = [from[0] + (to[0] - from[0]) * k, from[1] + (to[1] - from[1]) * k]; break; }
        from = to; pos = to;
      }
      if (t > 10.5) { const k = ease(seg(t, 10.62, 11.4)); pos = [pos[0] + (400 - pos[0]) * k, pos[1] + (700 - pos[1]) * k]; }
      op = Math.min(seg(t, 6.9, 7.1), 1 - seg(t, 11.1, 11.5));
    }
    cur.style.opacity = op; cur.style.transform = `translate(${pos[0] - 6}px,${pos[1] - 3}px)`;
    // click squish + ripple
    let rk = 0, rpos = pos, sq = 1;
    for (const [sel, tc] of tg) {
      if (t >= tc - .06 && t < tc + .5) {
        const el = $(sel); const c = el ? center(el) : pos;
        if (t >= tc) { rk = seg(t, tc, tc + .45); rpos = c; }
        if (t < tc + .12) sq = .84;
      }
    }
    rip.style.opacity = rk > 0 ? .85 * (1 - rk) : 0;
    rip.style.transform = `translate(${rpos[0]}px,${rpos[1]}px) scale(${.5 + rk * 1.5})`;
    if (sq !== 1) cur.style.transform += ` scale(${sq})`;

    // ---- captions
    const cap = $("#cap");
    let txt = "", a = 0, bb = 0;
    if (t >= 4.2 && t < 6.95) { txt = '<em>6</em> crypto prop firms, side by side.'; a = 4.2; bb = 6.95; }
    else if (t >= 7.05 && t < 10.3) { txt = 'Tap the firms you’re weighing.'; a = 7.05; bb = 10.3; }
    else if (t >= 11.0 && t < 15.4) { txt = 'Best number in each row, <em>marked</em>.'; a = 11.0; bb = 15.4; }
    if (txt) { cap.innerHTML = txt; const k = Math.min(eo(seg(t, a, a + .3)), 1 - seg(t, bb - .2, bb)); cap.style.opacity = k; cap.style.transform = `translate(-50%,${(1 - eo(seg(t, a, a + .3))) * 18}px)`; }
    else cap.style.opacity = 0;

    // ---- outro
    const lg = $("#lg"); const k1 = eo(seg(t, 15.9, 16.35)); lg.style.opacity = k1; lg.style.transform = `scale(${1.18 - .18 * k1})`;
    pop($("#nv"), t, 16.55, .45, 20); pop($("#url"), t, 17.3, .4, 16);
  };
  document.fonts.load("800 56px Manrope");
});
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 500));

const times = only || Array.from({ length: Math.round(FPS * DUR) }, (_, i) => i / FPS);
let n = 0;
for (const t of times) {
  await p.evaluate(tt => window.__setT(tt), t);
  const name = only ? `t${String(t).replace(".", "_")}.png` : `f${String(n).padStart(4, "0")}.jpg`;
  await p.screenshot(only ? { path: `${out}/${name}` } : { path: `${out}/${name}`, type: "jpeg", quality: 92 });
  n++;
}
await b.close();
console.log("done", n);
