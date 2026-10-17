# Billy Johnson — Digital Portfolio — project context

Read this first in any session touching this repo.

**What it is:** the owner's professional portfolio, for job applications.
Started 17 October 2026: "This is the start of my digital profile and it
needs to stay up to date."
- Live: https://rafikiscyent888.github.io/RafikiScyent888-Digital-Portfolio-/
  (repo `RafikiScyent888-Digital-Portfolio-`, the owner's choice of name; the
  trailing dash is part of it). GitHub Pages serves `main`.
- `index.html` is the whole site: no build step, no framework. `README.md`
  is the same story for the repo page. `verify/page.mjs` is the check.

## The standing instruction (owner, 17 October 2026)

"I want this to be updated after each project is finished ... I will tell you
when to update it. When the digital portfolio is updated, please tell me what
hyperlink to add to my resume."
- Update only when the owner says so.
- After each update, give the owner the hyperlinks for the resume:
  - Portfolio: https://rafikiscyent888.github.io/RafikiScyent888-Digital-Portfolio-/
  - GitHub: https://github.com/RafikiScyent888

### How to update it
1. Add the project to **Featured builds** (or **Also in the program**) in
   `index.html`, and to the table in `README.md`. Use the live link exactly as
   the Cyber Warrior Command Center has it.
2. Add its site to `LIVE` and its repo to `REPOS` in `verify/page.mjs`.
   If a count changes (questions, acronyms), recount from the live banks and
   update the page, the README and `FACTS` together.
3. Change "Last updated" to the day's date.
4. `node verify/page.mjs`, then push, then check the remote commit and the
   Pages deployment before telling the owner it's live.

## Decisions (owner, 17 October 2026)

- **Resume links:** both, on separate lines: the portfolio and the GitHub
  profile.
- **Contact:** LinkedIn only (https://www.linkedin.com/in/billy-johnson-986b89354).
  No email anywhere; the check fails on one.
- **Certifications held:** CompTIA A+, Network+, Security+, CySA+ (all four,
  confirmed by the owner). Never list one the owner hasn't confirmed.
- **Authorship, said plainly:** the owner designs and directs every build; the
  code is written with AI-assisted development (Claude Code). The commit
  history shows Claude as co-author, so the page says so too.
- **Facts come from the owner's own July draft** (repo `Billy-Johnson`): the
  roles, the MyComputerCareer role, the National Guard service, the teaching
  approach. Invent nothing about the owner; ask.
- **Banner:** emerald (`#083c29` to `#0d5c3f`), the owner's pick of six greens
  previewed on the real page on 17 October 2026 (Forest, Emerald, Moss, Sage,
  Mint, Pistachio): "B, please." Its colours are the `--band-*` and `--pill-*`
  variables in `index.html`, so a later change touches only those. On a green
  this deep, buttons darken on hover (a light tint dropped their lettering to
  6.5:1), and the PORTFOLIO label is cream-gold at large size.
- **Voice:** the owner's saved writing style (the `my-writing-style` skill),
  in its professional register: measured, firm, no jargon, one question and
  answer, a little "steadfast, anchored" vocabulary.
- **Numbers are counted, not estimated:** 3,726 practice questions (Core 1
  718, Core 2 630, Network+ 968, Security+ 814, CySA+ 596) and 846 acronyms
  (A+ 202, Network+ 135, Security+ 334, CySA+ 175), counted from the live
  banks on 17 October 2026.

## Standards

- WCAG AAA (7:1 body, 4.5:1 large text), measured on painted pixels, desk and
  phone, easier reading off and on, hovered. Royal palette: navy, royal blue,
  gold, silver, purple.
- Easier reading is a toggle that stays on (`bj-easier-reading`).
- The full Cyber Warrior Program footer.
- Push after each verified change, authored as Claude, and check GitHub
  afterwards.

## The GitHub profile page itself

github.com/RafikiScyent888 only shows a README from a repo named exactly
`RafikiScyent888`. Until the owner creates that repo, this README shows on
this repo's page only. Name, photo, bio, website box and pinned repos are in
the owner's account settings, which a session can't reach.

## Checks

`node verify/page.mjs`: links (every one to a site the Command Center links
to, a repo on the account, LinkedIn, or this page; no email), the facts and
the four certifications, the footer and date, AAA on painted pixels, easier
reading staying on, no sideways scroll. `--plant` runs twelve planted mistakes,
all caught (17 October 2026), including the banner going back to navy and
the light hover tint coming back. The check measures with reduced motion: a
screenshot taken mid colour-fade measures the fade, which once reported the
header buttons at 2:1 when they were fine.
