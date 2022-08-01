import { useEffect } from "react";
import { useState } from "react";
import { useMetamask } from "../contexts/metamask";
import { colors } from "../utils/constants";

function SelectAccount() {
  const { accounts, selectedAccount, SetSelectedAccount } = useMetamask();
  const [account, setAccount] = useState(selectedAccount);
  const [canSelect, setCanSelect] = useState(false);

  useEffect(() => {
    setAccount(selectedAccount);
  }, [selectedAccount]);

  const handleAction = () => {
    if (canSelect) {
      SetSelectedAccount(account);
      setCanSelect(false);
    } else {
      setCanSelect(true);
    }
  };

  const noAccountsAvailableAdvisor = (
    <div>
      <p>No accounts available</p>
    </div>
  );

  const listAccounts = () => {
    return accounts ? (
      <select
        disabled={!canSelect}
        value={account}
        onChange={(event) => setAccount(event.target.value)}
      >
        <option key={null} value={null}>
          No Account Selected
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
      <span style={styles.title}>Selected Account: </span>
      {listAccounts()}

      <button
        style={styles.actionButton}
        onClick={handleAction}
        disabled={canSelect && (!account || account === "No Account Selected")}
      >
        {canSelect ? "Save" : "Edit"}
      </button>
    </div>
  );
}

const styles = {
  actionButton: {
    cursor: "pointer",
    width: 50,
    height: 25,
    fontFamily: "'Roboto', sans-serif",
    fontSize: 13,
    color: colors.secondaryDark,
    marginRight: 20,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    marginLeft: 5,
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    color: colors.primaryLight,
  },
};

export default SelectAccount;
