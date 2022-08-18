import React, { createContext, useState, useEffect, useContext } from "react";
import { addresss } from "../utils/constants";
import contract from "../utils/contract.json";
import { ethers } from "ethers";
import { useMetamask } from "./metamask";

const ContractContext = createContext({});

export const ContractProvider = ({ children }) => {
  const { accountId } = useMetamask();

  const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
  const contractApi = new ethers.Contract(
    addresss,
    contract.abi,
    etherProvider.getSigner()
  );

  const [sentPayments, setSentPayments] = useState([]);
  const [receivedPayments, setReceivedPayments] = useState([]);
  const [toValidatePayments, setToValidatePayments] = useState([]);
  const [validatedPayments, setValidatedPayments] = useState([]);

  useEffect(() => {
    if (accountId) {
      getTransactions(accountId);
    }
  }, [accountId]);

  const createPayment = async (value, fee, payableTo, validators) => {
    const paymentValue = ethers.utils.parseEther(String(value));
    const paymentFee = ethers.utils.parseEther(String(fee));

    await contractApi.createPayment(
      paymentValue,
      paymentFee,
      payableTo,
      validators,
      {
        from: accountId,
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
    }

    if (paymentsById[paymentId.toString()].isPaid) {
      alert("Payment already paid");
      return;
    }

    if (!paymentsById[paymentId.toString()].isValidated) {
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
    }

    if (paymentsById[paymentId.toString()].isPaid) {
      alert("Payment already paid");
      return;
    }

    if (!paymentsById[paymentId.toString()].isValidated) {
      alert("Payment not validated yet");
      return;
    }

    await contractApi.claimPayment(paymentId);
  };

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

    if (approve) {
      await contractApi.approveEvent(paymentId, ethers.utils.parseEther("1"));
    } else {
      await contractApi.rejectEvent(paymentId, ethers.utils.parseEther("1"));
    }

    getTransactions(accountId);
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

  return (
    <ContractContext.Provider
      value={{
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
