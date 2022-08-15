import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { colors } from "../utils/constants";
import { validateEmail } from "../utils/utils";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

function Signup() {
  const { Signup, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validEmail = email && validateEmail(email);
  const validPassword = password && password.length > 5;

  return (
    <div style={styles.container}>
      <div style={styles.form}>
      <div style={styles.title}>Create Account</div>
      <label for="email" style={styles.label}>
          Name
        </label>
        <input
          id="name"
          style={styles.input}
          type="text"
          placeholder="Type yor name here"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
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
        {email && !validEmail && <span style={styles.error}>Please insert a valid email!</span>}
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
        {password && !validPassword && <span style={styles.error}>Password must be at least 6 characters!</span>}
        <button
          style={styles.button}
          onClick={() => Signup({ name, email, password })}
          disabled={loading || !validEmail || !validPassword}
        >
          {loading ? <BeatLoader size={10} color={colors.primaryDark} /> : "Create"}
        </button>
        <div style={styles.login}>Already registered? <Link to="/login">Login here</Link></div>
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
  login: {
    fontFamily: "'Roboto', sans-serif",
    color: colors.primaryLight,
    marginTop: 10,
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
    marginBottom: 5,
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
  error: {
    fontFamily: "'Roboto', sans-serif",
    color: "red",
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    color: colors.primaryLight,
    fontSize: 26,
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
    marginTop: 20
  },
};

export default Signup;
