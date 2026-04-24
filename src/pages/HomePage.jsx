import { useState, useCallback, useRef } from "react";
import { tarotCards } from "../data/tarotCards";
import CardBack from "../components/CardBack";
import FlipCard from "../components/FlipCard";

export default function HomePage() {
  const [phase, setPhase] = useState("welcome");
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [revealedCards, setRevealedCards] = useState([]);
  const [reversals, setReversals] = useState({});
  const [flipped, setFlipped] = useState(false);
  const gridRef = useRef(null);

  const shuffle = useCallback(() => {
    setPhase("shuffling");
    setSelected(new Set());
    setRevealedCards([]);
    setFlipped(false);

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
    const newSelected = new Set(selected);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelected(newSelected);
  };

  const revealCards = () => {
    if (selected.size === 0) return;
    const cards = Array.from(selected).map((i) => shuffledDeck[i]);
    setRevealedCards(cards);
    setPhase("result");
    setTimeout(() => setFlipped(true), 200);
  };

  const reset = () => {
    setPhase("welcome");
    setSelected(new Set());
    setRevealedCards([]);
    setFlipped(false);
    setShuffledDeck([]);
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
            已选择 {selected.size} 张
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
                  selected={selected.has(index)}
                  onClick={() => toggleCard(index)}
                  small={true}
                />
              </div>
            ))}
          </div>

          {selected.size > 0 && (
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
                onClick={() => setSelected(new Set())}
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
                翻牌 ({selected.size})
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
            marginBottom: 32,
            fontWeight: 300,
          }}>
            你抽到了 {revealedCards.length} 张牌
          </p>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 20,
            marginBottom: 48,
          }}>
            {revealedCards.map((card, i) => (
              <FlipCard
                key={card.id}
                card={card}
                flipped={flipped}
                delay={i * 300}
                isReversed={reversals[card.id]}
              />
            ))}
          </div>

          {flipped && (
            <div style={{ width: "100%", maxWidth: 720 }}>
              {revealedCards.map((card) => {
                const isRev = reversals[card.id];
                return (
                  <div
                    key={card.id}
                    style={{
                      marginBottom: 40,
                      padding: "28px 32px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(180,165,140,0.08)",
                      borderRadius: 4,
                      animation: "fadeInUp 0.5s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
                      <span style={{
                        fontFamily: "'Noto Serif SC', serif",
                        fontSize: 18,
                        color: "#E8DDD0",
                        letterSpacing: "0.1em",
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
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
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
                    }}>
                      {isRev ? card.reversedMeaning : card.uprightMeaning}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
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
