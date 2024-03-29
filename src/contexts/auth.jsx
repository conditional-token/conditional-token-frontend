import React, { createContext, useState, useEffect, useContext } from "react";
import { useMetamask } from "./metamask";
import { conditionalTokenApi } from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updateAccounts } = useMetamask();
  /*
Check if has current user in sessionStorage
*/
  useEffect(() => {
    const storagedUser = sessionStorage.getItem("@App:user");
    const storagedToken = sessionStorage.getItem("@App:token");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      conditionalTokenApi.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  /*
Dispatch Login Request, if suceed, set user and token in sessionStorage
  */
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

        await sessionStorage.setItem(
          "@App:user",
          JSON.stringify(response.data.user)
        );
        await sessionStorage.setItem("@App:token", response.data.token);
        updateAccounts();
        alert("Logged with success!");
      } else if (response.status === 401) {
        alert("Invalid email or password!");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        alert("Invalid email or password!");
      } else {
        alert("Unexpected Error!");
      }
    } finally {
      setLoading(false);
    }
  }
  /*
Dispatch Signup Request, if suceed, set user and token in sessionStorage
*/
  async function Signup({ name, email, password }) {
    try {
      setLoading(true);
      const response = await conditionalTokenApi.post("/auth/signup", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        setUser(response.data.user);
        conditionalTokenApi.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        sessionStorage.setItem("@App:user", JSON.stringify(response.data.user));
        sessionStorage.setItem("@App:token", response.data.token);
        alert("Logged with success!");
      } else if (response.status === 409) {
        alert("Email already used, please use different email!");
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        alert("Email already used, please use different email!");
      } else {
        alert("Unexpected Error!");
      }
    } finally {
      setLoading(false);
    }
  }
  /*
Dispatch Logout, remove stored user token stored
*/
  function Logout() {
    setUser(null);
    sessionStorage.removeItem("@App:user");
    sessionStorage.removeItem("@App:token");
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, loading, user, Login, Signup, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
