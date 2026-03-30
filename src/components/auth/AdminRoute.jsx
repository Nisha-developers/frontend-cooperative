import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Spinner from '@/components/ui/Spinner'

export default function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth()
  console.log(user);
  if (loading) return <Spinner />
  if (!user) return <Navigate to="/adminlogin45" replace />
  if (!isAdmin) return <Navigate to="/dashboard" replace />
  return children
}
