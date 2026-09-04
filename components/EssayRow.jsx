import Link from "next/link";

export default function EssayRow({ essay, showArrow = true }) {
  return (
    <Link href={`/writing/${essay.slug}`} className="block py-6 rule-b hover:opacity-70">
      <div className="text-[clamp(26px,4vw,32px)]" style={{ lineHeight: 1.25, letterSpacing: "-0.02em" }}>
        {essay.title}
        {showArrow ? <span className="align-super text-[0.7em]"> ↗</span> : null}
      </div>
      <div
        className="mt-2 max-w-[46ch] text-[16px]"
        style={{ lineHeight: 1.5, color: "rgb(var(--ink-rgb) / 0.55)", textWrap: "pretty" }}
      >
        {essay.subtitle}
      </div>
      <div className="pixel mt-4" style={{ color: "rgb(var(--ink-rgb) / 0.55)", letterSpacing: "0.03em" }}>
        {essay.category}&nbsp;&nbsp;&nbsp;{essay.date}
      </div>
    </Link>
  );
}
