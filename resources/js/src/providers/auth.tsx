import React, { createContext, useCallback, useEffect, useState } from 'react'

interface Auth {
  authenticate: (token: string) => void
  logout: () => void
  isLoggedIn: boolean
  token: string
}

export const AuthContext = createContext({} as Auth)

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ?? '')
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token))

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    if (storedToken) {
      setToken(storedToken)
      setIsLoggedIn(true)
    } else {
      setToken('')
      setIsLoggedIn(false)
    }
  }, [])

  const authenticate = useCallback((apiToken: string) => {
    localStorage.setItem('token', apiToken)
    setToken(apiToken)
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    localStorage.clear()
    setIsLoggedIn(false)
    setToken('')
  }, [])

  return {
    authenticate,
    logout,
    token,
    isLoggedIn,
  }
}

const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider
