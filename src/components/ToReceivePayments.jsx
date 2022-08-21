import { useContract } from "../contexts/contract";
import PaymentsList from "./PaymentsList";

function ToReceivePayments() {
  const { receivedPayments, claimPayment } = useContract();


  return (
    <PaymentsList
      payments={receivedPayments.filter(payment => !payment.isPaid)}
      claimPayment={claimPayment}
      isReceiver
      title={"To Receive Payments"}
    />
  );
}

export default ToReceivePayments;
