/**
 * @fileoverview Connected resources page: reads the catalog from
 * resources_client's `useResources` hook (the host must have called
 * `initializeResources`) and renders the presentational ResourcesPage.
 */
import { useResources, shortenDomain } from '@sudobility/resources_client';
import { ResourcesPage } from './ResourcesPage';
import type { ResourcesPageFormatters, ResourcesPageLabels } from './types';

export interface ResourcesPageConnectedProps {
  /** Locale to load, usually the app's current UI language. */
  locale?: string;
  labels: ResourcesPageLabels;
  /** Override the domain formatter; defaults to the client's shortenDomain. */
  formatters?: Partial<ResourcesPageFormatters>;
  onResourceClick?: (resource: import('./types').Resource) => void;
  className?: string;
}

export function ResourcesPageConnected({
  locale,
  labels,
  formatters,
  onResourceClick,
  className,
}: ResourcesPageConnectedProps) {
  const { resources, isLoading, error } = useResources(locale);
  return (
    <ResourcesPage
      resources={resources}
      isLoading={isLoading}
      error={error?.message ?? null}
      labels={labels}
      formatters={{ shortenDomain, ...formatters }}
      onResourceClick={onResourceClick}
      className={className}
    />
  );
}
