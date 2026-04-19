import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

let _accessToken = null

function setAccessToken(t) { _accessToken = t ?? null }
function getAccessToken()  { return _accessToken }
function authHeader()      { return _accessToken ? { Authorization: `Bearer ${_accessToken}` } : {} }

async function apiFetch(path, options = {}) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw { status: res.status, ...data }
  return data
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    refreshAndFetchUser().finally(() => setLoading(false))
  }, [])

  const refreshAccessToken = useCallback(async () => {
    const data = await apiFetch('/api/token/refresh/', { method: 'POST' })
    setAccessToken(data.access)
    return data.access
  }, [])

  const apiFetchWithRetry = useCallback(async (path, options = {}) => {
    try {
      return await apiFetch(path, { ...options, headers: { ...authHeader(), ...options.headers } })
    } catch (err) {
      if (err.status === 401) {
        const newToken = await refreshAccessToken()
        return await apiFetch(path, {
          ...options,
          headers: { ...options.headers, Authorization: `Bearer ${newToken}` },
        })
      }
      throw err
    }
  }, [refreshAccessToken])

  const fetchUser = useCallback(async () => {
    const data = await apiFetchWithRetry('/api/users/me/')
    setUser(data)
    return data
  }, [apiFetchWithRetry])

  const refreshAndFetchUser = useCallback(async () => {
    try {
      await refreshAccessToken()
      await fetchUser()
    } catch {
      setAccessToken(null)
      setUser(null)
    }
  }, [refreshAccessToken, fetchUser])

  const login = useCallback((userData, accessToken) => {
    setAccessToken(accessToken)
    setUser(userData)
  }, [])

  const logout = useCallback(async () => {
    try {
      await apiFetch('/api/users/logout/', {
        method: 'POST',
        headers: authHeader(),
      })
    } catch {
      // Even if the request fails, clear client-side state
    } finally {
      setAccessToken(null)
      setUser(null)
    }
  }, [])

  const isAdmin    = user?.user?.is_admin === true
  const isLoggedIn = user !== null

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isLoggedIn,
      isAdmin,
      login,
      logout,
      fetchUser,
      refreshAccessToken,
      getAccessToken,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)