import { work } from "@/lib/content";

/** Homepage index: company · title · years. Descriptions live on /work. */
export default function WorkList() {
  return (
    <div>
      {work.map((item) => (
        <div
          key={item.name}
          className="rule-dot-row flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 py-4"
          style={{
            borderBottom: "1px dotted rgb(var(--ink-rgb) / 0.32)",
            transition: "padding-left 160ms ease",
          }}
        >
          <span className="text-[24px]" style={{ lineHeight: 1.3333, letterSpacing: "-0.012em" }}>
            {item.name}
          </span>
          <span className="flex-auto text-[16px]" style={{ lineHeight: 1.5, color: "rgb(var(--ink-rgb) / 0.55)" }}>
            {item.short}
          </span>
          <span className="pixel" style={{ color: "rgb(var(--ink-rgb) / 0.55)" }}>{item.years}</span>
        </div>
      ))}
    </div>
  );
}
