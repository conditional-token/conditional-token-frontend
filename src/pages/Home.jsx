import MetamaskNotAvailable from "../components/MetamaskNotAvailable";
import SelectAccount from "../components/SelectAccount";
import { useMetamask } from "../contexts/metamask";
import { colors } from "../utils/constants";

function Home() {
  const { metamaskAvailable } = useMetamask();

  return (
    <div style={styles.container}>
      {!metamaskAvailable ? (
        <MetamaskNotAvailable />
      ) : (
        <div>
          <SelectAccount />
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
    width: "100%",
    height: "100%",
    backgroundColor: colors.primaryDark,
  },
};

export default Home;
