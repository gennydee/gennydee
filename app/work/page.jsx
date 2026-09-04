import Shell from "@/components/Shell";
import BackLink from "@/components/BackLink";
import Headline from "@/components/Headline";
import { work } from "@/lib/content";

export const metadata = {
  title: "Work",
  description:
    "Short on purpose. The interesting parts of this work were teams and decisions.",
};

export default function Work() {
  return (
    <Shell>
      <BackLink />
      <Headline className="mt-6">
        Short on purpose. The interesting parts of this work were teams and
        decisions, which don&rsquo;t photograph well.
      </Headline>

      <div className="mt-[clamp(24px,5vh,40px)]">
        {work.map((item) => (
          <div key={item.name} className="rule-dot py-6">
            <h2 className="text-[24px] font-normal" style={{ lineHeight: 1.3333, letterSpacing: "-0.012em" }}>
              {item.name}
            </h2>
            <div className="pixel mt-2" style={{ color: "rgb(var(--ink-rgb) / 0.55)" }}>
              {item.role}&nbsp;·&nbsp;{item.years}
            </div>
            <p
              className="mt-4 max-w-[46ch] text-[18px]"
              style={{ lineHeight: 1.7778, color: "rgb(var(--ink-rgb) / 0.7)", textWrap: "pretty" }}
            >
              {item.context}
            </p>
          </div>
        ))}
      </div>
    </Shell>
  );
}
