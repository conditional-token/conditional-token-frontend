import React, { createContext, useState, useEffect, useContext } from "react";
import { ropstenParams, weiToEthereum } from "../utils/constants";
import { conditionalTokenApi } from "../services/api";

const MetamaskContext = createContext({});

export const MetamaskProvider = ({ children }) => {
  const [metamaskAvailable, setMetamaskAvailable] = useState(null);
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  /* 
  Retrieve the accounts available in the metamask wallet.
  */
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

  /*
  Change network to Ropsten.
  */
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

  /*
  Check if current Network is Ropsten. (Ropsten is the network used for the development of the app and Contract is deployed there)
  */
  const checkNetwork = async () => {
    if (!window.ethereum) return;
    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    if (currentChainId !== ropstenParams.chainId) {
      alert("Please switch to the Ropsten Test Network");
      await switchNetwork();
    } else {
      updateAccounts();
    }
  };

  /*
  Get the balance of the selected account on Wallet.
  */
  const getBalance = async (accountId) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [accountId, "latest"] })
      .then(async (res) => {
        const balance = weiToEthereum(parseInt(res, 16));
        setBalance(balance);
      });
  };

  /*
  Send to API the selected account to persist it in the DB, and update the local state.
  */
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

  /*
  Retrieve the accounts available in the metamask wallet.
  Check if WEB3 is available.
  Retrieve the previous user selected account from the DB.
  */
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

  /*
  Retrieve accounts on Loading
  */
  useEffect(() => {
    updateAccounts();
  }, []);

  /*
Listen to Wallet changes, deal with the new account selected or new network selected.
  */
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
