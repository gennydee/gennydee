import Link from "next/link";

export default function BackLink({ href = "/", children = "← Genny Dee" }) {
  return (
    <Link href={href} className="pixel" style={{ color: "rgb(var(--ink-rgb) / 0.55)" }}>
      {children}
    </Link>
  );
}
