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

      <div className="mt-[24px] sm:mt-[40px]">
        {work.map((item) => (
          <div key={item.name} className="rule-dot site-grid grid grid-cols-12 gap-x-2 py-6">
            <h2 className="text-[24px] font-normal" style={{ lineHeight: 1.3333, letterSpacing: "-0.012em" }}>
              {item.name}
            </h2>
            <div className="pixel mt-2" style={{ color: "rgb(var(--ink-rgb) / 0.55)" }}>
              {item.role}&nbsp;·&nbsp;{item.years}
            </div>
            <p
              className="col-span-12 mt-4 text-[18px] sm:col-span-8"
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
