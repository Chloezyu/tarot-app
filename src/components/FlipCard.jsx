import { useState, useEffect } from "react";
import CardBack from "./CardBack";
import CardFace from "./CardFace";

export default function FlipCard({ card, flipped, delay = 0, isReversed }) {
  const [showFlip, setShowFlip] = useState(false);

  useEffect(() => {
    if (flipped) {
      const timer = setTimeout(() => setShowFlip(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShowFlip(false);
    }
  }, [flipped, delay]);

  return (
    <div style={{ perspective: 800, width: 140, height: 210, flexShrink: 0 }}>
      <div style={{
        width: "100%",
        height: "100%",
        position: "relative",
        transformStyle: "preserve-3d",
        transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: showFlip ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden" }}>
          <CardBack number={card._displayNum} small={false} />
        </div>
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          transform: isReversed ? "rotateY(180deg) rotateZ(180deg)" : "rotateY(180deg)",
        }}>
          <CardFace card={card} size="medium" />
        </div>
      </div>
    </div>
  );
}
