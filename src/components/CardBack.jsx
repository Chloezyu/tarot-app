export default function CardBack({ number, selected, orderNumber, onClick, small }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: small ? 56 : 140,
        height: small ? 84 : 210,
        borderRadius: small ? 6 : 12,
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
        position: "absolute", inset: small ? 4 : 10,
        border: "1px solid rgba(201,169,110,0.15)",
        borderRadius: small ? 3 : 8,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: small ? 8 : 20,
        border: "1px solid rgba(201,169,110,0.08)",
        borderRadius: small ? 2 : 5,
        pointerEvents: "none",
      }} />
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: small ? 16 : 28,
        fontWeight: 500,
        color: selected ? "#C9A96E" : "rgba(180,165,140,0.5)",
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
          background: "#C9A96E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9,
            fontWeight: 700,
            color: "#1E1B16",
            lineHeight: 1,
          }}>
            {orderNumber}
          </span>
        </div>
      )}
    </div>
  );
}
