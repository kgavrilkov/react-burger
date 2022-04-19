import jwtDecode from 'jwt-decode';
import { refreshTokenAction } from '../services/actions/auth.js';

export const jwt = store => next => action => {
  if (typeof action === 'function') {
    if (store.getState().auth && store.getState().auth.accessToken) {
      const tokenExpiration = jwtDecode(store.getState().auth.accessToken);
      if (tokenExpiration && (tokenExpiration.exp - Date.now() > 5000)) {
        if (!store.getState().auth.pendingRefreshingToken) {
          store.dispatch({ type: 'REFRESH_SUCCESS' });
          store.dispatch(refreshTokenAction());
        }
      }  
    }
  }
  return next(action);
};