import { weiToEthereum } from "../utils/constants";
import { colors } from "../utils/constants";
import { copyToClipboard } from "../utils/utils";
import {
  CallReceived,
  CallMade,
  ContentCopy,
  AddCircleOutline,
  Close,
  Check,
  Send,
  ScheduleSend,
  CancelScheduleSend,
  AttachMoney,
  MoreHoriz,
  Schedule,
  CurrencyExchange,
  PriceCheck,
  LocalAtmOutlined,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

function ActionButton(props) {
  const { onClick, accept, claim, refund } = props;
  return (
    <IconButton onClick={onClick}>
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          color: accept || claim ? "green" : "red",
          padding: 5,
          border: `1px solid ${accept || claim ? "green" : "red"}`,
          borderRadius: 15,
          minWidth: 120,
        }}
      >
        {(claim || accept) && (
          <PriceCheck style={{ fontSize: 12, marginRight: 5 }} />
        )}
        {!accept && <Close style={{ fontSize: 12, marginRight: 5 }} />}
        {claim && (
          <span style={{ fontSize: 12 }}>
            Claim {refund ? "Refund" : "Payment"}
          </span>
        )}
        {accept && !claim && (
          <span style={{ fontSize: 12 }}>Approve Payment</span>
        )}
        {!accept && !claim && (
          <span style={{ fontSize: 12 }}>Reject Payment</span>
        )}
      </span>
    </IconButton>
  );
}

function StatusItem(props) {
  const { accepted, validated } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.secondaryDark,
        width: 90,
        height: 40,
        padding: 5,
        borderRadius: 5,
        color: !validated ? colors.white : accepted ? "green" : "red",
        marginRight: 5,
      }}
    >
      <span>
        {validated && accepted && (
          <Check style={{ fontSize: 20, marginRight: 5 }} />
        )}
        {validated && !accepted && (
          <Close style={{ fontSize: 20, marginRight: 5 }} />
        )}
        {!validated && <Schedule style={{ fontSize: 20, marginRight: 5 }} />}
      </span>
      <span style={{ fontSize: 15 }}>
        {validated && accepted && "Accepted"}
        {validated && !accepted && "Rejected"}
        {!validated && "Waiting Validation"}
      </span>
    </div>
  );
}

function PaymentStatusItem(props) {
  const { payed, approved } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.secondaryDark,
        width: 100,
        height: 40,
        padding: 5,
        borderRadius: 5,
        color: !payed ? colors.white : approved ? "green" : "red",
      }}
    >
      <span>
        {payed && approved && (
          <PriceCheck style={{ fontSize: 20, marginRight: 5 }} />
        )}
        {payed && !approved && (
          <CurrencyExchange style={{ fontSize: 20, marginRight: 5 }} />
        )}
        {!payed && <Schedule style={{ fontSize: 20, marginRight: 5 }} />}
      </span>
      <span style={{ fontSize: 15 }}>
        {payed && approved && "Payed"}
        {payed && !approved && "Refunded"}
        {!payed && approved && "Waiting Claim"}
        {!payed && !approved && "Waiting Refund"}
      </span>
    </div>
  );
}

function IdItem(props) {
  const { id } = props;

  return (
    <>
      <div style={styles.idItem}>
        <span style={{ fontSize: 8 }}>{id}</span>
      </div>{" "}
      <IconButton>
        <ContentCopy
          style={{ fontSize: 10, color: colors.primaryLight, marginTop: 5 }}
          onClick={() => copyToClipboard(id)}
        />
      </IconButton>
    </>
  );
}

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
      <div style={styles.id}>
        <span>ID:</span> {payment.id.toString()}
      </div>

      {(!isIssuer || isValidator) && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <span>
            <CallMade style={{ fontSize: 12 }} />
          </span>
          <span style={{ fontSize: 12 }}>Sender:</span>
          <IdItem id={payment.issuer} />
        </div>
      )}
      {(isIssuer || isValidator) && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <span>
            <CallReceived style={{ fontSize: 12 }} />
          </span>
          <span style={{ fontSize: 12 }}>Receiver: </span>

          <IdItem id={payment.payableTo} />
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginTop: 5,
        }}
      >
        <div>
          <StatusItem
            accepted={payment.isApproved}
            validated={payment.isValidated}
          />
        </div>
        {payment.isValidated && (
          <div>
            <PaymentStatusItem
              payed={payment.isPaid}
              approved={payment.isApproved}
            />
          </div>
        )}

        <span
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "auto",
            backgroundColor: colors.primaryLight,
            borderRadius: 5,
            color: colors.primaryDark,
            padding: 5,
            height: 40,
          }}
        >
          <span>
            <LocalAtmOutlined style={{ fontSize: 15 }} />
          </span>
          <span style={{ fontSize: 25, marginRight: 5 }}>
            {weiToEthereum(parseInt(payment.paymentValue.toString()))}
          </span>
          <span>ETH</span>
        </span>
      </div>
      <div>
        {isReceiver &&
          payment.isValidated &&
          payment.isApproved &&
          !payment.isPaid && (
            <ActionButton onClick={() => claimPayment(payment.id)} claim />
          )}
        {isIssuer &&
          payment.isValidated &&
          !payment.isApproved &&
          !payment.isPaid && (
            <ActionButton
              onClick={() => refundPayment(payment.id)}
              claim
              refund
            />
          )}
        {isValidator && !payment.isValidated && (
          <ActionButton
            onClick={() => validatePayment(payment.id, true)}
            accept
          />
        )}
        {isValidator && !payment.isValidated && (
          <ActionButton onClick={() => validatePayment(payment.id, false)} />
        )}
      </div>
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
    handleModal,
  } = props;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
        {allowCreation && (
          <button style={styles.createButton} onClick={handleModal}>
            New <AddCircleOutline style={{ fontSize: 20, marginLeft: 5 }} />
          </button>
        )}
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
    </div>
  );
}

export default PaymentsList;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 350,
    height: 600,
    borderRadius: 10,
    margin: 10,
    backgroundColor: colors.secondaryDark,
    border: `solid 1px ${colors.primaryLight}`,
  },
  createButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 40,
    borderRadius: 50,
    border: "none",
    marginLeft: 20,
    backgroundColor: colors.primaryLight,
    color: colors.secondaryDark,
    fontWeight: "bold",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 25,
    color: colors.primaryLight,
  },
  itemContainer: {
    width: "90%",
    margin: 2,
    backgroundColor: colors.primaryDark,
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
  id: {
    backgroundColor: colors.primaryLight,
    color: colors.primaryDark,
    width: 50,
    textAlign: "center",
    borderRadius: 10,
    marginLeft: "auto",
    fontWeight: "700",
  },
  idItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondaryDark,
    padding: 5,
    borderRadius: 20,
    marginLeft: 5,
    marginTop: 5,
  },
};
