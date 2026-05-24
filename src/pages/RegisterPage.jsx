import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate      = useNavigate()
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match'); return
    }
    setLoading(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password })
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const C = '#1B3A6B', P = '#C8372D'

  const inputStyle = {
    width: '100%', padding: '12px 16px', border: '1px solid rgba(28,28,24,0.15)',
    background: '#fff', color: '#1A1A18', fontFamily: 'sans-serif', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
  }

  return (
    <div style={{minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px 16px', background:'#F5F0E8'}}>
      <div style={{width:'100%', maxWidth:'420px'}}>
        {/* Header */}
        <div style={{marginBottom:'32px', textAlign:'center'}}>
          <p style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:C, marginBottom:'10px'}}>Join Us</p>
          <h1 style={{fontSize:'32px', color:'#1A1A18', fontWeight:400, fontFamily:'Georgia,serif'}}>Create Account</h1>
          <p style={{fontFamily:'sans-serif', fontSize:'13px', color:'#8C8C88', marginTop:'8px'}}>Start ordering custom apparel for your business</p>
        </div>

        {/* Form card */}
        <div style={{background:'#fff', border:'0.5px solid rgba(28,28,24,0.08)', padding:'32px 28px'}}>
          <form onSubmit={handleSubmit}>
            <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
              {[
                { key: 'name',            label: 'Full Name',        type: 'text',     placeholder: 'Your Name' },
                { key: 'email',           label: 'Email Address',    type: 'email',    placeholder: 'you@company.com' },
                { key: 'password',        label: 'Password',         type: 'password', placeholder: '••••••••' },
                { key: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label style={{fontFamily:'sans-serif', fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#8C8C88', display:'block', marginBottom:'8px'}}>{label}</label>
                  <input
                    type={type}
                    required
                    style={inputStyle}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    onFocus={e => e.target.style.borderColor=C}
                    onBlur={e => e.target.style.borderColor='rgba(28,28,24,0.15)'}
                  />
                </div>
              ))}

              <button type="submit" disabled={loading}
                style={{width:'100%', background:loading?'#8C8C88':C, color:'#fff', border:'none', padding:'14px', fontFamily:'sans-serif', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', fontWeight:700, cursor:loading?'default':'pointer', marginTop:'8px', transition:'background 0.2s'}}>
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>

        <p style={{fontFamily:'sans-serif', fontSize:'13px', color:'#8C8C88', marginTop:'20px', textAlign:'center'}}>
          Already have an account?{' '}
          <Link to="/login" style={{color:C, textDecoration:'none', fontWeight:600}}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
