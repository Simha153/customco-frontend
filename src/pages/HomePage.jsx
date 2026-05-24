import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Menu, X, Search, ShoppingBag, Heart } from 'lucide-react'

const IMAGES = {
  hero1: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80&fit=crop',
  hero2: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80&fit=crop',
  cat1:  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80&fit=crop',
  cat2:  'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=600&q=80&fit=crop',
  cat3:  'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&q=80&fit=crop',
  cat4:  'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=600&q=80&fit=crop',
  feature: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&fit=crop',
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{fontFamily:"'Georgia',serif", background:'#fff', color:'#1A1A18'}}>
      <style>{`
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hn-nav { display:flex; align-items:center; justify-content:space-between; padding:0 40px; height:60px; border-bottom:1px solid rgba(0,0,0,0.08); position:fixed; top:0; left:0; right:0; background:#fff; z-index:100; }
        .hn-links { display:flex; gap:32px; }
        .hn-icons { display:flex; gap:16px; align-items:center; }
        .hn-hamburger { display:none!important; }
        .hn-mobile-menu { display:none; }

        .hn-hero { display:grid; grid-template-columns:1fr 1fr; height:calc(100vh - 60px); margin-top:60px; }
        .hn-hero-text { display:flex; flex-direction:column; justify-content:flex-end; padding:48px 40px; background:#F5F0E8; }
        .hn-hero-img { position:relative; overflow:hidden; }

        .hn-cats { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; }
        .hn-cat-img { height:320px; object-fit:cover; width:100%; display:block; }

        .hn-feature { display:grid; grid-template-columns:1fr 1fr; gap:0; }
        .hn-feature-img { height:560px; object-fit:cover; width:100%; display:block; }
        .hn-feature-text { display:flex; flex-direction:column; justify-content:center; padding:64px 48px; background:#1A1A18; }

        .hn-stats { display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid rgba(0,0,0,0.08); }
        .hn-stat { padding:40px 32px; border-right:1px solid rgba(0,0,0,0.08); }

        .hn-cta { display:grid; grid-template-columns:1fr 1fr; }

        .hn-footer { padding:28px 40px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(0,0,0,0.08); }
        .hn-footer-links { display:flex; gap:24px; }

        @media(max-width:768px) {
          .hn-nav { padding:0 16px; }
          .hn-links { display:none!important; }
          .hn-hamburger { display:flex!important; }
          .hn-mobile-menu { display:flex; flex-direction:column; position:fixed; inset:0; background:#fff; z-index:200; padding:20px 16px; overflow-y:auto; }

          .hn-hero { grid-template-columns:1fr!important; height:auto!important; margin-top:60px; }
          .hn-hero-img { height:400px; }
          .hn-hero-text { padding:32px 16px!important; }
          .hn-hero-title { font-size:40px!important; }
          .hn-hero-btns { flex-direction:column!important; gap:10px!important; }
          .hn-hero-btns a { width:100%!important; justify-content:center!important; }

          .hn-cats { grid-template-columns:1fr 1fr!important; }
          .hn-cat-img { height:200px!important; }

          .hn-feature { grid-template-columns:1fr!important; }
          .hn-feature-img { height:280px!important; }
          .hn-feature-text { padding:32px 16px!important; }

          .hn-stats { grid-template-columns:1fr 1fr!important; }
          .hn-stat { padding:24px 16px!important; border-bottom:1px solid rgba(0,0,0,0.08); }

          .hn-cta { grid-template-columns:1fr!important; }
          .hn-cta-pad { padding:40px 16px!important; }

          .hn-footer { flex-direction:column!important; gap:16px!important; text-align:center!important; padding:24px 16px!important; }
          .hn-footer-links { flex-wrap:wrap!important; justify-content:center!important; gap:16px!important; }
          .hn-section-pad { padding:40px 16px!important; }
          .hn-marquee-text { font-size:9px!important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="hn-nav">
        <div style={{fontSize:'20px', letterSpacing:'-0.3px', fontWeight:700}}>
          Custom<em style={{fontStyle:'italic', color:'#C8372D'}}>.Co</em>
        </div>

        {/* Desktop links */}
        <div className="hn-links">
          {[['Products','/products'],['Collections','#'],['Get Quote','/quote'],['About','#']].map(([l,to]) => (
            <Link key={l} to={to} style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#8C8C88', textDecoration:'none'}}>
              {l}
            </Link>
          ))}
        </div>

        {/* Icons + auth */}
        <div className="hn-icons">
          <Link to="/login" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#1A1A18', textDecoration:'none', display:'none'}}>Login</Link>
          <Link to="/login" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#8C8C88', textDecoration:'none'}}>Login</Link>
          <Link to="/register" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', background:'#1A1A18', color:'#fff', padding:'8px 18px', textDecoration:'none', fontWeight:700}}>Register</Link>
          <button className="hn-hamburger" onClick={() => setMenuOpen(true)}
            style={{background:'transparent', border:'none', cursor:'pointer', color:'#1A1A18', padding:'4px', display:'flex', alignItems:'center'}}>
            <Menu size={22}/>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="hn-mobile-menu">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px'}}>
            <div style={{fontSize:'20px', fontWeight:700}}>Custom<em style={{fontStyle:'italic', color:'#C8372D'}}>.Co</em></div>
            <button onClick={() => setMenuOpen(false)} style={{background:'transparent', border:'none', cursor:'pointer', padding:'4px'}}>
              <X size={22}/>
            </button>
          </div>
          {[['Products','/products'],['Collections','#'],['Get Quote','/quote'],['About','#']].map(([l,to]) => (
            <Link key={l} to={to} onClick={() => setMenuOpen(false)}
              style={{fontFamily:'sans-serif', fontSize:'12px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#1A1A18', textDecoration:'none', padding:'16px 0', borderBottom:'1px solid rgba(0,0,0,0.06)', display:'block'}}>
              {l}
            </Link>
          ))}
          <div style={{marginTop:'32px', display:'flex', flexDirection:'column', gap:'10px'}}>
            <Link to="/login" onClick={() => setMenuOpen(false)}
              style={{fontFamily:'sans-serif', fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#1A1A18', textDecoration:'none', padding:'13px', border:'1px solid rgba(0,0,0,0.15)', textAlign:'center'}}>
              Login
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}
              style={{fontFamily:'sans-serif', fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase', background:'#1A1A18', color:'#fff', padding:'13px', textDecoration:'none', fontWeight:700, textAlign:'center'}}>
              Register
            </Link>
          </div>
        </div>
      )}

      {/* HERO */}
      <div className="hn-hero">
        {/* Left — text */}
        <div className="hn-hero-text">
          <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.35em', textTransform:'uppercase', color:'#C8372D', marginBottom:'20px'}}>B2B Clothing Platform · Est. 2024</p>
          <h1 className="hn-hero-title" style={{fontSize:'clamp(40px,5vw,72px)', lineHeight:'0.92', fontWeight:400, color:'#1A1A18', marginBottom:'28px'}}>
            Wear your<br/>
            <em style={{color:'#C8372D'}}>story,</em><br/>
            build your<br/>
            brand.
          </h1>
          <p style={{fontFamily:'sans-serif', fontSize:'13px', color:'#8C8C88', lineHeight:'1.7', marginBottom:'32px', maxWidth:'320px'}}>
            Premium customized uniforms, workwear and branded apparel — crafted for businesses that refuse to blend in.
          </p>
          <div className="hn-hero-btns" style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
            <Link to="/products" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', background:'#1A1A18', color:'#fff', padding:'14px 32px', fontWeight:700, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'8px'}}>
              Browse Catalog <ArrowRight size={14}/>
            </Link>
            <Link to="/quote" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#1A1A18', border:'1px solid rgba(0,0,0,0.2)', padding:'14px 24px', textDecoration:'none'}}>
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Right — image */}
        <div className="hn-hero-img">
          <img src={IMAGES.hero1} alt="Fashion editorial" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}
            onError={e => { e.target.style.background='#1B3A6B'; e.target.style.display='none'; e.target.parentNode.style.background='#1B3A6B' }}/>
          <div style={{position:'absolute', bottom:'24px', right:'24px', background:'#fff', padding:'12px 18px'}}>
            <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#8C8C88', marginBottom:'2px'}}>Latest Drop</p>
            <p style={{fontSize:'14px', color:'#1A1A18'}}>Corporate Collection '26</p>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div style={{background:'#1A1A18', padding:'12px 0', overflow:'hidden', whiteSpace:'nowrap'}}>
        <div style={{display:'inline-flex', gap:'48px', animation:'marquee 20s linear infinite'}}>
          {['Premium Uniforms','Bulk B2B Orders','Custom Embroidery','Brand Protection','14-Day Delivery','500+ Clients',
            'Premium Uniforms','Bulk B2B Orders','Custom Embroidery','Brand Protection','14-Day Delivery','500+ Clients'].map((t,i) => (
            <span key={i} className="hn-marquee-text" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)'}}>
              {t} {i%2===0 && <span style={{color:'#C8372D', margin:'0 8px'}}>·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="hn-section-pad" style={{padding:'64px 40px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'32px'}}>
          <div>
            <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:'#8C8C88', marginBottom:'8px'}}>Shop by Category</p>
            <h2 style={{fontSize:'32px', fontWeight:400, color:'#1A1A18'}}>What we make</h2>
          </div>
          <Link to="/products" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#1A1A18', textDecoration:'none', display:'flex', alignItems:'center', gap:'6px'}}>
            View all <ArrowRight size={12}/>
          </Link>
        </div>
        <div className="hn-cats">
          {[
            {img:IMAGES.cat1, label:'Jackets'},
            {img:IMAGES.cat2, label:'Polo Shirts'},
            {img:IMAGES.cat3, label:'Hoodies'},
            {img:IMAGES.cat4, label:'Uniforms'},
          ].map((c,i) => (
            <Link key={i} to="/products" style={{textDecoration:'none', position:'relative', overflow:'hidden', display:'block'}}>
              <img className="hn-cat-img" src={c.img} alt={c.label}
                onError={e => { e.target.style.display='none'; e.target.parentNode.style.background=['#1B3A6B','#5C6B3A','#3D2314','#8C8C88'][i]; e.target.parentNode.style.height='320px' }}/>
              <div style={{position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(transparent, rgba(0,0,0,0.6))', padding:'24px 16px'}}>
                <p style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#fff', fontWeight:600}}>{c.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURE BAND */}
      <div className="hn-feature">
        <div className="hn-feature-img" style={{position:'relative', overflow:'hidden'}}>
          <img src={IMAGES.feature} alt="Featured" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}
            onError={e => { e.target.style.display='none'; e.target.parentNode.style.background='#5C6B3A' }}/>
        </div>
        <div className="hn-feature-text">
          <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:'#C8372D', marginBottom:'16px'}}>Our Promise</p>
          <h2 style={{fontSize:'36px', color:'#fff', fontWeight:400, lineHeight:1.1, marginBottom:'20px'}}>
            Built for<br/>businesses<br/><em style={{color:'rgba(255,255,255,0.35)'}}>that mean it.</em>
          </h2>
          <p style={{fontFamily:'sans-serif', fontSize:'13px', color:'rgba(255,255,255,0.5)', lineHeight:'1.8', marginBottom:'32px'}}>
            We don't do generic. Every garment is a statement — precision cut, brand-consistent, and delivered on time.
          </p>
          <Link to="/quote" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', background:'#C8372D', color:'#fff', padding:'13px 28px', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'8px', fontWeight:700, alignSelf:'flex-start'}}>
            Request a Quote <ArrowRight size={13}/>
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="hn-stats">
        {[
          {n:'500+', l:'Business clients'},
          {n:'2M+',  l:'Garments delivered'},
          {n:'14d',  l:'Avg turnaround'},
          {n:'98%',  l:'Client satisfaction'},
        ].map((s,i) => (
          <div key={i} className="hn-stat">
            <div style={{fontSize:'40px', color:'#1A1A18', fontWeight:400, lineHeight:1, marginBottom:'8px'}}>{s.n}</div>
            <div style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#8C8C88'}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="hn-cta">
        <div className="hn-cta-pad" style={{background:'#C8372D', padding:'56px 48px'}}>
          <h2 style={{fontSize:'36px', color:'#fff', fontWeight:400, lineHeight:1.1, marginBottom:'16px'}}>
            Ready to dress<br/>your team?
          </h2>
          <p style={{fontFamily:'sans-serif', fontSize:'13px', color:'rgba(255,255,255,0.7)', marginBottom:'28px', lineHeight:'1.6'}}>
            Tell us what you need — we'll respond within 24 hours with a full quote.
          </p>
          <Link to="/quote" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', background:'#fff', color:'#C8372D', padding:'13px 28px', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'8px', fontWeight:700}}>
            Get a Free Quote <ArrowRight size={13}/>
          </Link>
        </div>
        <div className="hn-cta-pad" style={{background:'#F5F0E8', padding:'56px 48px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:'#8C8C88', marginBottom:'16px'}}>How it works</p>
          {[
            {n:'01', t:'Tell us what you need', d:'Fill out a quick quote form with your requirements.'},
            {n:'02', t:'We send a proposal', d:'Get pricing, timeline and fabric options within 24h.'},
            {n:'03', t:'We deliver on time', d:'Your order arrives within 14 days, guaranteed.'},
          ].map(s => (
            <div key={s.n} style={{display:'flex', gap:'16px', marginBottom:'24px', alignItems:'flex-start'}}>
              <span style={{fontFamily:'sans-serif', fontSize:'11px', color:'#C8372D', fontWeight:700, minWidth:'24px', marginTop:'2px'}}>{s.n}</span>
              <div>
                <p style={{fontSize:'15px', color:'#1A1A18', marginBottom:'4px'}}>{s.t}</p>
                <p style={{fontFamily:'sans-serif', fontSize:'12px', color:'#8C8C88', lineHeight:'1.6'}}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{background:'#1A1A18', borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="hn-footer">
          <div style={{fontSize:'18px', color:'#fff'}}>Custom<em style={{color:'#C8372D'}}>.Co</em></div>
          <div className="hn-footer-links">
            {['Products','Quote','About','Contact'].map(l => (
              <span key={l} style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'#8C8C88', cursor:'pointer'}}>{l}</span>
            ))}
          </div>
          <div style={{fontFamily:'sans-serif', fontSize:'11px', color:'rgba(140,140,136,0.4)'}}>© 2026 Custom.Co</div>
        </div>
      </footer>
    </div>
  )
}
