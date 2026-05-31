'use client'

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  FC,
  ReactNode,
} from 'react'
import { USER } from '../../content/users'

type AuthContextType = {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = useCallback((username: string, password: string) => {
    const valid = username === USER.username && password === USER.password
    if (valid) setIsAuthenticated(true)
    return valid
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
