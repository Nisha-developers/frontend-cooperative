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
    const data = await apiFetchWithRetry('/api/users/me/')
    
    // If backend returns incomplete data, retry once after a short delay
    if (!data.profile || !data.loan_eligibility) {
      await new Promise(resolve => setTimeout(resolve, 800))
      const retryData = await apiFetchWithRetry('/api/users/me/')
      setUser(retryData)
      return
    }
    
    setUser(data)
  } catch {
    setAccessToken(null)
    setUser(null)
  }
}, [refreshAccessToken, apiFetchWithRetry])

  const login = useCallback(async (userData, accessToken) => {
  setAccessToken(accessToken)
  setUser(userData) // set partial data first so app isn't blocked
  try {
    const fullUser = await apiFetchWithRetry('/api/users/me/')
    setUser(fullUser) // immediately replace with full data
  } catch {
    // partial data already set, not critical
  }
}, [apiFetchWithRetry])

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
      apiFetchWithRetry
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)