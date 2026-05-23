import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const u = await login(form.email, form.password)
      if (u?.role === 'ROLE_ADMIN') navigate('/admin')
      else navigate('/products')
    } catch(err) { toast.error(err.response?.data?.message || 'Login failed') }
    finally { setLoading(false) }
  }
  const inp = { width:'100%', background:'#F5F0E8', border:'1px solid rgba(28,28,24,0.15)', color:'#1A1A18', padding:'12px 14px', fontFamily:'sans-serif', fontSize:'14px', outline:'none', marginBottom:'16px' }
  return (
    <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#F5F0E8',padding:'40px 20px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>
        <div style={{background:'#1A1A18',padding:'28px 32px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',marginBottom:'8px'}}>Welcome back</p>
          <h1 style={{fontFamily:'Georgia,serif',fontSize:'28px',color:'#fff',fontWeight:400}}>Sign In</h1>
        </div>
        <div style={{background:'#fff',border:'1px solid rgba(28,28,24,0.08)',borderTop:'none',padding:'28px 32px'}}>
          <form onSubmit={handleSubmit}>
            <label style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.18em',textTransform:'uppercase',color:'#8C8C88',display:'block',marginBottom:'7px'}}>Email</label>
            <input type="email" required style={inp} placeholder="you@company.com" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} onFocus={e=>e.target.style.borderColor='#1B3A6B'} onBlur={e=>e.target.style.borderColor='rgba(28,28,24,0.15)'}/>
            <label style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'0.18em',textTransform:'uppercase',color:'#8C8C88',display:'block',marginBottom:'7px'}}>Password</label>
            <input type="password" required style={inp} placeholder="••••••••" value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} onFocus={e=>e.target.style.borderColor='#1B3A6B'} onBlur={e=>e.target.style.borderColor='rgba(28,28,24,0.15)'}/>
            <button type="submit" disabled={loading} style={{width:'100%',background:loading?'#8C8C88':'#1B3A6B',color:'#fff',border:'none',padding:'14px',fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',fontWeight:700,cursor:loading?'default':'pointer',marginTop:'8px'}}>
              {loading?'Signing in...':'Sign In'}
            </button>
          </form>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'#8C8C88',marginTop:'20px',textAlign:'center'}}>
            No account? <Link to="/register" style={{color:'#1B3A6B',textDecoration:'none',fontWeight:500}}>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
