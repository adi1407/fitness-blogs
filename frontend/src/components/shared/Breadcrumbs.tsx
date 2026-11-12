import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  linkClassName?: string;
  /** Truncate the current-page label on small screens (blog article trails). */
  truncateLast?: boolean;
};

/** Shared breadcrumb nav — feature wrappers add schema / spacing as needed. */
export function Breadcrumbs({
  items,
  className = "text-sm text-muted-foreground",
  linkClassName = "hover:text-primary",
  truncateLast = false,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex min-w-0 flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const showLink = Boolean(item.href) && !isLast;
          return (
            <li
              key={`${item.label}-${i}`}
              className={`flex min-w-0 items-center gap-2 ${isLast && truncateLast ? "max-w-full" : ""}`}
            >
              {i > 0 ? <span aria-hidden="true">/</span> : null}
              {showLink ? (
                <Link href={item.href!} className={linkClassName}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? truncateLast
                        ? "min-w-0 truncate text-foreground sm:whitespace-normal"
                        : "text-foreground"
                      : undefined
                  }
                  title={isLast && truncateLast ? item.label : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
