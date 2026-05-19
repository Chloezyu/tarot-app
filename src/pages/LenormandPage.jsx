import { useState, useRef, useEffect } from "react";
import { lenormandCards } from "../data/lenormandCards";

const CARD_W = 100;
const CARD_H = 133;

export default function LenormandPage() {
  const [phase, setPhase] = useState("setup");
  const [system, setSystem] = useState(36);
  const [spread, setSpread] = useState(3);
  const [drawnCards, setDrawnCards] = useState([]);
  const [cardPositions, setCardPositions] = useState({});
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [activeCardId, setActiveCardId] = useState(null);
  const tableRef = useRef(null);
  const draggingRef = useRef(null);

  useEffect(() => {
    if (phase !== "result" || drawnCards.length === 0 || !tableRef.current) return;
    const size = tableRef.current.offsetWidth;
    const n = drawnCards.length;
    const spacing = n > 1 ? Math.min((size - 40 - CARD_W) / (n - 1), 150) : 0;
    const totalW = (n - 1) * spacing + CARD_W;
    const startX = Math.max(20, (size - totalW) / 2);
    const startY = Math.max(20, (size - CARD_H) / 2);
    const positions = {};
    drawnCards.forEach((card, i) => {
      positions[card.id] = { x: startX + i * spacing, y: startY };
    });
    setCardPositions(positions);
    setExpandedCards(new Set());
    setActiveCardId(null);
  }, [phase, drawnCards]);

  const onPointerDown = (e, cardId) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setActiveCardId(cardId);
    draggingRef.current = {
      cardId, startX: e.clientX, startY: e.clientY,
      startLeft: cardPositions[cardId]?.x ?? 0,
      startTop: cardPositions[cardId]?.y ?? 0,
    };
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    const { cardId, startX, startY, startLeft, startTop } = draggingRef.current;
    const table = tableRef.current;
    const pad = 8;
    const maxX = table ? table.offsetWidth - CARD_W - pad : 500;
    const maxY = table ? table.offsetHeight - CARD_H - pad : 500;
    setCardPositions(prev => ({
      ...prev,
      [cardId]: {
        x: Math.max(pad, Math.min(maxX, startLeft + (e.clientX - startX))),
        y: Math.max(pad, Math.min(maxY, startTop + (e.clientY - startY))),
      },
    }));
  };

  const onPointerUp = () => { draggingRef.current = null; };

  const draw = () => {
    const pool = system === 36
      ? lenormandCards.filter(c => c.id <= 36)
      : lenormandCards;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setDrawnCards(shuffled.slice(0, spread));
    setPhase("result");
  };

  const reset = () => {
    setPhase("setup");
    setDrawnCards([]);
    setCardPositions({});
  };

  const toggleExpanded = (cardId) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      next.has(cardId) ? next.delete(cardId) : next.add(cardId);
      return next;
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      paddingTop: 60,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>

      {/* Setup Phase */}
      {phase === "setup" && (
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 60px)",
          padding: "40px 20px",
          textAlign: "center",
          animation: "fadeIn 0.6s ease",
        }}>
          <div style={{ fontSize: 36, color: "var(--accent-border)", marginBottom: 20, lineHeight: 1 }}>✦</div>
          <h2 style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "clamp(20px, 4vw, 28px)",
            fontWeight: 300,
            color: "var(--text)",
            letterSpacing: "0.2em",
            marginBottom: 8,
          }}>
            雷诺曼占卜
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 14,
            color: "var(--text-dim)",
            fontStyle: "italic",
            letterSpacing: "0.1em",
            marginBottom: 48,
          }}>
            Lenormand Oracle
          </p>

          {/* System Toggle */}
          <div style={{ marginBottom: 36 }}>
            <p style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 11,
              color: "var(--text-faint)",
              letterSpacing: "0.2em",
              marginBottom: 12,
            }}>
              牌组体系
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[36, 40].map(n => (
                <button
                  key={n}
                  onClick={() => setSystem(n)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: system === n ? 500 : 400,
                    color: system === n ? "var(--accent)" : "var(--text-sub)",
                    background: system === n ? "var(--accent-bg)" : "transparent",
                    border: system === n ? "1px solid var(--accent-border)" : "1px solid var(--filter-border)",
                    padding: "10px 28px",
                    cursor: "pointer",
                    borderRadius: 20,
                    transition: "all 0.3s",
                    letterSpacing: "0.05em",
                  }}
                >
                  {n} 张
                  {n === 40 && (
                    <span style={{ fontSize: 10, marginLeft: 6, opacity: 0.6 }}>扩展</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Spread Selector */}
          <div style={{ marginBottom: 48 }}>
            <p style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 11,
              color: "var(--text-faint)",
              letterSpacing: "0.2em",
              marginBottom: 12,
            }}>
              抽取张数
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { n: 2, label: "2 张" },
                { n: 3, label: "3 张" },
                { n: 5, label: "5 张" },
              ].map(({ n, label }) => (
                <button
                  key={n}
                  onClick={() => setSpread(n)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: spread === n ? 500 : 400,
                    color: spread === n ? "var(--accent)" : "var(--text-sub)",
                    background: spread === n ? "var(--accent-bg)" : "transparent",
                    border: spread === n ? "1px solid var(--accent-border)" : "1px solid var(--filter-border)",
                    padding: "10px 24px",
                    cursor: "pointer",
                    borderRadius: 20,
                    transition: "all 0.3s",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={draw}
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 14,
              letterSpacing: "0.3em",
              color: "var(--accent)",
              background: "transparent",
              border: "1px solid var(--accent-border)",
              padding: "14px 48px",
              cursor: "pointer",
              transition: "all 0.4s",
              borderRadius: 2,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--accent-bg)";
              e.target.style.borderColor = "var(--accent-hover-border)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "var(--accent-border)";
            }}
          >
            抽牌
          </button>
        </div>
      )}

      {/* Result Phase */}
      {phase === "result" && (
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "28px 16px 80px",
          animation: "fadeIn 0.6s ease",
          width: "100%",
        }}>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 14,
            color: "var(--text-sub)",
            letterSpacing: "0.15em",
            marginBottom: 4,
            fontWeight: 300,
          }}>
            {system} 张体系 · 抽取 {spread} 张
          </p>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 12,
            color: "var(--text-faint)",
            letterSpacing: "0.1em",
            marginBottom: 16,
            fontWeight: 300,
          }}>
            拖拽牌面自由摆放
          </p>

          {/* Square Card Table */}
          <div
            ref={tableRef}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 540,
              aspectRatio: "1 / 1",
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 16,
            }}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {drawnCards.map((card, i) => {
              const pos = cardPositions[card.id] ?? { x: 20 + i * 110, y: 20 };
              return (
                <div
                  key={card.id}
                  style={{
                    position: "absolute",
                    left: pos.x,
                    top: pos.y,
                    width: CARD_W,
                    height: CARD_H,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: "1px solid var(--surface-border)",
                    boxShadow: activeCardId === card.id
                      ? "0 8px 24px rgba(0,0,0,0.3)"
                      : "0 4px 16px rgba(0,0,0,0.2)",
                    cursor: "grab",
                    zIndex: activeCardId === card.id ? 10 : i + 1,
                    touchAction: "none",
                    userSelect: "none",
                    transition: "box-shadow 0.2s",
                  }}
                  onPointerDown={(e) => onPointerDown(e, card.id)}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    draggable={false}
                  />
                </div>
              );
            })}

            {/* Sequence badges */}
            {drawnCards.map((card, i) => {
              const pos = cardPositions[card.id] ?? { x: 20 + i * 110, y: 20 };
              return (
                <div
                  key={`badge-${card.id}`}
                  style={{
                    position: "absolute",
                    left: pos.x + 6,
                    top: pos.y + 6,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 20,
                    pointerEvents: "none",
                  }}
                >
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--accent-on)",
                    lineHeight: 1,
                  }}>{i + 1}</span>
                </div>
              );
            })}
          </div>

          {/* Interpretation */}
          <div style={{ width: "100%", maxWidth: 540 }}>
            {drawnCards.map((card, i) => {
              const isExpanded = expandedCards.has(card.id);
              return (
                <div
                  key={card.id}
                  style={{
                    marginBottom: 8,
                    background: "var(--surface2)",
                    border: "1px solid var(--surface2-border)",
                    borderRadius: 4,
                  }}
                >
                  <div
                    onClick={() => toggleExpanded(card.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "14px 20px",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      color: "var(--accent-dim)",
                      minWidth: 16,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{
                      fontFamily: "'Noto Serif SC', serif",
                      fontSize: 15,
                      color: "var(--text)",
                      letterSpacing: "0.1em",
                      flex: 1,
                    }}>
                      {card.name}
                    </span>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 12,
                      color: "var(--text-dim)",
                      fontStyle: "italic",
                    }}>
                      {card.nameEn}
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      color: "var(--text-faint)",
                      marginLeft: 8,
                    }}>
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </div>
                  {isExpanded && (
                    <div style={{ padding: "0 20px 18px", animation: "fadeIn 0.3s ease" }}>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                        {card.keywords.map((kw, ki) => (
                          <span key={ki} style={{
                            fontFamily: "'Noto Serif SC', serif",
                            fontSize: 12,
                            color: "var(--accent-kw-color)",
                            padding: "4px 12px",
                            border: "1px solid var(--accent-kw-border)",
                            borderRadius: 20,
                            fontWeight: 300,
                          }}>
                            {kw}
                          </span>
                        ))}
                      </div>
                      <p style={{
                        fontFamily: "'Noto Serif SC', serif",
                        fontSize: 14,
                        color: "var(--body-text)",
                        lineHeight: 2,
                        fontWeight: 300,
                        margin: 0,
                      }}>
                        {card.meaning}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
            <button
              onClick={reset}
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 13,
                color: "var(--text-sub)",
                background: "transparent",
                border: "1px solid var(--surface-border)",
                padding: "12px 32px",
                cursor: "pointer",
                borderRadius: 2,
                letterSpacing: "0.15em",
              }}
            >
              返回设置
            </button>
            <button
              onClick={draw}
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 13,
                letterSpacing: "0.15em",
                color: "var(--accent)",
                background: "transparent",
                border: "1px solid var(--accent-border)",
                padding: "12px 32px",
                cursor: "pointer",
                borderRadius: 2,
              }}
            >
              重新抽牌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
