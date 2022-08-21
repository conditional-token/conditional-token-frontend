import { useAuth } from "../contexts/auth";
import { useMetamask } from "../contexts/metamask";
import { colors } from "../utils/constants";
import { useHistory } from "react-router-dom";
import SelectAccount from "./SelectAccount";
import Button from "@mui/material/Button";

function Navbar(props) {
  const history = useHistory();
  const { signed, Logout } = useAuth();
  const { metamaskAvailable } = useMetamask();

  const getSessionButton = () => {
    const handleAction = () => (signed ? Logout() : history.push("/login"));

    return (
      <Button
      variant="outlined"
      style={styles.sessionButton}
      onClick={handleAction}
    >
        {signed ? "Logout" : "Login"}
      </Button>
    );
  };

  return (
    <div style={styles.container}>
      <span style={styles.title} onClick={() => history.push("/")}>
        Conditional Token
      </span>

      <div style={styles.accountContainer}>
        {signed && metamaskAvailable && <SelectAccount />}
      </div>

      <div style={styles.sessionButton}>
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
    justifyContent: "center",
    width: "100%",
    minHeight: 100,
    backgroundColor: colors.secondaryDark,
  },
  accountContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: 20,
    alignItems: "center",
  },
  title: {
    cursor: "pointer",
    fontFamily: "'Roboto', sans-serif",
    fontSize: 20,
    color: colors.white,
    margin: 20,
  },
  sessionButton: {

    width: 100,
    height: 30,
   
    marginRight: 20,

  },
};

export default Navbar;
