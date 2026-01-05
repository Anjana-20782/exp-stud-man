import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage"));

  const login = (token, profileImage) => {
    localStorage.setItem("token", token);
    if (profileImage) localStorage.setItem("profileImage", profileImage);

    setToken(token);
    setProfileImage(profileImage);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setProfileImage(null);
  };

  return (
    <AuthContext.Provider value={{ token, profileImage, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
