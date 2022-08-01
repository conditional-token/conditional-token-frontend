import { useMetamask } from "../contexts/metamask";
import { colors } from "../utils/constants";

function TransactionsList() {
  const { balance } = useMetamask();
  return (
    <div style={styles.container}>
      <span style={styles.title}>Transactions</span>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 400,
    height: 600,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    marginTop: 20
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 25,
    marginTop: 20
  },
};

export default TransactionsList;
