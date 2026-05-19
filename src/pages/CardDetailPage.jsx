import { suitInfo } from "../data/tarotCards";
import CardFace from "../components/CardFace";

export default function CardDetailPage({ card, onBack }) {
  const suitColor = card.suit ? suitInfo[card.suit].color : "#C9A96E";
  const suitName = card.suit ? suitInfo[card.suit].name : "大阿尔卡纳";
  const suitElement = card.suit ? suitInfo[card.suit].element : null;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 60, animation: "fadeIn 0.5s ease" }}>
      <div style={{ padding: "24px clamp(16px, 4vw, 40px) 0" }}>
        <button
          onClick={onBack}
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 13,
            color: "var(--text-sub)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.1em",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          ← 返回牌库
        </button>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px) 80px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          marginBottom: 48,
        }}>
          <CardFace card={card} size="large" />

          <div style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: suitColor,
              letterSpacing: "0.2em",
              marginBottom: 8,
              opacity: 0.7,
            }}>
              {suitName}{suitElement ? ` · ${suitElement}` : ""} · {card.number}
            </div>
            <h1 style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 28,
              fontWeight: 400,
              color: "var(--text)",
              letterSpacing: "0.15em",
              marginBottom: 4,
            }}>
              {card.name}
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 16,
              color: "var(--text-dim)",
              fontStyle: "italic",
            }}>
              {card.nameEn}
            </p>
          </div>
        </div>

        <div style={{
          width: 40,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${suitColor}66, transparent)`,
          margin: "0 auto 40px",
        }} />

        {/* Upright */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 3, height: 20, background: "var(--upright)", borderRadius: 2 }} />
            <h3 style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 16,
              fontWeight: 400,
              color: "var(--upright)",
              letterSpacing: "0.15em",
            }}>
              正位
            </h3>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {card.uprightKeywords.map((kw, i) => (
              <span key={i} style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 12,
                color: "var(--upright-kw)",
                padding: "4px 14px",
                border: "1px solid var(--upright-kw-border)",
                borderRadius: 20,
                fontWeight: 300,
              }}>
                {kw}
              </span>
            ))}
          </div>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 15,
            color: "var(--body-text)",
            lineHeight: 2.2,
            fontWeight: 300,
          }}>
            {card.uprightMeaning}
          </p>
        </div>

        {/* Reversed */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 3, height: 20, background: "var(--reversed)", borderRadius: 2 }} />
            <h3 style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 16,
              fontWeight: 400,
              color: "var(--reversed)",
              letterSpacing: "0.15em",
            }}>
              逆位
            </h3>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {card.reversedKeywords.map((kw, i) => (
              <span key={i} style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 12,
                color: "var(--reversed-kw)",
                padding: "4px 14px",
                border: "1px solid var(--reversed-kw-border)",
                borderRadius: 20,
                fontWeight: 300,
              }}>
                {kw}
              </span>
            ))}
          </div>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 15,
            color: "var(--body-text)",
            lineHeight: 2.2,
            fontWeight: 300,
          }}>
            {card.reversedMeaning}
          </p>
        </div>
      </div>
    </div>
  );
}
