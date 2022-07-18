import React from "react";
import { colors } from "../utils/constants";
import { useAuth } from "../contexts/auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";

const Routes = () => {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      <div style={styles.container}>
        <Navbar />
        <div style={styles.innerContainer}>
          <Switch>
            {!signed && <Route exact path="/login" component={Login} />}
            <Route path="*" component={Home} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

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

export default Routes;
