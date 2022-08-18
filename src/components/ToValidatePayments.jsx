import { useContract } from "../contexts/contract";
import PaymentsList from "./PaymentsList";

function ToValidatePayments() {
  const { toValidatePayments, validatePayment } = useContract();

  return (<PaymentsList 
    payments={toValidatePayments}
    title={"To Validate Payments"} 
    isValidator
    validatePayment={validatePayment} 
    />);
}


export default ToValidatePayments;
