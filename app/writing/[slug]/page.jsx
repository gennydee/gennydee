import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import BackLink from "@/components/BackLink";
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
      <BackLink href="/writing">← Writing</BackLink>

      <header className="pb-[clamp(24px,5vh,40px)] pt-6">
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
            className="mt-4 max-w-[46ch] text-[16px]"
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

      <div className="mt-[clamp(32px,5vh,48px)] flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="max-w-[42ch] text-[16px]" style={{ lineHeight: 1.5, color: "rgb(var(--ink-rgb) / 0.6)" }}>
          Occasional notes on creative leadership, taste, hiring, and building great teams.
        </span>
        <a href={SUBSTACK.url} target="_blank" rel="noopener" className="pixel u">
          Subscribe
        </a>
      </div>
    </Shell>
  );
}
