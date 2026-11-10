/**
 * Prop contracts for the presentational resources components.
 *
 * Every user-facing string arrives via `labels` and every derived value via
 * `formatters`, so the host owns copy and i18n. No component here fetches.
 */
import type { ReactNode } from "react";
import type { Resource } from "@sudobility/resources_client";

export type { Resource };

export interface ResourcesPageLabels {
  /** Heading above the grid. Pass '' to suppress it. */
  title: string;
  /** Shown (muted, centered) when there are no resources. */
  empty: string;
  /** Title of the error alert. */
  errorTitle: string;
  /** Accessible label for a tile's open action, given the resource title. */
  openAriaLabel?: (title: string) => string;
}

export interface ResourcesPageFormatters {
  /** Short domain label under each tile, e.g. "musictheory.net". */
  shortenDomain: (url: string) => string;
}

export interface ResourceTileProps {
  resource: Resource;
  shortenDomain: (url: string) => string;
  /** Optional side-effect on open (analytics); navigation still happens. */
  onClick?: (resource: Resource) => void;
  openAriaLabel?: (title: string) => string;
}

export interface ResourcesPageProps {
  resources: Resource[];
  isLoading: boolean;
  error: string | null;
  labels: ResourcesPageLabels;
  formatters: ResourcesPageFormatters;
  /** Optional side-effect when a tile is opened (analytics). */
  onResourceClick?: (resource: Resource) => void;
  /** Overrides the default empty state. */
  emptyStateComponent?: ReactNode;
  className?: string;
}
