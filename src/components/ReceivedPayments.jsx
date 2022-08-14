import { useMetamask } from "../contexts/metamask";
import PaymentsList from "./PaymentsList";

function ReceivedPayments() {
  const { receivedPayments, claimPayment } = useMetamask();

  return (<PaymentsList payments={receivedPayments} claimPayment={claimPayment} isReceiver title={"Received Payments"} />);
}


export default ReceivedPayments;
