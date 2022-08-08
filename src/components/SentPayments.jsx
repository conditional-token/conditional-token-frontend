import { useMetamask } from "../contexts/metamask";
import PaymentsList from "./PaymentsList";

function SentPayments() {
  const { sentPayments, claimPayment } = useMetamask();

  return (<PaymentsList payments={sentPayments} claimPayment={claimPayment} isIssuer title={"Sent Payments"} />);
}


export default SentPayments;
