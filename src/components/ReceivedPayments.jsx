import { useContract } from "../contexts/contract";
import PaymentsList from "./PaymentsList";

function ReceivedPayments() {
  const { receivedPayments, claimPayment } = useContract();

  console.log(receivedPayments);

  return (
    <PaymentsList
      payments={receivedPayments?.filter(payment => payment.isPaid && payment.isApproved)}
      claimPayment={claimPayment}
      isReceiver
      title={"Received Payments"}
    />
  );
}

export default ReceivedPayments;
