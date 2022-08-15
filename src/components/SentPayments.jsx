import { useMetamask } from "../contexts/metamask";
import PaymentsList from "./PaymentsList";

function SentPayments() {
  const { sentPayments, refundPayment } = useMetamask();

  return (<PaymentsList payments={sentPayments} refundPayment={refundPayment} isIssuer title={"Sent Payments"} allowCreation />);
}


export default SentPayments;
