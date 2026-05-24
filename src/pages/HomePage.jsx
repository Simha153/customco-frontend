import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react'

// ── Design tokens ──────────────────────────────────────────
const T = {
  ink950: '#0d0e10', ink900: '#161719', ink700: '#3a3d43',
  ink500: '#7c818b', ink400: '#a1a6b0', ink200: '#dee1e6',
  paper:  '#f6f1e7', paperWarm: '#efe7d6', paperDeep: '#e7dcc4',
  coral:  '#f25a37', coral600: '#d9421f',
  sage:   '#5e7d5b', sage700: '#3f5a3d',
  surface: '#fffaf0',
  fontDisplay: "'Archivo Black', 'Archivo', Georgia, serif",
  fontSans:    "'Inter', 'Archivo', sans-serif",
  fontMono:    "'JetBrains Mono', monospace",
}

// ── Trend slides data ────────────────────────────────────────
const TRENDS = [
  { id:'streetwear', eyebrow:'Drop 04 · Top of the week', title:'Streetwear',
    headline:'Heavyweight\nstreet basics.', sub:'Oversized fits, 220 GSM cotton, screen-print ready. Built to print, made to outlast the season.',
    bg:'#0d0e10', fg:'#f6f1e7', accent:'#f25a37', tagline:'TEES · HOODIES', priceFrom:399, priceLabel:'Tees from',
    image:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&auto=format&fit=crop&q=80', credit:'Hoodie · Bengaluru workshop' },
  { id:'genz', eyebrow:'Trending · For the timeline', title:'Gen Z',
    headline:'Made for\nthe feed.', sub:'Washed colors, chunky monograms, ringer tees. Drops you\'ll see all over your campus group chat.',
    bg:'#f25a37', fg:'#fffaf0', accent:'#0d0e10', tagline:'TEES · CAPS', priceFrom:349, priceLabel:'Starting at',
    image:'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80', credit:'Print tee · Y2K palette' },
  { id:'athleisure', eyebrow:'Move · Performance', title:'Athleisure',
    headline:'Sweat. Print.\nRepeat.', sub:'Quick-dry polyester mesh. Sublimation-ready jerseys. Tournament-grade kit for every game-week.',
    bg:'#efe7d6', fg:'#0d0e10', accent:'#3f5a3d', tagline:'JERSEYS · POLOS', priceFrom:549, priceLabel:'Jerseys from',
    image:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&auto=format&fit=crop&q=80', credit:'Performance kit · sublimation' },
  { id:'workwear', eyebrow:'Heritage', title:'Workwear',
    headline:'Built to\nlast a decade.', sub:'Canvas, twill, made-to-last basics in earth tones. The kind of clothes you forget you\'re wearing.',
    bg:'#3f5a3d', fg:'#f6f1e7', accent:'#f25a37', tagline:'POLOS · BAGS', priceFrom:699, priceLabel:'Polos from',
    image:'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&auto=format&fit=crop&q=80', credit:'Heritage canvas · earth tones' },
  { id:'corporate', eyebrow:'For teams · B2B', title:'Corporate',
    headline:'Uniforms,\nat scale.', sub:'Embroidered polos, name-tagged shirts, branded caps. Onboarding 5,000 employees? We\'re ready.',
    bg:'#fffaf0', fg:'#0d0e10', accent:'#3f5a3d', tagline:'POLOS · UNIFORMS', priceFrom:null, priceLabel:'Quote in 2 hours',
    image:'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=900&auto=format&fit=crop&q=80', credit:'Branded polos · embroidered' },
]

const CATEGORIES = [
  { slug:'tshirt',  name:'T-Shirts',  count:24, bg:'#0d0e10' },
  { slug:'hoodie',  name:'Hoodies',   count:18, bg:'#3f5a3d' },
  { slug:'polo',    name:'Polos',     count:16, bg:'#f25a37' },
  { slug:'jersey',  name:'Jerseys',   count:12, bg:'#0d0e10' },
  { slug:'cap',     name:'Caps',      count:8,  bg:'#efe7d6' },
  { slug:'bag',     name:'Bags',      count:10, bg:'#3a3d43' },
]

// ── Trends carousel ──────────────────────────────────────────
function TrendsBar({ onNavigate }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const t = TRENDS[active]
  const go = (i) => setActive(((i % TRENDS.length) + TRENDS.length) % TRENDS.length)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive(a => (a + 1) % TRENDS.length), 5500)
    return () => clearInterval(id)
  }, [paused])

  const darkBg = t.bg === '#0d0e10' || t.bg === '#3f5a3d' || t.bg === '#f25a37'

  return (
    <section style={{ padding:'20px 0 8px', background:T.paper }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <style>{`
        @keyframes slide-up { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        .slide-anim { animation: slide-up 480ms cubic-bezier(.2,.7,.2,1) both }
        @media(max-width:768px){
          .trends-slide { grid-template-columns:1fr!important }
          .trends-thumb-rail { display:none!important }
          .trends-copy { padding:16px!important }
          .trends-stage { min-height:260px!important }
        }
      `}</style>

      {/* Header row */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:14 }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
          <span style={{ color:T.coral, fontWeight:900, fontSize:14 }}>✛</span>
          <span style={{ fontFamily:T.fontMono, fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:T.ink500 }}>Trending this week</span>
          <span style={{ fontFamily:T.fontMono, fontSize:10, color:T.ink400 }}>· {TRENDS.length} collections</span>
        </div>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          <span style={{ fontFamily:T.fontMono, fontSize:11, color:T.ink400 }}>{String(active+1).padStart(2,'0')} / {String(TRENDS.length).padStart(2,'0')}</span>
          <button onClick={() => go(active-1)} style={{ background:T.surface, border:`1.5px solid ${T.ink200}`, borderRadius:999, width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><ChevronLeft size={16}/></button>
          <button onClick={() => go(active+1)} style={{ background:T.surface, border:`1.5px solid ${T.ink200}`, borderRadius:999, width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><ChevronRight size={16}/></button>
        </div>
      </div>

      {/* Big slide + thumb rail */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 156px', gap:12, alignItems:'stretch' }}>
          {/* Big slide */}
          <div key={t.id} className="slide-anim"
            style={{ background:t.bg, color:t.fg, borderRadius:16, padding:20, minHeight:420,
              display:'grid', gridTemplateColumns:'1fr 1fr', gap:20,
              border:`1.5px solid ${t.bg === T.surface ? T.ink200 : 'transparent'}` }}>

            {/* Left — copy */}
            <div className="trends-copy" style={{ padding:'16px 6px 16px 16px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                  <span style={{ fontFamily:T.fontSans, fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', opacity:0.75 }}>{t.eyebrow}</span>
                  <span style={{ background:t.accent, color:'#fffaf0', fontFamily:T.fontSans, fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:999, letterSpacing:'0.08em', display:'flex', alignItems:'center', gap:5 }}>
                    <span style={{ width:5, height:5, borderRadius:999, background:'currentColor', animation:'pulse-dot 1.6s infinite' }}/>LIVE
                  </span>
                </div>
                <h2 style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:'clamp(40px,5vw,68px)', letterSpacing:'-0.03em', lineHeight:0.92, margin:'0 0 4px' }}>
                  {t.headline.split('\n').map((line,i,arr) => (
                    <span key={i} style={{ display:'block' }}>{i===arr.length-1 ? <>{line}<span style={{ color:t.accent }}>.</span></> : line}</span>
                  ))}
                </h2>
                <p style={{ fontFamily:T.fontSans, fontSize:14, lineHeight:1.5, opacity:0.8, margin:'16px 0 0', maxWidth:360 }}>{t.sub}</p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:14, marginTop:20 }}>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                  <Link to="/products" style={{ fontFamily:T.fontSans, fontWeight:700, fontSize:14, background:darkBg?'#fffaf0':T.ink950, color:darkBg?T.ink950:'#fffaf0', padding:'12px 22px', borderRadius:8, textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
                    Shop {t.title.toLowerCase()} <ArrowRight size={14}/>
                  </Link>
                  <Link to="/quote" style={{ fontFamily:T.fontSans, fontWeight:600, fontSize:14, background:'transparent', border:`1.5px solid ${darkBg?'rgba(246,241,231,0.35)':T.ink200}`, color:t.fg, padding:'12px 20px', borderRadius:8, textDecoration:'none' }}>
                    Bulk & teams
                  </Link>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:12, fontFamily:T.fontMono, fontSize:10, letterSpacing:'0.12em', opacity:0.6 }}>
                  <span>{t.tagline}</span>
                  <span style={{ width:3, height:3, borderRadius:999, background:'currentColor' }}/>
                  <span>SHIPS IN 7 DAYS</span>
                </div>
              </div>
            </div>

            {/* Right — image */}
            <div className="trends-stage" style={{ position:'relative', borderRadius:12, overflow:'hidden', minHeight:340 }}>
              <img src={t.image} alt={t.credit} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
                onError={e => { e.target.style.display='none'; e.target.parentNode.style.background=t.bg==='#0d0e10'?'#1a1c20':'#c5d2c2' }}/>
              <div style={{ position:'absolute', inset:0, background:`linear-gradient(135deg, ${t.bg}40 0%, transparent 40%, ${t.bg}55 100%)`, mixBlendMode:'multiply' }}/>
              {/* Price chip */}
              {t.priceFrom ? (
                <div style={{ position:'absolute', bottom:20, left:20, background:t.accent, color:'#fffaf0', borderRadius:10, padding:'10px 14px', border:`2px solid ${t.fg}`, boxShadow:`3px 3px 0 ${t.fg}` }}>
                  <span style={{ fontFamily:T.fontSans, fontSize:10, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', opacity:0.85, display:'block' }}>{t.priceLabel}</span>
                  <span style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:28, letterSpacing:'-0.02em', lineHeight:1.05 }}>₹{t.priceFrom}</span>
                </div>
              ) : (
                <div style={{ position:'absolute', bottom:20, left:20, background:t.accent, color:'#fffaf0', borderRadius:10, padding:'10px 14px', border:`2px solid ${t.fg}`, boxShadow:`3px 3px 0 ${t.fg}` }}>
                  <span style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:16, lineHeight:1.1 }}>{t.priceLabel}</span>
                </div>
              )}
              {/* Credit */}
              <div style={{ position:'absolute', bottom:14, right:14, fontFamily:T.fontMono, fontSize:10, letterSpacing:'0.08em', color:darkBg?'rgba(246,241,231,0.7)':'rgba(13,14,16,0.55)', textTransform:'uppercase' }}>{t.credit}</div>
              {/* Reg stamp */}
              <div style={{ position:'absolute', top:16, right:16, fontFamily:T.fontMono, fontSize:10, fontWeight:600, letterSpacing:'0.12em', color:darkBg?'#f6f1e7':'#0d0e10', background:darkBg?'rgba(13,14,16,0.5)':'rgba(246,241,231,0.85)', backdropFilter:'blur(8px)', padding:'4px 10px', borderRadius:999, display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ color:t.accent }}>✛</span> CC · {t.id.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Thumb rail */}
          <div className="trends-thumb-rail" style={{ display:'flex', flexDirection:'column', gap:8, maxHeight:420, overflow:'hidden' }}>
            {TRENDS.map((tt,i) => (
              <button key={tt.id} onClick={() => go(i)}
                style={{ flex:1, minHeight:0, border:`1.5px solid ${i===active?T.ink950:T.ink200}`, borderRadius:8, cursor:'pointer', position:'relative', overflow:'hidden', background:tt.bg, boxShadow:i===active?`3px 3px 0 ${T.ink950}`:'none', transform:i===active?'translate(-1px,-1px)':'none', transition:'all 200ms' }}>
                <img src={tt.image} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}/>
                <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, ${tt.bg}55 0%, ${tt.bg}cc 100%)` }}/>
                <div style={{ position:'relative', padding:'8px 10px', display:'flex', flexDirection:'column', height:'100%', justifyContent:'space-between' }}>
                  <span style={{ fontFamily:T.fontMono, fontSize:9, fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:tt.fg, opacity:0.85 }}>{String(i+1).padStart(2,'0')}</span>
                  <span style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:13, letterSpacing:'-0.01em', color:tt.fg, textShadow:'0 1px 2px rgba(0,0,0,0.25)' }}>{tt.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ maxWidth:1280, margin:'10px auto 0', padding:'0 24px', display:'flex', gap:6, alignItems:'center' }}>
        {TRENDS.map((tt,i) => (
          <button key={tt.id} onClick={() => go(i)} style={{ background:'transparent', border:'none', cursor:'pointer', padding:0, flex:i===active?3:1, transition:'flex 320ms' }}>
            <span style={{ display:'block', height:3, borderRadius:999, background:i===active?T.coral:T.ink200, transition:'background 320ms' }}/>
          </button>
        ))}
        <span style={{ fontFamily:T.fontMono, fontSize:10, color:T.ink400, letterSpacing:'0.06em', marginLeft:8 }}>{paused?'PAUSED':'AUTOPLAY'}</span>
      </div>
    </section>
  )
}

// ── Main Hero ─────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{ padding:'24px', background:T.paper }}>
      <style>{`
        .hero-grid { display:grid; grid-template-columns:1.55fr 1fr; gap:20px; max-width:1280px; margin:0 auto }
        .hero-right { display:grid; grid-template-rows:1.1fr 1fr; gap:20px }
        @media(max-width:860px){
          .hero-grid { grid-template-columns:1fr!important }
          .hero-main { min-height:460px!important }
          .hero-right { grid-template-rows:300px 200px!important }
        }
      `}</style>
      <div className="hero-grid">
        {/* Left — big photo + stamp */}
        <div className="hero-main" style={{ position:'relative', overflow:'hidden', borderRadius:16, minHeight:520, background:T.ink950 }}>
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&auto=format&fit=crop&q=85"
            alt="Drop 04" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%' }}
            onError={e => { e.target.style.display='none' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(13,14,16,0) 50%, rgba(13,14,16,0.6) 100%)', pointerEvents:'none' }}/>
          {/* Top chip */}
          <div style={{ position:'absolute', top:20, left:20, display:'inline-flex', alignItems:'center', gap:8, background:'#fffaf0', color:T.ink950, padding:'6px 12px', borderRadius:999, fontFamily:T.fontSans, fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase' }}>
            <span style={{ color:T.coral }}>✛</span> Drop 04 · Out now
          </div>
          {/* Bottom stamp */}
          <div style={{ position:'absolute', left:20, right:20, bottom:20, background:T.ink950, color:'#f6f1e7', borderRadius:12, padding:'22px 24px 20px', maxWidth:520, boxShadow:`4px 4px 0 ${T.coral}`, border:`2px solid ${T.ink950}` }}>
            <h1 style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:'clamp(32px,4vw,52px)', letterSpacing:'-0.03em', lineHeight:0.95, margin:'0 0 8px' }}>
              Wear something<br/><span style={{ color:T.coral }}>you made.</span>
            </h1>
            <p style={{ fontFamily:T.fontSans, fontSize:14, color:'rgba(246,241,231,0.78)', lineHeight:1.45, margin:'0 0 16px', maxWidth:440 }}>
              Custom-printed tees, hoodies and merch — designed by you, shipped in 7 days.
            </p>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <Link to="/products" style={{ fontFamily:T.fontSans, fontWeight:700, fontSize:14, background:'#fffaf0', color:T.ink950, padding:'12px 22px', borderRadius:8, textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
                Shop drop 04 <ArrowRight size={14}/>
              </Link>
              <Link to="/quote" style={{ fontFamily:T.fontSans, fontWeight:600, fontSize:14, background:'transparent', border:'1.5px solid rgba(246,241,231,0.25)', color:'#f6f1e7', padding:'12px 20px', borderRadius:8, textDecoration:'none' }}>
                Bulk & teams
              </Link>
            </div>
          </div>
          <div style={{ position:'absolute', bottom:14, right:16, fontFamily:T.fontMono, fontSize:10, letterSpacing:'0.08em', color:'rgba(246,241,231,0.55)', textTransform:'uppercase' }}>Printed tee · workshop floor</div>
        </div>

        {/* Right stacked */}
        <div className="hero-right">
          {/* Hoodie photo */}
          <div style={{ position:'relative', overflow:'hidden', borderRadius:16, background:T.paperWarm }}>
            <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&auto=format&fit=crop&q=85"
              alt="Hoodie" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
              onError={e => { e.target.style.display='none' }}/>
            <div style={{ position:'absolute', top:16, left:16, display:'inline-flex', alignItems:'center', gap:6, background:T.ink950, color:'#fffaf0', padding:'5px 10px', borderRadius:999, fontFamily:T.fontSans, fontSize:10, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase' }}>Heavyweight · 320 GSM</div>
            <div style={{ position:'absolute', bottom:14, left:16, right:16, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
              <span style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:24, color:'#fffaf0', letterSpacing:'-0.02em', lineHeight:1, textShadow:'0 2px 8px rgba(0,0,0,0.4)' }}>
                Hoodies<br/><span style={{ color:T.coral }}>that last.</span>
              </span>
              <Link to="/products" style={{ background:'#fffaf0', color:T.ink950, width:40, height:40, borderRadius:999, display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none' }}>
                <ArrowRight size={18}/>
              </Link>
            </div>
          </div>
          {/* Coral B2B band */}
          <div style={{ background:T.coral, color:'#fffaf0', borderRadius:16, padding:'24px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
            <div>
              <span style={{ fontFamily:T.fontMono, fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,250,240,0.75)' }}>Bulk · Corporate</span>
              <h2 style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:28, letterSpacing:'-0.02em', lineHeight:1, margin:'10px 0 0' }}>Built to order.<br/>Shipped to your office.</h2>
            </div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginTop:16, flexWrap:'wrap' }}>
              <span style={{ fontFamily:T.fontMono, fontSize:11, letterSpacing:'0.08em', opacity:0.9 }}>MOQ 10 · QUOTE IN 2 HRS</span>
              <Link to="/quote" style={{ fontFamily:T.fontSans, fontWeight:700, fontSize:13, background:'#fffaf0', color:T.coral, padding:'10px 18px', borderRadius:8, textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
                Request a quote <ArrowRight size={13}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Category rail ─────────────────────────────────────────────
function CategoryRail() {
  return (
    <section style={{ padding:'32px 24px', background:T.paper }}>
      <style>{`
        .cat-rail { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; max-width:1280px; margin:0 auto }
        @media(max-width:768px){ .cat-rail { grid-template-columns:repeat(3,1fr)!important } }
        @media(max-width:480px){ .cat-rail { grid-template-columns:repeat(2,1fr)!important } }
      `}</style>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:20 }}>
          <h2 style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:28, letterSpacing:'-0.015em', margin:0 }}>Shop the category.</h2>
          <Link to="/products" style={{ fontFamily:T.fontSans, fontWeight:600, fontSize:14, color:T.coral, textDecoration:'none' }}>All categories →</Link>
        </div>
        <div className="cat-rail">
          {CATEGORIES.map(c => (
            <Link key={c.slug} to={`/products?category=${c.name}`}
              style={{ background:T.surface, border:`1.5px solid ${T.ink200}`, borderRadius:10, padding:'20px 14px', textDecoration:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:10, color:T.ink950, transition:'all 120ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=T.ink950; e.currentTarget.style.boxShadow=`3px 3px 0 ${T.ink950}` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=T.ink200; e.currentTarget.style.boxShadow='none' }}>
              <div style={{ width:52, height:52, borderRadius:8, background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>
                {['👔','🧥','👕','⚡','🧢','👜'][CATEGORIES.indexOf(c)]}
              </div>
              <span style={{ fontFamily:T.fontSans, fontWeight:600, fontSize:14, color:T.ink950 }}>{c.name}</span>
              <span style={{ fontFamily:T.fontMono, fontSize:11, color:T.ink500 }}>{c.count} styles</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── How it works ──────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n:'01', h:'Pick a blank', b:'Tee, hoodie, polo, cap, bag or jersey. We\'ll suggest fabric and fit.' },
    { n:'02', h:'Add your design', b:'Upload art or work with our in-house designer. Free unless it\'s complex.' },
    { n:'03', h:'Approve a mock', b:'We send a digital proof within 2 hours. One round of changes is free.' },
    { n:'04', h:'Ship in 7 days', b:'Bengaluru workshop. Door-to-door across India. WhatsApp updates included.' },
  ]
  return (
    <section style={{ padding:'48px 24px', background:T.paper }}>
      <style>{`
        .how-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:32px; background:${T.paperWarm}; border-radius:16px; padding:48px; max-width:1280px; margin:0 auto }
        @media(max-width:768px){ .how-grid { grid-template-columns:1fr 1fr!important; padding:32px 20px!important } }
        @media(max-width:480px){ .how-grid { grid-template-columns:1fr!important } }
      `}</style>
      <div className="how-grid">
        {steps.map(s => (
          <div key={s.n}>
            <span style={{ fontFamily:T.fontMono, fontSize:12, color:T.coral, fontWeight:600, letterSpacing:'0.08em' }}>{s.n}</span>
            <h3 style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:22, letterSpacing:'-0.01em', margin:'6px 0 8px', color:T.ink950 }}>{s.h}</h3>
            <p style={{ fontFamily:T.fontSans, fontSize:14, color:T.ink700, lineHeight:1.5, margin:0 }}>{s.b}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Nav ────────────────────────────────────────────────────────
function TopNav() {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <style>{`
        .cc-nav { position:fixed; top:0; left:0; right:0; height:56px; background:${T.surface}; border-bottom:1.5px solid ${T.ink200}; display:flex; align-items:center; justify-content:space-between; padding:0 32px; z-index:100 }
        .cc-nav-links { display:flex; gap:28px }
        .cc-nav-auth { display:flex; gap:12px; align-items:center }
        .cc-hamburger { display:none!important }
        .cc-mobile-menu { display:none }
        @media(max-width:768px){
          .cc-nav { padding:0 16px!important }
          .cc-nav-links { display:none!important }
          .cc-nav-auth .cc-login { display:none!important }
          .cc-hamburger { display:flex!important }
          .cc-mobile-menu { display:flex }
        }
      `}</style>
      <nav className="cc-nav">
        <div style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:20, letterSpacing:'-0.02em', color:T.ink950 }}>
          Custom<em style={{ fontStyle:'italic', color:T.coral }}>.Co</em>
        </div>
        <div className="cc-nav-links">
          {[['Products','/products'],['Collections','#'],['Get Quote','/quote'],['About','#']].map(([l,to]) => (
            <Link key={l} to={to} style={{ fontFamily:T.fontSans, fontSize:13, fontWeight:500, color:T.ink500, textDecoration:'none', letterSpacing:'0.01em' }}
              onMouseEnter={e => e.target.style.color=T.ink950} onMouseLeave={e => e.target.style.color=T.ink500}>{l}</Link>
          ))}
        </div>
        <div className="cc-nav-auth">
          <Link to="/login" className="cc-login" style={{ fontFamily:T.fontSans, fontSize:13, fontWeight:500, color:T.ink700, textDecoration:'none' }}>Login</Link>
          <Link to="/register" style={{ fontFamily:T.fontSans, fontSize:13, fontWeight:700, background:T.ink950, color:'#fffaf0', padding:'8px 18px', borderRadius:8, textDecoration:'none' }}>Register</Link>
          <button className="cc-hamburger" onClick={() => setOpen(true)}
            style={{ background:'transparent', border:'none', cursor:'pointer', padding:4, display:'flex', alignItems:'center' }}>
            <Menu size={22}/>
          </button>
        </div>
      </nav>

      {open && (
        <div className="cc-mobile-menu" style={{ position:'fixed', inset:0, background:T.surface, zIndex:200, flexDirection:'column', padding:'20px 16px', overflowY:'auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:40 }}>
            <div style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:20, color:T.ink950 }}>Custom<em style={{ fontStyle:'italic', color:T.coral }}>.Co</em></div>
            <button onClick={() => setOpen(false)} style={{ background:'transparent', border:'none', cursor:'pointer' }}><X size={22}/></button>
          </div>
          {[['Products','/products'],['Collections','#'],['Get Quote','/quote'],['About','#']].map(([l,to]) => (
            <Link key={l} to={to} onClick={() => setOpen(false)}
              style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:28, color:T.ink950, textDecoration:'none', padding:'14px 0', borderBottom:`1px solid ${T.ink200}`, display:'block', letterSpacing:'-0.01em' }}>
              {l}
            </Link>
          ))}
          <div style={{ marginTop:32, display:'flex', flexDirection:'column', gap:10 }}>
            <Link to="/login" onClick={() => setOpen(false)} style={{ fontFamily:T.fontSans, fontWeight:600, fontSize:14, color:T.ink950, textDecoration:'none', padding:'13px', border:`1.5px solid ${T.ink200}`, borderRadius:8, textAlign:'center' }}>Login</Link>
            <Link to="/register" onClick={() => setOpen(false)} style={{ fontFamily:T.fontSans, fontWeight:700, fontSize:14, background:T.ink950, color:'#fffaf0', padding:'13px', borderRadius:8, textDecoration:'none', textAlign:'center' }}>Register</Link>
          </div>
        </div>
      )}
    </>
  )
}

// ── Page ───────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ background:T.paper, paddingTop:56 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Archivo+Black&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      `}</style>

      <TopNav/>
      <TrendsBar/>
      <HeroSection/>
      <CategoryRail/>
      <HowItWorks/>

      {/* Footer */}
      <footer style={{ background:T.ink950, padding:'28px 32px', borderTop:`1px solid rgba(255,255,255,0.06)` }}>
        <style>{`
          .cc-footer { display:flex; justify-content:space-between; align-items:center; max-width:1280px; margin:0 auto }
          .cc-footer-links { display:flex; gap:24px }
          @media(max-width:640px){ .cc-footer { flex-direction:column!important; gap:16px!important; text-align:center } .cc-footer-links { flex-wrap:wrap!important; justify-content:center!important } }
        `}</style>
        <div className="cc-footer">
          <div style={{ fontFamily:T.fontDisplay, fontWeight:900, fontSize:18, color:'#f6f1e7' }}>Custom<em style={{ fontStyle:'italic', color:T.coral }}>.Co</em></div>
          <div className="cc-footer-links">
            {['Products','Quote','About','Contact'].map(l => (
              <span key={l} style={{ fontFamily:T.fontMono, fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:T.ink500, cursor:'pointer' }}>{l}</span>
            ))}
          </div>
          <div style={{ fontFamily:T.fontMono, fontSize:11, color:T.ink700 }}>© 2026 Custom.Co</div>
        </div>
      </footer>
    </div>
  )
}
