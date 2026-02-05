import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, logout as apiLogout } from "../api/authService"; // Import login
import { getUser, getToken, clearAuth, setAuth } from "../api/authStorage";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();

    if (token && storedUser) {
      setUser(storedUser);
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  // ✅ ADDED THIS FUNCTION BACK
  const login = async (credentials) => {
  try {
    const response = await apiLogin(credentials);
    setAuth(
      response.accessToken,  
      response.user,         
      response.user.role     
    );

    setUser(response.user);
    setIsAuth(true);
    return response;
  } catch (error) {
    throw error;
  }
};

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuth();
      setUser(null);
      setIsAuth(false);
    }
  };

  const value = {
    user,
    isAuthenticated: isAuth,
    loading,
    login, // ✅ Expose login to the app
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};