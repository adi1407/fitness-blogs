export type IntentFaq = { question: string; answer: string };
export type IntentSource = { title: string; url?: string; note?: string };

export type IntentArticleDef = {
  slug: string;
  title: string;
  excerpt: string;
  quickAnswer: string;
  body: string;
  categorySlug: "nutrition" | "weight-loss" | "muscle-building";
  subcategorySlug: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  topics: string[];
  faq: IntentFaq[];
  sources: IntentSource[];
  featuredImageAlt: string;
  /** Related article slugs (resolved to article_number after insert). */
  relatedSlugs: string[];
  /** Day offset from seed anchor (0 = oldest); two articles share a day. */
  dayOffset: number;
};

export const DISCLAIMER =
  "This is educational information, not medical advice. Consult a qualified professional for personal health decisions.";

export function p(...paras: string[]): string {
  return paras.map((t) => `<p>${t}</p>`).join("\n");
}

export function h2(text: string): string {
  return `<h2>${text}</h2>`;
}

export function h3(text: string): string {
  return `<h3>${text}</h3>`;
}

export function ul(items: string[]): string {
  return `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

export function ol(items: string[]): string {
  return `<ol>${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
}

export function table(headers: string[], rows: string[][]): string {
  const th = headers.map((h) => `<th>${h}</th>`).join("");
  const tr = rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("");
  return `<table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
}

export function takeaways(items: string[]): string {
  return `${h2("Key takeaways")}${ul(items)}`;
}

export function toolCta(href: string, label: string, blurb: string): string {
  return `<p><strong>Next step:</strong> ${blurb} <a href="${href}">${label}</a>.</p>`;
}

export const SRC = {
  whoProtein: {
    title: "WHO — Protein and amino acid requirements",
    url: "https://www.who.int/publications/i/item/9241209356",
    note: "Population reference intakes context",
  },
  issnProtein: {
    title: "ISSN position stand — protein and exercise",
    url: "https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8",
    note: "Athlete and active adult protein ranges",
  },
  usdaFdc: {
    title: "USDA FoodData Central",
    url: "https://fdc.nal.usda.gov/",
    note: "Food composition reference values",
  },
  whoObesity: {
    title: "WHO — Obesity and overweight",
    url: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight",
    note: "Energy balance and health framing",
  },
  acsm: {
    title: "ACSM — Quantity and quality of exercise",
    url: "https://www.acsm.org/",
    note: "Physical activity and training guidance",
  },
  icmr: {
    title: "ICMR-NIN Dietary Guidelines for Indians",
    url: "https://www.nin.res.in/",
    note: "Indian dietary context",
  },
  hydration: {
    title: "EFSA — Dietary reference values for water",
    url: "https://www.efsa.europa.eu/en/efsajournal/pub/1459",
    note: "Adequate intake ranges for water",
  },
} as const;
