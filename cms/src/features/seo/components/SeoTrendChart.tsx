import { useMemo, useState, type PointerEvent } from "react";
import type { SeoDailyPoint } from "../api/seoPerformance";
import { formatCount, formatDay } from "../format";

type Metric = "clicks" | "impressions";

const WIDTH = 720;
const HEIGHT = 200;
const PAD_TOP = 12;
const PAD_BOTTOM = 4;

function linePath(values: number[], max: number): string {
  const step = values.length > 1 ? WIDTH / (values.length - 1) : 0;
  return values
    .map((v, i) => {
      const y = PAD_TOP + (1 - v / max) * (HEIGHT - PAD_TOP - PAD_BOTTOM);
      return `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

/** Daily total vs non-brand line chart with a hover readout. */
export function SeoTrendChart({ daily }: { daily: SeoDailyPoint[] }) {
  const [metric, setMetric] = useState<Metric>("impressions");
  const [hover, setHover] = useState<number | null>(null);

  const { total, nonBrand, max } = useMemo(() => {
    const total = daily.map((d) => (metric === "clicks" ? d.clicks : d.impressions));
    const nonBrand = daily.map((d) => (metric === "clicks" ? d.nonBrandClicks : d.nonBrandImpressions));
    return { total, nonBrand, max: Math.max(1, ...total) };
  }, [daily, metric]);

  if (!daily.length) return null;

  const onPointer = (e: PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setHover(Math.min(daily.length - 1, Math.max(0, Math.round(ratio * (daily.length - 1)))));
  };

  const point = hover === null ? null : daily[hover];
  const hoverX = hover === null || daily.length < 2 ? 0 : (hover / (daily.length - 1)) * 100;
  const nonBrandTotal = nonBrand.reduce((a, b) => a + b, 0);
  const allTotal = total.reduce((a, b) => a + b, 0);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded bg-slate-400" aria-hidden /> All search
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded bg-sky-500" aria-hidden /> Non-brand
          </span>
        </div>
        <div className="flex rounded-lg border border-slate-200 p-0.5 text-xs font-semibold" role="group" aria-label="Chart metric">
          {(["impressions", "clicks"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={metric === m}
              onClick={() => setMetric(m)}
              className={`rounded-md px-2.5 py-1 capitalize ${
                metric === m ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-3">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
          className="h-48 w-full touch-none"
          role="img"
          aria-label={`Daily ${metric}: ${formatCount(allTotal)} in total, ${formatCount(nonBrandTotal)} from non-brand searches`}
          onPointerMove={onPointer}
          onPointerDown={onPointer}
          onPointerLeave={() => setHover(null)}
        >
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={0}
              x2={WIDTH}
              y1={PAD_TOP + f * (HEIGHT - PAD_TOP - PAD_BOTTOM)}
              y2={PAD_TOP + f * (HEIGHT - PAD_TOP - PAD_BOTTOM)}
              className="stroke-slate-100"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path
            d={`${linePath(nonBrand, max)} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`}
            className="fill-sky-500/10"
          />
          <path d={linePath(total, max)} fill="none" className="stroke-slate-400" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          <path d={linePath(nonBrand, max)} fill="none" className="stroke-sky-500" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </svg>
        {point ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 w-px bg-slate-300" style={{ left: `${hoverX}%` }} />
            <div
              className="pointer-events-none absolute top-0 z-10 min-w-36 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm"
              style={hoverX > 70 ? { right: `${100 - hoverX}%` } : { left: `${hoverX}%` }}
            >
              <p className="font-semibold text-slate-900">{formatDay(point.date)}</p>
              <p className="mt-1 text-slate-600">
                All: {formatCount(metric === "clicks" ? point.clicks : point.impressions)}
              </p>
              <p className="text-sky-700">
                Non-brand: {formatCount(metric === "clicks" ? point.nonBrandClicks : point.nonBrandImpressions)}
              </p>
            </div>
          </>
        ) : null}
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-slate-500">
        <span>{formatDay(daily[0].date)}</span>
        <span>Peak {formatCount(max)} / day</span>
        <span>{formatDay(daily[daily.length - 1].date)}</span>
      </div>
    </section>
  );
}
