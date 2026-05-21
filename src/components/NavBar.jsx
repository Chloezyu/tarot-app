export default function NavBar({ currentPage, onNavigate, theme, onToggleTheme, showLenormand }) {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: 60,
      background: "var(--nav-bg)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--nav-border)",
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
          color: "var(--accent)",
          cursor: "pointer",
          letterSpacing: "0.12em",
        }}
      >
        ARCANA
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <button
          onClick={onToggleTheme}
          title={theme === "dark" ? "切换至亮色模式" : "切换至暗色模式"}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--toggle-bg)",
            border: "1px solid var(--toggle-border)",
            color: "var(--toggle-color)",
            fontSize: 13,
            fontFamily: "'Noto Serif SC', serif",
            letterSpacing: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            padding: 0,
            transition: "all 0.3s",
          }}
        >
          {theme === "dark" ? "亮" : "暗"}
        </button>

        {[
          { key: "home", label: "塔罗" },
          ...(showLenormand ? [{ key: "lenormand", label: "雷诺曼" }] : []),
          { key: "spreads", label: "牌阵" },
          { key: "library", label: "牌库" },
        ].map((item) => (
          <div
            key={item.key}
            onClick={() => onNavigate(item.key)}
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 13,
              color: currentPage === item.key ? "var(--accent)" : "var(--text-sub)",
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
