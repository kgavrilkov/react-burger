import {
  GET_ITEM_TO_VIEW,
  RESET_ITEM_TO_VIEW
} from '../actions/item-to-view.js';

const initialState = {
  ingredient: null
};

export const itemToView = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_TO_VIEW: {
      return {
        ...state,
        ingredient: action.payload
      };
    }
    case RESET_ITEM_TO_VIEW: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};