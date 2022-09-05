import { itemToView, initialState } from './item-to-view';
import {
  GET_ITEM_TO_VIEW,
  RESET_ITEM_TO_VIEW
} from '../actions/item-to-view';

describe('item-to-view reducer', () => {
  it('should return the initial state', () => {
    expect(itemToView(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_ITEM_TO_VIEW', () => {
    expect(itemToView(initialState, {
      type: GET_ITEM_TO_VIEW,
      payload: {}
    })).toEqual({
      ...initialState,
      ingredient: {}
    });
  });

  it('should handle RESET_ITEM_TO_VIEW', () => {
    expect(itemToView(initialState, { type: RESET_ITEM_TO_VIEW })).toEqual(initialState);
  });
})