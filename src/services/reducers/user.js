import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  SET_USER_INFO,
  SET_USER_INFO_SUCCESS,
  SET_USER_INFO_FAILED
} from '../actions/user.js';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user,
  userRequest: false,
  getUserFailed: false
};

export const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO: {
      return {
        ...state,
        userRequest: true,
        getUserFailed: false
      };
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        userRequest: false
      };
    }
    case GET_USER_INFO_FAILED: {
      return {
        ...state,
        userRequest: false,
        getUserFailed: true
      };
    }
    case SET_USER_INFO: {
      return {
        ...state,
        userRequest: true,
        getUserFailed: false
      };
    }
    case SET_USER_INFO_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        userRequest: false
      };
    }
    case SET_USER_INFO_FAILED: {
      return {
        ...state,
        userRequest: false,
        getUserFailed: true
      };
    }
    default: {
      return state;
    }
  }
};