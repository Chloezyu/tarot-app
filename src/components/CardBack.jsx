export default function CardBack({ number, selected, orderNumber, onClick, small }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: small ? 56 : 140,
        height: small ? 84 : 210,
        borderRadius: small ? 6 : 12,
        border: selected ? "2px solid var(--accent)" : "1.5px solid var(--card-border)",
        background: selected ? "var(--card-bg-sel)" : "var(--card-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: selected ? "translateY(-8px)" : "translateY(0)",
        boxShadow: selected ? "var(--card-sel-shadow)" : "var(--card-shadow)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", inset: small ? 4 : 10,
        border: "1px solid var(--card-inner1)",
        borderRadius: small ? 3 : 8,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: small ? 8 : 20,
        border: "1px solid var(--card-inner2)",
        borderRadius: small ? 2 : 5,
        pointerEvents: "none",
      }} />
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: small ? 16 : 28,
        fontWeight: 500,
        color: selected ? "var(--accent)" : "var(--card-num)",
        letterSpacing: "0.05em",
        transition: "color 0.3s",
        zIndex: 1,
      }}>
        {number}
      </span>
      {orderNumber && (
        <div style={{
          position: "absolute",
          top: 4,
          right: 4,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            fontWeight: 700,
            color: "var(--accent-on)",
            lineHeight: 1,
          }}>
            {orderNumber}
          </span>
        </div>
      )}
    </div>
  );
}
