import { CALC_TOOLS, type CalcTool } from "@/features/tools/types";

export function isCalcTool(slug: string): slug is CalcTool {
  return Object.hasOwn(CALC_TOOLS, slug);
}

/** Copy-paste HTML for host sites: the iframe plus a plain attribution link back to the full calculator. */
export function embedSnippet(siteUrl: string, tool: CalcTool): string {
  const name = CALC_TOOLS[tool];
  return [
    `<iframe src="${siteUrl}/embed/${tool}" title="${name} by fitlives" width="100%" height="760" loading="lazy" style="border:1px solid #E5E5E5;border-radius:12px;max-width:680px"></iframe>`,
    `<p style="font-size:13px">${name} by <a href="${siteUrl}/${tool}">fitlives</a></p>`,
  ].join("\n");
}
