import ThemeToggle from "./ThemeToggle";

/**
 * The whole site is one 640px column. Every route sits inside it —
 * including the footer, so rules share the column's edges.
 */
export default function Shell({ children }) {
  return (
    <div className="min-h-screen px-[clamp(24px,6vw,32px)] pt-[clamp(40px,8vw,88px)] pb-16">
      <div className="mx-auto max-w-[640px]">
        {children}
        <footer className="rule mt-10 flex items-center justify-end pt-6">
          <ThemeToggle />
        </footer>
      </div>
    </div>
  );
}
