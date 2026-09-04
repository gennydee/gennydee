import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import BackLink from "@/components/BackLink";
import ScrambleLink from "@/components/ScrambleLink";
import { getEssay, getEssays } from "@/lib/substack";
import { SUBSTACK } from "@/lib/content";

export const revalidate = 3600;

export async function generateStaticParams() {
  const essays = await getEssays();
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) return {};
  return {
    title: essay.title,
    description: essay.subtitle,
    alternates: { canonical: `/writing/${essay.slug}` },
    openGraph: { title: essay.title, description: essay.subtitle, type: "article" },
  };
}

export default async function Essay({ params }) {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) notFound();

  const number = String((await getEssays()).length - (await getEssays()).findIndex((e) => e.slug === slug)).padStart(3, "0");

  return (
    <Shell>
      <BackLink />

      <header className="site-grid grid grid-cols-12 gap-x-2 pb-[24px] sm:pb-[40px] pt-6">
        <div className="pixel" style={{ letterSpacing: "0.05em" }}>
          Essay {number}
          {essay.category ? <>&nbsp;·&nbsp;{essay.category}</> : null}
          &nbsp;·&nbsp;{essay.date}
        </div>
        <h1
          className="mt-4 text-[clamp(30px,4.6vw,40px)] font-normal"
          style={{ lineHeight: 1.2, letterSpacing: "-0.022em", textWrap: "pretty" }}
        >
          {essay.title}
        </h1>
        <p className="mt-4 text-[20px]" style={{ lineHeight: 1.6, textWrap: "pretty" }}>
          {essay.subtitle}
        </p>
        {essay.context ? (
          <p
            className="col-span-12 mt-4 text-[16px] sm:col-span-8"
            style={{ lineHeight: 1.5, color: "rgb(var(--ink-rgb) / 0.6)", textWrap: "pretty" }}
          >
            {essay.context}
          </p>
        ) : null}
      </header>

      {/* Body comes from the Substack feed. No card, no border, no shadow. */}
      <article className="essay" dangerouslySetInnerHTML={{ __html: essay.html }} />

      {essay.truncated ? (
        <p className="mt-8 text-[16px]" style={{ lineHeight: 1.5 }}>
          <a href={essay.url} target="_blank" rel="noopener" className="u">
            Read the rest on Substack ↗
          </a>
        </p>
      ) : null}

      {/* The two links stay a pair, so they wrap together rather than one of
          them stranding itself on a line of its own. */}
      <div className="mt-[32px] sm:mt-[48px] flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
        <span className="max-w-[42ch] text-[16px]" style={{ lineHeight: 1.5, color: "rgb(var(--ink-rgb) / 0.6)" }}>
          Occasional notes on creative leadership, taste, hiring, and building great teams.
        </span>
        <span className="flex flex-none items-baseline gap-x-6">
          <ScrambleLink href="/writing" text="Read the archive" className="pixel u" />
          <ScrambleLink
            href={SUBSTACK.url}
            text="Subscribe"
            target="_blank"
            rel="noopener"
            className="pixel u"
          />
        </span>
      </div>
    </Shell>
  );
}
