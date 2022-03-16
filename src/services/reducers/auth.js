import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from '../actions/auth.js';

const initialState = {
  user: null,
  errorMessage: false,
  isLoggedIn: false
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        errorMessage: false,
        isLoggedIn: false
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        errorMessage: false,
        isLoggedIn: false
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        errorMessage: true,
        isLoggedIn: false
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        errorMessage: false,
        isLoggedIn: false
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        errorMessage: false,
        isLoggedIn: true
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        errorMessage: true,
        isLoggedIn: false
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        errorMessage: false,
        isLoggedIn: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        errorMessage: false,
        isLoggedIn: false
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        errorMessage: false,
        isLoggedIn: true
      };
    }
    default: {
      return state;
    }
  }
};