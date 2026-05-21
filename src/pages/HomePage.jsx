import { useState, useCallback, useRef, useEffect } from "react";
import { tarotCards } from "../data/tarotCards";
import { spreads, tarotCategories } from "../data/spreads";
import CardBack from "../components/CardBack";
import FlipCard from "../components/FlipCard";

const DECK_LABELS = {
  major: "大阿尔卡纳",
  wands: "权杖",
  cups: "圣杯",
  swords: "宝剑",
  pentacles: "星币",
};

function MiniSpreadPreview({ positions }) {
  const S = 52;
  const cw = 8, ch = 12;
  return (
    <div style={{ position: "relative", width: S, height: S, flexShrink: 0 }}>
      {positions.map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: Math.max(0, Math.min(S - cw, pos.cx * S - cw / 2)),
            top: Math.max(0, Math.min(S - ch, pos.cy * S - ch / 2)),
            width: cw,
            height: ch,
            borderRadius: 2,
            border: "1px solid var(--accent-border)",
            background: "var(--accent-bg)",
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage({ onNavigate, spread }) {
  const [phase, setPhase] = useState("welcome");
  const [activeSpread, setActiveSpread] = useState(spread || null);
  const [showSpreadModal, setShowSpreadModal] = useState(false);
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
  const [subDecks, setSubDecks] = useState({});
  const [currentPickStep, setCurrentPickStep] = useState(0);
  const [splitSelectedCards, setSplitSelectedCards] = useState([]);

  useEffect(() => {
    if (phase !== "result" || revealedCards.length === 0) return;
    if (activeSpread) {
      const tableSize = tableRef.current ? tableRef.current.offsetWidth : Math.min(window.innerWidth - 32, 540);
      const initScale = activeSpread.initialScale ?? 0.85;
      const cardW = 140 * initScale;
      const cardH = 210 * initScale;
      const positions = {};
      revealedCards.forEach((card, i) => {
        const sPos = activeSpread.positions[i];
        if (sPos) {
          positions[card.id] = {
            x: Math.max(0, sPos.cx * tableSize - cardW / 2),
            y: Math.max(0, sPos.cy * tableSize - cardH / 2),
          };
        }
      });
      setCardPositions(positions);
      setCardScale(initScale);
    } else {
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
    }
    setFlippedCards(new Set());
    setExpandedCards(new Set());
    setActiveCardId(null);
  }, [phase]);

  useEffect(() => {
    if (spread) shuffle();
  }, []); // auto-start when entering via SpreadLibraryPage

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

  const shuffle = useCallback((spreadOverride) => {
    const currentSpread = spreadOverride ?? activeSpread;
    setPhase("shuffling");
    setSelected([]);
    setRevealedCards([]);
    setFlippedCards(new Set());
    setSplitSelectedCards([]);
    setCurrentPickStep(0);

    const rev = {};
    tarotCards.forEach((card) => { rev[card.id] = Math.random() > 0.5; });
    setReversals(rev);

    if (currentSpread?.splitDraw) {
      const decks = {};
      ["major", "wands", "cups", "swords", "pentacles"].forEach(type => {
        const pool = tarotCards
          .filter(c => type === "major" ? c.category === "major" : c.suit === type)
          .sort(() => Math.random() - 0.5);
        pool.forEach((card, i) => { card._displayNum = i + 1; });
        decks[type] = pool;
      });
      setTimeout(() => {
        setSubDecks(decks);
        setPhase("selecting");
      }, 1800);
      return;
    }

    const deck = [...tarotCards].sort(() => Math.random() - 0.5);
    deck.forEach((card, i) => { card._displayNum = i + 1; });
    setTimeout(() => {
      setShuffledDeck(deck);
      setPhase("selecting");
    }, 1800);
  }, [activeSpread]);

  const pickCardForStep = (card) => {
    const nextCards = [...splitSelectedCards, card];
    setSplitSelectedCards(nextCards);
    if (nextCards.length >= activeSpread.cardCount) {
      setRevealedCards(nextCards);
      setPhase("result");
    } else {
      setCurrentPickStep(s => s + 1);
    }
  };

  const toggleCard = (index) => {
    if (phase !== "selecting") return;
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      if (activeSpread && selected.length >= activeSpread.cardCount) return;
      setSelected([...selected, index]);
    }
  };

  const revealCards = () => {
    if (selected.length === 0) return;
    const cards = selected.map((i) => shuffledDeck[i]);
    setRevealedCards(cards);
    setPhase("result");
  };

  const applySpread = (s) => {
    setActiveSpread(s);
    setSelected([]);
    setShowSpreadModal(false);
    if (s.splitDraw) {
      shuffle(s);
    }
  };

  const clearSpread = () => {
    setActiveSpread(null);
    setSelected([]);
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
    setActiveSpread(null);
    setSubDecks({});
    setCurrentPickStep(0);
    setSplitSelectedCards([]);
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
      {phase === "welcome" && !spread && (
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
          <div style={{ fontSize: 48, color: "var(--accent-border)", marginBottom: 24, lineHeight: 1 }}>✦</div>
          <h1 style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: "clamp(24px, 5vw, 36px)",
            fontWeight: 300,
            color: "var(--text)",
            letterSpacing: "0.2em",
            marginBottom: 16,
          }}>
            静心 · 聆听 · 感知
          </h1>
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 14,
            color: "var(--text-sub)",
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
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                style={{
                  width: 56,
                  height: 84,
                  borderRadius: 6,
                  background: "var(--shuffling-bg)",
                  border: "1px solid var(--shuffling-border)",
                  animation: `cardFloat ${0.8 + n * 0.15}s ease-in-out infinite alternate`,
                }}
              />
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
        <>
          {/* Spread picker button — hidden during split-draw sequential selection */}
          {!activeSpread?.splitDraw && (
            <button
              onClick={() => setShowSpreadModal(true)}
              style={{
                position: "fixed",
                top: 70,
                right: 16,
                zIndex: 90,
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 12,
                letterSpacing: "0.12em",
                color: activeSpread ? "var(--accent)" : "var(--text-sub)",
                background: activeSpread ? "var(--accent-bg)" : "transparent",
                border: `1px solid ${activeSpread ? "var(--accent-border)" : "var(--surface-border)"}`,
                padding: "7px 14px",
                cursor: "pointer",
                borderRadius: 20,
                maxWidth: 130,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                transition: "all 0.3s",
              }}
            >
              {activeSpread ? activeSpread.name : "牌阵"}
            </button>
          )}

          {activeSpread?.splitDraw ? (
            /* Split-draw sequential selection (e.g. 四季牌阵) */
            <div style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px 16px 60px",
              animation: "fadeIn 0.6s ease",
              width: "100%",
              maxWidth: 900,
            }}>
              {/* Step indicator */}
              <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
                {activeSpread.positions.map((pos, i) => {
                  const isDone = i < currentPickStep;
                  const isCurrent = i === currentPickStep;
                  return (
                    <div key={i} style={{
                      padding: "5px 12px",
                      borderRadius: 12,
                      background: isDone ? "var(--accent-bg)" : isCurrent ? "var(--accent)" : "transparent",
                      border: `1px solid ${isDone || isCurrent ? "var(--accent-border)" : "var(--surface-border)"}`,
                      fontFamily: "'Noto Serif SC', serif",
                      fontSize: 11,
                      color: isDone ? "var(--accent)" : isCurrent ? "var(--accent-on)" : "var(--text-faint)",
                      letterSpacing: "0.1em",
                      transition: "all 0.3s",
                    }}>
                      {isDone ? `${pos.badge} ✓` : pos.badge}
                    </div>
                  );
                })}
              </div>

              <p style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 14,
                color: "var(--text)",
                letterSpacing: "0.15em",
                marginBottom: 6,
                fontWeight: 300,
              }}>
                {DECK_LABELS[activeSpread.positions[currentPickStep]?.drawFrom]}
              </p>
              <p style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 12,
                color: "var(--text-sub)",
                letterSpacing: "0.1em",
                marginBottom: 28,
                fontWeight: 300,
              }}>
                凭直觉选择「{activeSpread.positions[currentPickStep]?.label}」
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
                {(subDecks[activeSpread.positions[currentPickStep]?.drawFrom] ?? []).map((card, index) => (
                  <div
                    key={card.id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      animation: `fadeInUp 0.4s ease ${index * 0.008}s both`,
                    }}
                  >
                    <CardBack
                      number={index + 1}
                      selected={false}
                      orderNumber={null}
                      onClick={() => pickCardForStep(card)}
                      small={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Regular full-deck selection */
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
                {activeSpread ? `请依次选取 ${activeSpread.cardCount} 张牌` : "凭直觉选择你想抽取的牌"}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "var(--text-faint)",
                }}>
                  {activeSpread ? `${selected.length} / ${activeSpread.cardCount}` : `已选择 ${selected.length} 张`}
                </p>
                {activeSpread && (
                  <button
                    onClick={clearSpread}
                    style={{
                      fontFamily: "'Noto Serif SC', serif",
                      fontSize: 11,
                      color: "var(--text-faint)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      letterSpacing: "0.05em",
                    }}
                  >
                    × 清除
                  </button>
                )}
              </div>

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
                    {activeSpread ? `翻牌 (${selected.length}/${activeSpread.cardCount})` : `翻牌 (${selected.length})`}
                  </button>
                </div>
              )}
            </div>
          )}
        </>
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
          {activeSpread && (
            <p style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 13,
              color: "var(--accent-dim)",
              letterSpacing: "0.15em",
              marginBottom: 2,
              fontWeight: 400,
            }}>
              {activeSpread.name}
            </p>
          )}
          <p style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 14,
            color: "var(--text-sub)",
            letterSpacing: "0.15em",
            marginBottom: 4,
            fontWeight: 300,
          }}>
            你抽到了 {revealedCards.length} 张牌
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

          {/* Card Table */}
          <div
            ref={tableRef}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: activeSpread ? 540 : 720,
              ...(activeSpread ? { aspectRatio: "1/1" } : { height: 280 }),
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
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
            {/* Badges */}
            {revealedCards.map((card, i) => {
              if (flippedCards.has(card.id)) return null;
              const pos = cardPositions[card.id] ?? { x: 20 + i * 160, y: 35 };
              const badgeLabel = activeSpread ? activeSpread.positions[i]?.badge : i + 1;
              return (
                <div
                  key={`badge-${card.id}`}
                  style={{
                    position: "absolute",
                    left: pos.x + 6,
                    top: pos.y + 6,
                    minWidth: 22,
                    height: 20,
                    borderRadius: 10,
                    padding: "0 6px",
                    background: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 20,
                    pointerEvents: "none",
                  }}
                >
                  <span style={{
                    fontFamily: activeSpread ? "'Noto Serif SC', serif" : "'DM Sans', sans-serif",
                    fontSize: activeSpread ? 9 : 11,
                    fontWeight: 700,
                    color: "var(--accent-on)",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}>{badgeLabel}</span>
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

          {/* Interpretation */}
          <div style={{ width: "100%", maxWidth: 720 }}>
            {revealedCards.filter(card => flippedCards.has(card.id)).map((card) => {
              const i = revealedCards.indexOf(card);
              const isRev = reversals[card.id];
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
                      padding: "16px 20px",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{
                      fontFamily: "'Noto Serif SC', serif",
                      fontSize: 11,
                      color: "var(--accent-dim)",
                      minWidth: 16,
                    }}>
                      {activeSpread ? activeSpread.positions[i]?.badge : i + 1}
                    </span>
                    <span style={{
                      fontFamily: "'Noto Serif SC', serif",
                      fontSize: 16,
                      color: "var(--text)",
                      letterSpacing: "0.1em",
                      flex: 1,
                    }}>
                      {card.name}
                      {activeSpread && activeSpread.positions[i]?.label && (
                        <span style={{
                          fontFamily: "'Noto Serif SC', serif",
                          fontSize: 11,
                          color: "var(--text-faint)",
                          letterSpacing: "0.05em",
                          marginLeft: 8,
                          fontWeight: 300,
                        }}>
                          · {activeSpread.positions[i].label}
                        </span>
                      )}
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      color: isRev ? "var(--reversed)" : "var(--upright)",
                      letterSpacing: "0.15em",
                    }}>
                      {isRev ? "逆位" : "正位"}
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
                    <div style={{ padding: "0 20px 20px", animation: "fadeIn 0.3s ease" }}>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                        {(isRev ? card.reversedKeywords : card.uprightKeywords).map((kw, ki) => (
                          <span
                            key={ki}
                            style={{
                              fontFamily: "'Noto Serif SC', serif",
                              fontSize: 12,
                              color: "var(--accent-kw-color)",
                              padding: "4px 12px",
                              border: "1px solid var(--accent-kw-border)",
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
                        color: "var(--body-text)",
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
              onClick={activeSpread && spread ? () => onNavigate("spreads") : reset}
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
              {activeSpread && spread ? "返回牌阵" : "重新开始"}
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

      {/* Spread Picker Modal (bottom sheet) */}
      {showSpreadModal && (
        <div
          onClick={() => setShowSpreadModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 300,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 540,
              maxHeight: "78vh",
              background: "var(--bg-body)",
              borderRadius: "16px 16px 0 0",
              overflow: "auto",
              animation: "fadeInUp 0.25s ease",
            }}
          >
            {/* Modal header */}
            <div style={{
              position: "sticky",
              top: 0,
              background: "var(--bg-body)",
              padding: "20px 20px 16px",
              borderBottom: "1px solid var(--surface-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 1,
            }}>
              <span style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 15,
                color: "var(--text)",
                letterSpacing: "0.15em",
              }}>
                选择牌阵
              </span>
              <button
                onClick={() => setShowSpreadModal(false)}
                style={{
                  fontSize: 20,
                  color: "var(--text-sub)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: "4px 8px",
                }}
              >
                ×
              </button>
            </div>

            {/* Spread list */}
            <div style={{ padding: "16px 20px 32px" }}>
              {tarotCategories.map(cat => {
                const catSpreads = spreads.filter(s => s.deck === "tarot" && s.category === cat);
                if (catSpreads.length === 0) return null;
                return (
                  <div key={cat} style={{ marginBottom: 24 }}>
                    <div style={{
                      fontFamily: "'Noto Serif SC', serif",
                      fontSize: 11,
                      color: "var(--text-faint)",
                      letterSpacing: "0.25em",
                      marginBottom: 10,
                    }}>
                      {cat}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {catSpreads.map(s => {
                        const isActive = activeSpread?.id === s.id;
                        return (
                          <div
                            key={s.id}
                            onClick={() => applySpread(s)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 14,
                              padding: "12px 16px",
                              background: isActive ? "var(--accent-bg)" : "var(--surface)",
                              border: `1px solid ${isActive ? "var(--accent-border)" : "var(--surface-border)"}`,
                              borderRadius: 8,
                              cursor: "pointer",
                              transition: "border-color 0.2s",
                            }}
                            onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = "var(--accent-border)"; }}
                            onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = "var(--surface-border)"; }}
                          >
                            <MiniSpreadPreview positions={s.positions} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                                <span style={{
                                  fontFamily: "'Noto Serif SC', serif",
                                  fontSize: 14,
                                  color: isActive ? "var(--accent)" : "var(--text)",
                                  letterSpacing: "0.1em",
                                }}>
                                  {s.name}
                                </span>
                                <span style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: 11,
                                  color: "var(--text-faint)",
                                }}>
                                  {s.cardCount} 张
                                </span>
                              </div>
                              <p style={{
                                fontFamily: "'Noto Serif SC', serif",
                                fontSize: 11,
                                color: "var(--text-sub)",
                                lineHeight: 1.7,
                                margin: 0,
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical",
                                fontWeight: 300,
                              }}>
                                {s.description}
                              </p>
                            </div>
                            {isActive && (
                              <span style={{
                                fontFamily: "'Noto Serif SC', serif",
                                fontSize: 10,
                                color: "var(--accent)",
                                letterSpacing: "0.1em",
                                flexShrink: 0,
                              }}>
                                使用中
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
