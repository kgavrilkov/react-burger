import React  from 'react'; 
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { protectedProperties } from '../../utils/types.js';
 
const ProtectedRoute = ({ component: Component, ...props }) => {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  
  return ( 
    <Route 
      render = {({ location }) => 
        isLoggedIn
        ? 
          <Component {...props} /> 
        : 
          <Redirect 
            to={{
              pathname: '/login',
              state: { from: location }
            }} 
          />
      } 
    /> 
  ); 
};

ProtectedRoute.propTypes = protectedProperties.isRequired

export default ProtectedRoute;