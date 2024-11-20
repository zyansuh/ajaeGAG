import { Navigate, Outlet } from 'react-router-dom'

import { toast } from 'react-toastify'

import { useUserContext } from '../../context/userContext'

const ProtectedRoute = () => {
  const { user } = useUserContext()

  if (!user && location.pathname !== '/signup') {
    toast.warning('로그인 후 이용해 주세요!')
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
