import { constructorIngredients, initialState } from './constructor-ingredients';
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REORDER_INGREDIENTS,
  CLEAR_CONSTRUCTOR
} from '../actions/constructor-ingredients';

describe('constructor-ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(constructorIngredients(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_INGREDIENT', () => {
    expect(constructorIngredients(initialState, {
      type: ADD_INGREDIENT,
      payload: {}
    })).toEqual({
      ...initialState,
      constructorIngredients: [...initialState.constructorIngredients, {}]
    });
  });

  it('should handle DELETE_INGREDIENT', () => {
    expect(constructorIngredients(initialState, {
      type: DELETE_INGREDIENT,
      payload: {}
    })).toEqual({
      ...initialState,
      constructorIngredients: [...initialState.constructorIngredients]
    });
  });

  it('should handle REORDER_INGREDIENTS', () => {
    expect(constructorIngredients(initialState, {
      type: REORDER_INGREDIENTS,
      payload: []
    })).toEqual({
      ...initialState,
      constructorIngredients: [...initialState.constructorIngredients]
    });
  });

  it('should handle CLEAR_CONSTRUCTOR', () => {
    expect(constructorIngredients(initialState, { type: CLEAR_CONSTRUCTOR })).toEqual({
      ...initialState,
      constructorIngredients: []
    });
  });
})