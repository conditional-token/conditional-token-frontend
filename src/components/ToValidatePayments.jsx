import { useMetamask } from "../contexts/metamask";
import PaymentsList from "./PaymentsList";

function ToValidatePayments() {
  const { toValidatePayments } = useMetamask();

  return (<PaymentsList payments={toValidatePayments} title={"To Validate Payments"} isValidator />);
}


export default ToValidatePayments;
