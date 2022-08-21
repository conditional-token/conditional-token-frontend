import { useAuth } from "../contexts/auth";
import { useMetamask } from "../contexts/metamask";
import { colors } from "../utils/constants";
import { useHistory } from "react-router-dom";
import SelectAccount from "./SelectAccount";

function Navbar(props) {
  const history = useHistory();
  const { signed, Logout } = useAuth();
  const { metamaskAvailable } = useMetamask();

  const getSessionButton = () => {
    const handleAction = () => (signed ? Logout() : history.push("/login"));

    return (
      <button style={styles.sessionButton} onClick={handleAction}>
        <span> {signed ? "Logout" : "Login"} </span>
      </button>
    );
  };

  return (
    <div style={styles.container}>
      <span style={styles.title} onClick={() => history.push("/")}>
        Conditional Token
      </span>

      <div style={styles.sessionContainer}>
        {signed && metamaskAvailable && <SelectAccount />}
        {getSessionButton()}
      </div>

    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    minHeight: 100,
    backgroundColor: colors.secondaryDark,
  },
  sessionContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center",
  },
  title: {
    cursor: "pointer",
    fontFamily: "'Roboto', sans-serif",
    fontSize: 20,
    color: colors.primaryLight,
    marginLeft: 20,
  },
  sessionButton: {
    cursor: "pointer",
    width: 100,
    height: 30,
    fontFamily: "'Roboto', sans-serif",
    fontSize: 15,
    color: colors.secondaryDark,
    marginRight: 20,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    marginLeft: "auto",
  },
};

export default Navbar;
