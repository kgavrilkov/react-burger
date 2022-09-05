import { orderToView, initialState } from './order-to-view';
import {
  GET_ORDER_TO_VIEW,
  RESET_ORDER_TO_VIEW
} from '../actions/order-to-view';

describe('order-to-view reducer', () => {
  it('should return the initial state', () => {
    expect(orderToView(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_ORDER_TO_VIEW', () => {
    expect(orderToView(initialState, {
      type: GET_ORDER_TO_VIEW,
      payload: {}
    })).toEqual({
      ...initialState,
      order: {}
    });
  });

  it('should handle RESET_ORDER_TO_VIEW', () => {
    expect(orderToView(initialState, { type: RESET_ORDER_TO_VIEW })).toEqual(initialState);
  });
})