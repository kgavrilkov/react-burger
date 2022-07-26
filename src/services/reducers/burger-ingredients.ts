import { TIngredient } from '../../utils/types';
import { TIngredientsAction } from '../actions/burger-ingredients';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/burger-ingredients';

type TBurgerIngredientsState = {
  ingredients: ReadonlyArray<TIngredient>;
  ingredientsRequest: boolean;
  getIngredientsFailed: boolean;
};

const initialState = {
  ingredients: [] as any,
  ingredientsRequest: false,
  getIngredientsFailed: false
};

export const burgerIngredients = (state = initialState, action: TIngredientsAction): TBurgerIngredientsState => {
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