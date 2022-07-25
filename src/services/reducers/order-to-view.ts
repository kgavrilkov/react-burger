import { TItem } from '../../utils/types';
import { TOrderToViewAction } from '../actions/order-to-view';
import {
  GET_ORDER_TO_VIEW,
  RESET_ORDER_TO_VIEW
} from '../actions/order-to-view';

type TOrderToViewState = {
  order: TItem | null;
};

const initialState = {
  order: null as any
};

export const orderToView = (state = initialState, action: TOrderToViewAction): TOrderToViewState => {
  switch (action.type) {
    case GET_ORDER_TO_VIEW: {
      return {
        ...state,
        order: action.payload
      };
    }
    case RESET_ORDER_TO_VIEW: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};