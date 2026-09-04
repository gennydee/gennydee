import Link from "next/link";
import Image from "next/image";
import Shell from "@/components/Shell";
import Label from "@/components/Label";
import Headline from "@/components/Headline";
import WorkList from "@/components/WorkList";
import EssayRow from "@/components/EssayRow";
import ScrambleLink from "@/components/ScrambleLink";
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
        Creative leader. I build brands, teams, and creative systems for
        technology companies in their next chapter. Painter, meditator, and
        lifelong student of how good things get made.
      </Headline>

      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[16px]">
        <ScrambleLink href="https://x.com/gennydee" text="X ↗" target="_blank" rel="noopener" className="ud" />
        <ScrambleLink href="https://linkedin.com/in/genny-dee-9267421" text="LinkedIn ↗" target="_blank" rel="noopener" className="ud" />
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
        <ScrambleLink
          href="/writing"
          text="Read the archive ↗"
          className="u mt-6 inline-block text-[16px]"
        />
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
