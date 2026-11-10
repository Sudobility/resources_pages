/**
 * @fileoverview A single resource tile: an anchor card showing the icon, title,
 * description and shortened domain. Opening it navigates to the resource URL in
 * a new tab. Presentational — colour comes only from the design system.
 */
import { colors, ui } from "@sudobility/design";
import type { ResourceTileProps } from "./types";

export function ResourceTile({
  resource,
  shortenDomain,
  onClick,
  openAriaLabel,
}: ResourceTileProps) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onClick?.(resource)}
      aria-label={
        openAriaLabel ? openAriaLabel(resource.title) : `Open ${resource.title}`
      }
      className={`flex gap-4 p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow no-underline ${colors.component.card.default.base} ${colors.component.card.default.dark}`}
    >
      {resource.iconUrl ? (
        <img
          src={resource.iconUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-10 h-10 rounded-md object-contain shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-md shrink-0" aria-hidden="true" />
      )}
      <div className="min-w-0">
        <p className="font-semibold text-foreground truncate">
          {resource.title}
        </p>
        {resource.text && (
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
            {resource.text}
          </p>
        )}
        <p className={`text-xs mt-1 truncate ${ui.text.muted}`}>
          {shortenDomain(resource.url)}
        </p>
      </div>
    </a>
  );
}
