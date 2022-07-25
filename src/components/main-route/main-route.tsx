import React from "react";
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { TRootState } from '../../services/store';

const MainRoute  = ({component, ...rest}: any) => {
  const isLoggedIn = useSelector((store: TRootState) => store.auth.isLoggedIn);

  const routeComponent = (props: any) => (
    !isLoggedIn 
    ? 
      React.createElement(component, props)
    : 
      <Redirect 
        to={{
          pathname: '/', 
          state: { from: props.location }
        }}
      />
  );
  return <Route {...rest} render={routeComponent} />;
};

export default MainRoute;