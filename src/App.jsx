import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/auth";
import { colors } from "./utils/constants";
import Routes from "./routes";

function App() {
  return (
    <div style={styles.container}>
      <AuthProvider>
        <Navbar />
        <div style={styles.innerContainer}>
          <Routes />
        </div>
      </AuthProvider>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
};

export default App;
