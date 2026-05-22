import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, FileText } from 'lucide-react'
import { productAPI, cartAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { isLoggedIn } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [adding, setAdding] = useState(false)

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

  const S = {
    page: {background:'#F5F0E8', minHeight:'80vh', padding:'40px'},
    back: {display:'inline-flex', alignItems:'center', gap:'6px', fontFamily:'sans-serif', fontSize:'11px', letterSpacing:'0.12em', textTransform:'uppercase', color:'#8C8C88', textDecoration:'none', marginBottom:'32px'},
    grid: {display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3px', background:'#1A1A18'},
    imgBox: {height:'520px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'96px'},
    infoBox: {background:'#fff', padding:'48px 40px', display:'flex', flexDirection:'column', justifyContent:'center'},
    eyebrow: {fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:'#1B3A6B', marginBottom:'12px'},
    name: {fontSize:'36px', color:'#1A1A18', fontWeight:400, lineHeight:1.1, marginBottom:'16px'},
    price: {fontSize:'28px', color:'#1B3A6B', marginBottom:'8px'},
    desc: {fontFamily:'sans-serif', fontSize:'13px', color:'#8C8C88', lineHeight:'1.8', marginBottom:'32px'},
    divider: {height:'1px', background:'rgba(28,28,24,0.08)', margin:'24px 0'},
    label: {fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#8C8C88', marginBottom:'8px'},
    qtyRow: {display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px'},
    qtyBtn: {width:'36px', height:'36px', border:'1px solid rgba(28,28,24,0.15)', background:'transparent', color:'#1A1A18', cursor:'pointer', fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s'},
    qtyVal: {fontFamily:'sans-serif', fontSize:'16px', color:'#1A1A18', minWidth:'32px', textAlign:'center'},
    btnRow: {display:'flex', gap:'10px'},
    btnCart: {flex:1, background:'#1B3A6B', color:'#fff', border:'none', padding:'14px', fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', transition:'background 0.2s'},
    btnQuote: {flex:1, background:'transparent', color:'#1A1A18', border:'1.5px solid rgba(28,28,24,0.2)', padding:'14px', fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', textDecoration:'none'},
    meta: {display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginTop:'24px'},
    metaItem: {background:'#F5F0E8', padding:'14px 16px'},
    metaLabel: {fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#8C8C88', marginBottom:'4px'},
    metaVal: {fontFamily:'sans-serif', fontSize:'14px', color:'#1A1A18', fontWeight:500},
  }

  if (loading) return (
    <div style={{display:'flex', justifyContent:'center', padding:'80px', background:'#F5F0E8'}}>
      <div style={{width:'32px', height:'32px', border:'2px solid #E3DED7', borderTopColor:'#1B3A6B', borderRadius:'50%', animation:'spin 0.8s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (!product) return (
    <div style={{textAlign:'center', padding:'80px', background:'#F5F0E8', fontFamily:'sans-serif'}}>
      <p style={{fontSize:'16px', color:'#8C8C88'}}>Product not found</p>
      <Link to="/products" style={{color:'#1B3A6B', marginTop:'12px', display:'inline-block'}}>← Back to catalog</Link>
    </div>
  )

  const bgColors = ['#1B3A6B','#5C6B3A','#3D2314','#8C8C88']
  const bg = bgColors[Number(id) % bgColors.length]

  return (
    <div style={S.page}>
      <Link to="/products" style={S.back}><ArrowLeft size={14}/> Back to catalog</Link>
      <div style={S.grid}>
        <div style={{...S.imgBox, background:bg, color:'rgba(255,255,255,0.1)'}}>👔</div>
        <div style={S.infoBox}>
          <p style={S.eyebrow}>{product.category?.name || product.category || 'General'}</p>
          <h1 style={S.name}>{product.name}</h1>
          <p style={S.price}>₹{Number(product.price || 0).toLocaleString('en-IN')} <span style={{fontFamily:'sans-serif', fontSize:'13px', color:'#8C8C88'}}>/unit</span></p>
          <div style={S.divider}/>
          <p style={S.desc}>{product.description || 'Premium quality garment crafted for business use. Customizable with your brand logo and colors.'}</p>

          <p style={S.label}>Quantity</p>
          <div style={S.qtyRow}>
            <button style={S.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span style={S.qtyVal}>{qty}</span>
            <button style={S.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
            <span style={{fontFamily:'sans-serif', fontSize:'12px', color:'#8C8C88'}}>= ₹{(qty * (product.price || 0)).toLocaleString('en-IN')}</span>
          </div>

          <div style={S.btnRow}>
            <button style={S.btnCart} onClick={addToCart} disabled={adding}
              onMouseEnter={e => e.currentTarget.style.background='#162d54'}
              onMouseLeave={e => e.currentTarget.style.background='#1B3A6B'}>
              <ShoppingCart size={14}/> {adding ? 'Adding...' : 'Add to Cart'}
            </button>
            <Link to="/quote" style={S.btnQuote}>
              <FileText size={14}/> Get Quote
            </Link>
          </div>

          <div style={S.meta}>
            {[
              {l:'Brand', v: product.brand || 'Custom.Co'},
              {l:'Stock', v: product.stockQuantity ? `${product.stockQuantity} units` : 'In stock'},
              {l:'Category', v: product.category?.name || product.category || '—'},
              {l:'SKU', v: product.sku || `SKU-${id}`},
            ].map(m => (
              <div key={m.l} style={S.metaItem}>
                <div style={S.metaLabel}>{m.l}</div>
                <div style={S.metaVal}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
