import { useEffect } from "react";
import { useState } from "react";
import { useMetamask } from "../contexts/metamask";
import { colors } from "../utils/constants";
import IconButton from "@mui/material/IconButton";
import { Edit, Save } from "@mui/icons-material";	

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
      <IconButton
        style={styles.actionButton}
        onClick={handleAction}
        disabled={canSelect && (!account || account === "No Account Selected")}
      >
        {canSelect ? < Save /> : <Edit />}
      </IconButton>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: colors.primaryDark,
    padding: 10,
    borderRadius: 20,
  },
  actionButton: {
    width: 30,
    height: 25,
    bordrRadius: 20,
    marginLeft: 5,
    color: colors.primaryLight,
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    color: colors.white,
    fontSize: 12,
  },
};

export default SelectAccount;
