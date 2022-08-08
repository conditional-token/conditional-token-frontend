import { useMetamask } from "../contexts/metamask";
import PaymentsList from "./PaymentsList";

function ReceivedPayments() {
  const { receivedPayments } = useMetamask();

  return (<PaymentsList payments={receivedPayments} title={"Received Payments"} />);
}


export default ReceivedPayments;
