import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REORDER_INGREDIENTS
} from '../actions/constructor-ingredients.js';

const initialState = {
  constructorIngredients: []
};

export const constructorIngredients = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === 'bun') {
        const filtered = [...state.constructorIngredients].filter(
          (item) => item.type !== 'bun'
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
          (item) => item.key !== action.payload
        )
      };
    }
    case REORDER_INGREDIENTS: {
      const filtered = [...state.constructorIngredients].filter(
        (item) => item.type === 'bun'
      );
      const reordered = filtered.concat(action.payload);
      return {
        ...state,
        constructorIngredients: reordered
      };
    }
    default: {
      return state;
    }
  }
};