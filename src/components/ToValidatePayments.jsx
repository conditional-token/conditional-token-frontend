import { useMetamask } from "../contexts/metamask";
import PaymentsList from "./PaymentsList";

function ToValidatePayments() {
  const { toValidatePayments, ValidatePayment } = useMetamask();

  return (<PaymentsList 
    payments={toValidatePayments}
    title={"To Validate Payments"} 
    isValidator
    validatePayment={ValidatePayment} 
    />);
}


export default ToValidatePayments;
