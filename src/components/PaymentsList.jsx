import { weiToEthereum } from "../utils/constants";
import { colors } from "../utils/constants";
import PaymentModal from "./PaymentsModal";

function PaymentItem(props) {
  const {
    payment,
    isIssuer,
    isReceiver,
    isValidator,
    claimPayment,
    refundPayment,
    validatePayment,
  } = props;

  return (
    <div style={styles.itemContainer}>
      <div>
        <span>ID:</span> {payment.id.toString()}
      </div>
      {(!isIssuer || isValidator) && (
        <div>
          <span>Issuer ID:</span> {payment.issuer}
        </div>
      )}
      {(isIssuer || isValidator) && (
        <div>
          <span>Payble To:</span> {payment.payableTo}
        </div>
      )}
      <div>
        <span>Approved: </span> {payment.isApproved.toString()}
      </div>
      <div>
        <span>Validated: </span>
        {payment.isValidated.toString()}
      </div>
      <div>
        <span>Is Finished: </span>
        {payment.isPaid.toString()}
      </div>
      <div>
        <span>Paid: </span>
        {payment.isPaid.toString()}
      </div>
      <div>
        <span>Amount: </span>
        {weiToEthereum(parseInt(payment.paymentValue.toString()))}
      </div>
      {isReceiver &&
        payment.isValidated &&
        payment.isApproved &&
        !payment.isPaid && (
          <button onClick={() => claimPayment(payment.id)}>Claim</button>
        )}
      {isIssuer &&
        payment.isValidated &&
        !payment.isApproved &&
        !payment.isPaid && (
          <button onClick={() => refundPayment(payment.id)}>Refund</button>
        )}
      {isValidator && !payment.isValidated && (
        <button onClick={() => validatePayment(payment.id, true)}>
          Approve
        </button>
      )}
      {isValidator && !payment.isValidated && (
        <button onClick={() => validatePayment(payment.id, false)}>
          Reject
        </button>
      )}
    </div>
  );
}

function PaymentsList(props) {
  const {
    allowCreation,
    payments,
    isIssuer,
    isReceiver,
    isValidator,
    title,
    claimPayment,
    validatePayment,
    refundPayment,
  } = props;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
        {allowCreation && <button style={styles.createButton}>New</button>}
      </div>
      <div style={styles.content}>
        {payments.map((payment) => (
          <PaymentItem
            payment={payment}
            isIssuer={isIssuer}
            isValidator={isValidator}
            isReceiver={isReceiver}
            key={payment.id.toString()}
            claimPayment={claimPayment}
            refundPayment={refundPayment}
            validatePayment={validatePayment}
          />
        ))}
      </div>
    <PaymentModal />
    </div>
  );
}

export default PaymentsList;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 400,
    height: 650,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    margin: 10,
  },
  createButton: {
    width: 60,
    height: 40,
    borderRadius: 50,
    border: "none",
    marginLeft: 20,
    backgroundColor: colors.secondaryDark,
    color: colors.primaryLight,
    fontWeight: "bold",
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "scroll",

    maxHeight: "100%",
    marginTop: 10,
    paddingTop: 10,
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 25,
  },
  itemContainer: {
    width: "90%",
    margin: 2,
    backgroundColor: colors.secondaryDark,
    borderRadius: 5,
    padding: 10,
    color: colors.primaryLight,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
};
