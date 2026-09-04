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
      <div className="mb-[clamp(40px,7vh,64px)] flex items-center gap-4">
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
        Creative leader building brands, teams, and systems for ambitious
        technology companies.
      </Headline>

      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[16px]">
        <a href="https://x.com/gennydee" target="_blank" rel="noopener" className="ud">X ↗</a>
        <a href="https://linkedin.com/in/genny-dee-9267421" target="_blank" rel="noopener" className="ud">LinkedIn ↗</a>
      </div>

      {/* Places I've worked */}
      <section className="mt-[clamp(72px,13vh,136px)]">
        <Label className="mb-4">Places I&rsquo;ve worked</Label>
        <WorkList />
        <Link href="/work" className="pixel mt-4 inline-block" style={{ color: "rgb(var(--ink-rgb) / 0.55)" }}>
          More about the work →
        </Link>
      </section>

      {/* Writing */}
      <section className="mt-[clamp(80px,15vh,144px)]">
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

      {/* A little background — the one deliberate indent on the page */}
      <section className="rule mt-[clamp(80px,15vh,144px)] pt-6">
        <Label className="mb-6">A little background</Label>
        <p
          className="ml-[clamp(0px,4vw,40px)] text-[clamp(24px,3.2vw,30px)]"
          style={{ lineHeight: 1.3333, letterSpacing: "-0.018em", textWrap: "pretty" }}
        >
          Somewhere between the skatepark and the org chart I got very interested
          in talent, taste, culture, and helping people do the best work of their
          careers. <Link href="/about" className="u">More about me ↗</Link>
        </p>
      </section>
    </Shell>
  );
}
