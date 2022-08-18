import React, { createContext, useState, useEffect, useContext } from "react";
import { weiToEthereum } from "../utils/constants";
import { conditionalTokenApi } from "../services/api";

const MetamaskContext = createContext({});

export const MetamaskProvider = ({ children }) => {
  const [metamaskAvailable, setMetamaskAvailable] = useState(null);
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const getAccount = async () => {
    try {
      const res = await conditionalTokenApi.get("/account");
      if (res.status === 200) {
        return res.data.accountId;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const getBalance = async (accountId) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [accountId, "latest"] })
      .then(async (res) => {
        const balance = weiToEthereum(parseInt(res, 16));
        setBalance(balance);
      });
  };

  const SetSelectedAccount = async (accountId) => {
    if (!accountId) {
      return;
    }

    try {
      const accountUpdate = await conditionalTokenApi.post("/account", {
        accountId,
      });

      if (accountUpdate.status === 200) {
        setSelectedAccount(accountId);
        getBalance(accountId);
      }
    } catch (error) {
      alert("Fail to Select Account");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      try {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async (res) => {
            const availableAccounts = res;
            const accountId = await getAccount();
            setAvailableAccounts(availableAccounts);

            if (accountId && availableAccounts.includes(accountId)) {
              setSelectedAccount(accountId);
              getBalance(accountId);
            }
          });

        setMetamaskAvailable(true);
      } catch (error) {
        setMetamaskAvailable(false);
      }
    } else {
      setMetamaskAvailable(false);
    }
  }, []);

  return (
    <MetamaskContext.Provider
      value={{
        accounts: availableAccounts,
        accountId: selectedAccount,
        balance,
        selectedAccount,
        metamaskAvailable,
        SetSelectedAccount,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export function useMetamask() {
  const context = useContext(MetamaskContext);

  return context;
}
