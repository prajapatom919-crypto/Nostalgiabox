# Phase 6 — Editorial Depth & Archive Identity

Date: 5 October 2026
Commit: `feat: deepen archive identity and editorial experience`
Scope: editorial depth, archive metadata, navigation, metadata and production quality.
No redesign, no new framework, no backend, no new dependencies.

---

## 6.1 Featured Memory — implemented (archive page only)

**Decision:** the featured item lives on `memories.html`, not the homepage.

- The homepage already has a strong archive-discovery structure (four-card "Latest from the Archive" grid plus "Browse Complete Archive"), so adding a featured block there would have crowded it. `index.html` was left structurally untouched in this phase.
- The block sits above "Latest Stories", outside the filter grid, and does not respond to search/category/era filters (it is an editorial pick, not a filtered result).
- Content is an existing real article: *The Evolution of Cartoon Theme Songs: From the 90s to the Early 2000s*.
- Restrained treatment: `section.featured-memory` with an accent left border, metadata line (`Cartoons · 1990s–2000s · Theme Songs`), one-paragraph standfirst and a single text link. No carousel, no hero rebuild, no new imagery.
- The same article also remains a normal card in the grid; it is listed once as featured and once as a card (no repeated promotion elsewhere).

## 6.2 Archive Metadata — implemented

Every archive card and article now carries a defensible metadata line:

| Article | Card / article metadata |
|---|---|
| Pressing Record: Taping Songs Off the Radio | Music · 1980s–2000s · Radio & Recording |
| Ringtones and Caller Tunes | Everyday Memories · 2000s · Phone Culture |
| School-Time Music | Everyday Memories · 1990s–2000s · School Days |
| The Evolution of Cartoon Theme Songs | Cartoons · 1990s–2000s · Theme Songs |
| Before Streaming: Cassettes, CDs and TV | Music · 1980s–1990s · Physical Media |
| Why Old Songs Feel Different | Music · Memory & Psychology (no era — see 6.3) |
| Indian Television Memories | Television · 1990s–2000s · Family Viewing |

- On cards: tag (category, unchanged) + date (unchanged) + a muted `archive-card-detail` line with era · memory type.
- On articles: `article-meta-tags` line under the byline inside the existing `.policy-meta` block.
- Eras/types are stored as `data-era` / `data-type` on each card and are also searchable (search now matches title, description, tag, era and memory type in addition to Phase 5 behaviour).
- Category tag remains the single category signal — no duplicated category text.

## 6.3 Era Discovery — implemented

- Client-side `era-filter` button group (`All Eras`, `1980s`, `1990s`, `2000s`) added to the archive controls, with `role="group"`, `aria-label` and `aria-pressed` state, matching the existing category filter's behaviour and visual language.
- Combines with Phase 5: category + era + search are AND-ed in the same `filterCards()` pass; no page reload, no URL parameters, no per-era pages.
- Cards use a space-separated `data-era` list (e.g. `1990s 2000s`), so an article genuinely spanning two decades matches both.

**Documented limitations (intentionally not invented):**
- **No 2010s button** — no article in the archive genuinely centres on the 2010s; a button that always returned zero results would be misleading.
- **"Why Old Songs Feel Different" has no era** — it is a psychology essay about music and memory, not a period piece. It appears only under *All Eras* and is hidden when any specific era is selected (verified by test).
- Era assignment is only used where the article text actually discusses that period; no era was assigned because an article "feels nostalgic".

## 6.4 Editorial Quality Audit — completed, one correction made

Audited all four existing articles (structure, tone, accuracy, internal navigation).

**Verified as defensible (checked against sources, no change needed):**
- Cartoon Network India launched 1995, Hindi programming from 1999 (article says "launched in 1995 … Hindi audio feeds by 1999").
- Hindi *The Jungle Book* broadcast on Doordarshan in 1993; title song lyrics Gulzar, music Vishal Bhardwaj.
- *Superhit Muqabla* on DD Metro (1990s countdown show).
- *Binaca Geetmala* run (Radio Ceylon → Vividh Bharati, hosted by Ameen Sayani) — used in the new radio article.
- Nostalgia coined in the 17th century; reminiscence bump roughly ages 10–30; "Home Taping Is Killing Music" BPI campaign of 1981.

**Correction made (concrete defect, no wholesale rewrite):**
- `memories-music-memory.html`: the section headed **"Sources & Further Reading"** contained no sources — just a generic paragraph. Retitled to **"Exploring the Research Further"** and reworded two sentences so the heading matches the content and no vague "draws on established research" attribution is implied. Authorial voice and the rest of the article are untouched.

No other factual, structural or readability defects were found, so the other three articles were left unchanged. Home page copy, About/Contact/Privacy/Terms/Copyright content were not edited.

**Small shared-code updates (behaviour-preserving):**
- Random Memory lists on all seven articles and the archive now use one shared list of all seven URLs minus the current page (previously each page hard-coded three of four URLs).
- `type="button"` added to all filter and Random Memory buttons (they were implicitly `submit`; they are not in a form, so no behaviour change).

## 6.5 New Editorial Content — 3 articles added

| File | Title | Category · Era · Type |
|---|---|---|
| `memories-radio-cassette.html` | Pressing Record: Taping Songs Off the Radio | Music · 1980s–2000s · Radio & Recording |
| `memories-ringtone-caller-tunes.html` | Ringtones and Caller Tunes: When Your Phone Had a Soundtrack | Everyday Memories · 2000s · Phone Culture |
| `memories-school-music.html` | School-Time Music: Assembly Halls, Annual Days and Bus Rides | Everyday Memories · 1990s–2000s · School Days |

- Each is original prose of 1,100–1,500 words (comparable to the existing 1,450–1,880), with a strong opening, 7–8 H2 sections, a conclusion, Related Memories (3), prev/next navigation, Random Memory, canonical URL, title, meta description, social metadata, category/era metadata and the standard footer.
- The archive already covered: cartoon themes, physical media formats, music-psychology, and scheduled Indian television. Genuine gaps filled were: **capturing music from radio**, **phone sound culture (ringtones/caller tunes)**, and **school-day music** (the homepage promises school memories but no article existed).
- Topics deliberately **not** added because they duplicate existing coverage: Sunday-morning television and cable-TV channel surfing (both covered by the Indian television article).
- No listicles, no fabricated quotes, no invented statistics, no SEO-stuffed titles. Risky factual claims in the new articles were source-checked (Nokia tune ← Tárrega's *Gran Vals* (1902); Crazy Frog *Axel F* UK No. 1 in 2005; Airtel signature tune composed by A. R. Rahman in the 2000s; BPI 1981 campaign slogan; *Binaca Geetmala* history).
- New articles are published 5 October 2026 and appear at the top of the archive ("Latest Stories"), newest first. The homepage grid was **not** extended (its structure is locked); they are reachable through the archive and prev/next links.

## 6.6 Article Navigation — implemented

- `← Previous Memory` / `Next Memory →` block (`nav.article-nav`, `aria-label="Previous and next memory"`) on all seven articles, placed after Related Memories and before Random Memory.
- One logical archive order shared by the grid and the navigation (newest first):

  `radio-cassette → ringtone-caller-tunes → school-music → cartoon-theme-songs → cassette-cd-tv → music-memory → indian-television`

- First article shows only *Next*; last article shows only *Prev* (no dummy/disabled links, no broken links). Titles are shown under the direction label so links are unambiguous.
- Each page has exactly one `.article-nav`; Related Memories cards were not changed, so existing cross-links are untouched.
- Responsive: side-by-side above 768px, stacked at ≤768px; verified no overflow at 1280/768/375.

## 6.7 Social Metadata — implemented on all 14 public pages

- Added to every page: `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `twitter:card` (`summary`), `twitter:title`, `twitter:description`.
- Values are byte-identical to each page's real `<title>` and meta description; `og:url` equals the canonical URL; `og:type=article` for the seven essays, `website` otherwise. A dedicated script asserts title/description/URL equality across all pages — all consistent.
- **No `og:image` / social preview image was added**: no dedicated share image exists, and inventing or pointing at an unverified asset was forbidden. `twitter:card=summary` is valid without an image.
- Canonical URLs, titles and meta descriptions were preserved; no metadata was added to non-public resources.

## 6.8 Production Quality Audit

**HTML structure** — automated audit over all 14 pages: unique IDs, no heading-level jumps, single `h1` per page, canonical/title/description present, all images have `alt`, all internal links and `#anchor` targets resolve, `lang` + viewport present, `<main>` landmark present, `aria-labelledby`/`<label for>` references all resolve, no empty buttons, no `href="#"` dead links introduced.
Pre-existing notes (left alone): the player's `#youtubeLink` starts as `href="#"` and is filled by `script.js` at runtime; player control buttons have no `type` attribute (not in a form; player markup is locked).

**Accessibility** — keyboard tab order reaches search → category buttons → era buttons → cards in DOM order; Enter activates filters; visible focus styles confirmed; search input has an explicit `<label>`.
Two fixes: `aria-label="Playback progress"` on the player progress bar (it had `role="progressbar"` with no accessible name — `script.js` never writes aria attributes, so this is non-breaking), and `type="button"` on archive/article buttons.
Lighthouse: **memories.html 100 / 100 / 100, index.html 100 / 100 / 100, about.html 100 / 100 / 100, article pages 100 / 100 / 100** (accessibility / best practices / SEO).

**Responsive** — tested at 1280×900, 768×1024 and 375×812: no horizontal overflow on homepage, archive or articles; featured block, controls, metadata lines and prev/next all fit; the era filter wraps to its own row on desktop and stacks on small screens; card metadata stays inside its card.

**JavaScript** — no syntax errors, no null references, no duplicate listeners. Verified live: search, category filter, era filter, all pairwise and three-way combinations, empty-state, reset, metadata search, featured link, Random Memory navigation, prev/next navigation, Related Memories, and the music player (playlist loads, play advances elapsed time and progress, pause responds, next track switches, no uncaught errors).

**SEO / performance** — `robots.txt` unchanged; `sitemap.xml` updated with the three new URLs and `lastmod` 2026-10-05 for pages changed this phase; canonicals preserved. Cache-buster bumped `styles.css?v=5` → `v=6` across pages so the new CSS is not served stale, and `sw.js` cache name bumped `v2` → `v3` with the shell entry updated to `styles.css?v=6`. No libraries, frameworks, fonts, images or requests were added; the three new pages reuse the existing asset set exactly.

## Intentionally not implemented, and why

- **2010s era filter** — no article genuinely belongs to it (see 6.3).
- **Featured memory on the homepage** — homepage already has a strong discovery grid; would clutter (per brief guidance).
- **Extending the homepage "Latest" grid to the new articles** — homepage structure is locked; the archive links to everything.
- **Changing the existing Related Memories lists** on the four original articles — existing navigation is locked; cross-linking between new and old articles is handled by prev/next instead.
- **Per-era pages or URL parameters, og:image, 2010s metadata, an era for the psychology essay** — would require inventing content or assets.
- **Player play/pause `aria-label` state update** — the label never changes on click; that is pre-existing `script.js` player behaviour, which is locked, so it was documented rather than modified.
- Accounts, comments, analytics, newsletter, CMS, backend, recommendation logic — out of scope by rule.

## Validation performed

- Static audit script (structure, links, anchors, IDs, headings, alt text, ARIA references, labels, sitemap coverage).
- Social-metadata equality script across all 14 pages — consistent.
- Puppeteer browser suite: **85/85 passed** (page loads, JS errors, responsive overflow, all filtering combinations, featured memory, Random Memory, prev/next across all seven articles, internal link HTTP 200, player checks, console errors).
- Puppeteer layout/interaction suite: **46/46 passed** (three viewports, keyboard navigation, focus styles, player playback).
- Lighthouse on homepage, archive, article and policy pages: 100 accessibility / 100 best practices / 100 SEO.
- Live server: `python -m http.server 8000`, archive URL `http://localhost:8000/memories.html`.
- All temporary test scripts and screenshots were removed before commit.
