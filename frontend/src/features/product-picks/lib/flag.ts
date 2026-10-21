/** Product picks stay hidden on the live site until this is set to "on" on Vercel. */
export function productPicksEnabled(): boolean {
  return process.env.NEXT_PUBLIC_PRODUCT_PICKS === "on";
}
