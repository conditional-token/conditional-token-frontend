import MetamaskLogo from "../assets/metamask_logo.png";
import ChromeLogo from "../assets/google-chrome-logo.png";
import { colors, metamaskInstallURL } from "../utils/constants";

function MetamaskNotAvailable(props) {
  return (
    <div style={styles.container}>
      <div style={styles.adviseContainer}>
        <img src={MetamaskLogo} style={styles.metamaskLogo} />
        <span style={styles.adviseText}>Metamask is not Available</span>
      </div>

      <div style={styles.installContainer}>
        <p style={styles.installHelp}>To use this application:</p>
        <a href={metamaskInstallURL} style={styles.button}>
          <img src={ChromeLogo} style={styles.chromeLogo} />
          <span>Install in this Browser</span>
        </a>
      </div>
    </div>
  );
}

const styles = {
  adviseContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    textDecoration:  "none",
    color: colors.primaryLight,
    width: 200,
    borderRadius: 20,
    padding: 5,
    color: colors.primaryDark,
    backgroundColor: colors.primaryLight,
    fontFamily: "'Roboto', sans-serif",


  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    minWidth: 300,
    height: 400,
    borderRadius: 10,
    backgroundColor: colors.secondaryDark,
  },
  chromeLogo: {
    height: 30,
    marginRight: 10,
  },
  metamaskLogo: {
    height: 100,
  },
  adviseText: {
    fontFamily: "'Roboto', sans-serif",
    color: colors.primaryLight,
    fontSize: 30,
  },
  installHelp: {
    fontFamily: "'Roboto', sans-serif",
    color: colors.primaryLight,
  },
  installContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default MetamaskNotAvailable;
