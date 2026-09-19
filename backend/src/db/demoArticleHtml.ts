/** Build HTML body with a lead image so article pages are never image-empty. */
export function demoBodyWithImage(
  title: string,
  body: string,
  imageUrl: string,
): string {
  const figure = `<figure class="seed-hero"><img src="${imageUrl}" alt="${title.replace(/"/g, "&quot;")}" /><figcaption>${title.replace(/</g, "")}</figcaption></figure>`;
  if (body.includes(imageUrl)) return body;
  return `${figure}${body}`;
}
