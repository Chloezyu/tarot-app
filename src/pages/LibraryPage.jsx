import { useState } from "react";
import { tarotCards } from "../data/tarotCards";
import CardFace from "../components/CardFace";

export default function LibraryPage({ onCardSelect }) {
  const [filter, setFilter] = useState("all");

  const filters = [
    { key: "all", label: "全部" },
    { key: "major", label: "大阿尔卡纳" },
    { key: "wands", label: "权杖" },
    { key: "cups", label: "圣杯" },
    { key: "swords", label: "宝剑" },
    { key: "pentacles", label: "星币" },
  ];

  const filteredCards = tarotCards.filter((card) => {
    if (filter === "all") return true;
    if (filter === "major") return card.category === "major";
    return card.suit === filter;
  });

  return (
    <div style={{ minHeight: "100vh", paddingTop: 60, animation: "fadeIn 0.5s ease" }}>
      <div style={{ textAlign: "center", padding: "48px 20px 24px" }}>
        <h2 style={{
          fontFamily: "'Noto Serif SC', serif",
          fontSize: "clamp(22px, 4vw, 30px)",
          fontWeight: 300,
          color: "var(--text)",
          letterSpacing: "0.2em",
          marginBottom: 8,
        }}>
          牌库
        </h2>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 14,
          color: "var(--text-dim)",
          fontStyle: "italic",
          letterSpacing: "0.1em",
        }}>
          78 Cards of Wisdom
        </p>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 8,
        padding: "0 20px 36px",
      }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 12,
              color: filter === f.key ? "var(--accent)" : "var(--text-sub)",
              background: filter === f.key ? "var(--accent-bg)" : "transparent",
              border: filter === f.key
                ? "1px solid var(--accent-border)"
                : "1px solid var(--filter-border)",
              padding: "8px 20px",
              cursor: "pointer",
              borderRadius: 20,
              transition: "all 0.3s",
              letterSpacing: "0.1em",
              fontWeight: filter === f.key ? 500 : 300,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
        gap: 20,
        padding: "0 clamp(16px, 4vw, 60px) 80px",
        maxWidth: 1000,
        margin: "0 auto",
      }}>
        {filteredCards.map((card, i) => (
          <div
            key={card.id}
            onClick={() => onCardSelect(card)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              animation: `fadeInUp 0.4s ease ${i * 0.02}s both`,
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <CardFace card={card} size="small" />
            <span style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 11,
              color: "var(--text-sub)",
              textAlign: "center",
              fontWeight: 300,
            }}>
              {card.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
