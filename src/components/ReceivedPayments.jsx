import { useContract } from "../contexts/contract";
import PaymentsList from "./PaymentsList";

function ReceivedPayments() {
  const { receivedPayments, claimPayment } = useContract();

  return (<PaymentsList payments={receivedPayments} claimPayment={claimPayment} isReceiver title={"Received Payments"} />);
}


export default ReceivedPayments;
