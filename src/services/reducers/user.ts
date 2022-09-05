import { TUserData } from '../../utils/types';
import { TUserAction } from '../actions/user';
import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  SET_USER_INFO,
  SET_USER_INFO_SUCCESS,
  SET_USER_INFO_FAILED,
  DELETE
} from '../actions/user';

type TUserState = {
  user: TUserData | null,
  successMessage: boolean;
  userRequest: boolean;
  getUserFailed: boolean;
};

export const initialState = {
  user: null as any,
  successMessage: false,
  userRequest: false,
  getUserFailed: false
};

export const currentUser = (state = initialState, action: TUserAction): TUserState => {
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
    case DELETE: {
      return {
        ...state,
        successMessage: false
      };
    }
    default: {
      return state;
    }
  }
};