import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ReactNode } from 'react'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { loading, authorized } = useAuth()

  if (loading) return <div className="p-4">Checking authentication...</div>

  return authorized ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
