import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { colors } from "../utils/constants";
import BeatLoader from "react-spinners/BeatLoader";

function LoginScreen() {
  const { Login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <label for="email" style={styles.label}>
          Email
        </label>
        <input
          id="email"
          style={styles.input}
          type="text"
          placeholder="Type yor email here"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label for="password" style={styles.label}>
          Password
        </label>
        <input
          id="password"
          style={styles.input}
          type="password"
          placeholder="Type your password here"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          style={styles.button}
          onClick={() => Login({ email, password })}
          disabled={loading}
        >
          {loading ? <BeatLoader size={10} color={colors.primaryDark} /> : "Login"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryDark,
  },
  form: {
    display: "flex",
    width: "50%",
    height: "80%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: colors.secondaryDark,
    borderRadius: 20,
  },
  input: {
    fontFamily: "'Roboto', sans-serif",
    color: colors.primaryLight,
    fontSize: 15,
    width: "70%",
    height: 30,
    marginBottom: 20,
    backgroundColor: "transparent",
    border: "solid 2px " + colors.primaryLight,
    borderRadius: 20,
    padding: 10,
  },
  label: {
    fontFamily: "'Roboto', sans-serif",
    color: colors.primaryLight,
    fontSize: 15,
    width: "70%",
    marginBottom: 5,
  },
  button: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 20,
    width: 200,
    height: 40,
    backgroundColor: colors.primaryLight,
    color: colors.primaryDark,
    border: "none",
    borderRadius: 20,
  },
};

export default LoginScreen;
