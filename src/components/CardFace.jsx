import { suitInfo } from "../data/tarotCards";

const sizes = {
  small:  { w: 80,  h: 120, radius: 6,  border: 1 },
  medium: { w: 140, h: 210, radius: 10, border: 1.5 },
  large:  { w: 220, h: 330, radius: 12, border: 1.5 },
};

export default function CardFace({ card, size = "medium", onClick }) {
  const s = sizes[size] || sizes.medium;
  const suitColor = card.suit ? suitInfo[card.suit].color : "#C9A96E";

  return (
    <div
      onClick={onClick}
      style={{
        width: s.w,
        height: s.h,
        borderRadius: s.radius,
        overflow: "hidden",
        border: `${s.border}px solid rgba(180,165,140,0.35)`,
        cursor: onClick ? "pointer" : "default",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
        flexShrink: 0,
        position: "relative",
        background: "#1a1714",
      }}
    >
      <img
        src={card.image}
        alt={card.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      {/* subtle color tint at bottom for suit identity on small cards */}
      {size === "small" && (
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 16,
          background: `linear-gradient(to top, ${suitColor}33, transparent)`,
          pointerEvents: "none",
        }} />
      )}
    </div>
  );
}
