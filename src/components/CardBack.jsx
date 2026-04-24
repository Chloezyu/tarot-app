export default function CardBack({ number, selected, onClick, small }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: small ? 56 : 72,
        height: small ? 84 : 108,
        borderRadius: small ? 6 : 8,
        border: selected ? "2px solid #C9A96E" : "1.5px solid rgba(180,165,140,0.3)",
        background: selected
          ? "linear-gradient(145deg, #3D3528, #2A2318)"
          : "linear-gradient(145deg, #2A2520, #1E1B16)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: selected ? "translateY(-8px)" : "translateY(0)",
        boxShadow: selected
          ? "0 12px 32px rgba(201,169,110,0.2), 0 0 0 1px rgba(201,169,110,0.1)"
          : "0 2px 8px rgba(0,0,0,0.3)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", inset: small ? 4 : 6,
        border: "1px solid rgba(201,169,110,0.15)",
        borderRadius: small ? 3 : 4,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: small ? 8 : 12,
        border: "1px solid rgba(201,169,110,0.08)",
        borderRadius: small ? 2 : 3,
        pointerEvents: "none",
      }} />
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: small ? 16 : 20,
        fontWeight: 500,
        color: selected ? "#C9A96E" : "rgba(180,165,140,0.5)",
        letterSpacing: "0.05em",
        transition: "color 0.3s",
        zIndex: 1,
      }}>
        {number}
      </span>
    </div>
  );
}
