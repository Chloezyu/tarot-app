import { useState, useCallback, useRef, useEffect } from "react";
import { lenormandCards } from "../data/lenormandCards";
import CardBack from "../components/CardBack";
import FlipCard from "../components/FlipCard";

const CARD_W = 140;
const CARD_H = 210;

export default function LenormandPage() {
  const [phase, setPhase] = useState("welcome");
  const [system, setSystem] = useState(36);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [selected, setSelected] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [cardPositions, setCardPositions] = useState({});
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [activeCardId, setActiveCardId] = useState(null);
  const [cardScale, setCardScale] = useState(1);
  const tableRef = useRef(null);
  const draggingRef = useRef(null);

  useEffect(() => {
    if (phase !== "result" || drawnCards.length === 0 || !tableRef.current) return;
    const size = tableRef.current.offsetWidth;
    const n = drawnCards.length;
    const spacing = n > 1 ? Math.min((size - 40 - CARD_W) / (n - 1), 200) : 0;
    const totalW = (n - 1) * spacing + CARD_W;
    const startX = Math.max(20, (size - totalW) / 2);
    const startY = Math.max(20, (size - CARD_H) / 2);
    const positions = {};
    drawnCards.forEach((card, i) => {
      positions[card.id] = { x: startX + i * spacing, y: startY };
    });
    setCardPositions(positions);
    setFlippedCards(new Set());
    setExpandedCards(new Set());
    setActiveCardId(null);
    setCardScale(1);
  }, [phase, drawnCards]);

  const onCardPointerDown = (e, cardId) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setActiveCardId(cardId);
    draggingRef.current = {
      cardId, startX: e.clientX, startY: e.clientY,
      startLeft: cardPositions[cardId]?.x ?? 0,
      startTop: cardPositions[cardId]?.y ?? 0,
    };
  };

  const onCardPointerMove = (e) => {
    if (!draggingRef.current) return;
    const { cardId, startX, startY, startLeft, startTop } = draggingRef.current;
    const table = tableRef.current;
    const pad = 8;
    const maxX = table ? table.offsetWidth - CARD_W * cardScale - pad : 500;
    const maxY = table ? table.offsetHeight - CARD_H * cardScale - pad : 500;
    setCardPositions(prev => ({
      ...prev,
      [cardId]: {
        x: Math.max(pad, Math.min(maxX, startLeft + (e.clientX - startX))),
        y: Math.max(pad, Math.min(maxY, startTop + (e.clientY - startY))),
      },
    }));
  };

  const onCardPointerUp = (e, cardId) => {
    if (!draggingRef.current) return;
    const { startX, startY } = draggingRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.sqrt(dx * dx + dy * dy) < 5 && !flippedCards.has(cardId)) {
      setFlippedCards(prev => {
        const next = new Set(prev);
        next.add(cardId);
        return next;
      });
    }
    draggingRef.current = null;
  };

  const adjustScale = (delta) => {
    const newScale = Math.max(0.5, Math.min(1.5, cardScale + delta));
    const ratio = newScale / cardScale;
    const table = tableRef.current;
    if (table) {
      const tw = table.offsetWidth, th = table.offsetHeight;
      const newCardW = CARD_W * newScale, newCardH = CARD_H * newScale;
      setCardPositions(prev => {
        const next = {};
        Object.entries(prev).forEach(([id, pos]) => {
          const cx = pos.x + (CARD_W * cardScale) / 2;
          const cy = pos.y + (CARD_H * cardScale) / 2;
          const nx = tw / 2 + (cx - tw / 2) * ratio;
          const ny = th / 2 + (cy - th / 2) * ratio;
          next[id] = {
            x: Math.max(0, Math.min(tw - newCardW, nx - newCardW / 2)),
            y: Math.max(0, Math.min(th - newCardH, ny - newCardH / 2)),
          };
        });
        return next;
      });
    }
    setCardScale(newScale);
  };

  const shuffle = useCallback(() => {
    setPhase("shuffling");
    setSelected([]);
    setDrawnCards([]);
    setFlippedCards(new Set());

    const pool = system === 36
      ? lenormandCards.filter(c => c.id <= 36)
      : lenormandCards;
    const deck = [...pool].sort(() => Math.random() - 0.5);
    deck.forEach((card, i) => { card._displayNum = i + 1; });

    setTimeout(() => {
      setShuffledDeck(deck);
      setPhase("selecting");
    }, 1800);
  }, [system]);

  const toggleCard = (index) => {
    if (phase !== "selecting") return;
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const revealCards = () => {
    if (selected.length === 0) return;
    const cards = selected.map(i => shuffledDeck[i]);
    setDrawnCards(cards);
    setPhase("result");
  };

  const reset = () => {
    setPhase("welcome");
    setSelected([]);
    setDrawnCards([]);
    setFlippedCards(new Set());
    setShuffledDeck([]);
    setCardPositions({});
    setExpandedCards(new Set());
    setCardScale(1);
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

      {/* Welcome Phase */}
      {phase === "welcome" && (
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

          <div style={{ marginBottom: 48 }}>
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
                  {n === 40 && <span style={{ fontSize: 10, marginLeft: 6, opacity: 0.6 }}>扩展</span>}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={shuffle}
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
            洗牌
          </button>
        </div>
      )}

      {/* Shuffling Phase */}
      {phase === "shuffling" && (
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 60px)",
          gap: 32,
        }}>
          <div style={{ display: "flex", gap: 8, animation: "shuffleCards 1.8s ease-in-out" }}>
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} style={{
                width: 56,
                height: 84,
                borderRadius: 6,
                background: "var(--shuffling-bg)",
                border: "1px solid var(--shuffling-border)",
                animation: `cardFloat ${0.8 + n * 0.15}s ease-in-out infinite alternate`,
              }} />
            ))}
          </div>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 14,
            color: "var(--text-sub)",
            letterSpacing: "0.2em",
            animation: "pulse 1.5s ease-in-out infinite",
          }}>
            正在洗牌...
          </p>
        </div>
      )}

      {/* Selecting Phase */}
      {phase === "selecting" && (
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 16px 120px",
          animation: "fadeIn 0.6s ease",
          width: "100%",
          maxWidth: 900,
        }}>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 14,
            color: "var(--text-sub)",
            letterSpacing: "0.15em",
            marginBottom: 8,
            fontWeight: 300,
          }}>
            凭直觉选择你想抽取的牌
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "var(--text-faint)",
            marginBottom: 28,
          }}>
            已选择 {selected.length} 张
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
            gap: 8,
            width: "100%",
            maxWidth: 720,
            padding: "0 8px",
          }}>
            {shuffledDeck.map((card, index) => (
              <div
                key={card.id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  animation: `fadeInUp 0.4s ease ${index * 0.01}s both`,
                }}
              >
                <CardBack
                  number={index + 1}
                  selected={selected.includes(index)}
                  orderNumber={selected.includes(index) ? selected.indexOf(index) + 1 : null}
                  onClick={() => toggleCard(index)}
                  small={true}
                />
              </div>
            ))}
          </div>

          {selected.length > 0 && (
            <div style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "20px",
              background: "var(--footer-grad)",
              display: "flex",
              justifyContent: "center",
              gap: 16,
              animation: "fadeIn 0.3s ease",
              zIndex: 50,
            }}>
              <button
                onClick={() => setSelected([])}
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: 13,
                  color: "var(--text-sub)",
                  background: "transparent",
                  border: "1px solid var(--surface-border)",
                  padding: "12px 28px",
                  cursor: "pointer",
                  borderRadius: 2,
                }}
              >
                清除
              </button>
              <button
                onClick={revealCards}
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  color: "var(--btn-primary-color)",
                  background: "var(--btn-primary-bg)",
                  border: "none",
                  padding: "12px 36px",
                  cursor: "pointer",
                  borderRadius: 2,
                  fontWeight: 500,
                }}
              >
                翻牌 ({selected.length})
              </button>
            </div>
          )}
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
            {system} 张体系 · 抽取 {drawnCards.length} 张
          </p>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 12,
            color: "var(--text-faint)",
            letterSpacing: "0.1em",
            marginBottom: 16,
            fontWeight: 300,
          }}>
            点击牌面翻牌 · 拖拽移动位置
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
          >
            {drawnCards.map((card, i) => {
              const pos = cardPositions[card.id] ?? { x: 20 + i * 160, y: 35 };
              const isFlipped = flippedCards.has(card.id);
              return (
                <div
                  key={card.id}
                  style={{
                    position: "absolute",
                    left: pos.x,
                    top: pos.y,
                    width: CARD_W,
                    height: CARD_H,
                    transform: `scale(${cardScale})`,
                    transformOrigin: "top left",
                    cursor: isFlipped ? "grab" : "pointer",
                    zIndex: activeCardId === card.id ? 10 : i + 1,
                    touchAction: "none",
                    userSelect: "none",
                  }}
                  onPointerDown={(e) => onCardPointerDown(e, card.id)}
                  onPointerMove={onCardPointerMove}
                  onPointerUp={(e) => onCardPointerUp(e, card.id)}
                >
                  <FlipCard
                    card={card}
                    flipped={isFlipped}
                    delay={0}
                    isReversed={false}
                  />
                </div>
              );
            })}

            {/* Sequence badges — siblings of cards to avoid transform issues */}
            {drawnCards.map((card, i) => {
              if (flippedCards.has(card.id)) return null;
              const pos = cardPositions[card.id] ?? { x: 20 + i * 160, y: 35 };
              return (
                <div
                  key={`badge-${card.id}`}
                  style={{
                    position: "absolute",
                    left: pos.x + 12,
                    top: pos.y + 12,
                    width: 22,
                    height: 22,
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
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--accent-on)",
                    lineHeight: 1,
                  }}>{i + 1}</span>
                </div>
              );
            })}
          </div>

          {/* Zoom controls */}
          <div style={{ display: "flex", gap: 8, marginTop: 10, marginBottom: 16, alignItems: "center" }}>
            {[["−", -0.15], ["+", 0.15]].map(([label, delta]) => (
              <button
                key={label}
                onClick={() => adjustScale(delta)}
                style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "var(--zoom-btn-bg)",
                  border: "1px solid var(--zoom-btn-border)",
                  color: "var(--zoom-btn-color)",
                  fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  lineHeight: 1, padding: 0,
                }}
              >{label}</button>
            ))}
          </div>

          {/* Interpretation — only for flipped cards */}
          <div style={{ width: "100%", maxWidth: 540 }}>
            {drawnCards.filter(card => flippedCards.has(card.id)).map((card) => {
              const i = drawnCards.indexOf(card);
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
              重新开始
            </button>
            <button
              onClick={shuffle}
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
              再抽一次
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
