import { weiToEthereum } from "../utils/constants";
import { colors } from "../utils/constants";

function PaymentItem(props) {
  const { payment, isIssuer, isValidator } = props;

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
        <span>Paid: </span>
        {payment.isPaid.toString()}
      </div>
      <div>
        <span>Amount: </span>
        {weiToEthereum(parseInt(payment.paymentValue.toString()))}
      </div>
      {payment.isValidated && !payment.isApproved && <button>Claim</button>}
    </div>
  );
}

function PaymentsList(props) {
  const { payments, isIssuer, isValidator, title } = props;

  return (
    <div style={styles.container}>
      <span style={styles.title}>
        {title}
      </span>
      <div style={styles.content}>
      {payments.map((payment) => (
        <PaymentItem payment={payment} isIssuer={isIssuer} isValidator={isValidator} />
      ))}
      </div>
  
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
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "scroll",
    marginTop: 10,
    paddingTop: 10,
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  itemContainer: {
    width: "90%",
    margin: 2,
    backgroundColor: colors.secondaryDark,
    borderRadius: 5,
    padding: 10,
    color: colors.primaryLight,
  },
};
