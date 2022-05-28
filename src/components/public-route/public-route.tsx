import React, { FC } from "react";
import { RouteComponentProps, RouteChildrenProps, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface RouteProps {
  location?: Location;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
}

const PublicRoute: FC<RouteProps> = ({component, ...rest}) => {
  const isLoggedIn = useSelector((store: any) => store.auth.isLoggedIn);

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
  return <Route {...rest}>{routeComponent}</Route>;
};

export default PublicRoute;