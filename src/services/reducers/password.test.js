import { password, initialState } from './password';
import {
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILED,
  CLEAR
} from '../actions/password';

describe('password reducer', () => {
  it('should return the initial state', () => {
    expect(password(undefined, {})).toEqual(initialState);
  });

  it('should handle FORGOT_REQUEST', () => {
    expect(password(initialState, { type: FORGOT_REQUEST })).toEqual({
      ...initialState,
      isMessageReceived: false
    });
  });

  it('should handle FORGOT_SUCCESS', () => {
    expect(password(initialState, { type: FORGOT_SUCCESS })).toEqual({
      ...initialState,
      successForgotMessage: true,
      isMessageReceived: true
    });
  });

  it('should handle FORGOT_FAILED', () => {
    expect(password(initialState, { type: FORGOT_FAILED })).toEqual({
      ...initialState,
      isMessageReceived: false
    });
  });

  it('should handle RESET_REQUEST', () => {
    expect(password(initialState, { type: RESET_REQUEST })).toEqual({
      ...initialState,
      isResetMessageReceived: false
    });
  });

  it('should handle RESET_SUCCESS', () => {
    expect(password(initialState, { type: RESET_SUCCESS })).toEqual({
      ...initialState,
      errorResetMessage: false,
      successResetMessage: true,
      isResetMessageReceived: true
    });
  });

  it('should handle RESET_FAILED', () => {
    expect(password(initialState, { type: RESET_FAILED })).toEqual({
      ...initialState,
      errorResetMessage: true,
      isResetMessageReceived: false
    })
  });

  it('should handle CLEAR', () => {
    expect(password(initialState, { type: CLEAR })).toEqual(initialState);
  });
})