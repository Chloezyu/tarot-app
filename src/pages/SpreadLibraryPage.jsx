import { useState } from "react";
import { spreads, tarotCategories, lenormandCategories } from "../data/spreads";

function SpreadPreview({ positions }) {
  const W = 72, H = 72;
  const cw = 10, ch = 15;
  return (
    <div style={{ position: "relative", width: W, height: H, flexShrink: 0 }}>
      {positions.map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: Math.max(0, Math.min(W - cw, pos.cx * W - cw / 2)),
            top: Math.max(0, Math.min(H - ch, pos.cy * H - ch / 2)),
            width: cw,
            height: ch,
            borderRadius: 2,
            border: "1px solid var(--accent-border)",
            background: "var(--accent-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 6,
            color: "var(--accent)",
            lineHeight: 1,
          }}>{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

export default function SpreadLibraryPage({ onStartSpread }) {
  const [deckFilter, setDeckFilter] = useState("tarot");
  const categories = deckFilter === "tarot" ? tarotCategories : lenormandCategories;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 60, animation: "fadeIn 0.5s ease" }}>
      <div style={{ textAlign: "center", padding: "48px 20px 36px" }}>
        <h2 style={{
          fontFamily: "'Noto Serif SC', serif",
          fontSize: "clamp(22px, 4vw, 30px)",
          fontWeight: 300,
          color: "var(--text)",
          letterSpacing: "0.2em",
          marginBottom: 8,
        }}>
          牌阵
        </h2>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 14,
          color: "var(--text-dim)",
          fontStyle: "italic",
          letterSpacing: "0.1em",
          marginBottom: 28,
        }}>
          Spread Collection
        </p>

        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {[["tarot", "塔罗"], ["lenormand", "雷诺曼"]].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setDeckFilter(val)}
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 13,
                fontWeight: deckFilter === val ? 500 : 400,
                color: deckFilter === val ? "var(--accent)" : "var(--text-sub)",
                background: deckFilter === val ? "var(--accent-bg)" : "transparent",
                border: deckFilter === val ? "1px solid var(--accent-border)" : "1px solid var(--filter-border)",
                padding: "10px 28px",
                cursor: "pointer",
                borderRadius: 20,
                transition: "all 0.3s",
                letterSpacing: "0.1em",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "0 clamp(16px, 4vw, 40px) 80px",
      }}>
        {categories.map(cat => {
          const catSpreads = spreads.filter(s => s.deck === deckFilter && s.category === cat);
          if (catSpreads.length === 0) return null;
          return (
            <div key={cat} style={{ marginBottom: 40 }}>
              <div style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 11,
                color: "var(--text-faint)",
                letterSpacing: "0.25em",
                marginBottom: 16,
                paddingBottom: 8,
                borderBottom: "1px solid var(--surface-border)",
              }}>
                {cat}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {catSpreads.map(spread => (
                  <div
                    key={spread.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      padding: "20px",
                      background: "var(--surface)",
                      border: "1px solid var(--surface-border)",
                      borderRadius: 8,
                      transition: "border-color 0.3s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent-border)"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--surface-border)"}
                  >
                    <SpreadPreview positions={spread.positions} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                        <span style={{
                          fontFamily: "'Noto Serif SC', serif",
                          fontSize: 15,
                          fontWeight: 400,
                          color: "var(--text)",
                          letterSpacing: "0.1em",
                        }}>
                          {spread.name}
                        </span>
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 11,
                          color: "var(--text-faint)",
                        }}>
                          {spread.cardCount} 张
                        </span>
                      </div>
                      <p style={{
                        fontFamily: "'Noto Serif SC', serif",
                        fontSize: 12,
                        color: "var(--text-sub)",
                        lineHeight: 1.8,
                        fontWeight: 300,
                        margin: 0,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}>
                        {spread.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onStartSpread(spread)}
                      style={{
                        fontFamily: "'Noto Serif SC', serif",
                        fontSize: 12,
                        letterSpacing: "0.15em",
                        color: "var(--accent)",
                        background: "transparent",
                        border: "1px solid var(--accent-border)",
                        padding: "10px 20px",
                        cursor: "pointer",
                        borderRadius: 2,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--accent-bg)";
                        e.currentTarget.style.borderColor = "var(--accent-hover-border)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "var(--accent-border)";
                      }}
                    >
                      使用
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
