import { feed, initialState } from './feed';
import {
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_GET_MESSAGE,
  FEED_CONNECTION_CLOSED
} from '../actions/feed';

describe('feed reducer', () => {
  it('should return the initial state', () => {
    expect(feed(undefined, {})).toEqual(initialState);
  });

  it('should handle FEED_CONNECTION_SUCCESS', () => {
    expect(feed(initialState, { type: FEED_CONNECTION_SUCCESS })).toEqual({
      ...initialState,
      isOpen: true,
      error: ''
    });
  });

  it('should handle FEED_CONNECTION_ERROR', () => {
    expect(feed(initialState, {
      type: FEED_CONNECTION_ERROR,
      payload: ''
    })).toEqual({
      ...initialState,
      error: ''
    });
  });

  it('should handle FEED_GET_MESSAGE', () => {
    expect(feed(initialState, {
      type: FEED_GET_MESSAGE,
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

  it('should handle FEED_CONNECTION_CLOSED', () => {
    expect(feed(initialState, { type: FEED_CONNECTION_CLOSED })).toEqual({
      ...initialState,
      isOpen: false
    });
  });
})