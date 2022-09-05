import { currentUser, initialState } from './user';
import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  SET_USER_INFO,
  SET_USER_INFO_SUCCESS,
  SET_USER_INFO_FAILED,
  DELETE
} from '../actions/user';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(currentUser(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_USER_INFO', () => {
    expect(currentUser(initialState, { type: GET_USER_INFO })).toEqual({
      ...initialState,
      successMessage: false,
      userRequest: true,
      getUserFailed: false
    });
  });

  it('should handle GET_USER_INFO_SUCCESS', () => {
    expect(currentUser(initialState, {
      type: GET_USER_INFO_SUCCESS,
      payload: {}
    })).toEqual({
      ...initialState,
      user: {},
      successMessage: false,
      userRequest: false
    });
  });

  it('should handle GET_USER_INFO_FAILED', () => {
    expect(currentUser(initialState, { type: GET_USER_INFO_FAILED })).toEqual({
      ...initialState,
      successMessage: false,
      userRequest: false,
      getUserFailed: true
    });
  });

  it('should handle SET_USER_INFO', () => {
    expect(currentUser(initialState, { type: SET_USER_INFO })).toEqual({
      ...initialState,
      successMessage: false,
      userRequest: true,
      getUserFailed: false
    });
  });

  it('should handle SET_USER_INFO_SUCCESS', () => {
    expect(currentUser(initialState, {
      type: SET_USER_INFO_SUCCESS,
      payload: {}
    })).toEqual({
      ...initialState,
      user: {},
      successMessage: true,
      userRequest: false
    });
  });

  it('should handle SET_USER_INFO_FAILED', () => {
    expect(currentUser(initialState, { type: SET_USER_INFO_FAILED })).toEqual({
      ...initialState,
      successMessage: false,
      userRequest: false,
      getUserFailed: true
    });
  });

  it('should handle DELETE', () => {
    expect(currentUser(initialState, { type: DELETE })).toEqual({
      ...initialState,
      successMessage: false
    });
  });
})