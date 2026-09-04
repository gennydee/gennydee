import Shell from "@/components/Shell";
import BackLink from "@/components/BackLink";
import Headline from "@/components/Headline";
import Link from "next/link";
import { getEssays } from "@/lib/substack";

export const metadata = {
  title: "Writing",
  description:
    "Notes on creative leadership, taste, hiring, and the strange craft of building teams.",
};

export default async function WritingIndex() {
  const essays = await getEssays();

  return (
    <Shell>
      <BackLink />
      <Headline className="mt-6">
        Notes on creative leadership, taste, hiring, and the strange craft of
        building teams.
      </Headline>
      <p
        className="col-span-12 mt-4 text-[16px] sm:col-span-8"
        style={{ lineHeight: 1.5, color: "rgb(var(--ink-rgb) / 0.6)" }}
      >
        Published irregularly, edited too much.
      </p>

      <div className="mt-[32px] sm:mt-[56px]">
        {essays.map((essay) => (
          <Link key={essay.slug} href={`/writing/${essay.slug}`} className="essay-row site-grid rule grid grid-cols-12 gap-x-2 py-6 hover:opacity-70">
            <div className="pixel" style={{ color: "rgb(var(--ink-rgb) / 0.55)", letterSpacing: "0.03em" }}>
              {essay.date}
              {essay.category ? <><br />{essay.category}</> : null}
            </div>
            <div className="mt-2 text-[clamp(26px,4vw,32px)]" style={{ lineHeight: 1.25, letterSpacing: "-0.02em" }}>
              {essay.title}
            </div>
            <div
              className="col-span-12 mt-2 text-[16px] sm:col-span-8"
              style={{ lineHeight: 1.5, color: "rgb(var(--ink-rgb) / 0.55)", textWrap: "pretty" }}
            >
              {essay.subtitle}
            </div>
          </Link>
        ))}
        <p className="rule pt-6 text-[16px]" style={{ lineHeight: 1.5, color: "rgb(var(--ink-rgb) / 0.55)" }}>
          More in progress. I write slowly and delete a lot. That&rsquo;s the whole method.
        </p>
      </div>
    </Shell>
  );
}
