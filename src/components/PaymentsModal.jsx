import { useState } from "react";
import { colors } from "../utils/constants";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { ethers, utils } from "ethers";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { useMetamask } from "../contexts/metamask";

function PaymentsModal(props) {
  const { open, handleClose } = props;
  const { balance } = useMetamask();
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [receiverAddress, setReceiverAddress] = useState(null);
  const [validatorAddress, setvalidatorAddress] = useState(null);

  const validAmount = amount && amount > 0;
  const validFee = fee && fee > 0;
  const validReceiverAddress =
    receiverAddress && ethers.utils.isAddress(receiverAddress);
  const validValidatorAddress =
    validatorAddress && ethers.utils.isAddress(validatorAddress);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={styles.container}>
          <div style={styles.content}>
            <h3 style={styles.title}>Create Payment</h3>

            <TextField
              id="receiver"
              error={receiverAddress && !validReceiverAddress}
              helperText={
                receiverAddress && !validReceiverAddress
                  ? "Please insert a valid address"
                  : ""
              }
              label="Receiver Address"
              value={receiverAddress}
              onChange={(event) => setReceiverAddress(event.target.value)}
              variant="outlined"
              style={styles.input}
            />

            <CurrencyTextField
              error={amount && !validAmount}
              helperText={
                amount && !validAmount ? "Please insert a valid amount" : ""
              }
              label="Amount"
              variant="outlined"
              value={amount}
              currencySymbol="ETH"
              outputFormat="string"
              decimalCharacter="."
              digitGroupSeparator=","
              onChange={(_, value) => setAmount(value)}
              style={styles.input}
            />

            <CurrencyTextField
              error={fee && !validFee}
              helperText={fee && !validFee ? "Please insert a valid fee" : ""}
              label="Fee"
              variant="outlined"
              value={fee}
              currencySymbol="ETH"
              outputFormat="string"
              decimalCharacter="."
              digitGroupSeparator=","
              onChange={(_, value) => setFee(value)}
              style={styles.input}
            />

            <div style={styles.validatorsContainer}>
              <h4>Validators</h4>

              <div style={styles.validatorInput}>
                <TextField
                  id="fee-address"
                  error={validatorAddress && !validValidatorAddress}
                  helperText={
                    validatorAddress && !validValidatorAddress
                      ? "Please insert a valid address"
                      : ""
                  }
                  label="Validator Address"
                  value={validatorAddress}
                  onChange={(event) => setvalidatorAddress(event.target.value)}
                  variant="outlined"
                  style={{ width: "80%" }}
                />
                <Button variant="contained" style={styles.addValidatorButton}>
                  +
                </Button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <div>
                <div style={styles.valueCard}>
                  <span>Payment Value:</span>
                  <span style={{ fontSize: 25 }}>{amount + fee} ETH</span>
                  <div style={{ marginTop: 5 }}>
                    <span
                      style={{
                        backgroundColor: colors.primaryLight,
                        color: colors.primaryDark,
                        borderRadius: 5,
                        padding: 5,
                      }}
                    >
                      {amount} ETH
                    </span>{" "}
                    +{" "}
                    <span
                      style={{
                        backgroundColor: colors.primaryLight,
                        color: colors.primaryDark,
                        borderRadius: 5,
                        padding: 5,
                      }}
                    >
                      {fee} ETH
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginLeft: 5 }}>
                <div style={styles.valueCard}>
                  <span>Current Balance:</span>
                  <span style={{ fontSize: 25 }}>{balance} ETH</span>
                </div>
              </div>

              <Button variant="contained" style={styles.payButton}>
                Pay
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PaymentsModal;

const styles = {
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: 800,
    height: 700,
    backgroundColor: "white",
    boxShadow: 24,
    borderRadius: 5,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto",
    width: "90%",
  },
  title: {
    fontSize: 24,
  },
  input: {
    width: "90%",
    marginTop: 15,
  },
  validatorsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "calc(90% - 10px)",
    height: 200,
    marginTop: 15,
    border: `solid 1px #7F7F7F`,
    borderRadius: 5,
    paddingLeft: 10,
  },
  validatorInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  addValidatorButton: {
    width: 50,
    height: 50,
    minWidth: 30,
    borderRadius: "50%",
    marginLeft: 10,
  },
  valueCard: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: colors.primaryDark,
    height: 100,
    minWidth: 200,
    color: colors.primaryLight,
    fontFamily: "Roboto",
    borderRadius: 10,
  },
  payButton: {
    marginLeft: 100,
    width: 50,
    height: 50,
  },
};
