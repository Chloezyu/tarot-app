import { useState, useCallback, useRef, useEffect } from "react";
import { tarotCards } from "../data/tarotCards";
import CardBack from "../components/CardBack";
import FlipCard from "../components/FlipCard";

export default function HomePage() {
  const [phase, setPhase] = useState("welcome");
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [selected, setSelected] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [reversals, setReversals] = useState({});
  const [flippedCards, setFlippedCards] = useState(new Set());
  const gridRef = useRef(null);
  const tableRef = useRef(null);
  const draggingRef = useRef(null);
  const [cardPositions, setCardPositions] = useState({});
  const [cardScale, setCardScale] = useState(1);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [activeCardId, setActiveCardId] = useState(null);

  useEffect(() => {
    if (phase !== "result" || revealedCards.length === 0) return;
    const tableW = Math.min(window.innerWidth - 32, 720);
    const cardW = 140;
    const n = revealedCards.length;
    const spacing = n > 1 ? Math.min((tableW - 40 - cardW) / (n - 1), 200) : 0;
    const totalW = (n - 1) * spacing + cardW;
    const startX = Math.max(20, (tableW - totalW) / 2);
    const positions = {};
    revealedCards.forEach((card, i) => {
      positions[card.id] = { x: startX + i * spacing, y: 35 };
    });
    setCardPositions(positions);
    setCardScale(1);
    setFlippedCards(new Set());
    setExpandedCards(new Set());
    setActiveCardId(null);
  }, [phase]);

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
    const cardW = 140 * cardScale;
    const cardH = 210 * cardScale;
    const pad = 8;
    const maxX = table ? table.offsetWidth - cardW - pad : 800;
    const maxY = table ? table.offsetHeight - cardH - pad : 400;
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
      const newCardW = 140 * newScale, newCardH = 210 * newScale;
      setCardPositions(prev => {
        const next = {};
        Object.entries(prev).forEach(([id, pos]) => {
          const cx = pos.x + (140 * cardScale) / 2;
          const cy = pos.y + (210 * cardScale) / 2;
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

  const toggleExpanded = (cardId) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      next.has(cardId) ? next.delete(cardId) : next.add(cardId);
      return next;
    });
  };

  const shuffle = useCallback(() => {
    setPhase("shuffling");
    setSelected([]);
    setRevealedCards([]);
    setFlippedCards(new Set());

    const deck = [...tarotCards].sort(() => Math.random() - 0.5);
    deck.forEach((card, i) => { card._displayNum = i + 1; });
    const rev = {};
    deck.forEach((card) => { rev[card.id] = Math.random() > 0.5; });
    setReversals(rev);

    setTimeout(() => {
      setShuffledDeck(deck);
      setPhase("selecting");
    }, 1800);
  }, []);

  const toggleCard = (index) => {
    if (phase !== "selecting") return;
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const revealCards = () => {
    if (selected.length === 0) return;
    const cards = selected.map((i) => shuffledDeck[i]);
    setRevealedCards(cards);
    setPhase("result");
  };

  const reset = () => {
    setPhase("welcome");
    setSelected([]);
    setRevealedCards([]);
    setFlippedCards(new Set());
    setShuffledDeck([]);
    setCardPositions({});
    setCardScale(1);
    setExpandedCards(new Set());
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
          animation: "fadeIn 1s ease",
        }}>
          <div style={{ fontSize: 48, color: "rgba(201,169,110,0.3)", marginBottom: 24, lineHeight: 1 }}>✦</div>
          <h1 style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "clamp(24px, 5vw, 36px)",
            fontWeight: 300,
            color: "#E8DDD0",
            letterSpacing: "0.2em",
            marginBottom: 16,
          }}>
            静心 · 聆听 · 感知
          </h1>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 14,
            color: "rgba(180,165,140,0.5)",
            maxWidth: 360,
            lineHeight: 2,
            marginBottom: 48,
            fontWeight: 300,
          }}>
            深呼吸，将注意力集中于此刻<br />
            当你准备好时，开始洗牌
          </p>
          <button
            onClick={shuffle}
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 14,
              letterSpacing: "0.3em",
              color: "#C9A96E",
              background: "transparent",
              border: "1px solid rgba(201,169,110,0.3)",
              padding: "14px 48px",
              cursor: "pointer",
              transition: "all 0.4s",
              borderRadius: 2,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(201,169,110,0.08)";
              e.target.style.borderColor = "rgba(201,169,110,0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "rgba(201,169,110,0.3)";
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
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                style={{
                  width: 56,
                  height: 84,
                  borderRadius: 6,
                  background: "linear-gradient(145deg, #2A2520, #1E1B16)",
                  border: "1px solid rgba(201,169,110,0.2)",
                  animation: `cardFloat ${0.8 + n * 0.15}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 14,
            color: "rgba(180,165,140,0.5)",
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
            color: "rgba(180,165,140,0.6)",
            letterSpacing: "0.15em",
            marginBottom: 8,
            fontWeight: 300,
          }}>
            凭直觉选择你想抽取的牌
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "rgba(180,165,140,0.35)",
            marginBottom: 28,
          }}>
            已选择 {selected.length} 张
          </p>

          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
              gap: 8,
              width: "100%",
              maxWidth: 720,
              padding: "0 8px",
            }}
          >
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
              background: "linear-gradient(to top, rgba(24,21,17,0.98), rgba(24,21,17,0))",
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
                  color: "rgba(180,165,140,0.5)",
                  background: "transparent",
                  border: "1px solid rgba(180,165,140,0.2)",
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
                  color: "#1E1B16",
                  background: "linear-gradient(135deg, #C9A96E, #B8956A)",
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
          padding: "32px 16px 80px",
          animation: "fadeIn 0.6s ease",
          width: "100%",
        }}>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 14,
            color: "rgba(180,165,140,0.6)",
            letterSpacing: "0.15em",
            marginBottom: 4,
            fontWeight: 300,
          }}>
            你抽到了 {revealedCards.length} 张牌
          </p>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 12,
            color: "rgba(180,165,140,0.35)",
            letterSpacing: "0.1em",
            marginBottom: 16,
            fontWeight: 300,
          }}>
            点击牌面翻牌 · 拖拽移动位置
          </p>

          {/* Card Table */}
          <div
            ref={tableRef}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 720,
              height: 280,
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(180,165,140,0.1)",
              borderRadius: 12,
              marginBottom: 12,
              overflow: "hidden",
            }}
          >
            {revealedCards.map((card, i) => {
              const pos = cardPositions[card.id] ?? { x: 20 + i * 160, y: 35 };
              const isFlipped = flippedCards.has(card.id);
              return (
                <div
                  key={card.id}
                  style={{
                    position: "absolute",
                    left: pos.x,
                    top: pos.y,
                    width: 140,
                    height: 210,
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
                    isReversed={reversals[card.id]}
                  />
                </div>
              );
            })}
            {/* Badges rendered as direct table children to avoid transform escape */}
            {revealedCards.map((card, i) => {
              if (flippedCards.has(card.id)) return null;
              const pos = cardPositions[card.id] ?? { x: 20 + i * 160, y: 35 };
              return (
                <div
                  key={`badge-${card.id}`}
                  style={{
                    position: "absolute",
                    left: pos.x + 140 * cardScale - 28,
                    top: pos.y + 6,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#C9A96E",
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
                    color: "#1E1B16",
                    lineHeight: 1,
                  }}>{i + 1}</span>
                </div>
              );
            })}
          </div>

          {/* Zoom controls below table */}
          <div style={{ display: "flex", gap: 8, marginTop: 10, marginBottom: 16, alignItems: "center" }}>
            {[["−", -0.15], ["+", 0.15]].map(([label, delta]) => (
              <button
                key={label}
                onClick={() => adjustScale(delta)}
                style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "rgba(180,165,140,0.06)",
                  border: "1px solid rgba(180,165,140,0.2)",
                  color: "rgba(180,165,140,0.7)",
                  fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  lineHeight: 1, padding: 0,
                }}
              >{label}</button>
            ))}
          </div>

          {/* Interpretation (collapsible, only for flipped cards) */}
          <div style={{ width: "100%", maxWidth: 720 }}>
            {revealedCards.filter(card => flippedCards.has(card.id)).map((card, _) => {
              const i = revealedCards.indexOf(card);
              const isRev = reversals[card.id];
              const isExpanded = expandedCards.has(card.id);
              return (
                <div
                  key={card.id}
                  style={{
                    marginBottom: 8,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(180,165,140,0.08)",
                    borderRadius: 4,
                  }}
                >
                  <div
                    onClick={() => toggleExpanded(card.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "16px 20px",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      color: "rgba(201,169,110,0.5)",
                      minWidth: 16,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{
                      fontFamily: "'Noto Serif SC', serif",
                      fontSize: 16,
                      color: "#E8DDD0",
                      letterSpacing: "0.1em",
                      flex: 1,
                    }}>
                      {card.name}
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      color: isRev ? "#B87D6A" : "#8BA88B",
                      letterSpacing: "0.15em",
                    }}>
                      {isRev ? "逆位" : "正位"}
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      color: "rgba(180,165,140,0.35)",
                      marginLeft: 8,
                    }}>
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </div>
                  {isExpanded && (
                    <div style={{ padding: "0 20px 20px", animation: "fadeIn 0.3s ease" }}>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                        {(isRev ? card.reversedKeywords : card.uprightKeywords).map((kw, ki) => (
                          <span
                            key={ki}
                            style={{
                              fontFamily: "'Noto Serif SC', serif",
                              fontSize: 12,
                              color: "rgba(201,169,110,0.7)",
                              padding: "4px 12px",
                              border: "1px solid rgba(201,169,110,0.15)",
                              borderRadius: 20,
                              fontWeight: 300,
                            }}
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                      <p style={{
                        fontFamily: "'Noto Serif SC', serif",
                        fontSize: 14,
                        color: "rgba(220,210,195,0.75)",
                        lineHeight: 2,
                        fontWeight: 300,
                        margin: 0,
                      }}>
                        {isRev ? card.reversedMeaning : card.uprightMeaning}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 32, display: "flex", gap: 16 }}>
            <button
              onClick={reset}
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 13,
                color: "rgba(180,165,140,0.6)",
                background: "transparent",
                border: "1px solid rgba(180,165,140,0.2)",
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
                color: "#C9A96E",
                background: "transparent",
                border: "1px solid rgba(201,169,110,0.3)",
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
