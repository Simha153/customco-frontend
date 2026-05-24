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
    e.preventDefault()
    setLoading(true)
    try {
      await login(form)
      navigate('/products')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const C = '#1B3A6B'

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    border: '1px solid rgba(28,28,24,0.15)',
    background: '#fff', color: '#1A1A18',
    fontFamily: 'sans-serif', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box', borderRadius: '6px'
  }

  return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px 16px', background:'#F5F0E8' }}>
      <div style={{ width:'100%', maxWidth:'400px' }}>
        {/* Header */}
        <div style={{ marginBottom:'28px', textAlign:'center' }}>
          <p style={{ fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:C, marginBottom:'10px' }}>Welcome back</p>
          <h1 style={{ fontSize:'32px', color:'#1A1A18', fontWeight:400, fontFamily:'Georgia,serif' }}>Sign In</h1>
        </div>

        {/* Card */}
        <div style={{ background:'#fff', border:'0.5px solid rgba(28,28,24,0.08)', padding:'32px 28px', borderRadius:'8px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              <div>
                <label style={{ fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#8C8C88', display:'block', marginBottom:'8px' }}>Email</label>
                <input type="email" required style={inputStyle} placeholder="you@company.com"
                  value={form.email} onChange={e => setForm(p => ({...p, email:e.target.value}))}
                  onFocus={e => e.target.style.borderColor=C} onBlur={e => e.target.style.borderColor='rgba(28,28,24,0.15)'}/>
              </div>
              <div>
                <label style={{ fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#8C8C88', display:'block', marginBottom:'8px' }}>Password</label>
                <input type="password" required style={inputStyle} placeholder="••••••••"
                  value={form.password} onChange={e => setForm(p => ({...p, password:e.target.value}))}
                  onFocus={e => e.target.style.borderColor=C} onBlur={e => e.target.style.borderColor='rgba(28,28,24,0.15)'}/>
              </div>
              <button type="submit" disabled={loading}
                style={{ width:'100%', background:loading?'#8C8C88':C, color:'#fff', border:'none', padding:'14px', fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', fontWeight:700, cursor:loading?'default':'pointer', marginTop:'8px', transition:'background 0.2s', borderRadius:'6px' }}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>

        <p style={{ fontFamily:'sans-serif', fontSize:'13px', color:'#8C8C88', marginTop:'20px', textAlign:'center' }}>
          No account?{' '}
          <Link to="/register" style={{ color:C, textDecoration:'none', fontWeight:600 }}>Register here</Link>
        </p>
      </div>
    </div>
  )
}
