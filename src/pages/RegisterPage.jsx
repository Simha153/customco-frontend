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

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <p className="text-brand-400 text-xs tracking-widest uppercase mb-3">Join us</p>
          <h1 className="font-display text-4xl text-dark-50">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'name',            label: 'Full Name',       type: 'text',     placeholder: 'Your Name' },
            { key: 'email',           label: 'Email',           type: 'email',    placeholder: 'you@company.com' },
            { key: 'password',        label: 'Password',        type: 'password', placeholder: '••••••••' },
            { key: 'confirmPassword', label: 'Confirm Password',type: 'password', placeholder: '••••••••' },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="text-xs uppercase tracking-widest text-dark-100/40 block mb-2">{label}</label>
              <input
                type={type}
                required
                className="input-field"
                placeholder={placeholder}
                value={form[key]}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
              />
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-50">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-dark-100/40 text-sm mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-400 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
