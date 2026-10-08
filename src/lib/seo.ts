export const SITE_URL = "https://m-aai.com";
export const SITE_NAME = "M-Aai";

export function pageMeta(title: string, description: string, path = "/") {
  const full = `${title} — ${SITE_NAME} · घरची चव`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + path },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: full },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: SITE_URL + path }],
  };
}

export const noindex = { name: "robots", content: "noindex" };
