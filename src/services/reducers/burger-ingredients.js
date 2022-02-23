import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/index.js';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  getIngredientsFailed: false
};

export const burgerIngredients = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        getIngredientsFailed: false
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        getIngredientsFailed: true
      };
    }
    default: {
      return state;
    } 
  }
};