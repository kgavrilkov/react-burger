import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({component, ...rest}: any) => {
  const isLoggedIn = useSelector((store: any) => store.auth.isLoggedIn);

  const routeComponent = (props: any) => (
    isLoggedIn 
    ? 
      React.createElement(component, props)
    : 
      <Redirect 
        to={{
          pathname: '/login', 
          state: { from: props.location }
        }}
      />
  );
  return <Route {...rest} render={routeComponent}/>;
};

export default ProtectedRoute;

