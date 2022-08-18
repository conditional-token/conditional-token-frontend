import { AuthProvider } from "./contexts/auth";
import { MetamaskProvider } from "./contexts/metamask";
import { ContractProvider } from "./contexts/contract";
import Routes from "./routes";

function App() {
  return (
    <MetamaskProvider>
      <ContractProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ContractProvider>
    </MetamaskProvider>
  );
}

export default App;
