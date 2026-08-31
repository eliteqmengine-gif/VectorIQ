const navigation = [
  { label: "Command", icon: "⌘", active: true },
  { label: "Signals", icon: "◈" },
  { label: "Research", icon: "◌" },
  { label: "Account", icon: "◎" },
];

export default function Home() {
  return (
    <main className="app-shell">
      <section className="app-frame" aria-label="VectorIQ mobile app preview">
        <header className="topbar">
          <div className="brand" aria-label="VectorIQ">
            <span className="brand-mark"><i /><i /><i /></span>
            <span>VECTOR<span>IQ</span></span>
          </div>
          <button className="icon-button" aria-label="Notifications">⌁<b /></button>
        </header>

        <section className="hero">
          <p className="eyebrow"><span className="pulse" /> Intelligence terminal</p>
          <h1>Trade with<br /><em>signal clarity.</em></h1>
          <p className="hero-copy">VectorIQ brings market research, signal review, and portfolio intelligence into one focused workspace.</p>
          <div className="hero-actions">
            <button className="primary-button">Open command center <span>→</span></button>
            <button className="text-button">How it works</button>
          </div>
        </section>

        <section className="terminal-card" aria-label="System status">
          <div className="terminal-head"><span>VECTOR ENGINE</span><span className="online"><i /> ONLINE</span></div>
          <div className="grid-visual"><div className="signal-orb"><span>VIQ</span></div><div className="scan-line" /></div>
          <div className="terminal-foot"><span>MARKET INTELLIGENCE</span><span>READY</span></div>
        </section>

        <section className="section-heading"><div><p className="eyebrow">Workspace</p><h2>Command center</h2></div><button aria-label="View all workspace items">View all <span>→</span></button></section>
        <section className="workspace-grid">
          <article className="workspace-card signal-card"><span className="card-icon">◈</span><h3>Signals</h3><p>Review active intelligence</p><span className="card-arrow">→</span></article>
          <article className="workspace-card research-card"><span className="card-icon">⌁</span><h3>Research</h3><p>Explore market context</p><span className="card-arrow">→</span></article>
        </section>

        <section className="trust-row"><span className="trust-icon">✦</span><p><strong>Built for informed decisions</strong><br />Research tools—not financial advice.</p></section>

        <nav className="bottom-nav" aria-label="Primary navigation">
          {navigation.map((item) => <button className={item.active ? "active" : ""} key={item.label}><span>{item.icon}</span>{item.label}</button>)}
        </nav>
      </section>
      <p className="capture-note">Mobile-first retail experience · optimized for Google Play screenshots</p>
    </main>
  );
}
