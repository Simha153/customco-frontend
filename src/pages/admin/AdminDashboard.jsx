import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Package, ShoppingCart, FileText, Users, TrendingUp, AlertCircle } from 'lucide-react'
import { productAPI, orderAPI, quoteAPI } from '../../services/api'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const { isLoggedIn, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ products:0, orders:0, quotes:0, lowStock:0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [recentQuotes, setRecentQuotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn) { navigate('/login'); return }
    // admin check disabled temporarily

    Promise.allSettled([
      productAPI.getAll(),
      orderAPI.getAll(),
      quoteAPI.getAll(),
      productAPI.getPaginated({ page:0, size:1, sortBy:'id', direction:'asc' }),
    ]).then(([prods, ords, qts]) => {
      const products = prods.value?.data?.data || []
      const orders   = ords.value?.data?.data  || []
      const quotes   = qts.value?.data?.data   || []
      setStats({
        products: Array.isArray(products) ? products.length : 0,
        orders:   Array.isArray(orders)   ? orders.length   : 0,
        quotes:   Array.isArray(quotes)   ? quotes.length   : 0,
        lowStock: Array.isArray(products) ? products.filter(p => p.stockQuantity <= 10).length : 0,
      })
      setRecentOrders(Array.isArray(orders) ? orders.slice(0,5) : [])
      setRecentQuotes(Array.isArray(quotes) ? quotes.slice(0,5) : [])
    }).finally(() => setLoading(false))
  }, [isLoggedIn, isAdmin])

  const C = '#1B3A6B', P = '#C8372D', G = '#5C6B3A'

  const StatCard = ({ icon: Icon, label, value, color, sub }) => (
    <div style={{background:'#fff', border:'0.5px solid rgba(28,28,24,0.08)', padding:'24px', display:'flex', alignItems:'flex-start', gap:'16px'}}>
      <div style={{width:'44px', height:'44px', background:color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
        <Icon size={20} color="#fff" strokeWidth={1.6}/>
      </div>
      <div>
        <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#8C8C88', marginBottom:'6px'}}>{label}</p>
        <p style={{fontSize:'32px', color:'#1A1A18', fontWeight:400, fontFamily:'Georgia,serif', lineHeight:1}}>{loading ? 'â€”' : value}</p>
        {sub && <p style={{fontFamily:'sans-serif', fontSize:'11px', color:'#8C8C88', marginTop:'4px'}}>{sub}</p>}
      </div>
    </div>
  )

  const STATUS = {
    PENDING:    { bg:'#FEF3C7', color:'#92400E' },
    CONFIRMED:  { bg:'#DBEAFE', color:'#1E40AF' },
    PROCESSING: { bg:'#EDE9FE', color:'#5B21B6' },
    SHIPPED:    { bg:'#D1FAE5', color:'#065F46' },
    DELIVERED:  { bg:'#D1FAE5', color:'#065F46' },
    CANCELLED:  { bg:'#FEE2E2', color:'#991B1B' },
  }

  return (
    <div style={{background:'#F5F0E8', minHeight:'80vh', padding:'40px'}}>

      {/* Header */}
      <div style={{marginBottom:'32px', display:'flex', alignItems:'flex-end', justifyContent:'space-between'}}>
        <div>
          <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:C, marginBottom:'8px'}}>Admin Panel</p>
          <h1 style={{fontSize:'36px', color:'#1A1A18', fontWeight:400, fontFamily:'Georgia,serif'}}>Dashboard</h1>
        </div>
        <div style={{display:'flex', gap:'10px'}}>
          <Link to="/admin/products" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', background:C, color:'#fff', padding:'10px 20px', textDecoration:'none', fontWeight:600}}>
            Manage Products
          </Link>
          <Link to="/admin/orders" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', background:'transparent', color:C, border:'1.5px solid '+C, padding:'10px 20px', textDecoration:'none', fontWeight:600}}>
            Manage Orders
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'3px', marginBottom:'3px'}}>
        <StatCard icon={Package}     label="Total Products" value={stats.products} color={C}/>
        <StatCard icon={ShoppingCart} label="Total Orders"   value={stats.orders}  color={G}/>
        <StatCard icon={FileText}    label="Quote Requests" value={stats.quotes}   color='#3D2314'/>
        <StatCard icon={AlertCircle} label="Low Stock"      value={stats.lowStock} color={P} sub="â‰¤10 units remaining"/>
      </div>

      {/* Two columns */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3px', marginTop:'3px'}}>

        {/* Recent Orders */}
        <div style={{background:'#fff', border:'0.5px solid rgba(28,28,24,0.08)'}}>
          <div style={{background:'#1A1A18', padding:'18px 24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)'}}>Recent Activity</p>
            <p style={{fontSize:'16px', color:'#fff', fontFamily:'Georgia,serif'}}>Latest Orders</p>
          </div>
          {loading ? (
            <div style={{padding:'40px', textAlign:'center', color:'#8C8C88', fontFamily:'sans-serif', fontSize:'13px'}}>Loading...</div>
          ) : recentOrders.length === 0 ? (
            <div style={{padding:'40px', textAlign:'center', color:'#8C8C88', fontFamily:'sans-serif', fontSize:'13px'}}>No orders yet</div>
          ) : recentOrders.map(order => {
            const st = STATUS[order.status] || STATUS.PENDING
            return (
              <div key={order.id} style={{display:'flex', alignItems:'center', padding:'14px 24px', borderBottom:'0.5px solid rgba(28,28,24,0.05)'}}>
                <div style={{flex:1}}>
                  <p style={{fontFamily:'sans-serif', fontSize:'13px', color:'#1A1A18', fontWeight:500}}>Order #{order.id}</p>
                  <p style={{fontFamily:'sans-serif', fontSize:'11px', color:'#8C8C88'}}>{order.userEmail || 'â€”'}</p>
                </div>
                <div style={{textAlign:'right'}}>
                  <span style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.08em', textTransform:'uppercase', background:st.bg, color:st.color, padding:'3px 8px', fontWeight:600, display:'block', marginBottom:'4px'}}>{order.status}</span>
                  <p style={{fontFamily:'sans-serif', fontSize:'12px', color:C, fontWeight:600}}>â‚¹{Number(order.totalAmount||0).toLocaleString('en-IN')}</p>
                </div>
              </div>
            )
          })}
          <div style={{padding:'14px 24px', borderTop:'0.5px solid rgba(28,28,24,0.06)'}}>
            <Link to="/admin/orders" style={{fontFamily:'sans-serif', fontSize:'11px', color:C, textDecoration:'none', letterSpacing:'0.08em', textTransform:'uppercase'}}>View all orders â†’</Link>
          </div>
        </div>

        {/* Recent Quotes */}
        <div style={{background:'#fff', border:'0.5px solid rgba(28,28,24,0.08)'}}>
          <div style={{background:'#3D2314', padding:'18px 24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(245,240,232,0.4)'}}>Incoming</p>
            <p style={{fontSize:'16px', color:'#F5F0E8', fontFamily:'Georgia,serif'}}>Quote Requests</p>
          </div>
          {loading ? (
            <div style={{padding:'40px', textAlign:'center', color:'#8C8C88', fontFamily:'sans-serif', fontSize:'13px'}}>Loading...</div>
          ) : recentQuotes.length === 0 ? (
            <div style={{padding:'40px', textAlign:'center', color:'#8C8C88', fontFamily:'sans-serif', fontSize:'13px'}}>No quotes yet</div>
          ) : recentQuotes.map(quote => (
            <div key={quote.id} style={{display:'flex', alignItems:'center', padding:'14px 24px', borderBottom:'0.5px solid rgba(28,28,24,0.05)'}}>
              <div style={{flex:1}}>
                <p style={{fontFamily:'sans-serif', fontSize:'13px', color:'#1A1A18', fontWeight:500}}>{quote.companyName || 'Company'}</p>
                <p style={{fontFamily:'sans-serif', fontSize:'11px', color:'#8C8C88'}}>{quote.productType} Â· Qty: {quote.quantity}</p>
              </div>
              <div style={{textAlign:'right'}}>
                <p style={{fontFamily:'sans-serif', fontSize:'11px', color:'#8C8C88'}}>{quote.email}</p>
                <span style={{fontFamily:'sans-serif', fontSize:'10px', color:G, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase'}}>{quote.status || 'PENDING'}</span>
              </div>
            </div>
          ))}
          <div style={{padding:'14px 24px', borderTop:'0.5px solid rgba(28,28,24,0.06)'}}>
            <Link to="/admin/quotes" style={{fontFamily:'sans-serif', fontSize:'11px', color:'#3D2314', textDecoration:'none', letterSpacing:'0.08em', textTransform:'uppercase'}}>View all quotes â†’</Link>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'3px', marginTop:'3px'}}>
        {[
          {label:'Add Product',   path:'/admin/products/new', bg:C,        desc:'Create a new product listing'},
          {label:'View Orders',   path:'/admin/orders',       bg:G,        desc:'Manage all customer orders'},
          {label:'Review Quotes', path:'/admin/quotes',       bg:'#3D2314',desc:'Respond to B2B quote requests'},
          {label:'Low Stock',     path:'/admin/products',     bg:P,        desc:'Products needing restocking'},
        ].map(item => (
          <Link key={item.label} to={item.path} style={{background:item.bg, padding:'24px', textDecoration:'none', display:'block', transition:'filter 0.2s'}}
            onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.1)'}
            onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}>
            <p style={{fontSize:'16px', color:'#fff', fontFamily:'Georgia,serif', marginBottom:'6px'}}>{item.label}</p>
            <p style={{fontFamily:'sans-serif', fontSize:'11px', color:'rgba(255,255,255,0.55)'}}>{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

