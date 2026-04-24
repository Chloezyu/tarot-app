export default function NavBar({ currentPage, onNavigate }) {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: 60,
      background: "rgba(24,21,17,0.92)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(201,169,110,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 clamp(16px, 4vw, 40px)",
      zIndex: 100,
    }}>
      <div
        onClick={() => onNavigate("home")}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20,
          fontWeight: 500,
          color: "#C9A96E",
          cursor: "pointer",
          letterSpacing: "0.12em",
        }}
      >
        ARCANA
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {[
          { key: "home", label: "抽牌" },
          { key: "library", label: "牌库" },
        ].map((item) => (
          <div
            key={item.key}
            onClick={() => onNavigate(item.key)}
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 13,
              color: currentPage === item.key ? "#C9A96E" : "rgba(180,165,140,0.6)",
              cursor: "pointer",
              letterSpacing: "0.15em",
              transition: "color 0.3s",
              fontWeight: currentPage === item.key ? 500 : 400,
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </nav>
  );
}
