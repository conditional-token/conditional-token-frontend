import { useAuth } from "../contexts/auth";
import { colors } from "../utils/constants";

function Navbar(props) {
  const getSessionButton = () => {
    const { signed } = useAuth;
    return signed ? (
      <span style={styles.sessionButton}>Logout</span>
    ) : (
      <span style={styles.sessionButton}>Login</span>
    );
  };

  return (
      <div style={styles.container}>
        <span style={styles.title}>Conditional Token</span>
        {getSessionButton()}
      </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: colors.secondaryDark,
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 20,
    color: colors.primaryLight,
    marginLeft: 20,
  },
  sessionButton: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 20,
    color: colors.primaryLight,
    marginLeft: "auto",
    marginRight: 20
  },
};

export default Navbar;
