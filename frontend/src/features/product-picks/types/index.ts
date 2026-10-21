export type ProductPick = {
  id: string;
  name: string;
  brand: string;
  category: string;
  url: string;
  retailer: string;
  whyPick: string;
  notFor: string;
  priceRange: string;
  isAffiliate: boolean;
};

/** `article:<articleNumber>` · `calc:/<path>` · `review:<slug>` */
export type ProductPickTarget = `article:${number}` | `calc:/${string}` | `review:${string}`;
