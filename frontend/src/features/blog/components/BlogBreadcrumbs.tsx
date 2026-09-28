import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

export function BlogBreadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="min-w-0 text-sm text-muted-foreground"
    >
      <ol className="flex min-w-0 flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={`${item.label}-${i}`}
              className={`flex min-w-0 items-center gap-2 ${isLast ? "max-w-full" : ""}`}
            >
              {i > 0 && <span aria-hidden="true">/</span>}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? "min-w-0 truncate text-foreground sm:whitespace-normal"
                      : undefined
                  }
                  title={isLast ? item.label : undefined}
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
