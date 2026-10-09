import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { fetchFoods } from "@/features/foods/api/foods";
import { shortName } from "@/features/foods/lib/nutrition";
import { rankBy, toRankedFoods } from "@/features/foods/lib/proteinRanking";
import type { FoodDiet, FoodSummary } from "@/features/foods/types";
import { BRAND_NAME } from "@/lib/brand";
import { loadOgFont } from "@/lib/og/card";

export const dynamic = "force-dynamic";

const SIZE = { width: 1080, height: 1350 } as const;
const TOP = 15;
const INK = "#0A0A0A";
const MUTED = "#525252";

const BAR: Record<FoodDiet, string> = { veg: "#FF9800", egg: "#FFC266", "non-veg": INK };
const LEGEND: [FoodDiet, string][] = [
  ["veg", "Veg"],
  ["egg", "Egg"],
  ["non-veg", "Non-veg"],
];

/** Satori's font may lack "≈", and the parenthetical is too long for a row. */
function servingText(label: string) {
  return label.replace(/≈\s*/g, "~").replace(/\s+/g, " ").trim();
}

export async function GET(req: NextRequest) {
  let foods: FoodSummary[] = [];
  try {
    foods = await fetchFoods();
  } catch {
    /* handled below */
  }
  if (!foods.length) {
    return new Response("Food data is temporarily unavailable.", {
      status: 503,
      headers: { "Cache-Control": "no-store", "Retry-After": "60" },
    });
  }

  const rows = rankBy(toRankedFoods(foods), "serving").slice(0, TOP);
  const max = rows[0]?.servingProteinG || 1;
  const font = await loadOgFont();
  const origin = req.nextUrl.origin;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FFFFFF",
          padding: "56px 64px 40px",
          fontFamily: font ? "Roboto Slab" : "sans-serif",
          borderBottom: "16px solid #FF9800",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${origin}/brand/logofitness.png`} width={50} height={48} alt="" />
          <span style={{ fontSize: 30, fontWeight: 700, color: INK }}>{BRAND_NAME}</span>
        </div>

        <span style={{ marginTop: 28, fontSize: 56, fontWeight: 700, color: INK, lineHeight: 1.1 }}>
          Protein in Indian foods, ranked
        </span>
        <span style={{ marginTop: 10, fontSize: 24, color: MUTED }}>
          {`Grams of protein per typical serving · top ${rows.length} of ${foods.length} foods`}
        </span>

        <div style={{ display: "flex", gap: 24, marginTop: 18 }}>
          {LEGEND.map(([diet, label]) => (
            <div key={diet} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: BAR[diet] }} />
              <span style={{ fontSize: 20, color: MUTED }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 26, gap: 10, flexGrow: 1 }}>
          {rows.map((f, i) => (
            <div key={f.slug} style={{ display: "flex", alignItems: "center", height: 48 }}>
              <span style={{ width: 44, fontSize: 22, color: MUTED }}>{i + 1}</span>
              <div style={{ display: "flex", flexDirection: "column", width: 330 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: INK }}>{shortName(f.name)}</span>
                <span style={{ fontSize: 15, color: MUTED }}>{servingText(f.servingLabel)}</span>
              </div>
              <div style={{ display: "flex", flexGrow: 1, alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    height: 30,
                    width: `${Math.max(2, (f.servingProteinG / max) * 100) * 4.6}px`,
                    background: BAR[f.diet],
                    borderRadius: 6,
                  }}
                />
                <span style={{ fontSize: 24, fontWeight: 700, color: INK }}>{`${f.servingProteinG} g`}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: MUTED }}>
          <span>Source: Indian Food Composition Tables 2017 (ICMR-NIN)</span>
          <span>fitlives.in/foods/indian/protein-ranking</span>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: font ? [{ name: "Roboto Slab", data: font, weight: 700, style: "normal" }] : undefined,
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" },
    },
  );
}
