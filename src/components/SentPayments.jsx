import { useMetamask } from "../contexts/metamask";
import PaymentsList from "./PaymentsList";

function SentPayments() {
  const { sentPayments } = useMetamask();

  return (<PaymentsList payments={sentPayments} isIssuer />);
}


export default SentPayments;
