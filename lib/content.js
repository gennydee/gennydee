/** Roles. Homepage shows name + short + years; /work adds role + context. */
export const work = [
  {
    name: "Railway",
    role: "Head of Brand",
    years: "2026–now",
    short: "Head of Brand",
    context:
      "Voice, identity, and the small decisions that make infrastructure feel like it was made by people.",
  },
  {
    name: "Vercel",
    role: "Director, Creative, Brand & Marketing Design",
    years: "2022–2026",
    short: "First brand designer to Director, Creative",
    context:
      "Joined as the first marketing and brand designer and built the function from there. Hired, scaled, and led the team responsible for brand experience, events, campaigns, and high-visibility launches.",
  },
  {
    name: "GitHub",
    role: "Lead Designer, Office of the CEO",
    years: "2019–2022",
    short: "Lead Designer, Office of the CEO",
    context:
      "Built and led the visual communications function supporting the CEO and executive leadership, after three years in corporate marketing and the brand studio.",
  },
  {
    name: "Volcom, Vans, Obey",
    role: "Designer, action sports & streetwear",
    years: "–2019",
    short: "Volcom Art Loft, and the brands next door",
    context:
      "A designer in the Volcom Art Loft, plus work for Vans, Obey Clothing, and others in that world. Apparel, graphics, and campaigns for brands where taste was the whole product. Still the most useful design education I've had.",
  },
];

/**
 * Per-essay extras the Substack feed doesn't carry (category, and an optional
 * context line for the article header). Keyed by slug. Anything not listed
 * still renders — it just has no category.
 */
export const essayMeta = {
  "let-them-cook": {
    category: "Creative leadership",
    context:
      "Thoughts on hiring for difference, protecting what makes people unusually good, and building teams that don't need you in every decision.",
  },
};

export const SUBSTACK = {
  url: "https://gennydee.substack.com",
  feed: "https://gennydee.substack.com/feed",
};
