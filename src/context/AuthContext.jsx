import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [token, setToken]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser  = localStorage.getItem('user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password })
    const { token: t, ...userData } = res.data.data
    localStorage.setItem('token', t)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(t)
    setUser(userData)
    toast.success(`Welcome back, ${userData.name || email}!`)
    return userData
  }

  const register = async (data) => {
    const res = await authAPI.register(data)
    toast.success('Account created! Please log in.')
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    toast.success('Logged out')
  }

  const isAdmin = user?.role === 'ROLE_ADMIN' || user?.roles?.includes('ROLE_ADMIN')

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
