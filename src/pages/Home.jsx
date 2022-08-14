import Balance from "../components/Balance";
import MetamaskNotAvailable from "../components/MetamaskNotAvailable";
import ReceivedPayments from "../components/ReceivedPayments";
import SentPayments from "../components/SentPayments";
import ToValidatePayments from "../components/ToValidatePayments";
import ValidatedPayments from "../components/ValidatedPayments";
import { useMetamask } from "../contexts/metamask";
import { colors } from "../utils/constants";

function Home() {
  const { metamaskAvailable } = useMetamask();

  return (
    <div style={styles.container}>
      {!metamaskAvailable ? (
        <MetamaskNotAvailable />
      ) : (
        <div style={styles.container}>
          <Balance />
          <div style={styles.content}>
          <SentPayments />
          <ReceivedPayments />
          <ToValidatePayments />
          <ValidatedPayments />
            </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  advise: {
    color: colors.primaryLight,
    fontSize: 20,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryDark,
    height: "100%",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
};

export default Home;
