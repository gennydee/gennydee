export default function Label({ children, className = "" }) {
  return (
    <h2 className={`pixel ${className}`} style={{ color: "rgb(var(--ink-rgb) / 0.55)", letterSpacing: "0.06em" }}>
      {children}
    </h2>
  );
}
