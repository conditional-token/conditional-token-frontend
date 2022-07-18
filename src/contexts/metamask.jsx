import React, { createContext, useState, useEffect, useContext } from "react";

const MetamaskContext = createContext({});

export const MetamaskProvider = ({ children }) => {
  const [metamaskAvailable, setMetamaskAvailable] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      try {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => {});

        setMetamaskAvailable(true);
      } catch (error) {
        setMetamaskAvailable(false);
      }
    } else {
      setMetamaskAvailable(false);
    }
  }, []);

  return (
    <MetamaskContext.Provider value={{ metamaskAvailable }}>
      {children}
    </MetamaskContext.Provider>
  );
};

export function useMetamask() {
  const context = useContext(MetamaskContext);

  return context;
}
