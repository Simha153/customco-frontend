import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate   = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <p className="text-brand-400 text-xs tracking-widest uppercase mb-3">Welcome back</p>
          <h1 className="font-display text-4xl text-dark-50">Sign In</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-dark-100/40 block mb-2">Email</label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="you@company.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-dark-100/40 block mb-2">Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-dark-100/40 text-sm mt-6 text-center">
          No account?{' '}
          <Link to="/register" className="text-brand-400 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  )
}
