/* =====================================================================
   BILLY JOHNSON — PORTFOLIO, checked the way an employer sees it

   1. LINKS     every link goes somewhere real: a site the Cyber Warrior
                Command Center already links to (LIVE), a repo on the account
                (REPOS), the LinkedIn profile, or a place on this page. No
                email address anywhere (the owner: LinkedIn only).
   2. FACTS     the name, the three roles, exactly the four certifications
                held, the emerald banner (the owner's pick, 17 October 2026), the verified counts (3,726 questions, 846 acronyms),
                and the plain statement of how the builds are made
   3. FOOTER    the full Cyber Warrior Program wording, and a "Last updated"
   4. CONTRAST  WCAG AAA on painted pixels (7:1 body, 4.5:1 large), desk and
                phone, easier reading off and on, at rest and hovered
   5. READING   the easier-reading toggle stays on after a reload
   6. PHONE     nothing scrolls sideways at 360px

   Run:        node verify/page.mjs
   Calibrate:  node verify/page.mjs --plant   (every plant must be caught)
   When a project is added: add its site to LIVE (once it is on the Command
   Center) and its repo to REPOS, and update FACTS if a count changed.
   ===================================================================== */
import { readFileSync, writeFileSync, mkdtempSync, cpSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { tmpdir } from "os";
import { createServer } from "http";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PW = process.env.PW || "/opt/node22/lib/node_modules/playwright/index.mjs";
const CHROME = process.env.CHROME || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

/* the Command Center's own live links (read from it on 17 October 2026) */
const LIVE = new Set("A-Core-1-Field-Service-Center A-Core-1-tile A-Core-1-under-the-hood-labs A-Core-2-Field-Service-Center A-Core-2-Under-the-Hood- A-Core-2-tile A-acronym-games. Cloud-aaS-Learning-Hub Core-1-Sims Core-1-quizzes Core-2-Sims Core-2-quizzes CySA-Acronyms CySA-CVSS-Center CySA-Sims CySA-Tile CySA-questions Face-Off-Games Face-off-A-Core-1 Face-off-A-Core-2 Face-off-CySA Face-off-Networking Face-off-Security IPv6-Drills Interactive-labs Network-Acronyms Network-Sims Network-Tile Network-quizzes OSI-Model Patch-Bay Physical-Security-and-Resiliency-Design- Port-Quiz Security-Acronyms Security-Awareness-Center Security-Questions Security-Sims Security-Start-up-Firewall Security-Tile Shane-s-Retake-Planner-2.0 Subnet-Calculator-for-Network Supplementary-Certs The-E4-Mafia-Network Under-the-Hood-labs Universal-tile Veterans-Overcoming-Odds-SOC Windows-Linux-Commands Cyber-Warrior-Command-Center-2.0".split(" "));
/* the repos on the account (17 October 2026) */
const REPOS = new Set("Physical-Security-and-Resiliency-Design- Cyber-Warrior-Command-Center-2.0 Supplementary-Certs Face-off-CySA CySA-Acronyms The-E4-Mafia-Network Under-the-Hood-labs Face-off-Networking Face-off-A-Core-2 Face-off-A-Core-1 Face-off-Security A-Core-2-Under-the-Hood- CySA-Sims Core-2-quizzes Core-1-quizzes CySA-questions Security-Questions Network-quizzes Shane-s-Retake-Planner-2.0 Security-Start-up-Firewall A-Core-1-under-the-hood-labs Veterans-Overcoming-Odds-SOC Security-Acronyms Patch-Bay CySA-CVSS-Center Security-Awareness-Center Interactive-labs A-Core-1-Field-Service-Center CySA-Tile Face-Off-Games A-Core-2-Field-Service-Center Universal-tile Port-Quiz IPv6-Drills OSI-Model Subnet-Calculator-for-Network Core-1-Sims Security-Tile Network-Tile A-Core-2-tile A-Core-1-tile Cloud-aaS-Learning-Hub Security-Sims Network-Sims Windows-Linux-Commands Network-Acronyms A-acronym-games. Core-2-Sims RafikiScyent888 RafikiScyent888.github.io RafikiScyent888-Digital-Portfolio-".split(" "));
const LINKEDIN = "https://www.linkedin.com/in/billy-johnson-986b89354";
const FOOTER = "Cyber Warrior Program — built by an instructor, for students, to make certification study more interactive. For educational purposes only. Not affiliated with, endorsed by, or sponsored by CompTIA®. All trademarks belong to their respective owners.";
const CERTS = ["CompTIA A+", "CompTIA Network+", "CompTIA Security+", "CompTIA CySA+"];
const FACTS = ["Billy Johnson", "Cybersecurity Instructor", "Disabled U.S. Army National Guard Veteran", "Veteran Mentor", "3,726 practice questions", "846 acronyms", "AI-assisted development (Claude Code) under my direction", "Instructor I with MyComputerCareer"];

const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

function serve(dir, port) {
  return createServer((q, s) => {
    const p = q.url.split("?")[0];
    if (p !== "/" && p !== "/index.html") { s.writeHead(404); s.end(); return; }
    s.writeHead(200, { "content-type": "text/html" }); s.end(readFileSync(join(dir, "index.html")));
  }).listen(port);
}

/* paint-sample every run of text: hide the glyphs, screenshot, compare with the pixels under each run */
async function contrast(page) {
  const runs = await page.evaluate(() => {
    const out = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) {
      if (!n.textContent.trim()) continue;
      const el = n.parentElement, cs = getComputedStyle(el);
      if (el.closest("script,style") || !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
      let op = 1; for (let a = el; a && a.nodeType === 1; a = a.parentElement) op *= parseFloat(getComputedStyle(a).opacity);
      const rg = document.createRange(); rg.selectNodeContents(n);
      for (const r of rg.getClientRects()) if (r.width > 2 && r.height > 2)
        out.push({ t: n.textContent.trim().slice(0, 40), c: cs.color, op, s: parseFloat(cs.fontSize), b: parseInt(cs.fontWeight) >= 700, x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height });
    }
    return out;
  });
  const st = await page.addStyleTag({ content: "*{color:transparent!important;text-shadow:none!important;transition:none!important}" });
  const png = (await page.screenshot({ fullPage: true })).toString("base64");
  await st.evaluate(n => n.remove());
  /* the ratios are worked out in the page, so only the failures come back */
  const bad = await page.evaluate(async ({ png, runs }) => {
    const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const im = new Image(); im.src = "data:image/png;base64," + png; await im.decode();
    const c = document.createElement("canvas"); c.width = im.width; c.height = im.height;
    const g = c.getContext("2d", { willReadFrequently: true }); g.drawImage(im, 0, 0);
    const out = [];
    for (const r of runs) {
      const x0 = Math.max(0, Math.floor(r.x)), y0 = Math.max(0, Math.floor(r.y));
      const d = g.getImageData(x0, y0, Math.max(1, Math.min(Math.floor(r.w), im.width - x0)), Math.max(1, Math.min(Math.floor(r.h), im.height - y0))).data;
      const m = r.c.match(/\d+(\.\d+)?/g).map(Number), al = (m.length > 3 ? m[3] : 1) * r.op;
      const need = (r.s >= 24 || (r.b && r.s >= 18.66)) ? 4.5 : 7;
      let worst = 99;
      for (let i = 0; i < d.length; i += 4) { const p = [d[i], d[i + 1], d[i + 2]]; const fg = [0, 1, 2].map(k => al * m[k] + (1 - al) * p[k]); const q = ratio(fg, p); if (q < worst) worst = q; }
      if (worst < need) out.push(`${worst.toFixed(2)}:1 < ${need} "${r.t}"`);
    }
    return out;
  }, { png, runs });
  return { n: runs.length, bad };
}

async function run(dir, port) {
  const srv = serve(dir, port);
  const pw = await import(PW); const { chromium } = pw.default || pw;
  const browser = await chromium.launch({ executablePath: CHROME, args: ["--headless=new", "--no-sandbox"] });
  const fails = []; const fail = (rule, msg) => fails.push(`${rule} — ${msg}`);
  try {
    for (const vp of [{ name: "desk", width: 1280, height: 900 }, { name: "phone", width: 360, height: 800 }]) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, reducedMotion: "reduce" });   /* no colour fades: a screenshot mid-fade measures the fade, not the page */
      await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());   /* measured on the fallback fonts too: the page must hold up without them */
      const page = await ctx.newPage(); const errs = []; page.on("pageerror", e => errs.push(e.message));
      await page.goto(`http://127.0.0.1:${port}/`); await page.waitForTimeout(150);
      if (vp.name === "desk") {
        /* 1. links */
        const links = await page.$$eval("a[href]", as => as.map(a => a.getAttribute("href")));
        for (const h of links) {
          let m;
          if (/^mailto:/i.test(h)) fail("links", `an email link is on the page (${h}); the owner chose LinkedIn only`);
          else if ((m = /^https:\/\/rafikiscyent888\.github\.io\/([^/]+)\/$/.exec(h))) { if (!LIVE.has(m[1])) fail("links", `${h} isn't a site the Command Center links to`); }
          else if ((m = /^https:\/\/github\.com\/RafikiScyent888(?:\/([^/]+))?$/.exec(h))) { if (m[1] && !REPOS.has(m[1])) fail("links", `${h} isn't a repo on the account`); }
          else if (h === LINKEDIN || h === "#program") { /* fine */ }
          else fail("links", `unexpected link: ${h}`);
        }
        if (!links.includes(LINKEDIN)) fail("links", "no LinkedIn link");
        if (/@[a-z0-9-]+\.[a-z]{2,}/i.test(await page.content())) fail("links", "an email address is written on the page");
        /* 2. facts */
        const text = (await page.textContent("body")).replace(/\s+/g, " ");
        FACTS.forEach(f => { if (!text.includes(f)) fail("facts", `the page doesn't say "${f}"`); });
        const band = await page.$eval(".band", n => getComputedStyle(n).backgroundImage);
        if (!/rgb\(8, 60, 41\).*rgb\(11, 77, 53\).*rgb\(13, 92, 63\)/.test(band)) fail("facts", `the banner isn't the owner's emerald: ${band.slice(0, 90)}`);
        const certs = await page.$$eval(".certs li", ls => ls.map(l => l.textContent.trim()));
        if (JSON.stringify(certs) !== JSON.stringify(CERTS)) fail("facts", `certifications listed: ${JSON.stringify(certs)}`);
        /* 3. footer */
        const foot = (await page.textContent("footer")).replace(/\s+/g, " ");
        if (!foot.includes(FOOTER)) fail("footer", "the full Cyber Warrior Program wording is missing");
        if (!/Last updated \d{1,2} [A-Z][a-z]+ \d{4}/.test(foot)) fail("footer", "no \"Last updated\" date");
        /* 5. easier reading stays on */
        await page.click("#easier"); await page.reload(); await page.waitForTimeout(150);
        if (!(await page.evaluate(() => document.documentElement.classList.contains("easier"))) || (await page.getAttribute("#easier", "aria-pressed")) !== "true") fail("reading", "easier reading didn't stay on after a reload");
        await page.click("#easier"); await page.waitForTimeout(60);
      }
      if (errs.length) fail("page", `${vp.name}: script errors: ${errs.join(" | ")}`);
      /* 6. phone */
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) fail("phone", `${vp.name}: the page scrolls sideways`);
      /* 4. contrast: easier reading off and on, at rest and hovered */
      for (const easier of [false, true]) {
        await page.evaluate(on => document.documentElement.classList.toggle("easier", on), easier);
        const tag = `${vp.name}, easier reading ${easier ? "on" : "off"}`;
        await page.mouse.move(vp.width - 2, vp.height - 2); await page.waitForTimeout(60);   /* at rest: the mouse off every control */
        let r = await contrast(page); r.bad.forEach(b => fail("contrast", `${tag}: ${b}`));
        if (r.n < 60) fail("contrast", `${tag}: only ${r.n} text runs measured; the sweep isn't seeing the page`);
        for (const sel of [".pill.solid", ".pill.ghost", ".build .go a", "#easier"]) {
          await page.hover(sel); await page.waitForTimeout(80);
          r = await contrast(page); r.bad.forEach(b => fail("contrast", `${tag}, ${sel} hovered: ${b}`));
        }
        if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) fail("phone", `${tag}: the page scrolls sideways`);
      }
      await ctx.close();
    }
  } catch (e) { fail("run", "stopped early: " + String(e.message).split("\n")[0]); }
  finally { await browser.close(); srv.close(); }
  return fails;
}

const PLANTS = {
  email: { catches: "links", fn: s => s.replace('<a class="pill solid" href="https://www.linkedin.com', '<a class="pill ghost" href="mailto:billy.johnson@mycomputercareer.com">Email</a>\n      <a class="pill solid" href="https://www.linkedin.com') },
  deadlink: { catches: "links", fn: s => s.replace("https://rafikiscyent888.github.io/Patch-Bay/", "https://rafikiscyent888.github.io/Patch-Bay-2/") },
  nocert: { catches: "facts", fn: s => s.replace("<li>CompTIA CySA+</li>", "") },
  wrongcount: { catches: "facts", fn: s => s.replace("3,726 practice questions", "4,000 practice questions") },
  noauthorship: { catches: "facts", fn: s => s.replace(" with AI-assisted development (Claude Code) under my direction", "") },
  navyagain: { catches: "facts", fn: s => s.replace("--band-bg: linear-gradient(150deg, #083c29 0%, #0b4d35 50%, #0d5c3f 100%);", "--band-bg: linear-gradient(150deg, #0b1738 0%, var(--navy) 45%, #1a2f72 100%);") },
  lighthover: { catches: "contrast", fn: s => s.replace("--band-hover: rgba(0,0,0,0.22);", "--band-hover: rgba(245,247,255,0.12);") },
  shortfooter: { catches: "footer", fn: s => s.replace("Cyber Warrior Program — built by an instructor, for students, to make certification study more interactive. ", "") },
  goldtext: { catches: "contrast", fn: s => s.replace("  .build .track { align-self: flex-start; font-size: 0.86rem; font-weight: 700; color: var(--purple);", "  .build .track { align-self: flex-start; font-size: 0.86rem; font-weight: 700; color: var(--gold);") },
  greyfooter: { catches: "contrast", fn: s => s.replace("--soft-ink: #2b3553;", "--soft-ink: #7a8199;") },
  forgets: { catches: "reading", fn: s => s.replace('localStorage.setItem("bj-easier-reading", on ? "1" : "0")', '0') },
  sideways: { catches: "phone", fn: s => s.replace("  .tools { display: flex;", "  .tools { min-width: 640px; display: flex;") },
};

if (process.argv.includes("--plant")) {
  let all = true, port = 9031;
  for (const [name, p] of Object.entries(PLANTS)) {
    const dir = mkdtempSync(join(tmpdir(), "bj-")); cpSync(join(ROOT, "index.html"), join(dir, "index.html"));
    const src = readFileSync(join(dir, "index.html"), "utf8"); const out = p.fn(src);
    if (out === src) { console.log(`  MISSED  ${name.padEnd(13)} (the plant did not apply — it tests nothing)`); all = false; continue; }
    writeFileSync(join(dir, "index.html"), out);
    const fails = await run(dir, port++);
    const caught = fails.some(f => f.startsWith(p.catches + " —"));
    console.log(`  ${caught ? "caught " : "MISSED "} ${name.padEnd(13)} (expected a "${p.catches}" failure)`);
    if (!caught) { all = false; console.log("      got: " + (fails.slice(0, 2).join(" | ") || "nothing")); }
  }
  console.log(all ? `\nall ${Object.keys(PLANTS).length} plants caught.` : "\nA PLANT WAS MISSED.");
  process.exit(all ? 0 : 1);
} else {
  const fails = await run(ROOT, 9030);
  if (fails.length) { console.log("FAILURES:\n  " + fails.join("\n  ")); process.exit(1); }
  console.log("Portfolio: every link goes to a real site, repo or LinkedIn, no email; the facts and four certifications exact; full footer and date; AAA on painted pixels, desk and phone, easier reading off and on, at rest and hovered; easier reading stays on; no sideways scroll.");
}
