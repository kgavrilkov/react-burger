import { TOrderFeed } from '../../utils/types';
import { TFeedAction } from '../actions/feed';
import {
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_GET_MESSAGE,
  FEED_CONNECTION_CLOSED
} from '../actions/feed';

type TFeedState = {
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

export const feed = (state = initialState, action: TFeedAction): TFeedState => {
  switch (action.type) {
    case FEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        isOpen: true,
        error: ''
      };
    }
    case FEED_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case FEED_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.data.orders,
        total: action.payload.data.total,
        totalToday: action.payload.data.totalToday
      };
    }
    case FEED_CONNECTION_CLOSED: {
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