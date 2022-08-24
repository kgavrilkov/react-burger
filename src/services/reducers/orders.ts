import { TOrderFeed } from '../../utils/types';
import { TOrdersAction } from '../actions/orders';
import {
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_GET_MESSAGE,
  ORDERS_CONNECTION_CLOSED
} from '../actions/orders';

type TOrdersState = {
  orders: ReadonlyArray<TOrderFeed>;
  isOpen: boolean;
  error: string;
  total: number;
  totalToday: number;
};

const initialState = {
  orders: [] as any,
  isOpen: false,
  error: '',
  total: 0,
  totalToday: 0
};

export const orders = (state = initialState, action: TOrdersAction): TOrdersState => {
  switch (action.type) {
    case ORDERS_CONNECTION_SUCCESS: {
      return {
        ...state,
        isOpen: true,
        error: ''
      };
    }
    case ORDERS_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case ORDERS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.data.orders,
        total: action.payload.data.total,
        totalToday: action.payload.data.totalToday
      };
    }
    case ORDERS_CONNECTION_CLOSED: {
      return {
        ...state,
        isOpen: false
      };
    }
    default: {
      return state;
    }
  }
};