import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ProductDashboard from '../pages/ProductDashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} isPrivate />
    <PrivateRoute
      exact
      path="/dashboard-product"
      component={ProductDashboard}
    />
  </Switch>
);

export default Routes;
