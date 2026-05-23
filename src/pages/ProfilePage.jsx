import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { User, Package, FileText, LogOut, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, logout, isLoggedIn } = useAuth()
  const navigate = useNavigate()

  if (!isLoggedIn) { navigate('/login'); return null }

  const C = '#1B3A6B', P = '#C8372D'

  const handleLogout = () => {
    logout()
    navigate('/')
    toast.success('Logged out successfully')
  }

  const menuItems = [
    { icon: Package,  label: 'My Orders',    sub: 'View your order history',   path: '/orders' },
    { icon: FileText, label: 'My Quotes',     sub: 'Track your quote requests', path: '/quotes' },
  ]

  return (
    <div style={{background:'#F5F0E8', minHeight:'80vh', padding:'40px'}}>
      {/* Header */}
      <div style={{marginBottom:'32px'}}>
        <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:C, marginBottom:'8px'}}>Account</p>
        <h1 style={{fontSize:'36px', color:'#1A1A18', fontWeight:400}}>My Profile</h1>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'320px 1fr', gap:'3px', alignItems:'start'}}>

        {/* Profile card */}
        <div>
          <div style={{background:'#1A1A18', padding:'32px 28px', marginBottom:'3px'}}>
            <div style={{width:'64px', height:'64px', background:C, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px'}}>
              <User size={28} color="#fff"/>
            </div>
            <p style={{fontSize:'20px', color:'#fff', fontWeight:400, marginBottom:'4px', fontFamily:'Georgia,serif'}}>{user?.name || 'User'}</p>
            <p style={{fontFamily:'sans-serif', fontSize:'12px', color:'rgba(255,255,255,0.45)'}}>{user?.email}</p>
            {user?.role === 'ROLE_ADMIN' && (
              <span style={{display:'inline-block', marginTop:'12px', background:P, color:'#fff', fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.15em', textTransform:'uppercase', padding:'4px 10px', fontWeight:700}}>Admin</span>
            )}
          </div>

          {/* Menu items */}
          {menuItems.map(item => (
            <div key={item.label}
              onClick={() => navigate(item.path)}
              style={{background:'#fff', padding:'18px 24px', borderBottom:'0.5px solid rgba(28,28,24,0.06)', display:'flex', alignItems:'center', gap:'14px', cursor:'pointer', transition:'background 0.15s'}}
              onMouseEnter={e => e.currentTarget.style.background='#F5F0E8'}
              onMouseLeave={e => e.currentTarget.style.background='#fff'}>
              <item.icon size={18} color={C} strokeWidth={1.6}/>
              <div style={{flex:1}}>
                <p style={{fontSize:'14px', color:'#1A1A18', marginBottom:'2px'}}>{item.label}</p>
                <p style={{fontFamily:'sans-serif', fontSize:'11px', color:'#8C8C88'}}>{item.sub}</p>
              </div>
              <ChevronRight size={16} color="#CBCAC7"/>
            </div>
          ))}

          {/* Admin dashboard link */}
          {user?.role === 'ROLE_ADMIN' && (
            <div onClick={() => navigate('/admin')}
              style={{background:C, padding:'18px 24px', display:'flex', alignItems:'center', gap:'14px', cursor:'pointer', marginTop:'3px'}}
              onMouseEnter={e => e.currentTarget.style.background='#162d54'}
              onMouseLeave={e => e.currentTarget.style.background=C}>
              <User size={18} color="#fff" strokeWidth={1.6}/>
              <div style={{flex:1}}>
                <p style={{fontSize:'14px', color:'#fff', marginBottom:'2px'}}>Admin Dashboard</p>
                <p style={{fontFamily:'sans-serif', fontSize:'11px', color:'rgba(255,255,255,0.5)'}}>Manage products, orders, quotes</p>
              </div>
              <ChevronRight size={16} color="rgba(255,255,255,0.4)"/>
            </div>
          )}

          {/* Logout */}
          <div onClick={handleLogout}
            style={{background:'#fff', padding:'18px 24px', display:'flex', alignItems:'center', gap:'14px', cursor:'pointer', marginTop:'3px', borderTop:'0.5px solid rgba(28,28,24,0.06)'}}
            onMouseEnter={e => e.currentTarget.style.background='#FEF2F2'}
            onMouseLeave={e => e.currentTarget.style.background='#fff'}>
            <LogOut size={18} color={P} strokeWidth={1.6}/>
            <p style={{fontSize:'14px', color:P}}>Logout</p>
          </div>
        </div>

        {/* Right panel — account details */}
        <div style={{background:'#fff', border:'0.5px solid rgba(28,28,24,0.08)'}}>
          <div style={{background:'#1A1A18', padding:'20px 28px'}}>
            <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:'4px'}}>Account Details</p>
            <p style={{fontSize:'18px', color:'#fff', fontWeight:400, fontFamily:'Georgia,serif'}}>Personal Information</p>
          </div>
          <div style={{padding:'28px'}}>
            {[
              {label:'Full Name', value: user?.name || '—'},
              {label:'Email Address', value: user?.email || '—'},
              {label:'Account Type', value: user?.role === 'ROLE_ADMIN' ? 'Administrator' : 'Business Customer'},
              {label:'Member Since', value: '2026'},
            ].map(field => (
              <div key={field.label} style={{marginBottom:'20px', paddingBottom:'20px', borderBottom:'0.5px solid rgba(28,28,24,0.06)'}}>
                <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#8C8C88', marginBottom:'6px'}}>{field.label}</p>
                <p style={{fontSize:'15px', color:'#1A1A18'}}>{field.value}</p>
              </div>
            ))}

            <div style={{background:'#F5F0E8', padding:'16px 20px', marginTop:'8px'}}>
              <p style={{fontFamily:'sans-serif', fontSize:'11px', color:'#8C8C88', lineHeight:'1.6'}}>
                To update your account details, please contact our support team at <strong style={{color:C}}>simhadri@customco.com</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
