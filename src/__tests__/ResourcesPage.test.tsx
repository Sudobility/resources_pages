import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ResourcesPage } from '../ResourcesPage';
import type { ResourcesPageProps, ResourceSection } from '../types';

const labels: ResourcesPageProps['labels'] = {
  title: 'Resources',
  empty: 'No resources yet',
  errorTitle: 'Error',
};

const formatters: ResourcesPageProps['formatters'] = {
  shortenDomain: url => url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0],
};

const sections: ResourceSection[] = [
  {
    id: 's1',
    title: 'Sheet music',
    sortOrder: 0,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    resources: [
      {
        id: 'a',
        title: 'Learn Theory',
        text: 'Music theory basics',
        iconUrl: 'https://example.com/favicon.png',
        url: 'https://www.musictheory.net/lessons',
        sortOrder: 0,
        enabled: true,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ],
  },
];

function base(overrides: Partial<ResourcesPageProps> = {}): ResourcesPageProps {
  return {
    sections: [],
    isLoading: false,
    error: null,
    labels,
    formatters,
    ...overrides,
  };
}

describe('ResourcesPage', () => {
  it('shows the loading spinner', () => {
    const { container } = render(
      <ResourcesPage {...base({ isLoading: true })} />
    );
    expect(container.querySelector('.animate-spin')).not.toBeNull();
  });

  it('shows the empty state when there are no sections', () => {
    render(<ResourcesPage {...base()} />);
    expect(screen.getByText('No resources yet')).toBeInTheDocument();
  });

  it('shows an error message', () => {
    render(<ResourcesPage {...base({ error: 'boom' })} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('boom')).toBeInTheDocument();
  });

  it('renders a section heading and its tiles with domain + link', () => {
    render(<ResourcesPage {...base({ sections })} />);
    expect(screen.getByText('Sheet music')).toBeInTheDocument();
    expect(screen.getByText('Learn Theory')).toBeInTheDocument();
    expect(screen.getByText('musictheory.net')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Learn Theory/ });
    expect(link).toHaveAttribute('href', 'https://www.musictheory.net/lessons');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('calls onResourceClick when a tile is opened', () => {
    const onResourceClick = vi.fn();
    render(<ResourcesPage {...base({ sections, onResourceClick })} />);
    fireEvent.click(screen.getByRole('link', { name: /Learn Theory/ }));
    expect(onResourceClick).toHaveBeenCalledWith(sections[0].resources[0]);
  });
});
