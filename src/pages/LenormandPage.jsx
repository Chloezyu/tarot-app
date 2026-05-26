import { useState, useCallback, useRef, useEffect } from "react";
import { lenormandCards } from "../data/lenormandCards";
import { spreads, lenormandCategories } from "../data/spreads";
import CardBack from "../components/CardBack";
import FlipCard from "../components/FlipCard";
import { computeLayout, CARD_W, CARD_H } from "../utils/cardLayout";
import { useCardTable } from "../hooks/useCardTable";

export default function LenormandPage({ spread: spreadProp }) {
  const [phase, setPhase] = useState("welcome");
  const [system, setSystem] = useState(36);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [selected, setSelected] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [activeSpread, setActiveSpread] = useState(spreadProp ?? null);
  const [showSpreadModal, setShowSpreadModal] = useState(false);

  const lenormandSpreads = spreads.filter(s => s.deck === "lenormand");

  const flipCard = (cardId) => setFlippedCards(prev => { const next = new Set(prev); next.add(cardId); return next; });

  const {
    tableRef, cardPositions, setCardPositions, cardScale, setCardScale,
    expandedCards, activeCardId,
    initLayout, resetTable,
    onCardPointerDown, onCardPointerMove, onCardPointerUp,
    adjustScale, toggleExpanded,
  } = useCardTable({ flipCard, flippedCards, freeDrawCentered: true });

  useEffect(() => {
    if (phase !== "result" || drawnCards.length === 0) return;
    setFlippedCards(new Set());
    initLayout(drawnCards, activeSpread);
  }, [phase, drawnCards]);

  useEffect(() => {
    if (phase !== "result" || drawnCards.length === 0 || !tableRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { positions, scale } = computeLayout(drawnCards, activeSpread, entry.contentRect.width, { freeDrawCentered: true });
      setCardPositions(positions);
      setCardScale(scale);
    });
    observer.observe(tableRef.current);
    return () => observer.disconnect();
  }, [phase, drawnCards, activeSpread]);

  const shuffle = useCallback((spreadOverride) => {
    const currentSpread = spreadOverride !== undefined ? spreadOverride : activeSpread;
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
  }, [system, activeSpread]);

  const applySpread = (s) => {
    setActiveSpread(s);
    setSelected([]);
    setShowSpreadModal(false);
    shuffle(s);
  };

  const toggleCard = (index) => {
    if (phase !== "selecting") return;
    if (activeSpread) {
      if (selected.includes(index) || selected.length >= activeSpread.cardCount) return;
      const next = [...selected, index];
      setSelected(next);
      if (next.length === activeSpread.cardCount) {
        setTimeout(() => {
          setDrawnCards(next.map(i => shuffledDeck[i]));
          setPhase("result");
        }, 200);
      }
      return;
    }
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
    resetTable();
  };

  return (
    <div style={{
      minHeight: "100vh",
      paddingTop: 60,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>

      {/* Spread Modal */}
      {showSpreadModal && (
        <div
          onClick={() => setShowSpreadModal(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 500,
              maxHeight: "80vh",
              background: "var(--bg-body)",
              border: "1px solid var(--surface-border)",
              borderRadius: "12px 12px 0 0",
              overflowY: "auto",
              padding: "20px 20px 40px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 14,
                color: "var(--text)",
                letterSpacing: "0.15em",
              }}>
                选择牌阵
              </span>
              <button
                onClick={() => setShowSpreadModal(false)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 18,
                  color: "var(--text-faint)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: 4,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: "0 0 16px" }}>
              {lenormandCategories.map(cat => {
                const catSpreads = lenormandSpreads.filter(s => s.category === cat);
                if (catSpreads.length === 0) return null;
                return (
                  <div key={cat} style={{ marginBottom: 20 }}>
                    <div style={{
                      fontFamily: "'Noto Serif SC', serif",
                      fontSize: 11,
                      color: "var(--text-faint)",
                      letterSpacing: "0.25em",
                      marginBottom: 10,
                    }}>
                      {cat}
                    </div>
                    {catSpreads.map(s => (
                      <div
                        key={s.id}
                        onClick={() => applySpread(s)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "14px 16px",
                          marginBottom: 8,
                          background: activeSpread?.id === s.id ? "var(--accent-bg)" : "var(--surface)",
                          border: activeSpread?.id === s.id ? "1px solid var(--accent-border)" : "1px solid var(--surface-border)",
                          borderRadius: 6,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <div>
                          <div style={{
                            fontFamily: "'Noto Serif SC', serif",
                            fontSize: 14,
                            color: "var(--text)",
                            letterSpacing: "0.1em",
                            marginBottom: 3,
                          }}>
                            {s.name}
                          </div>
                          <div style={{
                            fontFamily: "'Noto Serif SC', serif",
                            fontSize: 11,
                            color: "var(--text-faint)",
                            fontWeight: 300,
                          }}>
                            {s.cardCount} 张 · {s.nameEn}
                          </div>
                        </div>
                        {activeSpread?.id === s.id && (
                          <span style={{ color: "var(--accent)", fontSize: 14 }}>✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
            {activeSpread ? activeSpread.name : "雷诺曼占卜"}
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 14,
            color: "var(--text-dim)",
            fontStyle: "italic",
            letterSpacing: "0.1em",
            marginBottom: activeSpread ? 20 : 48,
          }}>
            {activeSpread ? activeSpread.nameEn : "Lenormand Oracle"}
          </p>

          {activeSpread && (
            <p style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 13,
              color: "var(--text-sub)",
              lineHeight: 2,
              fontWeight: 300,
              maxWidth: 340,
              marginBottom: 40,
            }}>
              {activeSpread.description}
            </p>
          )}

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
            onClick={() => shuffle()}
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
          {activeSpread ? (
            <>
              <p style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 14,
                color: "var(--text-sub)",
                letterSpacing: "0.15em",
                marginBottom: 6,
                fontWeight: 300,
              }}>
                第 {selected.length + 1} 张 / {activeSpread.cardCount}
                {" · "}
                <span style={{ color: "var(--accent)" }}>{activeSpread.positions[selected.length]?.badge}</span>
              </p>
              <p style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 12,
                color: "var(--text-faint)",
                letterSpacing: "0.1em",
                marginBottom: 28,
                fontWeight: 300,
              }}>
                {activeSpread.positions[selected.length]?.label}
              </p>
            </>
          ) : (
            <>
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
                marginBottom: 16,
              }}>
                已选择 {selected.length} 张
              </p>
              <button
                onClick={() => setShowSpreadModal(true)}
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: 12,
                  letterSpacing: "0.15em",
                  color: "var(--accent)",
                  background: "transparent",
                  border: "1px solid var(--accent-border)",
                  padding: "8px 20px",
                  cursor: "pointer",
                  borderRadius: 2,
                  marginBottom: 24,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "var(--accent-bg)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}
              >
                牌阵
              </button>
            </>
          )}

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

          {activeSpread ? (
            selected.length > 0 && (
              <div style={{
                position: "fixed",
                bottom: 0, left: 0, right: 0,
                padding: "16px 20px max(16px, env(safe-area-inset-bottom))",
                background: "var(--footer-grad)",
                display: "flex",
                justifyContent: "center",
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
                  重新选牌
                </button>
              </div>
            )
          ) : (
            selected.length > 0 && (
              <div style={{
                position: "fixed",
                bottom: 0, left: 0, right: 0,
                padding: "16px 20px max(16px, env(safe-area-inset-bottom))",
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
            )
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
            {activeSpread
              ? `${activeSpread.name} · ${activeSpread.cardCount} 张`
              : `${system} 张体系 · 抽取 ${drawnCards.length} 张`}
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

            {drawnCards.map((card, i) => {
              if (flippedCards.has(card.id)) return null;
              const pos = cardPositions[card.id] ?? { x: 20 + i * 160, y: 35 };
              const badge = activeSpread ? activeSpread.positions[i]?.badge : i + 1;
              return (
                <div
                  key={`badge-${card.id}`}
                  style={{
                    position: "absolute",
                    left: pos.x + 4,
                    top: pos.y + 4,
                    minWidth: 22,
                    height: 22,
                    borderRadius: 11,
                    background: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 5px",
                    zIndex: 20,
                    pointerEvents: "none",
                  }}
                >
                  <span style={{
                    fontFamily: "'Noto Serif SC', serif",
                    fontSize: activeSpread ? 8 : 11,
                    fontWeight: 700,
                    color: "var(--accent-on)",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}>{badge}</span>
                </div>
              );
            })}
          </div>

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

          <div style={{ width: "100%", maxWidth: 540 }}>
            {drawnCards.filter(card => flippedCards.has(card.id)).map((card) => {
              const i = drawnCards.indexOf(card);
              const isExpanded = expandedCards.has(card.id);
              const posLabel = activeSpread ? activeSpread.positions[i]?.badge : i + 1;
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
                      fontFamily: "'Noto Serif SC', serif",
                      fontSize: 11,
                      color: "var(--accent-dim)",
                      minWidth: 20,
                      whiteSpace: "nowrap",
                    }}>
                      {posLabel}
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
              onClick={() => shuffle()}
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
