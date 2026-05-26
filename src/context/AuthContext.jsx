import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import toast from 'react-hot-toast'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = localStorage.getItem('token')
    const u = localStorage.getItem('user')
    if (t && u) { try { setToken(t); setUser(JSON.parse(u)) } catch(e) {} }
    setLoading(false)
  }, [])
  const login = async (credentials) => { const { email, password } = credentials || {};
    const res = await authAPI.login({ email, password })
    const raw = res.data?.data || res.data
    const t = raw?.token
    const userData = { name: raw?.name, email: raw?.email, role: raw?.role }
    localStorage.setItem('token', t)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(t); setUser(userData)
    toast.success('Welcome back, ' + userData.name + '!')
    return userData
  }
  const register = async (data) => { await authAPI.register(data); toast.success('Account created! Please log in.') }
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); setToken(null); setUser(null); toast.success('Logged out') }
  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin: user?.role === 'ROLE_ADMIN', isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)

