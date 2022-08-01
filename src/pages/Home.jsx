import Balance from "../components/Balance";
import MetamaskNotAvailable from "../components/MetamaskNotAvailable";
import TransactionsList from "../components/TransactionsList";
import { useMetamask } from "../contexts/metamask";
import { colors } from "../utils/constants";

function Home() {
  const { metamaskAvailable } = useMetamask();

  return (
    <div style={styles.container}>
      {!metamaskAvailable ? (
        <MetamaskNotAvailable />
      ) : (
        <div style={styles.content}>
          <div style={styles.column}>
            <Balance />
            <TransactionsList />
          </div>
          <div style={styles.column}>
            <Balance />
            <TransactionsList />
          </div>
          <div style={styles.column}>
            <Balance />
            <TransactionsList />
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryDark,
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  }
};

export default Home;
