import React, { createContext, useState, useEffect, useContext } from "react";
import { addresss, weiToEthereum } from "../utils/constants";
import contract from "../utils/contract.json";
import { ethers } from "ethers";
import { conditionalTokenApi } from "../services/api";

const MetamaskContext = createContext({});

export const MetamaskProvider = ({ children }) => {
  const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
  const contractApi = new ethers.Contract(
    addresss,
    contract.abi,
    etherProvider.getSigner()
  );

  const [metamaskAvailable, setMetamaskAvailable] = useState(null);
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [sentPayments, setSentPayments] = useState([]);
  const [receivedPayments, setReceivedPayments] = useState([]);
  const [toValidatePayments, setToValidatePayments] = useState([]);
  const [validatedPayments, setValidatedPayments] = useState([]);

  const createPayment = async (value, fee, payableTo, validators) => {
    const paymentValue = ethers.utils.parseEther(String(value));
    const paymentFee = ethers.utils.parseEther(String(fee));

    await contractApi.createPayment(
      paymentValue,
      paymentFee,
      payableTo,
      validators,
      {
        from: selectedAccount,
        value: ethers.utils.parseEther(String(value + fee)),
      }
    );
  };

  const claimPayment = async (paymentId) => {
    const paymentsById = receivedPayments.reduce((acc, payment) => {
      acc[payment.id.toString()] = payment;
      return acc;
    }, {});

    if (!paymentsById[paymentId.toString()]) {
      alert("Payment not found");
      return;
    };

    if (paymentsById[paymentId.toString()].isPaid) {
      alert("Payment already paid");
      return;
    };

    if(!paymentsById[paymentId.toString()].isValidated) {
      alert("Payment not validated yet");
      return;
    }

    await contractApi.claimPayment(paymentId);


  };

  const refundPayment = async (paymentId) => {
    const paymentsById = sentPayments.reduce((acc, payment) => {
      acc[payment.id.toString()] = payment;
      return acc;
    }, {});

    if (!paymentsById[paymentId.toString()]) {
      alert("Payment not found");
      return;
    };

    if (paymentsById[paymentId.toString()].isPaid) {
      alert("Payment already paid");
      return;
    };

    if(!paymentsById[paymentId.toString()].isValidated) {
      alert("Payment not validated yet");
      return;
    }

    await contractApi.claimPayment(paymentId);


  };

  const ValidatePayment = async (paymentId, approve) => {
    const paymentsById = toValidatePayments.reduce((acc, payment) => {
      acc[payment.id.toString()] = payment;
      return acc;
    }, {});

    if (!paymentsById[paymentId.toString()]) {
      alert("This payment is not available to validate");
      return;
    }

    if (paymentsById[paymentId.toString()].isValidated) {
      alert("This payment is already validated");
      return;
    }

    const canProcede = window.confirm(
      `Are you sure you want to ${approve ? "Approve" : "Reject"} this payment?`
    );

    if (!canProcede) {
      return;
    }

    if (approve) {
      await contractApi.approveEvent(paymentId, ethers.utils.parseEther("1"));
    } else {
      await contractApi.rejectEvent(paymentId, ethers.utils.parseEther("1"));
    };

    getTransactions(selectedAccount);
    getBalance(selectedAccount);
  };

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

  const getTransactions = async (accountId) => {
    const issuerOperationsIndexes = await contractApi.getIssuerIndex(accountId);
    const receivedPaymentOperationsIndexes = await contractApi.getReceiverIndex(
      accountId
    );
    const validatorOperationsIndexes = await contractApi.getValidatorIndex(
      accountId
    );

    const sentPaymentsOperations = await Promise.all(
      issuerOperationsIndexes.map((index) => contractApi.payments(index))
    );

    const receivedPaymentsOperations = await Promise.all(
      receivedPaymentOperationsIndexes.map((index) =>
        contractApi.payments(index)
      )
    );

    const validatorPaymentsOperations = await Promise.all(
      validatorOperationsIndexes.map((index) => contractApi.payments(index))
    );

    const toValidatePayments = validatorPaymentsOperations.filter(
      (operation) => !operation.isValidated
    );

    const validatedPayments = validatorPaymentsOperations.filter(
      (operation) => operation.isValidated
    );

    setSentPayments(sentPaymentsOperations);
    setReceivedPayments(receivedPaymentsOperations);
    setToValidatePayments(toValidatePayments);
    setValidatedPayments(validatedPayments);
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
        getTransactions(accountId);
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
              getTransactions(accountId);
              // createPayment(1, 0.5, accountId, [accountId]);
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
        balance,
        claimPayment,
        refundPayment,
        selectedAccount,
        metamaskAvailable,
        SetSelectedAccount,
        ValidatePayment,
        sentPayments,
        receivedPayments,
        toValidatePayments,
        validatedPayments,
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
