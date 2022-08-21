import React, { createContext, useState, useEffect, useContext } from "react";
import { ropstenParams, weiToEthereum } from "../utils/constants";
import { conditionalTokenApi } from "../services/api";

const MetamaskContext = createContext({});

export const MetamaskProvider = ({ children }) => {
  const [metamaskAvailable, setMetamaskAvailable] = useState(null);
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const getAccount = async () => {
    try {
      const userAccount = await sessionStorage.getItem("@App:user");
      if (!userAccount) return;

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

  const switchNetwork = async (network) => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ropstenParams.chainId }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkNetwork = async () => {
    if (!window.ethereum) return;
    const currentChainId = await window.ethereum.request({
      method: 'eth_chainId',
    });
    if (currentChainId !== ropstenParams.chainId) {
      alert("Please switch to the Ropsten Test Network");
      await switchNetwork();
    } else {
      updateAccounts();
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

  const updateAccounts = async () => {
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
  };

  useEffect(() => {
    updateAccounts();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      checkNetwork();
      window.ethereum.on("accountsChanged", async (accounts) => {
        setSelectedAccount(null);
        updateAccounts();
      });
      window.ethereum.on("networkChanged", async (network) => {
        checkNetwork();
      });
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
        getBalance,
        updateAccounts,
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
