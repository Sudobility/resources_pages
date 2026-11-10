# resources_pages (`@sudobility/resources_pages`)

Web UI components for the resources catalog. React + Tailwind utility classes,
themed through `@sudobility/design`. Built with `tsc` + Vite (ESM lib) +
`fix-esm-imports.mjs`. Vitest (jsdom) for tests.

## Two-tier architecture (keep it)

- **Presentational** (`ResourcesPage`, `ResourceTile`): all data, state, copy
  (`labels`) and formatting (`formatters`) via props; no fetching, no hooks.
- **Connected** (`ResourcesPageConnected`): calls `resources_client`'s
  `useResources` and renders the presentational page.

Loading / empty / error / content render as four independent blocks, matching
consumables_pages.

## Colour comes from the design system (enforced)

`@sudobility/design` is a **peer dep and a Vite external** — never bundled (a
bundled second copy is unconfigured and returns the un-themed palette). Author
every class as a complete string literal; use only semantic tokens
(`text-foreground`, `text-muted-foreground`, the `colors.*`/`ui.*` strings) and
layout utilities — never a raw palette colour or `theme-*` class.
`__tests__/design-system.test.ts` holds the package to that (empty allow-list).

## Build & test

- `bun run verify` before every push.
- A tile is an `<a target="_blank" rel="noopener noreferrer">`; the shortened
  domain comes from the `shortenDomain` formatter (default: resources_client's).
- CI delegates to `johnqh/workflows` with `publish-target: github`.
