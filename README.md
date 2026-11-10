# @sudobility/resources_pages

Web UI for the Sudobility **resources catalog** — a responsive grid of tiles,
each showing an icon, title, description and shortened domain, linking out to a
helper resource. The RN mirror is `@sudobility/resources_pages_rn`.

Colour comes only from `@sudobility/design` (a peer dep, never bundled). The
host provides Tailwind and must add this package's `dist/**/*.js` to its content
sources so the classes are generated.

## Install

```bash
bun add @sudobility/resources_pages
```

## Usage

Presentational (host supplies data + copy):

```tsx
import { ResourcesPage } from "@sudobility/resources_pages";
import { shortenDomain } from "@sudobility/resources_client";

<ResourcesPage
  resources={resources}
  isLoading={false}
  error={null}
  labels={{ title: "Resources", empty: "Nothing here yet", errorTitle: "Error" }}
  formatters={{ shortenDomain }}
/>;
```

Connected (reads `resources_client`'s `useResources`; call `initializeResources`
at startup):

```tsx
import { ResourcesPageConnected } from "@sudobility/resources_pages";

<ResourcesPageConnected
  locale={currentLocale}
  labels={{ title: "Resources", empty: "Nothing here yet", errorTitle: "Error" }}
/>;
```

## Exports

- `ResourcesPage` — presentational grid.
- `ResourceTile` — a single tile (anchor card).
- `ResourcesPageConnected` — fetches via `useResources`.
- Types: `Resource`, `ResourcesPageProps`, `ResourcesPageLabels`, `ResourcesPageFormatters`, `ResourceTileProps`, `ResourcesPageConnectedProps`.

## Scripts

- `bun run verify` — typecheck + lint + unit tests + build.
- `bun run test:unit` — Vitest (jsdom). Do **not** run `bun test`.
