import { createContext, useContext, useState, useEffect } from 'react'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {


  const [user, setUser] = useState(null)
  const [token, setToken] = useState()
 
   useEffect(() => {
  const init = async () => {
    const newToken = await NewAccessToken();
    if (newToken) {
      await fetchUser(newToken);
    }
  };
  init();
}, []); // empty dependency array = runs once on mount
console.log(user);
 

  // function to login begins
  const login = (userData, authToken) => {
   setUser(userData);
   setToken(authToken);
  }
  // function to login ends


  // Function to refresh token begins;
async function NewAccessToken() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to get a new access token");
    }

    const data = await response.json();
    const newAccessToken = data.access;
    setToken(newAccessToken);
    return data.access;
  } catch (error) {
   
    console.error("Error getting new access token:", error);
    return null;
  }
}
  // Function to refresh token ends
 async function fetchUser(istoken = '') {
  if (!token && !istoken) return;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token ?? istoken}`,
        "Content-Type": "application/json",
      },
    });

    // Token expired — refresh and retry
    if (res.status === 401) {
      const newToken = await NewAccessToken();
      if (newToken) return fetchUser(newToken); // retry with new token
      else throw new Error("Unable to refresh token");
    }

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();
    console.log(data)
    console.log('hi');
    setUser(data);

  } catch (err) {
    console.error("Error fetching user:", err);
    logout();
  }
}
  const logout = () => {
    setUser(null)
    setToken(null)
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, token, NewAccessToken,  login, logout, isAdmin, fetchUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)