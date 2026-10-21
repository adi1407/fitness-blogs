import Link from "next/link";
import { cn } from "@/lib/utils";
import { fetchProductPicks } from "@/features/product-picks/api/fetchProductPicks";
import { ProductPickLink } from "@/features/product-picks/components/ProductPickLink";
import { productPicksEnabled } from "@/features/product-picks/lib/flag";
import type { ProductPickTarget } from "@/features/product-picks/types";

type Props = {
  target: ProductPickTarget;
  /** Staff preview: render even while the live flag is off, and skip the cache. */
  preview?: boolean;
  className?: string;
};

/** "What we'd use" recommendations attached to this page in the CMS. */
export async function ProductPicksBox({ target, preview = false, className }: Props) {
  const enabled = productPicksEnabled();
  if (!enabled && !preview) return null;

  const picks = await fetchProductPicks(target, { fresh: preview });
  if (picks.length === 0) return null;

  const anyAffiliate = picks.some((p) => p.isAffiliate);

  return (
    <section
      aria-labelledby={`picks-${target}`}
      className={cn("rounded-2xl border border-border bg-white p-5 sm:p-6", className)}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h2 id={`picks-${target}`} className="text-xl font-semibold tracking-tight">
          What we&apos;d use
        </h2>
        {preview && !enabled ? (
          <span className="rounded-full bg-[#FFF3E0] px-2.5 py-0.5 text-xs font-semibold text-[#8A4B00]">
            Hidden on live site
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Products that fit the advice above. Check the label and compare before you buy.
      </p>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((p) => (
          <li
            key={p.id}
            className="flex h-full flex-col rounded-xl border border-border bg-muted/20 p-4"
          >
            {p.brand ? (
              <p className="text-xs font-semibold uppercase tracking-wide text-[#FF9800]">
                {p.brand}
              </p>
            ) : null}
            <p className="mt-0.5 font-semibold leading-snug">{p.name}</p>
            {p.whyPick ? (
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{p.whyPick}</p>
            ) : null}
            {p.notFor ? (
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Not for:</span> {p.notFor}
              </p>
            ) : null}
            <div className="mt-auto pt-4">
              {p.priceRange ? (
                <p className="mb-2 text-xs text-muted-foreground">{p.priceRange}</p>
              ) : null}
              <div className="flex flex-wrap items-center gap-2">
                <ProductPickLink
                  href={p.url}
                  pickId={p.id}
                  target={target}
                  affiliate={p.isAffiliate}
                  label={p.retailer ? `View on ${p.retailer}` : "View product"}
                />
                {p.isAffiliate ? (
                  <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                    Affiliate link
                  </span>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        {anyAffiliate ? (
          <>
            We may earn a commission from links marked &ldquo;Affiliate link&rdquo;, at no
            extra cost to you. It doesn&apos;t change what we recommend.{" "}
            <Link href="/affiliate-disclosure" className="underline">
              Affiliate disclosure
            </Link>
            .{" "}
          </>
        ) : (
          <>We don&apos;t earn from these links. </>
        )}
        Educational picks, not medical advice. Prices change; check the current price and
        label. If you have a medical condition, are pregnant or take medication, ask a
        doctor or dietitian first.
      </p>
    </section>
  );
}
