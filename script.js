/* BRAND: Emerald on Slate */
:root{
  --bg:#0B1220; --panel:#0F172A; --line:#1b2535;
  --text:#E6ECF5; --muted:#90A1BA;
  --primary:#22C55E; --primary-ink:#052E1B; --ring:#34D399;
  --glass: rgba(255,255,255,.04);
}

*{box-sizing:border-box}
html,body{margin:0}
body{
  background: radial-gradient(1200px 600px at 10% -10%, #0f1c3c 0%, transparent 60%),
              radial-gradient(1200px 600px at 100% 10%, #092232 0%, transparent 60%),
              var(--bg);
  color:var(--text);
  font:16px/1.6 Inter,system-ui,Segoe UI,Arial,sans-serif;
  overflow-x:hidden;
}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}

.wrap{max-width:1200px;margin:0 auto;padding:20px}
.skip{position:absolute;left:-9999px}
.skip:focus{left:12px;top:12px;background:#111;padding:8px 10px;border-radius:8px}

/* Header */
.site-header{position:sticky;top:0;z-index:50;background:rgba(11,18,32,.6);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;justify-content:space-between;gap:14px}
.brand{display:flex;align-items:center;gap:10px;font-weight:800;color:var(--text)}
.logo{display:inline-grid;place-items:center}
.wordmark{font-family:"Playfair Display",serif;letter-spacing:.3px}
.menu{display:flex;align-items:center;gap:18px}
.btn{display:inline-block;padding:10px 16px;border-radius:999px;background:var(--primary);color:var(--primary-ink);font-weight:700;border:1px solid #10b981;transition:.2s}
.btn:hover{transform:translateY(-1px)}
.ghost{padding:9px 14px;border-radius:999px;border:1px solid var(--line);opacity:.9}
.ghost:hover{opacity:1}
.icon-btn{border:1px solid var(--line);background:transparent;border-radius:12px;padding:8px 10px;cursor:pointer}

.hamburger{display:none;flex-direction:column;gap:4px;border:1px solid var(--line);background:transparent;border-radius:10px;padding:8px}
.hamburger span{width:22px;height:2px;background:var(--text)}
.mobile-nav{display:flex;flex-direction:column;gap:10px;padding:10px 20px;border-bottom:1px solid var(--line);background:var(--panel)}

/* Hero */
.hero{position:relative;min-height:84svh;display:grid;place-items:center;border-bottom:1px solid var(--line)}
#hero-canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.hero-content{position:relative;z-index:2;text-align:center;max-width:900px}
.headline{font-family:"Playfair Display",serif;font-size:clamp(34px,6vw,74px);line-height:1.05;margin:0}
.headline em{font-style:italic;background:linear-gradient(90deg,#22c55e 0%,#0ea5e9 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{color:var(--muted);max-width:720px;margin:14px auto 0}
.cred{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin:12px 0 0;color:var(--muted);font-size:14px}
.cta{display:flex;gap:12px;justify-content:center;margin-top:16px}
.scroll-indicator{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);opacity:.6;border:1px solid var(--line);padding:6px 10px;border-radius:999px;font-size:12px;letter-spacing:.2em;text-transform:uppercase}

/* Sections */
.highlights{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:-48px;position:relative;z-index:3}
.card{background:var(--glass);border:1px solid var(--line);border-radius:20px;padding:18px;box-shadow:0 8px 40px rgba(0,0,0,.18)}
.section{padding:56px 0}
.section-head{margin-bottom:12px}
.section h2{font-size:clamp(22px,3vw,32px);margin:0}
.muted{color:var(--muted)}
.small{font-size:14px}
.list{margin:0;padding-left:18px}

/* Projects grid */
.grid.projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px}
.proj .thumb{height:180px;border-radius:16px;margin:6px;background:radial-gradient(200px 100px at 80% 0%, rgba(34,197,94,.2), transparent), center/cover no-repeat var(--img)}
.proj .info{padding:8px 12px 12px}
.links{display:flex;gap:10px;margin-top:8px}

/* Studio + Contact */
.studio{display:grid;gap:12px}
.badges{display:flex;gap:8px;flex-wrap:wrap}
.badges span{font-size:12px;border:1px solid var(--line);padding:6px 10px;border-radius:999px;opacity:.9}

.contact{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;align-items:end}
.contact label{display:grid;gap:6px}
.contact input,.contact textarea{
  padding:12px;border-radius:12px;border:1px solid var(--line);background:#0b1220;color:var(--text)
}
.contact .full{grid-column:1/-1}

/* Footer */
.site-footer{padding:30px 20px;border-top:1px solid var(--line);color:var(--muted);text-align:center}

/* Reveal animation */
.reveal{opacity:0;transform:translateY(12px);transition:opacity .6s ease,transform .6s ease}
.reveal.visible{opacity:1;transform:none}

/* Light mode */
:root.light{
  --bg:#ffffff; --panel:#f9fafb; --line:#e5e7eb; --text:#0b1220; --muted:#475569;
  --glass: rgba(0,0,0,.02);
}
:root.light .contact input, :root.light .contact textarea{background:#fff}

/* Responsive */
@media (max-width:860px){
  .menu{display:none}
  .hamburger{display:flex}
}
