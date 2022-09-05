import { burgerIngredients, initialState } from './burger-ingredients';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/burger-ingredients';

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(burgerIngredients(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_INGREDIENTS', () => {
    expect(burgerIngredients(initialState, { type: GET_INGREDIENTS })).toEqual({
      ...initialState,
      ingredientsRequest: true,
      getIngredientsFailed: false
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(burgerIngredients(initialState, {
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: []
    })).toEqual({
      ...initialState,
      ingredients: [],
      ingredientsRequest: false
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(burgerIngredients(initialState, { type: GET_INGREDIENTS_FAILED })).toEqual({
      ...initialState,
      ingredientsRequest: false,
      getIngredientsFailed: true
    });
  }); 
})