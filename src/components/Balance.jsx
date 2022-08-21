import { useAuth } from "../contexts/auth";
import { useMetamask } from "../contexts/metamask";
import { colors } from "../utils/constants";

import { MonetizationOn } from "@mui/icons-material";

function Balance() {
  const { balance } = useMetamask();
  const {user} = useAuth();
  return (
    <div style={styles.container}>
      <span style={styles.user}>Hello, {user.name}!</span>
      <span style={styles.title}>Current Balance</span>
      <span style={styles.balance}>
        <MonetizationOn />
        {balance?.toFixed(2)}
         <span style={{ fontSize: 12, marginLeft: 5}}>ETH</span>
        </span>
    </div>
  );
}

const styles = {
  balance: {
    display: "flex",
    alignItems: "center",
    fontSize: 20,
    marginRight: 20,
    backgroundColor: colors.primaryDark,
    color: colors.primaryLight,
    padding: 5,
    borderRadius: 20,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: 50,
    backgroundColor: colors.primaryLight,
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    marginRight: 10,
    fontWeight: "400",
  },
  user: {
    marginRight: "auto",
    marginLeft: 10,
    fontWeight: "700",
  }
};

export default Balance;
