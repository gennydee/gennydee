import Link from "next/link";
import { work } from "@/lib/content";

/**
 * Homepage index: company · title · years. Descriptions live on /work, and
 * each row links there — the row is the affordance, so the page doesn't need
 * a separate "more about the work" link in the eyebrow style.
 *
 * Rows sit on the site's 12 columns. From `sm` up: name 1–4, description
 * 5–10, years 11–12. Below it the row folds — name and years share the top
 * line (8 and 4), description takes all twelve underneath — so the break is
 * the same at every width instead of wherever the text happens to wrap.
 */

// Read the row the way it looks: "Before that" carries its own descriptor,
// so repeating it would just stutter in a screen reader.
function label(item) {
  const name = item.homeName ?? item.name;
  const parts = item.short === name ? [name] : [name, item.short];
  return `${parts.join(" — ")}, ${item.years}`;
}

export default function WorkList() {
  return (
    <div>
      {work.map((item) => (
        <Link
          key={item.name}
          href="/work"
          aria-label={label(item)}
          className="rule-dot-row site-grid grid grid-cols-12 items-baseline gap-x-2 gap-y-1 py-4 sm:gap-y-0"
        >
          <span
            className="col-start-1 col-end-9 row-start-1 text-[24px] sm:col-end-5"
            style={{ lineHeight: 1.3333, letterSpacing: "-0.012em" }}
          >
            {item.homeName ?? item.name}
          </span>
          <span
            className="row-desc col-start-1 col-end-13 row-start-2 min-w-0 text-[16px] sm:col-start-5 sm:col-end-11 sm:row-start-1"
            style={{ lineHeight: 1.5 }}
          >
            {item.short}
          </span>
          <span className="pixel row-years col-start-9 col-end-13 row-start-1 justify-self-end whitespace-nowrap sm:col-start-11">
            {item.years}
          </span>
        </Link>
      ))}
    </div>
  );
}
