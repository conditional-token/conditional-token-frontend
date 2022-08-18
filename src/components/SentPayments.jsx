import { useContract } from "../contexts/contract";
import PaymentsList from "./PaymentsList";

function SentPayments() {
  const { sentPayments, refundPayment } = useContract();

  return (
    <PaymentsList
      payments={sentPayments}
      refundPayment={refundPayment}
      isIssuer
      title={"Sent Payments"}
      allowCreation
    />
  );
}

export default SentPayments;
