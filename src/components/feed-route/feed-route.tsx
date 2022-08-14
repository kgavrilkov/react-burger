import React from "react";
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

const FeedRoute  = ({component, ...rest}: any) => {
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

  const routeComponent = (props: any) => (
    !isLoggedIn 
    ? 
      React.createElement(component, props)
    : 
      <Redirect 
        to={{
          pathname: '/feed', 
          state: { from: props.location }
        }}
      />
  );
  return <Route {...rest} render={routeComponent} />;
};

export default FeedRoute;