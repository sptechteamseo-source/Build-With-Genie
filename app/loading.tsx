export default function Loading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        color: "var(--fg-faint)",
        letterSpacing: "0.1em",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 7,
          height: 14,
          background: "var(--accent)",
          animation: "blink 1s steps(2) infinite",
          marginRight: 12,
        }}
      />
      loading
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}
