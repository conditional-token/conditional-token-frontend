import React from "react";
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
        <div style={styles.container}>
          <Switch>
            {!signed && <Route path="*" component={Login} />}
            <Route path="*" component={Home} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

const styles ={
  container: {
    width: "100%",
    height: "100%",
  },
}


export default Routes;
