import { auth, initialState } from './auth';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RESET
} from '../actions/auth';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });

  it('should handle REGISTER_REQUEST', () => {
    expect(auth(initialState, { type: REGISTER_REQUEST })).toEqual({
      ...initialState,
      isLoggedIn: false
    });
  });

  it('should handle REGISTER_SUCCESS', () => {
    expect(auth(initialState, { type: REGISTER_SUCCESS })).toEqual({
      ...initialState,
      registered: true,
      errorRegisterMessage: false,
      isLoggedIn: false
    });
  });

  it('should handle RESET', () => {
    expect(auth(initialState, { type: RESET })).toEqual(initialState);
  });

  it('should handle REGISTER_FAILED', () => {
    expect(auth(initialState, { type: REGISTER_FAILED })).toEqual({
      ...initialState,
      errorRegisterMessage: true,
      isLoggedIn: false
    });
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(auth(initialState, { type: LOGIN_REQUEST })).toEqual({
      ...initialState,
      isLoggedIn: false
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(auth(initialState, {
      type: LOGIN_SUCCESS,
      payload: {}
    })).toEqual({
      ...initialState,
      user: {},
      errorLoginMessage: false,
      isLoggedIn: true
    });
  });
  
  it('should handle LOGIN_FAILED', () => {
    expect(auth(initialState, { type: LOGIN_FAILED })).toEqual({
      ...initialState,
      errorLoginMessage: true,
      isLoggedIn: false
    });
  });

  it('should handle LOGOUT_REQUEST', () => {
    expect(auth(initialState, { type: LOGOUT_REQUEST })).toEqual({
      ...initialState,
      isLoggedIn: true
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(auth(initialState, { type: LOGOUT_SUCCESS })).toEqual({
      ...initialState,
      isLoggedIn: false
    });
  });

  it('should handle LOGOUT_FAILED', () => {
    expect(auth(initialState, { type: LOGOUT_FAILED })).toEqual({
      ...initialState,
      isLoggedIn: true
    });
  });
})