export const CARD_W = 140;
export const CARD_H = 210;

export function computeAdaptiveScale(spread, tableSize) {
  if (!spread) return 1;
  const base = spread.initialScale ?? 1;
  const pos = spread.positions;
  let maxScale = base;
  for (let i = 0; i < pos.length; i++) {
    for (let j = i + 1; j < pos.length; j++) {
      const dx = Math.abs(pos[i].cx - pos[j].cx);
      const dy = Math.abs(pos[i].cy - pos[j].cy);
      if (dx > 0.02) maxScale = Math.min(maxScale, (dx * tableSize - 8) / CARD_W);
      if (dy > 0.02) maxScale = Math.min(maxScale, (dy * tableSize - 8) / CARD_H);
    }
  }
  return Math.max(0.3, maxScale);
}

// freeDrawCentered: true = center cards vertically (Lenormand), false = fixed y=35 (Tarot)
export function computeLayout(cards, spread, tableSize, { freeDrawCentered = false } = {}) {
  const scale = computeAdaptiveScale(spread, tableSize);
  const positions = {};
  if (spread) {
    cards.forEach((card, i) => {
      const p = spread.positions[i];
      if (p) {
        positions[card.id] = {
          x: Math.max(0, p.cx * tableSize - (CARD_W * scale) / 2),
          y: Math.max(0, p.cy * tableSize - (CARD_H * scale) / 2),
        };
      }
    });
  } else {
    const n = cards.length;
    const spacing = n > 1 ? Math.min((tableSize - 40 - CARD_W) / (n - 1), 200) : 0;
    const totalW = (n - 1) * spacing + CARD_W;
    const startX = Math.max(20, (tableSize - totalW) / 2);
    const startY = freeDrawCentered ? Math.max(20, (tableSize - CARD_H) / 2) : 35;
    cards.forEach((card, i) => {
      positions[card.id] = { x: startX + i * spacing, y: startY };
    });
  }
  return { positions, scale };
}
