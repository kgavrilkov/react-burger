import { orders, initialState } from './orders';
import {
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_GET_MESSAGE,
  ORDERS_CONNECTION_CLOSED
} from '../actions/orders';

describe('orders reducer', () => {
  it('should return the initial state', () => {
    expect(orders(undefined, {})).toEqual(initialState);
  });

  it('should handle ORDERS_CONNECTION_SUCCESS', () => {
    expect(orders(initialState, { type: ORDERS_CONNECTION_SUCCESS })).toEqual({
      ...initialState,
      isOpen: true,
      error: ''
    });
  });

  it('should handle ORDERS_CONNECTION_ERROR', () => {
    expect(orders(initialState, {
      type: ORDERS_CONNECTION_ERROR,
      payload: ''
    })).toEqual({
      ...initialState,
      error: ''
    });
  });

  it('should handle ORDERS_GET_MESSAGE', () => {
    expect(orders(initialState, {
      type: ORDERS_GET_MESSAGE,
      payload: {
        data: {
          orders: [], 
          total: 0, 
          totalToday: 0
        }
      }
    })).toEqual({
      ...initialState,
      orders: [],
      total: 0,
      totalToday: 0
    });
  });

  it('should handle ORDERS_CONNECTION_CLOSED', () => {
    expect(orders(initialState, { type: ORDERS_CONNECTION_CLOSED })).toEqual({
      ...initialState,
      isOpen: false
    });
  });
})