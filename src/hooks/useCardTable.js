import { useState, useRef } from "react";
import { CARD_W, CARD_H, computeLayout } from "../utils/cardLayout";

// Manages card table state and interaction handlers.
// flipCard(cardId): caller's function to add a card to flippedCards
// flippedCards: caller's Set, used to guard against re-flipping
// freeDrawCentered: whether free-draw (no spread) centers cards vertically
export function useCardTable({ flipCard, flippedCards, freeDrawCentered = false }) {
  const tableRef = useRef(null);
  const draggingRef = useRef(null);
  const [cardPositions, setCardPositions] = useState({});
  const [cardScale, setCardScale] = useState(1);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [activeCardId, setActiveCardId] = useState(null);

  const initLayout = (cards, spread) => {
    const tableSize = tableRef.current
      ? tableRef.current.offsetWidth
      : Math.min(window.innerWidth - 32, spread ? 540 : 720);
    const { positions, scale } = computeLayout(cards, spread, tableSize, { freeDrawCentered });
    setCardPositions(positions);
    setCardScale(scale);
    setExpandedCards(new Set());
    setActiveCardId(null);
  };

  const resetTable = () => {
    setCardPositions({});
    setCardScale(1);
    setExpandedCards(new Set());
  };

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
    const maxX = table ? table.offsetWidth - CARD_W * cardScale - pad : 800;
    const maxY = table ? table.offsetHeight - CARD_H * cardScale - pad : 600;
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
      flipCard(cardId);
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

  const toggleExpanded = (cardId) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      next.has(cardId) ? next.delete(cardId) : next.add(cardId);
      return next;
    });
  };

  return {
    tableRef,
    cardPositions, setCardPositions,
    cardScale, setCardScale,
    expandedCards,
    activeCardId,
    initLayout, resetTable,
    onCardPointerDown, onCardPointerMove, onCardPointerUp,
    adjustScale, toggleExpanded,
  };
}
