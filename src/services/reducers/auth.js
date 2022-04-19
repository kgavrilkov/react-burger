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

const token = localStorage.getItem('refreshToken');

const initialState = {
  user: null,
  isLoggedIn: !!token,
  errorRegisterMessage: false,
  errorLoginMessage: false
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        isLoggedIn: false
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoggedIn: false
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        errorRegisterMessage: true,
        isLoggedIn: false
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoggedIn: false
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        errorLoginMessage: true,
        isLoggedIn: false
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        isLoggedIn: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoggedIn: false
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        isLoggedIn: true
      };
    }
    default: {
      return state;
    }
  }
};