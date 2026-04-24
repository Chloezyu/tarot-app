import { useState } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import CardDetailPage from "./pages/CardDetailPage";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Noto+Serif+SC:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');`;

const globalStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #14120E; }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes cardFloat {
    from { transform: translateY(0) rotate(0deg); }
    to { transform: translateY(-12px) rotate(3deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  @keyframes shuffleCards {
    0% { transform: scale(0.8); opacity: 0; }
    30% { transform: scale(1.1) rotate(5deg); }
    60% { transform: scale(0.95) rotate(-3deg); }
    100% { transform: scale(1) rotate(0); }
  }
  button:hover { opacity: 0.9; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.15); border-radius: 2px; }
`;

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCard, setSelectedCard] = useState(null);

  const navigate = (p) => {
    setPage(p);
    setSelectedCard(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openCardDetail = (card) => {
    setSelectedCard(card);
    setPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #1E1B16, #181511, #14120E)",
      color: "#E8DDD0",
    }}>
      <style>{fonts}{globalStyles}</style>

      <NavBar
        currentPage={page === "detail" ? "library" : page}
        onNavigate={navigate}
      />

      {page === "home" && <HomePage onNavigate={navigate} />}
      {page === "library" && <LibraryPage onCardSelect={openCardDetail} />}
      {page === "detail" && selectedCard && (
        <CardDetailPage card={selectedCard} onBack={() => navigate("library")} />
      )}
    </div>
  );
}
