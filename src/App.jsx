import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import CardDetailPage from "./pages/CardDetailPage";
import LenormandPage from "./pages/LenormandPage";
import SpreadLibraryPage from "./pages/SpreadLibraryPage";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Noto+Serif+SC:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');`;

const globalStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: linear-gradient(170deg, #1E1B16, #181511, #14120E);
    --bg-body: #14120E;
    --nav-bg: rgba(24,21,17,0.92);
    --nav-border: rgba(201,169,110,0.1);
    --text: #E8DDD0;
    --text-sub: rgba(180,165,140,0.6);
    --text-dim: rgba(180,165,140,0.4);
    --text-faint: rgba(180,165,140,0.35);
    --accent: #C9A96E;
    --accent-dim: rgba(201,169,110,0.5);
    --accent-bg: rgba(201,169,110,0.08);
    --accent-border: rgba(201,169,110,0.3);
    --accent-hover-border: rgba(201,169,110,0.6);
    --accent-kw-color: rgba(201,169,110,0.7);
    --accent-kw-border: rgba(201,169,110,0.15);
    --accent-on: #1E1B16;
    --btn-primary-bg: linear-gradient(135deg, #C9A96E, #B8956A);
    --btn-primary-color: #1E1B16;
    --card-bg: linear-gradient(145deg, #2A2520, #1E1B16);
    --card-bg-sel: linear-gradient(145deg, #3D3528, #2A2318);
    --card-border: rgba(180,165,140,0.3);
    --card-inner1: rgba(201,169,110,0.15);
    --card-inner2: rgba(201,169,110,0.08);
    --card-num: rgba(180,165,140,0.5);
    --card-sel-shadow: 0 12px 32px rgba(201,169,110,0.2), 0 0 0 1px rgba(201,169,110,0.1);
    --card-shadow: 0 2px 8px rgba(0,0,0,0.3);
    --surface: rgba(255,255,255,0.015);
    --surface-border: rgba(180,165,140,0.1);
    --surface2: rgba(255,255,255,0.02);
    --surface2-border: rgba(180,165,140,0.08);
    --filter-border: rgba(180,165,140,0.12);
    --footer-grad: linear-gradient(to top, rgba(24,21,17,0.98), rgba(24,21,17,0));
    --upright: #8BA88B;
    --reversed: #B87D6A;
    --upright-kw: rgba(139,168,139,0.8);
    --upright-kw-border: rgba(139,168,139,0.2);
    --reversed-kw: rgba(184,125,107,0.8);
    --reversed-kw-border: rgba(184,125,107,0.2);
    --body-text: rgba(220,210,195,0.75);
    --shuffling-bg: linear-gradient(145deg, #2A2520, #1E1B16);
    --shuffling-border: rgba(201,169,110,0.2);
    --zoom-btn-bg: rgba(180,165,140,0.06);
    --zoom-btn-border: rgba(180,165,140,0.2);
    --zoom-btn-color: rgba(180,165,140,0.7);
    --toggle-bg: rgba(201,169,110,0.08);
    --toggle-border: rgba(201,169,110,0.2);
    --toggle-color: rgba(201,169,110,0.75);
    --scrollbar-thumb: rgba(201,169,110,0.15);
  }

  [data-theme="light"] {
    --bg: linear-gradient(170deg, #F2EDE3, #EDE5D5, #E6DCC8);
    --bg-body: #E6DCC8;
    --nav-bg: rgba(242,237,227,0.93);
    --nav-border: rgba(140,110,60,0.15);
    --text: #2A2010;
    --text-sub: rgba(80,60,30,0.65);
    --text-dim: rgba(80,60,30,0.45);
    --text-faint: rgba(80,60,30,0.38);
    --accent: #7A5A18;
    --accent-dim: rgba(122,90,24,0.5);
    --accent-bg: rgba(122,90,24,0.08);
    --accent-border: rgba(122,90,24,0.3);
    --accent-hover-border: rgba(122,90,24,0.65);
    --accent-kw-color: rgba(122,90,24,0.75);
    --accent-kw-border: rgba(122,90,24,0.18);
    --accent-on: #F5EFE3;
    --btn-primary-bg: linear-gradient(135deg, #8A6420, #7A5418);
    --btn-primary-color: #F5EFE3;
    --card-bg: linear-gradient(145deg, #D8CEBA, #CBBFAA);
    --card-bg-sel: linear-gradient(145deg, #C5B898, #B8AA80);
    --card-border: rgba(120,100,55,0.35);
    --card-inner1: rgba(122,90,24,0.18);
    --card-inner2: rgba(122,90,24,0.09);
    --card-num: rgba(80,60,30,0.45);
    --card-sel-shadow: 0 12px 32px rgba(122,90,24,0.2), 0 0 0 1px rgba(122,90,24,0.12);
    --card-shadow: 0 2px 8px rgba(0,0,0,0.12);
    --surface: rgba(0,0,0,0.02);
    --surface-border: rgba(100,80,40,0.12);
    --surface2: rgba(0,0,0,0.025);
    --surface2-border: rgba(100,80,40,0.09);
    --filter-border: rgba(100,80,40,0.12);
    --footer-grad: linear-gradient(to top, rgba(224,215,198,0.98), rgba(224,215,198,0));
    --upright: #4A7850;
    --reversed: #9A5040;
    --upright-kw: rgba(60,120,70,0.85);
    --upright-kw-border: rgba(60,120,70,0.22);
    --reversed-kw: rgba(154,80,64,0.85);
    --reversed-kw-border: rgba(154,80,64,0.22);
    --body-text: rgba(55,40,18,0.8);
    --shuffling-bg: linear-gradient(145deg, #D0C4B0, #C4B89E);
    --shuffling-border: rgba(122,90,24,0.22);
    --zoom-btn-bg: rgba(100,80,40,0.06);
    --zoom-btn-border: rgba(100,80,40,0.2);
    --zoom-btn-color: rgba(80,60,30,0.65);
    --toggle-bg: rgba(122,90,24,0.08);
    --toggle-border: rgba(122,90,24,0.2);
    --toggle-color: rgba(122,90,24,0.75);
    --scrollbar-thumb: rgba(122,90,24,0.15);
  }

  body { background: var(--bg-body); }

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
  ::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 2px; }
`;

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const navigate = (p) => {
    setPage(p);
    setSelectedCard(null);
    setSelectedSpread(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startSpreadReading = (spread) => {
    setSelectedSpread(spread);
    setPage(spread.deck === "lenormand" ? "lenormand" : "home");
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
      background: "var(--bg)",
      color: "var(--text)",
    }}>
      <style>{fonts}{globalStyles}</style>

      <NavBar
        currentPage={page === "detail" ? "library" : page}
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={toggleTheme}
        showLenormand={true}
      />

      {page === "home" && <HomePage key={selectedSpread?.id ?? "free"} onNavigate={navigate} spread={selectedSpread} />}
      {page === "lenormand" && <LenormandPage key={selectedSpread?.id ?? "free"} spread={selectedSpread} />}
      {page === "library" && <LibraryPage onCardSelect={openCardDetail} />}
      {page === "spreads" && <SpreadLibraryPage onStartSpread={startSpreadReading} />}
      {page === "detail" && selectedCard && (
        <CardDetailPage card={selectedCard} onBack={() => navigate("library")} />
      )}
    </div>
  );
}
