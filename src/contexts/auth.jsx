import React, { createContext, useState, useEffect, useContext } from "react";

import { conditionalTokenApi } from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem("@App:user");
    const storagedToken = sessionStorage.getItem("@App:token");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      conditionalTokenApi.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function Login({ email, password }) {
    const response = await conditionalTokenApi.post("/auth/login", { email, password });

    setUser(response.data.user);
    conditionalTokenApi.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    sessionStorage.setItem("@App:user", JSON.stringify(response.data.user));
    sessionStorage.setItem("@App:token", response.data.token);
  }

  function Logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
