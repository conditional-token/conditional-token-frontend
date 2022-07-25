import { useEffect } from "react";
import { useState } from "react";
import { useMetamask } from "../contexts/metamask";

function SelectAccount() {
  const { accounts, selectedAccount, SetSelectedAccount } = useMetamask();
  const [account, setAccount] = useState(selectedAccount);

  useEffect(() => {setAccount(selectedAccount)}, [selectedAccount]);


  const noAccountsAvailableAdvisor = (
    <div>
      <p>No accounts available</p>
    </div>
  );

  const listAccounts = () => {

    return accounts ? (
      <select
        value={account}
        onChange={(event) => setAccount(event.target.value)}
      >
        <option key={null} value={null}>
            Selecione uma Conta
          </option>
        {accounts.map((account) => (
          <option key={account} value={account}>
            {account}
          </option>
        ))}
      </select>
    ) : (
      noAccountsAvailableAdvisor
    );
  };

  return (
    <div style={styles.container}>
      {listAccounts()}

      <button onClick={() => SetSelectedAccount(account)} disabled={!account}>
        Save
      </button>
    </div>
  );
}

const styles = {};

export default SelectAccount;
