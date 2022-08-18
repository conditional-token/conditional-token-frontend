import { useState } from "react";
import { useContract } from "../contexts/contract";
import PaymentsList from "./PaymentsList";
import PaymentsModal from "./PaymentsModal";

function SentPayments() {
  const { sentPayments, refundPayment } = useContract();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <PaymentsList
        payments={sentPayments}
        refundPayment={refundPayment}
        isIssuer
        title={"Sent Payments"}
        allowCreation
        handleModal={() => setModalOpen(true)}
      />
      <PaymentsModal 
      open={modalOpen} 
      handleClose={() => setModalOpen(false)} />
    </div>
  );
}

export default SentPayments;
