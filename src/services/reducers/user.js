import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  SET_USER_INFO,
  SET_USER_INFO_SUCCESS,
  SET_USER_INFO_FAILED
} from '../actions/user.js';

const initialState = {
  user: null,
  successMessage: false,
  userRequest: false,
  getUserFailed: false
};

export const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO: {
      return {
        ...state,
        successMessage: false,
        userRequest: true,
        getUserFailed: false
      };
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        successMessage: false,
        userRequest: false
      };
    }
    case GET_USER_INFO_FAILED: {
      return {
        ...state,
        successMessage: false,
        userRequest: false,
        getUserFailed: true
      };
    }
    case SET_USER_INFO: {
      return {
        ...state,
        successMessage: false,
        userRequest: true,
        getUserFailed: false
      };
    }
    case SET_USER_INFO_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        successMessage: true,
        userRequest: false
      };
    }
    case SET_USER_INFO_FAILED: {
      return {
        ...state,
        successMessage: false,
        userRequest: false,
        getUserFailed: true
      };
    }
    default: {
      return state;
    }
  }
};