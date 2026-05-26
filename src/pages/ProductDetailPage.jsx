import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, Share2, ShoppingBag, Zap, ChevronDown, ChevronUp, Check, Droplets, Wind, Thermometer, Sun } from 'lucide-react'
import { productAPI, cartAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const SIZES = ['XS','S','M','L','XL','XXL']
const BG_COLORS = ['#1B3A6B','#5C6B3A','#3D2314','#8C8C88','#3a2d1f','#1a3a2a']

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [adding, setAdding] = useState(false)
  const [selectedSize, setSelectedSize] = useState('M')
  const [wishlist, setWishlist] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(true)
  const [careOpen, setCareOpen] = useState(false)

  useEffect(() => {
    productAPI.getById(id)
      .then(r => setProduct(r.data?.data || r.data))
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false))
  }, [id])

  const addToCart = async () => {
    if (!isLoggedIn) { toast.error('Please login to add to cart'); return }
    setAdding(true)
    try {
      await cartAPI.add({ productId: Number(id), quantity: qty })
      toast.success(`${product.name} added to cart!`)
    } catch { toast.error('Failed to add to cart') }
    finally { setAdding(false) }
  }

  const buyNow = async () => {
    if (!isLoggedIn) { toast.error('Please login first'); return }
    setAdding(true)
    try {
      await cartAPI.add({ productId: Number(id), quantity: qty })
      navigate('/cart')
    } catch { toast.error('Failed to add to cart') }
    finally { setAdding(false) }
  }

  if (loading) return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'60vh', background:'#F5F0E8' }}>
      <div style={{ width:'32px', height:'32px', border:'2px solid #E3DED7', borderTopColor:'#1B3A6B', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (!product) return (
    <div style={{ textAlign:'center', padding:'80px', background:'#F5F0E8', fontFamily:'sans-serif' }}>
      <p style={{ fontSize:'16px', color:'#8C8C88', marginBottom:'16px' }}>Product not found</p>
      <Link to="/products" style={{ color:'#1B3A6B' }}>← Back to catalog</Link>
    </div>
  )

  const bg = BG_COLORS[Number(id) % BG_COLORS.length]
  const originalPrice = product.originalPrice || Math.round((product.price || 0) * 1.3)
  const discount = originalPrice > product.price
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : 0

  const quickDetails = [
    { icon:'🧵', label:'Material', value:'100% Premium Cotton' },
    { icon:'⚖️', label:'Fabric weight', value:'240 GSM (thick & solid)' },
    { icon:'📐', label:'Fit', value:'Oversized, relaxed' },
    { icon:'☀️', label:'Season', value:'All year round' },
    { icon:'🤲', label:'Feel', value:'Soft, gets better with washes' },
    { icon:'🛡️', label:'Durability', value:'Holds shape & color over time' },
  ]

  const washCare = [
    { icon:'💧', label:'Cold wash' },
    { icon:'💨', label:'Air dry / hang dry' },
    { icon:'🔥', label:'Iron on low heat' },
    { icon:'⚠️', label:'Gentle cycle only' },
  ]

  return (
    <div style={{ background:'#fff', minHeight:'100vh' }}>
      <style>{`
        .pdp-grid { display:grid; grid-template-columns:1fr 1fr; min-height:100vh; align-items:start }
        .pdp-img-side { position:sticky; top:89px; height:calc(100vh - 89px); display:flex; flex-direction:column }
        .pdp-img-container { position:relative; flex:1; background:${bg}; display:flex; align-items:center; justify-content:center; overflow:hidden; min-height:0 }
        .pdp-info-side { padding:40px 40px; background:#fff; overflow-y:auto }

        /* Glass overlay at bottom of image */
        .img-overlay { 
          position:absolute; bottom:0; left:0; right:0;
          background:rgba(255,255,255,0.12);
          backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px);
          border-top:1px solid rgba(255,255,255,0.2);
          padding:20px 24px;
        }
        .overlay-title {
          font-family:sans-serif; font-size:9px; letter-spacing:0.25em;
          text-transform:uppercase; color:rgba(255,255,255,0.6);
          margin-bottom:12px; font-weight:600;
        }
        .overlay-grid {
          display:grid; grid-template-columns:repeat(3,1fr); gap:10px;
        }
        .overlay-item {
          background:rgba(255,255,255,0.1);
          border:1px solid rgba(255,255,255,0.15);
          border-radius:8px; padding:10px 12px;
        }
        .overlay-item-label {
          font-family:sans-serif; font-size:9px;
          color:rgba(255,255,255,0.55); text-transform:uppercase;
          letter-spacing:0.12em; margin-bottom:3px;
        }
        .overlay-item-value {
          font-family:sans-serif; font-size:12px;
          color:#fff; font-weight:600; line-height:1.3;
        }
        .wash-chips { display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
        .wash-chip {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(255,255,255,0.12);
          border:1px solid rgba(255,255,255,0.2);
          border-radius:999px; padding:5px 12px;
          font-family:sans-serif; font-size:11px;
          color:rgba(255,255,255,0.9); font-weight:500;
        }

        .size-btn { width:48px; height:48px; border:1.5px solid rgba(28,28,24,0.18); background:transparent; cursor:pointer; font-family:sans-serif; font-size:12px; font-weight:600; color:#1A1A18; display:flex; align-items:center; justify-content:center; transition:all 0.15s; border-radius:4px }
        .size-btn:hover { border-color:#1A1A18 }
        .size-btn.active { background:#1A1A18; color:#fff; border-color:#1A1A18 }
        .btn-cart { flex:1; background:#1A1A18; color:#fff; border:none; padding:15px; font-family:sans-serif; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:background 0.2s; border-radius:4px }
        .btn-cart:hover { background:#333 }
        .btn-cart:disabled { background:#8C8C88; cursor:default }
        .btn-buy { width:100%; background:#C8372D; color:#fff; border:none; padding:15px; font-family:sans-serif; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:background 0.2s; border-radius:4px; margin-bottom:20px }
        .btn-buy:hover { background:#a82d24 }
        .btn-buy:disabled { background:#8C8C88; cursor:default }
        .accordion-btn { width:100%; display:flex; justify-content:space-between; align-items:center; background:transparent; border:none; border-top:1px solid rgba(28,28,24,0.08); padding:14px 0; cursor:pointer; font-family:sans-serif; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#1A1A18; font-weight:600 }
        .spec-row { display:flex; gap:12px; padding:8px 0; border-bottom:0.5px solid rgba(28,28,24,0.06); font-family:sans-serif; font-size:13px }
        .wishlist-btn { width:48px; height:48px; border:1.5px solid rgba(28,28,24,0.18); background:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:4px; transition:all 0.2s; flex-shrink:0 }
        .wishlist-btn:hover { border-color:#C8372D }
        .quick-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; margin-bottom:20px }
        .quick-card { background:#F5F0E8; border-radius:8px; padding:12px 14px; }
        .quick-label { font-family:sans-serif; font-size:10px; color:#8C8C88; margin-bottom:4px; }
        .quick-value { font-family:sans-serif; font-size:13px; font-weight:600; color:#1A1A18; line-height:1.3; }

        @media(max-width:768px){
          .pdp-grid { grid-template-columns:1fr!important }
          .pdp-img-side { position:relative!important; height:480px!important; top:0!important }
          .pdp-info-side { padding:24px 16px!important }
          .overlay-grid { grid-template-columns:repeat(2,1fr)!important }
          .quick-grid { grid-template-columns:repeat(2,1fr)!important }
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ padding:'10px 24px', borderBottom:'0.5px solid rgba(28,28,24,0.08)', display:'flex', alignItems:'center', gap:'8px', fontFamily:'sans-serif', fontSize:'11px', color:'#8C8C88' }}>
        <Link to="/" style={{ color:'#8C8C88', textDecoration:'none' }}>Home</Link>
        <span>›</span>
        <Link to="/products" style={{ color:'#8C8C88', textDecoration:'none' }}>All Clothing</Link>
        <span>›</span>
        <span style={{ color:'#1A1A18' }}>{product.name}</span>
      </div>

      <div className="pdp-grid">

        {/* ── LEFT — Sticky image with glass overlay ── */}
        <div className="pdp-img-side">
          <div className="pdp-img-container">

            {/* Discount badge */}
            {discount > 0 && (
              <div style={{ position:'absolute', top:16, left:16, background:'#C8372D', color:'#fff', fontFamily:'sans-serif', fontSize:'11px', fontWeight:700, padding:'4px 10px', borderRadius:'2px', zIndex:2 }}>
                −{discount}%
              </div>
            )}

            {/* Product emoji placeholder */}
            <div style={{ fontSize:'120px', color:'rgba(255,255,255,0.12)', userSelect:'none', marginBottom:'180px' }}>👔</div>

            {/* ── GLASS OVERLAY at bottom of image ── */}
            <div className="img-overlay">
              <div className="overlay-title">Quick details</div>
              <div className="overlay-grid">
                <div className="overlay-item">
                  <div className="overlay-item-label">Material</div>
                  <div className="overlay-item-value">100% Premium Cotton</div>
                </div>
                <div className="overlay-item">
                  <div className="overlay-item-label">Fabric weight</div>
                  <div className="overlay-item-value">240 GSM thick & solid</div>
                </div>
                <div className="overlay-item">
                  <div className="overlay-item-label">Fit</div>
                  <div className="overlay-item-value">Oversized, relaxed</div>
                </div>
              </div>

              {/* Wash care chips */}
              <div style={{ marginTop:'12px' }}>
                <div className="overlay-title" style={{ marginBottom:'8px' }}>Wash care</div>
                <div className="wash-chips">
                  {washCare.map(w => (
                    <span key={w.label} className="wash-chip">
                      {w.icon} {w.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT — Product info ── */}
        <div className="pdp-info-side">

          {/* Category */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
            <span style={{ fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.25em', textTransform:'uppercase', color:'#1B3A6B', fontWeight:600 }}>
              {product.category?.name || product.category || 'General'}
            </span>
            <span style={{ fontFamily:'sans-serif', fontSize:'10px', color:'#8C8C88' }}>
              By {product.brand || 'Custom.Co'}
            </span>
          </div>

          {/* Name */}
          <h1 style={{ fontSize:'clamp(22px,3vw,34px)', color:'#1A1A18', fontWeight:400, lineHeight:1.1, marginBottom:'14px', fontFamily:'Georgia,serif' }}>
            {product.name}
          </h1>

          {/* Description */}
          <p style={{ fontFamily:'sans-serif', fontSize:'13px', color:'#6b6b68', lineHeight:'1.7', marginBottom:'20px' }}>
            {product.description || 'A premium garment built for everyday wear. Clean look, solid feel, easy to style. Crafted for businesses that refuse to blend in.'}
          </p>

          {/* Price */}
          <div style={{ display:'flex', alignItems:'baseline', gap:'12px', marginBottom:'24px' }}>
            {discount > 0 && (
              <span style={{ fontFamily:'sans-serif', fontSize:'15px', color:'#8C8C88', textDecoration:'line-through' }}>
                ₹{Number(originalPrice).toLocaleString('en-IN')}
              </span>
            )}
            <span style={{ fontSize:'30px', color:'#1A1A18', fontWeight:700, fontFamily:'sans-serif' }}>
              ₹{Number(product.price || 0).toLocaleString('en-IN')}
            </span>
            {discount > 0 && (
              <span style={{ fontFamily:'sans-serif', fontSize:'12px', color:'#C8372D', fontWeight:700, background:'#fff0f0', padding:'2px 8px', borderRadius:'4px' }}>
                SAVE ₹{Number(originalPrice - product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Sizes */}
          <div style={{ marginBottom:'24px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px' }}>
              <span style={{ fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#1A1A18', fontWeight:600 }}>Sizes</span>
              <span style={{ fontFamily:'sans-serif', fontSize:'11px', color:'#C8372D', cursor:'pointer', textDecoration:'underline' }}>Size chart</span>
            </div>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {SIZES.map(s => (
                <button key={s} className={`size-btn${selectedSize===s?' active':''}`} onClick={() => setSelectedSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom:'20px' }}>
            <span style={{ fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#1A1A18', fontWeight:600, display:'block', marginBottom:'10px' }}>Quantity</span>
            <div style={{ display:'flex', alignItems:'center' }}>
              <button onClick={() => setQty(q => Math.max(1,q-1))} style={{ width:'42px', height:'42px', border:'1.5px solid rgba(28,28,24,0.18)', background:'transparent', cursor:'pointer', fontSize:'16px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'4px 0 0 4px' }}>−</button>
              <div style={{ width:'52px', height:'42px', border:'1.5px solid rgba(28,28,24,0.18)', borderLeft:'none', borderRight:'none', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif', fontSize:'15px', fontWeight:600 }}>{qty}</div>
              <button onClick={() => setQty(q => q+1)} style={{ width:'42px', height:'42px', border:'1.5px solid rgba(28,28,24,0.18)', background:'transparent', cursor:'pointer', fontSize:'16px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'0 4px 4px 0' }}>+</button>
              <span style={{ fontFamily:'sans-serif', fontSize:'13px', color:'#8C8C88', marginLeft:'12px' }}>= ₹{(qty*(product.price||0)).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display:'flex', gap:'10px', marginBottom:'12px' }}>
            <button className="btn-cart" onClick={addToCart} disabled={adding}>
              <ShoppingBag size={15}/> {adding ? 'Adding...' : 'Add to cart'}
            </button>
            <button className="wishlist-btn" onClick={() => setWishlist(w => !w)}>
              <Heart size={18} fill={wishlist?'#C8372D':'none'} color={wishlist?'#C8372D':'#8C8C88'}/>
            </button>
          </div>
          <button className="btn-buy" onClick={buyNow} disabled={adding}>
            <Zap size={15}/> Buy now
          </button>

          {/* Trust badges */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px', marginBottom:'24px' }}>
            {[{icon:'🚚',text:'Free shipping above ₹999'},{icon:'↩️',text:'Easy 7-day returns'},{icon:'✅',text:'100% genuine product'}].map(b => (
              <div key={b.text} style={{ background:'#F5F0E8', borderRadius:'6px', padding:'10px 8px', textAlign:'center' }}>
                <div style={{ fontSize:'16px', marginBottom:'4px' }}>{b.icon}</div>
                <div style={{ fontFamily:'sans-serif', fontSize:'10px', color:'#6b6b68', lineHeight:'1.4' }}>{b.text}</div>
              </div>
            ))}
          </div>

          {/* Quick details cards */}
          <button className="accordion-btn" onClick={() => setDetailsOpen(o => !o)}>
            <span>Product details</span>
            {detailsOpen ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
          </button>
          {detailsOpen && (
            <div style={{ padding:'12px 0 16px' }}>
              <div className="quick-grid">
                {quickDetails.map(d => (
                  <div key={d.label} className="quick-card">
                    <div className="quick-label">{d.icon} {d.label}</div>
                    <div className="quick-value">{d.value}</div>
                  </div>
                ))}
              </div>
              {product.stockQuantity && (
                <div style={{ fontFamily:'sans-serif', fontSize:'13px', color:'#5C6B3A', fontWeight:500, marginTop:'4px' }}>
                  ✓ {product.stockQuantity} units in stock
                </div>
              )}
            </div>
          )}

          {/* Wash care accordion */}
          <button className="accordion-btn" onClick={() => setCareOpen(o => !o)}>
            <span>Wash care</span>
            {careOpen ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
          </button>
          {careOpen && (
            <div style={{ padding:'12px 0 16px' }}>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                {washCare.map(w => (
                  <span key={w.label} style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'#F5F0E8', border:'1px solid rgba(28,28,24,0.1)', borderRadius:'999px', padding:'6px 14px', fontFamily:'sans-serif', fontSize:'12px', color:'#1A1A18', fontWeight:500 }}>
                    {w.icon} {w.label}
                  </span>
                ))}
              </div>
              <p style={{ fontFamily:'sans-serif', fontSize:'12px', color:'#8C8C88', lineHeight:'1.7', marginTop:'12px' }}>
                Machine wash cold, gentle cycle. Air dry or hang to retain quality. Iron on low heat for crispness. Do not bleach or tumble dry.
              </p>
            </div>
          )}

          {/* Share */}
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginTop:'20px', paddingTop:'16px', borderTop:'0.5px solid rgba(28,28,24,0.08)' }}>
            <span style={{ fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#8C8C88' }}>Share</span>
            <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success('Link copied!') }}
              style={{ display:'flex', alignItems:'center', gap:'6px', background:'transparent', border:'1px solid rgba(28,28,24,0.12)', padding:'6px 12px', borderRadius:'4px', cursor:'pointer', fontFamily:'sans-serif', fontSize:'11px', color:'#1A1A18' }}>
              <Share2 size={12}/> Copy link
            </button>
            <Link to="/quote" style={{ display:'flex', alignItems:'center', gap:'6px', background:'transparent', border:'1px solid rgba(28,28,24,0.12)', padding:'6px 12px', borderRadius:'4px', fontFamily:'sans-serif', fontSize:'11px', color:'#1A1A18', textDecoration:'none' }}>
              📋 Bulk order
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
