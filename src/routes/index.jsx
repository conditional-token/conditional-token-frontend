import React from 'react';
import { useAuth } from '../contexts/auth';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';


const Routes = () => {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
    <Switch>
      {!signed && <Route exact path="/login" component={Login} />}
      <Route path="*" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;