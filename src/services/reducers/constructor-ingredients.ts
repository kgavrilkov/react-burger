import { TIngredient, TIngredientToDelete } from '../../utils/types';
import { TConstructorAction } from '../actions/constructor-ingredients';
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REORDER_INGREDIENTS,
  CLEAR_CONSTRUCTOR
} from '../actions/constructor-ingredients';

type TConstructorIngredientsState = {
  constructorIngredients: ReadonlyArray<TIngredient>;
};

const initialState = {
  constructorIngredients: [] as any
};

export const constructorIngredients = (state = initialState, action: TConstructorAction): TConstructorIngredientsState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === 'bun') {
        const filtered = [...state.constructorIngredients].filter(
          (item: TIngredient) => item.type !== 'bun'
        );
        return {
          ...state,
          constructorIngredients: [...filtered, action.payload]
        };
      }
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.payload
        ]
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(
          (item: TIngredientToDelete) => item.key !== action.payload
        )
      };
    }
    case REORDER_INGREDIENTS: {
      const filtered = [...state.constructorIngredients].filter(
        (item: TIngredient) => item.type === 'bun'
      );
      const reordered = filtered.concat(action.payload);
      return {
        ...state,
        constructorIngredients: reordered
      };  
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: []
      };
    }
    default: {
      return state;
    }
  }
};