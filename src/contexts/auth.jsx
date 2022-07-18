import React, { createContext, useState, useEffect, useContext } from "react";

import { conditionalTokenApi } from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem("@App:user");
    const storagedToken = sessionStorage.getItem("@App:token");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      conditionalTokenApi.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function Login({ email, password }) {
    try {
      setLoading(true);
      const response = await conditionalTokenApi.post("/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        setUser(response.data.user);
        conditionalTokenApi.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        sessionStorage.setItem("@App:user", JSON.stringify(response.data.user));
        sessionStorage.setItem("@App:token", response.data.token);
        alert("Logged with success!");

      } else if (response.status === 401) {
        alert("Invalid email or password!");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        alert("Invalid email or password!");
      } else {
        alert("Unexpected Error!");
      };
    } finally {
      setLoading(false);
    }
  }

  function Logout() {
    setUser(null);
  }


  return (
    <AuthContext.Provider value={{ signed: !!user, loading, user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
