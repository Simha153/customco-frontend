import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Package, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { orderAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const STATUS_STYLE = {
  PENDING:    { bg:'#FEF3C7', color:'#92400E', label:'Pending' },
  CONFIRMED:  { bg:'#DBEAFE', color:'#1E40AF', label:'Confirmed' },
  PROCESSING: { bg:'#EDE9FE', color:'#5B21B6', label:'Processing' },
  SHIPPED:    { bg:'#D1FAE5', color:'#065F46', label:'Shipped' },
  DELIVERED:  { bg:'#D1FAE5', color:'#065F46', label:'Delivered' },
  CANCELLED:  { bg:'#FEE2E2', color:'#991B1B', label:'Cancelled' },
}

export default function OrdersPage() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    if (!isLoggedIn) { navigate('/login'); return }
    orderAPI.getMyOrders()
      .then(r => setOrders(r.data?.data || r.data || []))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false))
  }, [isLoggedIn])

  const C = '#1B3A6B'

  if (loading) return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'60vh', background:'#F5F0E8'}}>
      <div style={{width:'32px', height:'32px', border:'2px solid #E3DED7', borderTopColor:C, borderRadius:'50%', animation:'spin 0.8s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <div style={{background:'#F5F0E8', minHeight:'80vh', padding:'40px'}}>
      <div style={{marginBottom:'32px'}}>
        <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:C, marginBottom:'8px'}}>Your History</p>
        <h1 style={{fontSize:'36px', color:'#1A1A18', fontWeight:400}}>
          My Orders
          {orders.length > 0 && <em style={{fontStyle:'italic', color:'#8C8C88', fontSize:'24px', marginLeft:'12px'}}>{orders.length} orders</em>}
        </h1>
      </div>

      {orders.length === 0 ? (
        <div style={{textAlign:'center', padding:'80px 20px', background:'#fff', border:'0.5px solid rgba(28,28,24,0.08)'}}>
          <Package size={48} style={{color:'#CBCAC7', marginBottom:'16px'}}/>
          <p style={{fontSize:'20px', color:'#1A1A18', marginBottom:'8px'}}>No orders yet</p>
          <p style={{fontFamily:'sans-serif', fontSize:'13px', color:'#8C8C88', marginBottom:'24px'}}>Your order history will appear here once you place your first order.</p>
          <Link to="/products" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', background:C, color:'#fff', padding:'12px 28px', textDecoration:'none', fontWeight:700}}>
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div style={{display:'flex', flexDirection:'column', gap:'3px'}}>
          {orders.map(order => {
            const st = STATUS_STYLE[order.status] || STATUS_STYLE.PENDING
            const isOpen = expanded === order.id
            const total = order.totalAmount || order.total || 0
            const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'}) : '—'
            const items = order.orderItems || order.items || []

            return (
              <div key={order.id} style={{background:'#fff', border:'0.5px solid rgba(28,28,24,0.08)', overflow:'hidden'}}>
                {/* Order header row */}
                <div style={{display:'grid', gridTemplateColumns:'80px 1fr 1fr 120px 100px 40px', gap:'16px', padding:'20px 24px', alignItems:'center', cursor:'pointer'}}
                  onClick={() => setExpanded(isOpen ? null : order.id)}>
                  <div>
                    <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#8C8C88', marginBottom:'4px'}}>Order</p>
                    <p style={{fontFamily:'sans-serif', fontSize:'13px', color:'#1A1A18', fontWeight:600}}>#{order.id}</p>
                  </div>
                  <div>
                    <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#8C8C88', marginBottom:'4px'}}>Date</p>
                    <p style={{fontFamily:'sans-serif', fontSize:'13px', color:'#1A1A18'}}>{date}</p>
                  </div>
                  <div>
                    <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#8C8C88', marginBottom:'4px'}}>Items</p>
                    <p style={{fontFamily:'sans-serif', fontSize:'13px', color:'#1A1A18'}}>{items.length} {items.length === 1 ? 'item' : 'items'}</p>
                  </div>
                  <div>
                    <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.15em', textTransform:'uppercase', color:'#8C8C88', marginBottom:'4px'}}>Total</p>
                    <p style={{fontFamily:'sans-serif', fontSize:'14px', color:C, fontWeight:600}}>₹{Number(total).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <span style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.1em', textTransform:'uppercase', background:st.bg, color:st.color, padding:'4px 10px', fontWeight:600}}>
                      {st.label}
                    </span>
                  </div>
                  <div style={{color:'#8C8C88'}}>
                    {isOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                  </div>
                </div>

                {/* Expanded order items */}
                {isOpen && (
                  <div style={{borderTop:'1px solid rgba(28,28,24,0.06)', background:'#FAFAF8'}}>
                    {items.length === 0 ? (
                      <p style={{fontFamily:'sans-serif', fontSize:'13px', color:'#8C8C88', padding:'20px 24px'}}>No item details available.</p>
                    ) : items.map((item, i) => (
                      <div key={i} style={{display:'flex', alignItems:'center', gap:'14px', padding:'14px 24px', borderBottom:'0.5px solid rgba(28,28,24,0.05)'}}>
                        <div style={{width:'40px', height:'40px', background:['#1B3A6B','#5C6B3A','#3D2314'][i%3], display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', color:'rgba(255,255,255,0.2)', flexShrink:0}}>👔</div>
                        <div style={{flex:1}}>
                          <p style={{fontSize:'14px', color:'#1A1A18', marginBottom:'2px'}}>{item.productName || item.product?.name || 'Product'}</p>
                          <p style={{fontFamily:'sans-serif', fontSize:'12px', color:'#8C8C88'}}>Qty: {item.quantity || 1} × ₹{Number(item.price || item.unitPrice || 0).toLocaleString('en-IN')}</p>
                        </div>
                        <p style={{fontFamily:'sans-serif', fontSize:'13px', color:C, fontWeight:600}}>
                          ₹{((item.price || item.unitPrice || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                    <div style={{padding:'16px 24px', display:'flex', justifyContent:'flex-end'}}>
                      <span style={{fontFamily:'sans-serif', fontSize:'12px', color:'#8C8C88'}}>
                        Total paid: <strong style={{color:C}}>₹{Number(total).toLocaleString('en-IN')}</strong>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
