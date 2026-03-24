import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coinSoundUrl from "./assets/Coin Payment Online Shop Notification 3.wav";

const playCoinSound = () => {
  const audio = new Audio(coinSoundUrl);
  audio.play().catch(e => console.log("Audio play prevented:", e));
};

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{
      --blue:#4361EE;--blue2:#3A0CA3;--blue3:#4CC9F0;
      --green:#06D6A0;--green2:#04BF8F;
      --amber:#F9A826;--red:#EF233C;
      --font:'Plus Jakarta Sans',sans-serif;
      --mono:'JetBrains Mono',monospace;
      --r:16px;--rs:10px;
    }
    body{font-family:var(--font);overflow-x:hidden;transition:background 0.35s,color 0.35s;}
    body.dark{
      --bg:#070B18;--bg2:#0C1224;--bg3:#111C35;--card:#0F1830;
      --border:rgba(67,97,238,0.16);--border2:rgba(67,97,238,0.35);
      --text:#EEF2FF;--text2:#8B99C2;--text3:#4A5880;
      background:var(--bg);color:var(--text);
    }
    body.light{
      --bg:#EFF3FF;--bg2:#E2EAFF;--bg3:#D3DFFF;--card:#FFFFFF;
      --border:rgba(67,97,238,0.14);--border2:rgba(67,97,238,0.28);
      --text:#0D1426;--text2:#3A4A70;--text3:#7B8DB5;
      background:var(--bg);color:var(--text);
    }
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:var(--bg);}
    ::-webkit-scrollbar-thumb{background:var(--blue);border-radius:2px;}

    .grid-bg{
      background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);
      background-size:48px 48px;
    }
    .card{background:var(--card);border:1px solid var(--border);border-radius:var(--r);}
    .blue-glow{box-shadow:0 0 40px rgba(67,97,238,0.28),0 0 80px rgba(67,97,238,0.10);}
    .green-glow{box-shadow:0 0 30px rgba(6,214,160,0.28);}
    .grad-text{
      background:linear-gradient(135deg,var(--blue) 0%,var(--blue3) 100%);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    }
    .shimmer{
      background:linear-gradient(90deg,var(--blue),var(--blue3),var(--green),var(--blue));
      background-size:200% auto;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      animation:shimmer 3.5s linear infinite;
    }
    .btn-p{background:linear-gradient(135deg,var(--blue),var(--blue2));color:#fff;border:none;border-radius:var(--rs);font-family:var(--font);font-weight:700;cursor:pointer;transition:all 0.2s;}
    .btn-p:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(67,97,238,0.38);}
    .btn-o{background:transparent;border:1.5px solid var(--border2);color:var(--text);border-radius:var(--rs);font-family:var(--font);font-weight:600;cursor:pointer;transition:all 0.2s;}
    .btn-o:hover{border-color:var(--blue);color:var(--blue);}

    @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
    @keyframes floatR{0%,100%{transform:translateY(0) rotate(-3deg);}50%{transform:translateY(-12px) rotate(3deg);}}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.7);}}
    @keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
    @keyframes scan{0%{top:0;}100%{top:100%;}}
    @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
    @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
    @keyframes glow-pulse{0%,100%{box-shadow:0 0 18px rgba(67,97,238,0.15);}50%{box-shadow:0 0 36px rgba(67,97,238,0.4);}}
    @keyframes spinY{0%{transform:perspective(500px) rotateY(0);}100%{transform:perspective(500px) rotateY(360deg);}}
    @keyframes dash{to{stroke-dashoffset:0;}}
  `}</style>
);

/* ── LOGO ── */
const Logo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4361EE" /><stop offset="100%" stopColor="#3A0CA3" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#lg)" />
    <text x="24" y="70" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="800" fontSize="56" fill="white">B</text>
    <line x1="27" y1="73" x2="73" y2="27" stroke="#06D6A0" strokeWidth="7.5" strokeLinecap="round" />
    <polygon points="73,27 57,25 71,41" fill="#06D6A0" />
    <polygon points="27,73 29,57 43,71" fill="#06D6A0" />
  </svg>
);

/* ── CURRENCY NOTE FLIP ── */
const USD_INR = 83.47;
const NoteFlip = () => {
  const [isRupee, setIsRupee] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setIsRupee(p => !p), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ perspective: 600 }}>
      <AnimatePresence mode="wait">
        <motion.div key={isRupee ? "r" : "d"}
          initial={{ rotateY: 90, scale: 0.85, opacity: 0 }}
          animate={{ rotateY: 0, scale: 1, opacity: 1 }}
          exit={{ rotateY: -90, scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.45 }}
          style={{ animation: "floatR 3.2s ease-in-out infinite", display: "inline-block" }}
        >
          <div style={{
            width: 130, height: 70, borderRadius: 12, padding: "0 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: isRupee
              ? "linear-gradient(135deg,#5B4AE8,#3A2CB5)"
              : "linear-gradient(135deg,#06D6A0,#028F6A)",
            boxShadow: "0 10px 32px rgba(0,0,0,0.45)",
            border: "1px solid rgba(255,255,255,0.14)", position: "relative", overflow: "hidden"
          }}>
            <div style={{ fontFamily: "var(--mono)", fontWeight: 800, fontSize: 28, color: "rgba(255,255,255,0.18)" }}>
              {isRupee ? "₹" : "$"}
            </div>
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: 20, color: "#fff" }}>
                {isRupee ? "₹500" : "$6"}
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em" }}>
                {isRupee ? "RUPEE" : "USD"}
              </div>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontWeight: 800, fontSize: 28, color: "rgba(255,255,255,0.18)" }}>
              {isRupee ? "₹" : "$"}
            </div>
            {[0, 1, 2].map(i => <div key={i} style={{ position: "absolute", left: 12, right: 12, top: 18 + i * 14, height: 1, background: "rgba(255,255,255,0.07)" }} />)}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ── TICKER ── */
const tickers = [
  "USD/INR 83.47 ▲0.12%", "EUR/INR 90.23 ▲0.08%", "GBP/INR 105.61 ▼0.05%",
  "AED/INR 22.72 ▲0.03%", "SGD/INR 62.18 ▼0.09%", "UPI TX/s 4,812 ▲12%", "Settlement 1.2s ▼18%",
  "USD/INR 83.47 ▲0.12%", "EUR/INR 90.23 ▲0.08%", "GBP/INR 105.61 ▼0.05%",
  "AED/INR 22.72 ▲0.03%", "SGD/INR 62.18 ▼0.09%", "UPI TX/s 4,812 ▲12%", "Settlement 1.2s ▼18%",
];
const Ticker = () => (
  <div style={{ background: "var(--blue2)", overflow: "hidden", height: 26, display: "flex", alignItems: "center" }}>
    <div style={{ whiteSpace: "nowrap", display: "inline-flex", gap: 44, animation: "ticker 28s linear infinite", fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.04em" }}>
      {tickers.map((t, i) => (
        <span key={i} style={{ color: t.includes("▲") ? "#a0ffcb" : t.includes("▼") ? "#ffaaaa" : "rgba(255,255,255,0.55)" }}>{t}</span>
      ))}
    </div>
  </div>
);

/* ── NAVBAR ── */
const Navbar = ({ dark, onToggle, onPay, onNav }) => (
  <nav style={{ position: "sticky", top: 0, zIndex: 100, background: dark ? "rgba(7,11,24,0.93)" : "rgba(239,243,255,0.93)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <Logo size={33} />
      <span style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: 17, letterSpacing: "-0.03em", color: "var(--text)" }}>Better<span className="grad-text">UPI</span></span>
    </div>
    <div style={{ display: "flex", gap: 26, fontFamily: "var(--font)", fontSize: 13, fontWeight: 600, color: "var(--text2)" }}>
      {["How it Works", "Documentation"].map(l => (
        <span key={l} onClick={() => onNav(l)} style={{ cursor: "pointer", transition: "color 0.2s" }}
          onMouseEnter={e => e.target.style.color = "var(--blue)"}
          onMouseLeave={e => e.target.style.color = "var(--text2)"}>
          {l}
        </span>
      ))}
    </div>
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <button onClick={onToggle} style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text2)", width: 35, height: 35, borderRadius: 8, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {dark ? "☀️" : "🌙"}
      </button>
      <button onClick={onPay} className="btn-p" style={{ padding: "9px 22px", fontSize: 13 }}>Make a Payment →</button>
    </div>
  </nav>
);

/* ── HERO ── */
const Hero = ({ onPay }) => (
  <section className="grid-bg" style={{ minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 32px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.15, mixBlendMode: "screen" }}>
      {/* Container slightly scaled and shifted to hide any potential YouTube borders/titles that squeak through */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) scale(1.1)", width: "100%", height: "100%" }}>
        <iframe
          src="https://www.youtube-nocookie.com/embed/Ps-0f0K6izM?autoplay=1&mute=1&loop=1&playlist=Ps-0f0K6izM&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1&fs=0&color=white&widget_referrer=test"
          title="BetterUPI Demo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          style={{ width: "100vw", height: "56.25vw", minHeight: "100vh", minWidth: "177.77vh", position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", border: "none", pointerEvents: "none" }}
        />
      </div>
    </div>
    <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(67,97,238,0.10) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ textAlign: "center", maxWidth: 820, zIndex: 1 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(67,97,238,0.08)", border: "1px solid var(--border2)", borderRadius: 100, padding: "5px 17px", marginBottom: 32, fontFamily: "var(--mono)", fontSize: 11, color: "var(--blue)", letterSpacing: "0.08em" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulse 1.5s infinite", display: "inline-block" }} />
        LIVE NETWORK · 4,812 TX/SEC · 140+ COUNTRIES
      </div>

      <h1 style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(44px,7vw,90px)", lineHeight: 1.03, letterSpacing: "-0.04em", marginBottom: 24, color: "var(--text)" }}>
        Pay globally<br /><span className="shimmer">with UPI</span>
      </h1>

      <p style={{ fontFamily: "var(--font)", fontSize: "clamp(15px,1.6vw,18px)", color: "var(--text2)", maxWidth: 560, margin: "0 auto 42px", lineHeight: 1.75, fontWeight: 400 }}>
        BetterUPI bridges India's UPI network to global merchants — with sub-2-second settlement, zero FX fees, and a routing algorithm that routes every transaction intelligently.
      </p>

      {/* Live FX + note flip */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, marginBottom: 44, flexWrap: "wrap" }}>
        <NoteFlip />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 5 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "0.08em" }}>LIVE FX RATE</div>
          <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: 20, color: "var(--green)" }}>₹1 = $0.012</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>83.47 INR/USD · Real-time interbank</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={onPay} className="btn-p blue-glow" style={{ padding: "16px 44px", fontSize: 16 }}>Make a Payment →</button>
        <a href="#how-it-works" style={{ textDecoration: "none" }}>
          <button className="btn-o" style={{ padding: "16px 32px", fontSize: 15 }}>How it works ↓</button>
        </a>
      </div>
      <p style={{ marginTop: 14, fontFamily: "var(--mono)", fontSize: 11, color: "var(--red)" }}>* This is a simulated payment — no real funds are processed</p>
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      style={{ display: "flex", gap: 14, marginTop: 56, flexWrap: "wrap", justifyContent: "center", zIndex: 1 }}>
      {[["₹2.4B+", "Monthly Volume"], ["1.2s", "Avg Settlement"], ["99.97%", "Uptime SLA"], ["0%", "FX Markup"]].map(([n, l]) => (
        <div key={l} className="card" style={{ padding: "13px 26px", textAlign: "center", animation: "glow-pulse 3s ease-in-out infinite" }}>
          <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: 21, color: "var(--blue)" }}>{n}</div>
          <div style={{ fontFamily: "var(--font)", fontSize: 11, fontWeight: 500, color: "var(--text3)", marginTop: 3 }}>{l}</div>
        </div>
      ))}
    </motion.div>
  </section>
);

/* ── PROBLEM / SOLUTION ── */
const ProblemSolution = () => (
  <section style={{ padding: "80px 40px", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
    <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--red)", letterSpacing: "0.1em", marginBottom: 14 }}>THE PROBLEM</div>
        <h2 style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: 34, lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 16, color: "var(--text)" }}>UPI stops at the border</h2>
        <p style={{ fontFamily: "var(--font)", color: "var(--text2)", lineHeight: 1.75, marginBottom: 18, fontSize: 15 }}>500M+ Indians use UPI daily — but the moment they try to pay a foreign merchant, the rails break. Card fees eat 3–5%. International transfers take days.</p>
        {["No UPI acceptance outside NPCI corridors", "Currency conversion costs 3–5%", "Settlement takes 2–5 business days", "Merchants lose Indian customers"].map(p => (
          <div key={p} style={{ display: "flex", gap: 10, fontFamily: "var(--font)", fontSize: 13, color: "var(--text2)", alignItems: "center", marginBottom: 8 }}>
            <span style={{ color: "var(--red)", fontWeight: 700, flexShrink: 0 }}>✕</span>{p}
          </div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--green)", letterSpacing: "0.1em", marginBottom: 14 }}>THE SOLUTION</div>
        <h2 style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: 34, lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 16, color: "var(--text)" }}>BetterUPI <span className="grad-text">bridges the gap</span></h2>
        <p style={{ fontFamily: "var(--font)", color: "var(--text2)", lineHeight: 1.75, marginBottom: 18, fontSize: 15 }}>We sit between payer and merchant — accepting UPI on one side, settling in local currency on the other. A routing algorithm handles routing, fraud, and FX in milliseconds.</p>
        {["Accept UPI from any Indian bank", "Lowest rates possible", "Sub-2-second global settlement", "Works with Stripe, Razorpay, Adyen"].map(p => (
          <div key={p} style={{ display: "flex", gap: 10, fontFamily: "var(--font)", fontSize: 13, color: "var(--text2)", alignItems: "center", marginBottom: 8 }}>
            <span style={{ color: "var(--green)", fontWeight: 700, flexShrink: 0 }}>✓</span>{p}
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── HOW IT WORKS ── */
const HowItWorks = () => {
  const steps = [
    { n: "01", title: "Select BetterUPI", desc: "At any supported international checkout, choose BetterUPI instead of a credit card. No card details required.", icon: "🛒" },
    { n: "02", title: "Scan QR Code", desc: "A dynamic QR code appears showing the exact INR amount. Open GPay, PhonePe, Paytm or BHIM and scan.", icon: "📱" },
    { n: "03", title: "Algorithm Routes Your Payment", desc: "Our routing algorithm validates the transaction, scores fraud risk, selects the optimal rail and locks the FX rate in under 100ms.", icon: "🔀" },
    { n: "04", title: "Instant Global Settlement", desc: "The merchant receives USD/EUR/GBP in their Stripe or Razorpay account within 1.2 seconds on average.", icon: "⚡" },
  ];
  return (
    <section id="how-it-works" style={{ padding: "100px 40px", maxWidth: 1060, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--blue)", letterSpacing: "0.1em", marginBottom: 14 }}>HOW IT WORKS</div>
        <h2 style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(30px,5vw,50px)", letterSpacing: "-0.03em", color: "var(--text)" }}>
          Four steps. <span className="grad-text">Global reach.</span>
        </h2>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 18 }}>
        {steps.map((s, i) => (
          <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="card" style={{ padding: 26, position: "relative", overflow: "hidden", cursor: "default" }}
            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(67,97,238,0.2)" }}>
            <div style={{ position: "absolute", top: 14, right: 16, fontFamily: "var(--mono)", fontWeight: 700, fontSize: 30, color: "var(--border2)", letterSpacing: "-0.04em" }}>{s.n}</div>
            <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
            <h3 style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: 16, marginBottom: 8, color: "var(--text)" }}>{s.title}</h3>
            <p style={{ fontFamily: "var(--font)", fontSize: 13.5, color: "var(--text2)", lineHeight: 1.72 }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Gateway flow (from screenshot 4) */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="card" style={{ marginTop: 40, padding: "36px 32px", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0 }}>
        {[
          { label: "Local UPI", sub: "India · ₹", icon: "📱", badge: "₹", bc: "var(--green)" },
          "arrow",
          { label: "BetterUPI Gateway", sub: "Smart Routing Bridge", isLogo: true },
          "arrow",
          { label: "Global Merchant", sub: "USD / EUR / GBP", icon: "🌐", badge: "$", bc: "var(--amber)" },
        ].map((n, i) => {
          if (n === "arrow") return (
            <div key={i} style={{ padding: "0 14px" }}>
              <svg width="72" height="20" viewBox="0 0 72 20">
                <line x1="0" y1="10" x2="64" y2="10" stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="5 3" strokeDashoffset="40" style={{ animation: "dash 0.8s linear infinite" }} />
                <polygon points="64,6 72,10 64,14" fill="var(--blue)" />
              </svg>
            </div>
          );
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: 14, position: "relative" }}>
              {n.badge && <div style={{ position: "absolute", top: 8, right: 8, width: 22, height: 22, borderRadius: "50%", background: n.bc, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "#fff", zIndex: 2 }}>{n.badge}</div>}
              <div style={{ width: 68, height: 68, borderRadius: 18, background: n.isLogo ? "transparent" : "var(--bg3)", border: n.isLogo ? "none" : "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, animation: n.isLogo ? "float 3s ease-in-out infinite" : "none" }}>
                {n.isLogo ? <Logo size={52} /> : n.icon}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: 13, color: "var(--text)" }}>{n.label}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", marginTop: 2 }}>{n.sub}</div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
};

/* ── DOCUMENTATION ── */
const docs = [
  {
    title: "Quick Start", icon: "🚀", content: `To integrate BetterUPI into your checkout, add the script tag and initialize:

<script src="https://cdn.betterupi.com/v1/checkout.js"></script>

BetterUPI.init({
  merchantId: "YOUR_MERCHANT_ID",
  currency: "USD"
});

// Trigger the payment modal
BetterUPI.openCheckout({
  amount: 20.00,
  description: "Claude Code Subscription",
  onSuccess: (txn) => console.log(txn.txnId),
  onFailure: (err) => console.error(err)
});` },
  {
    title: "API Reference", icon: "📡", content: `POST /v1/payments/initiate
Authorization: Bearer <api_key>
Content-Type: application/json

{
  "amount_usd": 20.00,
  "merchant_id": "merch_xxx",
  "order_id":    "order_abc123",
  "redirect_url": "https://yoursite.com/success",
  "metadata": { "plan": "pro_monthly" }
}

Response 200:
{
  "qr_payload":  "upi://pay?pa=betterupi@icici&am=1669.40&tn=order_abc123",
  "session_id":  "sess_8F2K9P",
  "expires_at":  1712345678,
  "amount_inr":  1669.40,
  "fx_rate":     83.47
}` },
  {
    title: "Webhooks", icon: "🔔", content: `BetterUPI sends POST requests to your endpoint on payment events.

Event types:
  payment.initiated  payment.received
  payment.settled    payment.failed

Payload example:
{
  "event":       "payment.settled",
  "txn_id":      "TXN8F2K9P",
  "amount_inr":  1669.40,
  "amount_usd":  20.00,
  "fx_rate":     83.47,
  "merchant_id": "merch_xxx",
  "routing_decision": {
    "risk_score":  0.04,
    "route":       "card_rail",
    "fraud_check": "passed",
    "latency_ms":  47
  }
}` },
  {
    title: "Routing Decision Object", icon: "🔀", content: `Every transaction includes a transparent routing decision object:

{
  "risk_score":      0.12,   // 0.0 low → 1.0 high risk
  "route":           "card_rail",
  // card_rail | swift | local_transfer
  "fraud_check":     "passed",
  // passed | flagged | blocked
  "latency_ms":      47,     // Algorithm processing time
  "fx_rate_locked":  83.47,  // Rate locked at initiation
  "routing_reason":  "Lowest latency route selected"
}

Access via webhook payload or GET /v1/payments/:txn_id` },
];

const Documentation = () => {
  const [active, setActive] = useState(0);
  return (
    <section id="documentation" style={{ padding: "96px 40px", maxWidth: 1060, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--blue)", letterSpacing: "0.1em", marginBottom: 14 }}>DOCUMENTATION</div>
        <h2 style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(28px,5vw,46px)", letterSpacing: "-0.03em", color: "var(--text)" }}>
          Everything you need to <span className="grad-text">integrate</span>
        </h2>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {docs.map((d, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              display: "flex", alignItems: "center", gap: 9, padding: "11px 14px", borderRadius: 9, border: "none", cursor: "pointer", textAlign: "left", fontFamily: "var(--font)", fontWeight: 600, fontSize: 13, transition: "all 0.2s",
              background: active === i ? "rgba(67,97,238,0.10)" : "transparent",
              color: active === i ? "var(--blue)" : "var(--text2)",
              borderLeft: active === i ? "3px solid var(--blue)" : "3px solid transparent"
            }}>
              {d.icon} {d.title}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="card" style={{ padding: 28 }}>
            <h3 style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: 19, marginBottom: 18, color: "var(--text)" }}>
              {docs[active].icon} {docs[active].title}
            </h3>
            <pre style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--blue3)", lineHeight: 1.85, whiteSpace: "pre-wrap", wordBreak: "break-word", background: "var(--bg2)", padding: 20, borderRadius: 10, border: "1px solid var(--border)", margin: 0 }}>
              {docs[active].content}
            </pre>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ── QR CODE ── */
const QRCode = ({ amount }) => {
  const cells = [];
  for (let r = 0; r < 21; r++) for (let c = 0; c < 21; c++) {
    const finder = (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7);
    cells.push({ r, c, on: finder || ((r + c + Math.floor(amount)) % 3 === 0 && Math.sin(r * 7 + c * 13) > 0.1) });
  }
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg viewBox="0 0 23 23" width="156" height="156" style={{ imageRendering: "pixelated", display: "block" }}>
        <rect width="23" height="23" fill="white" />
        {cells.map(({ r, c, on }) => on && <rect key={`${r}-${c}`} x={c + 1} y={r + 1} width="1" height="1" fill="#0D1426" />)}
        {[[1, 1], [15, 1], [1, 15]].map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="7" height="7" fill="#0D1426" />
            <rect x={x + 1} y={y + 1} width="5" height="5" fill="white" />
            <rect x={x + 2} y={y + 2} width="3" height="3" fill="#4361EE" />
          </g>
        ))}
      </svg>
      {/* scan line */}
      <div style={{ position: "absolute", left: 0, right: 0, height: 3, background: "linear-gradient(90deg,transparent,#06D6A0,transparent)", animation: "scan 1.8s ease-in-out infinite", opacity: 0.85 }} />
      {/* corner brackets like screenshot */}
      {[{ t: 0, l: 0, bt: "3px solid #06D6A0", bl: "3px solid #06D6A0" },
      { t: 0, r: 0, bt: "3px solid #06D6A0", br: "3px solid #06D6A0" },
      { b: 0, l: 0, bb: "3px solid #06D6A0", bl: "3px solid #06D6A0" },
      { b: 0, r: 0, bb: "3px solid #06D6A0", br: "3px solid #06D6A0" }
      ].map((s, i) => {
        const { t, l, r, b, bt, bl, bb, br } = s;
        return <div key={i} style={{
          position: "absolute", width: 18, height: 18, borderRadius: 3,
          ...(t !== undefined ? { top: t } : {}),
          ...(l !== undefined ? { left: l } : {}),
          ...(r !== undefined ? { right: r } : {}),
          ...(b !== undefined ? { bottom: b } : {}),
          ...(bt ? { borderTop: bt } : {}),
          ...(bl ? { borderLeft: bl } : {}),
          ...(bb ? { borderBottom: bb } : {}),
          ...(br ? { borderRight: br } : {})
        }} />
      })}
    </div>
  );
};

/* ── ROUTING PIPELINE ── */
const AI_STEPS = [
  { label: "Transaction Verification", detail: "Validating UPI ID, bank & amount integrity", icon: "🔍" },
  { label: "Fraud Detection", detail: "Scoring 40+ risk signals via ML model", icon: "🛡" },
  { label: "Payment Routing", detail: "Selecting optimal rail & gateway", icon: "🔀" },
  { label: "FX Conversion ₹→$", detail: "Applying locked interbank rate 83.47", icon: "💱" },
  { label: "Settlement Execution", detail: "Atomic finality on global payment rail", icon: "⚡" },
];
const AIPipeline = ({ step, show, ai }) => (
  <div className="card" style={{ padding: 22, marginTop: 18 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", animation: step >= 0 ? "pulse 1.5s infinite" : "none" }} />
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--green)", letterSpacing: "0.07em" }}>ALGORITHM PROCESSING</span>
      </div>
      {show && ai && <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>risk <span style={{ color: "var(--amber)" }}>{ai.risk_score}</span></span>}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {AI_STEPS.map((s, i) => {
        const done = i < step, active = i === step;
        return (
          <motion.div key={s.label} animate={{ opacity: step >= 0 && i > step ? 0.3 : 1 }}
            style={{
              display: "flex", alignItems: "center", gap: 11, padding: "9px 12px", borderRadius: 9,
              background: active ? "rgba(67,97,238,0.08)" : done ? "rgba(6,214,160,0.05)" : "transparent",
              border: active ? "1px solid rgba(67,97,238,0.28)" : "1px solid transparent", transition: "all 0.3s"
            }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0,
              background: done ? "var(--green)" : active ? "var(--blue)" : "var(--bg3)", transition: "background 0.3s", color: done || active ? "#fff" : "var(--text3)"
            }}>{done ? "✓" : s.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font)", fontWeight: 600, fontSize: 13, color: done ? "var(--green)" : active ? "var(--blue)" : "var(--text3)" }}>{s.label}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", marginTop: 1 }}>{s.detail}</div>
            </div>
            {done && <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--green)" }}>DONE</span>}
            {active && <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--blue)", animation: "blink 1s infinite" }}>LIVE</span>}
          </motion.div>
        );
      })}
    </div>
    {show && ai && step > 1 && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 12, padding: 13, background: "var(--bg2)", borderRadius: 8, border: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", marginBottom: 7, letterSpacing: "0.06em" }}>ROUTING DECISION OBJECT</div>
        <pre style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--blue3)", lineHeight: 1.7, margin: 0 }}>{JSON.stringify(ai, null, 2)}</pre>
      </motion.div>
    )}
  </div>
);

/* ── DEMO PAGE ── */
const sleep = ms => new Promise(r => setTimeout(r, ms));
const fakeId = () => "TXN" + Math.random().toString(36).substr(2, 10).toUpperCase();
const fmtTime = () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false });

const PRODS = [
  { id: "claude", name: "Claude Code", plan: "Pro · Monthly", price: 20, logo: "◆" },
  { id: "notion", name: "Notion", plan: "Plus · Monthly", price: 10, logo: "■" },
  { id: "figma", name: "Figma", plan: "Professional", price: 15, logo: "●" },
];
const PMETHODS = [
  { id: "cc", label: "Credit Card", icon: "💳", detail: "Visa / Mastercard", fee: "2.9% + $0.30" },
  { id: "dc", label: "Debit Card", icon: "🏦", detail: "Rupay / HDFC / SBI", fee: "1.5%" },
  { id: "upi", label: "BetterUPI", icon: "⬡", detail: "Instant · Zero fees", fee: "₹0", hi: true },
];

const DemoPage = ({ onBack }) => {
  const [prod, setProd] = useState(PRODS[0]);
  const [method, setMethod] = useState("upi");
  const [stage, setStage] = useState("checkout");
  const [aiStep, setAIStep] = useState(-1);
  const [result, setResult] = useState(null);
  const [showAI, setShowAI] = useState(false);
  const [log, setLog] = useState([]);
  const baseInr = Math.round(prod.price * USD_INR);
  const feeUSD = method === "cc" ? (prod.price * 0.029 + 0.3) : method === "dc" ? (prod.price * 0.015) : 0;
  const inr = Math.round((prod.price + feeUSD) * USD_INR);

  const goQR = () => { if (method === "upi") setStage("qr"); };
  const simulate = async () => {
    setStage("processing"); await sleep(950);
    setStage("ai"); setAIStep(0);
    for (let i = 1; i <= AI_STEPS.length; i++) { await sleep(600 + Math.random() * 380); setAIStep(i); }
    await sleep(450);
    const ok = true;
    const res = {
      success: ok, txnId: fakeId(), amtINR: inr, amtUSD: +(inr / USD_INR).toFixed(2), fxRate: USD_INR,
      ai: { risk_score: +(Math.random() * 0.22).toFixed(3), route: "card_rail", fraud_check: "passed", latency_ms: 47 + Math.floor(Math.random() * 30) },
      timestamp: fmtTime(), processor: "Razorpay Gateway (simulated)", rail: "SWIFT ACH Bridge"
    };
    setResult(res); setLog(p => [res, ...p]);
    if (ok) { setStage("merchant"); await sleep(1900); setStage("success"); playCoinSound(); }
    else { setStage("checkout"); setAIStep(-1); alert("Payment declined (simulated). Please try again."); }
  };
  const reset = () => { setStage("checkout"); setAIStep(-1); setResult(null); };

  return (
    <div className="grid-bg" style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <button onClick={onBack} className="btn-o" style={{ padding: "7px 16px", fontSize: 13 }}>← Back</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Logo size={22} /><span style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>BetterUPI Checkout</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--green)" }}>SECURE · TLS 1.3</span>
            <button onClick={() => setShowAI(!showAI)} style={{ marginLeft: 6, background: showAI ? "rgba(67,97,238,0.10)" : "transparent", border: `1px solid ${showAI ? "var(--blue)" : "var(--border)"}`, color: showAI ? "var(--blue)" : "var(--text3)", padding: "5px 11px", borderRadius: 6, fontFamily: "var(--mono)", fontSize: 10, cursor: "pointer" }}>
              {showAI ? "●" : "○"} Routing Decisions
            </button>
          </div>
        </div>
        <p style={{ textAlign: "center", fontFamily: "var(--mono)", fontSize: 11, color: "var(--red)", marginBottom: 26 }}>* This is a simulated payment — no real funds are processed</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {stage === "checkout" && (
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)", letterSpacing: "0.06em", marginBottom: 12 }}>SELECT PRODUCT</div>
                {PRODS.map(p => (
                  <div key={p.id} onClick={() => setProd(p)} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 13px", borderRadius: 10, border: `1px solid ${prod.id === p.id ? "var(--blue)" : "var(--border)"}`, background: prod.id === p.id ? "rgba(67,97,238,0.06)" : "transparent", cursor: "pointer", marginBottom: 7, transition: "all 0.2s" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--bg3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "var(--blue)", fontWeight: 800 }}>{p.logo}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: 13, color: "var(--text)" }}>{p.name}</div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", marginTop: 1 }}>{p.plan}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: 15, color: "var(--blue)" }}>${p.price}</div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)" }}>/month</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {stage !== "checkout" && (
              <div className="card" style={{ padding: 18, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 9, background: "var(--bg3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "var(--blue)", fontWeight: 800 }}>{prod.logo}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{prod.name}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>{prod.plan}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: 18, color: "var(--blue)" }}>${prod.price}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)" }}>≈ ₹{baseInr.toLocaleString("en-IN")}</div>
                </div>
              </div>
            )}
            {(stage === "ai" || stage === "merchant" || stage === "success") && <AIPipeline step={aiStep} show={showAI} ai={result?.ai} />}
            {log.length > 0 && (
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "0.06em", marginBottom: 9 }}>TRANSACTION LOG</div>
                {log.slice(0, 3).map((t, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < log.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)" }}>{t.txnId}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: t.success ? "var(--green)" : "var(--red)" }}>{t.success ? `₹${t.amtINR.toLocaleString()} ✓` : "FAILED"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <AnimatePresence mode="wait">
              {stage === "checkout" && (
                <motion.div key="co" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="card" style={{ padding: 24 }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)", letterSpacing: "0.06em", marginBottom: 16 }}>PAYMENT METHOD</div>
                    {PMETHODS.map(m => (
                      <div key={m.id} onClick={() => setMethod(m.id)} style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 14px", borderRadius: 10, border: `1px solid ${method === m.id ? (m.hi ? "var(--blue)" : "var(--border2)") : "var(--border)"}`, background: method === m.id ? (m.hi ? "rgba(67,97,238,0.06)" : "rgba(255,255,255,0.01)") : "transparent", cursor: "pointer", marginBottom: 9, transition: "all 0.2s", position: "relative" }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--bg3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{m.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: 13, color: m.hi && method === m.id ? "var(--blue)" : "var(--text)" }}>{m.label}</div>
                          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", marginTop: 1 }}>{m.detail}</div>
                        </div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: m.id === "upi" ? "var(--green)" : "var(--red)", fontWeight: 600 }}>{m.fee}</div>
                        {m.hi && <div style={{ position: "absolute", top: 7, right: 10, background: "var(--blue)", color: "#fff", fontFamily: "var(--mono)", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 100 }}>BEST</div>}
                      </div>
                    ))}
                    <div style={{ background: "var(--bg2)", borderRadius: 10, padding: "12px 16px", margin: "16px 0" }}>
                      {[["Subtotal", `$${prod.price.toFixed(2)}`], ["Fee", method === "upi" ? "₹0 (Free)" : `$${feeUSD.toFixed(2)}`], ["Total", `₹${inr.toLocaleString("en-IN")} ($${(prod.price + feeUSD).toFixed(2)})`]].map(([k, v], i) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none", fontFamily: i === 2 ? "var(--font)" : "var(--mono)", fontWeight: i === 2 ? 800 : 400, fontSize: i === 2 ? 15 : 12, color: "var(--text2)" }}>
                          <span>{k}</span>
                          <span style={{ color: k === "Fee" && method === "upi" ? "var(--green)" : k === "Fee" ? "var(--red)" : i === 2 ? "var(--blue)" : "var(--text2)" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={goQR} className="btn-p" style={{
                      width: "100%", padding: "14px", fontSize: 14,
                      background: method === "upi" ? "linear-gradient(135deg,var(--blue),var(--blue2))" : "var(--bg3)",
                      color: method === "upi" ? "#fff" : "var(--text3)", cursor: method === "upi" ? "pointer" : "not-allowed"
                    }}>
                      {method === "upi" ? `Pay ₹${inr.toLocaleString("en-IN")} with UPI →` : "Select BetterUPI to continue"}
                    </button>
                  </div>
                </motion.div>
              )}
              {stage === "qr" && (
                <motion.div key="qr" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <div className="card" style={{ padding: 28, textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--blue)", letterSpacing: "0.08em", marginBottom: 16 }}>SCAN TO PAY · checkout.betterupi.com</div>
                    <div style={{ display: "inline-block", padding: 13, background: "white", borderRadius: 13, marginBottom: 16, animation: "float 3s ease-in-out infinite" }} className="blue-glow">
                      <QRCode amount={inr} />
                    </div>
                    <div style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: 28, color: "var(--blue)", marginBottom: 3 }}>₹{inr.toLocaleString("en-IN")}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text3)", marginBottom: 5 }}>= ${prod.price} USD · Rate {USD_INR}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)", marginBottom: 20 }}>betterupi@icici · {prod.name}</div>
                    <div style={{ display: "flex", gap: 7, justifyContent: "center", marginBottom: 18, flexWrap: "wrap" }}>
                      {["GPay", "PhonePe", "Paytm", "BHIM"].map(a => (
                        <div key={a} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "5px 13px", fontFamily: "var(--mono)", fontSize: 11, color: "var(--text2)" }}>{a}</div>
                      ))}
                    </div>
                    <p style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", marginBottom: 14 }}>Powered by BetterUPI · Align QR code to scan</p>
                    <button onClick={simulate} className="btn-p green-glow" style={{ width: "100%", padding: "14px", fontSize: 14, background: "linear-gradient(135deg,var(--green),var(--green2))" }}>
                      ▶ Simulate Payment
                    </button>
                    <button onClick={reset} style={{ background: "transparent", border: "none", color: "var(--text3)", fontFamily: "var(--mono)", fontSize: 11, cursor: "pointer", marginTop: 10 }}>← Cancel</button>
                  </div>
                </motion.div>
              )}
              {stage === "processing" && (
                <motion.div key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="card" style={{ padding: 48, textAlign: "center" }}>
                    <div style={{ width: 70, height: 70, margin: "0 auto 22px", position: "relative" }}>
                      <svg width="70" height="70" viewBox="0 0 70 70" style={{ position: "absolute" }}>
                        <circle cx="35" cy="35" r="29" fill="none" stroke="var(--border)" strokeWidth="2.5" />
                        <circle cx="35" cy="35" r="29" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeDasharray="52 134" strokeLinecap="round" style={{ transformOrigin: "center", animation: "scan 1.1s linear infinite" }} />
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><Logo size={30} /></div>
                    </div>
                    <div style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: 17, color: "var(--blue)", marginBottom: 7 }}>Waiting for UPI Payment…</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text3)" }}>Monitoring · betterupi@icici</div>
                  </div>
                </motion.div>
              )}
              {stage === "ai" && (
                <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="card" style={{ padding: 24 }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--green)", letterSpacing: "0.08em", marginBottom: 12 }}>PAYMENT RECEIVED ✓</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <div>
                        <div style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: 28, color: "var(--green)" }}>₹{inr.toLocaleString("en-IN")}</div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)" }}>UPI debit confirmed</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>via</div>
                        <div style={{ fontFamily: "var(--font)", fontWeight: 700, color: "var(--blue)" }}>BetterUPI</div>
                      </div>
                    </div>
                    <div style={{ height: 3, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                      <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: AI_STEPS.length * 0.75 }}
                        style={{ height: "100%", background: "linear-gradient(90deg,var(--blue),var(--green))" }} />
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", textAlign: "right", marginTop: 4 }}>{Math.round((aiStep / AI_STEPS.length) * 100)}%</div>
                  </div>
                </motion.div>
              )}
              {stage === "merchant" && result && (
                <motion.div key="merch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="card" style={{ padding: 24 }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--blue)", letterSpacing: "0.08em", marginBottom: 16 }}>MERCHANT SETTLEMENT</div>
                    {[["Payment Rail", result.rail], ["Processor", result.processor], ["FX Rate", "₹" + result.fxRate + " / $1"], ["Merchant Receives", "$" + result.amtUSD + " USD"], ["Status", "SENDING…"]].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "var(--bg2)", borderRadius: 8, marginBottom: 6, fontFamily: "var(--mono)", fontSize: 12 }}>
                        <span style={{ color: "var(--text3)" }}>{k}</span>
                        <span style={{ color: k === "Status" ? "var(--amber)" : "var(--text)" }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 14, padding: 13, background: "rgba(6,214,160,0.07)", border: "1px solid rgba(6,214,160,0.28)", borderRadius: 10, textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--green)", marginBottom: 3 }}>PAYMENT SENT VIA GLOBAL RAIL</div>
                      <div style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: 16, color: "var(--green)" }}>Settlement Complete ✓</div>
                    </div>
                  </div>
                </motion.div>
              )}
              {stage === "success" && result && (
                <motion.div key="succ" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <div className="card green-glow" style={{ padding: 32, textAlign: "center", border: "1px solid rgba(6,214,160,0.38)" }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                      style={{ width: 70, height: 70, borderRadius: "50%", background: "#06D6A0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 28px rgba(6,214,160,0.45)" }}>
                      <span style={{ fontSize: 30, color: "white" }}>✓</span>
                    </motion.div>
                    <div style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: 24, color: "var(--text)", marginBottom: 5 }}>Payment Successful!</div>
                    <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: 26, color: "var(--green)", marginBottom: 4 }}>₹{inr.toLocaleString("en-IN")} paid</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text3)", marginBottom: 22 }}>Subscription Activated · {prod.name}</div>
                    <div style={{ background: "var(--bg2)", borderRadius: 10, padding: 16, textAlign: "left", marginBottom: 20 }}>
                      {[["Transaction ID", result.txnId], ["Amount (INR)", `₹${result.amtINR.toLocaleString("en-IN")}`], ["Amount (USD)", `$${result.amtUSD}`], ["FX Rate", `${result.fxRate}`], ["Timestamp", result.timestamp], ["Risk Score", result.ai.risk_score], ["Latency", `${result.ai.latency_ms}ms`]].map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border)", fontFamily: "var(--mono)", fontSize: 11 }}>
                          <span style={{ color: "var(--text3)" }}>{k}</span>
                          <span style={{ color: k === "Transaction ID" ? "var(--blue3)" : k.includes("Risk") ? "var(--green)" : "var(--text)" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 9 }}>
                      <button onClick={reset} className="btn-p" style={{ flex: 1, padding: "12px", fontSize: 13 }}>New Payment</button>
                      <button onClick={onBack} className="btn-o" style={{ flex: 1, padding: "12px", fontSize: 13 }}>Back to Home</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── FOOTER ── */
const Footer = () => (
  <footer style={{ borderTop: "1px solid var(--border)", padding: "36px 40px", background: "var(--bg2)" }}>
    <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Logo size={24} />
        <span style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: 15, color: "var(--text)" }}>Better<span className="grad-text">UPI</span></span>
      </div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)" }}>
        © 2026 BetterUPI · All transactions simulated · No real funds processed
      </div>
      <div style={{ display: "flex", gap: 18, fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)" }}>
        {["Privacy", "Terms", "API", "Status"].map(l => <span key={l} style={{ cursor: "pointer" }}>{l}</span>)}
      </div>
    </div>
  </footer>
);

/* ── APP ── */
export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("landing");

  useEffect(() => { document.body.className = dark ? "dark" : "light"; }, [dark]);

  useEffect(() => {
    playCoinSound();
  }, []);

  const goDemo = () => { setPage("demo"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleNav = label => {
    setPage("landing");
    setTimeout(() => {
      const id = label === "How it Works" ? "how-it-works" : "documentation";
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <GlobalStyle />
      <Ticker />
      <Navbar dark={dark} onToggle={() => setDark(!dark)} onPay={goDemo} onNav={handleNav} />
      <AnimatePresence mode="wait">
        {page === "landing" ? (
          <motion.div key="land" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero onPay={goDemo} />
            <ProblemSolution />
            <HowItWorks />
            <Documentation />
            <Footer />
          </motion.div>
        ) : (
          <motion.div key="demo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DemoPage onBack={() => setPage("landing")} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
