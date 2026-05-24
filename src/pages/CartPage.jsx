import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { cartAPI, orderAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [placing, setPlacing] = useState(false)

  const fetchCart = () => {
    cartAPI.get()
      .then(r => { const d = r.data?.data; setCart(Array.isArray(d) ? d : (d?.items || d?.cartItems || [])) })
      .catch(() => toast.error('Failed to load cart'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!isLoggedIn) { navigate('/login'); return }
    fetchCart()
  }, [isLoggedIn])

  const updateQty = async (itemId, qty) => {
    if (qty < 1) return
    try {
      await cartAPI.update(itemId, qty)
      setCart(prev => prev.map(i => i.id === itemId ? {...i, quantity: qty} : i))
    } catch { toast.error('Failed to update quantity') }
  }

  const removeItem = async (itemId) => {
    try {
      await cartAPI.remove(itemId)
      setCart(prev => prev.filter(i => i.id !== itemId))
      toast.success('Item removed')
    } catch { toast.error('Failed to remove item') }
  }

  const placeOrder = async () => {
    setPlacing(true)
    try {
      await orderAPI.place({ cartItems: cart })
      toast.success('Order placed successfully!')
      setCart([])
      navigate('/orders')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order')
    } finally { setPlacing(false) }
  }

  const subtotal = cart.reduce((sum, i) => sum + (i.price || i.product?.price || 0) * (i.quantity || 1), 0)
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst
  const C = '#1B3A6B', P = '#C8372D', G = '#5C6B3A'

  if (loading) return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'60vh',background:'#F5F0E8'}}>
      <div style={{width:'32px',height:'32px',border:'2px solid #E3DED7',borderTopColor:C,borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <div style={{background:'#F5F0E8',minHeight:'80vh',padding:'24px 16px'}}>
      <style>{`
        .cart-layout{display:grid;grid-template-columns:1fr 320px;gap:3px;align-items:start}
        .cart-item-grid{display:grid;grid-template-columns:1fr 100px 80px 40px;gap:12px;padding:16px;background:#fff;border-bottom:0.5px solid rgba(28,28,24,0.06);align-items:center}
        .cart-header{display:grid;grid-template-columns:1fr 100px 80px 40px;gap:12px;padding:10px 16px;border-bottom:1px solid rgba(28,28,24,0.1)}
        @media(max-width:700px){
          .cart-layout{grid-template-columns:1fr!important}
          .cart-item-grid{grid-template-columns:1fr!important;gap:10px!important}
          .cart-header{display:none!important}
          .cart-item-price{display:flex;justify-content:space-between;align-items:center}
        }
      `}</style>

      <div style={{marginBottom:'24px'}}>
        <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.3em',textTransform:'uppercase',color:C,marginBottom:'8px'}}>Your Selection</p>
        <h1 style={{fontSize:'28px',color:'#1A1A18',fontWeight:400}}>
          Shopping Cart
          {cart.length > 0 && <em style={{fontStyle:'italic',color:'#8C8C88',fontSize:'20px',marginLeft:'12px'}}>{cart.length} {cart.length===1?'item':'items'}</em>}
        </h1>
      </div>

      {cart.length === 0 ? (
        <div style={{textAlign:'center',padding:'60px 20px',background:'#fff',border:'0.5px solid rgba(28,28,24,0.08)'}}>
          <ShoppingBag size={48} style={{color:'#CBCAC7',marginBottom:'16px'}}/>
          <p style={{fontSize:'20px',color:'#1A1A18',marginBottom:'8px'}}>Your cart is empty</p>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'#8C8C88',marginBottom:'24px'}}>Browse our catalog and add items to get started.</p>
          <Link to="/products" style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.18em',textTransform:'uppercase',background:C,color:'#fff',padding:'12px 28px',textDecoration:'none',fontWeight:700}}>
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Cart items */}
          <div>
            <div className="cart-header">
              {['Product','Quantity','Price',''].map(h => (
                <span key={h} style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.2em',textTransform:'uppercase',color:'#8C8C88'}}>{h}</span>
              ))}
            </div>

            {cart.map((item, idx) => {
              const name  = item.productName || item.product?.name || item.name || 'Product'
              const price = item.price || item.product?.price || 0
              const cat   = item.category || item.product?.category?.name || ''
              const bgs   = ['#1B3A6B','#5C6B3A','#3D2314','#8C8C88']
              const bg    = bgs[idx % bgs.length]
              return (
                <div key={item.id} className="cart-item-grid">
                  {/* Product info */}
                  <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
                    <div style={{width:'52px',height:'52px',background:bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',color:'rgba(255,255,255,0.15)',flexShrink:0}}>👔</div>
                    <div>
                      {cat && <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.15em',textTransform:'uppercase',color:C,marginBottom:'2px'}}>{cat}</p>}
                      <p style={{fontSize:'13px',color:'#1A1A18',marginBottom:'2px'}}>{name}</p>
                      <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'#8C8C88'}}>₹{Number(price).toLocaleString('en-IN')} / unit</p>
                    </div>
                  </div>

                  {/* Qty controls */}
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <button onClick={() => updateQty(item.id, (item.quantity||1) - 1)}
                      style={{width:'28px',height:'28px',border:'1px solid rgba(28,28,24,0.15)',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <Minus size={12} color="#1A1A18"/>
                    </button>
                    <span style={{fontFamily:'sans-serif',fontSize:'14px',color:'#1A1A18',minWidth:'20px',textAlign:'center'}}>{item.quantity||1}</span>
                    <button onClick={() => updateQty(item.id, (item.quantity||1) + 1)}
                      style={{width:'28px',height:'28px',border:'1px solid rgba(28,28,24,0.15)',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <Plus size={12} color="#1A1A18"/>
                    </button>
                  </div>

                  {/* Line total */}
                  <p style={{fontFamily:'sans-serif',fontSize:'14px',color:C,fontWeight:600}}>
                    ₹{(price*(item.quantity||1)).toLocaleString('en-IN')}
                  </p>

                  {/* Remove */}
                  <button onClick={() => removeItem(item.id)}
                    style={{background:'transparent',border:'none',cursor:'pointer',color:'#CBCAC7',padding:'4px',display:'flex',alignItems:'center',justifyContent:'center'}}
                    onMouseEnter={e => e.currentTarget.style.color=P}
                    onMouseLeave={e => e.currentTarget.style.color='#CBCAC7'}>
                    <Trash2 size={16}/>
                  </button>
                </div>
              )
            })}
          </div>

          {/* Order summary */}
          <div style={{background:'#fff',border:'0.5px solid rgba(28,28,24,0.08)'}}>
            <div style={{background:'#1A1A18',padding:'20px 24px'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.25em',textTransform:'uppercase',color:'rgba(255,255,255,0.45)',marginBottom:'4px'}}>Order Summary</p>
              <p style={{fontSize:'20px',color:'#fff',fontWeight:400}}>Your Total</p>
            </div>
            <div style={{padding:'24px'}}>
              <div style={{display:'flex',justifyContent:'space-between',fontFamily:'sans-serif',fontSize:'13px',color:'#8C8C88',marginBottom:'10px'}}>
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontFamily:'sans-serif',fontSize:'13px',color:'#8C8C88',marginBottom:'10px'}}>
                <span>GST (18%)</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontFamily:'sans-serif',fontSize:'13px',color:'#8C8C88',marginBottom:'10px',paddingBottom:'16px',borderBottom:'1px solid rgba(28,28,24,0.08)'}}>
                <span>Shipping</span>
                <span style={{color:G,fontWeight:600}}>Free</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'18px',color:'#1A1A18',marginBottom:'24px',fontWeight:500}}>
                <span>Total</span>
                <span style={{color:C}}>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <button onClick={placeOrder} disabled={placing}
                style={{width:'100%',background:placing?'#8C8C88':P,color:'#fff',border:'none',padding:'14px',fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.18em',textTransform:'uppercase',fontWeight:700,cursor:placing?'default':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',transition:'background 0.2s'}}>
                {placing ? 'Placing Order...' : <><ArrowRight size={14}/> Place Order</>}
              </button>
              <Link to="/products" style={{display:'block',textAlign:'center',fontFamily:'sans-serif',fontSize:'11px',color:'#8C8C88',marginTop:'14px',textDecoration:'none'}}>
                ← Continue shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
