import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'

const BASE_URL = import.meta.env.VITE_API_URL

const AuthContext = createContext(null)


let _accessToken = null

function setAccessToken(t)  { _accessToken = t ?? null }
function getAccessToken()   { return _accessToken }
function authHeader()       { return _accessToken ? { Authorization: `Bearer ${_accessToken}` } : {} }

// ── base fetch with credentials (always sends the httpOnly cookie) ─────────────
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


// ─────────────────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)  
  useEffect(() => {
    refreshAndFetchUser().finally(() => setLoading(false))
  }, [])

  // ── refresh access token via cookie ─────────────────────────────────────────
  const refreshAccessToken = useCallback(async () => {
    const data = await apiFetch('/api/token/refresh/', { method: 'POST' })
    setAccessToken(data.access)
  
    return data.access
  }, [])

  // ── fetch user with current in-memory token ──────────────────────────────────
  const fetchUser = useCallback(async () => {
    const data = await apiFetch('/api/users/me/', { headers: authHeader() })
    setUser(data)
    return data
  }, [])

  // ── refresh then fetch (used on mount + after login) ─────────────────────────
  const refreshAndFetchUser = useCallback(async () => {
    try {
      await refreshAccessToken()
      await fetchUser()
    } catch {
      // Cookie missing or expired — clear everything
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

  const isAdmin      = user?.user?.is_admin === true
  const isLoggedIn   = user !== null

  return (
    <AuthContext.Provider value={{
      user,           // full response from /api/users/me/
      loading,        // true until the first session check completes
      isLoggedIn,
      isAdmin,
      login,          // (userData, accessToken) => void
      logout,         // async () => void
      fetchUser,      // manually re-fetch user data if needed
      refreshAccessToken,  // get a new access token if needed
      getAccessToken, // read the current in-memory token
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)