import { TIngredient } from '../../utils/types';
import { TItemToViewAction } from '../actions/item-to-view';
import {
  GET_ITEM_TO_VIEW,
  RESET_ITEM_TO_VIEW
} from '../actions/item-to-view';

type TItemToViewState = {
  ingredient: TIngredient | null;
};

const initialState = {
  ingredient: null as any
};

export const itemToView = (state = initialState, action: TItemToViewAction): TItemToViewState => {
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