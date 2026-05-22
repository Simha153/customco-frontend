import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ShoppingCart, LogOut, Package } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const handleLogout = () => { logout(); navigate('/') }
  const isActive = (p) => location.pathname === p
  const C = '#1B3A6B'
  const lk = (path) => ({
    fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.2em',
    textTransform:'uppercase', color: isActive(path) ? C : '#8C8C88',
    textDecoration:'none', transition:'color 0.2s',
    fontWeight: isActive(path) ? 600 : 400,
  })
  return (
    <nav style={{background:'#fff', borderBottom:'1px solid rgba(28,28,24,0.08)', padding:'0 40px', height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'fixed', top:0, width:'100%', zIndex:100}}>
      <Link to="/" style={{fontSize:'20px', color:'#1A1A18', textDecoration:'none'}}>
        Custom<em style={{fontStyle:'italic', color:C}}>.Co</em>
      </Link>
      <div style={{display:'flex', gap:'32px', alignItems:'center'}}>
        <Link to="/products" style={lk('/products')}>Products</Link>
        <Link to="/quote"    style={lk('/quote')}>Get Quote</Link>
      </div>
      <div style={{display:'flex', gap:'16px', alignItems:'center'}}>
        {isLoggedIn ? (
          <>
            <Link to="/orders" style={{...lk('/orders'), display:'flex', alignItems:'center', gap:'5px'}}>
              <Package size={15}/> Orders
            </Link>
            <Link to="/cart" style={{color: isActive('/cart') ? C : '#8C8C88', display:'flex', alignItems:'center'}}>
              <ShoppingCart size={20}/>
            </Link>
            <span style={{fontFamily:'sans-serif', fontSize:'11px', color:'#8C8C88'}}>{user?.name || user?.email}</span>
            <button onClick={handleLogout} style={{background:'transparent', border:'none', cursor:'pointer', color:'#CBCAC7', display:'flex', alignItems:'center'}}
              onMouseEnter={e => e.currentTarget.style.color='#C8372D'}
              onMouseLeave={e => e.currentTarget.style.color='#CBCAC7'}>
              <LogOut size={17}/>
            </button>
          </>
        ) : (
          <>
            <Link to="/login"    style={lk('/login')}>Login</Link>
            <Link to="/register" style={{fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', background:C, color:'#fff', padding:'8px 18px', textDecoration:'none', fontWeight:600}}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
