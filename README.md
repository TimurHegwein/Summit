# TUM.ai Summit

Landing page for the **TUM.ai Summit** in San Francisco. The event has two tracks: talks and panels
with German founders, operators and investors who built in the Bay, and a hackathon where builders
from TUM.ai and the Bay Area ship real products in one weekend.

**Live:** https://summit.tum-ai.com

## Stack

- [Next.js 16](https://nextjs.org) App Router, statically exported (`output: "export"`)
- React 19 and Tailwind CSS 4
- [`@tum.ai/ui-kit`](https://www.npmjs.com/package/@tum.ai/ui-kit), the TUM.ai design system
  (sections, cards, header and footer)
- Hosted on Vercel (team `tum-ai`, project `summit`)

> Next.js 16 breaks several APIs from earlier versions. Read [`AGENTS.md`](AGENTS.md) before you
> change framework code.

## Getting started

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev    # http://localhost:3000
```

| Command         | What it does                                        |
| --------------- | --------------------------------------------------- |
| `npm run dev`   | Dev server with hot reload                          |
| `npm run build` | Static export to `out/`                             |
| `npm run lint`  | ESLint (Next.js core-web-vitals + TypeScript rules) |

## Project layout

```
app/          root layout, the page, global styles
components/   page-specific sections: hero, about, people marquee
content/      event.ts, all page copy and data
lib/          asset() helper for files in public/
public/       images: people/, logos/, hero and brand assets
```

## Editing content

Almost every change happens in [`content/event.ts`](content/event.ts). It holds the hero copy, the
stats (with their sources), tracks, partners, people and the contact address. Entries marked `TODO`
are placeholders that still need confirming.

**Add a person** (speaker, advisor, jury or organizer). Put their photo in `public/people/`, then add
an entry to the matching list:

```ts
{
  name: "Ada Lovelace",
  byline: "Founder, Example",
  image: asset("/people/Ada.jpg"),
  linkedin: "https://www.linkedin.com/in/…/",
},
```

**Add a partner.** Put the logo SVG in `public/logos/`, then add an entry to `partners`. Set
`aspectRatio` to the logo's width divided by its height. A logo that is only a mark, with no name in
the artwork, also needs a `wordmark` so the name appears beside it.

Reference files in `public/` through `asset()`, never as bare `"/…"` strings, so paths keep working
if the site is ever served under a sub-path.

## Deployment

Vercel deploys the site through its GitHub integration:

- A push to `main` deploys to production at https://summit.tum-ai.com.
- A pull request or any other branch gets a preview deployment, linked on the PR.

No environment variables are needed. `summit.tum-ai.com` is a CNAME to Vercel in the tum-ai.com
zone, which is hosted on Netlify DNS.
