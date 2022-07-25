import React, { FC } from "react";
import { RouteComponentProps, RouteChildrenProps, Redirect, Route } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { TRootState } from '../../services/store';

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


const ProtectedRoute: FC<RouteProps> = ({component, ...rest}) => {
  const isLoggedIn = useSelector((store: TRootState) => store.auth.isLoggedIn);

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
  return <Route {...rest}>{routeComponent}</Route>;
};

export default ProtectedRoute;

