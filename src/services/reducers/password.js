import {
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILED
} from '../actions/password.js';

const message = localStorage.getItem('message');

const initialState = {
  user: null,
  isMessageReceived: !!message,
  successForgotMessage: false,
  errorResetMessage: false,
  successResetMessage: false
};

export const password = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_REQUEST: {
      return {
        ...state,
        isMessageReceived: false
      };
    }
    case FORGOT_SUCCESS: {
      return {
        ...state,
        successForgotMessage: true,
        isMessageReceived: true
      };
    }
    case FORGOT_FAILED: {
      return {
        ...state,
        isMessageReceived: false
      };
    }
    case RESET_REQUEST: {
      return {
        ...state,
        isMessageReceived: true
      };
    }
    case RESET_SUCCESS: {
      return {
        ...state,
        successResetMessage: true,
        isMessageReceived: true
      };
    }
    case RESET_FAILED: {
      return {
        ...state,
        errorResetMessage: true,
        isMessageReceived: true
      };
    }
    default: {
      return state;
    }
  }
};