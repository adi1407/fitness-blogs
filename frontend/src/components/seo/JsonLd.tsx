import type { ReactNode } from "react";

type JsonLdProps = {
  data: Record<string, unknown>;
};

/** `<`, `>` and `&` are escaped so CMS text containing `</script>` can't break out of the tag. */
function serialize(data: Record<string, unknown>): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/** Drop structured data into pages for rich results. */
export function JsonLd({ data }: JsonLdProps): ReactNode {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
