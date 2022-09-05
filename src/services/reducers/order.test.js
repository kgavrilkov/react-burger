import { order, initialState } from './order';
import {
  CREATE_ORDER,
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  RESET_ORDER
} from '../actions/order';

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(order(undefined, {})).toEqual(initialState);
  });

  it('should handle CREATE_ORDER', () => {
    expect(order(initialState, { 
      type: CREATE_ORDER,
      payload: []
    })).toEqual({
      ...initialState,
      ingredients: []
    });
  });

  it('should handle GET_ORDER_NUMBER', () => {
    expect(order(initialState, { type: GET_ORDER_NUMBER })).toEqual({
      ...initialState,
      orderNumberRequest: true,
      getOrderNumberFailed: false
    });
  });

  it('should handle GET_ORDER_NUMBER_SUCCESS', () => {
    expect(order(initialState, {
      type: GET_ORDER_NUMBER_SUCCESS,
      payload: 0
    })).toEqual({
      ...initialState,
      ingredients: [],
      number: 0,
      orderNumberRequest: false
    });
  });

  it('should handle GET_ORDER_NUMBER_FAILED', () => {
    expect(order(initialState, { type: GET_ORDER_NUMBER_FAILED })).toEqual({
      ...initialState,
      orderNumberRequest: false,
      getOrderNumberFailed: true
    });
  });

  it('should handle RESET_ORDER', () => {
    expect(order(initialState, { type: RESET_ORDER })).toEqual(initialState);
  });
})