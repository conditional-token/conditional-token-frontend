import { useMetamask } from "../contexts/metamask";
import PaymentsList from "./PaymentsList";

function ValidatedPayments() {
  const { validatedPayments } = useMetamask();

  return (<PaymentsList payments={validatedPayments} title={"Validated Payments"} isValidator />);
}


export default ValidatedPayments;
