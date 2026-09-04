import Shell from "@/components/Shell";
import BackLink from "@/components/BackLink";
import Headline from "@/components/Headline";

export const metadata = {
  title: "About",
  description:
    "Skateboarding, music, and fashion, then brand, design, and creative leadership.",
};

const p = "mt-6 max-w-[46ch] text-[18px]";
const ps = { lineHeight: 1.7778, textWrap: "pretty" };

export default function About() {
  return (
    <Shell>
      <BackLink />
      <Headline className="mt-6">
        Before any of this was a career, it was a few scenes that taught me the
        same lesson from different angles.
      </Headline>

      <p className={p} style={ps}>
        Right now I&rsquo;m Head of Brand at{" "}
        <a href="https://railway.com" target="_blank" rel="noopener" className="u">Railway</a>,
        shaping how the company shows up as it grows into its next chapter. Before
        that, I spent four years at{" "}
        <a href="https://vercel.com" target="_blank" rel="noopener" className="u">Vercel</a>{" "}
        building the brand and the creative team around it.
      </p>

      <p className={p} style={ps}>
        Skateboarding taught me that repetition is how you earn anything, and that
        the person behind the camera can shape the story as much as the person
        landing the trick. Music taught me taste. More specifically, that having it
        isn&rsquo;t the same as being able to explain it, and that explaining it is
        the actual skill. Fashion taught me that a brand is a promise you keep in a
        hundred tiny decisions, most of which nobody notices individually and
        everybody notices in aggregate.
      </p>

      <p className={p} style={ps}>
        Technology came later and mostly by accident. I was making things for people
        who were building things, and at some point the building became the
        interesting part. Brand, then design, then teams, then the uncomfortable and
        rewarding work of leading them. Hiring people who are better than you at
        something specific, then getting far enough out of the way that they can
        prove it.
      </p>

      <p className={p} style={ps}>
        These days I care most about a short list: talent, taste, culture,
        standards. Not as values on a wall, but as decisions you make on a Tuesday.
        Who you hire. What you ship when it&rsquo;s 80% there. Whether the person
        doing the best work in the room feels seen. I&rsquo;ve been on teams where
        that was true and teams where it wasn&rsquo;t, and the difference in the work
        is not subtle.
      </p>

      <p className={p} style={ps}>
        If any of that overlaps with what you&rsquo;re building, I&rsquo;d like to
        hear about it.
      </p>

      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[16px]">
        <a href="https://x.com/gennydee" target="_blank" rel="noopener" className="ud">X ↗</a>
        <a href="https://linkedin.com/in/genny-dee-9267421" target="_blank" rel="noopener" className="ud">LinkedIn ↗</a>
      </div>
    </Shell>
  );
}
