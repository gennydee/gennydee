import ThemeToggle from "./ThemeToggle";

/**
 * The whole site is one 12-column grid — 48px columns, 8px gutters, 664px
 * wide at rest ((12 × 48) + (11 × 8)). Every route sits inside it, including
 * the footer, so rules share the column's edges.
 *
 * Columns are `1fr` rather than a fixed 48px: at full width they resolve to
 * exactly 48px, and below it they narrow together so the gutters stay 8px and
 * the proportions hold. The `site-grid` default in globals.css spans children
 * across all twelve, so a block that doesn't care about the grid behaves as it
 * did — and any `col-span-*` on a child overrides it.
 */
export default function Shell({ children }) {
  return (
    <div className="min-h-screen px-[clamp(24px,6vw,32px)] pt-[clamp(40px,8vw,88px)] pb-16">
      <div className="site-grid mx-auto grid max-w-[664px] grid-cols-12 gap-x-2">
        {children}
        <footer className="rule mt-10 flex items-center justify-end pt-6">
          <ThemeToggle />
        </footer>
      </div>
    </div>
  );
}
