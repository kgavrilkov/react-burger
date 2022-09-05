import { TOrderByNumber } from '../../utils/types';
import { TOrderByNumberAction } from '../actions/order-by-number';
import {
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../actions/order-by-number';

type TOrderByNumberState = {
  orders: ReadonlyArray<TOrderByNumber>;
  orderRequest: boolean;
  getOrderFailed: boolean;
};

export const initialState = {
  orders: [] as any,
  orderRequest: false,
  getOrderFailed: false
};

export const orderByNumber = (state = initialState, action: TOrderByNumberAction): TOrderByNumberState => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        getOrderFailed: false
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orders: action.payload,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        getOrderFailed: true
      };
    }
    default: {
      return state;
    }
  }
};