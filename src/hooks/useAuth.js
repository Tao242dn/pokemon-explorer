import { useCallback, useState } from 'react'
import {
  getStoredSession,
  loginWithEmailAndPassword,
  logoutStoredSession,
} from '../utils/auth'

export const useAuth = () => {
  const [user, setUser] = useState(() => getStoredSession())

  const login = useCallback((credentials) => {
    const session = loginWithEmailAndPassword(credentials)
    setUser(session)

    return session
  }, [])

  const logout = useCallback(() => {
    logoutStoredSession()
    setUser(null)
  }, [])

  return {
    login,
    logout,
    user,
  }
}
