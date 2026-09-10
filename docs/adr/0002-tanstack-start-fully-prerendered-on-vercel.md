---
status: accepted (pending spike verification)
---

# TanStack Start, fully prerendered, on Nitro/Vercel

This site is a static content archive with no database and no server-side requirements, yet it is built on TanStack Start — a full-stack framework. We chose it for the TanStack Router developer experience and for the headroom to add server functionality later for a single Playground Experiment, and we run it in fully prerendered mode (`prerender.enabled`, `crawlLinks`, sitemap on) so that nothing is server-rendered at request time.

## Considered Options

- **TanStack Start, prerendered (chosen)**: the routing DX we want, plus a per-experiment escape hatch to server functions without a migration.
- **TanStack Router + Vite SSG, no Start**: simpler and a bulletproof static deploy, but gives up the escape hatch. This remains the fallback.
- **Start with SSR**: rejected. A site made of static files should not have a running server between it and its readers.

## Consequences

TanStack Start was still a v1.0 Release Candidate when this was decided (`@tanstack/react-start` 1.168.51, September 2026), and Vercel deployment requires manually adding Nitro rather than being zero-config. Two open upstream issues sit directly in this path: prerendering under Nitro v3 on Vercel (nitrojs/nitro#3905) and `vercel.json` being ignored (TanStack/router#4021). This decision is therefore validated by a deploy spike _before_ any design system or content work: static HTML for a nested dynamic route, no server function invoked to serve pages, and a repeatable second deploy. If the spike fails, we fall back to TanStack Router + Vite SSG and every other project decision stands unchanged.

Because everything is prerendered, dynamic OG image generation is off the table; OG images are a static default plus an optional per-content override.
