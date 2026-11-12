import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/shared/Breadcrumbs";

export type Crumb = BreadcrumbItem;

export function BlogBreadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <Breadcrumbs
      items={items}
      className="min-w-0 text-sm text-muted-foreground"
      truncateLast
    />
  );
}
