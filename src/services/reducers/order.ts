import { TIngredient } from '../../utils/types';
import { TOrderAction } from '../actions/order';
import {
  CREATE_ORDER,
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  RESET_ORDER
} from '../actions/order';

type TOrderState = {
  ingredients: ReadonlyArray<TIngredient>;
  number: number | null;
  orderNumberRequest: boolean;
  getOrderNumberFailed: boolean;
};

export const initialState = {
  ingredients: [] as any,
  number: null as any,
  orderNumberRequest: false,
  getOrderNumberFailed: false
};

export const order = (state = initialState, action: TOrderAction): TOrderState => {
  switch (action.type) {
    case CREATE_ORDER: {
      return {
        ...state,
        ingredients: action.payload
      };
    }
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumberRequest: true,
        getOrderNumberFailed: false
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        ingredients: [],
        number: action.payload,
        orderNumberRequest: false,
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderNumberRequest: false,
        getOrderNumberFailed: true
      };
    }
    case RESET_ORDER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};