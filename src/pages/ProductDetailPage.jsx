import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, Share2, ShoppingBag, Zap, ChevronDown, ChevronUp, Check } from 'lucide-react'
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
  const specs = [
    { l:'Style', v:'Oversized Fit for a relaxed silhouette' },
    { l:'Material', v: product.brand ? `100% Premium Cotton` : '100% Premium Cotton' },
    { l:'Fabric Weight', v:'240 GSM — substantial, structured, breathable' },
    { l:'Fit', v:'Designed to drape naturally without clinging' },
    { l:'Season', v:'Ideal for year-round wear' },
  ]

  return (
    <div style={{ background:'#fff', minHeight:'100vh' }}>
      <style>{`
        .pdp-grid { display:grid; grid-template-columns:1fr 1fr; min-height:100vh }
        .pdp-img-side { position:sticky; top:89px; height:calc(100vh - 89px); background:${bg}; display:flex; align-items:center; justify-content:center; overflow:hidden }
        .pdp-info-side { padding:48px 40px; background:#fff }
        .size-btn { width:52px; height:52px; border:1.5px solid rgba(28,28,24,0.18); background:transparent; cursor:pointer; font-family:sans-serif; font-size:12px; font-weight:600; color:#1A1A18; display:flex; align-items:center; justify-content:center; transition:all 0.15s; border-radius:4px }
        .size-btn:hover { border-color:#1A1A18 }
        .size-btn.active { background:#1A1A18; color:#fff; border-color:#1A1A18 }
        .btn-cart { flex:1; background:#1A1A18; color:#fff; border:none; padding:16px; font-family:sans-serif; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:background 0.2s; border-radius:4px }
        .btn-cart:hover { background:#333 }
        .btn-cart:disabled { background:#8C8C88; cursor:default }
        .btn-buy { flex:1; background:#C8372D; color:#fff; border:none; padding:16px; font-family:sans-serif; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:background 0.2s; border-radius:4px }
        .btn-buy:hover { background:#a82d24 }
        .btn-buy:disabled { background:#8C8C88; cursor:default }
        .accordion-btn { width:100%; display:flex; justify-content:space-between; align-items:center; background:transparent; border:none; border-top:1px solid rgba(28,28,24,0.08); padding:16px 0; cursor:pointer; font-family:sans-serif; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#1A1A18; font-weight:600 }
        .spec-row { display:flex; gap:12px; padding:8px 0; border-bottom:0.5px solid rgba(28,28,24,0.06); font-family:sans-serif; font-size:13px }
        .wishlist-btn { width:48px; height:48px; border:1.5px solid rgba(28,28,24,0.18); background:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:4px; transition:all 0.2s; flex-shrink:0 }
        .wishlist-btn:hover { border-color:#C8372D }
        .wishlist-btn.active { background:#fff0f0; border-color:#C8372D }
        @media(max-width:768px){
          .pdp-grid { grid-template-columns:1fr!important; min-height:auto!important }
          .pdp-img-side { position:relative!important; height:360px!important; top:0!important }
          .pdp-info-side { padding:24px 16px!important }
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ padding:'12px 24px', borderBottom:'0.5px solid rgba(28,28,24,0.08)', display:'flex', alignItems:'center', gap:'8px', fontFamily:'sans-serif', fontSize:'11px', color:'#8C8C88' }}>
        <Link to="/" style={{ color:'#8C8C88', textDecoration:'none' }}>Home</Link>
        <span>›</span>
        <Link to="/products" style={{ color:'#8C8C88', textDecoration:'none' }}>All Clothing</Link>
        <span>›</span>
        <span style={{ color:'#1A1A18' }}>{product.name}</span>
      </div>

      <div className="pdp-grid">
        {/* LEFT — Image */}
        <div className="pdp-img-side">
          {/* Badges */}
          <div style={{ position:'absolute', top:20, left:20, display:'flex', flexDirection:'column', gap:8 }}>
            {discount > 0 && (
              <span style={{ background:'#C8372D', color:'#fff', fontFamily:'sans-serif', fontSize:'11px', fontWeight:700, padding:'4px 10px', borderRadius:'2px' }}>
                −{discount}%
              </span>
            )}
            {product.stockQuantity <= 10 && product.stockQuantity > 0 && (
              <span style={{ background:'#1A1A18', color:'#fff', fontFamily:'sans-serif', fontSize:'11px', fontWeight:700, padding:'4px 10px', borderRadius:'2px' }}>
                LOW STOCK
              </span>
            )}
          </div>
          {/* Product image placeholder */}
          <div style={{ fontSize:'120px', color:'rgba(255,255,255,0.12)', userSelect:'none' }}>👔</div>
          {/* Size indicator on image */}
          <div style={{ position:'absolute', bottom:20, left:20, background:'rgba(255,255,255,0.9)', padding:'6px 12px', borderRadius:'2px', fontFamily:'sans-serif', fontSize:'11px', fontWeight:700, color:'#1A1A18', backdropFilter:'blur(8px)' }}>
            Size: {selectedSize}
          </div>
        </div>

        {/* RIGHT — Info */}
        <div className="pdp-info-side">
          {/* Category + brand */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
            <span style={{ fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.25em', textTransform:'uppercase', color:'#1B3A6B', fontWeight:600 }}>
              {product.category?.name || product.category || 'General'}
            </span>
            <span style={{ fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'#8C8C88' }}>
              {product.brand || 'Custom.Co'}
            </span>
          </div>

          {/* Product name */}
          <h1 style={{ fontSize:'clamp(24px,3vw,36px)', color:'#1A1A18', fontWeight:400, lineHeight:1.1, marginBottom:'20px', fontFamily:'Georgia,serif' }}>
            {product.name}
          </h1>

          {/* Description */}
          <p style={{ fontFamily:'sans-serif', fontSize:'13px', color:'#6b6b68', lineHeight:'1.7', marginBottom:'20px' }}>
            {product.description || 'Not just a tee. It\'s the foundation of your entire vibe. Pure, clean energy — crafted for businesses that refuse to blend in.'}
          </p>

          {/* Price */}
          <div style={{ display:'flex', alignItems:'baseline', gap:'12px', marginBottom:'28px' }}>
            {discount > 0 && (
              <span style={{ fontFamily:'sans-serif', fontSize:'16px', color:'#8C8C88', textDecoration:'line-through' }}>
                ₹{Number(originalPrice).toLocaleString('en-IN')}
              </span>
            )}
            <span style={{ fontSize:'32px', color:'#1A1A18', fontWeight:700, fontFamily:'sans-serif' }}>
              ₹{Number(product.price || 0).toLocaleString('en-IN')}
            </span>
            {discount > 0 && (
              <span style={{ fontFamily:'sans-serif', fontSize:'12px', color:'#C8372D', fontWeight:700 }}>
                SAVE ₹{Number(originalPrice - product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Sizes */}
          <div style={{ marginBottom:'28px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
              <span style={{ fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#1A1A18', fontWeight:600 }}>Sizes</span>
              <span style={{ fontFamily:'sans-serif', fontSize:'11px', color:'#C8372D', textDecoration:'underline', cursor:'pointer' }}>Size chart</span>
            </div>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {SIZES.map(s => (
                <button key={s} className={`size-btn${selectedSize===s?' active':''}`}
                  onClick={() => setSelectedSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom:'24px' }}>
            <span style={{ fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#1A1A18', fontWeight:600, display:'block', marginBottom:'12px' }}>Quantity</span>
            <div style={{ display:'flex', alignItems:'center', gap:'0' }}>
              <button onClick={() => setQty(q => Math.max(1, q-1))}
                style={{ width:'44px', height:'44px', border:'1.5px solid rgba(28,28,24,0.18)', background:'transparent', cursor:'pointer', fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'4px 0 0 4px' }}>
                −
              </button>
              <div style={{ width:'56px', height:'44px', border:'1.5px solid rgba(28,28,24,0.18)', borderLeft:'none', borderRight:'none', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif', fontSize:'15px', fontWeight:600 }}>
                {qty}
              </div>
              <button onClick={() => setQty(q => q+1)}
                style={{ width:'44px', height:'44px', border:'1.5px solid rgba(28,28,24,0.18)', background:'transparent', cursor:'pointer', fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'0 4px 4px 0' }}>
                +
              </button>
              <span style={{ fontFamily:'sans-serif', fontSize:'13px', color:'#8C8C88', marginLeft:'12px' }}>
                = ₹{(qty * (product.price || 0)).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display:'flex', gap:'10px', marginBottom:'16px' }}>
            <button className="btn-cart" onClick={addToCart} disabled={adding}>
              <ShoppingBag size={16}/> {adding ? 'Adding...' : 'Add to cart'}
            </button>
            <button className="wishlist-btn" onClick={() => setWishlist(w => !w)}
              style={{ color: wishlist ? '#C8372D' : '#8C8C88' }}>
              <Heart size={18} fill={wishlist ? '#C8372D' : 'none'} color={wishlist ? '#C8372D' : '#8C8C88'}/>
            </button>
          </div>
          <button className="btn-buy" onClick={buyNow} disabled={adding} style={{ width:'100%', marginBottom:'24px' }}>
            <Zap size={16}/> Buy now
          </button>

          {/* Trust badges */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px', marginBottom:'28px' }}>
            {[
              { icon:'🚚', text:'Free shipping above ₹999' },
              { icon:'↩️', text:'Easy 7-day returns' },
              { icon:'✅', text:'100% genuine product' },
            ].map(b => (
              <div key={b.text} style={{ background:'#F5F0E8', borderRadius:'6px', padding:'10px 8px', textAlign:'center' }}>
                <div style={{ fontSize:'18px', marginBottom:'4px' }}>{b.icon}</div>
                <div style={{ fontFamily:'sans-serif', fontSize:'10px', color:'#6b6b68', lineHeight:'1.4' }}>{b.text}</div>
              </div>
            ))}
          </div>

          {/* Accordion — Product details */}
          <button className="accordion-btn" onClick={() => setDetailsOpen(o => !o)}>
            <span>Product details</span>
            {detailsOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>
          {detailsOpen && (
            <div style={{ padding:'12px 0 20px' }}>
              {specs.map(s => (
                <div key={s.l} className="spec-row">
                  <span style={{ color:'#8C8C88', minWidth:'120px', flexShrink:0 }}>
                    <Check size={12} style={{ marginRight:'6px', color:'#1B3A6B' }}/>{s.l}
                  </span>
                  <span style={{ color:'#1A1A18', fontWeight:500 }}>{s.v}</span>
                </div>
              ))}
              {product.stockQuantity && (
                <div className="spec-row">
                  <span style={{ color:'#8C8C88', minWidth:'120px', flexShrink:0 }}>
                    <Check size={12} style={{ marginRight:'6px', color:'#1B3A6B' }}/>Stock
                  </span>
                  <span style={{ color:'#1A1A18', fontWeight:500 }}>{product.stockQuantity} units available</span>
                </div>
              )}
              {product.sku && (
                <div className="spec-row">
                  <span style={{ color:'#8C8C88', minWidth:'120px', flexShrink:0 }}>
                    <Check size={12} style={{ marginRight:'6px', color:'#1B3A6B' }}/>SKU
                  </span>
                  <span style={{ color:'#1A1A18', fontWeight:500, fontFamily:'monospace', fontSize:'12px' }}>{product.sku}</span>
                </div>
              )}
            </div>
          )}

          {/* Accordion — Wash care */}
          <button className="accordion-btn" onClick={() => setCareOpen(o => !o)}>
            <span>Wash care</span>
            {careOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>
          {careOpen && (
            <div style={{ padding:'12px 0 20px', fontFamily:'sans-serif', fontSize:'13px', color:'#6b6b68', lineHeight:'1.7' }}>
              Machine wash cold, gentle cycle. Air dry or hang to retain quality. Iron on low heat for crispness. Do not bleach or tumble dry.
            </div>
          )}

          {/* Share */}
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginTop:'24px', paddingTop:'20px', borderTop:'0.5px solid rgba(28,28,24,0.08)' }}>
            <span style={{ fontFamily:'sans-serif', fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#8C8C88' }}>Share</span>
            <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success('Link copied!') }}
              style={{ display:'flex', alignItems:'center', gap:'6px', background:'transparent', border:'1px solid rgba(28,28,24,0.12)', padding:'6px 12px', borderRadius:'4px', cursor:'pointer', fontFamily:'sans-serif', fontSize:'11px', color:'#1A1A18' }}>
              <Share2 size={12}/> Copy link
            </button>
            <Link to="/quote" style={{ display:'flex', alignItems:'center', gap:'6px', background:'transparent', border:'1px solid rgba(28,28,24,0.12)', padding:'6px 12px', borderRadius:'4px', cursor:'pointer', fontFamily:'sans-serif', fontSize:'11px', color:'#1A1A18', textDecoration:'none' }}>
              📋 Bulk order
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
