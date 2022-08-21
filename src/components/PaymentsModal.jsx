import { useState } from "react";
import { colors } from "../utils/constants";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { ethers, utils } from "ethers";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { useMetamask } from "../contexts/metamask";
import { Warning } from "@mui/icons-material";

function PaymentsModal(props) {
  const { open, handleClose } = props;
  const { balance, createPayment } = useMetamask();
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [receiverAddress, setReceiverAddress] = useState(null);
  const [validatorAddress, setvalidatorAddress] = useState(null);
  const [validators, setValidators] = useState({});

  const validAmount = amount && amount > 0;
  const validFee = fee && fee > 0;
  const validReceiverAddress =
    receiverAddress && ethers.utils.isAddress(receiverAddress);
  const validValidatorAddress =
    validatorAddress && ethers.utils.isAddress(validatorAddress);

  const insufficientBalance = amount > balance;
  const validPayment =
    validAmount &&
    validFee &&
    Object.keys(validators).length > 0 &&
    !insufficientBalance;

  const handleAddValidator = (validatorAddress) => {
    setvalidatorAddress("");
    setValidators({ ...validators, [validatorAddress]: true });
  };

  const handleRemoveValidator = (validatorAddress) => {
    const newValidators = { ...validators };
    delete newValidators[validatorAddress];
    setValidators(newValidators);
  };

  const resetModal = () => {
    setAmount(0);
    setFee(0);
    setReceiverAddress(null);
    setvalidatorAddress(null);
    setValidators({});
    handleClose();
  };

  const handlePayment = async () => {
    if (!validPayment) {
      alert("Invalid payment");
      return;
    }
    const payment = await createPayment(
      amount,
      fee,
      receiverAddress,
      Object.keys(validators)
    );

    resetModal();

    console.log(payment);
  };

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
              minimumValue={0}
              label="Amount"
              variant="outlined"
              value={amount}
              mini
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
                <Button
                  disabled={!validValidatorAddress}
                  variant="contained"
                  style={styles.addValidatorButton}
                  onClick={() => handleAddValidator(validatorAddress)}
                >
                  +
                </Button>
              </div>
              <div style={styles.validatorsList}>
                {Object.keys(validators).map((validatorId) => (
                  <Chip
                    style={{ fontSize: 8, marginLeft: 5 }}
                    key={validatorId}
                    label={validatorId}
                    variant="outlined"
                    onDelete={() => handleRemoveValidator(validatorId)}
                  />
                ))}
              </div>
            </div>

            <div style={styles.balancesContainer}>
              <div>
                <div style={styles.valueCard}>
                  <span>Payment Value:</span>
                  <span style={{ fontSize: 25 }}>
                    {parseFloat(amount || 0) + parseFloat(fee || 0)} ETH
                  </span>
                  <div style={{ marginTop: 5 }}>
                    <span style={styles.paymentStatus}>{amount || 0} ETH</span>{" "}
                    + <span style={styles.paymentStatus}>{fee || 0} ETH</span>
                  </div>
                </div>
              </div>

              <div style={{ marginLeft: 5 }}>
                <div style={styles.valueCard}>
                  <span>Current Balance:</span>
                  <span style={{ fontSize: 25 }}>{balance} ETH</span>
                  {insufficientBalance && (
                    <div style={styles.alertBalance}>
                      <Warning style={{ marginTop: 2 }} />{" "}
                      <span style={{ fontSize: 14 }}>Insufficient Balance</span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                disabled={!validPayment}
                variant="contained"
                style={styles.payButton}
                onClick={handlePayment}
              >
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
    height: "90%",
    backgroundColor: "white",
    boxShadow: 24,
    borderRadius: 5,
    overflow: "auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto",
    width: "100%",
    minHeight: 700,
  },
  title: {
    fontSize: 24,
  },
  input: {
    width: "95%",
    marginTop: 15,
  },
  validatorsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "calc(95% - 10px)",
    height: 250,
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
  validatorsList: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    marginTop: 10,
    overflow: "auto",
  },
  alertBalance: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "yellow",
  },
  paymentStatus: {
    backgroundColor: colors.primaryLight,
    color: colors.primaryDark,
    borderRadius: 5,
    padding: 5,
  },
  balancesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
};
