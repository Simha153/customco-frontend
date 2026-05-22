import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Spinner from './Spinner'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isLoggedIn, isAdmin, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )

  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />

  return children
}
