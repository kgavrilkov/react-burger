import { orderByNumber, initialState } from './order-by-number';
import {
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../actions/order-by-number';

describe('order-by-number reducer', () => {
  it('should return the initial state', () => {
    expect(orderByNumber(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_ORDER', () => {
    expect(orderByNumber(initialState, { type: GET_ORDER })).toEqual({
      ...initialState,
      orderRequest: true,
      getOrderFailed: false
    });
  });

  it('should handle GET_ORDER_SUCCESS', () => {
    expect(orderByNumber(initialState, {
      type: GET_ORDER_SUCCESS,
      payload: []
    })).toEqual({
      ...initialState,
      orders: [],
      orderRequest: false
    });
  });

  it('should handle GET_ORDER_FAILED', () => {
    expect(orderByNumber(initialState, { type: GET_ORDER_FAILED })).toEqual({
      ...initialState,
      orderRequest: false,
      getOrderFailed: true
    });
  });
})