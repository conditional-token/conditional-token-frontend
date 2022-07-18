import { AuthProvider } from "./contexts/auth";
import { MetamaskProvider } from "./contexts/metamask";
import Routes from "./routes";

function App() {
  return (
    <MetamaskProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </MetamaskProvider>
  );
}

export default App;
