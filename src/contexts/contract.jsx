import React, { createContext, useState, useEffect, useContext } from "react";
import { Contract, ethers } from "ethers";
import { useMetamask } from "./metamask";
import { conditionalTokenApi } from "../services/api";

const ContractContext = createContext({});

export const ContractProvider = ({ children }) => {
  const { accountId, getBalance } = useMetamask();
  const [contractApi, setContractApi] = useState(null);
  const [sentPayments, setSentPayments] = useState([]);
  const [receivedPayments, setReceivedPayments] = useState([]);
  const [toValidatePayments, setToValidatePayments] = useState([]);
  const [validatedPayments, setValidatedPayments] = useState([]);

  const etherProvider =
    window.ethereum && new ethers.providers.Web3Provider(window.ethereum);

  /*
Retrieve contract details from API (Abi and address)
  */
  const getContract = async () => {
    try {
      const contractAddressData = await conditionalTokenApi.get(
        "/contract/address"
      );
      const contractAbiData = await conditionalTokenApi.get("/contract/abi");

      return Promise.all([contractAddressData, contractAbiData]);
    } catch (error) {
      console.log(error);
    }
  };
  /*
Request contract details from API and create a contract object
*/
  useEffect(() => {
    if (!window.ethereum) return;

    getContract().then(([contractAddressData, contractAbiData]) => {
      const address = contractAddressData.data.address;
      const abi = contractAbiData.data.abi;
      setContractApi(new Contract(address, abi, etherProvider.getSigner()));
    });
  }, []);
  /* 
Update Transactions list on account change
*/
  useEffect(() => {
    if (!window.ethereum) return;

    if (accountId && contractApi) {
      getTransactions(accountId);
    }
  }, [accountId, contractApi]);

  /*
Create Payment on Contract
  */
  const createPayment = async (value, fee, receiver, validators) => {
    const paymentValue = ethers.utils.parseEther(String(value));
    const paymentFee = ethers.utils.parseEther(String(fee));

    const payment = await contractApi.createPayment(
      paymentValue,
      paymentFee,
      receiver,
      validators,
      {
        from: accountId,
        value: paymentValue.add(paymentFee),
      }
    );

    return payment.wait().then(() => {
      getTransactions(accountId);
      getBalance(accountId);
    });
  };

  /* 
Claim Payment on Contract, if the payment is valid
  */
  const claimPayment = async (paymentId) => {
    const paymentsById = receivedPayments.reduce((acc, payment) => {
      acc[payment.id.toString()] = payment;
      return acc;
    }, {});

    if (!paymentsById[paymentId.toString()]) {
      alert("Payment not found");
      return;
    }

    if (paymentsById[paymentId.toString()].isPaid) {
      alert("Payment already paid");
      return;
    }

    if (!paymentsById[paymentId.toString()].isValidated) {
      alert("Payment not validated yet");
      return;
    }

    const claim = await contractApi.claimPayment(paymentId);

    return claim.wait().then(() => {
      getTransactions(accountId);
      getBalance(accountId);
    });
  };

  /* 
Refund Payment on Contract, if the payment is not valid
  */
  const refundPayment = async (paymentId) => {
    const paymentsById = sentPayments.reduce((acc, payment) => {
      acc[payment.id.toString()] = payment;
      return acc;
    }, {});

    if (!paymentsById[paymentId.toString()]) {
      alert("Payment not found");
      return;
    }

    if (paymentsById[paymentId.toString()].isPaid) {
      alert("Payment already paid");
      return;
    }

    if (!paymentsById[paymentId.toString()].isValidated) {
      alert("Payment not validated yet");
      return;
    }

    const claim = await contractApi.claimPayment(paymentId);

    return claim.wait().then(() => {
      getTransactions(accountId);
      getBalance(accountId);
    });
  };

  /*
Accept or Reject Payment on Contract
  */
  const validatePayment = async (paymentId, approve) => {
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

    let validation;

    if (approve) {
      validation = await contractApi.approveEvent(
        paymentId,
        ethers.utils.parseEther("1")
      );
    } else {
      validation = await contractApi.rejectEvent(
        paymentId,
        ethers.utils.parseEther("1")
      );
    }

    return validation.wait().then(() => {
      getTransactions(accountId);
      getBalance(accountId);
    });
  };
  /*
Retrieve Transactions List from Contract according to accountId
The Contract api, has a method that returns all the transactions index for a given account
With the transactions Index, we can retrieve the transactions for the account
The transactions retured are withou Index, but we have the indexes from the previous Retrieve
*/
  const getTransactions = async (accountId) => {
    const issuerOperationsIndexes = await contractApi.getIssuerIndex(accountId);
    const receivedPaymentOperationsIndexes = await contractApi.getReceiverIndex(
      accountId
    );
    const validatorOperationsIndexes = await contractApi.getValidatorIndex(
      accountId
    );

    let sentPaymentsOperations = await Promise.all(
      issuerOperationsIndexes.map((index) => contractApi.payments(index))
    );

    sentPaymentsOperations = sentPaymentsOperations.map((operation, index) => {
      return { ...operation, id: issuerOperationsIndexes[index] };
    });

    let receivedPaymentsOperations = await Promise.all(
      receivedPaymentOperationsIndexes.map((index) =>
        contractApi.payments(index)
      )
    );

    receivedPaymentsOperations = receivedPaymentsOperations.map(
      (operation, index) => {
        return { ...operation, id: receivedPaymentOperationsIndexes[index] };
      }
    );

    let validatorPaymentsOperations = await Promise.all(
      validatorOperationsIndexes.map((index) => contractApi.payments(index))
    );

    validatorPaymentsOperations = validatorPaymentsOperations.map(
      (operation, index) => {
        return { ...operation, id: validatorOperationsIndexes[index] };
      }
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

  return (
    <ContractContext.Provider
      value={{
        createPayment,
        claimPayment,
        refundPayment,
        validatePayment,
        sentPayments,
        receivedPayments,
        toValidatePayments,
        validatedPayments,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export function useContract() {
  const context = useContext(ContractContext);

  return context;
}
