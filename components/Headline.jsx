/** 30px, 38ch, pretty wrapping. Deliberately not display scale. */
export default function Headline({ children, className = "" }) {
  return (
    <h1
      className={`max-w-[38ch] text-[clamp(24px,3.4vw,30px)] font-normal ${className}`}
      style={{ lineHeight: 1.3333, letterSpacing: "-0.016em", textWrap: "pretty" }}
    >
      {children}
    </h1>
  );
}
