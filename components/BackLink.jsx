import Link from "next/link";
import ScrambleLink from "@/components/ScrambleLink";

export default function BackLink({ href = "/", children = "← Genny Dee" }) {
  // The scramble rewrites the label character by character, so it only applies
  // to a plain-string child. Anything richer just gets the colour shift.
  if (typeof children === "string") {
    return <ScrambleLink href={href} text={children} className="pixel-link pixel" />;
  }
  return (
    <Link href={href} className="pixel-link pixel">
      {children}
    </Link>
  );
}
