import { useContract } from "../contexts/contract";
import PaymentsList from "./PaymentsList";

function ValidatedPayments() {
  const { validatedPayments } = useContract();

  return (<PaymentsList payments={validatedPayments} title={"Validated Payments"} isValidator />);
}


export default ValidatedPayments;
