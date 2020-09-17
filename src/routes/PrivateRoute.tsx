import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const isAuthenticated = () =>
  localStorage.getItem('@GettyIO/TOKEN') !== null;

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect from="/" to="/" />
      )
    }
  />
);
export default PrivateRoute;
