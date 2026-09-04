/**
 * 30px, pretty wrapping. Deliberately not display scale.
 *
 * No width cap: the old max-w-[38ch] computed to ~756px at 30px, wider than
 * the 664px column, so it never bound on any page. Headlines run the full
 * twelve columns. Narrow one with a col-span if a page ever needs it.
 */
export default function Headline({ children, className = "" }) {
  return (
    <h1
      className={`text-[clamp(24px,3.4vw,30px)] font-normal ${className}`}
      style={{ lineHeight: 1.3333, letterSpacing: "-0.016em", textWrap: "pretty" }}
    >
      {children}
    </h1>
  );
}
