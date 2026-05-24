import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{fontFamily:"'Georgia',serif", background:'#F5F0E8', color:'#1A1A18'}}>
      <style>{`
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .home-nav-links{display:flex;gap:32px}
        .home-nav-auth{display:flex;gap:12px}
        .home-hamburger{display:none}
        .home-mobile-menu{display:none}
        .hero-bottom{display:flex;align-items:flex-end;justify-content:space-between}
        .hero-btns{display:flex;flex-direction:column;gap:10px;align-items:flex-end}
        .featured-grid{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:auto auto;gap:3px}
        .large-card{grid-row:1/3}
        .large-card-img{height:460px}
        .small-card-img{height:220px}
        .why-grid{display:grid;grid-template-columns:1fr 2fr;gap:64px;align-items:start}
        .why-cards{display:grid;grid-template-columns:1fr 1fr;gap:2px}
        .quote-stats{display:grid;grid-template-columns:1fr 1fr}
        .stats-inner{display:grid;grid-template-columns:1fr 1fr;gap:24px}
        .footer-inner{display:flex;justify-content:space-between;align-items:center}
        .footer-links{display:flex;gap:24px}
        .section-pad{padding:64px 40px}
        .hero-pad{padding:48px 40px}
        .nav-pad{padding:0 40px}

        @media(max-width:768px){
          .home-nav-links{display:none!important}
          .home-nav-auth{display:none!important}
          .home-hamburger{display:flex!important}
          .home-mobile-menu{display:flex;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:#1A1A18;z-index:200;padding:24px;gap:8px}
          .hero-bottom{flex-direction:column!important;align-items:flex-start!important;gap:24px!important}
          .hero-btns{align-items:flex-start!important;width:100%!important}
          .hero-btns a{width:100%!important;justify-content:center!important}
          .featured-grid{grid-template-columns:1fr!important;grid-template-rows:auto!important}
          .large-card{grid-row:auto!important}
          .large-card-img{height:240px!important}
          .small-card-img{height:180px!important}
          .why-grid{grid-template-columns:1fr!important;gap:32px!important}
          .why-cards{grid-template-columns:1fr!important}
          .quote-stats{grid-template-columns:1fr!important}
          .stats-inner{grid-template-columns:1fr 1fr!important;gap:16px!important}
          .footer-inner{flex-direction:column!important;gap:16px!important;text-align:center!important}
          .footer-links{flex-wrap:wrap!important;justify-content:center!important;gap:16px!important}
          .section-pad{padding:40px 16px!important}
          .hero-pad{padding:32px 16px!important}
          .nav-pad{padding:0 16px!important}
          .hero-title{font-size:40px!important}
          .featured-header{flex-direction:column!important;gap:12px!important;align-items:flex-start!important}
        }
      `}</style>

      {/* NAV */}
      <div style={{background:'#1A1A18', position:'relative'}}>
        <nav className="nav-pad" style={{height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{fontSize:'22px', color:'#fff', letterSpacing:'-0.5px'}}>
            Custom<em style={{fontStyle:'italic', color:'#C8372D'}}>.Co</em>
          </div>

          {/* Desktop links */}
          <div className="home-nav-links">
            {['Products','Collections','Get Quote','About'].map(l => (
              <Link key={l} to={l==='Products'?'/products':l==='Get Quote'?'/quote':'#'}
                style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(255,255,255,0.55)',textDecoration:'none'}}>
                {l}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="home-nav-auth">
            <Link to="/login" style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.65)',textDecoration:'none'}}>Login</Link>
            <Link to="/register" style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',background:'#C8372D',color:'#fff',padding:'9px 20px',textDecoration:'none',fontWeight:700}}>Register</Link>
          </div>

          {/* Mobile hamburger */}
          <button className="home-hamburger" onClick={() => setMenuOpen(true)}
            style={{background:'transparent',border:'none',cursor:'pointer',color:'#fff',padding:'6px',display:'flex',alignItems:'center'}}>
            <Menu size={24}/>
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="home-mobile-menu">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
              <div style={{fontSize:'22px',color:'#fff'}}>Custom<em style={{fontStyle:'italic',color:'#C8372D'}}>.Co</em></div>
              <button onClick={() => setMenuOpen(false)} style={{background:'transparent',border:'none',cursor:'pointer',color:'#fff',padding:'6px'}}>
                <X size={24}/>
              </button>
            </div>
            {['Products','Collections','Get Quote','About'].map(l => (
              <Link key={l} to={l==='Products'?'/products':l==='Get Quote'?'/quote':'#'}
                onClick={() => setMenuOpen(false)}
                style={{fontFamily:'sans-serif',fontSize:'13px',letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(255,255,255,0.7)',textDecoration:'none',padding:'14px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                {l}
              </Link>
            ))}
            <div style={{marginTop:'32px',display:'flex',flexDirection:'column',gap:'12px'}}>
              <Link to="/login" onClick={() => setMenuOpen(false)}
                style={{fontFamily:'sans-serif',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.65)',textDecoration:'none',padding:'13px',border:'1px solid rgba(255,255,255,0.15)',textAlign:'center'}}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}
                style={{fontFamily:'sans-serif',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',background:'#C8372D',color:'#fff',padding:'13px',textDecoration:'none',fontWeight:700,textAlign:'center'}}>
                Register
              </Link>
            </div>
          </div>
        )}

        {/* HERO */}
        <div style={{position:'relative',height:'520px',background:'#1A1A18',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gridTemplateRows:'1fr 1fr'}}>
            {[{bg:'#1B3A6B',op:0.7},{bg:'#1A1A18',op:1},{bg:'#3D2314',op:0.6},
              {bg:'#0d1f38',op:0.8},{bg:'#5C6B3A',op:0.5},{bg:'#8C8C88',op:0.2}
            ].map((c,i) => (
              <div key={i} style={{background:c.bg,opacity:c.op,border:'0.5px solid rgba(255,255,255,0.04)'}}/>
            ))}
          </div>
          <div style={{position:'absolute',inset:0,background:'rgba(20,18,14,0.72)'}}/>
          <div className="hero-pad" style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
            <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'18px'}}>
              <div style={{width:'40px',height:'1px',background:'#C8372D'}}/>
              <span style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.35em',textTransform:'uppercase',color:'rgba(255,255,255,0.45)'}}>B2B Clothing Platform · Est. 2024</span>
            </div>
            <h1 className="hero-title" style={{fontSize:'clamp(36px,6vw,68px)',lineHeight:'0.95',color:'#fff',fontWeight:400,marginBottom:'28px',maxWidth:'640px'}}>
              Wear your<br/>
              <em style={{color:'#C8372D'}}>story,</em><br/>
              <span style={{WebkitTextStroke:'1px rgba(255,255,255,0.35)',color:'transparent'}}>build your</span><br/>
              brand.
            </h1>
            <div className="hero-bottom">
              <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.5)',lineHeight:'1.7',maxWidth:'340px'}}>
                Premium customized uniforms, workwear and branded apparel — crafted for businesses that refuse to blend in.
              </p>
              <div className="hero-btns">
                <Link to="/products" style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.18em',textTransform:'uppercase',background:'#C8372D',color:'#fff',border:'none',padding:'14px 32px',fontWeight:700,textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'8px'}}>
                  Browse Catalog <ArrowRight size={14}/>
                </Link>
                <Link to="/quote" style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)',border:'1px solid rgba(255,255,255,0.2)',padding:'10px 24px',textDecoration:'none',textAlign:'center'}}>
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div style={{background:'#1B3A6B',padding:'10px 0',overflow:'hidden',whiteSpace:'nowrap'}}>
        <div style={{display:'inline-flex',gap:'48px',animation:'marquee 18s linear infinite'}}>
          {['Premium Uniforms','Bulk B2B Orders','Custom Embroidery','Brand Protection','14-Day Delivery','500+ Clients',
            'Premium Uniforms','Bulk B2B Orders','Custom Embroidery','Brand Protection','14-Day Delivery','500+ Clients'].map((t,i) => (
            <span key={i} style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.25em',textTransform:'uppercase',color:'rgba(255,255,255,0.55)'}}>
              {i%2===1?<span style={{color:'#C8372D',fontSize:'14px',marginRight:'48px'}}>·</span>:null}{t}
            </span>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="section-pad" style={{background:'#F5F0E8'}}>
        <div className="featured-header" style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'40px'}}>
          <div>
            <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.3em',textTransform:'uppercase',color:'#1B3A6B',marginBottom:'8px'}}>Featured Collection</p>
            <h2 style={{fontSize:'36px',color:'#1A1A18',fontWeight:400,lineHeight:1.1}}>Crafted for<br/><em style={{color:'#8C8C88'}}>every uniform.</em></h2>
          </div>
          <Link to="/products" style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:'#1B3A6B',textDecoration:'none',display:'flex',alignItems:'center',gap:'6px'}}>
            View all <ArrowRight size={12}/>
          </Link>
        </div>
        <div className="featured-grid">
          <div className="large-card" style={{background:'#fff',border:'0.5px solid rgba(28,28,24,0.08)',cursor:'pointer',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:'14px',left:'14px',background:'#C8372D',color:'#fff',fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.15em',textTransform:'uppercase',padding:'4px 10px',fontWeight:700,zIndex:2}}>New</div>
            <div className="large-card-img" style={{background:'#1B3A6B',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'64px',color:'rgba(255,255,255,0.1)'}}>👔</div>
            <div style={{padding:'16px 18px',borderTop:'0.5px solid rgba(28,28,24,0.08)'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.18em',textTransform:'uppercase',color:'#1B3A6B',marginBottom:'4px'}}>Uniforms · Bestseller</p>
              <p style={{fontSize:'15px',color:'#1A1A18',marginBottom:'4px'}}>Corporate Command Shirt</p>
              <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'#8C8C88'}}>From ₹450 / unit · Min 50 pcs</p>
            </div>
          </div>
          {[
            {bg:'#5C6B3A',cat:'Workwear',name:'Field Jacket Pro',price:'From ₹1,200 / unit'},
            {bg:'#3D2314',cat:'Executive',name:'Chocolate Blazer',price:'From ₹2,800 / unit'},
            {bg:'#F5F0E8',cat:'Polo Shirts',name:'Classic Cream Polo',price:'From ₹380 / unit'},
            {bg:'#8C8C88',cat:'Accessories',name:'Branded Cap',price:'From ₹180 / unit'},
          ].map((p,i) => (
            <div key={i} style={{background:'#fff',border:'0.5px solid rgba(28,28,24,0.08)',cursor:'pointer'}}>
              <div className="small-card-img" style={{background:p.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'40px',color:'rgba(255,255,255,0.12)'}}>👔</div>
              <div style={{padding:'14px 16px',borderTop:'0.5px solid rgba(28,28,24,0.08)'}}>
                <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.18em',textTransform:'uppercase',color:'#1B3A6B',marginBottom:'4px'}}>{p.cat}</p>
                <p style={{fontSize:'13px',color:'#1A1A18',marginBottom:'4px'}}>{p.name}</p>
                <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'#8C8C88'}}>{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="section-pad" style={{background:'#1A1A18'}}>
        <div className="why-grid">
          <div>
            <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.3em',textTransform:'uppercase',color:'#C8372D',marginBottom:'8px'}}>Why Custom.Co</p>
            <h2 style={{fontSize:'36px',color:'#fff',fontWeight:400,lineHeight:1.1,marginBottom:'16px'}}>Built for<br/>businesses<br/><em style={{color:'rgba(140,140,136,0.5)'}}>that mean it.</em></h2>
            <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.4)',lineHeight:'1.8',marginBottom:'28px'}}>We don't do generic. Every garment is a statement — and we make sure yours is heard.</p>
            <Link to="/quote" style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.18em',textTransform:'uppercase',background:'#C8372D',color:'#fff',padding:'13px 28px',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'8px',fontWeight:700}}>
              Our Story <ArrowRight size={13}/>
            </Link>
          </div>
          <div className="why-cards">
            {[
              {n:'01',bg:'#1B3A6B',title:'Premium materials',desc:'Only high-grade fabrics that last seasons, not just weeks. Your team deserves the best.'},
              {n:'02',bg:'#1e1e1b',title:'Bulk pricing',desc:'The more you order, the sharper the unit cost. B2B pricing built around your scale.'},
              {n:'03',bg:'#1e1e1b',title:'Brand confidentiality',desc:'Your logos, designs, and assets handled with professional NDA-backed privacy.'},
              {n:'04',bg:'#5C6B3A',title:'14-day turnaround',desc:'Standard bulk orders delivered within two weeks. Rush options available.'},
            ].map(c => (
              <div key={c.n} style={{background:c.bg,padding:'28px 24px'}}>
                <div style={{fontSize:'36px',color:'rgba(255,255,255,0.1)',marginBottom:'16px',lineHeight:1}}>{c.n}</div>
                <div style={{fontSize:'16px',color:'#fff',marginBottom:'8px'}}>{c.title}</div>
                <div style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.4)',lineHeight:'1.7'}}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE + STATS */}
      <div className="quote-stats">
        <div style={{background:'#C8372D',padding:'48px 24px'}}>
          <h2 style={{fontSize:'32px',color:'#fff',fontWeight:400,marginBottom:'8px'}}>Ready to dress<br/>your team?</h2>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.65)',marginBottom:'24px',lineHeight:'1.6'}}>Tell us what you need and we'll get back within 24 hours with a full quote.</p>
          <Link to="/quote" style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.18em',textTransform:'uppercase',background:'#fff',color:'#C8372D',padding:'13px 28px',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'8px',fontWeight:700}}>
            Request a Quote <ArrowRight size={13}/>
          </Link>
        </div>
        <div style={{background:'#F5F0E8',padding:'48px 24px',borderLeft:'0.5px solid rgba(28,28,24,0.1)'}}>
          <div className="stats-inner">
            {[
              {n:'500+',l:'Business clients'},{n:'2M+',l:'Garments delivered'},
              {n:'14d',l:'Avg turnaround'},{n:'98%',l:'Client satisfaction'},
            ].map(s => (
              <div key={s.l}>
                <div style={{fontSize:'36px',color:'#1A1A18',fontWeight:400,lineHeight:1}}>{s.n}</div>
                <div style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:'#8C8C88',marginTop:'6px'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{background:'#1A1A18',padding:'28px 24px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="footer-inner">
          <div style={{fontSize:'18px',color:'#fff'}}>Custom<em style={{color:'#C8372D'}}>.Co</em></div>
          <div className="footer-links">
            {['Products','Quote','About','Contact'].map(l => (
              <span key={l} style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#8C8C88',cursor:'pointer'}}>{l}</span>
            ))}
          </div>
          <div style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(140,140,136,0.4)'}}>© 2026 Custom.Co</div>
        </div>
      </footer>
    </div>
  )
}
