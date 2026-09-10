export function shuffleWithDisplayNumbers(cards) {
  return [...cards]
    .sort(() => Math.random() - 0.5)
    .map((card, index) => ({
      ...card,
      displayNum: index + 1,
    }));
}
