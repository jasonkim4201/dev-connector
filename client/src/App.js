import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from './components/auth/Login';
import Alert from "./components/layout/alert";
import Register from './components/auth/Register';
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => { 
  // hey i remember this time to place empty brackets for use effect this time
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert/>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path ="/dashboard" component={Dashboard} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
  );
};
export default App;
