import React from "react";
import { useAuth } from "../contexts/auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Navbar from "../components/Navbar";
import { colors } from "../utils/constants";

const Routes = () => {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      <div style={styles.container}>
        <Navbar />
        <div style={{ width: "100%", height: "100%"}}>
          <Switch>
            {!signed && <Route path="/signup" component={Signup} />}
            {!signed && <Route path="*" component={Login} />}
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
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    minWidth: "100vw",
    backgroundColor: colors.primaryDark
  },
};

export default Routes;
