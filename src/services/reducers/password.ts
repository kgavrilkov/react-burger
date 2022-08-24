import { TPasswordAction } from '../actions/password';
import {
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILED,
  CLEAR
} from '../actions/password';

type TPasswordState = {
  user: null;
  isMessageReceived: boolean;
  isResetMessageReceived: boolean;
  successForgotMessage: boolean;
  errorResetMessage: boolean;
  successResetMessage: boolean;
};

const message = localStorage.getItem('message');
const resetMessage = localStorage.getItem('resetMessage');

const initialState = {
  user: null,
  isMessageReceived: !!message,
  isResetMessageReceived: !!resetMessage,
  successForgotMessage: false,
  errorResetMessage: false,
  successResetMessage: false
};

export const password = (state = initialState, action: TPasswordAction): TPasswordState => {
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
        isResetMessageReceived: false
      };
    }
    case RESET_SUCCESS: {
      return {
        ...state,
        errorResetMessage: false,
        successResetMessage: true,
        isResetMessageReceived: true
      };
    }
    case RESET_FAILED: {
      return {
        ...state,
        errorResetMessage: true,
        isResetMessageReceived: false
      };  
    }
    case CLEAR: {
      return initialState
    }
    default: {
      return state;
    }
  }
};