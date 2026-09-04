import Link from "next/link";
import Image from "next/image";
import Shell from "@/components/Shell";
import Label from "@/components/Label";
import Headline from "@/components/Headline";
import WorkList from "@/components/WorkList";
import EssayRow from "@/components/EssayRow";
import { getEssays } from "@/lib/substack";

export default async function Home() {
  const essays = await getEssays();
  const latest = essays.slice(0, 1);

  return (
    <Shell>
      {/* Identity */}
      <div className="mb-[40px] sm:mb-[64px] flex items-center gap-4">
        <Image
          src="/portrait.jpg"
          alt="Genny Dee"
          width={88}
          height={88}
          priority
          className="h-[88px] w-[88px] flex-none rounded-full object-cover"
        />
        <div className="pixel" style={{ letterSpacing: "0.05em" }}>Genny Dee</div>
      </div>

      <Headline>
        I build brands, teams, and creative systems for technology companies in
        their next chapter.
      </Headline>

      {/* The personal line is an aside, so it sits below the claim rather than
          inside it — but on the same twelve columns, so the two blocks share a
          right edge. At 18px that lands on a ~55ch measure, which reads fine.
          `balance` evens the line lengths, which only looks right because the
          sentence is long enough to fill them — at half this length it would
          settle on two short lines well inside the headline's edge. */}
      <p
        className="col-span-12 mt-6 text-[18px]"
        style={{ lineHeight: 1.5556, color: "rgb(var(--ink-rgb) / 0.6)", textWrap: "balance" }}
      >
        Creative leader by trade. Painter, meditator, espresso enthusiast, and
        lifelong student of taste, people, and how good things get made.
      </p>

      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[16px]">
        <a href="https://x.com/gennydee" target="_blank" rel="noopener" className="ud">X ↗</a>
        <a href="https://linkedin.com/in/genny-dee-9267421" target="_blank" rel="noopener" className="ud">LinkedIn ↗</a>
      </div>

      {/* Places I've worked */}
      <section className="mt-[56px] sm:mt-[120px]">
        <Label className="mb-4">Places I&rsquo;ve worked</Label>
        <WorkList />
      </section>

      {/* Writing */}
      <section className="mt-[64px] sm:mt-[136px]">
        <Label className="mb-4">Notes, when I have one</Label>
        <div className="rule">
          {latest.map((essay) => (
            <EssayRow key={essay.slug} essay={essay} />
          ))}
          {latest.length === 0 ? (
            <p className="py-6 text-[16px]" style={{ lineHeight: 1.5, color: "rgb(var(--ink-rgb) / 0.55)" }}>
              First essay on the way.
            </p>
          ) : null}
        </div>
        <Link href="/writing" className="u mt-6 inline-block text-[16px]">
          Read the archive ↗
        </Link>
      </section>

      {/* A little background. The indent is the one deliberate step on the
          page, so it steps by a whole column rather than an arbitrary margin:
          the label sits on column 1, the paragraph starts on column 2. */}
      <section className="rule site-grid mt-[64px] sm:mt-[136px] grid grid-cols-12 gap-x-2 pt-6">
        <Label className="col-span-12 mb-6">A little background</Label>
        <p
          className="col-start-1 col-end-13 text-[clamp(24px,3.2vw,30px)] sm:col-start-2"
          style={{ lineHeight: 1.3333, letterSpacing: "-0.018em", textWrap: "balance" }}
        >
          Somewhere between the skatepark and the org chart I got very interested
          in talent, taste, culture, and helping people do the best work of their
          careers. <Link href="/about" className="u">More about me ↗</Link>
        </p>
      </section>
    </Shell>
  );
}
