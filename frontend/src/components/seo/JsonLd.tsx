import type { ReactNode } from "react";

type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Drop structured data into pages for rich results. */
export function JsonLd({ data }: JsonLdProps): ReactNode {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
