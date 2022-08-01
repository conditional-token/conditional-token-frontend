import { useMetamask } from "../contexts/metamask";
import { colors } from "../utils/constants";

function Balance() {
  const { balance } = useMetamask();
  return (
    <div style={styles.container}>
      <span style={styles.title}>Current Balance</span>
      <span style={styles.balance}>{balance} Tokens</span>
    </div>
  );
}

const styles = {
  balance: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 50,
    marginTop: 20
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    height: 200,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 30,
  },
};

export default Balance;
