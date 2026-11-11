/**
 * Prop contracts for the presentational resources components.
 *
 * The catalog is sectioned: the page renders a heading per section and a grid
 * of tiles under it. Every user-facing string arrives via `labels` and every
 * derived value via `formatters`; no component here fetches.
 */
import type { ReactNode } from 'react';
import type { Resource, ResourceSection } from '@sudobility/resources_client';

export type { Resource, ResourceSection };

export interface ResourcesPageLabels {
  /** Heading above the whole page. Pass '' to suppress it. */
  title: string;
  /** Shown (muted, centered) when there are no sections. */
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
  sections: ResourceSection[];
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
