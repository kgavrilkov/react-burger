import React  from 'react'; 
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicProperties } from '../../utils/types.js';
 
const PublicRoute = ({ component: Component, ...props }) => {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  
  return ( 
    <Route 
      render = {({ location }) => 
        !isLoggedIn
        ? 
          <Component {...props} /> 
        : 
          <Redirect 
            to={{
              pathname: '/',
              state: { from: location }
            }} 
          />
      } 
    /> 
  ); 
};

PublicRoute.propTypes = publicProperties.isRequired

export default PublicRoute;