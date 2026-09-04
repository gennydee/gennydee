import { XMLParser } from "fast-xml-parser";
import { SUBSTACK, essayMeta } from "./content";

/**
 * Pulls essays from the Substack RSS feed at build time.
 *
 * Public posts include the full body in <content:encoded>. Paywalled posts
 * return only an excerpt — those get `truncated: true` so the page can show
 * the opening and link out for the rest.
 */

const parser = new XMLParser({ ignoreAttributes: false, cdataPropName: "cdata" });

// Minimal hardening: the feed is Genny's own, but never inject raw <script>.
function clean(html = "") {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/ on[a-z]+="[^"]*"/gi, "")
    .replace(/<div class="subscription-widget[\s\S]*?<\/div>/gi, "");
}

const text = (v) => (v && typeof v === "object" ? v.cdata ?? v["#text"] ?? "" : v ?? "");

function slugOf(link = "") {
  const m = String(link).match(/\/p\/([^/?#]+)/);
  return m ? m[1] : "";
}

function formatDate(pubDate) {
  const d = new Date(pubDate);
  if (Number.isNaN(+d)) return "";
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getMonth() + 1)}.${p(d.getDate())}.${p(d.getFullYear() % 100)}`;
}

export async function getEssays() {
  let xml;
  try {
    const res = await fetch(SUBSTACK.feed, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`feed ${res.status}`);
    xml = await res.text();
  } catch (err) {
    // Never fail the build because Substack blipped.
    console.warn("[substack] feed unavailable:", err.message);
    return [];
  }

  const parsed = parser.parse(xml);
  const raw = parsed?.rss?.channel?.item ?? [];
  const items = Array.isArray(raw) ? raw : [raw];

  return items
    .map((item) => {
      const slug = slugOf(text(item.link));
      const body = clean(text(item["content:encoded"]));
      const excerpt = clean(text(item.description));
      const meta = essayMeta[slug] ?? {};
      return {
        slug,
        title: text(item.title),
        subtitle: text(item.subtitle) || stripTags(excerpt).slice(0, 160),
        date: formatDate(text(item.pubDate)),
        iso: new Date(text(item.pubDate)).toISOString(),
        url: text(item.link),
        html: body || excerpt,
        truncated: !body,
        category: meta.category ?? null,
        context: meta.context ?? null,
      };
    })
    .filter((e) => e.slug);
}

export async function getEssay(slug) {
  const all = await getEssays();
  return all.find((e) => e.slug === slug) ?? null;
}

function stripTags(html = "") {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
