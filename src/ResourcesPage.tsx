/**
 * @fileoverview The resources page: a heading per section, each over a
 * responsive grid of tiles linking to a helper resource. Purely
 * presentational — data, state, copy and formatters all arrive via props.
 * Loading / empty / error / content render as four independent blocks.
 */
import { colors, ui } from '@sudobility/design';
import { LoadingSpinner } from './LoadingSpinner';
import { ResourceTile } from './ResourceTile';
import type { ResourcesPageProps } from './types';

export function ResourcesPage({
  sections,
  isLoading,
  error,
  labels,
  formatters,
  onResourceClick,
  emptyStateComponent,
  className,
}: ResourcesPageProps) {
  return (
    <div className={className}>
      {labels.title !== '' && (
        <h1 className='text-2xl font-bold mb-6 text-foreground'>
          {labels.title}
        </h1>
      )}

      {error && (
        <div
          className={`mb-6 p-4 rounded-lg border ${colors.component.alert.error.base} ${colors.component.alert.error.dark}`}
          role='alert'
        >
          <p className='text-sm font-medium'>{labels.errorTitle}</p>
          <p className={`text-sm ${colors.component.alert.error.icon}`}>
            {error}
          </p>
        </div>
      )}

      {isLoading && <LoadingSpinner />}

      {!isLoading &&
        sections.length === 0 &&
        (emptyStateComponent ?? (
          <p className={`${ui.text.muted} text-center py-8`}>{labels.empty}</p>
        ))}

      {!isLoading &&
        sections.map(section => (
          <section key={section.id} className='mb-10'>
            {section.title !== '' && (
              <h2 className='text-xl font-semibold mb-4 text-foreground'>
                {section.title}
              </h2>
            )}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {section.resources.map(resource => (
                <ResourceTile
                  key={resource.id}
                  resource={resource}
                  shortenDomain={formatters.shortenDomain}
                  onClick={onResourceClick}
                  openAriaLabel={labels.openAriaLabel}
                />
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
